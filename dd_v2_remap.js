/* ==================================================================
   DD v2 — CANON REMAP: Thirunangur 11        (Session 2A.1 — Owner)
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
   is NOT one of the eleven, and that Thiruvellakulam IS -- it is a
   full member, not an appended twelfth.

   THIS SESSION THEREFORE:
     1. Moves the Thiruvellakulam record into slot #68.
     2. Releases #83 as a vacant slot, to be filled by a temple still
        to be identified.
     3. Retires the Loganatha / Thetriyambalam record.

   Slot #68 was chosen deliberately: it keeps the eleven contiguous at
   #60-70, so CANON.thirunangur_cluster needs no edit at all and every
   downstream count stays correct by construction.

   ------------------------------------------------------------------
   ⚠️  CORPUS COUNT — READ THIS
   ------------------------------------------------------------------
   Terrestrial Divya Desams go from 108 to 107, with #83 vacant.

       before   #1-#108 occupied      = 108 terrestrial
       after    #1-#82, #84-#108      = 107 terrestrial, #83 vacant
                (+#109 abhimana, #110-111 celestial, unchanged)

   Exactly one temple is required to restore the canonical 108. That
   matches the stated intent -- "release #83 for another temple we
   have to find to add to the canon" -- but until that temple is
   identified the site legitimately holds 107.

   Nothing renders for #83; the record is removed rather than left as
   a broken placeholder card.

   ------------------------------------------------------------------
   NOTHING IS DESTROYED
   ------------------------------------------------------------------
   The Loganatha / Thetriyambalam record is not deleted. Its full base
   and enrichment content is parked at:

       window.DD_RETIRED_RECORDS.loganatha_thetriyambalam

   If the ruling is ever revisited -- or if Thetriyambalam turns out to
   belong elsewhere in the corpus -- the record can be restored intact
   with DDRemap.restoreRetired(sno). No data is lost by deploying this.

   ------------------------------------------------------------------
   OPEN QUESTION FOR THE OWNER
   ------------------------------------------------------------------
   Thiru Thetriyambalam appears in most published lists of the 108 as
   a Divya Desam in its own right. Two readings are possible and this
   session does not choose between them:

     (a) It is a genuine Divya Desam that simply is not one of the
         Thirunangur eleven, in which case it should be RESTORED into
         the vacant #83 rather than a new temple being sought -- and
         the corpus returns to 108 immediately.

     (b) It is spurious or a duplicate in this corpus, in which case
         #83 stays open for the temple being researched.

   The instruction given implies (b). Say the word and a one-line
   follow-up session moves it to #83 instead.

   LOAD ORDER — after coords, before filters and markers:
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

  var TARGET = 68;    /* slot that receives Thiruvellakulam        */
  var SOURCE = 83;    /* slot being released                        */

  /* Owner GPS for Thiruvellakulam, carried over from the 1D.1 pass. */
  var TV_LAT = 11.19031776916355;
  var TV_LNG = 79.76485614916194;
  var SRC    = 'Owner GPS, Session 1D.1 (applied via 2A.1 remap). Confidence: HIGH.';

  window.DD_RETIRED_RECORDS = window.DD_RETIRED_RECORDS || {};

  function arrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A); out.push(A);
    });
    return out;
  }

  function run() {
    var ARRS = arrays();
    if (!ARRS.length) { setTimeout(run, 60); return; }

    var ENR = window.DD_ENRICHMENT || {};

    /* ---- 0. sanity: both slots must exist in the primary array ---- */
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
        base: JSON.parse(JSON.stringify(old)),
        enrichment: ENR[TARGET] ? JSON.parse(JSON.stringify(ENR[TARGET])) : null
      };
    }

    /* ---- 2. capture the incoming record before removal ----------- */
    var srcBase = primary.filter(function (t) { return t.sno === SOURCE; })[0];
    var srcSnapshot = JSON.parse(JSON.stringify(srcBase));
    var srcEnr = ENR[SOURCE] ? JSON.parse(JSON.stringify(ENR[SOURCE])) : null;

    /* ---- 3. overwrite #68 in every corpus array, in place -------- */
    /* Mutating the existing objects preserves the references held by
       v1 Section B, the marker map and anything else captured earlier
       -- the same discipline the loader's in-place merge relies on. */
    var patched = 0;
    ARRS.forEach(function (T) {
      T.forEach(function (t) {
        if (t.sno !== TARGET) return;

        /* wipe every field except the canonical sno */
        Object.keys(t).forEach(function (k) {
          if (k !== 'sno') delete t[k];
        });
        /* copy the incoming record, keeping sno = 68 */
        Object.keys(srcSnapshot).forEach(function (k) {
          if (k !== 'sno') t[k] = JSON.parse(JSON.stringify(srcSnapshot[k]));
        });

        t.lat = TV_LAT;
        t.lng = TV_LNG;
        t.coords_verified = true;
        t.coords_source = SRC + ' Thiruvellakulam.';

        /* full member of the eleven, not an appended twelfth */
        if (!Array.isArray(t.categories)) t.categories = [];
        if (t.categories.indexOf('thirunangur_cluster') < 0) {
          t.categories.push('thirunangur_cluster');
        }
        patched++;
      });
    });

    /* ---- 4. enrichment: move 83 -> 68, correct the cluster text --- */
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

    /* ---- 5. release #83 from every array, preserving identity ----- */
    var removed = 0;
    ARRS.forEach(function (T) {
      for (var i = T.length - 1; i >= 0; i--) {
        if (T[i] && T[i].sno === SOURCE) { T.splice(i, 1); removed++; }
      }
    });

    /* ---- 6. re-stamp canonical categories ------------------------ */
    if (window.DDCanon && typeof window.DDCanon.reconcileCategories === 'function') {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
    }

    /* ---- 7. drop any stale marker for the released slot ----------- */
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

    console.log('[dd_v2_remap] Session 2A.1: #' + SOURCE + ' -> #' + TARGET +
                ' (' + patched + ' array slot(s) rewritten, ' + removed +
                ' record(s) released).');
    console.log('[dd_v2_remap] Thirunangur 11 = #60-70 with #68 now ' +
                'Sri Annan Perumal (Thiruvellakulam).');
    console.log('[dd_v2_remap] ⚠️ terrestrial Divya Desams now ' + terr +
                ' — slot #83 is vacant, 1 temple needed to restore 108.');
    console.log('[dd_v2_remap] retired record parked at ' +
                'window.DD_RETIRED_RECORDS.loganatha_thetriyambalam');

    if (window.DDMarkers && typeof window.DDMarkers.restyle === 'function') {
      setTimeout(function () { try { window.DDMarkers.restyle(); } catch (e) {} }, 450);
    }
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { try { window.DDFilter.apply(); } catch (e) {} }, 500);
    }

    window.DD_REMAP_2A1 = { target: TARGET, source: SOURCE, terrestrial: terr };
  }

  window.DDRemap = {
    run: run,
    retired: function () { return window.DD_RETIRED_RECORDS; },

    /* Restore a parked record into a given slot. Use this if the
       Thetriyambalam ruling is revisited -- e.g.
       DDRemap.restoreRetired('loganatha_thetriyambalam', 83). */
    restoreRetired: function (key, intoSno) {
      var rec = (window.DD_RETIRED_RECORDS || {})[key];
      if (!rec) { console.warn('[dd_v2_remap] no retired record "' + key + '".'); return false; }
      var ARRS = arrays();
      if (!ARRS.length) return false;
      if (ARRS[0].some(function (t) { return t.sno === intoSno; })) {
        console.warn('[dd_v2_remap] slot #' + intoSno + ' is occupied — not restored.');
        return false;
      }
      ARRS.forEach(function (T) {
        var copy = JSON.parse(JSON.stringify(rec.base));
        copy.sno = intoSno;
        T.push(copy);
        T.sort(function (a, b) { return a.sno - b.sno; });
      });
      if (rec.enrichment && window.DD_ENRICHMENT) {
        window.DD_ENRICHMENT[intoSno] = JSON.parse(JSON.stringify(rec.enrichment));
      }
      if (window.DDCanon) { try { window.DDCanon.reconcileCategories(); } catch (e) {} }
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
