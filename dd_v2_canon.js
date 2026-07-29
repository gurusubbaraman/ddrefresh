/* ==================================================================
   DD v2 — CANON: canonical set membership + category reconcile
   ------------------------------------------------------------------
   Ports the PPS pps_v3_patch_2c1.js CANON/reconcile pattern to DD.

   WHY THIS FILE EXISTS
   --------------------
   DD v1 had TWO broken category systems running side by side:

   1. window.CATEGORIES defined 9 sets, each with a `members` array.
      Those arrays are on an OBSOLETE NUMBERING and are simply wrong
      against the live data. Verified by town name:
         divya_kanchi        members said 76-89  -> those are Pandya
                             Nadu / Nava Tirupathi temples.
                             The real Kanchipuram 14 are 46-59.
         nava_tirupathi      members said 50-59  -> those are Kanchi.
                             The real Nava Tirupathi 9 are 71-79.
         thirunangur_cluster members said 24-36  -> those are Aadhanoor
                             / Thirumogur / Thirumalirunjolai.
                             The real Thirunangur 11 are 60-70.
      buildRelatedTab() reads these arrays for its "All N temples"
      counts, so every one of those counts is currently wrong.

   2. The per-temple categories[] arrays used 139 distinct slugs, of
      which 130 had no definition at all. buildRelatedTab() silently
      drops undefined slugs (`if (catData)`), so they render as
      nothing. 49 of 111 temples carry no categories[] at all.

   CANON below is built from the DATA STAMPS, each verified against
   the actual town names, not from the stale members arrays.
   reconcileCategories() strips every canonical slug and re-stamps
   from CANON on load — so CANON is the single source of truth,
   exactly as in PPS.

   ADDING A CATEGORY REQUIRES TWO EDITS (same rule as PPS):
     1. the temple's categories[] in the data
     2. CANON here — otherwise reconcile strips it on load
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_CANON_LOADED) return;
  window.DD_V2_CANON_LOADED = true;

  /* ---------------------------------------------------------------- */
  /* 1. CANONICAL SET MEMBERSHIP — verified against town names        */
  /* ---------------------------------------------------------------- */
  var CANON = {

    /* Kanchipuram cluster. 14 temples, snos 46-59. Verified: every
       member's town field reads Kanchipuram (Vishnu Kanchi / Big
       Kanchi / Chinna Kanchipuram / inside Ekambareswarar). */
    divya_kanchi: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],

    /* Thirunangur Vaippu Sthalams. 11 temples, snos 60-70, all with
       town = Thirunangur (near Sirkazhi, Cauvery delta). The slug
       `nangur_11` in v1 was an exact duplicate of this set and is
       merged away here. */
    thirunangur_cluster: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],

    /* Nava Tirupathi. 9 temples, snos 71-79, on the Thamirabarani.
       This set doubles as the NAVAGRAHA correspondence: each of the
       nine carries a distinct `planet` field, complete 9/9 --
         71 Alwarthirunagari  Jupiter (Guru)
         72 Thirukolur        Mars (Angaraka)
         73 Thenthiruperai    Venus (Shukra)
         74 Srivaikuntam      Sun (Surya)
         75 Natham            Moon (Chandra)
         76 Thirupulingudi    Mercury (Budha)
         77 Perungulam        Saturn (Shani)
         78 Tholaivillimangalam (north) Rahu
         79 Tholaivillimangalam (south) Ketu
       v1 encoded these as nine separate single-member slugs
       (surya_sthala, chandra_sthala, ...). They are dropped: the
       per-temple `planet` field already carries that information and
       nine one-member "sets" are not sets. */
    nava_tirupathi: [71, 72, 73, 74, 75, 76, 77, 78, 79],

    /* Pancha Pandava Kshetrams, Kuttanad, Kerala. 5/5 complete.
       v1 also carried five single-member slugs (yudhishthira_shrine,
       bheema_shrine, arjuna_shrine, nakula_shrine, sahadeva_shrine);
       those are folded into this one set. */
    pancha_pandava: [90, 91, 92, 93, 94],

    /* Ulagalantha Perumal / Trivikrama complex, Big Kanchipuram.
       3 shrines within one complex. v1 slug `element_temples` was an
       exact duplicate of `ulagalantha_complex` and is merged away. */
    ulagalantha_complex: [53, 54, 55],

    /* Alwar birthplaces (avatara sthalams) attested in the corpus:
         47 Kanchipuram Yathothkari  - Thirumazhisai Alwar
         48 Kanchipuram Ashtabhuja   - Poigai Alwar
         71 Alwarthirunagari         - Nammalvar
         72 Thirukolur               - Madhurakavi Alwar */
    alwar_birthplace: [47, 48, 71, 72],

    /* Pancharanga Kshetrams — the Kaveri-belt Ranganatha chain.
       Resolved from the corpus's OWN text, which is explicit:
         #1  "the Antya Ranga of the Pancharanga Kshetrams ... begins
              at Srirangapatna and passes through Kumbakonam
              Sarangapani, Koviladi Appakkudathan, and Thiru Indhalur"
         #4  "one of the five Pancharanga Kshetrams"
         #5  "the fourth Pancharanga Kshetram"
       Core five = Srirangapatna + 7 + 4 + 5 + 1. Srirangapatna is
       NOT a Divya Desam, so 4 of 5 are in corpus.
       #6 Anbil and #20 Thirukkoodalur describe themselves as
       "extended Pancharanga tradition" and are deliberately EXCLUDED
       from the core set. See RULINGS_PENDING if you want them in. */
    pancha_rangam: [1, 4, 5, 7],

    /* Sapta Mokshapuri — the seven moksha-granting cities. Four fall
       inside the DD corpus: Ayodhya, Mathura, Dwarka, Badrinath.
       (Kashi, Kanchi and Ujjain complete the seven; Kanchi is present
       in the corpus as the divya_kanchi cluster but not as a single
       Mokshapuri record.) Text-verified on all four. */
    sapta_mokshapuri: [101, 102, 104, 107]
  };

  /* ---------------------------------------------------------------- */
  /* 2. RULINGS PENDING — sets NOT enabled, awaiting owner decision    */
  /* ---------------------------------------------------------------- */
  /* Following the PPS discipline: record the conflict, do not resolve
     it silently. None of these are stamped into CANON above. */
  var RULINGS_PENDING = {
    pancha_naranyam: {
      issue: 'v1 members [43,45,46,47,60] are on the obsolete numbering. ' +
             'Zero textual matches for "Pancha Narayana/Naranyam" anywhere ' +
             'in the corpus. One stray stamp on #97 Srivilliputhur, which ' +
             'is an Andal shrine, not a Narayana pentad member.',
      action: 'Needs research + owner ruling before enabling.'
    },
    pancha_krishnam: {
      issue: 'v1 members [10,17,19,20,21] are on the obsolete numbering. ' +
             'Zero temples carry the stamp. Only #10 Thirukkannangudi ' +
             'mentions Pancha Krishna in its text.',
      action: 'Needs research + owner ruling before enabling.'
    },
    swayamvyakta: {
      issue: 'v1 members [1,15,55,96,102,104,105] vs a single live stamp ' +
             'on #1 Srirangam. The eight Swayamvyakta Kshetrams are ' +
             'traditionally Srirangam, Tirumala, Srimushnam, Naimisaranya, ' +
             'Pushkar, Badri, Salagrama, Thothadri — several of which are ' +
             'in corpus (1, 98, 107, 108) but were never stamped.',
      action: 'Propose [1, 98, 107, 108] in-corpus. Needs owner ruling.'
    },
    char_dham: {
      issue: 'Stamped on 104 Dwarka + 107 Badrinath. Text also matches ' +
             '105 Devaprayag and 106 Joshimath, which are Char Dham ROUTE ' +
             'stops, not Char Dham proper. The four Char Dham are ' +
             'Badrinath, Dwarka, Puri, Rameswaram — Puri and Rameswaram ' +
             'are not Divya Desams.',
      action: 'Propose [104, 107] as the in-corpus pair, disclosed as 2 of 4. ' +
              'Needs owner ruling on whether to add non-DD set-completers.'
    },
    andal_thiruppavai: {
      issue: 'v1 members [60,1,43]; single live stamp on #97 Srivilliputhur. ' +
             'Andal sang at 13 Divya Desams per ALWARS metadata but the ' +
             'live alwars data attests 11.',
      action: 'Derive from alwars.andal attestation rather than a hand list.'
    }
  };
  window.DD_RULINGS_PENDING = RULINGS_PENDING;

  /* ---------------------------------------------------------------- */
  /* 3. SLUGS RETIRED BY THIS FILE                                     */
  /* ---------------------------------------------------------------- */
  /* Dropped because they duplicate the `region` field verbatim. */
  var RETIRED_REGION_TAGS = [
    'malai_nadu', 'vada_nadu', 'chola_nadu', 'kumbakonam_belt',
    'uttarakhand', 'uttar_pradesh', 'andhra_pradesh', 'gujarat',
    'ganga_plain', 'kuttanad_region', 'ernakulam_kochi_region',
    'changanassery_region', 'coastal_western', 'nepal_himalayan',
    'outside_india', 'seven_hills', 'himalayan_gateway',
    'himalayan_anchor', 'vada_nadu_anchor', 'chola_nadu_anchor',
    'anchor_vada_nadu', 'kanyakumari_border', 'srirangam_adjacent'
  ];
  /* Dropped because they are exact duplicates of a canonical set. */
  var RETIRED_DUPLICATES = {
    nangur_11: 'thirunangur_cluster',
    element_temples: 'ulagalantha_complex'
  };
  /* Dropped because a per-temple field already carries the fact. */
  var RETIRED_TO_FIELD = {
    surya_sthala: 'planet', chandra_sthala: 'planet', angaraka_sthala: 'planet',
    budha_sthala: 'planet', guru_sthala: 'planet', shukra_sthala: 'planet',
    shani_sthala: 'planet', rahu_sthala: 'planet', ketu_sthala: 'planet',
    yudhishthira_shrine: 'pancha_pandava', bheema_shrine: 'pancha_pandava',
    arjuna_shrine: 'pancha_pandava', nakula_shrine: 'pancha_pandava',
    sahadeva_shrine: 'pancha_pandava'
  };
  window.DD_RETIRED_SLUGS = {
    region: RETIRED_REGION_TAGS,
    duplicates: RETIRED_DUPLICATES,
    toField: RETIRED_TO_FIELD
  };

  /* ---------------------------------------------------------------- */
  /* 4. CATEGORY METADATA — label / colour, Vaishnava palette          */
  /* ---------------------------------------------------------------- */
  var CAT_META = {
    pancha_rangam:       { label: 'Pancha Rangam',       label_ta: 'பஞ்ச ரங்கம்',        color: '#D4AF37' },
    divya_kanchi:        { label: 'Divya Kanchi',        label_ta: 'திவ்ய காஞ்சி',        color: '#1E5AA0' },
    nava_tirupathi:      { label: 'Nava Tirupathi',      label_ta: 'நவ திருப்பதி',       color: '#B8710A' },
    thirunangur_cluster: { label: 'Thirunangur 11',      label_ta: 'திருநாங்கூர்',        color: '#4A7C4E' },
    pancha_pandava:      { label: 'Pancha Pandava',      label_ta: 'பஞ்ச பாண்டவ',        color: '#0F6B70' },
    ulagalantha_complex: { label: 'Ulagalantha Complex', label_ta: 'உலகளந்த',           color: '#6B5DB8' },
    alwar_birthplace:    { label: 'Alwar Birthplace',    label_ta: 'ஆழ்வார் அவதார ஸ்தலம்', color: '#C2185B' },
    sapta_mokshapuri:    { label: 'Sapta Mokshapuri',    label_ta: 'சப்த மோக்ஷபுரி',      color: '#4A148C' }
  };

  var ICONS = {
    pancha_rangam:       '\uD83C\uDFDB\uFE0F', /* classical building - the Ranga chain */
    divya_kanchi:        '\uD83C\uDFF0',       /* castle - the temple city            */
    nava_tirupathi:      '\uD83E\uDE90',       /* planet - the navagraha correspondence*/
    thirunangur_cluster: '\uD83C\uDFAD',       /* masks - the eleven                  */
    pancha_pandava:      '\uD83C\uDFF9',       /* bow - the five brothers             */
    ulagalantha_complex: '\uD83D\uDC63',       /* footprints - Trivikrama's stride    */
    alwar_birthplace:    '\uD83D\uDE4F',       /* folded hands - avatara sthalam      */
    sapta_mokshapuri:    '\u2728'              /* sparkles - moksha                   */
  };

  /* Fill-colour precedence when a temple belongs to 2+ sets. */
  var PRECEDENCE = [
    'pancha_rangam', 'sapta_mokshapuri', 'divya_kanchi', 'nava_tirupathi',
    'thirunangur_cluster', 'pancha_pandava', 'ulagalantha_complex',
    'alwar_birthplace'
  ];

  var UNCAT_COLOR = '#7F8C8D';  /* muted slate */
  var MULTI_RING  = '#D4AF37';  /* gold ring for 2+ sets */
  var COLORED     = Object.keys(CAT_META);

  window.DD_CANON       = CANON;
  window.DD_CAT_META    = CAT_META;
  window.DD_CAT_ICONS   = ICONS;
  window.DD_PRECEDENCE  = PRECEDENCE;
  window.DD_UNCAT_COLOR = UNCAT_COLOR;
  window.DD_MULTI_RING  = MULTI_RING;

  /* ---------------------------------------------------------------- */
  /* 5. RECONCILE — strip canonical slugs, re-stamp from CANON         */
  /* ---------------------------------------------------------------- */
  function targetArray() {
    return window.DD_TEMPLES || window.DIVYA_DESAMS || null;
  }

  /* Every corpus that must carry canonical categories.
     ------------------------------------------------------------------
     v1.1 FIX. Reconcile originally stamped only ONE array. But
     dd_v2_loader.js builds the fused back-compat view with
     Object.assign({}, enrichment, base) BEFORE this file runs, so:
       - reassigning t.categories on the base object breaks the shared
         array reference and the fused record keeps the stale value;
       - the 49 temples that never had a categories field at all end up
         with categories === undefined on the fused view.
     Since the filter chain and v1's buildRelatedTab both read the FUSED
     view, canonical stamps silently never reached them. #4 Koviladi is
     the tell: CANON.pancha_rangam is [1,4,5,7] but only #1 showed up.
     Stamping every known corpus is reference-independent and therefore
     correct whether or not the loader is present. */
  function targetArrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;          /* same reference twice */
      seen.push(A); out.push(A);
    });
    return out;
  }

  function reconcileCategories() {
    var ARRS = targetArrays();
    if (!ARRS.length) {
      console.warn('[dd_v2_canon] no temple array found — reconcile skipped.');
      return 0;
    }
    var total = 0;
    ARRS.forEach(function (T) { total += reconcileOne(T); });
    console.log('[dd_v2_canon] Reconciled ' + ARRS.length + ' corpus array(s).');
    return total;
  }

  function reconcileOne(T) {
    var bySno = {};
    T.forEach(function (t) { bySno[t.sno] = t; });

    var retired = {};
    RETIRED_REGION_TAGS.forEach(function (s) { retired[s] = 1; });
    Object.keys(RETIRED_DUPLICATES).forEach(function (s) { retired[s] = 1; });
    Object.keys(RETIRED_TO_FIELD).forEach(function (s) { retired[s] = 1; });

    /* Strip every canonical slug and every retired slug. Descriptive
       tags that are neither are preserved untouched. */
    T.forEach(function (t) {
      if (!Array.isArray(t.categories)) t.categories = [];
      t.categories = t.categories.filter(function (c) {
        return COLORED.indexOf(c) < 0 && !retired[c];
      });
    });

    /* Re-stamp exactly the canonical membership. */
    var stamped = 0, orphan = [];
    Object.keys(CANON).forEach(function (slug) {
      CANON[slug].forEach(function (sno) {
        var t = bySno[sno];
        if (!t) { orphan.push(slug + ':' + sno); return; }
        if (t.categories.indexOf(slug) < 0) { t.categories.push(slug); stamped++; }
      });
    });

    if (orphan.length) {
      console.warn('[dd_v2_canon] CANON references missing snos:', orphan.join(', '));
    }
    console.log('[dd_v2_canon] ' + stamped + ' stamps across ' +
                Object.keys(CANON).length + ' canonical sets (' + T.length + ' records).');
    return stamped;
  }

  /* ---------------------------------------------------------------- */
  /* 6. HELPERS for the marker / pill layer                            */
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
    var T = A[0];
    var live = {}; T.forEach(function (t) { live[t.sno] = 1; });
    return (CANON[slug] || []).filter(function (s) { return live[s]; }).length;
  }

  window.DDCanon = {
    CANON: CANON,
    reconcileCategories: reconcileCategories,
    colorCatsOf: colorCatsOf,
    fillColorOf: fillColorOf,
    isMultiSet: isMultiSet,
    memberCount: memberCount,
    audit: function () {
      var A = targetArrays(); if (!A.length) return null;
      var T = A[A.length - 1];   /* audit the view the UI actually reads */
      var rows = Object.keys(CANON).map(function (s) {
        return { set: s, canon: CANON[s].length, live: memberCount(s) };
      });
      console.table(rows);
      var multi = T.filter(isMultiSet).length;
      var none  = T.filter(function (t) { return colorCatsOf(t).length === 0; }).length;
      console.log('multi-set (gold ring): ' + multi + ' | uncategorised (slate): ' + none);
      console.log('rulings pending: ' + Object.keys(RULINGS_PENDING).join(', '));
      return rows;
    }
  };

  /* Run immediately if the data is already present, else wait. */
  /* Wait for the loader's fused view before stamping, so both the thin
     base and the back-compat view get canonical categories. */
  (function run(tries) {
    tries = tries || 0;
    var haveBase  = !!window.DD_TEMPLES;
    var haveFused = !!window.DIVYA_DESAMS;
    if ((haveBase && haveFused) || tries > 40) {
      if (targetArrays().length) reconcileCategories();
      else console.warn('[dd_v2_canon] no corpus found after wait.');
      return;
    }
    setTimeout(function () { run(tries + 1); }, 50);
  })(0);

  console.log('[dd_v2_canon] Loaded. Audit with: window.DDCanon.audit()');
})();
