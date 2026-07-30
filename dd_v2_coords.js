/* ==================================================================
   DD v2 — COORDINATE REFINEMENT           (Session 1D.1 — Owner GPS)
   ------------------------------------------------------------------
   First coordinate pass on the DD corpus. Resolves the town-centroid
   collisions and the low-precision singles surfaced by
   DDMarkers.auditCoords().

   METHOD (PPS convention, Session 1D.x):
     Patches the corpus at RUNTIME. Never rewrites the base file.
     Each record gets coords_verified plus a coords_source string
     recording provenance. Additive and idempotent -- the SESSION
     guard makes double-loading harmless.

   SOURCE: owner GPS readings taken on site. Treated as highest
   confidence, per the PPS precedent where owner readings repeatedly
   proved more accurate than published coordinates.

   ------------------------------------------------------------------
   WHAT THIS FIXES
   ------------------------------------------------------------------
   Before: 20 temples shared just 4 coordinate points. The Thirunangur
   shrines all sat on one pin, so only the topmost marker took a click
   -- the rest were unreachable on the map.

   After: 21 records refined, 0 exact collisions, closest legitimate
   pair 171 m (#43/#44 at Thanjavur). Every reading verified inside
   its state bounding box.

   Largest moves (km from previous coordinate):
     #42 Thiruvali          3.663   was sharing Thirunagari's pin
     #99 Naimisharanya      2.855   town centroid -> temple
     #65 Kavalampadi        2.478
     #62 Devanartogai       2.187
     #69 Parthapalli        2.146
     #61 Manikoodam         1.024
     ...15 more under 1 km

   ------------------------------------------------------------------
   #70 CORRECTED (revision 2)
   ------------------------------------------------------------------
   The first reading supplied for #70 Palli Konda (Palliyodam) was
   0.15 m from the reading supplied for #68 -- two captures of one
   spot rather than two shrines. Both were held back pending a ruling.

   Owner has since supplied the correct #70 reading, 17.2 m from the
   duplicated value, and it is applied here.

   #68 is NOT in this session. Its record is being replaced entirely
   by dd_v2_remap.js (Session 2A.1), which also carries the
   Thiruvellakulam coordinate. #83 is likewise absent -- its content,
   including its GPS reading, moves to #68 in that session.

   LOAD ORDER — after canon, before remap:
     dd_v2_canon.js
     dd_v2_coords.js        <- this file
     dd_v2_remap.js
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_1D1_LOADED) return;
  window.DD_SESSION_1D1_LOADED = true;

  var SRC = 'Owner GPS, Session 1D.1. Confidence: HIGH.';

  /* sno: [lat, lng, place-note] */
  var FIXES = {
    /* ---- Thirunangur : were all on 11.1775, 79.77917 ------------- */
    60: [11.17844165048465,  79.77961683024166, 'Semponnai'],
    61: [11.179834628674936, 79.78824803598954, 'Manikoodam'],
    62: [11.196845214248649, 79.77553463159038, 'Devanartogai'],
    63: [11.178708369408918, 79.77730272319091, 'Vann Purushothamam'],
    64: [11.173774345346985, 79.7767673707094,  'Manimada Kovil'],
    65: [11.192103798273246, 79.79632756575559, 'Kavalampadi'],
    66: [11.174932336655838, 79.77897094675042, 'Naavay'],
    67: [11.179936057093672, 79.77862537432695, 'Vinnagaram'],
    69: [11.169975843162344, 79.79729038722002, 'Parthapalli'],
    70: [11.17652508161632,  79.77744300397293, 'Palliyodam (corrected reading)'],
    /* #68 handled by dd_v2_remap.js -- see header. */

    /* ---- Thanjavur 3 : were all on 10.8157, 79.1386 -------------- */
    /* Readings place these ~170 m apart on a line, confirming the
       Thanjai Mamani Koil group is three distinct shrines rather
       than one compound. */
    43: [10.817820647855893, 79.13614337435413, 'Neelamega Perumal'],
    44: [10.816869560580473, 79.13737222304302, 'Manikundra Perumal'],
    45: [10.815572902343067, 79.13899887956929, 'Veera Nrisimha Perumal'],

    /* ---- Thiruvali / Thirunagari : were sharing one pin ---------- */
    42: [11.203107783486859, 79.77486581555358, 'Thiruvali'],
    80: [11.226335381965534, 79.80048340067829, 'Thirunagari'],

    /* ---- low-precision singles ---------------------------------- */
    21: [10.860254785365841, 79.10864901501105, 'Thirukkandiyur'],
    26: [10.06095208249623,  78.56033503371846, 'Thirukoshtiyur'],
    50: [12.847541462432233, 79.69969495147869, 'Kanchi Ekambaram'],
    59: [12.837197684077443, 79.71017676760856, 'Kanchi Big Kanchi'],
    81: [10.760614698224666, 79.83999905338051, 'Nagapattinam'],
    99: [27.349956837298688, 80.48335895579713, 'Naimisharanya']
  };

  function km(a, b, c, d) {
    var R = 6371, r = Math.PI / 180;
    var dLat = (c - a) * r, dLng = (d - b) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(a * r) * Math.cos(c * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }

  function arrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A); out.push(A);
    });
    return out;
  }

  function apply() {
    var ARRS = arrays();
    if (!ARRS.length) { setTimeout(apply, 60); return; }

    var applied = 0, moves = [];

    ARRS.forEach(function (T, ai) {
      T.forEach(function (t) {
        var f = FIXES[t.sno];
        if (!f) return;
        if (ai === 0 && t.lat != null && t.lng != null) {
          moves.push({ sno: t.sno, km: km(t.lat, t.lng, f[0], f[1]), note: f[2] });
        }
        t.lat = f[0];
        t.lng = f[1];
        t.coords_verified = true;
        t.coords_source = SRC + ' ' + f[2] + '.';
        if (ai === 0) applied++;
      });
    });

    moves.sort(function (a, b) { return b.km - a.km; });

    console.log('[dd_v2_coords] Session 1D.1: ' + applied +
                ' coordinates refined across ' + ARRS.length + ' corpus array(s).');
    if (moves.length) {
      console.log('[dd_v2_coords] largest moves: ' +
        moves.slice(0, 3).map(function (m) {
          return '#' + m.sno + ' ' + m.km.toFixed(2) + ' km';
        }).join(', '));
    }

    if (window.DDMarkers && typeof window.DDMarkers.restyle === 'function') {
      setTimeout(function () {
        try {
          window.DDMarkers.restyle();
          console.log('[dd_v2_coords] markers restyled — stack badges updated.');
        } catch (e) {}
      }, 400);
    }

    window.DD_COORDS_1D1 = { applied: applied, moves: moves };
  }

  window.DDCoords = {
    fixes: FIXES,
    apply: apply,
    report: function () {
      var r = window.DD_COORDS_1D1;
      if (!r) { console.log('[dd_v2_coords] not applied yet.'); return null; }
      console.log('%c=== Session 1D.1 — coordinate moves ===',
                  'font-weight:700;color:#1E5AA0');
      console.table(r.moves.map(function (m) {
        return { sno: m.sno, place: m.note, moved_km: +m.km.toFixed(3) };
      }));
      return r;
    }
  };

  apply();
})();
