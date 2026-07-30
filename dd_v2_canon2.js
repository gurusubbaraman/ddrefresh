/* ==================================================================
   DD v2 — CANON AMENDMENT: Nava Tirupathi        (Session 2A.3a)
   ------------------------------------------------------------------
   CANON.nava_tirupathi goes from nine members to eight.

   WHY
   ---
   The Nava Tirupathi are NINE SHRINES but only EIGHT DIVYA DESAMS.
   Two of the nine — Devapiran and Aravindalochanar at
   Tholaivillimangalam — stand about 160 m apart and together form
   the single Divya Desam called IRATTAI TIRUPATHI (irattai = twin).

   Wikipedia's Nava Tirupati table lists all nine shrines with their
   navagraha assignments, and this corpus matched it exactly, 9 for 9:

       #74 Srivaikuntam        Sun      #77 Perungulam      Saturn
       #75 Natham              Moon     #78 Tholaivilli-N   Rahu
       #72 Thirukolur          Mars     #79 Tholaivilli-S   Ketu
       #76 Thirupulingudi      Mercury
       #71 Alwarthirunagari    Jupiter
       #73 Thenthiruperai      Venus

   Session 2A.3 merges #79 into #78 because the 108 enumeration counts
   them as one. The navagraha correspondence is NOT lost — the merged
   record carries both Rahu and Ketu — but the number of RECORDS
   tagged nava_tirupathi necessarily drops to eight, so the canonical
   membership must drop with it or reconcileCategories() would stamp a
   temple that no longer exists.

   THE PILL WILL READ 8, NOT 9. That is correct and is explained on
   the merged record itself.

   ------------------------------------------------------------------
   A CORRECTION TO THE PREVIOUS SESSION NOTE
   ------------------------------------------------------------------
   The Session 2A.2 planning note stated that adding Vanamamalai
   would "complete the Nava Tirupathi set". That was wrong. It rested
   on a single tour-operator page that listed Thiruccheerivaramangai
   among the nine. Vanamamalai (Thiruvaramangai, Nanguneri) lies about
   40 km south of the Thamirabarani cluster, carries no navagraha
   assignment, and is not part of the circuit. It is an independent
   Pandya Nadu Divya Desam and one of the eight Swayam Vyakta
   Kshetrams. It is therefore placed at #45, well away from the
   #71-79 block, so no adjacency implies membership.

   LOAD ORDER — immediately after dd_v2_canon.js:
     dd_v2_canon.js
     dd_v2_canon2.js        <- this file
     dd_v2_coords.js
     ...
     dd_v2_session2a3.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_SESSION_2A3A_LOADED) return;
  window.DD_SESSION_2A3A_LOADED = true;

  function apply(tries) {
    tries = tries || 0;
    if (!window.DD_CANON) {
      if (tries > 80) { console.warn('[dd_v2_canon2] DD_CANON never arrived.'); return; }
      return setTimeout(function () { apply(tries + 1); }, 60);
    }
    var before = (window.DD_CANON.nava_tirupathi || []).slice();
    window.DD_CANON.nava_tirupathi = [71, 72, 73, 74, 75, 76, 77, 78];

    /* Re-stamp so the change reaches every corpus array immediately. */
    if (window.DDCanon && typeof window.DDCanon.reconcileCategories === 'function') {
      try { window.DDCanon.reconcileCategories(); } catch (e) {}
    }
    console.log('[dd_v2_canon2] nava_tirupathi ' + before.length + ' -> ' +
                window.DD_CANON.nava_tirupathi.length +
                ' (9 shrines = 8 Divya Desams; Irattai Tirupathi is one).');
  }

  apply(0);
})();
