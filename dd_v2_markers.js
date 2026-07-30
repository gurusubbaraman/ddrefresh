/* ==================================================================
   DD v2 — CATEGORY MARKER ENGINE + COORDINATE AUDIT   (Session M.1)
   ------------------------------------------------------------------
   Ports the PPS pps_v3_patch_2c1.js marker layer to DD and re-keys the
   colour scheme from Nadu (region) to pilgrimage-category set.

     1) Numbered divIcon markers (temple sno on the pin)
     2) Colour driver = the 8 canonical sets in DD_CANON
     3) Gold pulsing ring for temples in 2+ sets
     4) Muted slate for uncategorised temples
     5) Category-tinted cluster disambiguation
     6) Built-in coordinate precision audit

   WHAT IT REPLACES
   ----------------
   index.html builds Nadu-coloured markers inline and exposes
   window.templeMarkersGroup / window.templeMarkersMap. This file
   rebuilds that layer and REASSIGNS both globals to its own objects.

   That is deliberate and is what keeps the rest of the stack working:
   dd_v2_filters.js refreshMap() reads those two globals, so the moment
   they point here, the composable filter chain drives these markers
   with no change to the filter file at all.

   Selection compatibility is preserved by reusing the inner class name
   `dd-map-marker`, which index.html's applyMarkerSelection() queries.
   Marker click still calls selectMarker -> sidebar highlight ->
   openTemplePopup, exactly as before.

   ------------------------------------------------------------------
   WHY THE AUDIT SHIPS WITH THE MARKERS
   ------------------------------------------------------------------
   Uniform dots hide coordinate error: a temple 10 km off still looks
   plausible inside a cluster. Numbered, set-coloured pins make tight
   canonical clusters (the Kanchi 14, the Thirunangur 11, the Nava
   Tirupathi 9) into natural error detectors -- an outlier is visible
   instantly. The audit turns that from an impression into a report.

   Findings on the current corpus, for reference:

     PRECISION      102 of 109 plottable temples are <100 m precise.
                    Only 7 are low-precision -- 1 single-decimal
                    (#50 Nilathingal Thundathan) and 6 town-centroid.
                    DD is in far better shape than PPS was at the same
                    stage (PPS had 106 low-precision records).

     COLLISIONS     20 temples share just 4 coordinate points:
                      11 at 11.1775,79.77917   Thirunangur #60-70
                       4 at 12.83917,79.705    Kanchi #49,53,54,55
                       3 at 10.8157,79.1386    Thanjavur #43,44,45
                       2 at 11.22556,79.79944  #42 Thiruvali,
                                               #80 Thirunagari
                    Only the Kanchi four are genuinely co-located --
                    #53/54/55 sit INSIDE the Ulagalantha complex, as
                    their own town field says. The other 16 are
                    town-centroid placeholders for temples that are
                    physically distinct.

     NO STATE ERRORS  Every Tamil Nadu and Kerala record falls inside
                    its state bounding box.

   Stacked markers are handled rather than hidden: markercluster
   spiderfies identical points on click, and this file adds a visible
   stack badge so a visitor can tell that one pin is really eleven.
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_MARKERS_LOADED) return;
  window.DD_V2_MARKERS_LOADED = true;

  var UNCAT_COLOR = '#7F8C8D';   /* muted slate  */
  var MULTI_RING  = '#D4AF37';   /* gold         */
  var CELESTIAL   = '#5B2C8E';   /* purple       */
  var ABHIMANA    = '#C89932';   /* deep gold    */

  var S = { markers: {}, group: null, selected: null, built: false };

  function corpus()  { return window.DIVYA_DESAMS || window.DD_TEMPLES || []; }
  function meta()    { return window.DD_CAT_META  || {}; }
  function icons()   { return window.DD_CAT_ICONS || {}; }
  function canon()   { return window.DD_CANON     || {}; }
  function precedence() {
    return window.DD_PRECEDENCE || Object.keys(canon());
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------------------------------------------------------------- */
  /* 1. COLOUR RESOLUTION                                              */
  /* ---------------------------------------------------------------- */
  function colorCatsOf(t) {
    var M = meta();
    if (!t || !Array.isArray(t.categories)) return [];
    return t.categories.filter(function (c) { return M[c]; });
  }
  function fillColorOf(t) {
    if (t.is_celestial) return CELESTIAL;
    if (t.is_abhimana)  return ABHIMANA;
    var cats = colorCatsOf(t);
    if (!cats.length) return UNCAT_COLOR;
    var P = precedence(), M = meta();
    for (var i = 0; i < P.length; i++) {
      if (cats.indexOf(P[i]) >= 0) return M[P[i]].color;
    }
    return M[cats[0]].color;
  }
  function isMultiSet(t) { return colorCatsOf(t).length >= 2; }

  /* ---------------------------------------------------------------- */
  /* 2. COLLISION MAP — how many temples share each point              */
  /* ---------------------------------------------------------------- */
  var collisions = {};
  function buildCollisionMap() {
    collisions = {};
    corpus().forEach(function (t) {
      if (t.lat == null || t.lng == null) return;
      var k = t.lat + ',' + t.lng;
      (collisions[k] = collisions[k] || []).push(t.sno);
    });
  }
  function stackSize(t) {
    if (t.lat == null) return 1;
    var g = collisions[t.lat + ',' + t.lng];
    return g ? g.length : 1;
  }

  /* ---------------------------------------------------------------- */
  /* 3. CSS                                                            */
  /* ---------------------------------------------------------------- */
  function injectCss() {
    if (document.getElementById('dd-v2-marker-css')) return;
    var s = document.createElement('style');
    s.id = 'dd-v2-marker-css';
    s.textContent = [
      '.dd-v2-wrap{background:transparent!important;border:none!important}',
      '.dd-map-marker{width:30px;height:30px;border-radius:50%;',
      'border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);',
      'color:#fff;font-weight:700;font-size:.72rem;display:flex;',
      'align-items:center;justify-content:center;font-family:Inter,sans-serif;',
      'position:relative;transition:transform .15s}',
      '.dd-map-marker:hover{transform:scale(1.15);z-index:1000}',
      '.dd-v2-multi{box-shadow:0 0 0 3px ' + MULTI_RING + ',0 2px 8px rgba(0,0,0,.4)}',
      '.dd-v2-stack{position:absolute;top:-5px;right:-7px;background:#1A1A3A;',
      'color:#fff;border:1.5px solid #fff;border-radius:8px;min-width:15px;',
      'height:15px;font-size:.55rem;font-weight:700;display:flex;',
      'align-items:center;justify-content:center;padding:0 3px;line-height:1}',
      '@keyframes ddpulse{0%{box-shadow:0 0 0 0 rgba(212,175,55,.85)}',
      '70%{box-shadow:0 0 0 14px rgba(212,175,55,0)}',
      '100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}}',
      '.dd-map-marker-selected{animation:ddpulse 1.2s ease-out 2;z-index:1200!important}',
      '.dd-v2-cluster{width:44px;height:44px;border-radius:50%;',
      'background:rgba(30,90,160,.9);border:3px solid #fff;color:#fff;',
      'font-weight:700;font-size:.85rem;display:flex;align-items:center;',
      'justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.35);',
      'font-family:Inter,sans-serif}',
      '.dd-v2-legend{position:absolute;bottom:14px;left:14px;z-index:800;',
      'background:rgba(255,255,255,.96);border-radius:9px;padding:8px 10px;',
      'box-shadow:0 2px 12px rgba(0,0,0,.18);font-size:.66rem;max-width:200px;',
      'font-family:Inter,sans-serif;line-height:1.7}',
      '.dd-v2-legend b{display:block;font-size:.62rem;text-transform:uppercase;',
      'letter-spacing:.6px;color:#1E5AA0;margin-bottom:5px}',
      '.dd-v2-legend i{display:inline-block;width:10px;height:10px;',
      'border-radius:50%;margin-right:6px;vertical-align:middle}',
      '.dd-v2-legend div{cursor:default;white-space:nowrap;overflow:hidden;',
      'text-overflow:ellipsis}',
      '.dd-v2-legend .dd-v2-lg-toggle{cursor:pointer;color:#1E5AA0;',
      'font-weight:600;margin-top:4px}',
      '@media(max-width:900px){.dd-v2-legend{display:none}}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------------- */
  /* 4. MARKER CONSTRUCTION                                            */
  /* ---------------------------------------------------------------- */
  function iconFor(t) {
    var color = fillColorOf(t);
    var multi = isMultiSet(t) ? ' dd-v2-multi' : '';
    var label = t.is_abhimana ? '\u2605' : t.sno;
    var n     = stackSize(t);
    var badge = n > 1 ? '<span class="dd-v2-stack">' + n + '</span>' : '';
    return L.divIcon({
      html: '<div class="dd-map-marker' + multi + '" style="background:' +
            color + ';">' + label + badge + '</div>',
      className: 'dd-v2-wrap',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  }

  function tooltipFor(t) {
    var gfv = window.getFieldValue || function (x, f) { return x[f] || ''; };
    var name = gfv(t, 'temple_name_short') || gfv(t, 'temple_name') || '';
    var M = meta(), I = icons();
    var sets = colorCatsOf(t).map(function (c) {
      return (I[c] || '') + ' ' + M[c].label;
    }).join(' · ');
    var n = stackSize(t);
    return '<b>#' + t.sno + '</b> ' + esc(name) +
           '<br><small>' + esc(gfv(t, 'town') || '') + '</small>' +
           (sets ? '<br><small style="color:' + MULTI_RING + '">' + esc(sets) + '</small>' : '') +
           (n > 1 ? '<br><small style="opacity:.75">' + n +
                    ' temples at this point — click to fan out</small>' : '');
  }

  function build() {
    if (!window.leafletMap || typeof L === 'undefined' ||
        typeof L.markerClusterGroup === 'undefined') return false;
    var T = corpus();
    if (!T.length) return false;

    buildCollisionMap();

    /* Drop whatever marker layer is currently on the map. */
    if (window.templeMarkersGroup) {
      try { window.leafletMap.removeLayer(window.templeMarkersGroup); } catch (e) {}
    }

    var group = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,      /* fans identical points on click */
      zoomToBoundsOnClick: true,
      maxClusterRadius: 55,
      iconCreateFunction: function (cluster) {
        var kids = cluster.getAllChildMarkers();
        var tally = {}, top = null, best = 0;
        kids.forEach(function (m) {
          (m._ddCats || []).forEach(function (c) {
            tally[c] = (tally[c] || 0) + 1;
            if (tally[c] > best) { best = tally[c]; top = c; }
          });
        });
        var M = meta();
        /* Tint the cluster only when one set clearly dominates it, so
           mixed clusters stay neutral rather than misleading. */
        var col = (top && best >= kids.length * 0.6 && M[top])
                    ? M[top].color : '#1E5AA0';
        return L.divIcon({
          html: '<div class="dd-v2-cluster" style="background:' + col + 'E6;">' +
                cluster.getChildCount() + '</div>',
          className: 'dd-v2-wrap',
          iconSize: [44, 44]
        });
      }
    });

    var map = {}, plotted = 0;
    T.forEach(function (t) {
      if (t.is_celestial) return;              /* no earthly location */
      if (t.lat == null || t.lng == null) return;

      var m = L.marker([t.lat, t.lng], { icon: iconFor(t) });
      m._sno       = t.sno;
      m.options.sno = t.sno;                   /* dd_phase2 extractSno */
      m._ddCats    = colorCatsOf(t);
      m._templeRegion = t.is_abhimana ? '__abhimana__' : t.region;

      m.bindTooltip(tooltipFor(t), {
        direction: 'top', offset: [0, -14], className: 'dd-map-tooltip'
      });

      if (typeof window.buildPreviewCardHtml === 'function') {
        try {
          m.bindPopup(window.buildPreviewCardHtml(t), {
            className: 'dd-map-preview-popup', closeButton: false,
            autoPan: false, offset: [0, -10], maxWidth: 280
          });
          var hov = null;
          m.on('mouseover', function () {
            if (window.innerWidth < 900) return;
            clearTimeout(hov);
            var self = this;
            hov = setTimeout(function () { self.openPopup(); }, 220);
          });
          m.on('mouseout', function () { clearTimeout(hov); this.closePopup(); });
        } catch (e) {}
      }

      (function (sno) {
        m.on('click', function () { select(sno); });
      })(t.sno);

      map[t.sno] = m;
      group.addLayer(m);
      plotted++;
    });

    window.templeMarkersGroup = group;         /* filters read these  */
    window.templeMarkersMap   = map;
    S.group = group; S.markers = map; S.built = true;
    window.leafletMap.addLayer(group);

    buildLegend();

    var multi = T.filter(isMultiSet).length;
    var slate = T.filter(function (t) {
      return !t.is_celestial && t.lat != null && !colorCatsOf(t).length;
    }).length;
    console.log('[dd_v2_markers] ' + plotted + ' category markers · ' +
                multi + ' multi-set (gold ring) · ' + slate + ' uncategorised · ' +
                Object.keys(collisions).filter(function (k) {
                  return collisions[k].length > 1;
                }).length + ' stacked points');
    return true;
  }

  /* ---------------------------------------------------------------- */
  /* 5. SELECTION — preserves the existing click contract              */
  /* ---------------------------------------------------------------- */
  function select(sno) {
    S.selected = sno;
    window.selectedTempleSno = sno;
    paintSelection(sno);
    if (typeof window.highlightSidebarEntry === 'function') {
      try { window.highlightSidebarEntry(sno); } catch (e) {}
    }
    if (typeof window.openTemplePopup === 'function') {
      try { window.openTemplePopup(sno); } catch (e) {}
    }
  }
  function paintSelection(sno) {
    document.querySelectorAll('.dd-map-marker-selected').forEach(function (el) {
      el.classList.remove('dd-map-marker-selected');
    });
    var m = S.markers[sno];
    if (m && m._icon) {
      var inner = m._icon.querySelector('.dd-map-marker');
      if (inner) {
        inner.classList.add('dd-map-marker-selected');
        inner.style.animation = 'none';
        setTimeout(function () { inner.style.animation = ''; }, 10);
      }
    }
  }
  window.applyMarkerSelection = paintSelection;   /* keep v1 callers working */

  /* ---------------------------------------------------------------- */
  /* 6. LEGEND                                                         */
  /* ---------------------------------------------------------------- */
  function buildLegend() {
    var host = document.getElementById('map');
    if (!host || document.getElementById('dd-v2-legend')) return;
    var M = meta(), I = icons(), C = canon();
    var el = document.createElement('div');
    el.className = 'dd-v2-legend';
    el.id = 'dd-v2-legend';
    var rows = Object.keys(C).map(function (slug) {
      if (!M[slug]) return '';
      return '<div><i style="background:' + M[slug].color + '"></i>' +
             (I[slug] || '') + ' ' + esc(M[slug].label) +
             ' <span style="opacity:.55">(' + C[slug].length + ')</span></div>';
    }).join('');
    el.innerHTML = '<b>Pilgrimage Sets</b>' + rows +
      '<div><i style="background:' + UNCAT_COLOR + '"></i>Other</div>' +
      '<div><i style="background:#fff;box-shadow:0 0 0 2px ' + MULTI_RING + '"></i>In 2+ sets</div>';
    host.appendChild(el);
  }

  /* ---------------------------------------------------------------- */
  /* 7. REFRESH — re-skin without rebuilding the layer                 */
  /* ---------------------------------------------------------------- */
  function restyle() {
    if (!S.built) return 0;
    buildCollisionMap();
    var n = 0;
    corpus().forEach(function (t) {
      var m = S.markers[t.sno];
      if (!m) return;
      m._ddCats = colorCatsOf(t);
      m.setIcon(iconFor(t));
      var tt = m.getTooltip();
      if (tt) tt.setContent(tooltipFor(t));
      n++;
    });
    if (S.selected) paintSelection(S.selected);
    return n;
  }

  /* ---------------------------------------------------------------- */
  /* 8. COORDINATE PRECISION AUDIT                                     */
  /* ---------------------------------------------------------------- */
  function decimals(v) {
    if (v == null) return -1;
    var s = String(v), i = s.indexOf('.');
    return i < 0 ? 0 : s.length - i - 1;
  }
  function precisionOf(t) {
    if (t.lat == null || t.lng == null) return 'missing';
    var d = Math.min(decimals(t.lat), decimals(t.lng));
    if (d === 0) return 'P1_whole_degree';
    if (d <= 1) return 'P2_single_decimal';
    if (d <= 2) return 'P3_town_centroid';
    return 'precise';
  }
  function km(a, b, c, d) {
    var R = 6371, r = Math.PI / 180;
    var dLat = (c - a) * r, dLng = (d - b) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(a * r) * Math.cos(c * r) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }

  function auditCoords(opts) {
    opts = opts || {};
    var T = corpus(), C = canon(), M = meta();
    var bySno = {}; T.forEach(function (t) { bySno[t.sno] = t; });

    console.log('%c=== DD COORDINATE AUDIT ===', 'font-weight:700;color:#1E5AA0');

    /* -- precision -- */
    var buckets = {};
    T.forEach(function (t) {
      var p = precisionOf(t);
      (buckets[p] = buckets[p] || []).push(t);
    });
    var LABEL = {
      missing: 'no coordinate', P1_whole_degree: '~111 km error',
      P2_single_decimal: '~11 km error', P3_town_centroid: '~1.1 km error',
      precise: '<100 m'
    };
    console.log('\n-- precision --');
    ['missing', 'P1_whole_degree', 'P2_single_decimal', 'P3_town_centroid', 'precise']
      .forEach(function (k) {
        var n = (buckets[k] || []).length;
        if (n) console.log('  ' + k.padEnd(20) + String(n).padStart(3) + '   ' + LABEL[k]);
      });

    var low = []
      .concat(buckets.P1_whole_degree || [])
      .concat(buckets.P2_single_decimal || [])
      .concat(buckets.P3_town_centroid || []);
    if (low.length) {
      console.log('\n-- low-precision records (candidates for a GPS pass) --');
      console.table(low.map(function (t) {
        return { sno: t.sno, temple: t.temple_name_short, town: t.town,
                 lat: t.lat, lng: t.lng, precision: precisionOf(t) };
      }));
    }

    /* -- collisions -- */
    buildCollisionMap();
    var stacks = Object.keys(collisions)
      .filter(function (k) { return collisions[k].length > 1; })
      .sort(function (a, b) { return collisions[b].length - collisions[a].length; });
    console.log('\n-- exact coordinate collisions --');
    console.log('  ' + stacks.length + ' stacked points covering ' +
                stacks.reduce(function (s, k) { return s + collisions[k].length; }, 0) +
                ' temples');
    stacks.forEach(function (k) {
      var snos = collisions[k];
      console.log('  ' + k + '  (' + snos.length + ')  ' +
                  snos.map(function (s) {
                    return '#' + s + ' ' + ((bySno[s] || {}).town || '').slice(0, 18);
                  }).join(' | '));
    });

    /* -- set outliers -- */
    console.log('\n-- canonical set dispersion --');
    var flags = [];
    Object.keys(C).forEach(function (slug) {
      var mem = C[slug].map(function (s) { return bySno[s]; })
                       .filter(function (t) { return t && t.lat != null; });
      if (mem.length < 3) return;
      var cLat = mem.reduce(function (s, t) { return s + t.lat; }, 0) / mem.length;
      var cLng = mem.reduce(function (s, t) { return s + t.lng; }, 0) / mem.length;
      var d = mem.map(function (t) {
        return { sno: t.sno, town: t.town, km: km(cLat, cLng, t.lat, t.lng) };
      }).sort(function (a, b) { return b.km - a.km; });
      var med = d[Math.floor(d.length / 2)].km;
      var out = med > 0 && d[0].km > Math.max(med * 4, 25);
      console.log('  ' + (out ? 'FLAG' : '  ok') + '  ' + slug.padEnd(22) +
                  'n=' + String(mem.length).padStart(2) +
                  '  max ' + d[0].km.toFixed(1) + ' km  median ' + med.toFixed(1) + ' km');
      if (out) flags.push({ set: slug, worst: d[0] });
    });
    if (flags.length) {
      console.log('  flagged:');
      flags.forEach(function (f) {
        console.log('    ' + f.set + ' -> #' + f.worst.sno + ' ' +
                    f.worst.town + ' at ' + f.worst.km.toFixed(1) + ' km');
      });
    } else {
      console.log('  no set has an outlier beyond 4x its median spread.');
      console.log('  (wide sets like sapta_mokshapuri are genuinely pan-Indian,');
      console.log('   so a large spread there is expected, not an error.)');
    }

    /* -- state bounds -- */
    console.log('\n-- state bounding-box check --');
    var BOX = { 'Tamil Nadu': [8.0, 13.6, 76.2, 80.4], 'Kerala': [8.1, 12.8, 74.8, 77.4] };
    var bad = T.filter(function (t) {
      var b = BOX[t.state];
      return b && t.lat != null &&
             (t.lat < b[0] || t.lat > b[1] || t.lng < b[2] || t.lng > b[3]);
    });
    console.log(bad.length ? '  ' + bad.length + ' outside state bounds:' :
                             '  all TN / Kerala records inside their state box.');
    bad.forEach(function (t) {
      console.log('    #' + t.sno + ' ' + t.state + ' ' + t.lat + ',' + t.lng + '  ' + t.town);
    });

    return {
      precision: Object.keys(buckets).reduce(function (o, k) {
        o[k] = buckets[k].length; return o;
      }, {}),
      lowPrecision: low.map(function (t) { return t.sno; }),
      stacks: stacks.map(function (k) { return { at: k, snos: collisions[k] }; }),
      setFlags: flags,
      outOfState: bad.map(function (t) { return t.sno; })
    };
  }

  /* ---------------------------------------------------------------- */
  /* 9. PUBLIC API                                                     */
  /* ---------------------------------------------------------------- */
  window.DDMarkers = {
    build: build,
    restyle: restyle,
    select: select,
    auditCoords: auditCoords,
    precisionOf: precisionOf,
    fillColorOf: fillColorOf,
    colorCatsOf: colorCatsOf,
    isMultiSet: isMultiSet,
    stackSize: stackSize,
    legend: function (on) {
      var el = document.getElementById('dd-v2-legend');
      if (el) el.style.display = (on === false) ? 'none' : '';
    },
    _state: S
  };

  /* ---------------------------------------------------------------- */
  /* 10. BOOT                                                          */
  /* ---------------------------------------------------------------- */
  /* Wait for the base layer to finish plotting, then take over. The
     base map is left to initialise normally so nothing it exposes goes
     missing; we simply replace the layer afterwards. */
  function boot(tries) {
    tries = tries || 0;
    var ready = window.leafletMap && typeof L !== 'undefined' &&
                typeof L.markerClusterGroup !== 'undefined' &&
                corpus().length && window.DD_CAT_META && window.DD_CANON;
    if (!ready) {
      if (tries > 150) {
        console.warn('[dd_v2_markers] prerequisites never arrived — not built.');
        return;
      }
      return setTimeout(function () { boot(tries + 1); }, 100);
    }
    injectCss();
    if (!build()) { return setTimeout(function () { boot(tries + 1); }, 150); }

    /* Hand visibility control back to the filter chain so the pills,
       search and Nadu chips apply to the new markers immediately. */
    if (window.DDFilter && typeof window.DDFilter.apply === 'function') {
      setTimeout(function () { window.DDFilter.apply(); }, 60);
    }
    console.log('[dd_v2_markers] Category markers active. ' +
                'Audit with: window.DDMarkers.auditCoords()');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(0); });
  } else {
    boot(0);
  }
})();
