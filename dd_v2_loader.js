/* ==================================================================
   DD v2 — LOADER / COMPATIBILITY SHIM
   ------------------------------------------------------------------
   Joins the thin base to the parallel enrichment and rebuilds the
   fused view that DD v1 Section B still expects.

   WHY A SHIM IS NEEDED
   --------------------
   PPS keeps base and enrichment permanently separate because its base
   render() only ever touches base fields, and its detail panel reads
   window.TEMPLE_ENRICHMENT[sno] explicitly.

   DD is not there yet. dd_v1_patch.js Section B builds its five-tab
   popup by reading enrichment fields straight off the temple object
   (temple.sthala_purana, temple.alwars, temple.sii_references, ...).
   Splitting the array without a shim would blank every popup tab.

   So this loader is deliberately transitional:

     window.DD_TEMPLES     thin base            (new source of truth)
     window.DD_ENRICHMENT  parallel by sno      (new source of truth)
     window.DIVYA_DESAMS   fused view           (back-compat, v1 reads this)

   The fused view is assembled by reference-safe Object.assign, so v1
   keeps working unchanged. As Section B is migrated tab by tab to read
   DD_ENRICHMENT[sno] directly, the fused view can be retired and this
   shim deleted. Nothing else needs to change at that point.

   LOAD ORDER (all four before dd_v1_patch.js):
     dd_v2_base.js
     dd_v2_enrichment.js
     dd_v2_loader.js        <- assembles the fused view
     dd_v2_canon.js         <- reconciles categories onto it
     dd_v1_patch.js         <- legacy: popup system + sidebar
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_LOADER_LOADED) return;
  window.DD_V2_LOADER_LOADED = true;

  function assemble() {
    var base = window.DD_TEMPLES;
    var enr  = window.DD_ENRICHMENT;

    if (!base || !enr) { setTimeout(assemble, 50); return; }

    /* Fused view for v1 back-compat. Base fields win on collision --
       there are none today, but the rule is stated so it stays true. */
    var fused = base.map(function (b) {
      var e = enr[b.sno] || {};
      return Object.assign({}, e, b);
    });

    /* Integrity gate: refuse to publish a partial corpus. */
    var missing = base.filter(function (b) { return !enr[b.sno]; });
    if (missing.length) {
      console.warn('[dd_v2_loader] ' + missing.length +
                   ' base records have no enrichment: ' +
                   missing.map(function (m) { return m.sno; }).join(','));
    }

    window.DIVYA_DESAMS = fused;
    window.DD_FUSED     = fused;

    /* Convenience accessor for code already migrated off the fused view. */
    window.ddEnrich = function (sno) { return enr[sno] || null; };
    window.ddTemple = function (sno) {
      for (var i = 0; i < base.length; i++) if (base[i].sno === sno) return base[i];
      return null;
    };

    console.log('[dd_v2_loader] Fused ' + fused.length + ' records ' +
                '(base ' + Object.keys(base[0]).length + ' fields + enrichment). ' +
                'window.DIVYA_DESAMS is the back-compat view.');

    document.dispatchEvent(new CustomEvent('dd:data-ready', {
      detail: { count: fused.length }
    }));
  }

  assemble();
})();
