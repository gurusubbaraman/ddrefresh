/* ==================================================================
   DD v2 — LOADER / COMPATIBILITY SHIM     v2.3 (in-place merge+sort)
   ------------------------------------------------------------------
   Joins the thin base to the parallel enrichment and keeps the fused
   view that DD v1 Section B expects.

   WHY A SHIM IS NEEDED
   --------------------
   PPS keeps base and enrichment permanently separate because its base
   render() only touches base fields and its detail panel reads
   window.TEMPLE_ENRICHMENT[sno] explicitly.

   DD is not there yet. dd_v1_patch.js Section B builds its five-tab
   popup by reading enrichment fields straight off the temple object
   (temple.sthala_purana, temple.alwars, temple.sii_references, ...).
   Splitting the array without a shim would blank every popup tab.

   ------------------------------------------------------------------
   v2.2 — THE ORPHANED-ARRAY FIX (retained)
   ------------------------------------------------------------------
   v2.1 published the fused view by REPLACING the global:

       window.DIVYA_DESAMS = fused;          // reference swap

   That silently orphaned v1, which captures its own reference at
   parse time:

       const DIVYA_DESAMS = window.DIVYA_DESAMS;   // Section B IIFE

   Because index.html loads dd_v1_patch.js FIRST (it must -- Section A
   assigns window.DIVYA_DESAMS unconditionally and would clobber v2 if
   it ran later), that const binds to v1's ORIGINAL array. The swap
   then pointed the global at a new array while Section B kept using
   the old one, so canon reconciliation never reached the Related tab.

   The fix is to MERGE IN PLACE: keep v1's array object and v1's
   record objects, assigning base fields onto them. Identity is
   preserved at both levels, so every stale reference stays correct:

       window.DIVYA_DESAMS    === v1's array
       window.DIVYA_DESAMS[i] === v1's record

   ------------------------------------------------------------------
   v2.3 — SORT BY SNO
   ------------------------------------------------------------------
   v1's buildSidebarList() renders the corpus in ARRAY ORDER -- it has
   no sort of its own:

       filteredTemples.forEach(function (temple) { ... })

   The array order was the original authoring order in dd_v1_patch.js,
   which was never sno-sorted. It surfaced in the marker log as

       [map] 109 markers visible (SNos: 1,97,109,46,47,48,...)

   so the sidebar listed temples in an order no visitor could predict,
   making a specific temple hard to find. The in-place merge preserved
   that order faithfully, which meant it preserved the problem too.

   This version sorts every corpus array by sno, ascending, IN PLACE.
   Array.prototype.sort mutates the same array object, so v1 Section
   B's captured reference remains valid -- sorting does not reintroduce
   the orphaning bug that v2.2 fixed.

   Sorting the data rather than patching the renderer means the
   sidebar, and anything else that iterates the corpus, is ordered
   consistently without touching dd_v1_patch.js.

   LOAD ORDER:
     dd_v1_patch.js        <- legacy: popup system + sidebar
     dd_v2_base.js
     dd_v2_enrichment.js
     dd_v2_loader.js       <- this file
     dd_v2_canon.js
     dd_v2_coords.js
     dd_v2_remap.js
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_LOADER_LOADED) return;
  window.DD_V2_LOADER_LOADED = true;

  function assemble() {
    var base = window.DD_TEMPLES;
    var enr  = window.DD_ENRICHMENT;

    if (!base || !enr) { setTimeout(assemble, 50); return; }

    var missing = base.filter(function (b) { return !enr[b.sno]; });
    if (missing.length) {
      console.warn('[dd_v2_loader] ' + missing.length +
                   ' base records have no enrichment: ' +
                   missing.map(function (m) { return m.sno; }).join(','));
    }

    var existing = window.DIVYA_DESAMS;
    var mode, fused, merged = 0, added = 0;

    if (Array.isArray(existing) && existing.length) {
      /* ---- IN-PLACE MERGE (v1 present) --------------------------- */
      mode = 'in-place';
      var bySno = {};
      existing.forEach(function (t) { if (t && t.sno != null) bySno[t.sno] = t; });

      base.forEach(function (b) {
        var t = bySno[b.sno];
        if (t) {
          /* Copy base fields onto v1's EXISTING object. Base is the
             authority for coordinates, names, region and the derived
             posture_class. Enrichment already lives on v1's record. */
          Object.keys(b).forEach(function (k) {
            if (k === 'categories') {
              /* Preserve the array identity v1 already holds -- replacing
                 it would re-orphan exactly what this fix repairs. */
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
          existing.push(Object.assign({}, enr[b.sno] || {}, b));
          added++;
        }
      });
      fused = existing;                       /* SAME array reference */
    } else {
      /* ---- STANDALONE (no v1) ------------------------------------ */
      mode = 'standalone';
      fused = base.map(function (b) {
        return Object.assign({}, enr[b.sno] || {}, b);
      });
      window.DIVYA_DESAMS = fused;
      merged = fused.length;
    }

    window.DD_FUSED = fused;

    /* ---- v2.3: sort every corpus array by sno, in place ---------- */
    var sorted = sortCorpus();

    /* Accessors for code already migrated off the fused view. */
    window.ddEnrich = function (sno) { return enr[sno] || null; };
    window.ddTemple = function (sno) {
      for (var i = 0; i < base.length; i++) if (base[i].sno === sno) return base[i];
      return null;
    };

    console.log('[dd_v2_loader] ' + mode + ' merge: ' + merged + ' records' +
                (added ? ' (+' + added + ' appended)' : '') +
                ' — reference preserved, ' + sorted + ' array(s) sorted by sno.');

    /* If v1 already rendered the sidebar in the old order, rebuild it
       so the sorted order is what the visitor actually sees. */
    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () {
        try { window.buildSidebarList(); } catch (e) {}
      }, 150);
    }

    document.dispatchEvent(new CustomEvent('dd:data-ready', {
      detail: { count: fused.length, mode: mode }
    }));
  }

  /* Sort all known corpus arrays ascending by sno, mutating in place
     so every captured reference stays valid. Safe to call repeatedly. */
  function sortCorpus() {
    var seen = [], n = 0;
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A);
      A.sort(function (a, b) { return (a.sno || 0) - (b.sno || 0); });
      n++;
    });
    return n;
  }

  window.DDLoader = {
    sortCorpus: sortCorpus,
    resort: function () {
      var n = sortCorpus();
      if (typeof window.buildSidebarList === 'function') {
        try { window.buildSidebarList(); } catch (e) {}
      }
      console.log('[dd_v2_loader] re-sorted ' + n + ' array(s) by sno.');
      return n;
    }
  };

  assemble();
})();
