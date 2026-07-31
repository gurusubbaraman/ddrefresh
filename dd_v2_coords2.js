/* ==================================================================
   DD v2 — COORDINATE REFINEMENT           (Session 1D.2 — Owner GPS)
   ------------------------------------------------------------------
   Second coordinate pass. 28 records refined from owner GPS readings
   taken on site.

   METHOD (unchanged from Session 1D.1):
     Patches the corpus at RUNTIME. The baked dd_v2_base.js is never
     rewritten. Each record gets coords_verified plus a coords_source
     string recording provenance. Additive and idempotent -- the
     SESSION guard makes double-loading harmless.

   ------------------------------------------------------------------
   #16 NATHAN KOIL — a 52.8 km correction, and why it is right
   ------------------------------------------------------------------
   Twenty-seven of these readings move a temple by under 7 km, most by
   a few hundred metres. One moves it 52.8 km, which is the kind of
   jump that usually means a mistake. Here it means the opposite.

       corpus / Wikipedia   11.17750, 79.77917
       owner GPS            10.921954, 79.371790

   Every source places Thiru Nandipura Vinnagaram about 5 km south of
   Kumbakonam, in the Cauvery delta. Grokipedia is explicit: "a small
   rural settlement approximately 5 km south of Kumbakonam in Thanjavur
   district", 10-15 minutes by road. divyadesam.com gives the approach
   as Kumbakonam to Korukai, then a mile and a half.

   Measured against Kumbakonam (#7 at 10.9594, 79.3747):

       Wikipedia coordinate    50.4 km away    inconsistent
       owner GPS                4.2 km away    matches every source

   The Wikipedia value is also, exactly, 11.1775 / 79.77917 -- the old
   Thirunangur town centroid that #60 through #70 all shared before
   Session 1D.1 replaced it. The same wrong point was sitting on a
   temple 50 km away. It is a copied placeholder, not a survey.

   The owner reading is applied. This is the largest single correction
   the corpus has taken.

   ------------------------------------------------------------------
   #51 PAVALA VANNAR — duplicate reading resolved
   ------------------------------------------------------------------
   Two readings were supplied for #51, 1.1 km apart. Owner confirmed
   12.843742757843032, 79.70762640194987 as correct. The other value
   is not applied to any record; if it belongs to a neighbouring Kanchi
   temple, that needs its own ruling.

   ------------------------------------------------------------------
   NOT INCLUDED
   ------------------------------------------------------------------
   The deity-name corruption found across #87-96 during this pass is a
   separate matter and is NOT touched here. Coordinates only.

   LOAD ORDER — after the baked base, before filters and markers:
     dd_v2_base.js
     dd_v2_enrichment.js
     dd_v2_loader.js
     dd_v2_canon.js
     dd_v2_coords2.js       <- this file
     dd_v2_filters.js
     dd_v2_markers.js
     dd_v2_shim.js
     dd_feedback.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_1D2_LOADED) return;
  window.DD_SESSION_1D2_LOADED = true;

  var SRC = 'Owner GPS, Session 1D.2. Confidence: HIGH.';

  /* sno: [lat, lng, place-note] */
  var FIXES = {
    /* ---- Chola Nadu ---------------------------------------------- */
      1: [10.862240266621345, 78.68993626530057, 'Srirangam'],
     14: [10.947161135609985, 79.25719181208935, 'Kabisthalam'],
     16: [10.921954298670228, 79.3717904038158,  'Nathan Koil — see the header note, 52.8 km correction'],
     41: [11.399222660159841, 79.69336051589046, 'Chidambaram'],

    /* ---- Pandya Nadu --------------------------------------------- */
     11: [10.246648777975254, 78.75200018587338, 'Thirumeyyam'],
     28: [10.07481803798875,  78.21354057787428, 'Thirumalirunjolai (Alagar Koil)'],
     72: [8.596839424677984,  77.95781234903825, 'Thirukolur'],
     73: [8.603219636142581,  77.98606982094141, 'Thenthiruperai'],
     74: [8.63128035289582,   77.910150210249,   'Srivaikuntam'],
     75: [8.637087686562593,  77.92447709970335, 'Varagunamangai (Natham)'],
     76: [8.639765528073228,  77.93315158829941, 'Thirupulingudi'],
     77: [8.641745812157858,  77.99466846740978, 'Perungulam (Thirukulandhai)'],
     78: [8.61212906183681,   77.9721687461043,  'Irattai Tirupathi (Tholaivillimangalam)'],

    /* ---- Thondai Nadu -------------------------------------------- */
     33: [12.617493694380405, 80.19299181433892, 'Thirukadalmallai (Mahabalipuram)'],
     51: [12.843742757843032, 79.70762640194987, 'Kanchi Pavala Vannar — owner-confirmed reading'],
     56: [12.840734519271903, 79.7031602364002,  'Kanchi Adhi Varaha (inside Kamakshi temple)'],

    /* ---- Malai Nadu ---------------------------------------------- */
     85: [8.329741736281116,  77.26607648894931, 'Thiruvattaru'],
     86: [8.208289898944432,  77.44748325053534, 'Thiruvanparisaram'],

    /* ---- Vada Nadu ----------------------------------------------- */
     82: [15.124632134864383, 78.73678962327288, 'Ahobilam'],
    101: [26.79563437648809,  82.19440433212407, 'Ayodhya'],
    102: [27.504316275069087, 77.66978888453119, 'Mathura'],
    103: [27.580206679858513, 77.68766852660517, 'Vrindavan'],
    104: [22.23770446066402,  68.96735708464057, 'Dwarka'],
    105: [30.14617546282144,  78.59868435358989, 'Devaprayag'],
    106: [30.55631463413677,  79.5663863966032,  'Joshimath'],
    107: [30.74481997991861,  79.49125397034744, 'Badrinath'],
    108: [28.816825160484967, 83.87176989977866, 'Muktinath, Nepal'],

    /* ---- Abhimana Kshetram --------------------------------------- */
    100: [17.766666893163556, 83.2501190417746,  'Simhachalam']
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

  function apply(tries) {
    tries = tries || 0;
    var ARRS = arrays();
    if (!ARRS.length) {
      if (tries > 120) { console.warn('[dd_v2_coords2] corpus never arrived.'); return; }
      return setTimeout(function () { apply(tries + 1); }, 60);
    }

    var applied = 0, moves = [], missing = [];

    ARRS.forEach(function (T, ai) {
      T.forEach(function (t) {
        var f = FIXES[t.sno];
        if (!f) return;
        if (ai === 0) {
          if (t.lat != null && t.lng != null) {
            moves.push({ sno: t.sno, km: km(t.lat, t.lng, f[0], f[1]), note: f[2] });
          }
          applied++;
        }
        t.lat = f[0];
        t.lng = f[1];
        t.coords_verified = true;
        t.coords_source = SRC + ' ' + f[2] + '.';
      });
    });

    /* Warn if a fix references an sno the corpus does not hold. */
    var live = {};
    ARRS[0].forEach(function (t) { live[t.sno] = 1; });
    Object.keys(FIXES).forEach(function (s) { if (!live[s]) missing.push(s); });
    if (missing.length) {
      console.warn('[dd_v2_coords2] fixes reference missing snos: #' + missing.join(', #'));
    }

    moves.sort(function (a, b) { return b.km - a.km; });

    console.log('[dd_v2_coords2] Session 1D.2: ' + applied +
                ' coordinates refined across ' + ARRS.length + ' corpus array(s).');
    if (moves.length) {
      console.log('[dd_v2_coords2] largest moves: ' +
        moves.slice(0, 3).map(function (m) {
          return '#' + m.sno + ' ' + m.km.toFixed(2) + ' km';
        }).join(', ') + ' — #16 is the Nathan Koil correction, see header.');
    }

    /* Re-skin markers so the map reflects the new positions. */
    if (window.DDMarkers && typeof window.DDMarkers.build === 'function') {
      setTimeout(function () {
        try {
          window.DDMarkers.build();
          if (window.DDFilter && window.DDFilter.apply) window.DDFilter.apply();
          console.log('[dd_v2_coords2] markers rebuilt at the new positions.');
        } catch (e) {}
      }, 420);
    }

    window.DD_COORDS_1D2 = { applied: applied, moves: moves };
  }

  window.DDCoords2 = {
    fixes: FIXES,
    apply: apply,
    report: function () {
      var r = window.DD_COORDS_1D2;
      if (!r) { console.log('[dd_v2_coords2] not applied yet.'); return null; }
      console.log('%c=== Session 1D.2 — coordinate moves ===',
                  'font-weight:700;color:#1E5AA0');
      console.table(r.moves.map(function (m) {
        return { sno: m.sno, place: m.note.slice(0, 40), moved_km: +m.km.toFixed(3) };
      }));
      return r;
    }
  };

  apply(0);
})();
