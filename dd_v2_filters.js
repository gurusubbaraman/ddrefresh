/* ==================================================================
   DD v2 — COMPOSABLE FILTER CORE  (Session F.1)
   ------------------------------------------------------------------
   Replaces DD's mutually-exclusive filtering with a PPS-style
   composable predicate chain, and lights up four things that were
   dead in v1.

   THE BUG THIS FIXES
   ------------------
   DD v1 filtered with if/else in BOTH places, so filters could never
   stack:

     buildSidebarList()   (dd_v1_patch.js)
       if (searchQuery.length > 0) return searchMatches(t);
       else                        return chipMatches(t);

     refreshMapMarkers()  (index.html inline)
       if (searchQuery) { ... } else if (activeChip !== 'all') { ... }

   Type "Kanchi" while the Chola Nadu chip is lit and the chip is
   silently ignored. PPS instead uses an AND-chain:

     function passes(t){ return tierOK && regionOK && searchOK; }

   HOW THIS PATCH COMPOSES WITHOUT REWRITING v1
   --------------------------------------------
   v1's base filter always returns a SUPERSET of the true intersection:
     - search active -> base returns searchMatches, ignoring the chip
                        (superset of search AND chip)
     - search empty  -> base returns chipMatches
                        (already the full intersection)
   So a post-filter pass can only ever need to NARROW the result, never
   widen it. That means we can leave buildSidebarList entirely alone and
   simply hide the cards that fail the full chain -- exactly the pattern
   PPS Session 2C.1 uses in refreshView(). No v1 internals are touched.

   WHAT THIS TURNS ON
   ------------------
   1. Search + Nadu chip + category + posture now stack (AND).
   2. Category pills, built from DD_CANON (8 canonical sets).
   3. The posture filter, which was a `// TODO` in v1 and never
      filtered anything. Uses the corrected posture_class, so the
      three multi-posture temples (#36, #37, #82) no longer get
      mis-binned.
   4. DDPopup.filterByNadu / filterByCategory / filterByAlwar --
      referenced by every Related-tab CTA, defined nowhere in v1.
      Every one of those cards was a dead click.

   ALSO: stamps marker._sno / marker.options.sno, which is what
   dd_phase2_enhancements.js needs for extractSno() to find anything.

   LOAD ORDER — last, after everything else:
     dd_v1_patch.js
     dd_v2_base.js
     dd_v2_enrichment.js
     dd_v2_loader.js
     dd_v2_canon.js
     dd_v2_filters.js      <- this file
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_FILTERS_LOADED) return;
  window.DD_V2_FILTERS_LOADED = true;

  /* ---------------------------------------------------------------- */
  /* 0. HELPERS                                                        */
  /* ---------------------------------------------------------------- */
  function corpus() {
    return window.DIVYA_DESAMS || window.DD_TEMPLES || [];
  }
  function enrichOf(sno) {
    if (window.DD_ENRICHMENT && window.DD_ENRICHMENT[sno]) return window.DD_ENRICHMENT[sno];
    var T = corpus();
    for (var i = 0; i < T.length; i++) if (T[i].sno === sno) return T[i];
    return null;
  }

  /* Corrected posture classifier. Kept here as a fallback so this file
     still works if dd_v2_base.js (which precomputes posture_class) is
     not loaded. `posture` is 32 distinct freeform strings. */
  function postureClass(t) {
    if (t.posture_class) return t.posture_class;
    var p = t.posture;
    if (!p) return null;
    var s = String(p).toLowerCase();

    /* GENUINELY multi-posture is decided first, but only on evidence that
       the MOOLAVAR itself holds more than one posture -- an explicit
       "Multiple", or several postures joined as equals by + / ; / and.

       What must NOT trigger it is a trailing remark that other postures
       exist elsewhere in the complex. Two records were misread that way:

         #26 Thirukoshtiyur
             "Reclining (Sayanam) - all three postures preserved in
              single complex"          -> Kidantha, not Multiple
         #81 Nagapattinam
             "Standing (Nindra) - all three postures shown in temple"
                                       -> Nindra, not Multiple

       The distinction is the separator. "Nindra + Veetrirundha + Kidantha"
       and "Standing ...; Seated ..." name co-equal postures. A dash
       followed by a descriptive clause does not. */
    var namesEquals =
         /^\s*multiple/.test(s)
      || /\+\s*(veetrirundha|kidantha|nindra|seated|standing|reclining)/.test(s)
      /* The token after a separator must be an actual POSTURE. "Ugra" is a
         form, not a posture -- #43 Thanjai reads "Standing (Nindra) at
         Mamanikoil and Manikundram; Ugra Narasimha at Thanjaiyali", and all
         three of its shrines are standing. Listing "ugra" here made it
         Multiple, which was wrong. */
      || /;\s*(seated|sitting|standing|reclining|nindra|kidantha|veetrirundha|yoga posture)/.test(s)
      || /\bsimultaneous/.test(s);

    if (namesEquals) return 'Multiple';

    /* Otherwise the LEADING posture is the moolavar's posture. */
    if (/^\s*(reclining|kidantha|sayana|bhujanga|shayana)/.test(s)) return 'Kidantha';
    if (/^\s*(standing|nindra|trivikrama)/.test(s))                 return 'Nindra';
    if (/^\s*(seated|sitting|veetrirundha|yoga posture|padmasana)/.test(s)) return 'Veetrirundha';

    /* No leading declaration: fall back to co-occurrence, then to any
       single posture named anywhere in the string. */
    var multi =
         /all three|three postures/.test(s)
      || (/standing|nindra/.test(s) && /reclining|sayana|bhujanga/.test(s))
      || (/standing|nindra/.test(s) && /seated|sitting|yoga posture|padmasana/.test(s))
      || (/reclining|sayana|bhujanga/.test(s) && /seated|sitting|padmasana/.test(s));
    if (multi) return 'Multiple';

    if (/reclining|sayana|kidantha|bhujanga|shayana|darbhasayana|sthala-sayana/.test(s)) return 'Kidantha';
    if (/seated|sitting|veetrirundha|yoga posture|padmasana|asana/.test(s)) return 'Veetrirundha';
    if (/standing|nindra|trivikrama/.test(s)) return 'Nindra';
    return null;
  }

  /* ---------------------------------------------------------------- */
  /* 1. STATE — one declarative object, PPS style                      */
  /* ---------------------------------------------------------------- */
  var state = {
    search:   '',
    nadu:     'all',          /* 'all' | region name | 'abhimana'     */
    cats:     new Set(),      /* empty = all sets                     */
    posture:  'all',          /* 'all' | Nindra | Veetrirundha | ...  */
    alwar:    null            /* null  | alwar key                    */
  };

  /* ---------------------------------------------------------------- */
  /* 2. PREDICATES — each independent, all AND-ed                      */
  /* ---------------------------------------------------------------- */
  function naduOK(t) {
    if (state.nadu === 'all') return true;
    if (state.nadu === 'abhimana') return !!t.is_abhimana;
    return !t.is_abhimana && t.region === state.nadu;
  }
  function catOK(t) {
    if (state.cats.size === 0) return true;
    var c = t.categories;
    if (!Array.isArray(c) || !c.length) return false;
    var hit = false;
    state.cats.forEach(function (slug) { if (c.indexOf(slug) >= 0) hit = true; });
    return hit;                                   /* OR within categories */
  }
  function postureOK(t) {
    if (state.posture === 'all') return true;
    /* Posture is a property of the 108. Celestial desams have no earthly
       murti, and Abhimana Kshetrams (#100 Simhachalam, #109 Mannargudi)
       are revered but sit outside the 108 by definition -- Session 2A.3.
       Neither belongs in a posture count. */
    if (t.is_celestial || t.is_abhimana) return false;
    var pc = postureClass(t);
    /* A multi-posture temple genuinely holds all three, so it should
       surface under whichever single posture the visitor picked. */
    if (pc === 'Multiple') return true;
    return pc === state.posture;
  }
  function alwarOK(t) {
    if (!state.alwar) return true;
    var e = enrichOf(t.sno);
    return !!(e && e.alwars && e.alwars[state.alwar]);
  }
  function searchOK(t) {
    var q = state.search;
    if (!q) return true;
    var gfv = window.getFieldValue || function (x, f) { return x[f] || ''; };
    var hay = [
      t.temple_name, t.temple_name_ta, t.temple_name_short,
      t.temple_name_short_ta, t.town, t.town_ta, t.district,
      t.region, gfv(t, 'temple_name'), gfv(t, 'town'),
      (window.REGION_TAMIL && window.REGION_TAMIL[t.region]) || ''
    ].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function passes(t) {
    return naduOK(t) && catOK(t) && postureOK(t) && alwarOK(t) && searchOK(t);
  }

  /* ---------------------------------------------------------------- */
  /* 3. SIDEBAR — post-filter the rendered cards (narrowing only)      */
  /* ---------------------------------------------------------------- */
  function snoOfCard(el) {
    var a = el.getAttribute('onclick') || '';
    var m = a.match(/openTemplePopup\((\d+)\)/);
    return m ? parseInt(m[1], 10) : null;
  }

  function refreshSidebar() {
    var cards = document.querySelectorAll('#temple-list .dd-temple-entry');
    if (!cards.length) return 0;
    var shown = 0;
    var bySno = {};
    corpus().forEach(function (t) { bySno[t.sno] = t; });
    cards.forEach(function (c) {
      var sno = snoOfCard(c);
      var t = sno != null ? bySno[sno] : null;
      var ok = t ? passes(t) : true;
      c.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    return shown;
  }

  /* ---------------------------------------------------------------- */
  /* 4. MAP — authoritative marker refresh                             */
  /* ---------------------------------------------------------------- */
  /* NOTE ON ORDERING. index.html installs its own MutationObserver on
     #temple-list with a 50 ms debounce, calling a closure-scoped
     refreshMapMarkers we cannot reach. Ours debounces at 130 ms so it
     always settles last, and because v1's result is a superset of
     ours, landing last is sufficient -- we only ever remove extras.
     Every pill/chip/search interaction also calls ours directly. */
  function refreshMap() {
    var group = window.templeMarkersGroup;
    var mmap  = window.templeMarkersMap;
    if (!group || !mmap) return 0;
    var visible = 0;
    corpus().forEach(function (t) {
      var m = mmap[t.sno];
      if (!m) return;                         /* celestial: no marker */
      if (!m._sno) { m._sno = t.sno; if (m.options) m.options.sno = t.sno; }
      var show   = passes(t);
      var inGrp  = group.hasLayer(m);
      if (show && !inGrp) group.addLayer(m);
      else if (!show && inGrp) group.removeLayer(m);
      if (show) visible++;
    });
    if (window.selectedTempleSno && typeof window.applyMarkerSelection === 'function') {
      setTimeout(function () { window.applyMarkerSelection(window.selectedTempleSno); }, 40);
    }
    return visible;
  }

  /* ---------------------------------------------------------------- */
  /* 5. APPLY                                                          */
  /* ---------------------------------------------------------------- */
  var applyTimer = null;
  function apply() {
    var shown = refreshSidebar();
    var vis   = refreshMap();
    updateCount(shown);
    syncPills();
    if (typeof gtag !== 'undefined') {
      gtag('event', 'dd_filter', {
        event_label: [state.nadu, [].concat(Array.from(state.cats)).join('+') || 'allsets',
                      state.posture, state.alwar || 'anyalwar',
                      state.search ? 'q' : 'noq'].join('|')
      });
    }
    return { sidebar: shown, markers: vis };
  }
  function applySoon() {
    clearTimeout(applyTimer);
    applyTimer = setTimeout(apply, 130);
  }

  function updateCount(n) {
    var el = document.getElementById('dd-filter-count');
    if (el) el.textContent = n;
  }

  /* ---------------------------------------------------------------- */
  /* 6. CATEGORY PILLS — built from DD_CANON                           */
  /* ---------------------------------------------------------------- */
  function injectCss() {
    if (document.getElementById('dd-v2-filter-css')) return;
    var s = document.createElement('style');
    s.id = 'dd-v2-filter-css';
    s.textContent = [
      '#dd-cat-row{margin:10px 0 6px}',
      '.dd-cat-label{font-size:.7rem;font-weight:700;text-transform:uppercase;',
      'letter-spacing:.6px;color:#1E5AA0;margin-bottom:6px;display:flex;',
      'justify-content:space-between;align-items:center;gap:6px}',
      '.dd-cat-count-badge{font-weight:600;color:#5a5a72;text-transform:none;letter-spacing:0}',
      '.dd-cat-list{display:flex;flex-wrap:wrap;gap:5px}',
      '.dd-cat-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;',
      'background:#fff;border:1.5px solid #EDE3CC;border-radius:12px;font-size:.7rem;',
      'font-weight:600;cursor:pointer;color:#1A1A3A;font-family:inherit;line-height:1.5;',
      'transition:background .15s,border-color .15s,color .15s}',
      '.dd-cat-pill:hover{border-color:#D4AF37}',
      '.dd-cat-pill .dd-cat-n{opacity:.6;font-weight:500}',
      '.dd-cat-pill.dd-cat-on{color:#fff}',
      '.dd-reset-row{margin:8px 0 4px}',
      '.dd-reset-btn{width:100%;padding:6px;background:#fff;border:1.5px solid #EDE3CC;',
      'border-radius:8px;font-size:.72rem;font-weight:600;cursor:pointer;',
      'color:#1E5AA0;font-family:inherit}',
      '.dd-reset-btn:hover{background:#FDF8F0;border-color:#1E5AA0}',
      /* Posture pill icons. The pill is laid out as a flex row so the
         disc, label and count sit on one baseline. object-fit:cover keeps
         the artwork circular even if a source image is not square. */
      '.posture-pill{display:inline-flex!important;align-items:center;gap:6px}',
      '.dd-posture-ico{width:20px;height:20px;border-radius:50%;flex:0 0 20px;',
      'display:inline-block;object-fit:cover;vertical-align:middle;',
      'box-shadow:0 0 0 1px rgba(0,0,0,.10)}',
      '.posture-pill.active .dd-posture-ico{box-shadow:0 0 0 1.5px rgba(255,255,255,.85)}'
    ].join('');
    document.head.appendChild(s);
  }

  function buildCatPills() {
    var host = document.getElementById('temple-list');
    if (!host || !window.DD_CANON || !window.DD_CAT_META) return;
    if (document.getElementById('dd-cat-row')) return;

    var META  = window.DD_CAT_META;
    var ICONS = window.DD_CAT_ICONS || {};
    var CANON = window.DD_CANON;
    var ta    = (window.currentLanguage === 'ta');

    var row = document.createElement('div');
    row.id = 'dd-cat-row';

    var lab = document.createElement('div');
    lab.className = 'dd-cat-label';
    lab.innerHTML = '<span>' + (ta ? 'திருத்தலத் தொகுப்புகள்' : 'Pilgrimage Sets') + '</span>' +
                    '<span class="dd-cat-count-badge"><span id="dd-filter-count">—</span>' +
                    (ta ? ' காட்டப்படுகிறது' : ' shown') + '</span>';
    row.appendChild(lab);

    var list = document.createElement('div');
    list.className = 'dd-cat-list';

    Object.keys(CANON).forEach(function (slug) {
      var meta = META[slug]; if (!meta) return;
      var n = (window.DDCanon && window.DDCanon.memberCount)
                ? window.DDCanon.memberCount(slug) : CANON[slug].length;
      var p = document.createElement('button');
      p.className = 'dd-cat-pill';
      p.setAttribute('data-cat', slug);
      p.innerHTML = (ICONS[slug] ? ICONS[slug] + ' ' : '') +
                    (ta && meta.label_ta ? meta.label_ta : meta.label) +
                    ' <span class="dd-cat-n">(' + n + ')</span>';
      p.title = meta.label + ' — ' + n + ' temples';
      p.onclick = function () {
        if (state.cats.has(slug)) state.cats.delete(slug); else state.cats.add(slug);
        apply();
      };
      list.appendChild(p);
    });
    row.appendChild(list);

    var rr = document.createElement('div');
    rr.className = 'dd-reset-row';
    var rb = document.createElement('button');
    rb.className = 'dd-reset-btn';
    rb.textContent = ta ? '✕ அனைத்து வடிகட்டிகளையும் நீக்கு' : '✕ Clear all filters';
    rb.onclick = function () { window.DDFilter.reset(); };
    rr.appendChild(rb);
    row.appendChild(rr);

    /* Sit directly under the Nadu chip row so all filters read together. */
    var chipRow = host.querySelector('.dd-chip-row');
    if (chipRow && chipRow.nextSibling) host.insertBefore(row, chipRow.nextSibling);
    else host.appendChild(row);
  }

  function syncPills() {
    var META = window.DD_CAT_META || {};
    document.querySelectorAll('.dd-cat-pill').forEach(function (p) {
      var slug = p.getAttribute('data-cat');
      var on = state.cats.has(slug);
      p.classList.toggle('dd-cat-on', on);
      p.style.background  = on ? (META[slug] ? META[slug].color : '#1E5AA0') : '';
      p.style.borderColor = on ? (META[slug] ? META[slug].color : '#1E5AA0') : '';
    });
    document.querySelectorAll('.posture-pill').forEach(function (p) {
      p.classList.toggle('active', (p.dataset.posture || 'all') === state.posture);
    });
  }

  /* ---------------------------------------------------------------- */
  /* 7. WIRING                                                         */
  /* ---------------------------------------------------------------- */
  /* Posture pills. v1's initPostureFilter() was a `// TODO` that only
     toggled a CSS class -- it never filtered. Counts come from the
     corrected classifier. */
  function wirePosture() {
    var pills = document.querySelectorAll('.posture-pill');
    if (!pills.length) return;
    var counts = { Nindra: 0, Veetrirundha: 0, Kidantha: 0, Multiple: 0 }, terr = 0;
    corpus().forEach(function (t) {
      /* Divya Desams only. Excluding abhimana here as well as in
         postureOK keeps the pill label and the filter result identical --
         previously the labels counted 108 while the filter returned 106. */
      if (t.is_celestial || t.is_abhimana) return;
      terr++;
      var pc = postureClass(t);
      if (pc && counts[pc] !== undefined) counts[pc]++;
    });
    /* Artwork replaces the generic emoji. Files live beside index.html.
       Written with innerHTML, not textContent, because textContent would
       strip the img element -- which is why putting these in index.html
       alone would not survive: this function overwrites the pill on load. */
    var LBL  = { Nindra: 'Standing', Veetrirundha: 'Sitting', Kidantha: 'Reclining' };
    var ICON = { Nindra: 'posture-standing.png',
                 Veetrirundha: 'posture-sitting.png',
                 Kidantha: 'posture-reclining.png' };
    var ALT  = { Nindra: 'Standing posture', Veetrirundha: 'Seated posture',
                 Kidantha: 'Reclining posture' };
    pills.forEach(function (pill) {
      var k = pill.dataset.posture || 'all';
      if (k === 'all') {
        pill.textContent = 'All ' + terr;
        pill.title = 'All ' + terr + ' Divya Desams (celestial and Abhimana Kshetrams excluded)';
      }
      else if (LBL[k]) {
        var shown = counts[k] + counts.Multiple;
        pill.innerHTML = '<img class="dd-posture-ico" src="' + ICON[k] +
                         '" alt="" aria-hidden="true">' +
                         LBL[k] + ' (' + shown + ')';
        /* OPTION A disclosure. The three pills deliberately overlap:
           counts.Multiple temples hold more than one posture and are
           counted under each, so the pills sum to more than the corpus.
           Thirukkoodal really is standing, seated AND reclining, on three
           levels of one vimana. Saying so on the tooltip is more honest
           than forcing each temple into a single bucket. */
        var note = counts.Multiple
          ? ALT[k] + ' \u2014 ' + counts[k] + ' temples, plus ' + counts.Multiple +
            ' that hold multiple postures and appear under each filter'
          : ALT[k] + ' \u2014 ' + shown + ' temples';
        pill.title = note;
        pill.setAttribute('aria-label', note);
      }
      if (pill._ddWired) return;
      pill._ddWired = true;
      pill.addEventListener('click', function () {
        state.posture = k;
        apply();
      });
    });
    console.log('[dd_v2_filters] posture counts (Divya Desams only): Nindra ' + counts.Nindra +
                ' · Veetrirundha ' + counts.Veetrirundha + ' · Kidantha ' + counts.Kidantha +
                ' · Multiple ' + counts.Multiple);
  }

  /* Mirror v1's own search box and Nadu chips into our state. They
     re-render on every keystroke, so we delegate from the container. */
  function wireSidebar() {
    var host = document.getElementById('temple-list');
    if (!host || host._ddWired) return;
    host._ddWired = true;

    host.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'dd-search-input') {
        state.search = String(e.target.value || '').toLowerCase().trim();
        applySoon();
      }
    });
    host.addEventListener('click', function (e) {
      var chip = e.target.closest && e.target.closest('.dd-chip');
      if (chip) { state.nadu = chip.getAttribute('data-chip') || 'all'; applySoon(); return; }
      if (e.target && e.target.id === 'dd-search-clear') { state.search = ''; applySoon(); }
    });

    /* v1 rebuilds the whole list via innerHTML, wiping our pill row.
       Re-inject and re-apply whenever that happens. */
    if (!host._ddObs) {
      host._ddObs = new MutationObserver(function () {
        if (!document.getElementById('dd-cat-row')) buildCatPills();
        applySoon();
      });
      host._ddObs.observe(host, { childList: true });
    }
  }

  /* ---------------------------------------------------------------- */
  /* 8. RELATED-TAB CTAs — dead in v1, defined here                    */
  /* ---------------------------------------------------------------- */
  /* buildRelatedTab renders onclick="window.DDPopup.<action>", so these
     must live on DDPopup, not on window. In v1 none of the three were
     ever defined, so every Related card was a no-op click. */
  function closePanel() {
    var p = document.getElementById('detail-panel');
    if (p) p.classList.remove('active');
  }
  function installCtas() {
    window.DDPopup = window.DDPopup || {};
    window.DDPopup.filterByNadu = function (region) {
      state.nadu = region; state.cats.clear(); state.search = '';
      state.posture = 'all'; state.alwar = null;
      window.activeNaduChip = region; window.sidebarSearchQuery = '';
      if (typeof window.buildSidebarList === 'function') window.buildSidebarList();
      closePanel(); apply();
    };
    window.DDPopup.filterByCategory = function (slug) {
      state.cats.clear(); state.cats.add(slug);
      state.nadu = 'all'; state.search = ''; state.posture = 'all'; state.alwar = null;
      window.activeNaduChip = 'all'; window.sidebarSearchQuery = '';
      if (typeof window.buildSidebarList === 'function') window.buildSidebarList();
      closePanel(); apply();
    };
    window.DDPopup.filterByAlwar = function (key) {
      state.alwar = key; state.cats.clear();
      state.nadu = 'all'; state.search = ''; state.posture = 'all';
      window.activeNaduChip = 'all'; window.sidebarSearchQuery = '';
      if (typeof window.buildSidebarList === 'function') window.buildSidebarList();
      closePanel(); apply();
    };
    /* Legacy globals, in case anything still calls the bare names. */
    window.filterByNadu     = window.DDPopup.filterByNadu;
    window.filterByCategory = window.DDPopup.filterByCategory;
    window.filterByAlwar    = window.DDPopup.filterByAlwar;
  }

  /* ---------------------------------------------------------------- */
  /* 9. PUBLIC API                                                     */
  /* ---------------------------------------------------------------- */
  window.DDFilter = {
    state: state,
    passes: passes,
    apply: apply,
    postureClass: postureClass,
    setNadu:     function (r) { state.nadu = r; apply(); },
    setPosture:  function (p) { state.posture = p; apply(); },
    setAlwar:    function (a) { state.alwar = a; apply(); },
    toggleCat:   function (c) {
      if (state.cats.has(c)) state.cats.delete(c); else state.cats.add(c);
      return apply();
    },
    reset: function () {
      state.search = ''; state.nadu = 'all'; state.posture = 'all';
      state.alwar = null; state.cats.clear();
      window.sidebarSearchQuery = ''; window.activeNaduChip = 'all';
      if (typeof window.buildSidebarList === 'function') window.buildSidebarList();
      return apply();
    },
    audit: function () {
      var T = corpus();
      var rows = T.filter(passes).map(function (t) {
        return { sno: t.sno, name: t.temple_name_short, region: t.region,
                 posture: postureClass(t), cats: (t.categories || []).join(',') };
      });
      console.log('state:', JSON.stringify({
        search: state.search, nadu: state.nadu, posture: state.posture,
        alwar: state.alwar, cats: Array.from(state.cats)
      }));
      console.log('matching: ' + rows.length + ' of ' + T.length);
      console.table(rows.slice(0, 25));
      return rows;
    }
  };

  /* ---------------------------------------------------------------- */
  /* 10. BOOT                                                          */
  /* ---------------------------------------------------------------- */
  function boot(tries) {
    tries = tries || 0;
    var ready = corpus().length && document.getElementById('temple-list');
    if (!ready) {
      if (tries > 100) { console.warn('[dd_v2_filters] gave up waiting for data/DOM.'); return; }
      return setTimeout(function () { boot(tries + 1); }, 100);
    }
    injectCss();
    installCtas();
    wireSidebar();
    buildCatPills();
    wirePosture();
    apply();
    console.log('[dd_v2_filters] Composable filter chain active — ' +
                'search + nadu + category + posture + alwar now stack. ' +
                'Try: window.DDFilter.audit()');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(0); });
  } else {
    boot(0);
  }
})();
