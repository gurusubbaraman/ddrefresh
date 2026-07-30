/* ==================================================================
   DD v2 — REGIONAL RECLASSIFICATION            (Session 2A.4)
   ------------------------------------------------------------------
   Aligns the `region` field with the canonical six-Nadu division.

   THE DISCREPANCY
   ---------------
       Region          corpus   canonical   delta
       Chola Nadu        42        40        +2
       Pandya Nadu       16        18        -2
       Thondai Nadu      15        22        -7
       Nadu Nadu          9         2        +7
       Malai Nadu        13        13         0
       Vada Nadu         11        11         0
                        ---       ---
                        106       106         0

   The totals already match at 106. Nothing is missing and nothing is
   duplicated — the deltas cancel in two exact pairs, which is the
   signature of mislabelling rather than a gap in the corpus.

   ------------------------------------------------------------------
   ERROR 1 — Thirumeyyam and Thirupullani labelled Chola Nadu
   ------------------------------------------------------------------
   Both belong to Pandya Nadu. They appear at positions 5 and 6 of
   every canonical Pandya Nadu 18 enumeration:

       1 Thirukkoodal        10 Thiruvaragunamangai
       2 Thirumoghur         11 Thiruppulingudi
       3 Thirumalirunsolai   12 Thirukkulanthai
       4 Thirukkoshtiyur     13 Thiruttholaivillimangalam
       5 THIRUMEYYAM         14 Thirupperai
       6 THIRUPPULLANI       15 Thirukkoloor
       7 Thiruthangal        16 Thirukkurugur
       8 Srivilliputhur      17 Thiruvaramangai
       9 Thiruvaikuntham     18 Thirukkurungudi

   Neither appears in any list of the 40 Chola Nadu Divya Desams.

   Why the corpus got it wrong is easy to see: Thirumeyyam is in
   Pudukkottai and Thirupullani in Ramanathapuram, both north of the
   Vaigai and geographically closer to the Chola delta than to
   Madurai. But the Nadu divisions are the historical kingdoms of the
   Alwar period, not modern districts, and both towns lay within the
   Pandya realm.

   ------------------------------------------------------------------
   ERROR 2 — seven Thondai Nadu temples labelled Nadu Nadu
   ------------------------------------------------------------------
   Nadu Nadu contains EXACTLY TWO Divya Desams, and always has:

       Thirukkovilur         Sri Trivikrama Perumal   (Kallakurichi)
       Thiruvahindrapuram    Sri Devanatha Perumal    (Cuddalore)

   That is the whole region. It is the smallest of the six, a narrow
   belt between the Chola and Thondai countries, and every canonical
   source gives it as two.

   The corpus carried nine. The seven extras are all Thondai Nadu
   shrines of the Chennai, Chengalpattu and Arakkonam belt — the
   coastal and northern arc outside the Kanchipuram cluster. Grouping
   them as a middle region is a reasonable modern instinct and a
   canonical error.

   Thondai Nadu proper is 22: the fourteen at Kanchipuram plus
   Thiruputkuzhi, Thiruvidanthai, Thirukkadalmallai, Thiruvallur,
   Thirunindravur, Thiruneermalai, Thirukkadigai (Sholingar) and
   Thiruvallikkeni.

   ------------------------------------------------------------------
   METHOD
   ------------------------------------------------------------------
   This patch is DATA-DRIVEN, not a hardcoded list. It moves every
   record currently in Nadu Nadu except the two canonical members,
   whatever their sno happens to be, and reassigns #11 and #12 only
   after confirming they are where the audit found them. It then
   asserts the final distribution against the canonical counts and
   reports any residual mismatch rather than silently passing.

   Nothing but the `region` field is touched. Coordinates, names,
   puranas, categories and Alwar attestation are untouched.

   VISIBLE EFFECTS
   ---------------
   The sidebar Nadu chips change: Chola Nadu 42 -> 40, Pandya Nadu
   16 -> 18, Thondai Nadu 15 -> 22, Nadu Nadu 9 -> 2. Marker colours
   follow, since index.html keys NADU_COLORS off the region string —
   the seven reassigned temples change from the Nadu Nadu violet to
   the Thondai Nadu green, and #11 and #12 from Chola blue to Pandya
   amber. Any temple carrying a canonical category keeps its category
   colour, which takes precedence.

   LOAD ORDER — after session2a3, before filters and markers:
     dd_v2_names.js
     dd_v2_session2a3.js
     dd_v2_regions.js       <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2A4_LOADED) return;
  window.DD_SESSION_2A4_LOADED = true;

  /* The canonical distribution of the 106 terrestrial Divya Desams. */
  var CANONICAL = {
    'Chola Nadu': 40,
    'Pandya Nadu': 18,
    'Thondai Nadu': 22,
    'Malai Nadu': 13,
    'Vada Nadu': 11,
    'Nadu Nadu': 2
  };

  /* The only two Divya Desams of Nadu Nadu. Everything else currently
     carrying that label belongs to Thondai Nadu. */
  var NADU_NADU_CANONICAL = {
    31: 'Thirukkovilur — Sri Trivikrama (Ulagalantha) Perumal',
    30: 'Thiruvahindrapuram — Sri Devanatha Perumal'
  };

  /* Pandya Nadu shrines mislabelled Chola Nadu. */
  var TO_PANDYA = {
    11: 'Thirumeyyam — Sri Sathya Moorthy Perumal (Pandya list #5)',
    12: 'Thirupullani — Sri Adi Jagannatha Perumal (Pandya list #6)'
  };

  function arrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A); out.push(A);
    });
    return out;
  }

  function setRegion(sno, region) {
    var n = 0;
    arrays().forEach(function (T) {
      T.forEach(function (t) {
        if (t.sno === sno) { t.region = region; n++; }
      });
    });
    return n;
  }

  function distribution(T) {
    var d = {};
    T.forEach(function (t) {
      if (t.is_celestial || t.is_abhimana) return;
      d[t.region] = (d[t.region] || 0) + 1;
    });
    return d;
  }

  function run(tries) {
    tries = tries || 0;
    var ARRS = arrays();
    if (!ARRS.length) {
      if (tries > 100) { console.warn('[dd_v2_regions] corpus never arrived.'); return; }
      return setTimeout(function () { run(tries + 1); }, 60);
    }
    /* Must run after Session 2A.3, which sets the final membership. */
    if (!window.DD_SESSION_2A3_LOADED && tries < 100) {
      return setTimeout(function () { run(tries + 1); }, 60);
    }

    var T = ARRS[0];
    var before = distribution(T);
    var moved = { toPandya: [], toThondai: [] };

    /* ---- 1. Thirumeyyam and Thirupullani -> Pandya Nadu ---------- */
    Object.keys(TO_PANDYA).forEach(function (k) {
      var sno = parseInt(k, 10);
      var rec = T.filter(function (t) { return t.sno === sno; })[0];
      if (!rec) {
        console.warn('[dd_v2_regions] #' + sno + ' not found — skipped.');
        return;
      }
      if (rec.region === 'Pandya Nadu') return;      /* already correct */
      var was = rec.region;
      setRegion(sno, 'Pandya Nadu');
      moved.toPandya.push({ sno: sno, from: was, name: TO_PANDYA[k] });
    });

    /* ---- 2. Nadu Nadu -> Thondai Nadu, except the canonical two --- */
    T.filter(function (t) {
      return t.region === 'Nadu Nadu' && !t.is_celestial && !t.is_abhimana;
    }).forEach(function (t) {
      if (NADU_NADU_CANONICAL[t.sno]) return;        /* genuine member */
      var label = t.temple_name_short || t.town || ('#' + t.sno);
      setRegion(t.sno, 'Thondai Nadu');
      moved.toThondai.push({ sno: t.sno, name: label });
    });

    /* ---- 3. verify the canonical two are present and correct ------ */
    var naduIssues = [];
    Object.keys(NADU_NADU_CANONICAL).forEach(function (k) {
      var sno = parseInt(k, 10);
      var rec = T.filter(function (t) { return t.sno === sno; })[0];
      if (!rec) { naduIssues.push('#' + sno + ' missing from corpus'); return; }
      if (rec.region !== 'Nadu Nadu') {
        setRegion(sno, 'Nadu Nadu');
        naduIssues.push('#' + sno + ' was ' + rec.region + ', corrected to Nadu Nadu');
      }
    });

    /* ---- 4. assert against the canonical distribution ------------- */
    var after = distribution(T);
    var mismatches = [];
    Object.keys(CANONICAL).forEach(function (r) {
      var got = after[r] || 0;
      if (got !== CANONICAL[r]) {
        mismatches.push(r + ': ' + got + ' (canonical ' + CANONICAL[r] + ')');
      }
    });
    Object.keys(after).forEach(function (r) {
      if (!(r in CANONICAL)) mismatches.push('unexpected region "' + r + '": ' + after[r]);
    });

    console.log('[dd_v2_regions] Session 2A.4: ' +
                moved.toPandya.length + ' -> Pandya Nadu, ' +
                moved.toThondai.length + ' -> Thondai Nadu' +
                (naduIssues.length ? ' | ' + naduIssues.join('; ') : ''));
    if (moved.toThondai.length) {
      console.log('[dd_v2_regions] moved out of Nadu Nadu: ' +
        moved.toThondai.map(function (m) { return '#' + m.sno; }).join(', '));
    }
    if (mismatches.length) {
      console.warn('[dd_v2_regions] \u26A0 distribution still off: ' + mismatches.join(' | '));
    } else {
      console.log('[dd_v2_regions] \u2705 all six regions match the canonical distribution ' +
                  '(40 / 18 / 22 / 13 / 11 / 2 = 106).');
    }

    /* Re-render so the chips and marker colours reflect the change. */
    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () { try { window.buildSidebarList(); } catch (e) {} }, 130);
    }
    if (window.DDMarkers && typeof window.DDMarkers.build === 'function') {
      setTimeout(function () { try { window.DDMarkers.build(); } catch (e) {} }, 430);
    }
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { try { window.DDFilter.apply(); } catch (e) {} }, 510);
    }

    window.DD_REGIONS_2A4 = { before: before, after: after, moved: moved,
                              mismatches: mismatches };
  }

  window.DDRegions = {
    canonical: CANONICAL,
    run: run,
    report: function () {
      var A = arrays(); if (!A.length) return null;
      var T = A[0];
      var d = distribution(T);
      console.log('%c=== Regional distribution vs canon ===',
                  'font-weight:700;color:#1E5AA0');
      var rows = Object.keys(CANONICAL).map(function (r) {
        var got = d[r] || 0;
        return { region: r, corpus: got, canonical: CANONICAL[r],
                 status: got === CANONICAL[r] ? 'OK' : (got > CANONICAL[r] ? '+' + (got - CANONICAL[r]) : String(got - CANONICAL[r])) };
      });
      console.table(rows);
      var total = Object.keys(d).reduce(function (s, k) { return s + d[k]; }, 0);
      console.log('terrestrial total: ' + total +
                  (total === 106 ? '  \u2705' : '  \u26A0 expected 106'));
      return rows;
    },
    listRegion: function (region) {
      var A = arrays(); if (!A.length) return null;
      var rows = A[0].filter(function (t) { return t.region === region; })
        .sort(function (a, b) { return a.sno - b.sno; })
        .map(function (t) {
          return { sno: t.sno, temple: t.temple_name_short, town: t.town,
                   district: t.district };
        });
      console.log('%c' + region + ' — ' + rows.length + ' temples',
                  'font-weight:700;color:#1E5AA0');
      console.table(rows);
      return rows;
    }
  };

  run(0);
})();
