/* ==================================================================
   DD v2 — CANON REMAP: Thirunangur 11        (Session 2A.1 — Owner)
   v2 — FIXES THE EMPTY-TABS REGRESSION
   ------------------------------------------------------------------
   OWNER RULING
   ------------------------------------------------------------------
   The Thirunangur cluster is exactly ELEVEN temples. The corpus had
   twelve records attached to it:

       #60-70  eleven, tagged thirunangur_cluster / nangur_11
       #83     Sri Annan Perumal (Thiruvellakulam), whose own
               canonical_cluster field read
               "Thirunangur 12th Temple (Thenn Tirupathi)"

   Owner rules that #68 Sri Loganatha Perumal (Thiru Thetriyambalam)
   is NOT one of the eleven, and that Thiruvellakulam IS -- a full
   member, not an appended twelfth.

   THIS SESSION:
     1. Moves the Thiruvellakulam record into slot #68.
     2. Releases #83 as a vacant slot.
     3. Retires the Loganatha / Thetriyambalam record.

   Slot #68 keeps the eleven contiguous at #60-70, so
   CANON.thirunangur_cluster needs no edit and every downstream count
   stays correct by construction.

   ------------------------------------------------------------------
   v2 FIX — WHY #68's TABS CAME UP EMPTY
   ------------------------------------------------------------------
   v1 of this file took its source snapshot from ARRS[0]:

       var primary     = ARRS[0];                    // window.DD_TEMPLES
       var srcSnapshot = clone(primary.find(sno===83));

   ARRS[0] is the THIN BASE -- 22 fields, no enrichment. The patch
   loop then wiped the target record clean and copied that snapshot
   into EVERY corpus array, including the fused back-compat view:

       delete every key except sno
       copy srcSnapshot                              // base fields only

   On window.DD_TEMPLES that is correct: the thin base is supposed to
   hold base fields only. On window.DIVYA_DESAMS it was destructive --
   that record had carried enrichment merged in by the loader, and the
   wipe removed sthala_purana, sthala_purana_ta, alwars,
   sii_references, external_sources, audio_sources and the rest.

   dd_v1_patch.js Section B builds its five tabs by reading those
   fields straight off the temple object, so:

       Sthala   reads temple.sthala_purana      -> gone -> empty
       Alwars   reads temple.alwars             -> gone -> empty
       Listen   reads temple.audio_sources      -> gone -> empty
       Sources  reads temple.sii_references     -> gone -> empty
       Related  reads temple.categories         -> PRESENT -> worked

   That is exactly the reported symptom: every tab blank except
   Related.

   The fix is to write the RIGHT SHAPE into each array. The thin base
   receives base fields only; every other array receives enrichment
   merged with base, which is precisely what the loader would have
   produced for that record. Enrichment is sourced from
   window.DD_ENRICHMENT[83], captured before it is moved.

   ------------------------------------------------------------------
   ⚠️  CORPUS COUNT
   ------------------------------------------------------------------
   Terrestrial Divya Desams go 108 -> 107, with #83 vacant.
   Exactly one temple is needed to restore the canonical 108.

   ------------------------------------------------------------------
   NOTHING IS DESTROYED
   ------------------------------------------------------------------
   The Loganatha / Thetriyambalam record is parked in full at
       window.DD_RETIRED_RECORDS.loganatha_thetriyambalam
   and can be restored with
       DDRemap.restoreRetired('loganatha_thetriyambalam', 83)

   OPEN QUESTION: Thetriyambalam appears in most published lists of
   the 108 in its own right. If it is a genuine Divya Desam that
   simply is not one of the Thirunangur eleven, restore it into #83
   and the corpus returns to 108 immediately. This session assumes
   the alternative -- that #83 stays open for the temple being
   researched -- per the instruction given.

   LOAD ORDER:
     dd_v2_canon.js
     dd_v2_coords.js
     dd_v2_remap.js         <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2A1_LOADED) return;
  window.DD_SESSION_2A1_LOADED = true;

  var TARGET = 68;    /* slot that receives Thiruvellakulam */
  var SOURCE = 83;    /* slot being released                */

  var TV_LAT = 11.19031776916355;
  var TV_LNG = 79.76485614916194;
  var SRC    = 'Owner GPS, Session 1D.1 (applied via 2A.1 remap). Confidence: HIGH.';

  window.DD_RETIRED_RECORDS = window.DD_RETIRED_RECORDS || {};

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function arrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A); out.push(A);
    });
    return out;
  }

  /* Keep every corpus array in ascending sno order, in place. */
  function sortBySno() {
    arrays().forEach(function (A) {
      A.sort(function (a, b) { return (a.sno || 0) - (b.sno || 0); });
    });
  }

  function run() {
    var ARRS = arrays();
    if (!ARRS.length) { setTimeout(run, 60); return; }

    var ENR = window.DD_ENRICHMENT || {};
    var thin = window.DD_TEMPLES;
    var primary = ARRS[0];

    var hasT = primary.some(function (t) { return t.sno === TARGET; });
    var hasS = primary.some(function (t) { return t.sno === SOURCE; });
    if (!hasT || !hasS) {
      console.warn('[dd_v2_remap] slots not found (#' + TARGET + ':' + hasT +
                   ', #' + SOURCE + ':' + hasS + ') — remap skipped.');
      return;
    }

    /* ---- 1. park the outgoing record, once ----------------------- */
    if (!window.DD_RETIRED_RECORDS.loganatha_thetriyambalam) {
      var old = primary.filter(function (t) { return t.sno === TARGET; })[0];
      window.DD_RETIRED_RECORDS.loganatha_thetriyambalam = {
        retired_from_sno: TARGET,
        retired_by: 'Session 2A.1 — owner ruling: not one of the Thirunangur 11',
        base: clone(old),
        enrichment: ENR[TARGET] ? clone(ENR[TARGET]) : null
      };
    }

    /* ---- 2. capture the incoming record BEFORE removal ------------ */
    /* Base shape comes from the thin array so it stays thin; the rich
       shape is base + enrichment, matching what the loader builds. */
    var srcBaseSrc = (thin || primary).filter(function (t) { return t.sno === SOURCE; })[0]
                     || primary.filter(function (t) { return t.sno === SOURCE; })[0];
    var baseShape  = clone(srcBaseSrc);
    var srcEnr     = ENR[SOURCE] ? clone(ENR[SOURCE]) : null;
    var richShape  = Object.assign({}, srcEnr || {}, baseShape);

    /* ---- 3. overwrite #68 in every array, with the RIGHT shape ---- */
    var patched = 0, richWrites = 0;
    ARRS.forEach(function (T) {
      var isThin = (T === thin);
      var shape  = isThin ? baseShape : richShape;
      T.forEach(function (t) {
        if (t.sno !== TARGET) return;

        Object.keys(t).forEach(function (k) { if (k !== 'sno') delete t[k]; });
        Object.keys(shape).forEach(function (k) {
          if (k !== 'sno') t[k] = clone(shape[k]);
        });

        t.lat = TV_LAT;
        t.lng = TV_LNG;
        t.coords_verified = true;
        t.coords_source = SRC + ' Thiruvellakulam.';

        if (!Array.isArray(t.categories)) t.categories = [];
        if (t.categories.indexOf('thirunangur_cluster') < 0) {
          t.categories.push('thirunangur_cluster');
        }
        patched++;
        if (!isThin) richWrites++;
      });
    });

    /* ---- 4. enrichment: move 83 -> 68 ---------------------------- */
    if (srcEnr) {
      srcEnr.canonical_cluster = 'Thirunangur (Sirkazhi Kaveri Delta)';
      srcEnr.thirunangur_position = 9;
      srcEnr.canonical_note =
        'Session 2A.1 (owner ruling): a full member of the Thirunangur eleven, ' +
        'not an appended twelfth. Moved from sno 83 to sno 68; the record ' +
        'formerly at 68 (Loganatha, Thiru Thetriyambalam) was retired as not ' +
        'one of the eleven. Also known as Thenn Tirupathi / Annan Kovil.';
      ENR[TARGET] = srcEnr;
    }
    delete ENR[SOURCE];

    /* ---- 5. release #83 ------------------------------------------ */
    var removed = 0;
    ARRS.forEach(function (T) {
      for (var i = T.length - 1; i >= 0; i--) {
        if (T[i] && T[i].sno === SOURCE) { T.splice(i, 1); removed++; }
      }
    });

    /* ---- 6. keep the corpus sorted ------------------------------- */
    sortBySno();

    /* ---- 7. re-stamp canonical categories ------------------------ */
    if (window.DDCanon && typeof window.DDCanon.reconcileCategories === 'function') {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
    }

    /* ---- 8. drop any stale marker for the released slot ----------- */
    try {
      if (window.templeMarkersMap && window.templeMarkersMap[SOURCE]) {
        if (window.templeMarkersGroup) {
          window.templeMarkersGroup.removeLayer(window.templeMarkersMap[SOURCE]);
        }
        delete window.templeMarkersMap[SOURCE];
      }
    } catch (e) {}

    var terr = primary.filter(function (t) {
      return !t.is_celestial && !t.is_abhimana;
    }).length;

    /* Integrity gate: the rich arrays must still carry enrichment. */
    var check = (window.DIVYA_DESAMS || []).filter(function (t) {
      return t.sno === TARGET;
    })[0];
    var ok = !!(check && (check.sthala_purana || check.alwars));

    console.log('[dd_v2_remap] Session 2A.1 v2: #' + SOURCE + ' -> #' + TARGET +
                ' (' + patched + ' slot(s) rewritten, ' + richWrites +
                ' with enrichment, ' + removed + ' released).');
    console.log('[dd_v2_remap] #' + TARGET + ' enrichment on fused view: ' +
                (ok ? 'present ✅' : 'MISSING ❌ — popup tabs will be empty'));
    console.log('[dd_v2_remap] Thirunangur 11 = #60-70 with #68 now ' +
                'Sri Annan Perumal (Thiruvellakulam).');
    console.log('[dd_v2_remap] ⚠️ terrestrial Divya Desams now ' + terr +
                ' — slot #83 vacant, 1 temple needed to restore 108.');

    /* Re-render the sidebar so the new order and record show up. */
    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () { try { window.buildSidebarList(); } catch (e) {} }, 120);
    }
    if (window.DDMarkers && typeof window.DDMarkers.restyle === 'function') {
      setTimeout(function () { try { window.DDMarkers.restyle(); } catch (e) {} }, 450);
    }
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { try { window.DDFilter.apply(); } catch (e) {} }, 520);
    }

    window.DD_REMAP_2A1 = { target: TARGET, source: SOURCE,
                            terrestrial: terr, enrichmentOk: ok };
  }

  window.DDRemap = {
    run: run,
    sortBySno: sortBySno,
    retired: function () { return window.DD_RETIRED_RECORDS; },

    restoreRetired: function (key, intoSno) {
      var rec = (window.DD_RETIRED_RECORDS || {})[key];
      if (!rec) { console.warn('[dd_v2_remap] no retired record "' + key + '".'); return false; }
      var ARRS = arrays();
      if (!ARRS.length) return false;
      if (ARRS[0].some(function (t) { return t.sno === intoSno; })) {
        console.warn('[dd_v2_remap] slot #' + intoSno + ' is occupied — not restored.');
        return false;
      }
      var thin = window.DD_TEMPLES;
      ARRS.forEach(function (T) {
        var isThin = (T === thin);
        var shape = isThin ? rec.base
                           : Object.assign({}, rec.enrichment || {}, rec.base);
        var copy = clone(shape);
        copy.sno = intoSno;
        T.push(copy);
      });
      if (rec.enrichment && window.DD_ENRICHMENT) {
        window.DD_ENRICHMENT[intoSno] = clone(rec.enrichment);
      }
      sortBySno();
      if (window.DDCanon) { try { window.DDCanon.reconcileCategories(); } catch (e) {} }
      if (typeof window.buildSidebarList === 'function') {
        try { window.buildSidebarList(); } catch (e) {}
      }
      console.log('[dd_v2_remap] restored "' + key + '" into #' + intoSno + '.');
      return true;
    },

    audit: function () {
      var ARRS = arrays();
      if (!ARRS.length) return null;
      var T = ARRS[0];
      var nangur = (window.DD_CANON || {}).thirunangur_cluster || [];
      console.log('%c=== Session 2A.1 — Thirunangur 11 ===',
                  'font-weight:700;color:#1E5AA0');
      console.table(nangur.map(function (s) {
        var t = T.filter(function (x) { return x.sno === s; })[0];
        return t ? { sno: s, temple: t.temple_name_short, town: t.town,
                     lat: t.lat, lng: t.lng }
                 : { sno: s, temple: 'MISSING' };
      }));
      var terr = T.filter(function (t) { return !t.is_celestial && !t.is_abhimana; }).length;
      var occupied = {}; T.forEach(function (t) { occupied[t.sno] = 1; });
      var gaps = [];
      for (var i = 1; i <= 108; i++) if (!occupied[i]) gaps.push(i);
      console.log('terrestrial: ' + terr + ' of 108 | vacant slot(s): ' +
                  (gaps.length ? '#' + gaps.join(', #') : 'none'));
      return { terrestrial: terr, vacant: gaps };
    }
  };

  run();
})();
