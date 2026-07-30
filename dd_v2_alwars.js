/* ==================================================================
   DD v2 — ALWAR METADATA RECONCILIATION        (Session 2A.5)
   ------------------------------------------------------------------
   Reconciles window.ALWARS.divyaDesamsSung with the corpus's own
   attestation, and rebuilds the journey-panel button labels from the
   data so they can never drift again.

   ------------------------------------------------------------------
   THE PROBLEM
   ------------------------------------------------------------------
   window.ALWARS carries a divyaDesamsSung figure per Alwar. It was
   never reconciled against the per-temple `alwars` attestation in
   DD_ENRICHMENT, and ALL TWELVE were wrong. Measured against the live
   corpus after Sessions 2A.1 through 2A.4:

       alwar             metadata   corpus   traditional
       poigai                   6        9             6
       bhoothath               13       10            13
       peyalvar                14       15            15
       thirumazhisai           14       11            17
       nammalvar               37       50            37
       madhurakavi              1        2             1
       kulasekhara              4        9            10
       periyalvar              15       10            17
       andal                   13       11            13
       thondaradippodi          1        7             1
       thiruppan                1        3             1
       thirumangai             86       80            86
       TOTAL                  205      217           217

   Two consumers read this figure, and both were lying:

     1. buildRelatedTab() renders "<Alwar>'s other N temples" from
        divyaDesamsSung - 1, then wires the card to filterByAlwar(),
        which filters on the ACTUAL attestation. So the card promised
        36 Nammalvar temples and delivered 49.

     2. The journey panel buttons in index.html hardcode
        "37 Divya Desams", "86 Divya Desams", "13 Divya Desams".

   ------------------------------------------------------------------
   WHICH NUMBER IS RIGHT?
   ------------------------------------------------------------------
   Neither, strictly. Note the totals: tradition 217, corpus 217,
   metadata 205. The corpus and the published tradition agree on the
   AGGREGATE exactly, but distribute it differently across the twelve.
   That means the counting basis is the same and the disagreement is
   in individual per-temple assignments — a data-quality question, not
   a metadata one.

   Two divergences are clear enough to name:

     THONDARADIPPODI is traditionally credited with Srirangam alone.
     He famously refused to leave it; The Hindu puts it plainly, that
     he "believed only in residing in Srirangam, and singing upon Lord
     Ranganatha". The corpus tags him at seven temples — Srirangam
     plus Kumbakonam, Ayodhya, Mathura, Badrinath and both celestial
     desams.

     THIRUPPAN likewise sang the Amalanadipiran on Ranganatha and is
     credited with Srirangam alone. The corpus tags him at three.

   Those extra tags are most likely generic references picked up
   during enrichment rather than dedicated mangalasasanam. Correcting
   them requires checking all 108 records against a per-kshetram
   authority such as the TRS Iyengar pasuram table, temple by temple.
   That is a research session in its own right and IS NOT DONE HERE.

   ------------------------------------------------------------------
   WHAT THIS SESSION DOES
   ------------------------------------------------------------------
   It makes the UI truthful about the data it actually holds:

     divyaDesamsSung        <- live corpus attestation
     divyaDesamsTraditional <- the published figure, recorded alongside
     attestationSnos        <- the exact sno list behind the count

   So the Related tab now promises exactly what the filter delivers,
   and the traditional figure is preserved rather than overwritten —
   PPS discipline: record the conflict, do not resolve it silently.

   ABHIMANA KSHETRAMS ARE EXCLUDED. #100 Simhachalam was reclassified
   in Session 2A.3 and carries kulasekhara and nammalvar tags; since
   it is no longer one of the 108 it must not count toward any Alwar
   total. Excluding it is what brings the corpus total to exactly 217.
   Celestial desams #110 and #111 ARE counted — they are 2 of the 108.

   The journey buttons are rebuilt from the corrected metadata at
   runtime, so index.html needs no edit and the labels cannot drift
   out of sync again.

   LOAD ORDER — after regions, before filters and markers:
     dd_v2_session2a3.js
     dd_v2_regions.js
     dd_v2_alwars.js        <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2A5_LOADED) return;
  window.DD_SESSION_2A5_LOADED = true;

  /* Commonly published per-Alwar figures. Sources vary by one or two
     for some Alwars; these are the most widely cited values and are
     recorded for reference only — they do not drive any UI. */
  var TRADITIONAL = {
    poigai: 6, bhoothath: 13, peyalvar: 15, thirumazhisai: 17,
    nammalvar: 37, madhurakavi: 1, kulasekhara: 10, periyalvar: 17,
    andal: 13, thondaradippodi: 1, thiruppan: 1, thirumangai: 86
  };

  /* Alwars whose corpus tagging is materially wider than the
     tradition allows, flagged for the future per-temple audit. */
  var SUSPECT = {
    thondaradippodi: 'Traditionally credited with Srirangam alone — he did not ' +
      'travel. Extra tags are probably generic references, not mangalasasanam.',
    thiruppan: 'Traditionally credited with Srirangam alone (Amalanadipiran).',
    nammalvar: 'Corpus is 13 above the traditional 37; worth checking which ' +
      'records carry a dedicated decad versus a passing mention.',
    poigai: 'Corpus is 3 above the traditional 6.',
    madhurakavi: 'Sang only of Nammalvar; traditionally credited with 1.'
  };

  function corpus() { return window.DIVYA_DESAMS || window.DD_TEMPLES || []; }

  /* Attestation is read from DD_ENRICHMENT, the authoritative parallel
     store, not from the fused view — the fused copy of a record can be
     incomplete if an earlier session rewrote it. */
  function measure() {
    var T = corpus();
    var ENR = window.DD_ENRICHMENT || {};
    var live = {};
    T.forEach(function (t) { live[t.sno] = t; });

    var counts = {}, snos = {};
    Object.keys(ENR).forEach(function (k) {
      var sno = parseInt(k, 10);
      var t = live[sno];
      if (!t) return;                       /* released slot */
      if (t.is_abhimana) return;            /* not a Divya Desam */
      var a = ENR[sno].alwars;
      if (!a) return;
      Object.keys(a).forEach(function (key) {
        counts[key] = (counts[key] || 0) + 1;
        (snos[key] = snos[key] || []).push(sno);
      });
    });
    Object.keys(snos).forEach(function (k) {
      snos[k].sort(function (a, b) { return a - b; });
    });
    return { counts: counts, snos: snos };
  }

  function run(tries) {
    tries = tries || 0;
    var ready = window.ALWARS && window.DD_ENRICHMENT && corpus().length;
    if (!ready) {
      if (tries > 120) { console.warn('[dd_v2_alwars] prerequisites never arrived.'); return; }
      return setTimeout(function () { run(tries + 1); }, 60);
    }
    /* Run after the corpus is final — regions is the last mutating session. */
    if (!window.DD_SESSION_2A4_LOADED && tries < 120) {
      return setTimeout(function () { run(tries + 1); }, 60);
    }

    var m = measure();
    var A = window.ALWARS;
    var changed = [], flags = [];

    Object.keys(A).forEach(function (key) {
      var was = A[key].divyaDesamsSung;
      var now = m.counts[key] || 0;
      var trad = TRADITIONAL[key];

      A[key].divyaDesamsTraditional = trad;
      A[key].attestationSnos = (m.snos[key] || []).slice();
      A[key].divyaDesamsSung = now;

      if (was !== now) changed.push({ key: key, from: was, to: now });
      if (trad !== undefined && now !== trad) {
        flags.push({ key: key, corpus: now, traditional: trad,
                     delta: now - trad, note: SUSPECT[key] || null });
      }
    });

    /* ---- rebuild the journey buttons from the data ---------------- */
    var relabelled = 0;
    try {
      document.querySelectorAll('.journey-btn').forEach(function (btn) {
        var k = btn.dataset ? btn.dataset.alwar : null;
        if (!k || k === 'clear' || !A[k]) return;
        var small = btn.querySelector('small');
        var label = A[k].divyaDesamsSung + ' Divya Desams';
        if (small) { small.textContent = label; relabelled++; }
      });
    } catch (e) {}

    console.log('[dd_v2_alwars] Session 2A.5: ' + changed.length +
                ' of ' + Object.keys(A).length + ' Alwar counts corrected' +
                (relabelled ? ', ' + relabelled + ' journey button(s) relabelled' : '') + '.');
    if (changed.length) {
      console.log('[dd_v2_alwars] ' + changed.map(function (c) {
        return c.key + ' ' + c.from + '\u2192' + c.to;
      }).join(', '));
    }
    console.log('[dd_v2_alwars] corpus total ' +
                Object.keys(m.counts).reduce(function (s, k) { return s + m.counts[k]; }, 0) +
                ' attestations \u2014 traditional total ' +
                Object.keys(TRADITIONAL).reduce(function (s, k) { return s + TRADITIONAL[k]; }, 0) +
                '. Totals agree; per-Alwar distribution does not.');
    if (flags.length) {
      console.log('[dd_v2_alwars] \u26A0 ' + flags.length +
                  ' Alwar(s) diverge from the published tradition \u2014 ' +
                  'see DDAlwars.audit() for the per-temple lists.');
    }

    /* Refresh any open popup so the Related tab picks up new counts. */
    if (typeof window.openTemplePopup === 'function' && window.currentPopupSno) {
      setTimeout(function () {
        try { window.openTemplePopup(window.currentPopupSno); } catch (e) {}
      }, 150);
    }

    window.DD_ALWARS_2A5 = { changed: changed, flags: flags, measured: m.counts };
  }

  window.DDAlwars = {
    traditional: TRADITIONAL,
    run: run,
    measure: measure,

    audit: function () {
      var A = window.ALWARS || {};
      var m = measure();
      console.log('%c=== Alwar attestation audit ===', 'font-weight:700;color:#1E5AA0');
      console.table(Object.keys(A).map(function (k) {
        var c = m.counts[k] || 0, t = TRADITIONAL[k];
        return { alwar: A[k].short || k, corpus: c, traditional: t,
                 delta: (c - t > 0 ? '+' : '') + (c - t),
                 agree: c === t ? 'yes' : 'no' };
      }));
      var ct = Object.keys(m.counts).reduce(function (s, k) { return s + m.counts[k]; }, 0);
      var tt = Object.keys(TRADITIONAL).reduce(function (s, k) { return s + TRADITIONAL[k]; }, 0);
      console.log('corpus total ' + ct + '  |  traditional total ' + tt +
                  (ct === tt ? '  \u2014 aggregate agrees' : ''));
      console.log('\nFlagged for a future per-temple audit:');
      Object.keys(SUSPECT).forEach(function (k) {
        console.log('  ' + (A[k] ? A[k].short : k) + ' \u2014 corpus ' +
                    (m.counts[k] || 0) + ', traditional ' + TRADITIONAL[k]);
        console.log('    ' + SUSPECT[k]);
      });
      return m;
    },

    /* List the temples attributed to one Alwar, so a divergence can be
       inspected rather than argued about. */
    listFor: function (key) {
      var m = measure();
      var snos = m.snos[key] || [];
      var T = corpus();
      var by = {}; T.forEach(function (t) { by[t.sno] = t; });
      var ENR = window.DD_ENRICHMENT || {};
      var rows = snos.map(function (s) {
        var ref = ((ENR[s].alwars || {})[key] || {});
        return { sno: s, temple: (by[s] || {}).temple_name_short,
                 pasurams: ref.pasurams != null ? ref.pasurams : '',
                 reference: (ref.reference || '').slice(0, 60) };
      });
      console.log('%c' + key + ' \u2014 ' + rows.length + ' temples (traditional: ' +
                  TRADITIONAL[key] + ')', 'font-weight:700;color:#1E5AA0');
      console.table(rows);
      return rows;
    }
  };

  run(0);
})();
