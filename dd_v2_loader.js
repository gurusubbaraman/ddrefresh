/* ==================================================================
   DD v2 — LOADER / COMPATIBILITY SHIM        v2.2 (in-place merge)
   ------------------------------------------------------------------
   Joins the thin base to the parallel enrichment and keeps the fused
   view that DD v1 Section B expects.

   WHY A SHIM IS NEEDED
   --------------------
   PPS keeps base and enrichment permanently separate because its base
   render() only ever touches base fields, and its detail panel reads
   window.TEMPLE_ENRICHMENT[sno] explicitly.

   DD is not there yet. dd_v1_patch.js Section B builds its five-tab
   popup by reading enrichment fields straight off the temple object
   (temple.sthala_purana, temple.alwars, temple.sii_references, ...).
   Splitting the array without a shim would blank every popup tab.

   ------------------------------------------------------------------
   v2.2 FIX — THE ORPHANED-ARRAY BUG
   ------------------------------------------------------------------
   v2.1 published the fused view by REPLACING the global:

       window.DIVYA_DESAMS = fused;          // v2.1 — reference swap

   That silently orphaned v1. Section B captures its own reference at
   parse time, before any v2 file runs:

       // dd_v1_patch.js, Section B IIFE
       const DIVYA_DESAMS = window.DIVYA_DESAMS;

   Because index.html loads dd_v1_patch.js FIRST (it must -- Section A
   assigns window.DIVYA_DESAMS unconditionally and would clobber v2 if
   it ran later), that const binds to v1's ORIGINAL array. The v2.1
   reference swap then pointed the global at a brand-new array while
   Section B kept using the old one.

   Consequences, all invisible because nothing errors:
     - dd_v2_canon reconciled the arrays it could see, never v1's.
     - buildRelatedTab() reads categories off Section B's array, so it
       still saw the PRE-reconcile stamps -- which is exactly the data
       that made its "All N temples" counts wrong in the first place.
     - posture_class never appeared on the records Section B reads.

   The fix is to MERGE IN PLACE. We keep v1's array object and v1's
   element objects, and assign the base fields onto them. Every holder
   of a stale reference -- Section B's const, the marker map, anything
   captured earlier -- immediately sees the same, correct records.
   Identity is preserved at both levels:

       window.DIVYA_DESAMS  === v1's array        (same reference)
       window.DIVYA_DESAMS[i] === v1's record     (same reference)

   dd_v2_canon then stamps DD_TEMPLES and this shared array, so the
   Related tab and the filter chain finally read the same categories.

   Fallback: if v1 is absent (v2 loaded standalone), we build the fused
   array from scratch exactly as v2.1 did.

   LOAD ORDER (unchanged):
     dd_v1_patch.js        <- legacy: popup system + sidebar
     dd_v2_base.js
     dd_v2_enrichment.js
     dd_v2_loader.js       <- this file
     dd_v2_canon.js
     dd_v2_filters.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_LOADER_LOADED) return;
  window.DD_V2_LOADER_LOADED = true;

  function assemble() {
    var base = window.DD_TEMPLES;
    var enr  = window.DD_ENRICHMENT;

    if (!base || !enr) { setTimeout(assemble, 50); return; }

    /* Integrity gate: warn rather than publish a partial corpus. */
    var missing = base.filter(function (b) { return !enr[b.sno]; });
    if (missing.length) {
      console.warn('[dd_v2_loader] ' + missing.length +
                   ' base records have no enrichment: ' +
                   missing.map(function (m) { return m.sno; }).join(','));
    }

    var existing = window.DIVYA_DESAMS;
    var mode, fused, merged = 0, added = 0;

    if (Array.isArray(existing) && existing.length) {
      /* ---- IN-PLACE MERGE (v1 present) ------------------------------
         Mutate v1's own records so every stale reference stays valid. */
      mode = 'in-place';
      var bySno = {};
      existing.forEach(function (t) { if (t && t.sno != null) bySno[t.sno] = t; });

      base.forEach(function (b) {
        var t = bySno[b.sno];
        if (t) {
          /* Copy base fields onto v1's EXISTING object. Base is the
             authority for coordinates, names, region and the derived
             posture_class. Enrichment fields already live on v1's
             record, so they are left untouched. */
          Object.keys(b).forEach(function (k) {
            if (k === 'categories') {
              /* Preserve the array IDENTITY v1 already holds -- replacing
                 it would re-orphan exactly what this fix repairs. Mutate
                 its contents instead. dd_v2_canon reconciles afterwards. */
              if (!Array.isArray(t.categories)) t.categories = [];
              var src = Array.isArray(b.categories) ? b.categories : [];
              src.forEach(function (c) {
                if (t.categories.indexOf(c) < 0) t.categories.push(c);
              });
            } else {
              t[k] = b[k];
            }
          });
          merged++;
        } else {
          /* sno present in base but not in v1 -- append it. */
          existing.push(Object.assign({}, enr[b.sno] || {}, b));
          added++;
        }
      });
      fused = existing;                       /* SAME array reference */
    } else {
      /* ---- STANDALONE (no v1) --------------------------------------- */
      mode = 'standalone';
      fused = base.map(function (b) {
        return Object.assign({}, enr[b.sno] || {}, b);
      });
      window.DIVYA_DESAMS = fused;
      merged = fused.length;
    }

    window.DD_FUSED = fused;

    /* Accessors for code already migrated off the fused view. */
    window.ddEnrich = function (sno) { return enr[sno] || null; };
    window.ddTemple = function (sno) {
      for (var i = 0; i < base.length; i++) if (base[i].sno === sno) return base[i];
      return null;
    };

    console.log('[dd_v2_loader] ' + mode + ' merge: ' + merged + ' records' +
                (added ? ' (+' + added + ' appended)' : '') +
                ' — window.DIVYA_DESAMS reference preserved, so v1 Section B ' +
                'and the Related tab now read the reconciled data.');

    document.dispatchEvent(new CustomEvent('dd:data-ready', {
      detail: { count: fused.length, mode: mode }
    }));
  }

  assemble();
})();
