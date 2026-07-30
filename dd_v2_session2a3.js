/* ==================================================================
   DD v2 — MERGES, ADDITIONS, RECLASSIFICATION   (Session 2A.3)
   ------------------------------------------------------------------
   Six owner-ruled operations that close the corpus at the canonical
   106 terrestrial Divya Desams.

     1. MERGE  #43 + #44 + #45  ->  #43   Thanjai Mamani Koil
     2. MERGE  #78 + #79        ->  #78   Irattai Tirupathi
     3. ADD    #42  Thirukkoodal — Koodal Azhagar, Madurai
     4. ADD    #44  Thiruthangal — Nindra Narayana, Sivakasi
     5. ADD    #45  Vanamamalai — Thothatrinatha, Nanguneri
     6. RECLASSIFY #100 Simhachalam as an Abhimana Kshetram

   ------------------------------------------------------------------
   THE ARITHMETIC
   ------------------------------------------------------------------
       107 terrestrial before this session   (#42 vacant)
        -2 Thanjai merge frees #44, #45      -> 105
        -1 Irattai merge frees #79           -> 104
        -1 Simhachalam becomes abhimana      -> 103
        +3 Pandya additions at #42, #44, #45 -> 106  ✓

   106 terrestrial + 2 celestial (#110, #111) = the canonical 108.
   Plus #109 Mannargudi and now #100 Simhachalam as Abhimana
   Kshetrams, which sit outside the 108 by definition.

   Four slots were freed and three filled, so ONE slot stays vacant:
   #79. It is left deliberately at the end of the Nava Tirupathi
   block, immediately after the merged Irattai record, where its
   emptiness documents the merge that caused it. sno is canonical and
   is never renumbered.

   ------------------------------------------------------------------
   1. THANJAI MAMANI KOIL IS ONE DIVYA DESAM
   ------------------------------------------------------------------
   Three shrines standing about 200 m apart on the Vennaru near
   Thanjavur, worshipped together as a single Divya Desam. This is the
   only case among the 108 where three separate temples are counted as
   one. Pillai Perumal Iyengar's 108 Tirupathi Anthathi states it
   plainly: "From the divya desam count point of view, there is only
   one but it has three sannidhis."

   The three, with the owner GPS from Session 1D.1:
       Thanjai Mamanikoil   Neelamega Perumal      10.817821, 79.136143
       Manikundram          Manikundra Perumal     10.816870, 79.137372
       Thanjaiyali Nagar    Veera Nrisimha Perumal 10.815573, 79.138999

   All three narratives are preserved in full on the merged record.

   ------------------------------------------------------------------
   2. IRATTAI TIRUPATHI IS ONE DIVYA DESAM
   ------------------------------------------------------------------
   Devapiran and Aravindalochanar stand about 160 m apart at
   Tholaivillimangalam. Irattai means twin: two shrines, one Divya
   Desam. Every Pandya Nadu enumeration gives "Thiruttholai
   Villimangalam (Twin Thirupathis)" as a single entry.

   Within the NAVA TIRUPATHI circuit, however, they count as TWO of
   the nine shrines and carry two distinct navagraha assignments —
   Devapiran is Rahu, Aravindalochanar is Ketu. Both are preserved on
   the merged record. This is precisely why the Nava Tirupathi number
   nine while Pandya Nadu holds eighteen Divya Desams.

   CANON.nava_tirupathi is amended from nine members to eight in the
   companion file dd_v2_canon2.js. The pill will read 8.

   ------------------------------------------------------------------
   3-5. THE THREE MISSING PANDYA NADU DIVYA DESAMS
   ------------------------------------------------------------------
   All three appear in every canonical Pandya Nadu 18 enumeration and
   were entirely absent from this corpus. Coordinates are the
   published Wikipedia values; they are marked coords_verified false
   and are candidates for a future owner GPS pass.

   ------------------------------------------------------------------
   6. SIMHACHALAM IS NOT ONE OF THE 108
   ------------------------------------------------------------------
   Andhra Pradesh holds exactly two Divya Desams — Tirumala and
   Ahobilam. Simhachalam is an Abhimana Kshetram: revered, sung of,
   but outside the 108. It is reclassified rather than deleted, and
   joins #109 Mannargudi under the gold Abhimana marker.

   ------------------------------------------------------------------
   NOTHING IS DESTROYED
   ------------------------------------------------------------------
   Every retired record is parked in full at
       window.DD_RETIRED_RECORDS.<key>
   and can be restored with DDRemap.restoreRetired(key, sno).
   Keys added here: manikundram, thanjaiyali, aravindalochanar.

   LOAD ORDER — after names, before filters and markers:
     dd_v2_canon.js
     dd_v2_canon2.js
     dd_v2_coords.js
     dd_v2_remap.js
     dd_v2_names.js
     dd_v2_session2a3.js    <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2A3_LOADED) return;
  window.DD_SESSION_2A3_LOADED = true;

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
  function sortBySno() {
    arrays().forEach(function (A) {
      A.sort(function (a, b) { return (a.sno || 0) - (b.sno || 0); });
    });
  }
  function park(key, sno) {
    var ARRS = arrays(); if (!ARRS.length) return;
    var rec = ARRS[0].filter(function (t) { return t.sno === sno; })[0];
    if (!rec) return;
    window.DD_RETIRED_RECORDS = window.DD_RETIRED_RECORDS || {};
    if (window.DD_RETIRED_RECORDS[key]) return;
    window.DD_RETIRED_RECORDS[key] = {
      retired_from_sno: sno,
      retired_by: 'Session 2A.3 — owner ruling',
      base: clone(rec),
      enrichment: (window.DD_ENRICHMENT && window.DD_ENRICHMENT[sno])
                    ? clone(window.DD_ENRICHMENT[sno]) : null
    };
  }
  function release(sno) {
    arrays().forEach(function (T) {
      for (var i = T.length - 1; i >= 0; i--) {
        if (T[i] && T[i].sno === sno) T.splice(i, 1);
      }
    });
    if (window.DD_ENRICHMENT) delete window.DD_ENRICHMENT[sno];
    try {
      if (window.templeMarkersMap && window.templeMarkersMap[sno]) {
        if (window.templeMarkersGroup) {
          window.templeMarkersGroup.removeLayer(window.templeMarkersMap[sno]);
        }
        delete window.templeMarkersMap[sno];
      }
    } catch (e) {}
  }
  /* Write a record into every array with the correct shape: the thin
     base gets base fields only, every other array gets enrichment
     merged with base, exactly as dd_v2_loader.js would have built it. */
  function writeRecord(sno, baseFields, enrFields) {
    var thin = window.DD_TEMPLES;
    arrays().forEach(function (T) {
      var isThin = (T === thin);
      T.forEach(function (t) {
        if (t.sno !== sno) return;
        Object.keys(baseFields).forEach(function (k) { t[k] = clone(baseFields[k]); });
        if (!isThin && enrFields) {
          Object.keys(enrFields).forEach(function (k) { t[k] = clone(enrFields[k]); });
          Object.keys(baseFields).forEach(function (k) { t[k] = clone(baseFields[k]); });
        }
      });
    });
  }
  function addRecord(sno, baseFields, enrFields) {
    var thin = window.DD_TEMPLES;
    arrays().forEach(function (T) {
      var isThin = (T === thin);
      var rec = isThin ? clone(baseFields)
                       : Object.assign({}, clone(enrFields || {}), clone(baseFields));
      T.push(rec);
    });
    if (window.DD_ENRICHMENT && enrFields) window.DD_ENRICHMENT[sno] = clone(enrFields);
  }

  /* ================================================================ */
  /* NEW TEMPLE 1 — #42 THIRUKKOODAL, Koodal Azhagar, Madurai        */
  /* ================================================================ */
  var KOODAL_BASE = {
    sno: 42,
    canonical_position: 42,
    region: 'Pandya Nadu',
    temple_name: 'Sri Koodal Azhagar Perumal Temple, Thirukkoodal (Madurai)',
    temple_name_ta: 'ஸ்ரீ கூடல் அழகர் பெருமாள் கோயில், திருக்கூடல் (மதுரை)',
    temple_name_short: 'Sri Koodal Azhagar Perumal (Thirukkoodal, Madurai)',
    temple_name_short_ta: 'ஸ்ரீ கூடல் அழகர் பெருமாள் (திருக்கூடல், மதுரை)',
    town: 'Madurai (Thirukkoodal)',
    town_ta: 'மதுரை (திருக்கூடல்)',
    district: 'Madurai',
    state: 'Tamil Nadu',
    lat: 9.9143972,
    lng: 78.1141083,
    posture: 'Nindra + Veetrirundha + Kidantha (all three simultaneously, on three levels)',
    posture_class: 'Multiple',
    is_celestial: false,
    is_abhimana: false,
    categories: [],
    coords_verified: false,
    coords_source: 'Published: Wikipedia, Koodal Azhagar Temple. Candidate for an owner GPS pass.',
    wiki_url: 'https://en.wikipedia.org/wiki/Koodal_Azhagar_Temple',
    sthala_purana_tagline: 'The Beautiful Lord of the Assembly, in the heart of the Pandya capital — standing, seated and reclining on three levels of a single vimana, and the court where Periyalvar won the purse of gold.',
    sthala_purana_tagline_ta: 'பாண்டிய தலைநகரின் இதயத்தில் அமர்ந்த கூடல் அழகர் — ஒரே விமானத்தின் மூன்று நிலைகளில் நின்ற, இருந்த, கிடந்த திருக்கோலங்கள்; பெரியாழ்வார் பொற்கிழி வென்ற அவை.'
  };

  var KOODAL_ENR = {
    canonical_region: 'Pandya Nadu',
    canonical_cluster: 'Madurai (Pandya capital)',
    canonical_position_traditional: 58,
    canonical_note: 'Session 2A.3 (owner ruling): ADDED. Thirukkoodal is the first entry in ' +
      'every canonical Pandya Nadu 18 enumeration and was entirely absent from this corpus. ' +
      'Verified against Wikipedia (Koodal Azhagar Temple, 9.9143972 N 78.1141083 E), ' +
      'srinivasayatraservice and 108divyadesams.in Pandya Nadu lists. Placed at the slot ' +
      'released by the Session 2A.2 Thiruvali-Thirunagari merge.',
    alternate_names: ['Thirukkoodal', 'Koodal Azhagar', 'Viyooga Sundararajan',
                      'Koodal Alagar', 'Madurai Perumal Koil'],
    alternate_names_ta: ['திருக்கூடல்', 'கூடல் அழகர்', 'வியூக சுந்தரராஜன்', 'கூடலழகர் கோயில்'],
    perumal_name: 'Sri Koodal Azhagar — worshipped in the sanctum as Viyooga Sundararajan, the Beautiful Lord of the Assembly',
    perumal_name_ta: 'ஸ்ரீ கூடல் அழகர் — கருவறையில் வியூக சுந்தரராஜனாக வழிபடப்படுபவர்',
    perumal_name_sa: 'Vyuha Sundararaja',
    thayar_name: 'Sri Mathuravalli Thayar (the Sweet-Vine Goddess of Madurai)',
    thayar_name_ta: 'ஸ்ரீ மதுரவல்லி தாயார்',
    facing: 'East',
    facing_ta: 'கிழக்கு',
    vimana: 'Ashtanga Vimanam (the eight-limbed tower)',
    vimana_ta: 'அஷ்டாங்க விமானம்',
    pushkarini: 'Hema Pushkarani (the Golden Tank)',
    pushkarini_ta: 'ஹேம புஷ்கரிணி',
    confidence: 'high',

    sthala_purana:
      'Sri Koodal Azhagar Perumal Temple stands in the heart of Madurai, the ancient Pandya ' +
      'capital, and heads every canonical enumeration of the eighteen Pandya Nadu Divya ' +
      'Desams. KOODAL is the old Tamil name for Madurai — the meeting place, the assembly, ' +
      'the confluence — and the Lord who presides here is therefore Koodal Azhagar, the ' +
      'Beautiful One of the Assembly, worshipped in the sanctum under his formal name ' +
      'VIYOOGA SUNDARARAJAN. The primary sthala purana concerns the recovery of the Vedas. ' +
      'The asura SOMUKA seized the four Vedas and fled with them into the depths of the sea, ' +
      'leaving creation without the ordering knowledge by which it is sustained. Vishnu ' +
      'descended, destroyed the demon and restored the Vedas to Brahma, and it is in that ' +
      'aspect — the Lord who recovers what has been stolen from the world — that he is ' +
      'enshrined here. The second sthala purana layer is architectural and theological at ' +
      'once. This is one of the very few Divya Desams in which Vishnu is enshrined in ALL ' +
      'THREE POSTURES SIMULTANEOUSLY, arranged vertically on three levels of a single ' +
      'vimana: STANDING on the ground floor as Koodal Azhagar, SEATED on the first floor as ' +
      'Sooryanarayanan, and RECLINING on the topmost level as Ranganathar. The ASHTANGA ' +
      'VIMANAM — the eight-limbed tower — houses this triple manifestation, and the ' +
      'arrangement is read as a statement of the Lord\u2019s presence in every condition: ' +
      'the vigilant, the deliberating and the reposing, one Lord in three attitudes, ' +
      'available to the devotee in whatever state the devotee happens to be. The third ' +
      'sthala purana layer is the most consequential for Sri Vaishnava history. A Pandya ' +
      'king named VALLABHADEVA went among his people in disguise to learn how they lived. ' +
      'A scholar told him that the purpose of life was to gather in summer and store for ' +
      'winter — that is, to work while young and save for old age. Unconvinced that this ' +
      'was the whole of it, the king set the question as a public contest at his court, ' +
      'suspending a purse of gold to be claimed by whoever could expound the true means of ' +
      'liberation. VISHNUCHITTAR, a garland-maker of Srivilliputhur who had never formally ' +
      'studied the sastras, was directed to Madurai by the Lord\u2019s own voice. He ' +
      'expounded hitam and purushartham from the Vedas and declared that the feet of ' +
      'Narayana alone grant salvation. The purse is said to have descended of its own ' +
      'accord. Vallabhadeva honoured him and the assembled scholars conceded. Returning in ' +
      'procession through the streets of Madurai, Vishnuchittar beheld Vishnu upon Garuda ' +
      'in the sky above him and — seized by the fear that the evil eye might fall upon the ' +
      'Lord himself — sang the THIRUPPALLANDU, the benediction of long life that now opens ' +
      'the entire Nalayira Divya Prabandham. From that day he was PERIYALVAR, the great ' +
      'Alwar. With the gold he is believed to have raised the gopuram of the Srivilliputhur ' +
      'temple. The fourth sthala purana layer concerns the shrine\u2019s setting. Madurai is ' +
      'known throughout the world for Meenakshi, and Koodal Azhagar stands as the Sri ' +
      'Vaishnava jewel of the same city — the two traditions sharing one capital for well ' +
      'over a millennium. The temple is enclosed by a granite wall with a five-tiered raja ' +
      'gopuram, is of Pandya foundation with substantial Vijayanagara and Madurai Nayak ' +
      'additions from the sixteenth century, follows the Tenkalai tradition, and observes a ' +
      'fourteen-day Brahmotsavam in Vaikasi. Sung by both Nammalvar and Periyalvar, it is ' +
      'one of the few Divya Desams whose own courtyard is the setting of an Alwar\u2019s ' +
      'origin story.',

    sthala_purana_ta:
      'பழம்பெரும் பாண்டிய தலைநகரான மதுரையின் இதயத்தில் ஸ்ரீ கூடல் அழகர் பெருமாள் கோயில் ' +
      'அமைந்துள்ளது; பதினெட்டு பாண்டிய நாட்டு திவ்யதேசங்களின் பட்டியலில் இது முதலிடம் ' +
      'பெறுகிறது. கூடல் என்பது மதுரையின் பழைய தமிழ்ப் பெயர் — கூடும் இடம், அவை, சங்கமம் — ' +
      'ஆகவே இங்கு எழுந்தருளியிருக்கும் பெருமாள் கூடல் அழகர், அவையின் அழகன்; கருவறையில் ' +
      'வியூக சுந்தரராஜன் என்னும் திருநாமத்தால் வழிபடப்படுகிறார். மூல ஸ்தல புராணம் ' +
      'வேதங்களை மீட்ட வரலாறு. சோமுகன் என்னும் அசுரன் நான்கு வேதங்களையும் கவர்ந்து கடலின் ' +
      'ஆழத்தில் மறைந்தான்; உலகம் தன்னை நிலைநிறுத்தும் அறிவின்றி தவித்தது. விஷ்ணு ' +
      'அவதரித்து அசுரனை அழித்து வேதங்களை பிரம்மனிடம் மீட்டுத் தந்தார். உலகிலிருந்து ' +
      'திருடப்பட்டதை மீட்டுத் தரும் அந்த வடிவிலேயே இங்கு எழுந்தருளியுள்ளார். இரண்டாம் ' +
      'அடுக்கு புராணம் ஒரே சமயத்தில் கட்டிடக்கலை சார்ந்ததும் இறையியல் சார்ந்ததும் ஆகும். ' +
      'மூன்று திருக்கோலங்களும் ஒரே விமானத்தின் மூன்று நிலைகளில் ஒருங்கே காட்சி தரும் ' +
      'மிகச் சில திவ்யதேசங்களில் இதுவும் ஒன்று: தரைத்தளத்தில் நின்ற கோலத்தில் கூடல் ' +
      'அழகராகவும், முதல் தளத்தில் இருந்த கோலத்தில் சூர்யநாராயணனாகவும், உச்சித் தளத்தில் ' +
      'கிடந்த கோலத்தில் ரங்கநாதராகவும் அருள்கிறார். அஷ்டாங்க விமானம் இம்மூன்று ' +
      'வெளிப்பாடுகளையும் தாங்கி நிற்கிறது. இந்த அமைப்பு இறைவனின் எல்லா நிலைகளிலும் ' +
      'உள்ள இருப்பை உணர்த்துகிறது — விழிப்பு, சிந்தனை, அமைதி — ஒரே இறைவன் மூன்று ' +
      'நிலைகளில், பக்தன் எந்த நிலையில் இருந்தாலும் அவனுக்கு அணுகக்கூடியவனாக. மூன்றாம் ' +
      'அடுக்கு புராணம் ஸ்ரீ வைஷ்ணவ வரலாற்றில் மிக முக்கியமானது. வல்லபதேவன் என்னும் ' +
      'பாண்டிய மன்னன் மக்களின் வாழ்வை அறிய மாறுவேடத்தில் நகர் உலா வந்தான். ஒரு ' +
      'புலவர் வாழ்வின் நோக்கம் கோடையில் சேர்த்து குளிருக்குச் சேமிப்பதே என்றார். இது ' +
      'முழு உண்மையல்ல என எண்ணிய மன்னன், முக்திக்கான உண்மையான வழியை விளக்குபவர் ' +
      'பெறும்படி பொற்கிழி ஒன்றைத் தன் அவையில் தொங்கவிட்டு போட்டி அறிவித்தான். ' +
      'சாஸ்திரங்களை முறையாகக் கற்காத ஸ்ரீவில்லிபுத்தூர் மாலைக்காரரான விஷ்ணுசித்தர், ' +
      'இறைவனின் குரலால் வழிநடத்தப்பட்டு மதுரைக்கு வந்தார். வேதங்களிலிருந்து ஹிதம், ' +
      'புருஷார்த்தம் ஆகியவற்றை விளக்கி, நாராயணனின் திருவடிகளே முக்தி தரும் என ' +
      'அறிவித்தார். பொற்கிழி தானாகவே இறங்கியது என்பர். வல்லபதேவன் அவரைச் சிறப்பித்தான்; ' +
      'அவையிலிருந்த புலவர்கள் ஏற்றுக்கொண்டனர். மதுரைத் தெருக்களில் ஊர்வலமாக ' +
      'திரும்பியபோது, வானில் கருடன் மீது எழுந்தருளிய விஷ்ணுவைக் கண்டு — இறைவனுக்கே ' +
      'கண்ணேறு படுமோ என அஞ்சி — திருப்பல்லாண்டு பாடினார்; அதுவே இன்று நாலாயிர திவ்ய ' +
      'பிரபந்தத்தின் தொடக்கமாக விளங்குகிறது. அன்று முதல் அவர் பெரியாழ்வார். அப்பொன்னால் ' +
      'ஸ்ரீவில்லிபுத்தூர் கோபுரத்தை எழுப்பினார் என்பர். நான்காம் அடுக்கு இக்கோயிலின் ' +
      'அமைவிடம் சார்ந்தது. மதுரை உலகறிந்த மீனாட்சியின் நகரம்; அதே நகரின் ஸ்ரீ வைஷ்ணவ ' +
      'மணியாக கூடல் அழகர் விளங்குகிறார் — இரு மரபுகளும் ஆயிரம் ஆண்டுகளுக்கும் மேலாக ' +
      'ஒரே தலைநகரைப் பகிர்ந்துகொண்டுள்ளன. கருங்கல் மதிலும் ஐந்து நிலை ராஜகோபுரமும் ' +
      'கொண்ட இக்கோயில் பாண்டியர் அடித்தளத்தில் எழுந்து, பதினாறாம் நூற்றாண்டு விஜயநகர, ' +
      'மதுரை நாயக்கர் பங்களிப்புகளைப் பெற்றது. தென்கலை மரபு; வைகாசி பிரம்மோற்சவம் ' +
      'பதினான்கு நாட்கள். நம்மாழ்வார் மற்றும் பெரியாழ்வார் இருவராலும் மங்களாசாசனம் ' +
      'செய்யப்பட்டது.',

    distinctive_features: [
      'Heads every canonical Pandya Nadu 18 enumeration — restored to this corpus in Session 2A.3 after being entirely absent',
      'All three postures on three levels of one vimana: standing (Koodal Azhagar), seated (Sooryanarayanan), reclining (Ranganathar)',
      'Ashtanga Vimanam — the eight-limbed tower, a rare form',
      'The court where Periyalvar won the purse of gold and, returning, sang the Thiruppallandu',
      'Koodal is the ancient Tamil name of Madurai — the assembly, the meeting place',
      'The Somuka legend — Vishnu recovers the four Vedas from the ocean',
      'Sung by both Nammalvar and Periyalvar',
      'The Sri Vaishnava anchor of a city famous for Meenakshi'
    ],
    distinctive_features_ta: [
      'பாண்டிய நாட்டு பதினெட்டு திவ்யதேசங்களின் பட்டியலில் முதன்மையானது',
      'ஒரே விமானத்தின் மூன்று நிலைகளில் நின்ற, இருந்த, கிடந்த திருக்கோலங்கள்',
      'அஷ்டாங்க விமானம்',
      'பெரியாழ்வார் பொற்கிழி வென்று திருப்பல்லாண்டு பாடிய தலம்',
      'கூடல் என்பது மதுரையின் பழந்தமிழ்ப் பெயர்',
      'சோமுகனிடமிருந்து வேதங்களை மீட்ட வரலாறு',
      'நம்மாழ்வார், பெரியாழ்வார் மங்களாசாசனம்',
      'மீனாட்சியின் நகரில் ஸ்ரீ வைஷ்ணவ மையம்'
    ],
    unique_note: 'The triple-posture arrangement here is often compared with Thirukoshtiyur, ' +
      'the other Pandya Nadu shrine holding all three forms in one vimana. Koodal Azhagar is ' +
      'distinguished by the Ashtanga Vimanam and by the fact that the seated form on the ' +
      'middle level is worshipped as Sooryanarayanan.',
    unique_note_ta: 'மூன்று திருக்கோலங்கள் ஒரே விமானத்தில் அமைந்த திருக்கோஷ்டியூருடன் ' +
      'இத்தலம் ஒப்பிடப்படுகிறது. அஷ்டாங்க விமானமும், நடுத்தளத்தில் சூர்யநாராயணனாக ' +
      'வழிபடப்படும் இருந்த கோலமும் இதைத் தனித்துக் காட்டுகின்றன.',
    alwar_note: 'Sung by Nammalvar in the Thiruvaimozhi and by Periyalvar, whose own ' +
      'transformation into an Alwar took place at the Pandya court in this city.',
    alwar_note_ta: 'நம்மாழ்வார் திருவாய்மொழியிலும் பெரியாழ்வாரும் மங்களாசாசனம் ' +
      'செய்துள்ளனர்; பெரியாழ்வாரின் ஆழ்வார் நிலை இந்நகரின் பாண்டிய அவையிலேயே நிகழ்ந்தது.',
    alwars: {
      nammalvar: { pasurams: 11, reference: 'Thiruvaimozhi — dedicated decad on Thirukkoodal' },
      periyalvar: { pasurams: 11, reference: 'Periyalvar Thirumozhi — verses on Koodal Azhagar' }
    },
    acharya_associations: 'Periyalvar\u2019s victory at the Pandya court in this city is one of ' +
      'the founding episodes of the sampradaya. The temple later fell within the circuit of the ' +
      'Madurai Sri Vaishnava establishments.',
    acharya_associations_ta: 'இந்நகரின் பாண்டிய அவையில் பெரியாழ்வார் பெற்ற வெற்றி ' +
      'சம்பிரதாயத்தின் அடித்தள நிகழ்வுகளில் ஒன்று.',
    epigraphy_note: 'Pandya foundation with Vijayanagara and Madurai Nayak additions, ' +
      'principally the pillared halls and major shrines of the sixteenth century. ' +
      'Administered by the TN HR&CE Department.',
    epigraphy_note_ta: 'பாண்டியர் அடித்தளம்; விஜயநகர, மதுரை நாயக்கர் காலக் கட்டுமானங்கள். ' +
      'தமிழ்நாடு அறநிலையத் துறை நிர்வாகம்.',
    festivals: 'The fourteen-day Brahmotsavam in Vaikasi (May-June) is the principal annual ' +
      'festival. Vaikunta Ekadasi in Margazhi and the Chithirai season, when the whole city ' +
      'turns to festival, are also observed with large gatherings.',
    festivals_ta: 'வைகாசி மாத பதினான்கு நாள் பிரம்மோற்சவம் முதன்மையானது. மார்கழி ' +
      'வைகுண்ட ஏகாதசி, சித்திரைத் திருவிழா காலம் ஆகியவற்றிலும் பெருந்திரள் கூடும்.',
    external_sources: [
      { name: 'Wikipedia: Koodal Azhagar Temple',
        url: 'https://en.wikipedia.org/wiki/Koodal_Azhagar_Temple' },
      { name: '108divyadesams.in — Pandya Nadu enumeration',
        url: 'https://www.108divyadesams.in/pandiyanadu/' }
    ],
    sii_references: [], audio_sources: [], mangalasasanam_pasurams: []
  };

  /* ================================================================ */
  /* NEW TEMPLE 2 — #44 THIRUTHANGAL, Nindra Narayana, Sivakasi      */
  /* ================================================================ */
  var THANGAL_BASE = {
    sno: 44,
    canonical_position: 44,
    region: 'Pandya Nadu',
    temple_name: 'Sri Nindra Narayana Perumal Temple, Thiruthangal',
    temple_name_ta: 'ஸ்ரீ நின்ற நாராயண பெருமாள் கோயில், திருத்தங்கல்',
    temple_name_short: 'Sri Nindra Narayana Perumal (Thiruthangal)',
    temple_name_short_ta: 'ஸ்ரீ நின்ற நாராயண பெருமாள் (திருத்தங்கல்)',
    town: 'Thiruthangal, Sivakasi',
    town_ta: 'திருத்தங்கல், சிவகாசி',
    district: 'Virudhunagar',
    state: 'Tamil Nadu',
    lat: 9.481861,
    lng: 77.811583,
    posture: 'Standing (Nindra)',
    posture_class: 'Nindra',
    is_celestial: false,
    is_abhimana: false,
    categories: [],
    coords_verified: false,
    coords_source: 'Published: Wikipedia, Ninra Narayana Perumal temple. Candidate for an owner GPS pass.',
    wiki_url: 'https://en.wikipedia.org/wiki/Ninra_Narayana_Perumal_temple',
    sthala_purana_tagline: 'Narayana who stayed — the hill shrine with no gopuram, where Sridevi won the contest of devotion and the Lord, unwilling to leave, remained standing.',
    sthala_purana_tagline_ta: 'தங்கிய நாராயணன் — கோபுரமற்ற மலைக்கோயில்; ஸ்ரீதேவி பக்திப் போட்டியில் வென்ற இடம், இறைவன் அகல மனமின்றி நின்ற திருத்தலம்.'
  };

  var THANGAL_ENR = {
    canonical_region: 'Pandya Nadu',
    canonical_cluster: 'Virudhunagar (Sivakasi belt), near Srivilliputhur',
    canonical_position_traditional: 89,
    canonical_note: 'Session 2A.3 (owner ruling): ADDED. Thiruthangal appears in every ' +
      'canonical Pandya Nadu 18 enumeration and was entirely absent from this corpus. ' +
      'Verified against Wikipedia (Ninra Narayana Perumal temple, 9.481861 N 77.811583 E), ' +
      'divyadesam.com and 108divyadesams.in. Placed at a slot released by the Thanjai ' +
      'Mamani Koil merge in this same session.',
    alternate_names: ['Thiruthangal', 'Thiruthankaal', 'Nindra Narayana Perumal Koil',
                      'Ninra Narayana', 'Thangal'],
    alternate_names_ta: ['திருத்தங்கல்', 'நின்ற நாராயண பெருமாள் கோயில்', 'திருத்தங்கால்'],
    perumal_name: 'Sri Nindra Narayana Perumal — Narayana who stands, because he stayed',
    perumal_name_ta: 'ஸ்ரீ நின்ற நாராயண பெருமாள் — தங்கியதால் நின்ற கோலம் கொண்டவர்',
    perumal_name_sa: 'Nitya Narayana',
    thayar_name: 'Sri Arunakamala Mahadevi, also worshipped as Sengamalathayar (the Red-Lotus Goddess)',
    thayar_name_ta: 'ஸ்ரீ அருணகமல மகாதேவி, செங்கமலத் தாயார்',
    facing: 'East',
    facing_ta: 'கிழக்கு',
    vimana: 'Rock-cut sanctum on the granite hill; no rajagopuram',
    vimana_ta: 'கருங்கல் மலையில் குடைவரைக் கருவறை; ராஜகோபுரம் இல்லை',
    pushkarini: 'The tirtha raised by Sridevi, within the hill enclosure',
    pushkarini_ta: 'ஸ்ரீதேவி உருவாக்கிய தீர்த்தம்',
    confidence: 'high',

    sthala_purana:
      'Sri Nindra Narayana Perumal Temple at Thiruthangal — now a quarter of Sivakasi in ' +
      'Virudhunagar district — is one of the eighteen Pandya Nadu Divya Desams and among the ' +
      'most architecturally unusual of the entire 108. It is built upon a granite hill some ' +
      'hundred feet tall, and it has NO RAJAGOPURAM at all: where every other Divya Desam is ' +
      'entered beneath a gateway tower, here the pilgrim climbs a flight of steps cut into ' +
      'the living rock. The primary sthala purana is the contest of the three consorts. ' +
      'SRIDEVI, BHUDEVI and NILADEVI fell into a friendly dispute over which of them loved ' +
      'Vishnu most. Sridevi descended to earth, chose a sequestered spot among the paddy ' +
      'fields, restored it, and sat down in devotion. So great was the power of her worship ' +
      'that the sages of the region set aside their own observances and began to worship her ' +
      'instead. Recognising that to dwell alone was improper, she raised a tirtha and ' +
      'propitiated Vishnu directly. Pleased by her devotion, he appeared before her at that ' +
      'spot. Bhudevi and Niladevi followed, and both conceded that Sridevi\u2019s devotion ' +
      'was the greatest of the three. Vishnu then DESIRED AND STAYED. The Tamil word ' +
      'THANGAL means to stay, to abide, to tarry — and from that staying the place takes its ' +
      'name, Thiruthangal, the sacred abiding. The Perumal is NINDRA NARAYANA, Narayana who ' +
      'stands: standing because, having come, he did not go. His consort here is ARUNAKAMALA ' +
      'MAHADEVI, also worshipped as Sengamalathayar, the goddess of the red lotus, and the ' +
      'shrine is sought by devotees praying for a presence that will not withdraw — for ' +
      'constancy in marriage, in family and in fortune. The second sthala purana layer is ' +
      'the rock itself. The temple preserves TWO ROCK-CUT CAVES bearing three inscriptions, ' +
      'two of them from the eighth century, making this one of the older continuously ' +
      'worshipped sites in the Pandya country. The temple in its present form is attributed ' +
      'to DEVENDRA VALLABHA, a Pandya king. An inscription of 1032 CE names the Lord ' +
      'Paramaswamy, he who willingly chose the hillock for his abode — the epigraphic record ' +
      'thus repeating the sthala purana\u2019s own claim that the staying was voluntary. A ' +
      'lake called Vallabha Pereri once lay beside the hill. Under Maravarman Kulasekara ' +
      'Pandyan I (1308-1323 CE) a shrine was raised for Singhaperumal, the Narasimha form. ' +
      'In 1220 CE the two sons of Tiruvenkata Natha, an officer of the Pandyan administration, ' +
      'built the western precinct and endowed a mutt for the continuous recitation of the ' +
      'Ramayana, the Mahabharata and the Puranas. The third sthala purana layer concerns the ' +
      'sharing of the hill. The KARUNELLINATHAR temple, a celebrated Shiva shrine, stands on ' +
      'the other side of the same rock, and a pilgrim may pass from one to the other across ' +
      'the hillside. Thiruthangal is therefore one of the clearest instances in the Tamil ' +
      'country of the two great devotional streams occupying a single sacred elevation, ' +
      'neither displacing the other. The fourth sthala purana layer is the acharya ' +
      'connection. The temple observes ten-day festivals for PILLAI LOKACHARYAR and for ' +
      'KURATHALVAR alongside the Vaikasi Vasanthothsavam, an unusually strong acharya ' +
      'commemoration for a shrine of this size, and one that marks Thiruthangal as a centre ' +
      'of post-Ramanuja Sri Vaishnava teaching. Sung by Nammalvar in the Thiruvaimozhi.',

    sthala_purana_ta:
      'விருதுநகர் மாவட்டத்தில், இன்று சிவகாசியின் ஒரு பகுதியாக விளங்கும் திருத்தங்கலில் ' +
      'அமைந்துள்ள ஸ்ரீ நின்ற நாராயண பெருமாள் கோயில், பதினெட்டு பாண்டிய நாட்டு ' +
      'திவ்யதேசங்களில் ஒன்று; நூற்றெட்டு திவ்யதேசங்களிலேயே கட்டிடக்கலை அடிப்படையில் ' +
      'மிகவும் தனித்துவமானது. ஏறத்தாழ நூறு அடி உயர கருங்கல் மலைமீது எழுந்துள்ள ' +
      'இக்கோயிலுக்கு ராஜகோபுரமே இல்லை; பாறையிலேயே வெட்டப்பட்ட படிக்கட்டுகளின் வழியாகவே ' +
      'பக்தர்கள் ஏறிச் செல்கின்றனர். மூல ஸ்தல புராணம் மூன்று தேவியரின் பக்திப் போட்டி. ' +
      'ஸ்ரீதேவி, பூதேவி, நீளாதேவி ஆகிய மூவரும் தம்முள் யார் விஷ்ணுவை மிகுதியாக ' +
      'நேசிக்கிறார் என்று அன்பான வாதம் புரிந்தனர். ஸ்ரீதேவி பூமிக்கு இறங்கி, நெல் ' +
      'வயல்களுக்கு நடுவே தனிமையான ஓரிடத்தைத் தேர்ந்து, அதைச் செம்மைப்படுத்தி தவம் ' +
      'இருந்தார். அவரது வழிபாட்டின் ஆற்றல் மிகுதியால், அப்பகுதி முனிவர்கள் தம் ' +
      'நியமங்களை ஒதுக்கிவைத்து அவரையே வழிபடத் தொடங்கினர். தனித்திருப்பது முறையன்று ' +
      'என உணர்ந்த தேவி, ஒரு தீர்த்தத்தை உருவாக்கி விஷ்ணுவை நேரடியாக வேண்டினார். ' +
      'அவரது பக்திக்கு மகிழ்ந்த இறைவன் அவ்விடத்திலேயே காட்சி தந்தார். பூதேவியும் ' +
      'நீளாதேவியும் பின்தொடர்ந்து, ஸ்ரீதேவியின் பக்தியே மேலானது என ஏற்றுக்கொண்டனர். ' +
      'அப்போது விஷ்ணு அகல மனமின்றி அங்கேயே தங்கினார். தமிழில் தங்கல் என்பது தங்குதல், ' +
      'நிலைத்தல்; அத்தங்குதலிலிருந்தே திருத்தங்கல் என்னும் பெயர் பிறந்தது. ஆகவே இங்குள்ள ' +
      'பெருமாள் நின்ற நாராயணன் — வந்தபின் அகலாததால் நின்ற கோலம் கொண்டவர். தாயார் ' +
      'அருணகமல மகாதேவி, செங்கமலத் தாயார் என்றும் வழிபடப்படுகிறார். அகலாத அருளை — ' +
      'மணவாழ்வில், குடும்பத்தில், செல்வத்தில் நிலைத்த நிலையை — வேண்டுவோர் இத்தலம் ' +
      'நாடுகின்றனர். இரண்டாம் அடுக்கு புராணம் பாறையே. இரு குடைவரைக் குகைகளில் மூன்று ' +
      'கல்வெட்டுகள் உள்ளன; அவற்றுள் இரண்டு எட்டாம் நூற்றாண்டைச் சேர்ந்தவை. ஆகவே ' +
      'பாண்டிய நாட்டில் தொடர்ந்து வழிபாடு நடைபெறும் பழமையான தலங்களில் இதுவும் ஒன்று. ' +
      'இன்றைய வடிவம் தேவேந்திர வல்லப பாண்டியனுக்கு உரியதாகக் கருதப்படுகிறது. ' +
      'கி.பி. 1032 கல்வெட்டு இறைவனை பரமஸ்வாமி என்றும், மலையைத் தானே விரும்பித் ' +
      'தேர்ந்தவர் என்றும் குறிக்கிறது — ஸ்தல புராணம் கூறும் தன்னிச்சையான தங்குதலை ' +
      'கல்வெட்டும் ஏற்கிறது. மலையருகே வல்லப பேரேரி என்னும் ஏரி இருந்தது. மாறவர்மன் ' +
      'குலசேகர பாண்டியன் முதலாமவன் காலத்தில் (கி.பி. 1308-1323) சிங்கப்பெருமாள் ' +
      'சன்னிதி எழுப்பப்பட்டது. கி.பி. 1220-இல் பாண்டிய அரசு அலுவலர் திருவேங்கடநாதரின் ' +
      'இரு மைந்தர்கள் மேற்குப் பிரகாரத்தைக் கட்டி, ராமாயணம், மகாபாரதம், புராணங்கள் ' +
      'ஓதுவதற்கென ஒரு மடத்தை நிறுவினர். மூன்றாம் அடுக்கு மலையைப் பகிர்தல். அதே ' +
      'பாறையின் மறுபுறத்தில் கருநெல்லிநாதர் சிவன் கோயில் அமைந்துள்ளது; ஒரு தலத்திலிருந்து ' +
      'மற்றொன்றுக்கு மலைவழியே செல்லலாம். இரு பெரும் பக்தி மரபுகளும் ஒரே புனித ' +
      'மலையில், ஒன்றை ஒன்று அகற்றாமல் வாழும் தெளிவான எடுத்துக்காட்டுகளில் இது ஒன்று. ' +
      'நான்காம் அடுக்கு ஆசாரிய தொடர்பு. வைகாசி வசந்தோற்சவத்துடன் பிள்ளை லோகாசாரியார், ' +
      'கூரத்தாழ்வான் ஆகியோருக்குப் பத்து நாள் விழாக்கள் நடைபெறுவது இத்தகைய ' +
      'அளவிலான கோயிலுக்கு அரிதானது; ராமானுஜருக்குப் பிந்தைய ஸ்ரீ வைஷ்ணவ கல்வி ' +
      'மையமாக இத்தலம் விளங்கியதைக் காட்டுகிறது. நம்மாழ்வார் திருவாய்மொழியில் ' +
      'மங்களாசாசனம் செய்துள்ளார்.',

    distinctive_features: [
      'One of the eighteen Pandya Nadu Divya Desams — restored to this corpus in Session 2A.3 after being entirely absent',
      'Built on a granite hill about 100 ft tall, entered by steps cut into the rock',
      'The only Divya Desam with NO rajagopuram',
      'Two rock-cut caves with three inscriptions, two from the 8th century',
      'Thangal means to stay — the Lord stood because he would not leave',
      'The contest of Sridevi, Bhudevi and Niladevi over devotion',
      'Shares its hill with the Karunellinathar Shiva temple',
      'Ten-day festivals for Pillai Lokacharyar and Kurathalvar'
    ],
    distinctive_features_ta: [
      'பாண்டிய நாட்டு பதினெட்டு திவ்யதேசங்களில் ஒன்று',
      'நூறு அடி உயர கருங்கல் மலைமீது; பாறையில் வெட்டிய படிக்கட்டு',
      'ராஜகோபுரம் இல்லாத ஒரே திவ்யதேசம்',
      'இரு குடைவரைக் குகைகள்; மூன்று கல்வெட்டுகள்',
      'தங்கல் என்றால் தங்குதல் — அகலாததால் நின்ற கோலம்',
      'ஸ்ரீதேவி, பூதேவி, நீளாதேவி பக்திப் போட்டி',
      'கருநெல்லிநாதர் சிவன் கோயிலுடன் ஒரே மலையைப் பகிர்தல்',
      'பிள்ளை லோகாசாரியார், கூரத்தாழ்வான் பத்து நாள் விழாக்கள்'
    ],
    unique_note: 'The absence of a rajagopuram is not a loss but a consequence: the hill is ' +
      'the gopuram. Where other Divya Desams announce themselves with a tower raised by human ' +
      'hands, Thiruthangal is entered by climbing the rock the Lord chose for himself, which ' +
      'the 1032 CE inscription records in exactly those terms.',
    unique_note_ta: 'ராஜகோபுரம் இல்லாதது குறையன்று, விளைவு: மலையே கோபுரம். மனிதக் ' +
      'கையால் எழுப்பிய கோபுரத்தால் பிற தலங்கள் அறிவிக்கப்படும்போது, இறைவன் தானே ' +
      'தேர்ந்த பாறையில் ஏறியே திருத்தங்கல் அடையப்படுகிறது.',
    alwar_note: 'Sung by Nammalvar in the Thiruvaimozhi. The shrine lies close to ' +
      'Srivilliputhur, the town of Periyalvar and Andal, and belongs to the same ' +
      'Virudhunagar devotional belt.',
    alwar_note_ta: 'நம்மாழ்வார் திருவாய்மொழியில் பாடியுள்ளார். பெரியாழ்வார், ஆண்டாள் ' +
      'அவதரித்த ஸ்ரீவில்லிபுத்தூருக்கு அண்மையில், அதே விருதுநகர் பக்திப் பகுதியில் உள்ளது.',
    alwars: {
      nammalvar: { pasurams: 11, reference: 'Thiruvaimozhi — dedicated decad on Thiruthangal' }
    },
    acharya_associations: 'Ten-day annual festivals for Pillai Lokacharyar and for ' +
      'Kurathalvar mark this as a centre of post-Ramanuja Sri Vaishnava teaching. A mutt ' +
      'endowed in 1220 CE maintained continuous recitation of the epics and Puranas.',
    acharya_associations_ta: 'பிள்ளை லோகாசாரியார், கூரத்தாழ்வான் ஆண்டு விழாக்கள்; ' +
      'கி.பி. 1220-இல் நிறுவப்பட்ட மடம்.',
    epigraphy_note: 'Three inscriptions in two rock-cut caves, two dating to the 8th century. ' +
      'Attributed in its present form to Devendra Vallabha Pandya; 1032 CE record names the ' +
      'Lord Paramaswamy. Additions under Maravarman Kulasekara Pandyan I (1308-23 CE), the ' +
      'Vijayanagara rulers and the Nayaks. Administered by the TN HR&CE Department.',
    epigraphy_note_ta: 'இரு குடைவரைக் குகைகளில் மூன்று கல்வெட்டுகள்; இரண்டு எட்டாம் ' +
      'நூற்றாண்டு. தேவேந்திர வல்லப பாண்டியன்; கி.பி. 1032 பரமஸ்வாமி கல்வெட்டு. ' +
      'மாறவர்மன் குலசேகர பாண்டியன், விஜயநகர, நாயக்கர் கால விரிவுகள்.',
    festivals: 'Vaikasi Vasanthothsavam is the principal festival. Ten-day observances for ' +
      'Pillai Lokacharyar and for Kurathalvar are held annually, together with Vaikunta ' +
      'Ekadasi and the Purattasi Saturdays.',
    festivals_ta: 'வைகாசி வசந்தோற்சவம் முதன்மையானது. பிள்ளை லோகாசாரியார், ' +
      'கூரத்தாழ்வான் பத்து நாள் விழாக்கள்; வைகுண்ட ஏகாதசி, புரட்டாசி சனிக்கிழமைகள்.',
    external_sources: [
      { name: 'Wikipedia: Ninra Narayana Perumal temple',
        url: 'https://en.wikipedia.org/wiki/Ninra_Narayana_Perumal_temple' },
      { name: 'Divyadesam.com — Thiruthangal',
        url: 'https://www.divyadesam.com/hindu/temples/virudhunagar/thankaal-temple.shtml' }
    ],
    sii_references: [], audio_sources: [], mangalasasanam_pasurams: []
  };

  /* ================================================================ */
  /* NEW TEMPLE 3 — #45 VANAMAMALAI, Thothatrinatha, Nanguneri       */
  /* ================================================================ */
  var VANAMA_BASE = {
    sno: 45,
    canonical_position: 45,
    region: 'Pandya Nadu',
    temple_name: 'Sri Vanamamalai Thothatrinatha Perumal Temple, Thiruvaramangai (Nanguneri)',
    temple_name_ta: 'ஸ்ரீ வானமாமலை தோத்தாத்ரிநாத பெருமாள் கோயில், திருவரமங்கை (நாங்குநேரி)',
    temple_name_short: 'Sri Thothatrinatha Perumal (Vanamamalai, Nanguneri)',
    temple_name_short_ta: 'ஸ்ரீ தோத்தாத்ரிநாத பெருமாள் (வானமாமலை, நாங்குநேரி)',
    town: 'Nanguneri (Thiruvaramangai)',
    town_ta: 'நாங்குநேரி (திருவரமங்கை)',
    district: 'Tirunelveli',
    state: 'Tamil Nadu',
    lat: 8.491917,
    lng: 77.657361,
    posture: 'Veetrirundha (seated in royal darbar with Sridevi and Bhudevi, beneath Adisesha)',
    posture_class: 'Veetrirundha',
    is_celestial: false,
    is_abhimana: false,
    categories: [],
    coords_verified: false,
    coords_source: 'Published: Wikipedia, Vanamamalai Perumal Temple. Candidate for an owner GPS pass.',
    wiki_url: 'https://en.wikipedia.org/wiki/Vanamamalai_Perumal_temple',
    sthala_purana_tagline: 'One of the eight self-manifested shrines of Vishnu — where the well yields oil instead of water, and where Nammalvar first performed saranagati.',
    sthala_purana_tagline_ta: 'விஷ்ணுவின் எட்டு சுயம்வ்யக்த ஷேத்திரங்களில் ஒன்று — நீருக்குப் பதிலாக எண்ணெய் சுரக்கும் கிணறு; நம்மாழ்வார் முதல் சரணாகதி செய்த திருத்தலம்.'
  };

  var VANAMA_ENR = {
    canonical_region: 'Pandya Nadu',
    canonical_cluster: 'Tirunelveli (Nanguneri), south of the Thamirabarani belt',
    canonical_position_traditional: 71,
    canonical_note: 'Session 2A.3 (owner ruling): ADDED. Thiruvaramangai Vanamamalai appears ' +
      'in every canonical Pandya Nadu 18 enumeration and was entirely absent from this corpus. ' +
      'Verified against Wikipedia (Vanamamalai Perumal Temple, 8.491917 N 77.657361 E), the ' +
      'Vanamamalai Mutt official site, Dinamalar and divyadesam.com. ' +
      'IMPORTANT: this shrine is NOT one of the Nava Tirupathi. It lies about 40 km south of ' +
      'the Thamirabarani cluster and carries no navagraha assignment. An earlier project note ' +
      'wrongly described it as completing that set; it is placed here at #45, away from the ' +
      '#71-79 block, so that adjacency implies nothing.',
    alternate_names: ['Vanamamalai', 'Thiruvaramangai', 'Thirucheer Varamangai', 'Nanguneri',
                      'Thothadri Kshetram', 'Thothatrinathan', 'Deivanayaka Perumal'],
    alternate_names_ta: ['வானமாமலை', 'திருவரமங்கை', 'திருச்சீர்வரமங்கை', 'நாங்குநேரி',
                         'தோத்தாத்ரிநாதன்', 'தெய்வநாயக பெருமாள்'],
    perumal_name: 'Sri Thothatrinathan (Vanamamalai Perumal); the utsavar is Sri Deivanayaka Perumal',
    perumal_name_ta: 'ஸ்ரீ தோத்தாத்ரிநாதன் (வானமாமலைப் பெருமாள்); உற்சவர் ஸ்ரீ தெய்வநாயகப் பெருமாள்',
    perumal_name_sa: 'Thothadrinatha',
    thayar_name: 'Sri Varamangai Nachiyar (Srivaramangai)',
    thayar_name_ta: 'ஸ்ரீ வரமங்கை நாச்சியார்',
    facing: 'East',
    facing_ta: 'கிழக்கு',
    vimana: 'Nandavarthana Vimanam',
    vimana_ta: 'நந்தவர்த்தன விமானம்',
    pushkarini: 'Setru Thamarai Pushkarini (the Mud-Lotus Tank)',
    pushkarini_ta: 'சேற்றுத் தாமரை புஷ்கரிணி',
    confidence: 'high',

    sthala_purana:
      'Sri Vanamamalai Perumal Temple at Nanguneri in Tirunelveli district — known also as ' +
      'Thiruvaramangai and Thirucheer Varamangai — is one of the eighteen Pandya Nadu Divya ' +
      'Desams and, more consequentially, one of the EIGHT SWAYAM VYAKTA KSHETRAMS: the ' +
      'shrines at which Vishnu is held to have manifested of his own will, not established by ' +
      'human consecration. The other seven are Srirangam, Tirumala, Srimushnam, Naimisaranya, ' +
      'Pushkar, Badrinath and Salagrama. The name NANGUNERI means four waters — the town ' +
      'stands where four lakes once met, of which only one survives. The primary sthala ' +
      'purana concerns the birth of Lakshmi. She is held to have been born at this place as ' +
      'SRIVARAMANGAI, and from her the older name Thiruvaramangai derives. Sage Narada ' +
      'received the account of Thothadri and Sargunamangai from Shiva himself, and the shrine ' +
      'is named in the Brahmanda, Skanda and Narasimha Puranas. The second sthala purana ' +
      'layer belongs to Adishesha and Garuda. Adishesha performed penance here seeking the ' +
      'grace of having Vishnu recline upon him, and Vishnu, pleased, rested on the serpent. ' +
      'Garuda likewise performed penance and was granted the guardianship of the gates of ' +
      'Vaikuntha. The moolavar accordingly presides beneath Adisesha\u2019s hood with Sridevi, ' +
      'Bhudevi and Niladevi, in a composition that deliberately recalls Vaikuntha itself; ' +
      'Urvasi and Thilothama attend with whisks, and Bhrigu, Markandeya, Surya and Chandra ' +
      'stand within the sanctum. Tradition holds that ELEVEN of the images here are ' +
      'swayambhu, self-manifested — where most temples possess a single such image, this ' +
      'shrine possesses eleven. The third sthala purana layer is the most remarkable single ' +
      'feature of any Divya Desam: the OIL WELL. Within the temple stands a well some ' +
      'twenty-five feet deep which yields not water but oil. The Lord receives thirumanjanam ' +
      'daily with gingelly and sandalwood oil, and the oil used is returned to the well. It ' +
      'is held to carry medicinal power, particularly against diseases of the skin, and a ' +
      'devotee who wishes to receive some must bring an equal measure of fresh gingelly oil ' +
      'in exchange. The legend behind it concerns a childless king named Kaarya who ' +
      'worshipped here and was directed by Vishnu to dig; blood oozed from the earth where he ' +
      'struck, and to staunch it he was instructed to perform oil abhishekam daily. Blessed ' +
      'with children, he built the temple. The theological reading offered by the tradition ' +
      'is precise: the soul dwells in a body that will age and fail, and the Lord who here ' +
      'gives both darshan and medicine is Adi Maruthuvan, the first physician, tending the ' +
      'vessel so that the soul within may be kept clean. The fourth sthala purana layer is ' +
      'Nammalvar\u2019s. Vanamamalai is the FIRST of the five Divya Desams at which Nammalvar ' +
      'performed SARANAGATI, the formal act of total surrender that is the doctrinal centre ' +
      'of Sri Vaishnavism — a standing that gives this shrine an importance in the ' +
      'sampradaya out of all proportion to its size. The temple covers five acres, is entered ' +
      'beneath a tiered gateway tower, keeps the Chittirai chariot festival as its principal ' +
      'utsavam, and is administered not by the state board but by the VANAMAMALAI MUTT, ' +
      'making it one of the very few Divya Desams under independent monastic administration.',

    sthala_purana_ta:
      'திருநெல்வேலி மாவட்டம் நாங்குநேரியில் அமைந்துள்ள ஸ்ரீ வானமாமலைப் பெருமாள் ' +
      'கோயில் — திருவரமங்கை, திருச்சீர்வரமங்கை என்றும் அழைக்கப்படுவது — பதினெட்டு ' +
      'பாண்டிய நாட்டு திவ்யதேசங்களில் ஒன்று; அதைவிட முக்கியமாக, எட்டு சுயம்வ்யக்த ' +
      'ஷேத்திரங்களில் ஒன்று. மனிதக் கையால் பிரதிஷ்டை செய்யப்படாமல், இறைவன் தானே ' +
      'விரும்பி வெளிப்பட்ட தலங்கள் அவை. மற்ற ஏழு: ஸ்ரீரங்கம், திருமலை, ஸ்ரீமுஷ்ணம், ' +
      'நைமிசாரண்யம், புஷ்கரம், பத்ரிநாத், சாளக்ராமம். நாங்குநேரி என்பது நான்கு ' +
      'நீர்நிலைகள் கூடிய இடம்; இன்று ஒன்றே எஞ்சியுள்ளது. மூல ஸ்தல புராணம் லக்ஷ்மியின் ' +
      'அவதாரம். ஸ்ரீவரமங்கையாக அவர் இங்கு அவதரித்ததாகவும், அதனாலேயே திருவரமங்கை ' +
      'என்னும் பழம்பெயர் வந்ததாகவும் கூறப்படுகிறது. தோத்தாத்ரி, சர்குணமங்கை பற்றிய ' +
      'விவரங்களை நாரதர் சிவனிடமிருந்து பெற்றார்; பிரம்மாண்ட, ஸ்கந்த, நரசிம்ம ' +
      'புராணங்களில் இத்தலம் குறிக்கப்படுகிறது. இரண்டாம் அடுக்கு ஆதிசேஷனும் கருடனும். ' +
      'விஷ்ணு தன்மீது பள்ளிகொள்ள வேண்டி ஆதிசேஷன் இங்குத் தவம் இயற்ற, மகிழ்ந்த இறைவன் ' +
      'அவ்வாறே அருளினார். கருடனும் தவம் இயற்றி வைகுண்ட வாயில் காக்கும் பேறு ' +
      'பெற்றார். ஆகவே மூலவர் ஆதிசேஷனின் நிழலில் ஸ்ரீதேவி, பூதேவி, நீளாதேவியுடன் ' +
      'எழுந்தருளியுள்ளார் — வைகுண்டத்தையே நினைவூட்டும் அமைப்பு. ஊர்வசியும் ' +
      'திலோத்தமையும் சாமரம் வீச, பிருகு, மார்க்கண்டேயர், சூரியன், சந்திரன் ' +
      'கருவறையில் நிற்கின்றனர். இங்குள்ள பதினொரு திருமேனிகளும் சுயம்பு என்பது மரபு — ' +
      'பெரும்பாலான கோயில்களில் ஒன்றே இருக்க, இங்கு பதினொன்று. மூன்றாம் அடுக்கு ' +
      'எந்தத் திவ்யதேசத்திலும் இல்லாத தனிச்சிறப்பு: எண்ணெய்க் கிணறு. கோயிலுக்குள் ' +
      'ஏறத்தாழ இருபத்தைந்து அடி ஆழக் கிணறு ஒன்று உள்ளது; அதில் நீரல்ல, எண்ணெயே ' +
      'சுரக்கிறது. நல்லெண்ணெய், சந்தன எண்ணெயால் நாள்தோறும் திருமஞ்சனம் நடைபெற, ' +
      'பயன்படுத்திய எண்ணெய் மீண்டும் கிணற்றில் விடப்படுகிறது. அவ்வெண்ணெய்க்கு ' +
      'மருத்துவ ஆற்றல் உண்டு என்பர்; குறிப்பாக தோல் நோய்களுக்கு. பெற விரும்புவோர் ' +
      'அதே அளவு புதிய நல்லெண்ணெயைக் கொடுத்தே பெற வேண்டும். இதன் வரலாறு: கார்யா ' +
      'என்னும் மகப்பேறற்ற மன்னன் இங்கு வழிபட, இறைவன் தோண்டுமாறு அருளினார்; ' +
      'தோண்டிய இடத்தில் இரத்தம் பெருகியது; அதை நிறுத்த நாள்தோறும் எண்ணெய் ' +
      'அபிஷேகம் செய்யுமாறு பணிக்கப்பட்டான். மக்கட்பேறு பெற்று கோயிலை எழுப்பினான். ' +
      'மரபு தரும் இறையியல் விளக்கம் தெளிவானது: ஆன்மா தங்கியிருக்கும் உடல் ' +
      'மூப்படையும், அழியும்; இங்கு தரிசனத்தையும் மருந்தையும் ஒருங்கே அருளும் இறைவன் ' +
      'ஆதி மருத்துவன் — உள்ளிருக்கும் ஆன்மா தூய்மையாக இருக்க உடலைப் பேணுபவர். ' +
      'நான்காம் அடுக்கு நம்மாழ்வாருடையது. நம்மாழ்வார் சரணாகதி செய்த ஐந்து ' +
      'திவ்யதேசங்களில் வானமாமலையே முதன்மையானது; ஸ்ரீ வைஷ்ணவத்தின் கோட்பாட்டு ' +
      'மையமான சரணாகதி இங்கே முதலில் நிகழ்ந்தது என்பது இத்தலத்திற்கு அதன் ' +
      'அளவுக்கு மீறிய முக்கியத்துவத்தை அளிக்கிறது. ஐந்து ஏக்கர் பரப்பு; சித்திரை ' +
      'தேரோட்டமே முதன்மை உற்சவம். அறநிலையத் துறையால் அன்றி வானமாமலை மடத்தால் ' +
      'நிர்வகிக்கப்படும் மிகச் சில திவ்யதேசங்களில் இதுவும் ஒன்று.',

    distinctive_features: [
      'One of the eighteen Pandya Nadu Divya Desams — restored to this corpus in Session 2A.3 after being entirely absent',
      'One of the EIGHT SWAYAM VYAKTA KSHETRAMS — self-manifested, not consecrated by human hands',
      'The oil well: a 25-foot well within the temple that yields gingelly oil, not water',
      'Eleven images held to be swayambhu, where most temples have one',
      'The first of the five Divya Desams at which Nammalvar performed saranagati',
      'Administered by the Vanamamalai (Thothadri) Mutt, not the state board',
      'Nanguneri means four waters — the town of four lakes',
      'NOT one of the Nava Tirupathi, despite lying in the same district'
    ],
    distinctive_features_ta: [
      'பாண்டிய நாட்டு பதினெட்டு திவ்யதேசங்களில் ஒன்று',
      'எட்டு சுயம்வ்யக்த ஷேத்திரங்களில் ஒன்று',
      'நீருக்குப் பதிலாக நல்லெண்ணெய் சுரக்கும் இருபத்தைந்து அடி கிணறு',
      'பதினொரு சுயம்பு திருமேனிகள்',
      'நம்மாழ்வார் சரணாகதி செய்த ஐந்து தலங்களில் முதன்மையானது',
      'வானமாமலை (தோத்தாத்ரி) மடத்தின் நிர்வாகம்',
      'நாங்குநேரி — நான்கு நீர்நிலைகள் கூடிய ஊர்',
      'நவ திருப்பதிகளில் ஒன்று அல்ல'
    ],
    unique_note: 'Of the eight Swayam Vyakta Kshetrams, Badrinath lies under snow for six ' +
      'months of the year. Vanamamalai is available to the devotee throughout the year, and ' +
      'the tradition makes a point of it: the self-manifested Lord who never closes.',
    unique_note_ta: 'எட்டு சுயம்வ்யக்த ஷேத்திரங்களில் பத்ரிநாத் ஆண்டில் ஆறு மாதம் ' +
      'பனியில் மூடியிருக்கும். வானமாமலை ஆண்டு முழுவதும் தரிசனத்திற்கு உரியது என்பதை ' +
      'மரபு வலியுறுத்துகிறது.',
    alwar_note: 'Sung by Nammalvar, and the first of the five shrines at which he performed ' +
      'saranagati. His pasurams here name the town Sirivaramangala Nagar.',
    alwar_note_ta: 'நம்மாழ்வார் பாடியது; அவர் சரணாகதி செய்த ஐந்து தலங்களில் ' +
      'முதன்மையானது. அவரது பாசுரங்கள் இவ்வூரை சிரீவரமங்கல நகர் என்கின்றன.',
    alwars: {
      nammalvar: { pasurams: 11,
        reference: 'Thiruvaimozhi — dedicated decad on Sirivaramangala Nagar; the first of his five saranagati shrines' }
    },
    acharya_associations: 'Seat of the Vanamamalai (Thothadri) Mutt, one of the principal ' +
      'Sri Vaishnava monastic lineages, whose jeeyars have administered the temple for ' +
      'centuries. The utsava image of Srivaramangai Thayar is held to have been brought from ' +
      'Tirumala by Ponnadikkal Jeeyar.',
    acharya_associations_ta: 'வானமாமலை (தோத்தாத்ரி) மடத்தின் இருப்பிடம்; ஸ்ரீவரமங்கை ' +
      'தாயாரின் உற்சவ திருமேனி பொன்னடிக்கால் ஜீயரால் திருமலையிலிருந்து ' +
      'கொணரப்பட்டதாகக் கூறப்படுகிறது.',
    epigraphy_note: 'Pandya foundation with later Vijayanagara and Madurai Nayak ' +
      'contributions. Administered by the Vanamamalai Mutt rather than the TN HR&CE Department.',
    epigraphy_note_ta: 'பாண்டியர் அடித்தளம்; விஜயநகர, மதுரை நாயக்கர் பங்களிப்புகள். ' +
      'வானமாமலை மடத்தின் நிர்வாகம்.',
    festivals: 'The Chittirai chariot festival is the most prominent of a dozen annual ' +
      'observances. Chithirai Brahmotsavam, Vaikunta Ekadasi, Panguni Uthiram and the ' +
      'Garudotsavam are all kept, and six daily rituals are performed.',
    festivals_ta: 'சித்திரை தேரோட்டமே மிக முதன்மையானது. சித்திரை பிரம்மோற்சவம், ' +
      'வைகுண்ட ஏகாதசி, பங்குனி உத்திரம், கருடோற்சவம்; நாள்தோறும் ஆறு கால பூஜை.',
    external_sources: [
      { name: 'Wikipedia: Vanamamalai Perumal Temple',
        url: 'https://en.wikipedia.org/wiki/Vanamamalai_Perumal_temple' },
      { name: 'Sri Vanamamalai Mutt — official site', url: 'https://vanamamalai.in/' },
      { name: 'Dinamalar — Thothadri Nathan Temple',
        url: 'https://temple.dinamalar.com/en/new_en.php?id=172' }
    ],
    sii_references: [], audio_sources: [], mangalasasanam_pasurams: []
  };

  /* ================================================================ */
  /* APPLY                                                            */
  /* ================================================================ */
  function run(tries) {
    tries = tries || 0;
    var ARRS = arrays();
    if (!ARRS.length || !window.DD_ENRICHMENT) {
      if (tries > 100) { console.warn('[dd_v2_2a3] corpus never arrived.'); return; }
      return setTimeout(function () { run(tries + 1); }, 60);
    }
    /* Must run after Session 2A.2, which owns #42 / #80 / #83. */
    if (!window.DD_SESSION_2A2_LOADED && tries < 100) {
      return setTimeout(function () { run(tries + 1); }, 60);
    }

    var ENR = window.DD_ENRICHMENT;
    var primary = arrays()[0];
    var log = [];

    /* ---------------------------------------------------------------- */
    /* 1. THANJAI MERGE  #43 + #44 + #45 -> #43                        */
    /* ---------------------------------------------------------------- */
    var has43 = primary.some(function (t) { return t.sno === 43; });
    var has44 = primary.some(function (t) { return t.sno === 44; });
    var has45 = primary.some(function (t) { return t.sno === 45; });
    if (has43 && has44 && has45) {
      park('manikundram', 44);
      park('thanjaiyali', 45);
      var e43 = ENR[43] || {}, e44 = ENR[44] || {}, e45 = ENR[45] || {};
      var b44 = primary.filter(function (t) { return t.sno === 44; })[0];
      var b45 = primary.filter(function (t) { return t.sno === 45; })[0];

      var thanjaiEN =
        'THANJAI MAMANI KOIL IS COUNTED AS ONE DIVYA DESAM. This is the only case among the ' +
        '108 in which THREE separate temples, standing in three different premises about ' +
        '200 metres apart on the banks of the Vennaru near Thanjavur, are worshipped ' +
        'together as a single Divya Desam. Pillai Perumal Iyengar\u2019s 108 Tirupathi ' +
        'Anthathi states the position exactly: from the point of view of the count there is ' +
        'only one, but it has three sannidhis. The three are Thanjai Mamanikoil ' +
        '(Neelamega Perumal), Manikundram (Manikundra Perumal) and Thanjaiyali Nagar ' +
        '(Veera Nrisimha Perumal).\n\n' +
        'THE SHARED PURANA. In the Krita Yuga three asuras — THANJAGAN, THANDAGAN and ' +
        'GAJAMUGAN — performed severe penance to Shiva, who appeared before them. They asked ' +
        'for immortality. Shiva replied that Sriman Narayana alone was the preserver and ' +
        'that only he could grant such a boon. Emboldened nonetheless, the three began to ' +
        'afflict the worlds, harrying devas and rishis alike, until a great famine spread ' +
        'and the only place with food and water remaining was the hermitage of the sage ' +
        'PARASARA. The asuras came there too and assaulted him. The sage called upon the ' +
        'Lord, whose Sudarshana Chakra destroyed the demon host — but these three remained. ' +
        'Vishnu appeared before Thanjagan and beheaded him; at the last the asura repented ' +
        'and was forgiven, and the place took his name, Thanjagan\u2019s town, Thanjavur. ' +
        'Gajamugan took the form of an elephant and fought; the Lord assumed the man-lion ' +
        'form and slew him, and where this happened is worshipped as Thanjai Yali Koil. The ' +
        'third, Thandagan, fled in terror to Patala; the Lord took the Varaha form, plunged ' +
        'after him and destroyed him. All three were granted liberation at the last — which ' +
        'is the point of the narrative: the Lord destroys the asura and saves the soul in ' +
        'the same act.\n\n' +
        '\u2014 THANJAI MAMANIKOIL (Neelamega Perumal) \u2014\n' + (e43.sthala_purana || '') + '\n\n' +
        '\u2014 MANIKUNDRAM (Manikundra Perumal) \u2014\n' + (e44.sthala_purana || '') + '\n\n' +
        '\u2014 THANJAIYALI NAGAR (Veera Nrisimha Perumal) \u2014\n' + (e45.sthala_purana || '') + '\n\n' +
        'TAKEN TOGETHER: the three shrines present three responses of the same Lord to the ' +
        'same crisis — the cloud-dark Neelamega who confronts directly, the man-lion who ' +
        'meets force with greater force, and the jewel-hill Manikundra who abides. ' +
        'Tirumangai Alwar sang of Thanjai Mamanikoil and of Manikundram; Bhoothath Alwar ' +
        'refers to Thanjai; Nammalvar refers to Manikundram. Pilgrims walk the three in ' +
        'sequence within a single visit, which is how the tradition intends them to be seen.';

      var thanjaiTA =
        'தஞ்சை மாமணிக் கோயில் ஒரே திவ்யதேசமாகக் கணக்கிடப்படுகிறது. தஞ்சாவூர் அருகே ' +
        'வெண்ணாற்றங்கரையில், ஏறத்தாழ இருநூறு மீட்டர் இடைவெளியில், மூன்று வெவ்வேறு ' +
        'வளாகங்களில் அமைந்த மூன்று கோயில்கள் ஒன்றாக ஒரே திவ்யதேசமாக வழிபடப்படும் ' +
        'ஒரே நிகழ்வு நூற்றெட்டில் இதுவே. பிள்ளைப் பெருமாள் ஐயங்காரின் நூற்றெட்டு ' +
        'திருப்பதி அந்தாதி இதைத் தெளிவாகக் கூறுகிறது: கணக்கின்படி ஒன்றே, ஆனால் ' +
        'மூன்று சன்னிதிகள். அம்மூன்று: தஞ்சை மாமணிக் கோயில் (நீலமேகப் பெருமாள்), ' +
        'மணிக்குன்றம் (மணிக்குன்றப் பெருமாள்), தஞ்சையாளி நகர் (வீர நரசிம்மப் பெருமாள்).\n\n' +
        'பொதுவான புராணம். கிருத யுகத்தில் தஞ்சகன், தண்டகன், கஜமுகன் என்னும் மூன்று ' +
        'அசுரர்கள் சிவனை நோக்கிக் கடுந்தவம் இயற்றினர். தோன்றிய சிவனிடம் அழியாமை ' +
        'வேண்டினர். காப்பவன் ஸ்ரீமன் நாராயணனே என்றும், அவ்வரத்தை அவரே அளிக்க ' +
        'முடியும் என்றும் சிவன் கூறினார். இருப்பினும் துணிவு கொண்ட மூவரும் உலகங்களை ' +
        'வருத்தத் தொடங்கினர்; தேவர்களையும் ரிஷிகளையும் துன்புறுத்தினர்; பெரும் பஞ்சம் ' +
        'பரவியது. உணவும் நீரும் எஞ்சியிருந்த ஒரே இடம் பராசர முனிவரின் ஆசிரமமே. ' +
        'அங்கும் சென்ற அசுரர்கள் முனிவரைத் தாக்கினர். முனிவர் இறைவனை வேண்ட, ' +
        'சுதர்சன சக்கரம் அசுரப் படையை அழித்தது; ஆனால் இம்மூவர் எஞ்சினர். இறைவன் ' +
        'தஞ்சகன் முன் தோன்றி அவனைக் கொன்றார்; இறுதியில் வருந்திய அசுரன் மன்னிக்கப் ' +
        'பட்டான்; அவ்விடம் தஞ்சகனூர், தஞ்சாவூர் ஆயிற்று. கஜமுகன் யானை வடிவெடுத்துப் ' +
        'போரிட, இறைவன் நரசிம்ம வடிவில் அவனை அழித்தார்; அவ்விடம் தஞ்சையாளி கோயில் ' +
        'என வழிபடப்படுகிறது. அஞ்சிய தண்டகன் பாதாள லோகம் சென்றான்; இறைவன் வராக ' +
        'வடிவெடுத்து அங்குச் சென்று அவனை அழித்தார். இறுதியில் மூவருக்கும் முக்தி ' +
        'அருளப்பட்டது — இதுவே கதையின் கருத்து: அசுரனை அழிக்கும் அதே செயலில் ' +
        'ஆன்மாவைக் காப்பாற்றுகிறார் இறைவன்.\n\n' +
        '\u2014 தஞ்சை மாமணிக் கோயில் (நீலமேகப் பெருமாள்) \u2014\n' + (e43.sthala_purana_ta || '') + '\n\n' +
        '\u2014 மணிக்குன்றம் (மணிக்குன்றப் பெருமாள்) \u2014\n' + (e44.sthala_purana_ta || '') + '\n\n' +
        '\u2014 தஞ்சையாளி நகர் (வீர நரசிம்மப் பெருமாள்) \u2014\n' + (e45.sthala_purana_ta || '') + '\n\n' +
        'மூன்றும் சேர்ந்து: ஒரே நெருக்கடிக்கு ஒரே இறைவன் அளித்த மூன்று பதில்கள் — ' +
        'நேரடியாக எதிர்கொள்ளும் நீலமேகன், வலிமையை மேலான வலிமையால் சந்திக்கும் ' +
        'நரசிம்மர், நிலைத்திருக்கும் மணிக்குன்றன். திருமங்கை ஆழ்வார் தஞ்சை ' +
        'மாமணிக்கோயிலையும் மணிக்குன்றத்தையும் பாடினார்; பூதத்தாழ்வார் தஞ்சையையும், ' +
        'நம்மாழ்வார் மணிக்குன்றத்தையும் குறிக்கின்றனர். மூன்றையும் ஒரே வருகையில் ' +
        'வரிசையாகத் தரிசிப்பதே மரபு.';

      var mThanjai = Object.assign({}, e43);
      mThanjai.sthala_purana = thanjaiEN;
      mThanjai.sthala_purana_ta = thanjaiTA;
      mThanjai.canonical_cluster = 'Thanjavur (Vennaru) — three shrines counted as ONE Divya Desam';
      mThanjai.canonical_note =
        'Session 2A.3 (owner ruling): MERGED. The corpus previously carried Thanjai Mamani ' +
        'Koil as three Divya Desams at sno 43, 44 and 45, inflating the count by two. Every ' +
        'canonical enumeration counts the three shrines as a single Divya Desam; Pillai ' +
        'Perumal Iyengar\u2019s 108 Tirupathi Anthathi is explicit that there is one desam ' +
        'with three sannidhis. Merged here at sno 43 with all three puranas preserved in ' +
        'full. The records formerly at 44 and 45 are parked at ' +
        'window.DD_RETIRED_RECORDS.manikundram and .thanjaiyali and can be restored with ' +
        'DDRemap.restoreRetired(key, sno). Owner GPS from Session 1D.1 confirmed the three ' +
        'stand about 170-400 m apart, consistent with three distinct premises rather than ' +
        'one compound.';
      mThanjai.perumal_name = 'Sri Neelamega Perumal (Thanjai Mamanikoil), Sri Manikundra ' +
        'Perumal (Manikundram) and Sri Veera Nrisimha Perumal (Thanjaiyali Nagar) — three ' +
        'sannidhis, one Divya Desam';
      mThanjai.perumal_name_ta = 'ஸ்ரீ நீலமேகப் பெருமாள் (தஞ்சை மாமணிக் கோயில்), ' +
        'ஸ்ரீ மணிக்குன்றப் பெருமாள் (மணிக்குன்றம்), ஸ்ரீ வீர நரசிம்மப் பெருமாள் ' +
        '(தஞ்சையாளி நகர்) — மூன்று சன்னிதிகள், ஒரே திவ்யதேசம்';
      mThanjai.thayar_name = 'Sri Sengamalathayar (Thanjai Mamanikoil), Sri Ambujavalli ' +
        'Thayar (Manikundram), Sri Vijayavalli / Thanjai Nayaki (Thanjaiyali Nagar)';
      mThanjai.thayar_name_ta = 'ஸ்ரீ செங்கமலத் தாயார், ஸ்ரீ அம்புஜவல்லித் தாயார், ' +
        'ஸ்ரீ விஜயவல்லி (தஞ்சை நாயகி)';
      mThanjai.vimana = 'Nila Vimana (Mamanikoil), Mani Vimana (Manikundram), Vidhata Vimana (Thanjaiyali)';
      mThanjai.vimana_ta = 'நீல விமானம், மணி விமானம், விதாத விமானம்';
      mThanjai.pushkarini = 'Surya Pushkarini (Mamanikoil), Ratna Pushkarini (Manikundram), Nrisimha Theertham (Thanjaiyali)';
      mThanjai.pushkarini_ta = 'சூர்ய புஷ்கரிணி, ரத்ன புஷ்கரிணி, நரசிம்ம தீர்த்தம்';
      mThanjai.alternate_names = ['Thanjai Mamani Koil', 'Thanjai Maamanikkoyil', 'Manikundram',
        'Thanjaiyali Nagar', 'Thanjai Yali Koil', 'Neelamega Perumal', 'Manikundra Perumal',
        'Veera Nrisimha Perumal'];
      mThanjai.alternate_names_ta = ['தஞ்சை மாமணிக் கோயில்', 'மணிக்குன்றம்',
        'தஞ்சையாளி நகர்', 'நீலமேகப் பெருமாள்', 'மணிக்குன்றப் பெருமாள்',
        'வீர நரசிம்மப் பெருமாள்'];
      var tp = 0;
      [e43, e44, e45].forEach(function (e) {
        if (e.alwars && e.alwars.thirumangai) tp += (e.alwars.thirumangai.pasurams || 0);
      });
      mThanjai.alwars = {
        thirumangai: { pasurams: tp,
          reference: 'Periya Thirumozhi — combined across the three sannidhis of Thanjai ' +
                     'Mamani Koil; Tirumangai sang of Mamanikoil and Manikundram' }
      };
      var tdf = ['Three temples ~200 m apart counted as ONE Divya Desam — the only such case among the 108'];
      [e43, e44, e45].forEach(function (e) {
        (e.distinctive_features || []).forEach(function (f) { if (tdf.indexOf(f) < 0) tdf.push(f); });
      });
      mThanjai.distinctive_features = tdf;
      var tdfta = ['மூன்று கோயில்கள் ஒரே திவ்யதேசமாகக் கணக்கிடப்படுகின்றன — நூற்றெட்டில் இதுவே ஒரே நிகழ்வு'];
      [e43, e44, e45].forEach(function (e) {
        (e.distinctive_features_ta || []).forEach(function (f) { if (tdfta.indexOf(f) < 0) tdfta.push(f); });
      });
      mThanjai.distinctive_features_ta = tdfta;
      mThanjai.companion_temple =
        'Manikundram (Manikundra Perumal) at 10.816870 N, 79.137372 E and Thanjaiyali Nagar ' +
        '(Veera Nrisimha Perumal) at 10.815573 N, 79.138999 E. Both are sannidhis of this ' +
        'single Divya Desam, about 170 m and 400 m from the Mamanikoil respectively.';
      ENR[43] = mThanjai;
      delete ENR[44]; delete ENR[45];

      writeRecord(43, {
        temple_name: 'Sri Thanjai Mamani Koil — Neelamega, Manikundra and Veera Nrisimha Perumal, Thanjavur',
        temple_name_ta: 'ஸ்ரீ தஞ்சை மாமணிக் கோயில் — நீலமேக, மணிக்குன்ற, வீர நரசிம்மப் பெருமாள், தஞ்சாவூர்',
        temple_name_short: 'Sri Thanjai Mamani Koil (three sannidhis, Thanjavur)',
        temple_name_short_ta: 'ஸ்ரீ தஞ்சை மாமணிக் கோயில் (மூன்று சன்னிதிகள், தஞ்சாவூர்)',
        town: 'Thanjavur (Vennaru)',
        town_ta: 'தஞ்சாவூர் (வெண்ணாறு)',
        posture: 'Standing (Nindra) at Mamanikoil and Manikundram; Ugra Narasimha at Thanjaiyali Nagar',
        posture_class: 'Nindra',
        companion_temple: mThanjai.companion_temple,
        sthala_purana_tagline: 'Three temples, one Divya Desam — the only such case among the 108: where Vishnu met the three asuras Thanjagan, Gajamugan and Thandagan, and gave each liberation at the last.',
        sthala_purana_tagline_ta: 'மூன்று கோயில்கள், ஒரே திவ்யதேசம் — நூற்றெட்டில் இதுவே ஒரே நிகழ்வு: தஞ்சகன், கஜமுகன், தண்டகன் ஆகிய மூன்று அசுரரையும் இறைவன் எதிர்கொண்டு இறுதியில் முக்தி அருளிய திருத்தலம்.'
      }, mThanjai);

      release(44); release(45);
      log.push('Thanjai merged 43+44+45 -> 43');
    }

    /* ---------------------------------------------------------------- */
    /* 2. IRATTAI MERGE  #78 + #79 -> #78                               */
    /* ---------------------------------------------------------------- */
    var has78 = primary.some(function (t) { return t.sno === 78; });
    var has79 = primary.some(function (t) { return t.sno === 79; });
    if (has78 && has79) {
      park('aravindalochanar', 79);
      var e78 = ENR[78] || {}, e79 = ENR[79] || {};

      var irattaiEN =
        'IRATTAI TIRUPATHI IS COUNTED AS ONE DIVYA DESAM. Irattai means twin. Two shrines ' +
        'stand about 160 metres apart at Tholaivillimangalam on the Thamirabarani — Sri ' +
        'Devapiran to the north and Sri Aravindalochanar to the south — and every canonical ' +
        'enumeration of the eighteen Pandya Nadu Divya Desams gives them as a single entry, ' +
        '"Thiruttholai Villimangalam (Twin Thirupathis)".\n\n' +
        'WITHIN THE NAVA TIRUPATHI, HOWEVER, THEY COUNT AS TWO. The nine Tirupathis of the ' +
        'Thamirabarani each carry a navagraha assignment, and these twins hold two of them: ' +
        'DEVAPIRAN IS RAHU and ARAVINDALOCHANAR IS KETU, the two lunar nodes, which are ' +
        'themselves a pair and are never worshipped apart. This is precisely why the circuit ' +
        'numbers nine shrines while Pandya Nadu holds eighteen Divya Desams — the twins are ' +
        'two stops and one desam. A pilgrim on the Garuda Sevai walks to both.\n\n' +
        '\u2014 DEVAPIRAN (north shrine, Rahu) \u2014\n' + (e78.sthala_purana || '') + '\n\n' +
        '\u2014 ARAVINDALOCHANAR (south shrine, Ketu) \u2014\n' + (e79.sthala_purana || '') + '\n\n' +
        'TAKEN TOGETHER: the twins are the theological centre of the Nava Tirupathi\u2019s ' +
        'planetary scheme. Rahu and Ketu are the shadow-grahas, the ascending and descending ' +
        'nodes, and the tradition places them not at opposite ends of the circuit but within ' +
        'sight of one another — the severed head and the severed body of a single being, ' +
        'reunited in worship if not in form. Devotees seeking relief from Rahu-Ketu ' +
        'afflictions take darshan at both within a single visit; taking one without the ' +
        'other is held to leave the remedy incomplete.';

      var irattaiTA =
        'இரட்டைத் திருப்பதி ஒரே திவ்யதேசமாகக் கணக்கிடப்படுகிறது. இரட்டை என்றால் ' +
        'இணை. தாமிரபரணிக் கரையில் தொலைவில்லிமங்கலத்தில் ஏறத்தாழ நூற்றி அறுபது ' +
        'மீட்டர் இடைவெளியில் இரு கோயில்கள் — வடக்கே ஸ்ரீ தேவப்பிரான், தெற்கே ' +
        'ஸ்ரீ அரவிந்தலோசனர். பாண்டிய நாட்டு பதினெட்டு திவ்யதேசப் பட்டியல்கள் ' +
        'அனைத்தும் இவற்றை "திருத்தொலைவில்லிமங்கலம் (இரட்டைத் திருப்பதிகள்)" என ' +
        'ஒரே பதிவாகவே தருகின்றன.\n\n' +
        'ஆனால் நவ திருப்பதிகளுக்குள் இவை இரண்டாகக் கணக்கிடப்படுகின்றன. ' +
        'தாமிரபரணியின் ஒன்பது திருப்பதிகளும் தனித்தனி நவகிரக அமைப்பைக் ' +
        'கொண்டவை; இவ்விரட்டையர் அவற்றுள் இரண்டைத் தாங்குகின்றனர்: தேவப்பிரான் ' +
        'ராகு, அரவிந்தலோசனர் கேது — இரு சந்திர பாதங்கள், தாமே ஒரு ஜோடி, ' +
        'ஒருபோதும் தனித்து வழிபடப்படாதவை. ஒன்பது தலங்கள் இருந்தும் பாண்டிய ' +
        'நாட்டில் பதினெட்டு திவ்யதேசங்களே உள்ளன என்பதற்கான காரணம் இதுவே — ' +
        'இரட்டையர் இரு நிறுத்தங்கள், ஒரே தேசம். கருட சேவையில் பக்தர் ' +
        'இரண்டிற்கும் செல்கிறார்.\n\n' +
        '\u2014 தேவப்பிரான் (வடக்குக் கோயில், ராகு) \u2014\n' + (e78.sthala_purana_ta || '') + '\n\n' +
        '\u2014 அரவிந்தலோசனர் (தெற்குக் கோயில், கேது) \u2014\n' + (e79.sthala_purana_ta || '') + '\n\n' +
        'இரண்டும் சேர்ந்து: நவ திருப்பதிகளின் கிரக அமைப்பின் இறையியல் மையம் ' +
        'இவ்விரட்டையரே. ராகுவும் கேதுவும் நிழல் கிரகங்கள்; மரபு அவற்றை வட்டத்தின் ' +
        'எதிர் முனைகளில் அல்லாமல் ஒன்றையொன்று காணும் தொலைவில் வைத்துள்ளது — ' +
        'ஒரே உயிரின் துண்டிக்கப்பட்ட தலையும் உடலும், வடிவில் அல்லாவிட்டாலும் ' +
        'வழிபாட்டில் இணைந்தவை. ராகு-கேது தோஷ நிவர்த்தி நாடுவோர் ஒரே வருகையில் ' +
        'இரண்டிலும் தரிசனம் செய்கின்றனர்; ஒன்றை மட்டும் தரிசிப்பது பரிகாரத்தை ' +
        'முழுமையடையாமல் விடும் என்பர்.';

      var mIrattai = Object.assign({}, e78);
      mIrattai.sthala_purana = irattaiEN;
      mIrattai.sthala_purana_ta = irattaiTA;
      mIrattai.canonical_cluster = 'Thamirabarani (Nava Tirupathi) — twin shrines counted as ONE Divya Desam';
      mIrattai.canonical_note =
        'Session 2A.3 (owner ruling): MERGED. The corpus previously carried the twin shrines ' +
        'as two Divya Desams at sno 78 and 79, inflating the count by one. Every Pandya Nadu ' +
        'enumeration gives Thiruttholaivillimangalam as a single entry. Merged here at sno 78 ' +
        'with both puranas preserved in full and BOTH navagraha assignments retained — ' +
        'Devapiran is Rahu, Aravindalochanar is Ketu. CANON.nava_tirupathi is amended from ' +
        'nine members to eight in dd_v2_canon2.js, since the circuit visits nine shrines but ' +
        'the 108 counts eight desams among them. The record formerly at 79 is parked at ' +
        'window.DD_RETIRED_RECORDS.aravindalochanar.';
      mIrattai.perumal_name = 'Sri Devapiran Perumal (north shrine, Rahu) and Sri ' +
        'Aravindalochanar Perumal (south shrine, Ketu) — twin sannidhis, one Divya Desam';
      mIrattai.perumal_name_ta = 'ஸ்ரீ தேவப்பிரான் பெருமாள் (வடக்கு, ராகு), ஸ்ரீ ' +
        'அரவிந்தலோசனர் பெருமாள் (தெற்கு, கேது) — இரட்டைச் சன்னிதிகள், ஒரே திவ்யதேசம்';
      mIrattai.thayar_name = 'Sri Karundadangkanni Nachiyar (Devapiran) and Sri ' +
        'Karuvazhankanni Nachiyar (Aravindalochanar)';
      mIrattai.thayar_name_ta = 'ஸ்ரீ கருந்தடங்கண்ணி நாச்சியார், ஸ்ரீ கருவழங்கண்ணி நாச்சியார்';
      mIrattai.vimana = 'Manohara Vimana (Devapiran) and Vaman Vimana (Aravindalochanar)';
      mIrattai.vimana_ta = 'மனோகர விமானம், வாமன விமானம்';
      mIrattai.pushkarini = 'Varuna Theertham (shared between the twin shrines)';
      mIrattai.pushkarini_ta = 'வருண தீர்த்தம் (இரு கோயில்களும் பகிர்வது)';
      mIrattai.planet = 'Rahu (Devapiran) and Ketu (Aravindalochanar) — two of the nine Nava Tirupathi grahas';
      mIrattai.planet_ta = 'ராகு (தேவப்பிரான்), கேது (அரவிந்தலோசனர்)';
      mIrattai.nava_tirupathi_position = '8 and 9 of the nine shrines (one Divya Desam)';
      mIrattai.alternate_names = ['Irattai Tirupathi', 'Thirutholaivillimangalam',
        'Tholaivillimangalam', 'Twin Thirupathis', 'Devapiran', 'Aravindalochanar'];
      mIrattai.alternate_names_ta = ['இரட்டைத் திருப்பதி', 'திருத்தொலைவில்லிமங்கலம்',
        'தேவப்பிரான்', 'அரவிந்தலோசனர்'];
      var ip = 0;
      [e78, e79].forEach(function (e) {
        if (e.alwars && e.alwars.nammalvar) ip += (e.alwars.nammalvar.pasurams || 0);
      });
      mIrattai.alwars = Object.assign({}, e78.alwars || {}, e79.alwars || {});
      if (ip) {
        mIrattai.alwars.nammalvar = { pasurams: ip,
          reference: 'Thiruvaimozhi — combined across the twin shrines of Irattai Tirupathi' };
      }
      var idf = ['Twin shrines ~160 m apart counted as ONE Divya Desam, but TWO of the nine Nava Tirupathi',
                 'Devapiran is Rahu and Aravindalochanar is Ketu — the two lunar nodes, never worshipped apart'];
      [e78, e79].forEach(function (e) {
        (e.distinctive_features || []).forEach(function (f) { if (idf.indexOf(f) < 0) idf.push(f); });
      });
      mIrattai.distinctive_features = idf;
      var idfta = ['இரட்டைக் கோயில்கள் ஒரே திவ்யதேசம், ஆனால் நவ திருப்பதிகளில் இரண்டு',
                   'தேவப்பிரான் ராகு, அரவிந்தலோசனர் கேது — தனித்து வழிபடப்படாத இணை'];
      [e78, e79].forEach(function (e) {
        (e.distinctive_features_ta || []).forEach(function (f) { if (idfta.indexOf(f) < 0) idfta.push(f); });
      });
      mIrattai.distinctive_features_ta = idfta;
      mIrattai.companion_temple =
        'Sri Aravindalochanar Perumal (south shrine, Ketu) at 8.6236 N, 77.9336 E, about ' +
        '160 m from the Devapiran shrine. Both are sannidhis of this single Divya Desam.';
      ENR[78] = mIrattai;
      delete ENR[79];

      var cats78 = ['nava_tirupathi', 'rahu_sthala', 'ketu_sthala', 'twin_temple',
                    'irattai_tirupathi_north', 'irattai_tirupathi_south', 'lotus_pooja'];
      writeRecord(78, {
        temple_name: 'Sri Devapiran and Sri Aravindalochanar Perumal Temples, Irattai Tirupathi (Tholaivillimangalam)',
        temple_name_ta: 'ஸ்ரீ தேவப்பிரான், ஸ்ரீ அரவிந்தலோசனர் பெருமாள் கோயில்கள், இரட்டைத் திருப்பதி (தொலைவில்லிமங்கலம்)',
        temple_name_short: 'Sri Devapiran & Sri Aravindalochanar (Irattai Tirupathi)',
        temple_name_short_ta: 'ஸ்ரீ தேவப்பிரான், ஸ்ரீ அரவிந்தலோசனர் (இரட்டைத் திருப்பதி)',
        town: 'Tholaivillimangalam (Irattai Tirupathi — twin shrines)',
        town_ta: 'தொலைவில்லிமங்கலம் (இரட்டைத் திருப்பதி)',
        planet: mIrattai.planet,
        planet_ta: mIrattai.planet_ta,
        categories: cats78,
        companion_temple: mIrattai.companion_temple,
        sthala_purana_tagline: 'Twin shrines 160 m apart — one Divya Desam, but two of the nine Nava Tirupathi: Rahu to the north, Ketu to the south, the lunar nodes worshipped within sight of one another.',
        sthala_purana_tagline_ta: 'நூற்றி அறுபது மீட்டர் இடைவெளியில் இரட்டைக் கோயில்கள் — ஒரே திவ்யதேசம், ஆனால் நவ திருப்பதிகளில் இரண்டு: வடக்கே ராகு, தெற்கே கேது.'
      }, mIrattai);

      release(79);
      log.push('Irattai merged 78+79 -> 78');
    }

    /* ---------------------------------------------------------------- */
    /* 3-5. ADD THE THREE PANDYA NADU DIVYA DESAMS                      */
    /* ---------------------------------------------------------------- */
    [[42, KOODAL_BASE, KOODAL_ENR, 'Thirukkoodal'],
     [44, THANGAL_BASE, THANGAL_ENR, 'Thiruthangal'],
     [45, VANAMA_BASE, VANAMA_ENR, 'Vanamamalai']].forEach(function (row) {
      var sno = row[0];
      if (arrays()[0].some(function (t) { return t.sno === sno; })) {
        console.warn('[dd_v2_2a3] slot #' + sno + ' occupied — ' + row[3] + ' not added.');
        return;
      }
      addRecord(sno, row[1], row[2]);
      log.push(row[3] + ' added at #' + sno);
    });

    /* ---------------------------------------------------------------- */
    /* 6. RECLASSIFY #100 SIMHACHALAM                                   */
    /* ---------------------------------------------------------------- */
    var e100 = ENR[100];
    if (e100) {
      e100.canonical_note =
        'Session 2A.3 (owner ruling): RECLASSIFIED as an Abhimana Kshetram, not one of the ' +
        '108 Divya Desams. Andhra Pradesh holds exactly two Divya Desams — Tirumala (#98) ' +
        'and Ahobilam (#82). Simhachalam is deeply revered and richly sung of, but it is not ' +
        'among the 108. It now joins #109 Mannargudi under the Abhimana Kshetram ' +
        'classification and is excluded from the terrestrial count. The record is otherwise ' +
        'unchanged and remains fully browsable. ' + (e100.canonical_note || '');
      e100.abhimana_notice =
        'Not a Divya Desam — an Abhimana Kshetram. Reclassified in Session 2A.3. The unique ' +
        'combined Varaha-Narasimha form and the sandalwood-covered moolavar make Simhachalam ' +
        'one of the most distinctive Vishnu shrines in the Andhra country, but the canonical ' +
        '108 admit only Tirumala and Ahobilam from that region.';
      e100.abhimana_notice_ta =
        'திவ்யதேசம் அன்று — அபிமான ஷேத்திரம். ஆந்திரத்தில் திருமலை, அகோபிலம் ' +
        'ஆகிய இரண்டே திவ்யதேசங்கள். சந்தனக் காப்புடன் வராக-நரசிம்ம வடிவம் ' +
        'கொண்ட சிம்மாசலம் மிகச் சிறப்பான தலமாயினும் நூற்றெட்டில் சேராது.';
    }
    /* Pass the enrichment through so abhimana_notice reaches the fused
       view that v1 Section B reads, not just DD_ENRICHMENT. */
    writeRecord(100, {
      is_abhimana: true,
      region: 'Abhimana Kshetram (Special)'
    }, e100 || null);
    log.push('#100 Simhachalam reclassified as Abhimana Kshetram');

    /* ---------------------------------------------------------------- */
    /* FINALISE                                                         */
    /* ---------------------------------------------------------------- */
    sortBySno();
    if (window.DDCanon && typeof window.DDCanon.reconcileCategories === 'function') {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
    }

    var P = arrays()[0];
    var terr = P.filter(function (t) { return !t.is_celestial && !t.is_abhimana; }).length;
    var cel  = P.filter(function (t) { return t.is_celestial; }).length;
    var abh  = P.filter(function (t) { return t.is_abhimana; }).length;
    var occupied = {}; P.forEach(function (t) { occupied[t.sno] = 1; });
    var gaps = [];
    for (var i = 1; i <= 108; i++) if (!occupied[i]) gaps.push(i);

    console.log('[dd_v2_2a3] Session 2A.3: ' + log.join(' | '));
    console.log('[dd_v2_2a3] terrestrial ' + terr + ' + celestial ' + cel + ' = ' +
                (terr + cel) + ' Divya Desams' +
                (terr === 106 && cel === 2 ? '  \u2705 canonical 108' : '  \u26A0 expected 106 + 2'));
    console.log('[dd_v2_2a3] abhimana kshetrams: ' + abh +
                ' | vacant slot(s): ' + (gaps.length ? '#' + gaps.join(', #') : 'none'));

    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () { try { window.buildSidebarList(); } catch (e) {} }, 130);
    }
    if (window.DDMarkers && typeof window.DDMarkers.build === 'function') {
      setTimeout(function () { try { window.DDMarkers.build(); } catch (e) {} }, 430);
    }
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { try { window.DDFilter.apply(); } catch (e) {} }, 510);
    }

    window.DD_SESSION_2A3 = { log: log, terrestrial: terr, celestial: cel,
                              abhimana: abh, vacant: gaps };
  }

  window.DD2A3 = {
    run: run,
    report: function () {
      var A = arrays(); if (!A.length) return null;
      var T = A[0];
      var terr = T.filter(function (t) { return !t.is_celestial && !t.is_abhimana; }).length;
      var cel  = T.filter(function (t) { return t.is_celestial; }).length;
      var abh  = T.filter(function (t) { return t.is_abhimana; });
      console.log('%c=== DD corpus after Session 2A.3 ===', 'font-weight:700;color:#1E5AA0');
      console.log('terrestrial Divya Desams : ' + terr + (terr === 106 ? '  \u2705' : ''));
      console.log('celestial Divya Desams   : ' + cel + (cel === 2 ? '  \u2705' : ''));
      console.log('TOTAL                    : ' + (terr + cel) +
                  ((terr + cel) === 108 ? '  \u2705 canonical 108' : ''));
      console.log('abhimana kshetrams       : ' + abh.length + ' \u2014 ' +
                  abh.map(function (t) { return '#' + t.sno; }).join(', '));
      var occupied = {}; T.forEach(function (t) { occupied[t.sno] = 1; });
      var gaps = []; for (var i = 1; i <= 108; i++) if (!occupied[i]) gaps.push(i);
      console.log('vacant slot(s)           : ' + (gaps.length ? '#' + gaps.join(', #') : 'none'));
      console.log('retired records parked   : ' +
                  Object.keys(window.DD_RETIRED_RECORDS || {}).join(', '));
      return { terrestrial: terr, celestial: cel, abhimana: abh.length, vacant: gaps };
    }
  };

  run(0);
})();
