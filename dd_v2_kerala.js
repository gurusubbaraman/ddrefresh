/* ==================================================================
   DD v2 — KERALA PURANA REWRITE                  (Session 2C.2)
   ------------------------------------------------------------------
   Nine Malai Nadu records receive entirely new sthala puranas in
   English and Tamil, plus corrected distinctive_features arrays.

   WHY THIS WAS NECESSARY
   ----------------------
   A content audit found that sno 87 through 95 carried puranas
   describing OTHER TEMPLES. The opening sentence of each named the
   correct Malai Nadu ordinal, which is why an earlier structural
   check passed; the body did not match. Tested against each temple's
   own defining content, eight of ten Kerala records returned NO
   MATCH:

       #87 Thrikkakara      no Vamana, no Mahabali, no Onam --
                            for the shrine where Onam originates
       #88 Thirumoozhikkalam no Lakshmana, no Bharata
       #89 Thiruvithuvakodu  no Ambarisha, no Durvasa, no Kulasekhara
       #93 Aranmula          no Arjuna, no snake-boat race

   The content was displaced rather than fabricated -- #87 held
   Thiruvalla's narrative, #88 held Thrikkakara's, #93 held
   Thiruvanvandoor's -- but not by a uniform offset, and #96 already
   held its own correct purana. Reassignment could not close the
   gaps, so all nine are written fresh.

   THE PANCHA PANDAVA CORRECTION
   -----------------------------
   The five Pandava shrines had their brothers attributed one
   position out. Every narrative was brother-specific and deeply
   woven -- #91 carried nine references to Bheema including the
   Hanuman encounter, his Vayu parentage and the mace -- so a name
   substitution would have attached the wrong mythology to the right
   temple. Each is rewritten around its canonical brother:

       #90 Thrikodithanam    SAHADEVA
       #91 Thrichittatt      YUDHISHTHIRA
       #92 Puliyur           BHEEMA
       #93 Aranmula          ARJUNA
       #95 Thiruvanvandoor   NAKULA
       #94 Thirunavay        NOT a Pandava shrine -- the Mamankam site

   SOURCES
   -------
   Wikipedia articles for each temple, garudaseva.org, divineguide.com,
   Kerala Tourism on the Aranmula Uthrattathi Vallamkali, and the
   Aranmula Palliyoda Seva Sangam. House style preserved: ordinal
   opening, primary sthala purana, then layered secondary narratives.

   #96 Thiruvalla is NOT touched -- its purana tested correct.

   LOAD ORDER -- after the baked enrichment, before filters:
     dd_v2_enrichment.js
     dd_v2_kerala.js        <- this file
     dd_v2_canon.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2C2_LOADED) return;
  window.DD_SESSION_2C2_LOADED = true;

  var KERALA = {
    "87": {
      "sthala_purana": "The FOURTH Malai Nadu Divya Desam and the shrine from which ONAM — the festival of all Kerala — takes its origin. The presiding Perumal KAATKARAI APPAN, known throughout Kerala as Thrikkakarayappan, is Vishnu in the VAMANA avatara, and the icon depicts the precise instant before the third stride: the dwarf-Brahmin raising his foot above the head of Mahabali. The primary sthala purana is the Vamana narrative itself. MAHABALI, grandson of Prahlada and an asura king of such generosity that his fame eclipsed the devas, performed a sacrifice at which no petitioner could be refused. Vishnu came as a dwarf brahmachari and asked for three paces of ground. Warned by his guru Shukracharya, Mahabali granted it regardless, because a king does not withdraw a gift. The dwarf then expanded into the cosmic Trivikrama, measuring the earth with one stride and the heavens with the second, and asked where the third should fall. Mahabali bowed and offered his own head. The second sthala purana layer is what makes this shrine Kerala's own. Vishnu, moved by that surrender, granted Mahabali a boon: he might return once each year to see whether his people were still content. That annual homecoming IS Onam, and Kerala keeps it not as the defeat of an asura but as the visit of a beloved king. Thrikkakara is where he is received. The temple's own records contain the EARLIEST KNOWN REFERENCE TO ONAM, an inscription dated 861 CE — meaning the festival has been observed at this spot for over eleven centuries in unbroken sequence. During Onam the Thrikkakarayappan is worshipped in every Malayali household in the form of a conical clay mound set on the floor and encircled by the pookkalam, the flower carpet: a domestic replica of this sanctum, repeated in millions of homes. The third sthala purana layer concerns the temple's foundation, attributed to PARASHURAMA, who by tradition raised the land of Kerala from the sea and established its shrines. The complex is one of the largest in Kerala, its inner sanctum ringed by the CHUTTUVILAKKU, a continuous circuit of several thousand oil lamps lit at Onam so that the whole enclosure becomes a single ring of flame. Two tanks serve the shrine — the Kapila Theertham, reserved for the priests, and the outer tank used for the Aarattu procession. The fourth sthala purana layer is the Alwar connection. The shrine is sung by NAMMALVAR, and its Thayar SRI PERUNCHELVANAYAGI, also called Vathsalyavalli, is Lakshmi as abundance freely given — the theological companion to Mahabali's own open-handedness. Devotees come seeking release from pride, the grace to give without calculation, and the blessing of a homecoming.",
      "sthala_purana_ta": "நான்காவது மலைநாட்டு திவ்யதேசம்; கேரளம் முழுவதும் கொண்டாடப்படும் ஓணம் திருநாளின் பிறப்பிடம். இங்குள்ள காட்கரை அப்பன் — கேரளத்தில் திருக்காக்கரையப்பன் என அறியப்படுபவர் — வாமன அவதாரத்தில் எழுந்தருளியுள்ளார். மூன்றாவது அடியை வைப்பதற்கு முந்திய அந்த நொடியே திருமேனியில் பொறிக்கப்பட்டுள்ளது: மகாபலியின் தலைமீது திருவடியை உயர்த்திய குறள் வடிவம். மூல ஸ்தல புராணம் வாமன வரலாறே. பிரகலாதனின் பேரனும், தேவர்களையும் மிஞ்சும் புகழ் கொண்ட வள்ளலுமான மகாபலி, யாசகர் எவரும் வெறுங்கையுடன் திரும்பக்கூடாத யாகம் ஒன்றை நடத்தினான். விஷ்ணு குறள் வடிவ பிரம்மசாரியாக வந்து மூன்றடி மண் வேண்டினார். சுக்கிராசாரியார் எச்சரித்தும், கொடுத்த வாக்கை மன்னன் மீளப்பெற மாட்டான் என்பதால் மகாபலி அளித்தான். அப்போது குறள் வடிவம் திரிவிக்ரமனாக வளர்ந்து, ஓரடியால் பூமியையும் மற்றொன்றால் விண்ணையும் அளந்து, மூன்றாவது அடி எங்கே என்று வினவியது. மகாபலி தலைவணங்கி தன் சிரத்தையே காட்டினான். இரண்டாம் அடுக்கு புராணமே இத்தலத்தைக் கேரளத்திற்கு உரியதாக்குகிறது. அந்தச் சரணாகதியால் மகிழ்ந்த இறைவன், ஆண்டுக்கு ஒருமுறை தன் மக்கள் நலமாக இருக்கிறார்களா என்று பார்க்க வரலாம் என வரம் அளித்தார். அந்த வருகையே ஓணம். கேரளம் அதை அசுரனின் தோல்வியாக அல்ல, அன்பு மன்னனின் வருகையாகவே கொண்டாடுகிறது. அவனை வரவேற்கும் இடம் திருக்காக்கரை. இக்கோயிலின் கல்வெட்டுகளில் ஓணத்தைப் பற்றிய மிகப் பழமையான குறிப்பு — கி.பி. 861 — காணப்படுகிறது; ஆயிரத்து நூறு ஆண்டுகளுக்கும் மேலாக இத்திருவிழா இவ்விடத்தில் தொடர்ந்து நடைபெறுகிறது. ஓணக் காலத்தில் ஒவ்வொரு மலையாள வீட்டிலும் திருக்காக்கரையப்பன் கூம்பு வடிவ மண் உருவமாக நிலத்தில் வைக்கப்பட்டு, சுற்றிலும் பூக்களம் இடப்படுகிறது — இக்கருவறையின் இல்லத்து வடிவம், லட்சக்கணக்கான வீடுகளில் திரும்பத் திரும்ப. மூன்றாம் அடுக்கு கோயிலின் தோற்றம். கடலிலிருந்து கேரள நிலத்தை எழுப்பி ஆலயங்களை நிறுவிய பரசுராமரால் இது ஸ்தாபிக்கப்பட்டதாக மரபு கூறுகிறது. கேரளத்தின் மிகப்பெரிய கோயில் வளாகங்களில் ஒன்றான இதன் உட்பிரகாரத்தைச் சுற்றி சுற்றுவிளக்கு — பல்லாயிரம் அகல் விளக்குகளின் தொடர் வரிசை — ஓணத்தன்று ஏற்றப்பட்டு வளாகம் முழுவதும் ஒரே தீ வளையமாகும். கபில தீர்த்தமும் ஆராட்டுக்கான வெளிக்குளமும் இத்தலத்திற்கு உரியன. நான்காம் அடுக்கு ஆழ்வார் தொடர்பு. நம்மாழ்வாரால் மங்களாசாசனம் செய்யப்பட்டது. தாயார் ஸ்ரீ பெருஞ்செல்வநாயகி — வாத்சல்யவல்லி என்றும் அழைக்கப்படுபவர் — கணக்கின்றி வழங்கும் செல்வமாக லக்ஷ்மி; மகாபலியின் வள்ளன்மைக்கு இணையான இறையியல் துணை. செருக்கு நீங்கவும், எதிர்பார்ப்பின்றி அளிக்கும் அருள் பெறவும், மீண்டும் இல்லம் திரும்பும் பேறு வேண்டியும் பக்தர்கள் இங்கு வருகிறார்கள்.",
      "distinctive_features": [
        "The origin shrine of ONAM — Kerala's state festival, celebrated across all communities",
        "Temple records carry the earliest known reference to Onam, an inscription of 861 CE",
        "Vamana caught at the instant before the third stride, foot raised above Mahabali",
        "Thrikkakarayappan is replicated in every Malayali home at Onam as a conical clay mound within the pookkalam",
        "The Chuttuvilakku — several thousand lamps ringing the inner enclosure, lit at Onam",
        "Foundation attributed to Parashurama, who by tradition raised Kerala from the sea",
        "Kapila Theertham within the walls, reserved to the priests; the outer tank serves the Aarattu",
        "Mahabali honoured as a beloved king rather than a defeated asura — the distinctively Kerala reading"
      ],
      "distinctive_features_ta": [
        "ஓணத்தின் பிறப்பிடம் — கேரள மாநிலத் திருநாள்",
        "கி.பி. 861 கல்வெட்டு — ஓணம் பற்றிய மிகப் பழமையான குறிப்பு",
        "மூன்றாம் அடிக்கு முந்திய நொடியில் மகாபலி தலைமீது திருவடி உயர்த்திய வாமனர்",
        "ஓணத்தன்று ஒவ்வொரு மலையாள இல்லத்திலும் பூக்களத்தினுள் மண் வடிவமாக வழிபடப்படும் திருக்காக்கரையப்பன்",
        "சுற்றுவிளக்கு — உட்பிரகாரத்தைச் சுற்றி பல்லாயிரம் அகல் விளக்குகள்",
        "பரசுராமரால் ஸ்தாபிக்கப்பட்டதாக மரபு",
        "கபில தீர்த்தம் மற்றும் ஆராட்டுக்கான வெளிக்குளம்",
        "மகாபலி தோற்ற அசுரனாக அல்லாமல் அன்பு மன்னனாகப் போற்றப்படுதல்"
      ],
      "unique_note": "Among the 108, this is the shrine whose festival escaped the temple entirely. Onam is kept by Malayalis of every faith and none, and the clay Thrikkakarayappan appears in homes that may never visit the sanctum. No other Divya Desam has projected itself so completely into the domestic life of a whole people.",
      "unique_note_ta": "நூற்றெட்டில், தன் திருவிழா கோயிலை விட்டு வெளியேறிய தலம் இதுவே. ஓணத்தை எல்லா சமயத்து மலையாளிகளும் கொண்டாடுகின்றனர்; கருவறையைக் காணாத இல்லங்களிலும் மண் திருக்காக்கரையப்பன் எழுந்தருளுகிறார்.",
      "alwar_note": "Sung by Nammalvar. The shrine stands in the Ernakulam belt and is the first of the northern Kerala group on the Malai Nadu circuit.",
      "alwar_note_ta": "நம்மாழ்வார் மங்களாசாசனம். எர்ணாகுளம் பகுதியில், மலைநாட்டு வடபகுதி தலங்களில் முதன்மையானது."
    },
    "88": {
      "sthala_purana": "The FIFTH Malai Nadu Divya Desam and one of the very few temples anywhere in India where LAKSHMANA is the presiding form. The Perumal MOOZHIKKALATHAN — known locally as Lakshmana Swamy and in Sanskrit as Sri Sukthinatha Perumal — stands facing east in Nindra Thirukkolam beneath the Soundarya Vimanam. The primary sthala purana belongs to the Ramayana, and to a moment of reconciliation rather than of war. When Rama was in exile, BHARATA came to the forest to beg him to return and take the throne. Seeing an army approach, LAKSHMANA — quick to anger where his brother's safety was concerned — assumed Bharata had come to secure the kingdom by force, and prepared to kill him. Rama restrained him. Bharata's innocence was revealed within moments: he had come not to claim but to plead, and would carry Rama's sandals back to rule in their name. Ashamed of his suspicion, Lakshmana came to this place with Bharata, and the two brothers worshipped here together. The second sthala purana layer is in the name. THIRUMOOZHIKKALAM is traditionally derived from tiru-mozhi-kalam, the place of sweet words spoken — the words that passed between the brothers when suspicion gave way to understanding. The Lord who received that reconciliation took the form of Lakshmana himself, and it is in that form that he is worshipped. Devotees come to this shrine for the healing of estrangement within families, and particularly between brothers. The third sthala purana layer is the NALAMBALAM YATRA, the pilgrimage to the four shrines of the four sons of Dasharatha, undertaken in the Malayalam month of Karkidakam: Rama at Thriprayar, Bharata at Irinjalakuda, Lakshmana here at Moozhikkulam, and Shatrughna at Payammal. All four must be visited in a single day. This shrine is therefore held in common by two great traditions — the Sri Vaishnava Divya Desam canon and the Kerala Nalambalam circuit — and pilgrims of both kinds meet at its gate. The sage HARITHA is said to have received the Lord's darshan here, and the temple is one of the few in Kerala where KOODIYATTAM, the classical Sanskrit theatre, is still performed in the koothambalam. The fourth sthala purana layer is the Alwar record. Both NAMMALVAR and THIRUMANGAI ALWAR sang here, an unusual double Mangalasasanam for a Kerala shrine. The Thayar is SRI MADHURAVENI — she of the sweet braided hair — and the Perunkulam and Sanga Theerthams serve the temple, which stands on the Chalakkudy river.",
      "sthala_purana_ta": "ஐந்தாவது மலைநாட்டு திவ்யதேசம்; இந்தியாவிலேயே லக்ஷ்மணர் மூலவராக எழுந்தருளியுள்ள மிகச் சில கோயில்களில் ஒன்று. மூழிக்களத்தான் — உள்ளூரில் லக்ஷ்மண சுவாமி, வடமொழியில் ஸ்ரீ சுக்தினாத பெருமாள் — சௌந்தர்ய விமானத்தின் கீழ் கிழக்கு நோக்கி நின்ற திருக்கோலத்தில் அருள்கிறார். மூல ஸ்தல புராணம் ராமாயணத்தைச் சார்ந்தது; ஆனால் போரின் தருணம் அல்ல, சமரசத்தின் தருணம். ராமர் வனவாசத்தில் இருந்தபோது, பரதன் அவரை நாடு திரும்பி முடிசூட வேண்டி காட்டிற்கு வந்தான். படை வருவதைக் கண்ட லக்ஷ்மணன் — தமையனின் நலனில் விரைந்து சினம் கொள்பவன் — பரதன் நாட்டைக் கைப்பற்ற வருகிறான் என எண்ணி அவனைக் கொல்லத் துணிந்தான். ராமர் தடுத்தார். பரதனின் நிரபராதம் அக்கணமே வெளிப்பட்டது: அவன் உரிமை கொண்டாட அல்ல, வேண்டவே வந்திருந்தான்; ராமரின் பாதுகைகளை ஏந்திச் சென்று அவற்றின் பெயரால் ஆளப்போகிறவன். தன் ஐயத்திற்காக வெட்கமுற்ற லக்ஷ்மணன் பரதனுடன் இவ்விடம் வந்து, இருவரும் இணைந்து வழிபட்டனர். இரண்டாம் அடுக்கு பெயரிலேயே உள்ளது. திருமூழிக்களம் என்பது திரு-மொழி-களம் — இனிய சொற்கள் பேசப்பட்ட களம் — ஐயம் நீங்கி புரிதல் பிறந்தபோது சகோதரர்களிடையே பரிமாறப்பட்ட சொற்கள். அச்சமரசத்தை ஏற்ற இறைவன் லக்ஷ்மணரின் வடிவமே கொண்டார்; அவ்வடிவிலேயே வழிபடப்படுகிறார். குடும்பங்களில் — சிறப்பாக சகோதரர்களிடையே — பிரிவு நீங்க பக்தர்கள் இத்தலம் நாடுகின்றனர். மூன்றாம் அடுக்கு நாலம்பல யாத்திரை. தசரதனின் நான்கு மைந்தர்களின் நான்கு தலங்களை கர்க்கடக மாதத்தில் ஒரே நாளில் தரிசிக்கும் மரபு: திருப்பிரயாரில் ராமர், இரிஞ்சாலக்குடாவில் பரதன், இங்கு மூழிக்குளத்தில் லக்ஷ்மணன், பாயம்மலில் சத்ருக்னன். ஆகவே இத்தலம் இரு பெரும் மரபுகளுக்கு உரியது — ஸ்ரீ வைஷ்ணவ திவ்யதேசப் பட்டியலும் கேரள நாலம்பல வட்டமும் — இரு சாராரும் இவ்வாயிலில் சந்திக்கின்றனர். ஹாரித முனிவர் இங்கு இறைவனின் தரிசனம் பெற்றார் என்பர். கூடியாட்டம் என்னும் செம்மொழி நாடகம் இன்றும் கூத்தம்பலத்தில் நிகழ்த்தப்படும் மிகச் சில கேரளக் கோயில்களில் இதுவும் ஒன்று. நான்காம் அடுக்கு ஆழ்வார் பதிவு. நம்மாழ்வாரும் திருமங்கை ஆழ்வாரும் இருவரும் பாடியுள்ளனர் — கேரளத் தலத்திற்கு அரிதான இரட்டை மங்களாசாசனம். தாயார் ஸ்ரீ மதுரவேணி. பெருங்குளம், சங்க தீர்த்தங்கள்; சாலக்குடி ஆற்றங்கரையில் அமைவிடம்.",
      "distinctive_features": [
        "One of very few temples in India where Lakshmana is the presiding form",
        "The Lord took Lakshmana's own form to receive the brothers' reconciliation",
        "Thirumoozhikkalam derives from tiru-mozhi-kalam, the place of sweet words spoken",
        "One of the four Nalambalam shrines — Rama, Bharata, Lakshmana, Shatrughna — visited in a single day in Karkidakam",
        "Held in common by the Sri Vaishnava Divya Desam canon and the Kerala Nalambalam circuit",
        "Sought for the healing of estrangement between brothers and within families",
        "Koodiyattam, the classical Sanskrit theatre, is still performed in its koothambalam",
        "Sung by both Nammalvar and Thirumangai Alwar — a rare double Mangalasasanam for Kerala"
      ],
      "distinctive_features_ta": [
        "லக்ஷ்மணர் மூலவராக எழுந்தருளிய இந்தியாவின் மிகச் சில கோயில்களில் ஒன்று",
        "சகோதரர்களின் சமரசத்தை ஏற்க இறைவனே லக்ஷ்மண வடிவம் கொண்டது",
        "திரு-மொழி-களம் — இனிய சொற்கள் பேசப்பட்ட களம்",
        "நாலம்பலத்தின் நான்கு தலங்களில் ஒன்று; கர்க்கடகத்தில் ஒரே நாளில் தரிசனம்",
        "திவ்யதேச மரபும் நாலம்பல மரபும் பகிரும் தலம்",
        "சகோதரப் பிணக்கு நீங்க வேண்டப்படும் தலம்",
        "கூத்தம்பலத்தில் இன்றும் நிகழ்த்தப்படும் கூடியாட்டம்",
        "நம்மாழ்வார், திருமங்கை ஆழ்வார் இருவரின் மங்களாசாசனம்"
      ],
      "unique_note": "The Nalambalam Yatra requires all four brothers to be seen between sunrise and the closing of the shrines, so pilgrims arrive here in the middle of a day already half spent — and the Lord they meet is the brother who once drew his bow in error, standing now in the place named for the words that corrected him.",
      "unique_note_ta": "நாலம்பல யாத்திரை ஒரே நாளில் நான்கு சகோதரரையும் தரிசிக்க வேண்டும் என்பதால், பாதி கழிந்த பொழுதில் பக்தர்கள் இங்கு வந்து சேர்கின்றனர் — தவறுதலாக வில்லேந்திய சகோதரனை, அத்தவறைத் திருத்திய சொற்களின் பெயர் கொண்ட களத்தில்.",
      "alwar_note": "Sung by both Nammalvar and Thirumangai Alwar. The double attestation is unusual among the thirteen Kerala shrines.",
      "alwar_note_ta": "நம்மாழ்வார், திருமங்கை ஆழ்வார் இருவரும் பாடியுள்ளனர்; பதின்மூன்று கேரளத் தலங்களில் அரிது."
    },
    "89": {
      "sthala_purana": "The SIXTH Malai Nadu Divya Desam and the ONLY shrine among the 108 sung EXCLUSIVELY by KULASEKHARA ALWAR. The Perumal UYYAVANTHA — the Lord who lifts up and saves — stands facing south in Nindra Thirukkolam beneath the Thathva Kanchana Vimanam, and is titled ABHAYA PRADHAN, the giver of refuge, and AABHATHSAHAAYAR, the one who comes to aid in calamity. The primary sthala purana is the trial of KING AMBARISHA. A devotee of unwavering discipline, Ambarisha had completed the Ekadasi fast and was waiting to break it in the company of the sage DURVASA, whom he had invited. The hour for breaking the fast on Dvadasi was passing and the sage had not returned from his bath. To break the fast without his guest would insult him; to let the hour pass would violate the vow. Ambarisha took only water — technically breaking the fast, technically not eating — and so kept both obligations. Durvasa, returning, took this as an affront and sent forth a demon born of his own wrath to destroy the king. Ambarisha did not flee and did not fight. He stood still. The SUDARSHANA CHAKRA came unbidden, destroyed the demon, and then pursued Durvasa himself through all the worlds until the sage, finding no refuge anywhere, returned to beg pardon of the king he had wronged. Ambarisha attained moksha at this shrine. The second sthala purana layer is what the story means. The Lord here does not rescue the devotee who calls loudest; he rescues the one who stands still and does not defend himself. That is why the epithet is Abhaya Pradhan. The third sthala purana layer is Kulasekhara's. The Alwar dedicated the entire fifth decade of his Perumal Thirumozhi — ten verses — to this Lord alone, addressing him as Vithuvakkodu Ammaan. The decade is among the most quoted expressions of SARANAGATI in the whole Alwar canon. In it he likens himself to an infant that clings to its mother's feet even as she pushes it away in anger, and declares that though the Lord reject him he has nowhere else to go. No other Divya Desam carries a single Alwar's testimony so exclusively. The fourth sthala purana layer is architectural. The temple is one of Kerala's ANCHUMOORTHI shrines, with five sanctums — four for Vishnu in his Vyuha manifestations and one for Shiva — an arrangement found almost nowhere else. Tradition holds that the Pandavas, during their forest exile, reached the Bharathapuzha here and worshipped the Lord from the four directions. The Thayar is SRI VITHUVAKOTTU VALLI, also called Padmapani Nachiyar, and the Chakra Theertham recalls the discus that came without being summoned.",
      "sthala_purana_ta": "ஆறாவது மலைநாட்டு திவ்யதேசம்; நூற்றெட்டில் குலசேகர ஆழ்வார் ஒருவரால் மட்டுமே பாடப்பட்ட ஒரே தலம். உய்யவந்த பெருமாள் — உயர்த்தி காப்பவர் — தத்துவ காஞ்சன விமானத்தின் கீழ் தெற்கு நோக்கி நின்ற திருக்கோலத்தில் அருள்கிறார்; அபயப்பிரதான் என்றும், ஆபத்சகாயர் என்றும் திருநாமம். மூல ஸ்தல புராணம் அம்பரீஷ மன்னனின் சோதனை. தளராத விரதம் கொண்ட அம்பரீஷன் ஏகாதசி விரதம் முடித்து, தான் அழைத்திருந்த துர்வாச முனிவருடன் பாரணை செய்யக் காத்திருந்தான். துவாதசி பாரணைக்கான நேரம் கடந்துகொண்டிருந்தது; முனிவர் நீராடி வரவில்லை. விருந்தினர் இன்றி உண்பது அவமதிப்பு; நேரம் கடந்தால் விரதபங்கம். அம்பரீஷன் நீரை மட்டும் ஏற்றான் — விரதம் முடித்ததாகவும் ஆயிற்று, உண்ணாததாகவும் ஆயிற்று — இரு கடமைகளையும் காத்தான். திரும்பிய துர்வாசர் இதை அவமதிப்பாகக் கொண்டு, தன் சினத்திலிருந்து ஒரு அசுரனைத் தோற்றுவித்து மன்னனை அழிக்க ஏவினார். அம்பரீஷன் ஓடவுமில்லை, எதிர்க்கவுமில்லை. அசையாமல் நின்றான். சுதர்சன சக்கரம் அழைக்காமலே வந்து அசுரனை அழித்து, பின் துர்வாசரையே எல்லா உலகங்களிலும் துரத்தியது; எங்கும் புகலிடம் காணாத முனிவர் தான் இழைத்த தவறுக்காக மன்னனிடமே மன்னிப்பு வேண்டி மீண்டார். அம்பரீஷன் இத்தலத்தில் முக்தி பெற்றான். இரண்டாம் அடுக்கு இக்கதையின் பொருள். இங்குள்ள இறைவன் உரக்கக் கூவும் பக்தனை அல்ல, அசையாமல் நின்று தன்னைத் தானே காத்துக்கொள்ளாத பக்தனையே காக்கிறார். அதனாலேயே அபயப்பிரதான். மூன்றாம் அடுக்கு குலசேகரருடையது. ஆழ்வார் தமது பெருமாள் திருமொழியின் ஐந்தாம் பதிகம் முழுவதையும் — பத்துப் பாசுரங்கள் — வித்துவக்கோட்டு அம்மான் என விளித்து இவ்விறைவனுக்கே அர்ப்பணித்தார். ஆழ்வார் பாசுரங்களிலேயே சரணாகதியின் மிக அதிகம் மேற்கோள் காட்டப்படும் வெளிப்பாடு இதுவே. சினந்து தள்ளினாலும் தாயின் திருவடியைப் பற்றும் குழந்தையாகத் தன்னை உவமித்து, இறைவன் புறக்கணித்தாலும் வேறு புகலிடம் இல்லை என்கிறார். ஒரே ஆழ்வாரின் சாட்சியை இவ்வளவு தனித்துக் கொண்ட திவ்யதேசம் வேறில்லை. நான்காம் அடுக்கு கட்டிடம் சார்ந்தது. கேரளத்தின் அஞ்சுமூர்த்தி ஆலயங்களில் ஒன்று — நான்கு விஷ்ணு வ்யூக சன்னிதிகளும் ஒரு சிவ சன்னிதியும் — வேறெங்கும் காணக்கிடைக்காத அமைப்பு. வனவாசக் காலத்தில் பாண்டவர்கள் பாரதப்புழை கரையில் இங்கு வந்து நான்கு திசைகளிலிருந்தும் வழிபட்டதாக மரபு. தாயார் ஸ்ரீ வித்துவக்கோட்டு வல்லி, பத்மபாணி நாச்சியார். அழைக்காமல் வந்த சக்கரத்தை நினைவூட்டும் சக்ர தீர்த்தம்.",
      "distinctive_features": [
        "The ONLY Divya Desam sung exclusively by Kulasekhara Alwar — the whole fifth decade of Perumal Thirumozhi",
        "Among the most quoted expressions of saranagati in the Alwar canon: the infant clinging though pushed away",
        "Abhaya Pradhan, the giver of refuge; Aabhathsahaayar, who comes to aid in calamity",
        "The Ambarisha legend — the Sudarshana came unbidden and pursued Durvasa through all the worlds",
        "One of Kerala's Anchumoorthi temples: five sanctums, four Vishnu Vyuha forms and one Shiva",
        "The Lord faces south, unusual among the Divya Desams",
        "Thathva Kanchana Vimanam over the sanctum; Chakra Theertham recalls the unsummoned discus",
        "The Pandavas are said to have worshipped here from the four directions during their exile"
      ],
      "distinctive_features_ta": [
        "குலசேகர ஆழ்வார் ஒருவரால் மட்டுமே பாடப்பட்ட ஒரே திவ்யதேசம் — பெருமாள் திருமொழி ஐந்தாம் பதிகம் முழுவதும்",
        "சரணாகதியின் மிகச் சிறந்த வெளிப்பாடு — தள்ளினாலும் தாயைப் பற்றும் குழந்தை",
        "அபயப்பிரதான், ஆபத்சகாயர்",
        "அம்பரீஷ வரலாறு — அழைக்காமல் வந்த சுதர்சனம் துர்வாசரைத் துரத்தியது",
        "கேரள அஞ்சுமூர்த்தி ஆலயம் — ஐந்து சன்னிதிகள், நான்கு வ்யூக வடிவங்களும் ஒரு சிவனும்",
        "திவ்யதேசங்களில் அரிதான தெற்கு நோக்கிய திருமுகம்",
        "தத்துவ காஞ்சன விமானம்; சக்ர தீர்த்தம்",
        "வனவாசத்தில் பாண்டவர்கள் நான்கு திசைகளிலிருந்து வழிபட்ட தலம்"
      ],
      "unique_note": "Kulasekhara was a king who left a throne. That the one shrine he claimed for himself alone should be the shrine of a king who kept his vow by taking only water is not likely to be accidental — both stories turn on a sovereign who will not defend himself.",
      "unique_note_ta": "குலசேகரர் அரியணையைத் துறந்த மன்னர். தான் மட்டும் பாடிய ஒரே தலம், நீரை மட்டும் ஏற்று விரதம் காத்த மன்னனின் தலமாக அமைந்தது தற்செயலன்று — இரு கதைகளும் தன்னைக் காத்துக்கொள்ள மறுத்த அரசனையே மையமாகக் கொண்டவை.",
      "alwar_note": "Sung by Kulasekhara Alwar alone, ten pasurams, Perumal Thirumozhi decade five. No other Alwar attests this shrine.",
      "alwar_note_ta": "குலசேகர ஆழ்வார் மட்டும் — பத்துப் பாசுரங்கள், பெருமாள் திருமொழி ஐந்தாம் பதிகம். வேறு ஆழ்வார் பாடவில்லை."
    },
    "90": {
      "sthala_purana": "The SEVENTH Malai Nadu Divya Desam and the shrine of SAHADEVA, youngest of the five Pandavas. The Perumal ATHPUDHA NARAYANA — the Wondrous Narayana, also called Amrutha Narayana — stands six feet tall facing east beneath the Punyakoti Vimanam. The primary sthala purana belongs to the PANCHA PANDAVA cluster of Kerala. After the Kurukshetra war, having crowned Parikshit at Hastinapura, the five brothers left on pilgrimage and came to the banks of the Pampa. Each installed an image of Krishna at a separate place, and those five shrines together form one of the most coherent pilgrimage circuits in the Divya Desam canon: Yudhishthira at Thrichittatt, Bheema at Puliyur, Arjuna at Aranmula, Nakula at Thiruvanvandoor, and SAHADEVA HERE at Thrikodithanam. Sahadeva was the youngest, the son of Madri through the Ashwini Kumaras, and among the brothers he was the one who KNEW. Tradition holds that he possessed complete knowledge of past, present and future, and was bound by a condition: if he revealed what he knew before being asked, his head would shatter. He therefore spent the war in silence, seeing every outcome and speaking none of it. That a man who knew everything should install an image of the Lord called ATHPUDHA — the Wondrous, that which exceeds knowing — is the theological centre of this shrine. The second sthala purana layer is the story of KING RUKMANGADA of the Surya Vamsa, who observed the Ekadasi vrata with such rigour that he commanded his whole kingdom to keep it, and by the merit accumulated sent his subjects to Devaloka. The vrata is still kept here with particular strictness, and the temple observes a monthly SRAVANA DEEPAM, a festival of lights on the Sravana asterism. The third sthala purana layer is a smaller and stranger tale. A temple servant, delaying the opening of the sanctum doors and leaving the waiting devotees without darshan, was cursed by the deity and turned to stone. His figure still stands before the temple — a warning, kept in the open, that the Lord's household exists for those who come to see him. The fourth sthala purana layer is architectural. The sanctum is circular in the Kerala manner, copper-roofed on a granite base, with carved wooden ceilings and mural panels depicting the Ramayana and the Mahabharata. Sung by NAMMALVAR. The Thayar is SRI KARPAGAVALLI, she of the wish-granting tree, and the Bhoomi Theertham serves the shrine.",
      "sthala_purana_ta": "ஏழாவது மலைநாட்டு திவ்யதேசம்; பாண்டவர்களில் இளையவனான சகதேவனின் திருத்தலம். அற்புத நாராயணப் பெருமாள் — அம்ருத நாராயணன் என்றும் அழைக்கப்படுபவர் — புண்யகோடி விமானத்தின் கீழ் ஆறடி உயரத்தில் கிழக்கு நோக்கி நின்று அருள்கிறார். மூல ஸ்தல புராணம் கேரளத்தின் பஞ்ச பாண்டவ தலங்களைச் சார்ந்தது. குருஷேத்திரப் போருக்குப் பின், அஸ்தினாபுரத்தில் பரீக்ஷித்துக்கு முடிசூட்டிய ஐவரும் யாத்திரை புறப்பட்டு பம்பை ஆற்றங்கரை வந்தடைந்தனர். ஒவ்வொருவரும் தனித்தனி இடங்களில் கண்ணனை பிரதிஷ்டை செய்தனர்; அவ்வைந்து தலங்களும் சேர்ந்து திவ்யதேச மரபின் மிக இணக்கமான யாத்திரை வட்டங்களில் ஒன்றாகின்றன: திருச்சிற்றாற்றில் தர்மர், திருப்புலியூரில் பீமன், ஆரண்முளாவில் அர்ஜுனன், திருவண்வண்டூரில் நகுலன், இங்கு திருக்கடித்தானத்தில் சகதேவன். மாத்ரிக்கு அசுவினி தேவர்கள் அருளால் பிறந்த இளையவனான சகதேவன், சகோதரர்களில் அறிந்தவன். இறந்த, நிகழ், எதிர்காலம் அனைத்தும் அவனுக்குத் தெரியும்; ஆனால் ஒரு நிபந்தனை — கேட்கப்படாமல் அறிந்ததைச் சொன்னால் தலை வெடிக்கும். ஆகவே போர் முழுவதும் மௌனமாக இருந்தான்; எல்லா முடிவுகளையும் கண்டு எதையும் சொல்லவில்லை. எல்லாம் அறிந்தவன் அற்புதன் — அறிதலைக் கடந்தவன் — என்னும் திருநாமம் கொண்ட இறைவனை பிரதிஷ்டை செய்தது இத்தலத்தின் இறையியல் மையம். இரண்டாம் அடுக்கு சூரிய வம்ச மன்னன் ருக்மாங்கதனின் வரலாறு. ஏகாதசி விரதத்தை மிகுந்த கண்டிப்புடன் கடைப்பிடித்து, தன் நாடு முழுவதையும் அவ்விரதம் காக்கச் செய்து, சேர்ந்த புண்ணியத்தால் குடிமக்களை தேவலோகம் அடையச் செய்தான். இன்றும் இங்கு ஏகாதசி விரதம் சிறப்பாகக் கடைப்பிடிக்கப்படுகிறது; மாதந்தோறும் திருவோண நாளில் ஸ்ரவண தீபம் நடைபெறுகிறது. மூன்றாம் அடுக்கு சிறிய, விந்தையான கதை. கருவறைக் கதவைத் திறக்கத் தாமதித்து, காத்திருந்த பக்தர்களைத் தரிசனமின்றி வைத்த கோயில் ஊழியன் இறைவனால் சபிக்கப்பட்டுக் கல்லானான். அவ்வுருவம் இன்றும் கோயில் முன் நிற்கிறது — இறைவனின் இல்லம் அவரைக் காண வருவோருக்கே என்னும் வெளிப்படையான எச்சரிக்கை. நான்காம் அடுக்கு கட்டிடம். கேரள முறையில் வட்டக் கருவறை, கருங்கல் அடித்தளத்தில் செம்புக் கூரை, செதுக்கிய மரக் கூரைகள், ராமாயண மகாபாரதக் காட்சிகள் தீட்டிய சுவரோவியங்கள். நம்மாழ்வார் மங்களாசாசனம். தாயார் ஸ்ரீ கற்பகவல்லி; பூமி தீர்த்தம்.",
      "distinctive_features": [
        "The shrine of SAHADEVA, youngest of the Pandavas — one of the five Pancha Pandava Divya Desams",
        "Sahadeva knew past, present and future, but would die if he spoke unasked — he passed the war in silence",
        "Athpudha Narayana, the Wondrous: the Lord who exceeds knowing, installed by the brother who knew everything",
        "King Rukmangada's Ekadasi vrata — he sent his whole kingdom to Devaloka by its merit",
        "The stone servant before the temple, cursed for delaying the opening of the sanctum",
        "Monthly Sravana Deepam, the festival of lights on the Sravana asterism",
        "Circular Kerala sanctum, copper roof on granite, murals of the Ramayana and Mahabharata",
        "Punyakoti Vimanam; Bhoomi Theertham; sung by Nammalvar"
      ],
      "distinctive_features_ta": [
        "பாண்டவர்களில் இளையவனான சகதேவனின் தலம் — பஞ்ச பாண்டவ திவ்யதேசங்களில் ஒன்று",
        "முக்காலமும் அறிந்தும், கேட்காமல் சொன்னால் மரணம் என்பதால் போர் முழுவதும் மௌனம்",
        "அற்புத நாராயணன் — அறிதலைக் கடந்தவர்; எல்லாம் அறிந்தவனால் பிரதிஷ்டை",
        "ருக்மாங்கத மன்னனின் ஏகாதசி விரதம்",
        "கருவறை திறக்கத் தாமதித்துச் சபிக்கப்பட்ட கல்லான ஊழியன்",
        "மாதந்தோறும் ஸ்ரவண தீபம்",
        "வட்டக் கருவறை, செம்புக் கூரை, ராமாயண மகாபாரத ஓவியங்கள்",
        "புண்யகோடி விமானம்; பூமி தீர்த்தம்; நம்மாழ்வார் மங்களாசாசனம்"
      ],
      "unique_note": "Of the five brothers, Sahadeva alone could see what was coming and was forbidden to say it. The Lord he chose is named for what cannot be known in advance. The shrine holds those two facts together without resolving them.",
      "unique_note_ta": "ஐவரில் சகதேவன் மட்டுமே வருவதைக் கண்டான், சொல்ல முடியவில்லை. அவன் தேர்ந்த இறைவனின் திருநாமமோ முன்கூட்டி அறிய முடியாததைக் குறிக்கிறது. இவ்விரு உண்மைகளையும் தலம் இணைத்து வைத்திருக்கிறது.",
      "alwar_note": "Sung by Nammalvar. One of the five Pancha Pandava shrines of the Chengannur region.",
      "alwar_note_ta": "நம்மாழ்வார் மங்களாசாசனம். செங்கன்னூர் பகுதியின் பஞ்ச பாண்டவ தலங்களில் ஒன்று."
    },
    "91": {
      "sthala_purana": "The EIGHTH Malai Nadu Divya Desam and the shrine of YUDHISHTHIRA, eldest of the five Pandavas. The Perumal IMAYAVARAPPAN stands four-armed in Nindra Thirukkolam bearing the conch Panchajanya and the discus Sudarshana, on the bank of the Chittar where it joins the Pampa. The primary sthala purana is Yudhishthira's atonement. He was called DHARMAPUTRA, the son of Dharma itself, and in a life measured by truth he told one lie. At Kurukshetra, to break Drona's will to fight, he was asked to announce that Ashwatthama was dead — knowing the Ashwatthama who had died was an elephant, not Drona's son. He said the words, and added the qualification so softly that it was lost. Drona laid down his weapons and was killed. The war was won, and the man who had never lied had lied once, in a whisper, and it had been enough. After the war, on pilgrimage with his brothers, Yudhishthira installed the image here in expiation. This is the shrine of the half-truth — of the person who is not guilty of falsehood exactly, and cannot claim honesty either. The second sthala purana layer is in the name. IMAYAVARAPPAN means the Lord of the imayavar, the celestial beings, and records that the devas worshipped at this spot BEFORE the Pandavas arrived. The brothers did not consecrate new ground; they came to a place already sanctified and added their own need to it. The sage BHRIGU is associated with persuading the Pandavas to establish the shrines of this region. The third sthala purana layer is geographic. Thrichittatt stands at the confluence of the Chittar with the Pampa, and the temple's older name THIRUCHENGUNROOR knits together the place, the river and the Lord's title in the way Nammalvar's own verses do. Of the five Pandava shrines this is the first in sequence, and pilgrims begin the circuit here. The fourth sthala purana layer is the Alwar record. NAMMALVAR sang eleven pasurams on this shrine and no other Alwar attests it. The Thayar is SRI SENGAMALAVALLI, she of the red lotus, and the Sanga Theertham serves the temple beneath the Jagajyothi Vimanam. Devotees come for relief from the burden of a compromise made under pressure — the particular weight Yudhishthira carried here.",
      "sthala_purana_ta": "எட்டாவது மலைநாட்டு திவ்யதேசம்; பாண்டவர்களில் மூத்தவனான தர்மபுத்திரனின் திருத்தலம். இமையவரப்பன் பெருமாள் பாஞ்சஜன்யமும் சுதர்சனமும் ஏந்தி நான்கு திருக்கரங்களுடன் நின்ற திருக்கோலத்தில், சிற்றாறு பம்பையுடன் கலக்கும் கரையில் அருள்கிறார். மூல ஸ்தல புராணம் தர்மரின் பரிகாரம். தர்மத்தின் மகன் என்றே அழைக்கப்பட்டவர், உண்மையால் அளக்கப்பட்ட வாழ்வில் ஒரேயொரு பொய் சொன்னார். குருஷேத்திரத்தில் துரோணரின் போர் வேட்கையை முறிக்க, அஸ்வத்தாமன் இறந்தான் என அறிவிக்கும்படி கேட்கப்பட்டார் — இறந்தது துரோணரின் மகன் அல்ல, அப்பெயர் கொண்ட யானை என அறிந்தும். அச்சொற்களைச் சொல்லி, விளக்கத்தை மிக மெல்லிய குரலில் சேர்த்தார்; அது கேட்கவில்லை. துரோணர் ஆயுதம் துறந்தார், கொல்லப்பட்டார். போர் வெல்லப்பட்டது; பொய் சொல்லாதவர் ஒருமுறை, முணுமுணுப்பாகப் பொய் சொன்னார்; அது போதுமானதாக இருந்தது. போருக்குப் பின் சகோதரருடன் யாத்திரையில் வந்த தர்மர் பரிகாரமாக இங்கு பிரதிஷ்டை செய்தார். இது அரைப்பொய்யின் தலம் — பொய்யன் என்று சொல்ல முடியாத, நேர்மையாளன் என்றும் உரிமை கொள்ள முடியாத மனிதனின் தலம். இரண்டாம் அடுக்கு திருநாமத்தில். இமையவரப்பன் என்பது இமையவர் — தேவர்களின் — இறைவன்; பாண்டவர்கள் வருவதற்கு முன்பே தேவர்கள் இவ்விடத்தில் வழிபட்டதைப் பதிவு செய்கிறது. சகோதரர்கள் புதிய நிலத்தைப் புனிதப்படுத்தவில்லை; ஏற்கனவே புனிதமான இடத்திற்கு வந்து தம் தேவையைச் சேர்த்தனர். இப்பகுதித் தலங்களை நிறுவும்படி பாண்டவர்களைத் தூண்டியவர் பிருகு முனிவர் என்பர். மூன்றாம் அடுக்கு நிலவியல். சிற்றாறு பம்பையுடன் சங்கமிக்கும் இடத்தில் திருச்சிற்றாறு அமைந்துள்ளது; திருச்செங்குன்றூர் என்னும் பழம்பெயர் ஊரையும் ஆற்றையும் இறைவனின் திருநாமத்தையும் நம்மாழ்வார் பாசுரங்கள் போலவே பின்னிக்கொள்கிறது. ஐந்து பாண்டவத் தலங்களில் இதுவே முதலாவது; யாத்திரை இங்கிருந்தே தொடங்குகிறது. நான்காம் அடுக்கு ஆழ்வார் பதிவு. நம்மாழ்வார் பதினொரு பாசுரங்கள் பாடியுள்ளார்; வேறு ஆழ்வார் பாடவில்லை. தாயார் ஸ்ரீ செங்கமலவல்லி; ஜகஜ்யோதி விமானத்தின் கீழ் சங்க தீர்த்தம். நெருக்கடியில் செய்த சமரசத்தின் சுமையிலிருந்து விடுதலை வேண்டி பக்தர்கள் இங்கு வருகிறார்கள்.",
      "distinctive_features": [
        "The shrine of YUDHISHTHIRA, eldest Pandava and son of Dharma — first of the five Pancha Pandava Divya Desams",
        "Installed in expiation for the half-truth about Ashwatthama that brought down Drona",
        "Imayavarappan means Lord of the imayavar — the devas worshipped here BEFORE the Pandavas came",
        "The brothers consecrated no new ground; they added their need to a place already holy",
        "Stands at the confluence of the Chittar with the Pampa",
        "The sage Bhrigu persuaded the Pandavas to establish the shrines of this region",
        "Sung by Nammalvar alone, eleven pasurams",
        "Jagajyothi Vimanam; Sanga Theertham; Thayar Sengamalavalli of the red lotus"
      ],
      "distinctive_features_ta": [
        "மூத்த பாண்டவன் தர்மபுத்திரனின் தலம் — பஞ்ச பாண்டவத் தலங்களில் முதன்மையானது",
        "துரோணரை வீழ்த்திய அஸ்வத்தாமன் அரைப்பொய்க்குப் பரிகாரமாக நிறுவப்பட்டது",
        "இமையவரப்பன் — பாண்டவர்களுக்கு முன்பே தேவர்கள் வழிபட்ட தலம்",
        "புதிய நிலத்தை அல்ல, ஏற்கனவே புனிதமான இடத்தைத் தேர்ந்தது",
        "சிற்றாறு பம்பையுடன் சங்கமிக்கும் இடம்",
        "இப்பகுதித் தலங்களை நிறுவத் தூண்டிய பிருகு முனிவர்",
        "நம்மாழ்வார் மட்டும் — பதினொரு பாசுரங்கள்",
        "ஜகஜ்யோதி விமானம்; சங்க தீர்த்தம்; தாயார் செங்கமலவல்லி"
      ],
      "unique_note": "The Mahabharata does not let Yudhishthira off. His chariot, which had ridden a hand's breadth above the earth because of his truthfulness, touched the ground the moment he spoke. This shrine is what he did afterwards.",
      "unique_note_ta": "மகாபாரதம் தர்மரை விடுவிக்கவில்லை. உண்மையால் நிலத்திற்கு மேலே சிறிது உயரத்தில் சென்ற அவரது தேர், அச்சொல்லைச் சொன்ன கணமே தரையைத் தொட்டது. அதற்குப் பின் அவர் செய்ததே இத்தலம்.",
      "alwar_note": "Sung by Nammalvar alone, eleven pasurams. First of the five Pandava shrines in sequence.",
      "alwar_note_ta": "நம்மாழ்வார் மட்டும் — பதினொரு பாசுரங்கள். ஐந்து பாண்டவத் தலங்களில் முதலாவது."
    },
    "92": {
      "sthala_purana": "The NINTH Malai Nadu Divya Desam and the shrine of BHEEMA, second of the five Pandavas. The Perumal MAYAPIRAN — the Lord of Divine Mystery, known locally as Thripuliyoorappan — is enshrined beneath the Purushasukta Vimanam. The primary sthala purana is Bheema's. He was the son of Madri's co-queen Kunti through VAYU, the wind, and from that divine fathering came a strength that had no equal among men and no restraint either. Bheema was the brother who acted — who carried Draupadi when she could not walk, who tore Dushasana, who broke Duryodhana's thigh — and whose every virtue was also his flaw. After the war, arriving at the Pampa with his brothers, he installed the image of Krishna here. That the strongest of the five should choose to worship the Lord under the name MAYAPIRAN, the mystery that cannot be forced or grasped, is the theological point of the shrine: strength is brought here to be set down. The second sthala purana layer belongs to the SAPTARISHIS. The seven great sages — Atri, Vasishtha, Kashyapa, Gautama, Bharadvaja, Vishvamitra and Jamadagni — are said to have received the darshan of Mayapiran together with Porkodi Nachiyar at this place, and through the intercession of Indra attained liberation. Few shrines in the canon claim all seven at once. The third sthala purana layer concerns VIRUKSHADHARBI, son of the great donor Sibi Chakravarti. His kingdom fell into flood and famine, its wealth and beauty draining away, and the remedy was found here. The temple is thus sought by those whose circumstances have collapsed through no fault of their own — the counterpart to Bheema's own predicament, a man whose gifts kept producing consequences he had not chosen. The fourth sthala purana layer is festival practice. The ARATU in the Tamil month of Margazhi and the KAVADIATTAM in Thai are the great observances here, the latter unusual at a Vishnu temple and a mark of how thoroughly this shrine belongs to its Kerala setting. Sung by NAMMALVAR. The Thayar is SRI PORKODI NACHIYAR, the golden creeper, and the temple stands at Puliyoor near Chengannur on the Pampa.",
      "sthala_purana_ta": "ஒன்பதாவது மலைநாட்டு திவ்யதேசம்; பாண்டவர்களில் இரண்டாமவனான பீமனின் திருத்தலம். மாயப்பிரான் பெருமாள் — உள்ளூரில் திருப்புலியூரப்பன் — புருஷசூக்த விமானத்தின் கீழ் எழுந்தருளியுள்ளார். மூல ஸ்தல புராணம் பீமனுடையது. குந்திக்கு வாயு பகவான் அருளால் பிறந்தவன்; அத்தெய்வத் தந்தைமையிலிருந்து மனிதரில் இணையற்ற வலிமையும், அதற்கேற்ற கட்டுப்பாடின்மையும் வந்தன. செயல்படும் சகோதரன் பீமன் — நடக்க இயலாத திரௌபதியைத் தூக்கிச் சென்றவன், துச்சாதனனைப் பிளந்தவன், துரியோதனனின் தொடையை முறித்தவன் — அவனது ஒவ்வொரு நற்குணமும் அவனது குறையாகவும் இருந்தது. போருக்குப் பின் சகோதரருடன் பம்பை வந்தடைந்து இங்கு கண்ணனைப் பிரதிஷ்டை செய்தான். ஐவரில் வலிமையானவன், வலுக்கட்டாயமாகப் பற்ற முடியாத மாயமே வடிவான மாயப்பிரான் என்னும் திருநாமத்தில் இறைவனை வழிபடத் தேர்ந்தது இத்தலத்தின் இறையியல் கருத்து: வலிமை இங்கு இறக்கிவைக்கப்படுகிறது. இரண்டாம் அடுக்கு சப்தரிஷிகளுடையது. அத்ரி, வசிஷ்டர், காசியபர், கௌதமர், பரத்வாஜர், விஸ்வாமித்திரர், ஜமதக்னி ஆகிய ஏழு பெரும் முனிவர்களும் பொற்கொடி நாச்சியாருடன் கூடிய மாயப்பிரானின் தரிசனம் பெற்று, இந்திரனின் வேண்டுகோளால் முக்தி அடைந்தனர் என்பர். ஏழு முனிவரையும் ஒருங்கே உரிமை கொள்ளும் தலங்கள் அரிது. மூன்றாம் அடுக்கு விருக்ஷதர்பியுடையது — வள்ளல் சிபி சக்கரவர்த்தியின் மகன். அவனது நாடு வெள்ளத்திலும் பஞ்சத்திலும் சிக்கி, செல்வமும் அழகும் வற்றியபோது, தீர்வு இங்கு கிடைத்தது. தம் தவறின்றி நிலைமை சரிந்தவர்கள் இத்தலம் நாடுகின்றனர் — தான் தேர்ந்தெடுக்காத விளைவுகளைத் தன் ஆற்றலே தொடர்ந்து உருவாக்கிய பீமனின் நிலைக்கு இணையானது. நான்காம் அடுக்கு விழா மரபு. மார்கழி ஆராட்டும் தை காவடியாட்டமும் இங்கு சிறப்பு; விஷ்ணு ஆலயத்தில் காவடி அரிது, இத்தலம் தன் கேரள சூழலுடன் எவ்வளவு ஆழமாகக் கலந்துள்ளது என்பதற்கான அடையாளம். நம்மாழ்வார் மங்களாசாசனம். தாயார் ஸ்ரீ பொற்கொடி நாச்சியார்; பம்பைக் கரையில் செங்கன்னூர் அருகே புலியூரில் அமைவிடம்.",
      "distinctive_features": [
        "The shrine of BHEEMA, second Pandava and son of Vayu — one of the five Pancha Pandava Divya Desams",
        "The strongest of the brothers worships the Lord as Mayapiran, the mystery that cannot be forced",
        "All SEVEN Saptarishis received darshan here together and attained liberation through Indra's intercession",
        "Virukshadharbi, son of Sibi Chakravarti, found remedy here when his kingdom fell to flood and famine",
        "Sought by those whose circumstances have collapsed through no fault of their own",
        "Kavadiattam in Thai — unusual at a Vishnu temple, a mark of deep Kerala rooting",
        "Aratu festival in Margazhi; Purushasukta Vimanam over the sanctum",
        "Sung by Nammalvar; Thayar Sri Porkodi Nachiyar, the golden creeper"
      ],
      "distinctive_features_ta": [
        "வாயு மைந்தன் பீமனின் தலம் — பஞ்ச பாண்டவத் தலங்களில் ஒன்று",
        "ஐவரில் வலிமையானவன் வலுவால் பற்ற முடியாத மாயப்பிரானை வழிபட்டது",
        "ஏழு சப்தரிஷிகளும் ஒருங்கே தரிசனம் பெற்று முக்தி அடைந்த தலம்",
        "சிபி மகன் விருக்ஷதர்பியின் நாடு பஞ்சத்தில் சிக்கியபோது தீர்வு கிடைத்த இடம்",
        "தம் தவறின்றி நிலை சரிந்தோர் நாடும் தலம்",
        "தை காவடியாட்டம் — விஷ்ணு ஆலயத்தில் அரிது",
        "மார்கழி ஆராட்டு; புருஷசூக்த விமானம்",
        "நம்மாழ்வார் மங்களாசாசனம்; தாயார் பொற்கொடி நாச்சியார்"
      ],
      "unique_note": "Bheema is the brother whose strength solved everything and settled nothing. The name he chose for the Lord here — Mayapiran, the one who cannot be seized — reads as an admission.",
      "unique_note_ta": "பீமனின் வலிமை அனைத்தையும் தீர்த்தது, எதையும் அமைதிப்படுத்தவில்லை. இங்கு அவன் தேர்ந்த திருநாமம் — பற்ற முடியாத மாயப்பிரான் — ஒரு ஒப்புதலாகவே ஒலிக்கிறது.",
      "alwar_note": "Sung by Nammalvar. One of the five Pancha Pandava shrines of the Chengannur region.",
      "alwar_note_ta": "நம்மாழ்வார் மங்களாசாசனம். செங்கன்னூர் பஞ்ச பாண்டவத் தலங்களில் ஒன்று."
    },
    "93": {
      "sthala_purana": "The TENTH Malai Nadu Divya Desam and the shrine of ARJUNA, third of the five Pandavas — one of the most celebrated Krishna temples in Kerala. The Perumal PARTHASARATHY, called THIRUKKURALAPPAN in the pasurams, is Krishna as the charioteer of Partha, standing on the southern bank of the Pampa beneath the Vamana Vimanam. The primary sthala purana is Arjuna's expiation. At Kurukshetra he killed KARNA while Karna was unarmed and struggling to free his chariot wheel from the earth — a killing outside the dharma of war, urged on him by Krishna himself. The victory was necessary and the act was wrong, and Arjuna had to live with both. On pilgrimage after the war he installed the image of Krishna here in atonement, choosing to worship not the Lord of the universe but the Lord who had sat in front of him in the chariot and told him to shoot. The second sthala purana layer is in the name. The image was first consecrated at NILAKKAL in the hills, and was later brought downriver on a RAFT LASHED FROM SIX LENGTHS OF BAMBOO. Aranmula takes its name from that raft — aaru mula, six bamboos — and the place where it came ashore is where the temple stands. Tradition holds that BHUMI DEVI herself re-dedicated the image here. The third sthala purana layer is the most famous living tradition attached to any Divya Desam: the ARANMULA UTHRATTATHI VALLAMKALI, the snake-boat regatta held on the Pampa during Onam. Its origin is not sport. Krishna appeared in a dream to the Bhattathiri of Kattoor Mangadu Illam and asked that a feast be brought to the temple each Thiruvonam. The Bhattathiri began sending the THIRUVONATHONI, the Onam boat, and when he was once attacked by bandits on the water the people of the surrounding villages came out in their own boats to escort him. They have never stopped. The PALLIYODAMS — Aranmula's snake boats, taller and larger than the chundans of Kuttanad, each dedicated to the temple and each carrying up to fifteen men standing at its centre — still accompany the Thiruvonathoni every year, rowed to the vanjippattu boat songs. What the world watches as a race began as an armed guard for a meal. The VALLASADYA, the boat feast, remains a temple offering that devotees sponsor by vow. The fourth sthala purana layer is the temple's wider role. Aranmula is a station on the route of the THIRUVABHARANAM, Ayyappan's sacred jewels carried annually from Pandalam to Sabarimala, and it holds the THANKA ANKI, the golden attire given by the king of Travancore, which travels to Sabarimala each Mandala season. The village is also the sole home of the ARANMULA KANNADI, the polished metal mirror made by one family of artisans and made nowhere else on earth. The eastern gopuram is reached by eighteen steps and the northern by fifty-seven down to the river; the walls carry murals of the early eighteenth century. Sung by NAMMALVAR in Thiruvaimozhi 7.10 and by THIRUMANGAI ALWAR — twelve pasurams in all. The Thayar is SRI PADMASANI NACHIYAR.",
      "sthala_purana_ta": "பத்தாவது மலைநாட்டு திவ்யதேசம்; பாண்டவர்களில் மூன்றாமவனான அர்ஜுனனின் திருத்தலம்; கேரளத்தின் மிகப் புகழ்பெற்ற கண்ணன் கோயில்களில் ஒன்று. பார்த்தசாரதிப் பெருமாள் — பாசுரங்களில் திருக்குறளப்பன் — பார்த்தனின் தேரோட்டியாக, பம்பையின் தென்கரையில் வாமன விமானத்தின் கீழ் அருள்கிறார். மூல ஸ்தல புராணம் அர்ஜுனனின் பரிகாரம். குருஷேத்திரத்தில், தேர்ச்சக்கரம் நிலத்தில் புதைந்து ஆயுதமற்று நின்ற கர்ணனை அவர் கொன்றார் — போர் தர்மத்திற்குப் புறம்பான செயல், கண்ணனாலேயே தூண்டப்பட்டது. வெற்றி தேவையாக இருந்தது, செயல் தவறாக இருந்தது; இரண்டுடனும் அர்ஜுனன் வாழ வேண்டியிருந்தது. போருக்குப் பின் யாத்திரையில் பரிகாரமாக இங்கு கண்ணனைப் பிரதிஷ்டை செய்தார் — அண்டத்தின் இறைவனாக அல்ல, தேரில் தன் முன்னே அமர்ந்து எய்யச் சொன்ன இறைவனாகவே வழிபடத் தேர்ந்தார். இரண்டாம் அடுக்கு பெயரில். திருமேனி முதலில் மலைப்பகுதியில் நிலக்கலில் பிரதிஷ்டை செய்யப்பட்டு, பின்னர் ஆறு மூங்கில் கழிகளால் கட்டிய தெப்பத்தில் ஆற்றில் கொணரப்பட்டது. ஆறு மூங்கில் — ஆறன்முள — என்பதிலிருந்தே ஆரண்முளா என்னும் பெயர்; அத்தெப்பம் கரை சேர்ந்த இடத்திலேயே கோயில். பூமிதேவியே இங்கு மீண்டும் பிரதிஷ்டை செய்தார் என்பர். மூன்றாம் அடுக்கு எந்தத் திவ்யதேசத்திற்கும் உரிய மிகப் புகழ்பெற்ற வாழும் மரபு: ஓணக்காலத்தில் பம்பையில் நடைபெறும் ஆரண்முளா உத்திருட்டாதி வள்ளம்களி. அதன் தோற்றம் விளையாட்டு அல்ல. கட்டூர் மங்காட்டு இல்லத்து பட்டத்திரியின் கனவில் தோன்றிய கண்ணன், ஒவ்வொரு திருவோணத்திலும் கோயிலுக்கு விருந்து கொணரும்படி வேண்டினார். பட்டத்திரி திருவோணத்தோணி அனுப்பத் தொடங்கினார்; ஒருமுறை நீரில் கொள்ளையரால் தாக்கப்பட்டபோது சுற்றுக் கிராம மக்கள் தம் படகுகளில் வந்து அவரைப் பாதுகாத்தனர். அன்றிலிருந்து அது நிற்கவில்லை. பள்ளியோடங்கள் — குட்டநாட்டுச் சுண்டன்களை விட உயரமும் பெரியவையுமான ஆரண்முளாப் பாம்புப் படகுகள், ஒவ்வொன்றும் கோயிலுக்கே அர்ப்பணிக்கப்பட்டவை, நடுவே பதினைந்து பேர் வரை நிற்கக்கூடியவை — இன்றும் ஆண்டுதோறும் திருவோணத்தோணியுடன் வஞ்சிப்பாட்டுக்கு ஏற்பத் துடுப்பிட்டுச் செல்கின்றன. உலகம் போட்டியாகக் காண்பது, ஒரு விருந்துக்கான ஆயுதக் காவலாகவே தொடங்கியது. வள்ளசத்யா — படகு விருந்து — இன்றும் பக்தர்கள் நேர்த்திக்கடனாக நடத்தும் கோயில் நிவேதனம். நான்காம் அடுக்கு கோயிலின் பரந்த பங்கு. பந்தளத்திலிருந்து சபரிமலைக்கு ஆண்டுதோறும் செல்லும் ஐயப்பனின் திருவாபரணப் பாதையில் ஆரண்முளா ஒரு நிலையம்; திருவிதாங்கூர் மன்னர் அளித்த தங்க அங்கியும் இங்கேயே பாதுகாக்கப்பட்டு மண்டல காலத்தில் சபரிமலை செல்கிறது. உலகில் வேறெங்கும் செய்யப்படாத ஆரண்முளா கண்ணாடி — ஒரே கைவினைஞர் குடும்பத்தால் செய்யப்படும் உலோகக் கண்ணாடி — இவ்வூரின் தனிச்சிறப்பு. கிழக்கு கோபுரத்திற்கு பதினெட்டுப் படிகள், வடக்கு கோபுரத்திலிருந்து ஆற்றுக்கு ஐம்பத்தேழு படிகள்; சுவர்களில் பதினெட்டாம் நூற்றாண்டு ஓவியங்கள். நம்மாழ்வார் திருவாய்மொழி 7.10-இலும் திருமங்கை ஆழ்வாரும் பாடியுள்ளனர் — மொத்தம் பன்னிரண்டு பாசுரங்கள். தாயார் ஸ்ரீ பத்மாசனி நாச்சியார்.",
      "distinctive_features": [
        "The shrine of ARJUNA, third Pandava — installed in expiation for killing Karna while he was unarmed",
        "Aranmula means aaru mula, six bamboos — the raft that carried the image downriver from Nilakkal",
        "The Uthrattathi Vallamkali, Kerala's oldest river boat festival, held on the Pampa during Onam",
        "The regatta began as an armed escort for the Thiruvonathoni, the Onam feast-boat, after bandits attacked it",
        "The Palliyodams are dedicated to this temple — taller than Kuttanad chundans, fifteen men standing amidships",
        "A station on the Thiruvabharanam route carrying Ayyappan's jewels from Pandalam to Sabarimala",
        "Holds the Thanka Anki, Ayyappan's golden attire given by the king of Travancore",
        "Sole home of the Aranmula Kannadi, the metal mirror made by one family and nowhere else on earth"
      ],
      "distinctive_features_ta": [
        "அர்ஜுனனின் தலம் — ஆயுதமற்ற கர்ணனைக் கொன்ற பாவத்திற்குப் பரிகாரம்",
        "ஆறு மூங்கில் தெப்பத்திலிருந்து வந்த ஆரண்முளா என்னும் பெயர்",
        "ஓணக்காலத்தில் பம்பையில் உத்திருட்டாதி வள்ளம்களி — கேரளத்தின் தொன்மையான படகுத் திருவிழா",
        "கொள்ளையர் தாக்கியபின் திருவோணத்தோணிக்கு அளித்த காவலிலிருந்து தொடங்கிய படகுப் போட்டி",
        "இக்கோயிலுக்கே அர்ப்பணிக்கப்பட்ட பள்ளியோடங்கள்",
        "பந்தளத்திலிருந்து சபரிமலைக்கான திருவாபரணப் பாதையின் நிலையம்",
        "திருவிதாங்கூர் மன்னர் அளித்த தங்க அங்கி இங்கே பாதுகாப்பு",
        "உலகில் வேறெங்கும் இல்லாத ஆரண்முளா கண்ணாடியின் ஊர்"
      ],
      "unique_note": "Arjuna did not install the cosmic Vishnu here. He installed the charioteer — the friend who sat with his back to him through eighteen days and told him, at the worst moment, to shoot anyway. The shrine is addressed to the one who shares the responsibility.",
      "unique_note_ta": "அர்ஜுனன் இங்கு அண்டவடிவை நிறுவவில்லை; தேரோட்டியை நிறுவினார் — பதினெட்டு நாள் அவனுக்கு முதுகு காட்டி அமர்ந்து, மிக மோசமான தருணத்தில் எய்யச் சொன்ன நண்பனை. பொறுப்பைப் பகிர்ந்துகொண்டவரையே இத்தலம் விளிக்கிறது.",
      "alwar_note": "Sung by Nammalvar in Thiruvaimozhi 7.10 and by Thirumangai Alwar — twelve pasurams, a double attestation unusual among the Kerala shrines.",
      "alwar_note_ta": "நம்மாழ்வார் திருவாய்மொழி 7.10; திருமங்கை ஆழ்வாரும் பாடியுள்ளார் — பன்னிரண்டு பாசுரங்கள்."
    },
    "94": {
      "sthala_purana": "The ELEVENTH Malai Nadu Divya Desam, on the northern bank of the Bharathapuzha, and the only Kerala Divya Desam where Lakshmi has a sanctum entirely her own. The Perumal NAVAMUKUNDA stands facing east, four-armed, bearing the Panchajanya conch, the lotus, the Kaumodaki mace and the Sudarshana discus, beneath the Veda Vimanam. The primary sthala purana explains the name and the strangest fact about the image. NINE YOGIS, great in Vedic knowledge, came to this place wishing to install the Lord. Eight times an image was consecrated and eight times it SANK INTO THE EARTH. The ninth image began to sink as the others had and was arrested at the knees. It stands there still. The Lord is therefore worshipped from the knees upward, and is called NAVAMUKUNDA, the ninth Mukunda — a name that counts the failures rather than concealing them. The second sthala purana layer is the contest of lotuses. GAJENDRA, king of elephants, and LAKSHMI herself both worshipped Vishnu at this place, and both gathered lotuses from the same lake. As the flowers grew scarce the two came into competition, and Gajendra, unable to find enough, appealed to the Lord. Vishnu's solution was to seat Lakshmi beside him and accept the worship of both together. It is because of this that Lakshmi has her own separate sreekovil here — an arrangement found in no other Kerala Narayana shrine, and the architectural record of a quarrel resolved by inclusion rather than judgment. The third sthala purana layer is the river. Thirunavay is among the foremost sites in South India for PITRU TARPANAM, the rites offered to ancestors, and the Bharathapuzha bank here is likened to the ghats of Varanasi. Families come from across Kerala to perform the annual offering. The fourth sthala purana layer is historical. This riverbank hosted the MAMANKAM, the great assembly held once in twelve years from early medieval times, at which the rulers of Kerala gathered and the Zamorin's supremacy was contested by the suicide-warriors called chavers. For centuries the temple stood at the centre of the political life of the whole region. Sung by both NAMMALVAR — the eleven-verse decade Thiruvaimozhi 9.8, which repeatedly names the Lord who dwells at nal naavaay, good Thirunavay — and THIRUMANGAI ALWAR, thirteen pasurams in all. The Thayar is SRI MALARMANGAI NACHIYAR, also called Sirudevi.",
      "sthala_purana_ta": "பதினொன்றாவது மலைநாட்டு திவ்யதேசம்; பாரதப்புழையின் வடகரையில்; லக்ஷ்மிக்கு முற்றிலும் தனியான சன்னிதி உள்ள ஒரே கேரள திவ்யதேசம். நவமுகுந்தப் பெருமாள் வேத விமானத்தின் கீழ் கிழக்கு நோக்கி, பாஞ்சஜன்யம், தாமரை, கௌமோதகி கதை, சுதர்சனம் ஏந்திய நான்கு திருக்கரங்களுடன் நின்றருள்கிறார். மூல ஸ்தல புராணம் திருநாமத்தையும், திருமேனியின் மிக விந்தையான உண்மையையும் விளக்குகிறது. வேத ஞானத்தில் சிறந்த ஒன்பது யோகியர் இறைவனைப் பிரதிஷ்டை செய்ய இவ்விடம் வந்தனர். எட்டு முறை திருமேனி பிரதிஷ்டை செய்யப்பட்டு எட்டு முறையும் நிலத்தில் அமிழ்ந்தது. ஒன்பதாவது திருமேனியும் அமிழத் தொடங்கி முழங்கால் அளவில் நின்றது. இன்றும் அவ்வாறே நிற்கிறது. ஆகவே இறைவன் முழங்காலிலிருந்து மேல்நோக்கியே வழிபடப்படுகிறார்; நவமுகுந்தன் — ஒன்பதாம் முகுந்தன் — என்னும் திருநாமம், தோல்விகளை மறைக்காமல் எண்ணிச் சொல்கிறது. இரண்டாம் அடுக்கு தாமரைப் போட்டி. யானையரசன் கஜேந்திரனும் லக்ஷ்மியும் இவ்விடத்தில் விஷ்ணுவை வழிபட்டனர்; இருவரும் ஒரே தடாகத்திலிருந்தே தாமரை பறித்தனர். மலர்கள் குறையவே இருவரிடையே போட்டி எழுந்தது; போதிய மலர் கிடைக்காத கஜேந்திரன் இறைவனிடம் முறையிட்டான். இறைவனின் தீர்வு — லக்ஷ்மியைத் தன்னருகே அமர்த்தி இருவரின் வழிபாட்டையும் ஒருங்கே ஏற்றது. அதனாலேயே இங்கு லக்ஷ்மிக்குத் தனி ஸ்ரீகோவில்; வேறெந்த கேரள நாராயணத் தலத்திலும் இல்லாத அமைப்பு, தீர்ப்பால் அல்லாமல் சேர்த்துக்கொள்வதால் தீர்ந்த பிணக்கின் கட்டிடப் பதிவு. மூன்றாம் அடுக்கு ஆறு. பித்ரு தர்ப்பணத்திற்குத் தென்னிந்தியாவின் முதன்மையான தலங்களில் திருநாவாய் ஒன்று; இங்குள்ள பாரதப்புழைக் கரை காசிக் கட்டங்களுக்கு ஒப்பிடப்படுகிறது. கேரளம் முழுவதிலிருந்தும் குடும்பங்கள் ஆண்டுத் தர்ப்பணத்திற்கு வருகின்றன. நான்காம் அடுக்கு வரலாறு. இக்கரையிலேயே மாமாங்கம் நடைபெற்றது — பன்னிரண்டு ஆண்டுகளுக்கு ஒருமுறை கூடிய பெருஞ்சபை, கேரள மன்னர்கள் ஒன்றுகூடி, சாமூதிரியின் மேலாண்மையைச் சாவேர் வீரர்கள் எதிர்த்த களம். நூற்றாண்டுகளாக இக்கோயில் பிராந்திய அரசியல் வாழ்வின் மையமாக இருந்தது. நம்மாழ்வார் திருவாய்மொழி 9.8 பதிகத்தில் — நல் நாவாயில் உறையும் இறைவனை மீண்டும் மீண்டும் பெயர் சொல்லி — பாடியுள்ளார்; திருமங்கை ஆழ்வாரும் பாடியுள்ளார்; மொத்தம் பதின்மூன்று பாசுரங்கள். தாயார் ஸ்ரீ மலர்மங்கை நாச்சியார், சிறுதேவி.",
      "distinctive_features": [
        "NOT a Pancha Pandava shrine — Thirunavay is the Mamankam site, and its Divya Desam identity is entirely separate",
        "The Navayogis' nine images: eight sank into the earth, the ninth was stopped at the knees and stands so still",
        "The Lord is worshipped from the knees upward; Navamukunda means the ninth Mukunda",
        "Gajendra and Lakshmi competed for lotuses from one lake — Vishnu seated her beside him and accepted both",
        "The only Kerala Narayana shrine where Lakshmi has a separate sreekovil of her own",
        "Among the foremost sites in South India for pitru tarpanam; the riverbank is likened to Varanasi",
        "The Mamankam, held once in twelve years, took place on this bank — the chavers against the Zamorin",
        "Sung by both Nammalvar (Thiruvaimozhi 9.8) and Thirumangai Alwar — thirteen pasurams"
      ],
      "distinctive_features_ta": [
        "பஞ்ச பாண்டவத் தலம் அல்ல — திருநாவாய் மாமாங்கத்தின் களம்",
        "நவயோகியரின் ஒன்பது திருமேனிகள்; எட்டு அமிழ்ந்தன, ஒன்பதாவது முழங்காலில் நின்றது",
        "முழங்காலிலிருந்து மேல்நோக்கி வழிபாடு; நவமுகுந்தன் என்னும் திருநாமம்",
        "ஒரே தடாகத்து தாமரைக்காகக் கஜேந்திரனும் லக்ஷ்மியும் போட்டியிட்ட வரலாறு",
        "லக்ஷ்மிக்குத் தனி ஸ்ரீகோவில் உள்ள ஒரே கேரள நாராயணத் தலம்",
        "பித்ரு தர்ப்பணத்திற்கு முதன்மையான தலம்; காசிக்கு ஒப்பான கரை",
        "பன்னிரண்டு ஆண்டுகளுக்கு ஒருமுறை நடந்த மாமாங்கம்",
        "நம்மாழ்வார் திருவாய்மொழி 9.8; திருமங்கை ஆழ்வார் — பதின்மூன்று பாசுரங்கள்"
      ],
      "unique_note": "Eight consecrations failed here before one held, and the tradition kept the count in the Lord's own name. Few shrines anywhere are so willing to say how many times the thing did not work.",
      "unique_note_ta": "எட்டு பிரதிஷ்டைகள் தோற்ற பின்னரே ஒன்று நிலைத்தது; அத்தொகையை மரபு இறைவனின் திருநாமத்திலேயே பதிவு செய்தது. எத்தனை முறை தோற்றது என்பதை இவ்வளவு வெளிப்படையாகச் சொல்லும் தலங்கள் அரிது.",
      "alwar_note": "Sung by Nammalvar (Thiruvaimozhi 9.8, eleven verses) and Thirumangai Alwar. Thirteen pasurams in all.",
      "alwar_note_ta": "நம்மாழ்வார் (திருவாய்மொழி 9.8, பதினொரு பாசுரங்கள்) மற்றும் திருமங்கை ஆழ்வார். மொத்தம் பதின்மூன்று."
    },
    "95": {
      "sthala_purana": "The TWELFTH Malai Nadu Divya Desam and the shrine of NAKULA, fourth of the five Pandavas. The Perumal PAMBANAIAPPAN — the Lord who rests upon the serpent — is also worshipped as KAMALANATHAN, and the temple stands on the Pampa in the Chengannur cluster. The primary sthala purana is Nakula's. He and his twin SAHADEVA were the sons of Madri through the ASHWINI KUMARAS, the twin physicians of the devas and masters of horses, and from that fathering came the two gifts that marked him: an unrivalled knowledge of HEALING, and mastery over horses. He was also held to be the most beautiful of the five. Among the brothers Nakula is the one the Mahabharata says least about — no great vow, no central grievance, no decisive scene. He tended the horses, he healed the wounded, and he did what was required. After the war, arriving at the Pampa with his brothers, he installed the image here. The shrine of the quiet brother is sought by those whose work is unremarked: physicians, nurses, those who care for the sick and the old, and those who keep things running without ever being the reason they run. The second sthala purana layer is in the name. PAMBANAIAPPAN joins pamba — both the serpent and the river that flows past the door — to the Lord who reclines upon Adisesha. The name works in two registers at once, and the temple's setting on the riverbank makes the pun into a statement about where the divine actually rests. The third sthala purana layer is the Pancha Pandava circuit itself. Of the five brothers' shrines this is the fourth in sequence — after Thrichittatt, Puliyur and Aranmula, and before Thrikodithanam — and pilgrims performing the circuit in a single day reach it in the late afternoon. The five are close enough that the whole set can be seen between sunrise and the closing of the sanctums, which is how the tradition intends them to be taken: not as five temples but as one act of atonement divided among five men. The fourth sthala purana layer is the Alwar record. Sung by NAMMALVAR. The Thayar is SRI KAMALAVALLI NACHIYAR, she of the lotus creeper, whose name pairs with the Lord's alternative title Kamalanathan.",
      "sthala_purana_ta": "பன்னிரண்டாவது மலைநாட்டு திவ்யதேசம்; பாண்டவர்களில் நான்காமவனான நகுலனின் திருத்தலம். பாம்பணையப்பன் பெருமாள் — பாம்பணையில் பள்ளிகொள்பவர் — கமலநாதன் என்றும் வழிபடப்படுகிறார்; செங்கன்னூர்க் கூட்டத்தில் பம்பைக் கரையில் கோயில். மூல ஸ்தல புராணம் நகுலனுடையது. அவனும் இரட்டைச் சகோதரன் சகதேவனும் மாத்ரிக்கு அசுவினி தேவர்கள் அருளால் பிறந்தவர்கள் — தேவர்களின் இரட்டை வைத்தியர்கள், குதிரைகளின் தலைவர்கள். அத்தந்தைமையிலிருந்தே அவனைக் குறித்த இரு கொடைகள்: இணையற்ற மருத்துவ அறிவும், குதிரைகள் மீதான ஆளுமையும். ஐவரில் மிக அழகானவன் என்றும் கருதப்பட்டான். மகாபாரதம் மிகக் குறைவாகச் சொல்லும் சகோதரன் நகுலனே — பெரும் சபதம் இல்லை, மைய முறையீடு இல்லை, தீர்க்கமான காட்சி இல்லை. குதிரைகளைப் பராமரித்தான், காயமுற்றோரைக் குணப்படுத்தினான், தேவையானதைச் செய்தான். போருக்குப் பின் சகோதரருடன் பம்பை வந்தடைந்து இங்குப் பிரதிஷ்டை செய்தான். அமைதியான சகோதரனின் இத்தலத்தை, கவனிக்கப்படாத பணி செய்வோர் நாடுகின்றனர்: மருத்துவர்கள், செவிலியர், நோயாளரையும் முதியோரையும் பேணுவோர், தாமே காரணமாகக் கருதப்படாமல் எல்லாவற்றையும் இயங்கச் செய்பவர்கள். இரண்டாம் அடுக்கு திருநாமத்தில். பாம்பணையப்பன் என்பது பாம்பு — நாகமும், வாயிலைக் கடந்து ஓடும் ஆறும் — என்பதை ஆதிசேஷனில் பள்ளிகொள்ளும் இறைவனுடன் இணைக்கிறது. திருநாமம் ஒரே சமயத்தில் இரு பொருளில் இயங்குகிறது; ஆற்றங்கரை அமைவிடம் அச்சொல்லாட்சியை, இறைவன் உண்மையில் எங்கு பள்ளிகொள்கிறார் என்னும் கூற்றாக மாற்றுகிறது. மூன்றாம் அடுக்கு பஞ்ச பாண்டவ வட்டமே. ஐந்து தலங்களில் இது நான்காவது — திருச்சிற்றாறு, திருப்புலியூர், ஆரண்முளாவுக்குப் பின், திருக்கடித்தானத்திற்கு முன் — ஒரே நாளில் வட்டம் முடிப்போர் மாலைப்பொழுதில் இங்கு வந்து சேர்கின்றனர். ஐந்தும் அருகருகே இருப்பதால் சூரிய உதயத்திற்கும் சன்னிதி அடைப்பிற்கும் இடையே அனைத்தையும் தரிசிக்கலாம்; மரபு அவற்றை அவ்வாறே எடுத்துக்கொள்ள விரும்புகிறது — ஐந்து கோயில்களாக அல்ல, ஐவரிடையே பிரிக்கப்பட்ட ஒரே பரிகாரச் செயலாக. நான்காம் அடுக்கு ஆழ்வார் பதிவு. நம்மாழ்வார் மங்களாசாசனம். தாயார் ஸ்ரீ கமலவல்லி நாச்சியார்; இறைவனின் மற்றொரு திருநாமமான கமலநாதனுடன் இணையும் பெயர்.",
      "distinctive_features": [
        "The shrine of NAKULA, fourth Pandava — one of the five Pancha Pandava Divya Desams",
        "Nakula and Sahadeva were twins born to Madri through the Ashwini Kumaras, physicians of the devas",
        "His inheritance was healing and mastery of horses; he was held the most beautiful of the five",
        "The brother the Mahabharata says least about — no great vow, no decisive scene, only what was required",
        "Sought by physicians, nurses and those whose necessary work goes unremarked",
        "Pambanaiappan joins pamba the serpent to Pampa the river flowing past the door",
        "Fourth in sequence on the Pancha Pandava circuit, between Aranmula and Thrikodithanam",
        "Sung by Nammalvar; Thayar Sri Kamalavalli Nachiyar, pairing with the Lord's title Kamalanathan"
      ],
      "distinctive_features_ta": [
        "நான்காம் பாண்டவன் நகுலனின் தலம் — பஞ்ச பாண்டவத் தலங்களில் ஒன்று",
        "அசுவினி தேவர்கள் அருளால் மாத்ரிக்குப் பிறந்த இரட்டையர் நகுல சகதேவர்",
        "மருத்துவமும் குதிரை ஆளுமையும் அவனது உரிமை; ஐவரில் மிக அழகானவன்",
        "மகாபாரதம் மிகக் குறைவாகச் சொல்லும் சகோதரன்",
        "கவனிக்கப்படாத பணி செய்வோர் — மருத்துவர், செவிலியர் — நாடும் தலம்",
        "பாம்பணையப்பன் — நாகத்தையும் பம்பை ஆற்றையும் இணைக்கும் திருநாமம்",
        "பஞ்ச பாண்டவ வட்டத்தில் நான்காவது, ஆரண்முளாவுக்கும் திருக்கடித்தானத்திற்கும் இடையே",
        "நம்மாழ்வார் மங்களாசாசனம்; தாயார் கமலவல்லி நாச்சியார்"
      ],
      "unique_note": "Four of the five Pandava shrines commemorate a specific fault its founder was trying to answer. Nakula's does not. He had nothing particular to atone for, and came anyway.",
      "unique_note_ta": "ஐந்து பாண்டவத் தலங்களில் நான்கு, நிறுவியவர் ஈடுசெய்ய முயன்ற ஒரு குறிப்பிட்ட தவற்றை நினைவூட்டுகின்றன. நகுலனுடையது அல்ல. அவனுக்குத் தனியாகப் பரிகரிக்க எதுவும் இல்லை; இருந்தும் வந்தான்.",
      "alwar_note": "Sung by Nammalvar. Fourth in sequence on the Pancha Pandava circuit.",
      "alwar_note_ta": "நம்மாழ்வார் மங்களாசாசனம். பஞ்ச பாண்டவ வட்டத்தில் நான்காவது."
    }
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

  function run(tries) {
    tries = tries || 0;
    if (!window.DD_ENRICHMENT) {
      if (tries > 120) { console.warn('[dd_v2_kerala] enrichment never arrived.'); return; }
      return setTimeout(function () { run(tries + 1); }, 60);
    }

    var E = window.DD_ENRICHMENT, n = 0, chars = 0;

    Object.keys(KERALA).forEach(function (k) {
      var sno = parseInt(k, 10), r = KERALA[k], e = E[sno];
      if (!e) { console.warn('[dd_v2_kerala] no enrichment record for #' + sno); return; }
      Object.keys(r).forEach(function (f) { e[f] = r[f]; });
      e.canonical_note = 'Session 2C.2: sthala purana rewritten in English and Tamil. The ' +
        'previous text described a different temple. ' + (e.canonical_note || '');
      chars += r.sthala_purana.length + r.sthala_purana_ta.length;
      n++;
    });

    /* Mirror onto the fused arrays so v1 Section B reads the new text. */
    var thin = window.DD_TEMPLES;
    arrays().forEach(function (T) {
      if (T === thin) return;
      T.forEach(function (t) {
        var r = KERALA[t.sno];
        if (!r) return;
        Object.keys(r).forEach(function (f) { t[f] = r[f]; });
        t.canonical_note = E[t.sno].canonical_note;
      });
    });

    console.log('[dd_v2_kerala] Session 2C.2: ' + n + ' Kerala puranas rewritten (' +
                Math.round(chars / 1024) + ' KB bilingual). Pancha Pandava attributions corrected.');

    if (typeof window.openTemplePopup === 'function' && window.currentPopupSno) {
      setTimeout(function () {
        try { window.openTemplePopup(window.currentPopupSno); } catch (e) {}
      }, 150);
    }
  }

  window.DDKerala = {
    data: KERALA,
    run: run,
    report: function () {
      console.log('%c=== Session 2C.2 — Kerala puranas ===', 'font-weight:700;color:#1E5AA0');
      console.table(Object.keys(KERALA).map(function (k) {
        var e = (window.DD_ENRICHMENT || {})[k] || {};
        return { sno: +k,
                 en: (e.sthala_purana || '').length,
                 ta: (e.sthala_purana_ta || '').length,
                 features: (e.distinctive_features || []).length };
      }));
      console.log('Pancha Pandava: #90 Sahadeva, #91 Yudhishthira, #92 Bheema, ' +
                  '#93 Arjuna, #95 Nakula. #94 Thirunavay is not a Pandava shrine.');
      return true;
    }
  };

  run(0);
})();
