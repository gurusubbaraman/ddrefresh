/* ==================================================================
   DD v2 — CANON: sets, categories, Alwar metadata   CONSOLIDATED 2026-07-30
   ------------------------------------------------------------------
   Single source of truth for canonical set membership, category
   presentation, and the corrected Alwar attestation figures.

   This file consolidates three earlier files and one session:
       dd_v2_canon.js    the original 8 sets + reconcile machinery
       dd_v2_canon2.js   Nava Tirupathi 9 -> 8
       dd_v2_canon3.js   swayamvyakta + char_dham, 3 declines
       dd_v2_alwars.js   all 12 Alwar counts corrected

   WHY THIS ONE ISN'T FULLY BAKED
   The corpus data could be frozen into dd_v2_base.js because nothing
   reads it back. CANON cannot: dd_v2_filters.js builds its pills from
   DD_CANON, dd_v2_markers.js colours pins from DD_CAT_META and
   DD_PRECEDENCE, and the legend enumerates both at runtime. They have
   to exist as live objects.

   Equally, reconcileCategories() and syncLegacyCategories() must keep
   running on every load. They repair two objects that live inside
   dd_v1_patch.js and are recreated fresh each time the page loads --
   the per-temple categories arrays and window.CATEGORIES. Baking
   cannot reach into a file that rebuilds itself.

   CANONICAL SETS (10)
       divya_kanchi           14
       thirunangur_cluster    11
       nava_tirupathi          8
       pancha_pandava          5
       ulagalantha_complex     3
       alwar_birthplace        4
       pancha_rangam           4
       sapta_mokshapuri        4
       swayamvyakta            6
       char_dham               2

   ALWAR ATTESTATION
   Session 2A.5 measured every Alwar against the corpus and found all
   twelve figures in the original metadata were wrong. The corrected
   values are below, with the published traditional figure alongside.
   Corpus and tradition agree on the AGGREGATE (217 each) but
   distribute it differently, which is a per-temple data question
   recorded rather than silently resolved:

       poigai             9   (traditional 6)
       bhoothath         10   (traditional 13)
       peyalvar          15   (traditional 15)
       thirumazhisai     11   (traditional 17)
       nammalvar         50   (traditional 37)
       madhurakavi        2   (traditional 1)
       kulasekhara        9   (traditional 10)
       periyalvar        10   (traditional 17)
       andal             11   (traditional 13)
       thondaradippodi    7   (traditional 1)
       thiruppan          3   (traditional 1)
       thirumangai       80   (traditional 86)

   attestationSnos on each Alwar records the exact snos behind the
   count, so the number is evidence rather than assertion.
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_CANON_LOADED) return;
  window.DD_V2_CANON_LOADED = true;
  window.DD_CANON_BAKED = '2026-07-30';

  /* ---------------------------------------------------------------- */
  /* 1. CANONICAL SET MEMBERSHIP                                       */
  /* ---------------------------------------------------------------- */
  /* Built from data stamps verified against town names, not from the
     obsolete members[] arrays that shipped in dd_v1_patch.js. Those
     were on a different numbering entirely -- divya_kanchi pointed at
     Pandya Nadu temples, nava_tirupathi at Kanchipuram. */
  var CANON = {
    "divya_kanchi": [
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59
    ],
    "thirunangur_cluster": [
      60,
      61,
      62,
      63,
      64,
      65,
      66,
      67,
      68,
      69,
      70
    ],
    "nava_tirupathi": [
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78
    ],
    "pancha_pandava": [
      90,
      91,
      92,
      93,
      94
    ],
    "ulagalantha_complex": [
      53,
      54,
      55
    ],
    "alwar_birthplace": [
      47,
      48,
      71,
      72
    ],
    "pancha_rangam": [
      1,
      4,
      5,
      7
    ],
    "sapta_mokshapuri": [
      101,
      102,
      104,
      107
    ],
    "swayamvyakta": [
      1,
      45,
      98,
      99,
      107,
      108
    ],
    "char_dham": [
      104,
      107
    ]
  };

  /* Sets considered and NOT enabled, with the reasoning kept so the
     research does not have to be repeated. See DDCanon.rulings(). */
  var RULINGS_RESOLVED = {
    "swayamvyakta": {
      "ruling": "ENABLED",
      "members": [
        1,
        45,
        98,
        99,
        107,
        108
      ],
      "basis": "Fixed by the Sanskrit verse \"adyam rangam iti proktam...\". Six of the eight are Divya Desams; Srimushnam is an Abhimana Kshetram and Pushkar is outside the 108.",
      "conflict": "The sixth, TOYADRI, is read as Thiruneermalai (#36) by shlokam.org on a literal parse (toya=water, adri=hill) and as Thothadri / Vanamamalai (#45) by Wikipedia, the Vanamamalai Mutt and most Ashtakshara lists. Majority reading followed. To switch, change one sno in NEW_SETS.swayamvyakta."
    },
    "char_dham": {
      "ruling": "ENABLED",
      "members": [
        104,
        107
      ],
      "basis": "Badrinath, Dwarka, Puri and Rameswaram. Only Badrinath and Dwarka are Divya Desams; Puri is Jagannath and Rameswaram is a Jyotirlinga.",
      "conflict": null
    },
    "pancha_krishnam": {
      "ruling": "DECLINED — membership unverified",
      "basis": "A genuine set of five Divya Desams. #10 Thirukkannangudi states in its own purana that it is one of the five Panchakrishna Kshetrams of Chola Nadu, but that is the only textual match in 110 records and no source consulted gave the full five with enough agreement to stamp.",
      "next": "Establish the five from a Sri Vaishnava authority, then enable. This is the closest of the three declines to being enabled."
    },
    "pancha_naranyam": {
      "ruling": "DECLINED — one in-corpus member",
      "basis": "Resolves to the PANCHA NARASIMHA KSHETRAM around Sirkazhi: Ugra (Thirukkurayalur), Veera (Thirumangaimadam), Yoga and Jwala (Thirunagari), Lakshmi (Thiruvali). Only Thiruvali-Thirunagari is a Divya Desam, and since the 2A.2 merge it is a single record, #80. A one-member set cannot drive a filter.",
      "next": "Folded into #80 as a note. Reconsider only if the corpus ever admits non-Divya-Desam companion shrines, as PPS does for set-completers."
    },
    "andal_thiruppavai": {
      "ruling": "DECLINED — redundant",
      "basis": "Andal is attested at 11 temples (Session 2A.5) and DDPopup.filterByAlwar(\"andal\") already filters to exactly those. A pill would duplicate a working control.",
      "next": "A narrower set — only temples named within the thirty verses of the Thiruppavai, as distinct from the Nachiyar Thirumozhi — would not be redundant. That needs the verses read against the corpus."
    }
  };

  var CAT_META = {
    "pancha_rangam": {
      "label": "Pancha Rangam",
      "label_ta": "பஞ்ச ரங்கம்",
      "color": "#D4AF37"
    },
    "divya_kanchi": {
      "label": "Divya Kanchi",
      "label_ta": "திவ்ய காஞ்சி",
      "color": "#1E5AA0"
    },
    "nava_tirupathi": {
      "label": "Nava Tirupathi",
      "label_ta": "நவ திருப்பதி",
      "color": "#B8710A"
    },
    "thirunangur_cluster": {
      "label": "Thirunangur 11",
      "label_ta": "திருநாங்கூர்",
      "color": "#4A7C4E"
    },
    "pancha_pandava": {
      "label": "Pancha Pandava",
      "label_ta": "பஞ்ச பாண்டவ",
      "color": "#0F6B70"
    },
    "ulagalantha_complex": {
      "label": "Ulagalantha Complex",
      "label_ta": "உலகளந்த",
      "color": "#6B5DB8"
    },
    "alwar_birthplace": {
      "label": "Alwar Birthplace",
      "label_ta": "ஆழ்வார் அவதார ஸ்தலம்",
      "color": "#C2185B"
    },
    "sapta_mokshapuri": {
      "label": "Sapta Mokshapuri",
      "label_ta": "சப்த மோக்ஷபுரி",
      "color": "#4A148C"
    },
    "swayamvyakta": {
      "label": "Swayam Vyakta",
      "label_ta": "ஸ்வயம் வ்யக்த",
      "color": "#7B1FA2"
    },
    "char_dham": {
      "label": "Char Dham",
      "label_ta": "சார் தாம்",
      "color": "#00838F"
    }
  };

  var ICONS = {
    "pancha_rangam": "🏛️",
    "divya_kanchi": "🏰",
    "nava_tirupathi": "🪐",
    "thirunangur_cluster": "🎭",
    "pancha_pandava": "🏹",
    "ulagalantha_complex": "👣",
    "alwar_birthplace": "🙏",
    "sapta_mokshapuri": "✨",
    "swayamvyakta": "✨",
    "char_dham": "🧭"
  };

  /* Fill-colour precedence when a temple belongs to more than one set. */
  var PRECEDENCE = ["pancha_rangam","sapta_mokshapuri","char_dham","swayamvyakta","divya_kanchi","nava_tirupathi","thirunangur_cluster","pancha_pandava","ulagalantha_complex","alwar_birthplace"];

  var CAT_DESCRIPTIONS = {
    pancha_rangam:       'The Kaveri-belt Ranganatha chain (Srirangapatna is not a Divya Desam)',
    divya_kanchi:        'The Divya Desams of Kanchipuram',
    nava_tirupathi:      'The Thamirabarani shrines \u2014 9 shrines, 8 Divya Desams',
    thirunangur_cluster: 'The eleven Thirunangur shrines near Sirkazhi',
    pancha_pandava:      'The five Kuttanad shrines of the Pandava brothers',
    ulagalantha_complex: 'The Trivikrama shrines of Big Kanchipuram',
    alwar_birthplace:    'Avatara sthalams \u2014 birthplaces of the Alwars',
    sapta_mokshapuri:    'The moksha-granting cities within this corpus (4 of 7)',
    swayamvyakta:        'Self-manifested shrines \u2014 6 of the 8 Ashta Swayam Vyakta Kshetras',
    char_dham:           'The four abodes of Adi Shankara \u2014 2 of the 4 are Divya Desams'
  };

  var UNCAT_COLOR = '#7F8C8D';
  var MULTI_RING  = '#D4AF37';
  var COLORED     = Object.keys(CAT_META);

  /* ---------------------------------------------------------------- */
  /* 2. CORRECTED ALWAR METADATA                                       */
  /* ---------------------------------------------------------------- */
  var ALWAR_COUNTS = {
    "poigai": {
      "sung": 9,
      "traditional": 6,
      "snos": [
        1,
        7,
        28,
        31,
        47,
        87,
        98,
        110,
        111
      ]
    },
    "bhoothath": {
      "sung": 10,
      "traditional": 13,
      "snos": [
        1,
        28,
        31,
        33,
        36,
        46,
        52,
        87,
        110,
        111
      ]
    },
    "peyalvar": {
      "sung": 15,
      "traditional": 15,
      "snos": [
        1,
        4,
        7,
        28,
        31,
        36,
        40,
        46,
        47,
        48,
        52,
        87,
        98,
        110,
        111
      ]
    },
    "thirumazhisai": {
      "sung": 11,
      "traditional": 17,
      "snos": [
        1,
        4,
        28,
        36,
        41,
        47,
        49,
        52,
        98,
        110,
        111
      ]
    },
    "nammalvar": {
      "sung": 50,
      "traditional": 37,
      "snos": [
        1,
        3,
        7,
        8,
        9,
        15,
        17,
        18,
        22,
        26,
        27,
        28,
        29,
        31,
        42,
        44,
        45,
        47,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        98,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        110,
        111
      ]
    },
    "madhurakavi": {
      "sung": 2,
      "traditional": 1,
      "snos": [
        72,
        111
      ]
    },
    "kulasekhara": {
      "sung": 9,
      "traditional": 10,
      "snos": [
        1,
        12,
        41,
        84,
        98,
        101,
        107,
        110,
        111
      ]
    },
    "periyalvar": {
      "sung": 10,
      "traditional": 17,
      "snos": [
        1,
        22,
        28,
        42,
        97,
        102,
        103,
        107,
        110,
        111
      ]
    },
    "andal": {
      "sung": 11,
      "traditional": 13,
      "snos": [
        1,
        3,
        7,
        22,
        28,
        97,
        102,
        103,
        104,
        110,
        111
      ]
    },
    "thondaradippodi": {
      "sung": 7,
      "traditional": 1,
      "snos": [
        1,
        7,
        101,
        102,
        107,
        110,
        111
      ]
    },
    "thiruppan": {
      "sung": 3,
      "traditional": 1,
      "snos": [
        1,
        110,
        111
      ]
    },
    "thirumangai": {
      "sung": 80,
      "traditional": 86,
      "snos": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        43,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        80,
        81,
        82,
        83,
        95,
        97,
        98,
        99,
        104,
        107,
        108,
        110,
        111
      ]
    }
  };

  window.DD_CANON       = CANON;
  window.DD_CAT_META    = CAT_META;
  window.DD_CAT_ICONS   = ICONS;
  window.DD_PRECEDENCE  = PRECEDENCE;
  window.DD_UNCAT_COLOR = UNCAT_COLOR;
  window.DD_MULTI_RING  = MULTI_RING;
  window.DD_RULINGS_RESOLVED = RULINGS_RESOLVED;
  window.DD_RULINGS_PENDING  = {};

  /* ---------------------------------------------------------------- */
  /* 3. RECONCILE — must run every load                                */
  /* ---------------------------------------------------------------- */
  function targetArrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A); out.push(A);
    });
    return out;
  }

  function reconcileOne(T) {
    var bySno = {};
    T.forEach(function (t) { bySno[t.sno] = t; });
    T.forEach(function (t) {
      if (!Array.isArray(t.categories)) t.categories = [];
      t.categories = t.categories.filter(function (c) { return COLORED.indexOf(c) < 0; });
    });
    var stamped = 0;
    Object.keys(CANON).forEach(function (slug) {
      CANON[slug].forEach(function (sno) {
        var t = bySno[sno];
        if (t && t.categories.indexOf(slug) < 0) { t.categories.push(slug); stamped++; }
      });
    });
    return stamped;
  }

  function reconcileCategories() {
    var A = targetArrays();
    if (!A.length) { console.warn('[dd_v2_canon] no corpus found.'); return 0; }
    var total = 0;
    A.forEach(function (T) { total += reconcileOne(T); });
    console.log('[dd_v2_canon] ' + (total / A.length) + ' stamps across ' +
                Object.keys(CANON).length + ' sets, ' + A.length + ' array(s).');
    return total;
  }

  /* ---------------------------------------------------------------- */
  /* 4. LEGACY SYNC — rebuild v1's CATEGORIES for the Related tab      */
  /* ---------------------------------------------------------------- */
  /* buildRelatedTab() reads CATEGORIES[slug].members.length for its
     "All N temples" card, NOT the per-temple stamps. The table that
     ships in dd_v1_patch.js is on the obsolete numbering, so it has to
     be rewritten from CANON on every load. Mutated in place: Section B
     captured the reference at parse time. */
  function syncLegacyCategories() {
    var C = window.CATEGORIES;
    if (!C || typeof C !== 'object') return 0;
    var written = 0;
    Object.keys(CANON).forEach(function (slug) {
      var meta = CAT_META[slug]; if (!meta) return;
      C[slug] = {
        label: meta.label, label_ta: meta.label_ta,
        icon: ICONS[slug] || '\uD83D\uDD17', color: meta.color,
        members: CANON[slug].slice(),
        description: CAT_DESCRIPTIONS[slug] || meta.label
      };
      written++;
    });
    /* Drop any slug that is not canonical, so nothing renders a count
       nobody has stood behind. */
    Object.keys(C).forEach(function (k) { if (!CANON[k]) delete C[k]; });
    console.log('[dd_v2_canon] CATEGORIES synced: ' + written + ' sets.');
    return written;
  }

  /* ---------------------------------------------------------------- */
  /* 5. ALWAR METADATA — must also run every load                      */
  /* ---------------------------------------------------------------- */
  /* window.ALWARS is recreated by dd_v1_patch.js on every load with
     the stale divyaDesamsSung figures, so the correction is applied
     here rather than baked. Journey button labels are rebuilt from the
     corrected numbers so they cannot drift out of sync again. */
  function applyAlwarCounts() {
    var A = window.ALWARS;
    if (!A) return 0;
    var changed = 0;
    Object.keys(ALWAR_COUNTS).forEach(function (k) {
      if (!A[k]) return;
      var v = ALWAR_COUNTS[k];
      if (A[k].divyaDesamsSung !== v.sung) changed++;
      A[k].divyaDesamsSung = v.sung;
      A[k].divyaDesamsTraditional = v.traditional;
      A[k].attestationSnos = v.snos.slice();
    });
    var relabelled = 0;
    try {
      document.querySelectorAll('.journey-btn').forEach(function (btn) {
        var k = btn.dataset ? btn.dataset.alwar : null;
        if (!k || k === 'clear' || !A[k]) return;
        var small = btn.querySelector('small');
        if (small) { small.textContent = A[k].divyaDesamsSung + ' Divya Desams'; relabelled++; }
      });
    } catch (e) {}
    console.log('[dd_v2_canon] Alwar counts applied (' + changed + ' corrected' +
                (relabelled ? ', ' + relabelled + ' buttons relabelled' : '') + ').');
    return changed;
  }

  /* ---------------------------------------------------------------- */
  /* 6. HELPERS                                                        */
  /* ---------------------------------------------------------------- */
  function colorCatsOf(t) {
    if (!t || !Array.isArray(t.categories)) return [];
    return t.categories.filter(function (c) { return COLORED.indexOf(c) >= 0; });
  }
  function fillColorOf(t) {
    var cats = colorCatsOf(t);
    if (!cats.length) return UNCAT_COLOR;
    for (var i = 0; i < PRECEDENCE.length; i++) {
      if (cats.indexOf(PRECEDENCE[i]) >= 0) return CAT_META[PRECEDENCE[i]].color;
    }
    return UNCAT_COLOR;
  }
  function isMultiSet(t) { return colorCatsOf(t).length >= 2; }
  function memberCount(slug) {
    var A = targetArrays(); if (!A.length) return 0;
    var live = {}; A[0].forEach(function (t) { live[t.sno] = 1; });
    return (CANON[slug] || []).filter(function (s) { return live[s]; }).length;
  }

  window.DDCanon = {
    CANON: CANON,
    reconcileCategories: reconcileCategories,
    syncLegacyCategories: syncLegacyCategories,
    applyAlwarCounts: applyAlwarCounts,
    colorCatsOf: colorCatsOf,
    fillColorOf: fillColorOf,
    isMultiSet: isMultiSet,
    memberCount: memberCount,
    audit: function () {
      var A = targetArrays(); if (!A.length) return null;
      var T = A[A.length - 1];
      console.table(Object.keys(CANON).map(function (s) {
        return { set: s, canon: CANON[s].length, live: memberCount(s) };
      }));
      var multi = T.filter(isMultiSet).length;
      var none = T.filter(function (t) { return colorCatsOf(t).length === 0; }).length;
      console.log('multi-set (gold ring): ' + multi + ' | uncategorised: ' + none);
      return true;
    },
    rulings: function () {
      console.log('%c=== Category rulings ===', 'font-weight:700;color:#1E5AA0');
      Object.keys(RULINGS_RESOLVED).forEach(function (k) {
        var r = RULINGS_RESOLVED[k];
        console.log('\n' + k + ' \u2014 ' + r.ruling);
        if (r.members) console.log('  members: #' + r.members.join(', #'));
        if (r.basis) console.log('  ' + r.basis);
        if (r.conflict) console.log('  CONFLICT: ' + r.conflict);
        if (r.next) console.log('  next: ' + r.next);
      });
      return RULINGS_RESOLVED;
    }
  };

  /* Wait for both the thin base and the fused view, then apply
     everything that has to run live. */
  (function run(tries) {
    tries = tries || 0;
    if ((window.DD_TEMPLES && window.DIVYA_DESAMS) || tries > 40) {
      if (targetArrays().length) reconcileCategories();
      syncLegacyCategories();
      applyAlwarCounts();
      return;
    }
    setTimeout(function () { run(tries + 1); }, 50);
  })(0);

  console.log('[dd_v2_canon] consolidated canon loaded (baked 2026-07-30). ' +
              'Audit: DDCanon.audit() | rulings: DDCanon.rulings()');
})();
