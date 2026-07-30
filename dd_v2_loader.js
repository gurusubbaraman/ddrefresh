/* ==================================================================
   DD v2 — LOADER / COMPATIBILITY SHIM      v3.0 (post-bake)  2026-07-30
   ------------------------------------------------------------------
   Joins the baked thin base to the baked enrichment and publishes the
   fused view that dd_v1_patch.js Section B reads.

   ------------------------------------------------------------------
   WHAT CHANGED AT THE BAKE, AND WHY IT HAD TO
   ------------------------------------------------------------------
   Before the bake, dd_v1_patch.js Section A published its own 111
   record array and the session files then edited it into shape --
   dd_v2_names.js and dd_v2_session2a3.js each called release() to
   splice out records the merges had displaced (#44, #45, #79, and
   the old #42).

   Those session files no longer load. So the loader has to do what
   they used to do, or v1's stale records survive untouched. The
   first verification run of the bake caught exactly that: the corpus
   came out at 107 terrestrial instead of 106, with #79 Aravindalochanar
   still present because nothing removed it any more.

   Hence two behaviours that are new in v3.0:

     PRUNE      any record in the fused view whose sno is absent from
                the baked base is removed. The baked base is now the
                authoritative membership list.

     OVERWRITE  base fields REPLACE v1's values rather than merging
                alongside them. v1 still ships pre-merge names such as
                "Sri Lakshmi Narasimha (Thiruvali)" at #42, and the
                baked value must win.

   Enrichment is applied from DD_ENRICHMENT for every record, so a
   record whose content changed in a merge -- #43 Thanjai, #78 Irattai,
   #80 Thiruvali-Thirunagari -- carries the merged purana rather than
   v1's original.

   ------------------------------------------------------------------
   WHAT DID NOT CHANGE
   ------------------------------------------------------------------
   The in-place discipline from v2.2 is intact and still load-bearing.
   dd_v1_patch.js Section B captures its array reference at parse time:

       const DIVYA_DESAMS = window.DIVYA_DESAMS;   // Section B IIFE

   so the global must be MUTATED, never reassigned. Splicing and
   field-copying preserve the reference; `window.DIVYA_DESAMS = x`
   would orphan Section B and blank every popup tab.

   Sorting by sno from v2.3 is also retained -- v1's renderer iterates
   the array in order and has no sort of its own.

   LOAD ORDER
     dd_v1_patch.js         legacy popup + sidebar
     dd_v2_base.js          baked
     dd_v2_enrichment.js    baked
     dd_v2_loader.js        this file
     dd_v2_canon.js         consolidated
     dd_v2_filters.js
     dd_v2_markers.js
     dd_feedback.js
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

    var valid = {};
    base.forEach(function (b) { valid[b.sno] = b; });

    var existing = window.DIVYA_DESAMS;
    var mode, fused, merged = 0, added = 0, pruned = 0;

    if (Array.isArray(existing) && existing.length) {
      mode = 'in-place';

      /* 1. PRUNE — drop anything the baked base does not contain.
            This replaces the release() calls the session files used
            to make. Without it, v1's pre-merge records survive. */
      for (var i = existing.length - 1; i >= 0; i--) {
        var rec = existing[i];
        if (!rec || rec.sno == null || !valid[rec.sno]) {
          existing.splice(i, 1);
          pruned++;
        }
      }

      var bySno = {};
      existing.forEach(function (t) { bySno[t.sno] = t; });

      /* 2. APPLY — baked base wins, then enrichment fills the rest. */
      base.forEach(function (b) {
        var t = bySno[b.sno];
        var e = enr[b.sno] || {};
        if (t) {
          /* enrichment first so base fields overwrite on collision */
          Object.keys(e).forEach(function (k) {
            if (k === 'categories') return;
            t[k] = e[k];
          });
          Object.keys(b).forEach(function (k) {
            if (k === 'categories') {
              /* preserve the array identity v1 already holds */
              if (!Array.isArray(t.categories)) t.categories = [];
              t.categories.length = 0;
              (Array.isArray(b.categories) ? b.categories : []).forEach(function (c) {
                t.categories.push(c);
              });
            } else {
              t[k] = b[k];
            }
          });
          merged++;
        } else {
          existing.push(Object.assign({}, e, b));
          added++;
        }
      });
      fused = existing;                       /* SAME array reference */
    } else {
      mode = 'standalone';
      fused = base.map(function (b) {
        return Object.assign({}, enr[b.sno] || {}, b);
      });
      window.DIVYA_DESAMS = fused;
      merged = fused.length;
    }

    window.DD_FUSED = fused;
    var sorted = sortCorpus();

    window.ddEnrich = function (sno) { return enr[sno] || null; };
    window.ddTemple = function (sno) {
      for (var i = 0; i < base.length; i++) if (base[i].sno === sno) return base[i];
      return null;
    };

    console.log('[dd_v2_loader] ' + mode + ': ' + merged + ' records' +
                (added ? ', +' + added + ' added' : '') +
                (pruned ? ', ' + pruned + ' pruned' : '') +
                ' \u2014 reference preserved, ' + sorted + ' array(s) sorted by sno.');

    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () { try { window.buildSidebarList(); } catch (e) {} }, 150);
    }
    document.dispatchEvent(new CustomEvent('dd:data-ready', {
      detail: { count: fused.length, mode: mode }
    }));
  }

  /* Sort every known corpus array ascending by sno, mutating in place
     so captured references stay valid. Safe to call repeatedly. */
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
      console.log('[dd_v2_loader] re-sorted ' + n + ' array(s).');
      return n;
    }
  };

  assemble();
})();
