/* ==================================================================
   DD v2 — CANON AMENDMENT: Pancha Pandava        (Session 2C.1a)
   ------------------------------------------------------------------
   CANON.pancha_pandava is corrected from

       [90, 91, 92, 93, 94]   ->   [90, 91, 92, 93, 95]

   #94 Thirunavay is NOT one of the Pancha Pandava shrines. It is the
   Navamukunda temple on the Bharathapuzha, famous as the site of the
   Mamankam festival held once in twelve years, and as a place of
   pitru tarpanam likened to Kashi. It entered the set because its
   sthala purana wrongly claims the Sahadeva attribution.

   The fifth member is #95 THIRUVANVANDOOR, canonically the shrine of
   NAKULA. Every source agrees on the five and their brothers:

       Thrichittatt      #91   Yudhishthira
       Puliyur           #92   Bheema
       Aranmula          #93   Arjuna
       Thiruvanvandoor   #95   Nakula
       Thrikodithanam    #90   Sahadeva

   Verified against the Wikipedia articles for Thrichittatt, Puliyur,
   Aranmula Parthasarathy and Thrikodithanam, each of which lists the
   same five, and against garudaseva.org.

   WHY THIS IS A SEPARATE FILE
   ---------------------------
   CANON lives inside dd_v2_canon.js, which is not baked and is
   rebuilt on every load. Amending it at runtime is the same pattern
   dd_v2_canon2.js used for the Nava Tirupathi correction. When
   dd_v2_canon.js is next edited directly, this file can be folded in
   and removed.

   \u26A0 The pancha_pandava description written into the baked
   dd_v2_session2a3.js still names the old membership. That file no
   longer executes, so it is an audit-trail artefact only.

   LOAD ORDER — immediately after dd_v2_canon.js:
     dd_v2_canon.js
     dd_v2_canon_fix.js     <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2C1A_LOADED) return;
  window.DD_SESSION_2C1A_LOADED = true;

  var CORRECT = [90, 91, 92, 93, 95];

  var ATTRIBUTION = {
    90: 'Sahadeva', 91: 'Yudhishthira', 92: 'Bheema',
    93: 'Arjuna',   95: 'Nakula'
  };

  function apply(tries) {
    tries = tries || 0;
    if (!window.DD_CANON) {
      if (tries > 100) { console.warn('[dd_v2_canon_fix] DD_CANON never arrived.'); return; }
      return setTimeout(function () { apply(tries + 1); }, 60);
    }

    var before = (window.DD_CANON.pancha_pandava || []).slice();
    window.DD_CANON.pancha_pandava = CORRECT.slice();
    window.DD_PANCHA_PANDAVA_ATTRIBUTION = ATTRIBUTION;

    /* Re-stamp so the change reaches every corpus array, and rebuild
       v1's CATEGORIES table so the Related tab count follows. */
    if (window.DDCanon) {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
      try { window.DDCanon.syncLegacyCategories(); } catch (e) {}
    }

    var changed = JSON.stringify(before) !== JSON.stringify(CORRECT);
    console.log('[dd_v2_canon_fix] pancha_pandava [' + before.join(',') + '] -> [' +
                CORRECT.join(',') + ']' + (changed ? '' : ' (already correct)') +
                ' \u2014 #94 Thirunavay removed, #95 Thiruvanvandoor added.');

    if (window.DDMarkers && window.DDMarkers.build) {
      setTimeout(function () {
        try {
          window.DDMarkers.build();
          if (window.DDFilter && window.DDFilter.apply) window.DDFilter.apply();
        } catch (e) {}
      }, 400);
    }
  }

  window.DDPanchaPandava = {
    members: CORRECT,
    attribution: ATTRIBUTION,
    report: function () {
      var T = window.DIVYA_DESAMS || [];
      console.log('%c=== Pancha Pandava Divya Desams ===',
                  'font-weight:700;color:#1E5AA0');
      console.table(CORRECT.map(function (s) {
        var t = T.filter(function (x) { return x.sno === s; })[0] || {};
        return { sno: s, temple: t.temple_name_short, town: (t.town || '').split(',')[0],
                 pandava: ATTRIBUTION[s] };
      }));
      console.log('#94 Thirunavay is NOT a Pancha Pandava shrine \u2014 it is the ' +
                  'Mamankam site. Its purana wrongly claims the Sahadeva attribution.');
      console.log('\u26A0 The puranas of these five still narrate the wrong brother. ' +
                  'See each record\u2019s canonical_note.');
      return CORRECT;
    }
  };

  apply(0);
})();
