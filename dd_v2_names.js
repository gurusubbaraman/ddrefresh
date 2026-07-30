/* ==================================================================
   DD v2 — NAMES, ADDITIONS, MERGES        (Session 2A.2 — Owner)
   ------------------------------------------------------------------
   Three owner-ruled operations:

     1. #70 renamed to Thiruthetriyambalam / Sri Palli Konda Perumal,
        with the deity, consort, vimana and tank corrected.
     2. #83 filled with KAZHEESIRAMA VINNAGARAM (Thadalan Kovil,
        Sirkazhi) — a genuine Divya Desam absent from the corpus.
     3. #42 Thiruvali merged into #80, since Thiruvali-Thirunagari is
        counted as ONE Divya Desam. #42 is released.

   ------------------------------------------------------------------
   1. WHY #70 WAS MISNAMED
   ------------------------------------------------------------------
   The corpus carried Thiruthetriyambalam TWICE:
       #68  "Sri Loganatha Perumal (Thetriyambalam)"
       #70  "Sri Palli Konda Perumal (Palliyodam)"
   These are the same temple. Wikipedia is explicit: "Thiruthetriyambalam
   or Palli Konda Perumal Temple is located in Tirunangur ... worshipped
   as Palli Konda Perumal", at 11.17639 N, 79.77722 E. The deity is
   also called Senganmal Ranganathar and Loganathan.

   That is why the owner's two GPS readings for #68 and #70 came back
   0.15 m apart -- they were two captures of ONE temple. Session 1D.1
   held them back as a suspected transcription error. They were not an
   error; the corpus was. "Palliyodam" is not a Divya Desam name at all.

   Session 2A.1 retired the #68 duplicate and moved Thiruvellakulam
   into that slot. This session corrects the surviving record's name.

   ------------------------------------------------------------------
   2. KAZHEESIRAMA VINNAGARAM — THE MISSING DIVYA DESAM
   ------------------------------------------------------------------
   Thirukazhicheerama Vinnagaram, locally Thadalan Kovil, stands in
   Sirkazhi in Mayiladuthurai district and is one of the 40 Chola Nadu
   Divya Desams. It was simply absent from this corpus. Deity
   Trivikrama (Thadalan), consort Loganayagi, Pushkala Vartha Vimanam,
   Chakra Theertham. Sung by Thirumangai Alwar.

   Owner GPS: 11.240825488093385, 79.73165425409483.

   ------------------------------------------------------------------
   3. THIRUVALI-THIRUNAGARI IS ONE DIVYA DESAM
   ------------------------------------------------------------------
   Every canonical Chola Nadu list enumerates "Thiruvali Thirunagari"
   as a single entry. The corpus split it into #42 and #80, inflating
   the count by one. The two temples are ~3.8 km apart and are visited
   together; the pasurams treat them as one kshetram.

   This session merges them at #80 as
       "Sri Vayalali Manavalan / Sri Lakshmi Narasimha
        (Thiruvali-Thirunagari)"
   with a combined bilingual purana carrying BOTH narratives in full --
   the Lakshmi Narasimha Yoga iconography of Thiruvali and the
   Ashtakshara initiation of Thirumangai Alwar at Thirunagari -- and an
   explicit statement that they are counted as one Divya Desam.

   Thirumangai's pasuram counts are combined: 18 (Thiruvali) +
   24 (Thirunagari) = 42, the largest concentration in Periya
   Thirumozhi for any single kshetram.

   #42 is released. The retired record is parked in full at
       window.DD_RETIRED_RECORDS.thiruvali
   and can be restored with DDRemap.restoreRetired('thiruvali', 42).

   ------------------------------------------------------------------
   NET EFFECT ON THE COUNT
   ------------------------------------------------------------------
       before this session   107 terrestrial records, #83 vacant
       +1  Kazheesirama at #83                        108
       -1  #42 merged into #80                        107, #42 vacant

   See the console report for the remaining gap to the canonical 106
   terrestrial Divya Desams -- three more are still missing and three
   further merges are still owed. Those need owner rulings and are NOT
   applied here.

   LOAD ORDER — after remap, before filters and markers:
     dd_v2_canon.js
     dd_v2_coords.js
     dd_v2_remap.js
     dd_v2_names.js         <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2A2_LOADED) return;
  window.DD_SESSION_2A2_LOADED = true;

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

  /* ================================================================ */
  /* 1. #70 — NAME AND DEITY CORRECTION                               */
  /* ================================================================ */
  var FIX70_BASE = {
    temple_name: 'Sri Palli Konda Perumal Temple (Thiruthetriyambalam), Thirunangur',
    temple_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BAA\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD (\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BAE\u0BCD\u0BAA\u0BB2\u0BAE\u0BCD)',
    temple_name_short: 'Sri Palli Konda Perumal (Thiruthetriyambalam)',
    temple_name_short_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BAA\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD (\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BAE\u0BCD\u0BAA\u0BB2\u0BAE\u0BCD)'
  };
  var FIX70_ENR = {
    perumal_name: 'Sri Palli Konda Perumal (also Senganmal Ranganathar and Loganathan) — Vishnu reclining on Adisesha in Anandha Sayanam',
    perumal_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BAA\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD (\u0B9A\u0BC6\u0B99\u0BCD\u0B95\u0BA3\u0BCD\u0BAE\u0BBE\u0BB2\u0BCD \u0BB0\u0B99\u0BCD\u0B95\u0BA8\u0BBE\u0BA4\u0BB0\u0BCD, \u0BB2\u0BCB\u0B95\u0BA8\u0BBE\u0BA4\u0BA9\u0BCD) — \u0B86\u0BA4\u0BBF\u0B9A\u0BC7\u0BB7\u0BA9\u0BBF\u0BB2\u0BCD \u0B85\u0BA9\u0BA8\u0BCD\u0BA4 \u0B9A\u0BAF\u0BA9\u0BAE\u0BCD',
    thayar_name: 'Sri Sengamalavalli Thayar (the Red-Lotus-Vine Goddess)',
    thayar_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0B9A\u0BC6\u0B99\u0BCD\u0B95\u0BAE\u0BB2\u0BB5\u0BB2\u0BCD\u0BB2\u0BBF \u0BA4\u0BBE\u0BAF\u0BBE\u0BB0\u0BCD',
    vimana: 'Veda Vimanam',
    vimana_ta: '\u0BB5\u0BC7\u0BA4 \u0BB5\u0BBF\u0BAE\u0BBE\u0BA9\u0BAE\u0BCD',
    pushkarini: 'Surya Theertham',
    pushkarini_ta: '\u0B9A\u0BC2\u0BB0\u0BCD\u0BAF \u0BA4\u0BC0\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD',
    alternate_names: ['Thiruthetriyambalam', 'Thetriyambalam', 'Palli Konda Perumal Koil',
                      'Senganmal Ranganathar', 'Seshapuram', 'Loganathan'],
    alternate_names_ta: ['\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BAE\u0BCD\u0BAA\u0BB2\u0BAE\u0BCD',
                         '\u0BA4\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BAE\u0BCD\u0BAA\u0BB2\u0BAE\u0BCD',
                         '\u0B9A\u0BC6\u0B99\u0BCD\u0B95\u0BA3\u0BCD\u0BAE\u0BBE\u0BB2\u0BCD \u0BB0\u0B99\u0BCD\u0B95\u0BA8\u0BBE\u0BA4\u0BB0\u0BCD',
                         '\u0B9A\u0BC7\u0BB7\u0BAA\u0BC1\u0BB0\u0BAE\u0BCD'],
    canonical_note: 'Session 2A.2 (owner ruling): the record formerly read "Sri Palli Konda ' +
      'Perumal (Palliyodam)". "Palliyodam" is not a Divya Desam name. This shrine is ' +
      'THIRUTHETRIYAMBALAM, one of the eleven Thirunangur Tirupathis, whose deity is ' +
      'Palli Konda Perumal, also called Senganmal Ranganathar and Loganathan. The corpus ' +
      'previously carried the same temple twice, at sno 68 and sno 70; the duplicate at ' +
      '68 was retired in Session 2A.1 and Thiruvellakulam moved into that slot. ' +
      'Verified against Wikipedia (Thiruthetriyambalam, 11.17639 N 79.77722 E) and ' +
      'templenet\u0027s Tirunaangur Divya Desam enumeration.'
  };

  /* ================================================================ */
  /* 2. #83 — KAZHEESIRAMA VINNAGARAM (new Divya Desam record)        */
  /* ================================================================ */
  var NEW83_BASE = {
    sno: 83,
    canonical_position: 83,
    region: 'Chola Nadu',
    temple_name: 'Sri Trivikrama (Thadalan) Perumal Temple, Kazheesirama Vinnagaram',
    temple_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE (\u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD) \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD, \u0B95\u0BB4\u0BBF\u0B9A\u0BC0\u0BB0\u0BBE\u0BAE \u0BB5\u0BBF\u0BA3\u0BCD\u0BA3\u0B95\u0BB0\u0BAE\u0BCD',
    temple_name_short: 'Sri Thadalan Perumal (Kazheesirama Vinnagaram)',
    temple_name_short_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD (\u0B95\u0BB4\u0BBF\u0B9A\u0BC0\u0BB0\u0BBE\u0BAE \u0BB5\u0BBF\u0BA3\u0BCD\u0BA3\u0B95\u0BB0\u0BAE\u0BCD)',
    town: 'Sirkazhi (Thadalan Kovil)',
    town_ta: '\u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF (\u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD)',
    district: 'Mayiladuthurai',
    state: 'Tamil Nadu',
    lat: 11.240825488093385,
    lng: 79.73165425409483,
    posture: 'Standing (Trivikrama form with the raised measuring leg)',
    posture_class: 'Nindra',
    is_celestial: false,
    is_abhimana: false,
    categories: [],
    coords_verified: true,
    coords_source: 'Owner GPS, Session 2A.2. Confidence: HIGH. Sirkazhi, Thadalan Kovil.',
    sthala_purana_tagline: 'The Trivikrama shrine of Sirkazhi — where Vishnu strides across ' +
      'the three worlds, and where the sage Romasa\u2019s falling hairs measure out Brahma\u2019s years.',
    sthala_purana_tagline_ta: '\u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0BAE\u0BCD — \u0BAE\u0BC2\u0BB5\u0BC1\u0BB2\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B85\u0BB3\u0BA8\u0BCD\u0BA4 \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD, \u0BB0\u0BCB\u0BAE\u0B9A \u0BAE\u0BB9\u0BB0\u0BBF\u0BB7\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD \u0BAE\u0BAF\u0BBF\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BBE\u0BB5\u0BBF\u0BA9\u0BCD \u0B86\u0BAF\u0BC1\u0BB3\u0BC8 \u0B85\u0BB3\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B87\u0B9F\u0BAE\u0BCD.'
  };

  var NEW83_ENR = {
    canonical_region: 'Chola Nadu',
    canonical_cluster: 'Sirkazhi (Kaveri Delta, adjacent to the Thirunangur eleven)',
    canonical_position_traditional: 37,
    canonical_note: 'Session 2A.2 (owner ruling): ADDED. Thirukazhicheerama Vinnagaram is one ' +
      'of the 40 Chola Nadu Divya Desams and was entirely absent from this corpus. Its ' +
      'omission is what left the terrestrial count short. Verified against Wikipedia ' +
      '(Kazheesirama Vinnagaram, 11.24056 N 79.73139 E), 108divyadesams.in Chola Nadu ' +
      'enumeration and templepurohit\u0027s Mayiladuthurai/Sirkazhi grouping. Placed at the ' +
      'slot released by the Session 2A.1 Thirunangur remap.',
    alternate_names: ['Kazheesirama Vinnagaram', 'Thirukazhicheerama Vinnagaram',
                      'Thadalan Kovil', 'Trivikrama Perumal Temple', 'Sirkazhi Vinnagaram',
                      'Patalika Vanam', 'Uttama Kshetram'],
    alternate_names_ta: ['\u0B95\u0BB4\u0BBF\u0B9A\u0BC0\u0BB0\u0BBE\u0BAE \u0BB5\u0BBF\u0BA3\u0BCD\u0BA3\u0B95\u0BB0\u0BAE\u0BCD',
                         '\u0BA4\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BB4\u0BBF\u0B9A\u0BCD\u0B9A\u0BC0\u0BB0\u0BBE\u0BAE \u0BB5\u0BBF\u0BA3\u0BCD\u0BA3\u0B95\u0BB0\u0BAE\u0BCD',
                         '\u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD',
                         '\u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE\u0BB0\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD'],
    perumal_name: 'Sri Trivikrama Narayana Perumal, locally Thadalan — Vishnu in the ' +
                  'world-measuring stride of the Vamana avatara',
    perumal_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE \u0BA8\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3 \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD, \u0BB5\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB2\u0BCD \u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD — \u0BB5\u0BBE\u0BAE\u0BA9 \u0B85\u0BB5\u0BA4\u0BBE\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B89\u0BB2\u0B95\u0BB3\u0BA8\u0BCD\u0BA4 \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0B9F\u0BBF',
    perumal_name_sa: 'Trivikrama',
    thayar_name: 'Sri Loganayagi Thayar (Mistress of the Worlds)',
    thayar_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BB2\u0BCB\u0B95\u0BA8\u0BBE\u0BAF\u0B95\u0BBF \u0BA4\u0BBE\u0BAF\u0BBE\u0BB0\u0BCD',
    facing: 'East',
    facing_ta: '\u0B95\u0BBF\u0BB4\u0B95\u0BCD\u0B95\u0BC1',
    vimana: 'Pushkala Vartha Vimanam',
    vimana_ta: '\u0BAA\u0BC1\u0BB7\u0BCD\u0B95\u0BB2 \u0BB5\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4 \u0BB5\u0BBF\u0BAE\u0BBE\u0BA9\u0BAE\u0BCD',
    pushkarini: 'Chakra Theertham (also Sanga Pushkarani)',
    pushkarini_ta: '\u0B9A\u0B95\u0BCD\u0B95\u0BB0 \u0BA4\u0BC0\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (\u0B9A\u0B99\u0BCD\u0B95 \u0BAA\u0BC1\u0BB7\u0BCD\u0B95\u0BB0\u0BA3\u0BBF)',
    confidence: 'high',

    sthala_purana:
      'Sri Trivikrama Perumal Temple at Kazheesirama Vinnagaram — known throughout the ' +
      'Kaveri delta simply as Thadalan Kovil — stands in Sirkazhi in Mayiladuthurai ' +
      'district and is one of the forty Chola Nadu Divya Desams. The Brahmanda Purana ' +
      'names this kshetram Patalika Vanam and Uttama Kshetram, marking it as a site of ' +
      'exceptional sanctity even among the delta shrines. The primary sthala purana ' +
      'centers on the sage ROMASA and the humbling of Brahma. Brahma, secure in the ' +
      'immense span of his own life, grew proud of his longevity. The sage Romasa, ' +
      'wishing to suppress that pride, undertook severe penance at this place. Vishnu, ' +
      'pleased by his devotion, appeared before him; and on the sage\u2019s further request ' +
      'appeared again in the towering TRIVIKRAMA form. The boon granted was extraordinary ' +
      'in its arithmetic: Romasa would live longer than Brahma himself, and with each ' +
      'single hair that fell from the sage\u2019s body, Brahma would lose one year of life. ' +
      'The name Romasa derives from roman, hair — the sage\u2019s very body became the ' +
      'measure of the creator\u2019s span, a quiet theological rebuke to pride in duration. ' +
      'The second sthala purana layer is the Vamana-Trivikrama narrative itself. Vishnu ' +
      'descended as the dwarf Vamana to restore Indra\u2019s authority over the heavens, ' +
      'which had passed to the generous but self-regarding asura king MAHABALI, grandson ' +
      'of Prahlada. Granted three paces of land, the dwarf expanded into the cosmic ' +
      'Trivikrama, measuring earth with one stride and heaven with the second, and ' +
      'setting the third upon Mahabali\u2019s own head. The presiding deity here preserves ' +
      'that exact moment — the raised measuring leg, the world spanned in a single ' +
      'movement. The local name THADALAN carries the sense of the one who strides or ' +
      'measures out. The third sthala purana layer concerns the shrine\u2019s setting. ' +
      'Sirkazhi is one of the great sacred towns of the Tamil country, and this Vishnu ' +
      'shrine stands within a landscape more widely known for Saiva devotion — Sirkazhi ' +
      'is the birthplace of Thirugnana Sambandar, foremost of the Naalvar. Kazheesirama ' +
      'Vinnagaram therefore sits at a rare confluence, a Sri Vaishnava Divya Desam in a ' +
      'town central to the Thevaram tradition, and the two devotional streams have ' +
      'coexisted here for well over a millennium. The fourth sthala purana layer is ' +
      'architectural. The temple is believed to have been built by the Cholas, with ' +
      'later contributions from the Medieval Cholas, the Vijayanagara kings and the ' +
      'Madurai Nayaks. All shrines stand within a single large concentric wall pierced ' +
      'by a three-tiered rajagopuram, with three principal sannidhis — Trivikrama in the ' +
      'sanctum, and Loganayagi and Andal alongside. The Chakra Tirtham lies behind the ' +
      'temple. Worship follows the Tenkalai tradition, and the Brahmotsavam falls in the ' +
      'Tamil month of Vaikasi. Sung by Thirumangai Alwar, the shrine draws devotees ' +
      'seeking release from pride, restoration of what has been usurped, and the grace ' +
      'of the Lord who measures all worlds.',

    sthala_purana_ta:
      '\u0BAE\u0BAF\u0BBF\u0BB2\u0BBE\u0B9F\u0BC1\u0BA4\u0BC1\u0BB1\u0BC8 \u0BAE\u0BBE\u0BB5\u0B9F\u0BCD\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3 \u0B95\u0BB4\u0BBF\u0B9A\u0BC0\u0BB0\u0BBE\u0BAE \u0BB5\u0BBF\u0BA3\u0BCD\u0BA3\u0B95\u0BB0\u0BAE\u0BCD — \u0B95\u0BBE\u0BB5\u0BBF\u0BB0\u0BBF \u0B9F\u0BC6\u0BB2\u0BCD\u0B9F\u0BBE \u0BAA\u0BC1\u0BB1\u0BAE\u0BC6\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD \u0B8E\u0BA9\u0BCD\u0BB1\u0BC7 \u0B85\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1 — \u0BA8\u0BBE\u0BB1\u0BCD\u0BAA\u0BA4\u0BC1 \u0B9A\u0BCB\u0BB4 \u0BA8\u0BBE\u0B9F\u0BC1 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BBE\u0B95\u0BC1\u0BAE\u0BCD. \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BBE\u0BA3\u0BCD\u0B9F \u0BAA\u0BC1\u0BB0\u0BBE\u0BA3\u0BAE\u0BCD \u0B87\u0BA8\u0BCD\u0BA4 \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0BAA\u0BBE\u0B9F\u0BB2\u0BBF\u0B95 \u0BB5\u0BA9\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B89\u0BA4\u0BCD\u0BA4\u0BAE \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0BAE\u0BC2\u0BB2 \u0BB8\u0BCD\u0BA4\u0BB2 \u0BAA\u0BC1\u0BB0\u0BBE\u0BA3\u0BAE\u0BCD \u0BB0\u0BCB\u0BAE\u0B9A \u0BAE\u0BB9\u0BB0\u0BBF\u0BB7\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BA9\u0BBF\u0BA9\u0BCD \u0B95\u0BB0\u0BCD\u0BB5\u0BAE\u0BCD \u0B85\u0B9F\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BBE\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1. \u0BA4\u0BAE\u0BA4\u0BC1 \u0BA8\u0BC0\u0BA3\u0BCD\u0B9F \u0B86\u0BAF\u0BC1\u0BB3\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BA9\u0BCD \u0B95\u0BB0\u0BCD\u0BB5\u0BAE\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBE\u0BB0\u0BCD. \u0B85\u0BA8\u0BCD\u0BA4 \u0B95\u0BB0\u0BCD\u0BB5\u0BA4\u0BCD\u0BA4\u0BC8 \u0B85\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BBF\u0BAF \u0BB0\u0BCB\u0BAE\u0B9A \u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BB0\u0BCD \u0B87\u0BB5\u0BCD\u0BB5\u0BBF\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0B9F\u0BC1\u0BAE\u0BC8\u0BAF\u0BBE\u0BA9 \u0BA4\u0BB5\u0BAE\u0BCD \u0B87\u0BAF\u0BB1\u0BCD\u0BB1\u0BBF\u0BA9\u0BBE\u0BB0\u0BCD. \u0B85\u0BB5\u0BB0\u0BA4\u0BC1 \u0BAA\u0B95\u0BCD\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0B95\u0BBF\u0BB4\u0BCD\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1 \u0B85\u0BB5\u0BB0\u0BCD \u0BAE\u0BC1\u0BA9\u0BCD \u0BA4\u0BCB\u0BA9\u0BCD\u0BB1\u0BBF\u0BA9\u0BBE\u0BB0\u0BCD; \u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BCB\u0BB3\u0BBF\u0BA9\u0BCD\u0BAA\u0B9F\u0BBF \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BBE\u0BA3\u0BCD\u0B9F\u0BAE\u0BCD \u0B85\u0BB3\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE \u0BB5\u0B9F\u0BBF\u0BB5\u0BBF\u0BB2\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF \u0B85\u0BB3\u0BBF\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD. \u0B85\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BB5\u0BB0\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B9A\u0BAF\u0BAE\u0BBE\u0BA9\u0BA4\u0BC1: \u0BB0\u0BCB\u0BAE\u0B9A\u0BB0\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BA9\u0BC8 \u0BB5\u0BBF\u0B9F \u0BA8\u0BC0\u0BA3\u0BCD\u0B9F \u0B95\u0BBE\u0BB2\u0BAE\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD\u0BB5\u0BBE\u0BB0\u0BCD, \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0B89\u0B9F\u0BB2\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0BAE\u0BAF\u0BBF\u0BB0\u0BCD \u0BB5\u0BBF\u0BB4\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1\u0BAE\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BA9\u0BCD \u0B92\u0BB0\u0BC1 \u0B86\u0BA3\u0BCD\u0B9F\u0BC1 \u0B86\u0BAF\u0BC1\u0BB3\u0BC8 \u0B87\u0BB4\u0BAA\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD. \u0BB0\u0BCB\u0BAE\u0BA9\u0BCD \u0B8E\u0BA9\u0BCD\u0BB1\u0BBE\u0BB2\u0BCD \u0BAE\u0BAF\u0BBF\u0BB0\u0BCD; \u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0B89\u0B9F\u0BB2\u0BC7 \u0BAA\u0B9F\u0BC8\u0BAA\u0BCD\u0BAA\u0BC7\u0BBE\u0BA9\u0BBF\u0BA9\u0BCD \u0B86\u0BAF\u0BC1\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BB3\u0BB5\u0BC1\u0B95\u0BCB\u0BB2\u0BBE\u0B95 \u0BAE\u0BBE\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1 — \u0B95\u0BBE\u0BB2\u0BA8\u0BC0\u0BB3\u0BAE\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BA4\u0BCD\u0BA4 \u0B95\u0BB0\u0BCD\u0BB5\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9 \u0B92\u0BB0\u0BC1 \u0B87\u0BB1\u0BC8\u0BAF\u0BBF\u0BAF\u0BB2\u0BCD \u0BAE\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1. \u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD \u0B85\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BC1\u0BB0\u0BBE\u0BA3\u0BAE\u0BCD \u0BB5\u0BBE\u0BAE\u0BA9-\u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE \u0BB5\u0BB0\u0BB2\u0BBE\u0BB1\u0BC1. \u0BAA\u0BCD\u0BB0\u0BB9\u0BCD\u0BB2\u0BBE\u0BA4\u0BA9\u0BBF\u0BA9\u0BCD \u0BAA\u0BC7\u0BB0\u0BA9\u0BC1\u0BAE\u0BCD \u0BB5\u0BB3\u0BCD\u0BB3\u0BB2\u0BCD \u0BA4\u0BA9\u0BCD\u0BAE\u0BC8 \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BB5\u0BA9\u0BC1\u0BAE\u0BBE\u0BA9 \u0BAE\u0B95\u0BBE\u0BAA\u0BB2\u0BBF\u0BAF\u0BBF\u0B9F\u0BAE\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BB5\u0BBE\u0BA9\u0BC1\u0BB2\u0B95 \u0B86\u0B9F\u0BCD\u0B9A\u0BBF\u0BAF\u0BC8 \u0BAE\u0BC0\u0B9F\u0BCD\u0B95 \u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1 \u0BB5\u0BBE\u0BAE\u0BA9\u0BA9\u0BBE\u0B95 \u0B85\u0BB5\u0BA4\u0BB0\u0BBF\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD. \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0B9F\u0BBF \u0BAE\u0BA3\u0BCD \u0BAA\u0BC6\u0BB1\u0BCD\u0BB1 \u0B85\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0BAE\u0BA9\u0BB0\u0BCD \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BBE\u0BA3\u0BCD\u0B9F\u0BAE\u0BCD \u0B85\u0BB3\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE\u0BB0\u0BBE\u0B95 \u0BB5\u0BB3\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1, \u0B92\u0BB0\u0BC1 \u0B85\u0B9F\u0BBF\u0BAF\u0BBE\u0BB2\u0BCD \u0BAA\u0BC2\u0BAE\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BCA\u0BA9\u0BCD\u0BB1\u0BBE\u0BB2\u0BCD \u0BB5\u0BBE\u0BA9\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B85\u0BB3\u0BA8\u0BCD\u0BA4\u0BC1, \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BBE\u0BB5\u0BA4\u0BC8 \u0BAE\u0B95\u0BBE\u0BAA\u0BB2\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD \u0BA4\u0BB2\u0BC8\u0BAE\u0BC0\u0BA4\u0BC1 \u0BB5\u0BC8\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD. \u0B87\u0B99\u0BCD\u0B95\u0BC1\u0BB3\u0BCD\u0BB3 \u0BAE\u0BC2\u0BB2\u0BB5\u0BB0\u0BCD \u0B85\u0BA8\u0BCD\u0BA4 \u0B95\u0BA3\u0BAE\u0BC7 \u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD — \u0B89\u0BAF\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF \u0B85\u0BB3\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0B9F\u0BBF, \u0B92\u0BB0\u0BC7 \u0B85\u0B9A\u0BC8\u0BB5\u0BBF\u0BB2\u0BCD \u0B85\u0BB3\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B89\u0BB2\u0B95\u0BAE\u0BCD. \u0BA4\u0BBE\u0B9F\u0BBE\u0BB3\u0BA9\u0BCD \u0B8E\u0BA9\u0BCD\u0BB1 \u0B89\u0BB3\u0BCD\u0BB3\u0BC2\u0BB0\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B85\u0BB3\u0BA8\u0BCD\u0BA4\u0BB5\u0BB0\u0BCD \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC8\u0BAF\u0BC7 \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BBE\u0BAE\u0BCD \u0B85\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BA4\u0BA9\u0BCD \u0B85\u0BAE\u0BC8\u0BB5\u0BBF\u0B9F\u0BAE\u0BCD \u0B9A\u0BBE\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1. \u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0BA8\u0BBE\u0B9F\u0BCD\u0B9F\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1; \u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1 \u0B86\u0BB2\u0BAF\u0BAE\u0BCD \u0B9A\u0BC8\u0BB5 \u0BAA\u0B95\u0BCD\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BC6\u0BB0\u0BBF\u0BA4\u0BC1\u0BAE\u0BCD \u0B85\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BB2\u0BAA\u0BCD\u0BAA\u0BB0\u0BAA\u0BCD\u0BAA\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 — \u0BA8\u0BBE\u0BB2\u0BCD\u0BB5\u0BB0\u0BBF\u0BB2\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD\u0BB5\u0BB0\u0BBE\u0BA9 \u0BA4\u0BBF\u0BB0\u0BC1\u0B9E\u0BBE\u0BA9\u0B9A\u0BAE\u0BCD\u0BAA\u0BA8\u0BCD\u0BA4\u0BB0\u0BBF\u0BA9\u0BCD \u0B85\u0BB5\u0BA4\u0BBE\u0BB0 \u0BB8\u0BCD\u0BA4\u0BB2\u0BAE\u0BCD \u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF. \u0B86\u0B95\u0BB5\u0BC7 \u0B95\u0BB4\u0BBF\u0B9A\u0BC0\u0BB0\u0BBE\u0BAE \u0BB5\u0BBF\u0BA3\u0BCD\u0BA3\u0B95\u0BB0\u0BAE\u0BCD \u0B85\u0BB0\u0BBF\u0BAF \u0B92\u0BB0\u0BC1 \u0B9A\u0B99\u0BCD\u0B95\u0BAE\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA8\u0BBF\u0BB1\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1 — \u0BA4\u0BC7\u0BB5\u0BBE\u0BB0 \u0BAE\u0BB0\u0BAA\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BC8\u0BAF\u0BAE\u0BBE\u0BA9 \u0B92\u0BB0\u0BC1 \u0BA8\u0B95\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B92\u0BB0\u0BC1 \u0BB8\u0BCD\u0BB0\u0BC0 \u0BB5\u0BC8\u0BB7\u0BCD\u0BA3\u0BB5 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0BAE\u0BCD, \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B87\u0BB0\u0BC1 \u0BAA\u0B95\u0BCD\u0BA4\u0BBF \u0BAE\u0BB0\u0BAA\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B86\u0BAF\u0BBF\u0BB0\u0BAE\u0BCD \u0B86\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0BC7\u0BB2\u0BBE\u0B95 \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC7 \u0BB5\u0BBE\u0BB4\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9. \u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BBE\u0BAE\u0BCD \u0B85\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B95\u0B9F\u0BCD\u0B9F\u0BBF\u0B9F \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1. \u0B87\u0B95\u0BCD\u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD \u0B9A\u0BCB\u0BB4\u0BB0\u0BCD\u0B95\u0BB3\u0BBE\u0BB2\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BBE\u0B95\u0BB5\u0BC1\u0BAE\u0BCD, \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BB0\u0BCD \u0BAE\u0BA4\u0BCD\u0BAF\u0B95\u0BBE\u0BB2 \u0B9A\u0BCB\u0BB4\u0BB0\u0BCD\u0B95\u0BB3\u0BCD, \u0BB5\u0BBF\u0B9C\u0BAF\u0BA8\u0B95\u0BB0 \u0BAE\u0BA9\u0BCD\u0BA9\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BA4\u0BC1\u0BB0\u0BC8 \u0BA8\u0BBE\u0BAF\u0B95\u0BCD\u0B95\u0BB0\u0BCD\u0B95\u0BB3\u0BBE\u0BB2\u0BCD \u0BB5\u0BBF\u0BB0\u0BBF\u0BB5\u0BC1\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BBE\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BA9\u0BCD\u0BA8\u0BBF\u0BA4\u0BBF\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 \u0BA8\u0BBF\u0BB2\u0BC8 \u0BB0\u0BBE\u0B9C\u0B95\u0BCB\u0BAA\u0BC1\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8\u0B95\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0B92\u0BB0\u0BC7 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF \u0BAE\u0BA4\u0BBF\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BB3\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9 — \u0B95\u0BB0\u0BCD\u0BAA\u0B95\u0BCD\u0B95\u0BBF\u0BB0\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE\u0BB0\u0BCD, \u0B85\u0BB0\u0BC1\u0B95\u0BBF\u0BB2\u0BCD \u0BB2\u0BCB\u0B95\u0BA8\u0BBE\u0BAF\u0B95\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B86\u0BA3\u0BCD\u0B9F\u0BBE\u0BB3\u0BCD. \u0B9A\u0B95\u0BCD\u0B95\u0BB0 \u0BA4\u0BC0\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BBF\u0BA9\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BAA\u0BC1\u0BB1\u0BAE\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BB5\u0BB4\u0BBF\u0BAA\u0BBE\u0B9F\u0BC1 \u0BA4\u0BC6\u0BA9\u0BCD\u0B95\u0BB2\u0BC8 \u0BAE\u0BB0\u0BAA\u0BC8\u0BAA\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BAA\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1; \u0BAA\u0BCD\u0BB0\u0BB9\u0BCD\u0BAE\u0BCB\u0BB1\u0BCD\u0B9A\u0BB5\u0BAE\u0BCD \u0BB5\u0BC8\u0B95\u0BBE\u0B9A\u0BBF \u0BAE\u0BBE\u0BA4\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA8\u0BC6\u0BB0\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0B99\u0BCD\u0B95\u0BC8 \u0B86\u0BB4\u0BCD\u0BB5\u0BBE\u0BB0\u0BBE\u0BB2\u0BCD \u0BAE\u0B99\u0BCD\u0B95\u0BB3\u0BBE\u0B9A\u0BBE\u0B9A\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B87\u0BA4\u0BCD\u0BA4\u0BB2\u0BAE\u0BCD, \u0B95\u0BB0\u0BCD\u0BB5\u0BAE\u0BCD \u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD, \u0B87\u0BB4\u0BA8\u0BCD\u0BA4\u0BA4\u0BC8 \u0BAE\u0BC0\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD, \u0B89\u0BB2\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B85\u0BB3\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B87\u0BB1\u0BC8\u0BB5\u0BA9\u0BBF\u0BA9\u0BCD \u0B85\u0BB0\u0BC1\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BC6\u0BB1\u0BB5\u0BC1\u0BAE\u0BCD \u0BAA\u0B95\u0BCD\u0BA4\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BC1\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.',

    distinctive_features: [
      'One of the 40 Chola Nadu Divya Desams — restored to this corpus in Session 2A.2 after being entirely absent',
      'Trivikrama in the world-measuring stride, the raised leg preserved in the moolavar iconography',
      'The Romasa legend — each falling hair of the sage subtracts a year from Brahma\u2019s life',
      'Named Patalika Vanam and Uttama Kshetram in the Brahmanda Purana',
      'Pushkala Vartha Vimanam over the sanctum, a rare vimana name in the delta',
      'Stands in Sirkazhi, the birthplace of Thirugnana Sambandar — a Vishnu Divya Desam at the heart of a Thevaram town',
      'Chola foundation with Medieval Chola, Vijayanagara and Madurai Nayak additions',
      'Sung by Thirumangai Alwar; Tenkalai tradition; Vaikasi Brahmotsavam'
    ],
    distinctive_features_ta: [
      '\u0BA8\u0BBE\u0BB1\u0BCD\u0BAA\u0BA4\u0BC1 \u0B9A\u0BCB\u0BB4 \u0BA8\u0BBE\u0B9F\u0BC1 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1',
      '\u0B89\u0BB2\u0B95\u0BB3\u0BA8\u0BCD\u0BA4 \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0B9F\u0BBF\u0BAF\u0BC1\u0B9F\u0BA9\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0BB0\u0BAE\u0BB0\u0BCD',
      '\u0BB0\u0BCB\u0BAE\u0B9A \u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0BAE\u0BAF\u0BBF\u0BB0\u0BCD \u0BB5\u0BBF\u0BB4\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BA9\u0BCD \u0B86\u0BAF\u0BC1\u0BB3\u0BCD \u0B95\u0BC1\u0BB1\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BB5\u0BB0\u0BAE\u0BCD',
      '\u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BBE\u0BA3\u0BCD\u0B9F \u0BAA\u0BC1\u0BB0\u0BBE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BAA\u0BBE\u0B9F\u0BB2\u0BBF\u0B95 \u0BB5\u0BA9\u0BAE\u0BCD, \u0B89\u0BA4\u0BCD\u0BA4\u0BAE \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD',
      '\u0BAA\u0BC1\u0BB7\u0BCD\u0B95\u0BB2 \u0BB5\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4 \u0BB5\u0BBF\u0BAE\u0BBE\u0BA9\u0BAE\u0BCD',
      '\u0BA4\u0BBF\u0BB0\u0BC1\u0B9E\u0BBE\u0BA9\u0B9A\u0BAE\u0BCD\u0BAA\u0BA8\u0BCD\u0BA4\u0BB0\u0BCD \u0B85\u0BB5\u0BA4\u0BBE\u0BB0\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4 \u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0BAE\u0BCD',
      '\u0B9A\u0BCB\u0BB4\u0BB0\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BA4\u0BC1; \u0BB5\u0BBF\u0B9C\u0BAF\u0BA8\u0B95\u0BB0 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA8\u0BBE\u0BAF\u0B95\u0BCD\u0B95\u0BB0\u0BCD \u0B95\u0BBE\u0BB2 \u0BB5\u0BBF\u0BB0\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD',
      '\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0B99\u0BCD\u0B95\u0BC8 \u0B86\u0BB4\u0BCD\u0BB5\u0BBE\u0BB0\u0BCD \u0BAE\u0B99\u0BCD\u0B95\u0BB3\u0BBE\u0B9A\u0BBE\u0B9A\u0BA9\u0BAE\u0BCD; \u0BB5\u0BC8\u0B95\u0BBE\u0B9A\u0BBF \u0BAA\u0BCD\u0BB0\u0BB9\u0BCD\u0BAE\u0BCB\u0BB1\u0BCD\u0B9A\u0BB5\u0BAE\u0BCD'
    ],
    unique_note: 'The Romasa boon is one of the most arithmetically striking in the Vaishnava ' +
      'sthala purana corpus: the sage\u2019s body becomes a clock running against Brahma. Where ' +
      'most longevity legends grant extension, this one grants a comparative — Romasa outlives ' +
      'the creator not by a fixed term but by a rate.',
    unique_note_ta: '\u0BB0\u0BCB\u0BAE\u0B9A \u0BB5\u0BB0\u0BAE\u0BCD \u0BB5\u0BC8\u0BB7\u0BCD\u0BA3\u0BB5 \u0BB8\u0BCD\u0BA4\u0BB2 \u0BAA\u0BC1\u0BB0\u0BBE\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0BA4\u0BA9\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BAE\u0BBE\u0BA9\u0BA4\u0BC1 — \u0BAE\u0BC1\u0BA9\u0BBF\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0B89\u0B9F\u0BB2\u0BC7 \u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BA9\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B8E\u0BA4\u0BBF\u0BB0\u0BBE\u0B95 \u0B93\u0B9F\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BBE\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.',
    alwar_note: 'Sung by Thirumangai Alwar in Periya Thirumozhi. The shrine sits within his own ' +
      'home region — Thiruvali-Thirunagari and the Thirunangur eleven lie within a few kilometres — ' +
      'and belongs to the dense Sirkazhi-belt cluster he celebrated more than any other Alwar.',
    alwar_note_ta: '\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0B99\u0BCD\u0B95\u0BC8 \u0B86\u0BB4\u0BCD\u0BB5\u0BBE\u0BB0\u0BBE\u0BB2\u0BCD \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BCA\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BBE\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1. \u0B87\u0BA4\u0BCD\u0BA4\u0BB2\u0BAE\u0BCD \u0B85\u0BB5\u0BB0\u0BA4\u0BC1 \u0B9A\u0BCA\u0BA8\u0BCD\u0BA4 \u0BAA\u0BC1\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.',
    alwars: {
      thirumangai: { pasurams: 10,
        reference: 'Periya Thirumozhi — dedicated decad on Thirukazhicheerama Vinnagaram (Thadalan)' }
    },
    acharya_associations: 'Within the Sirkazhi belt served historically by the Srirangam and ' +
      'Ahobila Matam acharyas during their delta itineraries.',
    acharya_associations_ta: '\u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF \u0BAA\u0B95\u0BC1\u0BA4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BB8\u0BCD\u0BB0\u0BC0\u0BB0\u0B99\u0BCD\u0B95\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B85\u0B95\u0BCB\u0BAA\u0BBF\u0BB2 \u0BAE\u0B9F \u0B86\u0B9A\u0BBE\u0BB0\u0BBF\u0BAF\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BA4\u0BCA\u0B9F\u0BB0\u0BCD\u0BAA\u0BC1.',
    epigraphy_note: 'Chola foundation with later Vijayanagara and Madurai Nayak endowments; ' +
      'administered by the TN HR&CE Department.',
    epigraphy_note_ta: '\u0B9A\u0BCB\u0BB4\u0BB0\u0BCD \u0B95\u0BBE\u0BB2 \u0B85\u0BB8\u0BCD\u0BA4\u0BBF\u0BB5\u0BBE\u0BB0\u0BAE\u0BCD; \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BB0\u0BCD \u0BB5\u0BBF\u0B9C\u0BAF\u0BA8\u0B95\u0BB0 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA8\u0BBE\u0BAF\u0B95\u0BCD\u0B95\u0BB0\u0BCD \u0B95\u0BBE\u0BB2 \u0BA4\u0BBE\u0BA9\u0B99\u0BCD\u0B95\u0BB3\u0BCD.',
    festivals: 'Brahmotsavam in the Tamil month of Vaikasi (May-June) is the principal annual ' +
      'festival. Vaikunta Ekadasi (Margazhi) and the Sirkazhi-belt Garuda Sevai draw large ' +
      'gatherings, as does Thirumangai Alwar\u2019s Mangalasasana Utsavam in Thai.',
    festivals_ta: '\u0BB5\u0BC8\u0B95\u0BBE\u0B9A\u0BBF \u0BAE\u0BBE\u0BA4 \u0BAA\u0BCD\u0BB0\u0BB9\u0BCD\u0BAE\u0BCB\u0BB1\u0BCD\u0B9A\u0BB5\u0BAE\u0BCD \u0BAE\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0BB5\u0BBF\u0BB4\u0BBE. \u0BAE\u0BBE\u0BB0\u0BCD\u0B95\u0BB4\u0BBF \u0BB5\u0BC8\u0B95\u0BC1\u0BA3\u0BCD\u0B9F \u0B8F\u0B95\u0BBE\u0BA4\u0B9A\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BC8 \u0BAE\u0BBE\u0BA4 \u0BAE\u0B99\u0BCD\u0B95\u0BB3\u0BBE\u0B9A\u0BBE\u0B9A\u0BA9 \u0B89\u0BA4\u0BCD\u0B9A\u0BB5\u0BAE\u0BCD.',
    external_sources: [
      { name: 'Wikipedia: Kazheesirama Vinnagaram',
        url: 'https://en.wikipedia.org/wiki/Kazheesirama_Vinnagaram' },
      { name: '108divyadesams.in — Chola Nadu enumeration',
        url: 'https://www.108divyadesams.in/cholanadu/' }
    ],
    sii_references: [],
    audio_sources: [],
    mangalasasanam_pasurams: []
  };

  /* ================================================================ */
  /* 3. #42 -> #80 MERGE (Thiruvali-Thirunagari = one Divya Desam)    */
  /* ================================================================ */
  var MERGE80_BASE = {
    temple_name: 'Sri Vayalali Manavalan Perumal Temple, Thirunagari, with Sri Lakshmi Narasimha Perumal Temple, Thiruvali (Thiruvali-Thirunagari)',
    temple_name_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BB5\u0BAF\u0BB2\u0BBE\u0BB2\u0BBF \u0BAE\u0BA3\u0BB5\u0BBE\u0BB3\u0BA9\u0BCD \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD, \u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF \u2014 \u0BB8\u0BCD\u0BB0\u0BC0 \u0BB2\u0B95\u0BCD\u0BB7\u0BCD\u0BAE\u0BBF \u0BA8\u0BB0\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BB3\u0BCD \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD, \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF (\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF-\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF)',
    temple_name_short: 'Sri Vayalali Manavalan & Sri Lakshmi Narasimha (Thiruvali-Thirunagari)',
    temple_name_short_ta: '\u0BB8\u0BCD\u0BB0\u0BC0 \u0BB5\u0BAF\u0BB2\u0BBE\u0BB2\u0BBF \u0BAE\u0BA3\u0BB5\u0BBE\u0BB3\u0BA9\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB2\u0B95\u0BCD\u0BB7\u0BCD\u0BAE\u0BBF \u0BA8\u0BB0\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE\u0BB0\u0BCD (\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF-\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF)',
    town: 'Thirunagari with Thiruvali',
    town_ta: '\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF',
    posture: 'Standing (Nindra) at Thirunagari; Seated Yoga posture with Lakshmi on lap at Thiruvali',
    posture_class: 'Multiple',
    companion_temple: 'Sri Lakshmi Narasimha Perumal Temple, Thiruvali — 11.203108 N, 79.774866 E, ' +
      'approximately 3.8 km from Thirunagari. Counted with this shrine as a single Divya Desam.',
    sthala_purana_tagline: 'Thiruvali-Thirunagari — two temples counted as ONE Divya Desam: the ' +
      'Yoga Narasimha of Vali and the shrine where Vishnu, disguised as a bridegroom, turned the ' +
      'robber Neelan into Thirumangai Alwar.',
    sthala_purana_tagline_ta: '\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF-\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF — \u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD\u0B95\u0BB3\u0BCD \u0B92\u0BB0\u0BC7 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0BAE\u0BBE\u0B95 \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9: \u0BB5\u0BBE\u0BB2\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD \u0BAF\u0BCB\u0B95 \u0BA8\u0BB0\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE\u0BB0\u0BCD, \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BA3\u0BAE\u0B95\u0BA9\u0BBE\u0B95 \u0BAE\u0BBE\u0BB1\u0BC1\u0BB5\u0BC7\u0B9F\u0BAE\u0BBF\u0B9F\u0BCD\u0B9F \u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1 \u0BA8\u0BC0\u0BB2\u0BA9\u0BC8 \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0B99\u0BCD\u0B95\u0BC8 \u0B86\u0BB4\u0BCD\u0BB5\u0BBE\u0BB0\u0BBE\u0B95 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0BAE\u0BCD.'
  };

  /* ================================================================ */
  /* APPLY                                                            */
  /* ================================================================ */
  function run(tries) {
    tries = tries || 0;
    var ARRS = arrays();
    if (!ARRS.length || !window.DD_ENRICHMENT) {
      if (tries > 80) { console.warn('[dd_v2_names] corpus never arrived.'); return; }
      return setTimeout(function () { run(tries + 1); }, 60);
    }
    /* Must run AFTER the 2A.1 remap, which owns slot 68/83. */
    if (!window.DD_SESSION_2A1_LOADED && tries < 80) {
      return setTimeout(function () { run(tries + 1); }, 60);
    }

    var ENR = window.DD_ENRICHMENT;
    var thin = window.DD_TEMPLES;
    var primary = ARRS[0];
    var report = { renamed: 0, added: 0, merged: 0 };

    /* ---- 1. rename #70 ------------------------------------------- */
    ARRS.forEach(function (T) {
      T.forEach(function (t) {
        if (t.sno !== 70) return;
        Object.keys(FIX70_BASE).forEach(function (k) { t[k] = FIX70_BASE[k]; });
        if (T === primary) report.renamed++;
      });
    });
    if (ENR[70]) {
      Object.keys(FIX70_ENR).forEach(function (k) { ENR[70][k] = clone(FIX70_ENR[k]); });
    }
    /* Non-thin arrays carry enrichment inline for v1 Section B. */
    ARRS.forEach(function (T) {
      if (T === thin) return;
      T.forEach(function (t) {
        if (t.sno !== 70) return;
        Object.keys(FIX70_ENR).forEach(function (k) { t[k] = clone(FIX70_ENR[k]); });
      });
    });

    /* ---- 2. add #83 ---------------------------------------------- */
    var exists83 = primary.some(function (t) { return t.sno === 83; });
    if (!exists83) {
      ARRS.forEach(function (T) {
        var rec = (T === thin) ? clone(NEW83_BASE)
                               : Object.assign({}, clone(NEW83_ENR), clone(NEW83_BASE));
        T.push(rec);
      });
      ENR[83] = clone(NEW83_ENR);
      report.added = 1;
    } else {
      console.warn('[dd_v2_names] slot #83 already occupied — Kazheesirama not added.');
    }

    /* ---- 3. merge #42 into #80 ----------------------------------- */
    var r42 = primary.filter(function (t) { return t.sno === 42; })[0];
    if (r42) {
      window.DD_RETIRED_RECORDS = window.DD_RETIRED_RECORDS || {};
      if (!window.DD_RETIRED_RECORDS.thiruvali) {
        window.DD_RETIRED_RECORDS.thiruvali = {
          retired_from_sno: 42,
          retired_by: 'Session 2A.2 — owner ruling: Thiruvali-Thirunagari is one Divya Desam',
          base: clone(r42),
          enrichment: ENR[42] ? clone(ENR[42]) : null
        };
      }

      var e42 = ENR[42] || {}, e80 = ENR[80] || {};

      /* Combined purana: both narratives in full, plus the count note. */
      var joinEN =
        'THIRUVALI-THIRUNAGARI IS COUNTED AS ONE DIVYA DESAM. Every canonical enumeration of ' +
        'the forty Chola Nadu Divya Desams lists "Thiruvali Thirunagari" as a single entry, ' +
        'even though it comprises two temples about 3.8 km apart — Sri Lakshmi Narasimha ' +
        'Perumal at Thiruvali and Sri Vayalali Manavalan (Vedarajan) at Thirunagari. The ' +
        'pasurams treat them as one kshetram and pilgrims visit them together. Both ' +
        'narratives are preserved in full below.\n\n' +
        '\u2014 THIRUNAGARI \u2014\n' + (e80.sthala_purana || '') + '\n\n' +
        '\u2014 THIRUVALI \u2014\n' + (e42.sthala_purana || '') + '\n\n' +
        'TAKEN TOGETHER: Thirumangai Alwar dedicated 42 pasurams to this single kshetram — ' +
        '24 to Thirunagari and 18 to Thiruvali — the largest concentration anywhere in ' +
        'Periya Thirumozhi. The pairing is theologically complete: Thiruvali holds the ' +
        'Lakshmi Narasimha who has already destroyed evil and settled into contemplative ' +
        'peace, while Thirunagari holds the bridegroom-Vishnu who reached into a robber\u2019s ' +
        'life and remade it. Wrath resolved and mercy extended, worshipped as one.';

      var joinTA =
        '\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF-\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF \u0B92\u0BB0\u0BC7 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0BAE\u0BBE\u0B95\u0B95\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0BA8\u0BBE\u0BB1\u0BCD\u0BAA\u0BA4\u0BC1 \u0B9A\u0BCB\u0BB4 \u0BA8\u0BBE\u0B9F\u0BC1 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BC1\u0BAE\u0BCD \u0B87\u0BB5\u0BC8 \u0B92\u0BB0\u0BC7 \u0BAA\u0BA4\u0BBF\u0BB5\u0BBE\u0B95 \u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9 — \u0B8E\u0BA9\u0BCD\u0BB1\u0BBE\u0BB2\u0BC1\u0BAE\u0BCD \u0B85\u0BB5\u0BC8 \u0B9A\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD 3.8 \u0B95\u0BBF.\u0BAE\u0BC0. \u0B87\u0B9F\u0BC8\u0BB5\u0BC6\u0BB3\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4 \u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD\u0B95\u0BB3\u0BCD. \u0BAA\u0BBE\u0B9A\u0BC1\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB5\u0BB1\u0BCD\u0BB1\u0BC8 \u0B92\u0BB0\u0BC7 \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9. \u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0BB5\u0BB0\u0BB2\u0BBE\u0BB1\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B95\u0BC0\u0BB4\u0BC7 \u0BAE\u0BC1\u0BB4\u0BC1\u0BAE\u0BC8\u0BAF\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9.\n\n' +
        '\u2014 \u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF \u2014\n' + (e80.sthala_purana_ta || '') + '\n\n' +
        '\u2014 \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF \u2014\n' + (e42.sthala_purana_ta || '') + '\n\n' +
        '\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1: \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0B99\u0BCD\u0B95\u0BC8 \u0B86\u0BB4\u0BCD\u0BB5\u0BBE\u0BB0\u0BCD \u0B87\u0BA8\u0BCD\u0BA4 \u0B92\u0BB0\u0BC7 \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 42 \u0BAA\u0BBE\u0B9A\u0BC1\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB0\u0BC1\u0BB3\u0BBF\u0BAF\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD — \u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC1 24, \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF\u0B95\u0BCD\u0B95\u0BC1 18 — \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BCA\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BBF\u0B95 \u0B85\u0BA4\u0BBF\u0B95 \u0B9A\u0BC6\u0BB1\u0BBF\u0BB5\u0BC1.';

      var mergedEnr = Object.assign({}, e80);
      mergedEnr.sthala_purana = joinEN;
      mergedEnr.sthala_purana_ta = joinTA;
      mergedEnr.alternate_names = ['Thiruvali-Thirunagari', 'Thirunagari', 'Thiruvali',
        'Vayalali Manavalan', 'Vedarajan', 'Lakshmi Narasimha Thiruvali', 'Alwar Koil',
        'Vedarajapuram', 'Thirumangai Alwar birthplace region'];
      mergedEnr.alternate_names_ta = ['\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF-\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF',
        '\u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0B95\u0BB0\u0BBF', '\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF',
        '\u0BB5\u0BAF\u0BB2\u0BBE\u0BB2\u0BBF \u0BAE\u0BA3\u0BB5\u0BBE\u0BB3\u0BA9\u0BCD',
        '\u0BB5\u0BC7\u0BA4\u0BB0\u0BBE\u0B9C\u0BA9\u0BCD'];
      mergedEnr.perumal_name = (e80.perumal_name || '') +
        ' \u2014 with Sri Lakshmi Narasimha Perumal (Yoga Narasimha with Lakshmi on his lap) at Thiruvali';
      mergedEnr.perumal_name_ta = (e80.perumal_name_ta || '') +
        ' \u2014 \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BB2\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BB8\u0BCD\u0BB0\u0BC0 \u0BB2\u0B95\u0BCD\u0BB7\u0BCD\u0BAE\u0BBF \u0BA8\u0BB0\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE\u0BB0\u0BC1\u0B9F\u0BA9\u0BCD';
      mergedEnr.thayar_name = (e80.thayar_name || '') +
        ' (Thirunagari); Sri Amrithagatavalli Thayar and Lakshmi on the Lord\u2019s lap (Thiruvali)';
      mergedEnr.vimana = (e80.vimana || '') + ' (Thirunagari); Ashtanga Vimana (Thiruvali)';
      mergedEnr.pushkarini = (e80.pushkarini || '') +
        ' (Thirunagari); Chakra Pushkarini and Amrita Pushkarini (Thiruvali)';
      mergedEnr.canonical_cluster =
        'Mayiladuthurai District — Thiruvali-Thirunagari, counted as ONE Divya Desam; Thirumangai Alwar\u2019s home region';
      mergedEnr.canonical_note =
        'Session 2A.2 (owner ruling): MERGED. The corpus previously carried Thiruvali at sno 42 ' +
        'and Thirunagari at sno 80 as two Divya Desams. Every canonical Chola Nadu enumeration ' +
        'lists "Thiruvali Thirunagari" as a single entry, so the corpus was inflated by one. ' +
        'The two records are merged here at sno 80 with both puranas preserved in full; sno 42 ' +
        'is released. The Thiruvali record is parked at ' +
        'window.DD_RETIRED_RECORDS.thiruvali and can be restored with ' +
        'DDRemap.restoreRetired(\'thiruvali\', 42).';
      mergedEnr.alwars = {
        thirumangai: { pasurams: 42,
          reference: 'Periya Thirumozhi — 24 pasurams on Thirunagari plus 18 on Thiruvali; ' +
                     'combined 42, the largest single-kshetram concentration in the corpus' }
      };
      mergedEnr.companion_temple = MERGE80_BASE.companion_temple;
      var df = (e80.distinctive_features || []).slice();
      (e42.distinctive_features || []).forEach(function (f) {
        if (df.indexOf(f) < 0) df.push(f);
      });
      df.unshift('Two temples ~3.8 km apart counted as ONE Divya Desam (Thiruvali + Thirunagari)');
      mergedEnr.distinctive_features = df;
      var dfta = (e80.distinctive_features_ta || []).slice();
      (e42.distinctive_features_ta || []).forEach(function (f) {
        if (dfta.indexOf(f) < 0) dfta.push(f);
      });
      dfta.unshift('\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0B95\u0BCB\u0BAF\u0BBF\u0BB2\u0BCD\u0B95\u0BB3\u0BCD \u0B92\u0BB0\u0BC7 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0BAE\u0BBE\u0B95\u0B95\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9');
      mergedEnr.distinctive_features_ta = dfta;

      ENR[80] = mergedEnr;
      delete ENR[42];

      /* write #80 in every array with the right shape */
      ARRS.forEach(function (T) {
        var isThin = (T === thin);
        T.forEach(function (t) {
          if (t.sno !== 80) return;
          Object.keys(MERGE80_BASE).forEach(function (k) { t[k] = MERGE80_BASE[k]; });
          if (!isThin) {
            Object.keys(mergedEnr).forEach(function (k) { t[k] = clone(mergedEnr[k]); });
            /* base fields must win over enrichment copies */
            Object.keys(MERGE80_BASE).forEach(function (k) { t[k] = MERGE80_BASE[k]; });
          }
        });
      });

      /* release #42 */
      ARRS.forEach(function (T) {
        for (var i = T.length - 1; i >= 0; i--) {
          if (T[i] && T[i].sno === 42) T.splice(i, 1);
        }
      });
      try {
        if (window.templeMarkersMap && window.templeMarkersMap[42]) {
          if (window.templeMarkersGroup) {
            window.templeMarkersGroup.removeLayer(window.templeMarkersMap[42]);
          }
          delete window.templeMarkersMap[42];
        }
      } catch (e) {}
      report.merged = 1;
    }

    sortBySno();
    if (window.DDCanon && typeof window.DDCanon.reconcileCategories === 'function') {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
    }

    var terr = primary.filter(function (t) {
      return !t.is_celestial && !t.is_abhimana;
    }).length;
    var occupied = {}; primary.forEach(function (t) { occupied[t.sno] = 1; });
    var gaps = [];
    for (var i = 1; i <= 108; i++) if (!occupied[i]) gaps.push(i);

    console.log('[dd_v2_names] Session 2A.2: #70 renamed to Thiruthetriyambalam, ' +
                'Kazheesirama Vinnagaram added at #83, #42 merged into #80.');
    console.log('[dd_v2_names] terrestrial records now ' + terr +
                (gaps.length ? ' | vacant slot(s): #' + gaps.join(', #') : ' | no vacant slots'));
    console.log('[dd_v2_names] \u26A0 canonical target is 106 terrestrial Divya Desams ' +
                '(108 = 106 terrestrial + 2 celestial). See DDNames.gapReport().');

    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () { try { window.buildSidebarList(); } catch (e) {} }, 130);
    }
    if (window.DDMarkers && typeof window.DDMarkers.build === 'function') {
      setTimeout(function () { try { window.DDMarkers.build(); } catch (e) {} }, 420);
    }
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { try { window.DDFilter.apply(); } catch (e) {} }, 500);
    }

    window.DD_NAMES_2A2 = { report: report, terrestrial: terr, vacant: gaps };
  }

  /* ================================================================ */
  /* RESEARCH FINDINGS — reported, NOT applied                        */
  /* ================================================================ */
  var OUTSTANDING = {
    missing_divya_desams: [
      { name: 'Thirukkoodal — Koodal Azhagar Perumal Temple',
        town: 'Madurai', region: 'Pandya Nadu',
        deity: 'Koodal Azhagar / Viyooga Sundararajan', thayar: 'Madhuravalli',
        lat: 9.9143972, lng: 78.1141083,
        note: 'Vishnu in all three postures on three levels under the Ashtanga Vimana. ' +
              'Sung by Nammalvar and Periyalvar. Wholly absent from this corpus.' },
      { name: 'Thiruthangal — Sri Nindra Narayana Perumal Temple',
        town: 'Thiruthangal, Sivakasi', region: 'Pandya Nadu',
        deity: 'Nindra Narayana Perumal', thayar: 'Anna Nayaki / Ananta Nayaki',
        note: 'Listed in every Pandya Nadu 18 enumeration. Absent from this corpus.' },
      { name: 'Thiruvaramangai (Vanamamalai) — Sri Thothatrinatha Perumal Temple',
        town: 'Nanguneri', region: 'Pandya Nadu',
        deity: 'Thothatrinatha / Deivanayaga Perumal', thayar: 'Sirivaramangai Nachiyar',
        note: 'The ninth Nava Tirupathi. The corpus reaches nine at #71-79 only by ' +
              'counting Tholaivillimangalam twice, so this shrine was displaced.' }
    ],
    merges_owed: [
      { snos: [43, 44, 45], name: 'Thanjai Mamani Koil',
        evidence: 'Wikipedia: "a set of three adjacent Hindu temples ... It is one of the ' +
                  'Divya Desams". 108divyadesam.in: "3 TEMPLES IN 3 DIFFERENT NEARBY PREMISES ' +
                  'WORSHIPPED AS ONE DIVYADESAM ... the only Divyadesam where three temples ' +
                  'are put together worshipped as one". Pillai Perumal Iyengar\u2019s 108 ' +
                  'Tirupathi Anthathi: "From the divya desam count point of view, there is ' +
                  'only one but it has three sannidhis."',
        effect: 'Would release 2 slots.' },
      { snos: [78, 79], name: 'Thirutholaivillimangalam (Irattai Tirupathi)',
        evidence: 'Every Pandya Nadu 18 list gives "Thiruttholai Villimangalam (Twin ' +
                  'Thirupathis)" as ONE entry. Irattai means twin: two shrines, one Divya Desam.',
        effect: 'Would release 1 slot and, with Vanamamalai added, correct the Nava Tirupathi set.' }
    ],
    reclassification: [
      { sno: 100, name: 'Simhachalam Varaha Lakshmi Narasimha',
        note: 'Not one of the 108. Andhra Pradesh holds exactly two Divya Desams — Tirumala ' +
              'and Ahobilam. Simhachalam is an Abhimana Kshetram, like #109 Mannargudi. ' +
              'Suggest flipping is_abhimana to true rather than deleting.' }
    ]
  };

  window.DDNames = {
    outstanding: OUTSTANDING,
    run: run,
    gapReport: function () {
      var A = arrays(); if (!A.length) return null;
      var T = A[0];
      var terr = T.filter(function (t) { return !t.is_celestial && !t.is_abhimana; }).length;
      console.log('%c=== DD corpus reconciliation ===', 'font-weight:700;color:#1E5AA0');
      console.log('canonical: 108 Divya Desams = 106 terrestrial + 2 celestial');
      console.log('corpus   : ' + terr + ' terrestrial records');
      console.log('\nStill MISSING (' + OUTSTANDING.missing_divya_desams.length + '):');
      console.table(OUTSTANDING.missing_divya_desams.map(function (m) {
        return { temple: m.name, town: m.town, region: m.region };
      }));
      console.log('Merges still owed (' + OUTSTANDING.merges_owed.length + '):');
      console.table(OUTSTANDING.merges_owed.map(function (m) {
        return { snos: m.snos.join('+'), name: m.name, effect: m.effect };
      }));
      console.log('Reclassification suggested:');
      console.table(OUTSTANDING.reclassification.map(function (r) {
        return { sno: r.sno, name: r.name };
      }));
      console.log('Net: ' + terr + ' - 2 (Thanjai) - 1 (Irattai) - 1 (Simhachalam) + 3 (missing) = 106 \u2713');
      return { terrestrial: terr, outstanding: OUTSTANDING };
    }
  };

  run(0);
})();
