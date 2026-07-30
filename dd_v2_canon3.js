/* ==================================================================
   DD v2 — CATEGORY RULINGS + COORDINATE AUDIT     (Session 2B.1)
   ------------------------------------------------------------------
   Resolves the five categories parked in DD_RULINGS_PENDING since
   Session 2A.1, and adds a helper for planning the coordinate pass.

   RULINGS
   -------
     swayamvyakta       ENABLE   6 in-corpus members of the eight
     char_dham          ENABLE   2 in-corpus members of the four
     pancha_krishnam    DECLINE  real set, membership unverified
     pancha_naranyam    DECLINE  only 1 in-corpus member
     andal_thiruppavai  DECLINE  redundant with the Alwar filter

   Two enabled, three declined with reasons. A declined ruling is not
   a deletion: the reasoning stays in DD_RULINGS_RESOLVED so it can be
   revisited without repeating the research.

   ------------------------------------------------------------------
   RULING 1 — swayamvyakta: ENABLE with six members
   ------------------------------------------------------------------
   The Ashta Swayam Vyakta Kshetras are the eight shrines at which
   Vishnu is held to have manifested of his own will rather than by
   human consecration. The set is fixed by a Sanskrit verse:

       adyam rangam iti proktam vimanam ranga-sanjnitam
       srimushnam venkatadrim cha salagramam cha naimisham
       toyadrim pushkaram chaiva nara-narayana-ashramam
       ashtau me murtayah santi svayam-vyakta mahitale

   "These eight manifestations of mine on earth are self-manifested."
   Reading the eight against this corpus:

       Ranga            Srirangam            #1     in corpus
       Venkatadri       Tirumala             #98    in corpus
       Naimisha         Naimisharanya        #99    in corpus
       Nara-Narayana    Badrinath            #107   in corpus
       Salagrama        Muktinath            #108   in corpus
       Toyadri          see the note below   #45    in corpus
       Srimushnam       Bhuvaraha Swamy      --     NOT a Divya Desam
       Pushkara         Varaha, Rajasthan    --     NOT a Divya Desam

   Six of the eight are Divya Desams. Srimushnam is an Abhimana
   Kshetram and Pushkar is outside the Divya Desam corpus entirely,
   so the pill correctly reads 6 and the record says why.

   THE TOYADRI CONFLICT — recorded, not hidden.
   Sources disagree on the sixth. Toyadri parses as toya (water) plus
   adri (hill), and shlokam.org glosses it directly as THIRUNEERMALAI
   (#36) -- neer is water, malai is hill, an exact Tamil rendering.
   Most other sources, including Wikipedia's Vanamamalai article, the
   Vanamamalai Mutt and the widely reproduced Ashtakshara lists, read
   the sixth as VANAMAMALAI at Nanguneri, whose Sanskrit name is
   Thothadri.

   This session follows the majority and Wikipedia, and stamps #45.
   The minority reading is recorded on the record itself and in
   DD_RULINGS_RESOLVED. If the owner prefers Thiruneermalai, changing
   one sno in CANON below is the whole edit.

   ------------------------------------------------------------------
   RULING 2 — char_dham: ENABLE with two members
   ------------------------------------------------------------------
   The Char Dham established by Adi Shankara are Badrinath, Dwarka,
   Puri and Rameswaram -- one at each cardinal point of the
   subcontinent. Only two are Divya Desams:

       Badrinath   #107   in corpus
       Dwarka      #104   in corpus
       Puri        Jagannath, not among the 108
       Rameswaram  a Shiva temple, one of the twelve Jyotirlingas

   A two-member set is small but it is real, canonical and useful to a
   pilgrim planning a national circuit. The record discloses that it
   is 2 of 4 and names the other two.

   Not to be confused with the Chota Char Dham of Uttarakhand
   (Yamunotri, Gangotri, Kedarnath, Badrinath), which shares only
   Badrinath and is a separate circuit.

   ------------------------------------------------------------------
   RULING 3 — pancha_krishnam: DECLINE, membership unverified
   ------------------------------------------------------------------
   The Pancha Krishna Kshetrams are a genuine set of five Divya
   Desams. The corpus supports the concept -- #10 Thirukkannangudi
   states in its own purana that it is "one of the five Panchakrishna
   Kshetrams of Chola Nadu" -- but that is the ONLY textual match
   anywhere in 110 records, and no source consulted gave the full five
   with enough agreement to stamp.

   Enabling a five-member set on one attested member and four guesses
   would put a number on the map that nothing stands behind. Declined
   until the membership is established. This is the closest of the
   three declines to being enabled and is the one worth researching
   first.

   ------------------------------------------------------------------
   RULING 4 — pancha_naranyam: DECLINE, only one in-corpus member
   ------------------------------------------------------------------
   The slug is ambiguous and the research resolved it in an unexpected
   direction. There is a real PANCHA NARASIMHA KSHETRAM around
   Thiruvali-Thirunagari near Sirkazhi -- five Narasimha forms that
   Thirumangai Alwar praised in a single verse:

       Ugra Narasimha      Thirukkurayalur
       Veera Narasimha     Thirumangaimadam
       Yoga Narasimha      Thirunagari
       Jwala Narasimha     Thirunagari
       Lakshmi Narasimha   Thiruvali

   Only Thiruvali-Thirunagari is a Divya Desam, and since Session 2A.2
   merged the pair it is a single record, #80. The other three sites
   are not among the 108. A set with one in-corpus member is not a set,
   so it cannot drive a filter pill.

   The finding is worth keeping: it explains the slug, and it is a
   genuine pilgrimage circuit a visitor to #80 might want to know
   about. It has been folded into #80's record as a note rather than
   made a category.

   The alternative reading -- Pancha Narayana Kshetram, a different
   set again -- has no corpus evidence either.

   ------------------------------------------------------------------
   RULING 5 — andal_thiruppavai: DECLINE, redundant
   ------------------------------------------------------------------
   Session 2A.5 established that Andal is attested at 11 temples in
   this corpus, and DDPopup.filterByAlwar('andal') already filters to
   exactly those. A category pill would duplicate a control that
   exists and works.

   A narrower set -- only those temples named within the thirty verses
   of the Thiruppavai itself, as distinct from the Nachiyar Thirumozhi
   -- would not be redundant and would be genuinely interesting. That
   is a different piece of work: it needs the verses read against the
   corpus, not a list copied from anywhere. Declined in its present
   form; the narrower version is recorded as a future option.

   ------------------------------------------------------------------
   COORDINATE AUDIT
   ------------------------------------------------------------------
   The three temples added in Session 2A.3 carry published Wikipedia
   coordinates and are flagged coords_verified false. This session
   adds DDCoordAudit.unverified(), which lists every record whose
   coordinate has not been owner-verified, so the eventual GPS pass
   can be planned from data rather than memory. No coordinates are
   changed here.

   LOAD ORDER — after alwars, before filters and markers:
     dd_v2_regions.js
     dd_v2_alwars.js
     dd_v2_canon3.js        <- this file
     dd_v2_filters.js
     dd_v2_markers.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2B1_LOADED) return;
  window.DD_SESSION_2B1_LOADED = true;

  /* ---------------------------------------------------------------- */
  /* 1. THE TWO ENABLED SETS                                           */
  /* ---------------------------------------------------------------- */
  var NEW_SETS = {
    /* Six of the eight Ashta Swayam Vyakta Kshetras. Srimushnam and
       Pushkar are not Divya Desams. #45 is the majority reading of
       Toyadri/Thothadri -- see the header for the conflict. */
    swayamvyakta: [1, 45, 98, 99, 107, 108],

    /* Two of the four Char Dham. Puri and Rameswaram are not Divya
       Desams. */
    char_dham: [104, 107]
  };

  var NEW_META = {
    swayamvyakta: {
      label: 'Swayam Vyakta',
      label_ta: '\u0BB8\u0BCD\u0BB5\u0BAF\u0BAE\u0BCD \u0BB5\u0BCD\u0BAF\u0B95\u0BCD\u0BA4',
      color: '#7B1FA2'
    },
    char_dham: {
      label: 'Char Dham',
      label_ta: '\u0B9A\u0BBE\u0BB0\u0BCD \u0BA4\u0BBE\u0BAE\u0BCD',
      color: '#00838F'
    }
  };

  var NEW_ICONS = {
    swayamvyakta: '\u2728',            /* sparkles — self-manifested   */
    char_dham:    '\uD83E\uDDED'       /* compass — the four quarters  */
  };

  var NEW_DESC = {
    swayamvyakta: 'Self-manifested shrines — 6 of the 8 Ashta Swayam Vyakta Kshetras',
    char_dham: 'The four abodes of Adi Shankara — 2 of the 4 are Divya Desams'
  };

  /* Disclosure text written onto each member record, so a visitor
     reading the temple sees why the count is not 8 or 4. */
  var DISCLOSURE = {
    swayamvyakta: {
      en: 'One of the ASHTA SWAYAM VYAKTA KSHETRAS — the eight shrines at which ' +
          'Vishnu is held to have manifested of his own will, rather than being ' +
          'installed by human consecration. The eight are named in a single Sanskrit ' +
          'verse: Srirangam, Srimushnam, Tirumala, Salagrama (Muktinath), ' +
          'Naimisharanya, Toyadri, Pushkar and the Nara-Narayana ashrama ' +
          '(Badrinath). SIX of the eight are Divya Desams and appear in this corpus; ' +
          'Srimushnam is an Abhimana Kshetram and Pushkar lies outside the 108, so ' +
          'the filter shows 6 rather than 8.',
      ta: '\u0B85\u0BB7\u0BCD\u0B9F \u0BB8\u0BCD\u0BB5\u0BAF\u0BAE\u0BCD \u0BB5\u0BCD\u0BAF\u0B95\u0BCD\u0BA4 \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1 \u2014 \u0BAE\u0BA9\u0BBF\u0BA4\u0BB0\u0BBE\u0BB2\u0BCD \u0BAA\u0BBF\u0BB0\u0BA4\u0BBF\u0BB7\u0BCD\u0B9F\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BBE\u0BAE\u0BB2\u0BCD \u0B87\u0BB1\u0BC8\u0BB5\u0BA9\u0BCD \u0BA4\u0BBE\u0BA9\u0BBE\u0B95\u0BB5\u0BC7 \u0BB5\u0BC6\u0BB3\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B8E\u0B9F\u0BCD\u0B9F\u0BC1\u0BA4\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0B99\u0BCD\u0B95\u0BB3\u0BCD. \u0B8E\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B86\u0BB1\u0BC1 \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0B99\u0BCD\u0B95\u0BB3\u0BCD; \u0BB8\u0BCD\u0BB0\u0BC0\u0BAE\u0BC1\u0BB7\u0BCD\u0BA3\u0BAE\u0BCD \u0B85\u0BAA\u0BBF\u0BAE\u0BBE\u0BA9 \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD, \u0BAA\u0BC1\u0BB7\u0BCD\u0B95\u0BB0\u0BAE\u0BCD \u0BA8\u0BC2\u0BB1\u0BCD\u0BB1\u0BC6\u0B9F\u0BCD\u0B9F\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BB5\u0BC6\u0BB3\u0BBF\u0BAF\u0BC7.'
    },
    char_dham: {
      en: 'One of the CHAR DHAM — the four abodes established by Adi Shankara at the ' +
          'cardinal points of the subcontinent: Badrinath in the north, Dwarka in the ' +
          'west, Puri in the east and Rameswaram in the south. Only TWO are Divya ' +
          'Desams — Badrinath and Dwarka. Puri is the shrine of Jagannath and ' +
          'Rameswaram is a Shiva temple and one of the twelve Jyotirlingas, so ' +
          'neither is among the 108. Not to be confused with the Chota Char Dham of ' +
          'Uttarakhand, which shares only Badrinath.',
      ta: '\u0B86\u0BA4\u0BBF \u0B9A\u0B99\u0BCD\u0B95\u0BB0\u0BB0\u0BBE\u0BB2\u0BCD \u0BA8\u0BBF\u0BB1\u0BC1\u0BB5\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1 \u0BA4\u0BBE\u0BAE\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1 \u2014 \u0BB5\u0B9F\u0B95\u0BCD\u0B95\u0BC7 \u0BAA\u0BA4\u0BCD\u0BB0\u0BBF\u0BA8\u0BBE\u0BA4\u0BCD, \u0BAE\u0BC7\u0BB1\u0BCD\u0B95\u0BC7 \u0BA4\u0BCD\u0BB5\u0BBE\u0BB0\u0B95\u0BC8, \u0B95\u0BBF\u0BB4\u0B95\u0BCD\u0B95\u0BC7 \u0BAA\u0BC1\u0BB0\u0BBF, \u0BA4\u0BC6\u0BB1\u0BCD\u0B95\u0BC7 \u0BB0\u0BBE\u0BAE\u0BC7\u0BB8\u0BCD\u0BB5\u0BB0\u0BAE\u0BCD. \u0B87\u0BB5\u0BB1\u0BCD\u0BB1\u0BC1\u0BB3\u0BCD \u0BAA\u0BA4\u0BCD\u0BB0\u0BBF\u0BA8\u0BBE\u0BA4\u0BCD, \u0BA4\u0BCD\u0BB5\u0BBE\u0BB0\u0B95\u0BC8 \u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0B99\u0BCD\u0B95\u0BB3\u0BCD.'
    }
  };

  /* Extra note for the majority/minority reading on #45. */
  var TOYADRI_NOTE_EN =
    ' TEXTUAL NOTE: the sixth of the eight is given in the verse as TOYADRI. ' +
    'Toya means water and adri means hill, and one reading glosses it directly as ' +
    'Thiruneermalai (neer, water; malai, hill), which is Divya Desam #36. The ' +
    'majority of sources, including this temple\u2019s own Wikipedia article and the ' +
    'Vanamamalai Mutt, read it as THOTHADRI, the Sanskrit name of this shrine. ' +
    'This corpus follows the majority. The alternative is recorded rather than ' +
    'hidden.';
  var TOYADRI_NOTE_TA =
    ' \u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1: \u0B8E\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B86\u0BB1\u0BBE\u0BB5\u0BA4\u0BC1 \u0B9A\u0BAE\u0BB8\u0BCD\u0B95\u0BC3\u0BA4 \u0BB6\u0BCD\u0BB2\u0BCB\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCB\u0BAF\u0BBE\u0BA4\u0BCD\u0BB0\u0BBF \u0B8E\u0BA9\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0B9A\u0BBF\u0BB2\u0BB0\u0BCD \u0B85\u0BA4\u0BC8 \u0BA4\u0BBF\u0BB0\u0BC1\u0BA8\u0BC0\u0BB0\u0BCD\u0BAE\u0BB2\u0BC8 (#36) \u0B8E\u0BA9\u0BB5\u0BC1\u0BAE\u0BCD, \u0BAA\u0BB2\u0BB0\u0BCD \u0BA4\u0BCB\u0BA4\u0BCD\u0BA4\u0BBE\u0BA4\u0BCD\u0BB0\u0BBF \u2014 \u0B87\u0BA8\u0BCD\u0BA4\u0BA4\u0BCD \u0BA4\u0BB2\u0BAE\u0BCD \u2014 \u0B8E\u0BA9\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BCA\u0BB3\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9\u0BB0\u0BCD.';

  /* Note folded onto #80 for the declined Pancha Narasimha finding. */
  var PANCHA_NARASIMHA_EN =
    ' PANCHA NARASIMHA KSHETRAM: this Divya Desam is the anchor of a five-shrine ' +
    'Narasimha circuit around Sirkazhi that Thirumangai Alwar praised in a single ' +
    'verse \u2014 Ugra Narasimha at Thirukkurayalur (his own birthplace), Veera ' +
    'Narasimha at Thirumangaimadam, Yoga Narasimha and Jwala Narasimha at ' +
    'Thirunagari, and Lakshmi Narasimha here at Thiruvali. Of the five shrines only ' +
    'this one is among the 108, so the circuit is noted here rather than shown as a ' +
    'filter category.';
  var PANCHA_NARASIMHA_TA =
    ' \u0BAA\u0B9E\u0BCD\u0B9A \u0BA8\u0BB0\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE \u0B95\u0BCD\u0BB7\u0BC7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD: \u0B9A\u0BC0\u0BB0\u0BCD\u0B95\u0BBE\u0BB4\u0BBF\u0BAF\u0BC8\u0B9A\u0BCD \u0B9A\u0BC1\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BC1\u0BB3\u0BCD\u0BB3 \u0B90\u0BA8\u0BCD\u0BA4\u0BC1 \u0BA8\u0BB0\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BAE\u0BC8\u0BAF\u0BAE\u0BCD. \u0B90\u0BA8\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B87\u0BA4\u0BC1 \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0BA4\u0BBF\u0BB5\u0BCD\u0BAF\u0BA4\u0BC7\u0B9A\u0BAE\u0BCD.';

  /* ---------------------------------------------------------------- */
  /* 2. THE THREE DECLINED RULINGS, WITH REASONS                       */
  /* ---------------------------------------------------------------- */
  var RESOLVED = {
    swayamvyakta: {
      ruling: 'ENABLED',
      members: [1, 45, 98, 99, 107, 108],
      basis: 'Fixed by the Sanskrit verse "adyam rangam iti proktam...". Six of the ' +
             'eight are Divya Desams; Srimushnam is an Abhimana Kshetram and Pushkar ' +
             'is outside the 108.',
      conflict: 'The sixth, TOYADRI, is read as Thiruneermalai (#36) by shlokam.org ' +
                'on a literal parse (toya=water, adri=hill) and as Thothadri / ' +
                'Vanamamalai (#45) by Wikipedia, the Vanamamalai Mutt and most ' +
                'Ashtakshara lists. Majority reading followed. To switch, change one ' +
                'sno in NEW_SETS.swayamvyakta.'
    },
    char_dham: {
      ruling: 'ENABLED',
      members: [104, 107],
      basis: 'Badrinath, Dwarka, Puri and Rameswaram. Only Badrinath and Dwarka are ' +
             'Divya Desams; Puri is Jagannath and Rameswaram is a Jyotirlinga.',
      conflict: null
    },
    pancha_krishnam: {
      ruling: 'DECLINED — membership unverified',
      basis: 'A genuine set of five Divya Desams. #10 Thirukkannangudi states in its ' +
             'own purana that it is one of the five Panchakrishna Kshetrams of Chola ' +
             'Nadu, but that is the only textual match in 110 records and no source ' +
             'consulted gave the full five with enough agreement to stamp.',
      next: 'Establish the five from a Sri Vaishnava authority, then enable. This is ' +
            'the closest of the three declines to being enabled.'
    },
    pancha_naranyam: {
      ruling: 'DECLINED — one in-corpus member',
      basis: 'Resolves to the PANCHA NARASIMHA KSHETRAM around Sirkazhi: Ugra ' +
             '(Thirukkurayalur), Veera (Thirumangaimadam), Yoga and Jwala ' +
             '(Thirunagari), Lakshmi (Thiruvali). Only Thiruvali-Thirunagari is a ' +
             'Divya Desam, and since the 2A.2 merge it is a single record, #80. A ' +
             'one-member set cannot drive a filter.',
      next: 'Folded into #80 as a note. Reconsider only if the corpus ever admits ' +
            'non-Divya-Desam companion shrines, as PPS does for set-completers.'
    },
    andal_thiruppavai: {
      ruling: 'DECLINED — redundant',
      basis: 'Andal is attested at 11 temples (Session 2A.5) and ' +
             'DDPopup.filterByAlwar("andal") already filters to exactly those. A pill ' +
             'would duplicate a working control.',
      next: 'A narrower set — only temples named within the thirty verses of the ' +
            'Thiruppavai, as distinct from the Nachiyar Thirumozhi — would not be ' +
            'redundant. That needs the verses read against the corpus.'
    }
  };

  /* ---------------------------------------------------------------- */
  /* 3. APPLY                                                          */
  /* ---------------------------------------------------------------- */
  function arrays() {
    var out = [], seen = [];
    [window.DD_TEMPLES, window.DIVYA_DESAMS, window.DD_FUSED].forEach(function (A) {
      if (!A || !Array.isArray(A) || !A.length) return;
      if (seen.indexOf(A) >= 0) return;
      seen.push(A); out.push(A);
    });
    return out;
  }

  function appendNote(sno, en, ta) {
    var ENR = window.DD_ENRICHMENT || {};
    var e = ENR[sno];
    if (e) {
      if (e.unique_note && e.unique_note.indexOf(en.trim().slice(0, 40)) < 0) {
        e.unique_note = e.unique_note + en;
      } else if (!e.unique_note) {
        e.unique_note = en.trim();
      }
      if (e.unique_note_ta && e.unique_note_ta.indexOf(ta.trim().slice(0, 20)) < 0) {
        e.unique_note_ta = e.unique_note_ta + ta;
      } else if (!e.unique_note_ta) {
        e.unique_note_ta = ta.trim();
      }
    }
    /* mirror onto the fused arrays so v1 Section B sees it */
    var thin = window.DD_TEMPLES;
    arrays().forEach(function (T) {
      if (T === thin) return;
      T.forEach(function (t) {
        if (t.sno !== sno || !e) return;
        t.unique_note = e.unique_note;
        t.unique_note_ta = e.unique_note_ta;
      });
    });
  }

  function run(tries) {
    tries = tries || 0;
    var ready = window.DD_CANON && window.DD_CAT_META && arrays().length;
    if (!ready) {
      if (tries > 120) { console.warn('[dd_v2_canon3] prerequisites never arrived.'); return; }
      return setTimeout(function () { run(tries + 1); }, 60);
    }
    /* Run after the corpus is final. */
    if (!window.DD_SESSION_2A4_LOADED && tries < 120) {
      return setTimeout(function () { run(tries + 1); }, 60);
    }

    var T = arrays()[0];
    var present = {}; T.forEach(function (t) { present[t.sno] = 1; });

    /* ---- register the two enabled sets --------------------------- */
    var enabled = [];
    Object.keys(NEW_SETS).forEach(function (slug) {
      var members = NEW_SETS[slug].filter(function (s) { return present[s]; });
      var missing = NEW_SETS[slug].filter(function (s) { return !present[s]; });
      if (missing.length) {
        console.warn('[dd_v2_canon3] ' + slug + ' references missing snos: #' +
                     missing.join(', #'));
      }
      if (!members.length) return;

      window.DD_CANON[slug] = members;
      window.DD_CAT_META[slug] = NEW_META[slug];
      if (window.DD_CAT_ICONS) window.DD_CAT_ICONS[slug] = NEW_ICONS[slug];
      if (window.DD_PRECEDENCE && window.DD_PRECEDENCE.indexOf(slug) < 0) {
        /* place after the tight geographic clusters, before the loose tags */
        window.DD_PRECEDENCE.splice(2, 0, slug);
      }
      enabled.push(slug + ' (' + members.length + ')');
    });

    /* ---- retire the resolved rulings FIRST ------------------------ */
    /* Order matters. dd_v2_canon.js syncLegacyCategories() deletes any
       slug still listed in DD_RULINGS_PENDING, on the principle that an
       unresolved set must not render. swayamvyakta and char_dham are
       being resolved right now, so they have to leave that list before
       the sync runs or they would be written and instantly deleted. */
    window.DD_RULINGS_RESOLVED = RESOLVED;
    if (window.DD_RULINGS_PENDING) {
      Object.keys(RESOLVED).forEach(function (k) {
        delete window.DD_RULINGS_PENDING[k];
      });
    }

    /* ---- re-stamp so the new slugs reach every array -------------- */
    if (window.DDCanon && typeof window.DDCanon.reconcileCategories === 'function') {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
    }
    /* ---- and rebuild v1's CATEGORIES table for the Related tab ---- */
    if (window.DDCanon && typeof window.DDCanon.syncLegacyCategories === 'function') {
      try {
        /* teach the legacy sync about the new descriptions first */
        window.DDCanon.syncLegacyCategories();
        var C = window.CATEGORIES;
        Object.keys(NEW_SETS).forEach(function (slug) {
          if (C && C[slug]) C[slug].description = NEW_DESC[slug];
        });
      } catch (e) {}
    }

    /* ---- write the disclosures onto member records ---------------- */
    Object.keys(NEW_SETS).forEach(function (slug) {
      (window.DD_CANON[slug] || []).forEach(function (sno) {
        var d = DISCLOSURE[slug];
        if (!d) return;
        var en = ' ' + d.en, ta = ' ' + d.ta;
        if (slug === 'swayamvyakta' && sno === 45) {
          en += TOYADRI_NOTE_EN; ta += TOYADRI_NOTE_TA;
        }
        appendNote(sno, en, ta);
      });
    });

    /* ---- fold the declined Pancha Narasimha finding onto #80 ------ */
    if (present[80]) {
      appendNote(80, ' ' + PANCHA_NARASIMHA_EN, ' ' + PANCHA_NARASIMHA_TA);
    }

    var declined = Object.keys(RESOLVED).filter(function (k) {
      return RESOLVED[k].ruling.indexOf('DECLINED') === 0;
    });

    console.log('[dd_v2_canon3] Session 2B.1: enabled ' + enabled.join(', ') +
                ' | declined ' + declined.length + ' (' + declined.join(', ') + ')');
    console.log('[dd_v2_canon3] CANON now has ' + Object.keys(window.DD_CANON).length +
                ' sets. Pending rulings: ' +
                (Object.keys(window.DD_RULINGS_PENDING || {}).length || 'none') + '.');

    if (typeof window.buildSidebarList === 'function') {
      setTimeout(function () { try { window.buildSidebarList(); } catch (e) {} }, 130);
    }
    if (window.DDMarkers && typeof window.DDMarkers.build === 'function') {
      setTimeout(function () { try { window.DDMarkers.build(); } catch (e) {} }, 430);
    }
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { try { window.DDFilter.apply(); } catch (e) {} }, 510);
    }

    window.DD_CANON3_2B1 = { enabled: enabled, resolved: RESOLVED };
  }

  /* ---------------------------------------------------------------- */
  /* 4. COORDINATE AUDIT HELPER                                        */
  /* ---------------------------------------------------------------- */
  window.DDCoordAudit = {
    unverified: function () {
      var T = arrays()[0] || [];
      var rows = T.filter(function (t) {
        return !t.is_celestial && t.coords_verified !== true;
      }).sort(function (a, b) { return a.sno - b.sno; })
        .map(function (t) {
          return { sno: t.sno, temple: (t.temple_name_short || '').slice(0, 40),
                   town: t.town, district: t.district,
                   lat: t.lat, lng: t.lng,
                   source: (t.coords_source || 'not recorded').slice(0, 46) };
        });
      console.log('%c=== Coordinates not owner-verified: ' + rows.length +
                  ' ===', 'font-weight:700;color:#1E5AA0');
      console.table(rows);
      var verified = T.filter(function (t) {
        return !t.is_celestial && t.coords_verified === true;
      }).length;
      console.log('owner-verified: ' + verified + '  |  unverified: ' + rows.length);
      return rows;
    },
    verified: function () {
      var T = arrays()[0] || [];
      return T.filter(function (t) { return t.coords_verified === true; })
              .map(function (t) { return t.sno; });
    }
  };

  window.DDCanon3 = {
    sets: NEW_SETS,
    resolved: RESOLVED,
    run: run,
    rulings: function () {
      console.log('%c=== Category rulings, Session 2B.1 ===',
                  'font-weight:700;color:#1E5AA0');
      Object.keys(RESOLVED).forEach(function (k) {
        var r = RESOLVED[k];
        console.log('\n' + k + ' \u2014 ' + r.ruling);
        if (r.members) console.log('  members: #' + r.members.join(', #'));
        console.log('  ' + r.basis);
        if (r.conflict) console.log('  CONFLICT: ' + r.conflict);
        if (r.next) console.log('  next: ' + r.next);
      });
      var pend = Object.keys(window.DD_RULINGS_PENDING || {});
      console.log('\nstill pending: ' + (pend.length ? pend.join(', ') : 'none'));
      return RESOLVED;
    }
  };

  run(0);
})();
