// ============================================================
// PHASE 2 ENHANCEMENTS
// ============================================================
// 1. Nav cleanup — hides 5 nav items (By Nadu, By Alwar, By Posture,
//    Divine Realms, Alwar Journeys)
// 2. Posture pills — replaces emoji with custom Vishnu iconography (24px)
// 3. Posture pills — shows real counts from data
// 4. Posture filter — actual marker + sidebar filtering
//
// USAGE: Include this file with <script> tag AFTER dd_v1_patch.js
//        in your index.html:
//
//   <script src="dd_v1_patch.js?v=..."></script>
//   <script src="dd_phase2_enhancements.js?v=phase2"></script>
//
// PREREQUISITES:
// - Upload these icon files to /assets/ folder:
//   posture-standing.png, posture-standing@2x.png
//   posture-sitting.png, posture-sitting@2x.png
//   posture-reclining.png, posture-reclining@2x.png
// ============================================================

(function ddPhase2Enhancements() {
  "use strict";

  const log = (msg) => console.log("[dd_phase2] " + msg);

  function whenReady(fn) {
    if (window.DIVYA_DESAMS && document.querySelector('.posture-pill')) {
      setTimeout(fn, 250);
    } else {
      setTimeout(() => whenReady(fn), 150);
    }
  }

  // ============================================================
  // 1. NAV CLEANUP
  // ============================================================
  function cleanupNav() {
    const nav = document.querySelector('.hdr-nav');
    if (!nav) { log("nav not found"); return; }
    const itemsToHide = ["By Nadu", "By Alwar", "By Posture", "Divine Realms", "Alwar Journeys"];
    let hidden = 0;
    nav.querySelectorAll('a').forEach(a => {
      const txt = (a.textContent || "").trim();
      if (itemsToHide.includes(txt)) {
        a.style.display = "none";
        hidden++;
      }
    });
    log("Nav cleanup: hidden " + hidden + " items (remaining: Home, All 108 Temples, About)");
  }

  // ============================================================
  // 2. POSTURE CLASSIFICATION
  // ============================================================
  function classifyPosture(postureStr) {
    if (!postureStr) return null;
    const p = postureStr.toLowerCase();
    if (p.includes("reclining") || p.includes("sayana") || p.includes("kidantha") ||
        p.includes("bhujanga") || p.includes("shayana") || p.includes("darbhasayana")) {
      return "Kidantha";
    }
    if (p.includes("seated") || p.includes("sitting") || p.includes("veetrirundha") ||
        p.includes("yoga posture") || p.includes("padmasana") || p.includes("asana")) {
      return "Veetrirundha";
    }
    if (p.includes("standing") || p.includes("nindra") || p.includes("nindr")) {
      return "Nindra";
    }
    return null;
  }

  function computePostureCounts() {
    const counts = { Nindra: 0, Veetrirundha: 0, Kidantha: 0, celestial: 0, unknown: 0, total: 0 };
    const temples = window.DIVYA_DESAMS || [];
    temples.forEach(t => {
      counts.total++;
      if (t.is_celestial) { counts.celestial++; return; }
      const cls = classifyPosture(t.posture);
      if (cls) { counts[cls]++; } else { counts.unknown++; }
    });
    return counts;
  }

  // ============================================================
  // 3. POSTURE PILLS UPGRADE — 24px ICONS
  // ============================================================
  function upgradePostureUI(counts) {
    const style = document.createElement('style');
    style.setAttribute('data-phase', '2');
    style.textContent = `
      .posture-pill-icon {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 7px;
        display: inline-block;
        object-fit: contain;
        border-radius: 50%;
      }
      .posture-pill {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0 !important;
        padding: 3px 14px 3px 6px !important;
      }
      .posture-pill[data-posture="all"] {
        padding: 5px 14px !important;
      }
      @media (max-width: 900px) {
        .posture-pill-icon {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .posture-pill {
          padding: 3px 10px 3px 5px !important;
        }
        .posture-pill[data-posture="all"] {
          padding: 5px 10px !important;
        }
      }
    `;
    document.head.appendChild(style);

    const pillMap = {
      "Nindra":       { icon: "assets/posture-standing", label: "Standing" },
      "Veetrirundha": { icon: "assets/posture-sitting",  label: "Sitting" },
      "Kidantha":     { icon: "assets/posture-reclining", label: "Reclining" }
    };

    const terrestrialTotal = counts.total - counts.celestial;

    document.querySelectorAll('.posture-pill').forEach(pill => {
      const posture = pill.dataset.posture;
      if (posture === "all") {
        pill.textContent = "All " + terrestrialTotal;
      } else if (pillMap[posture]) {
        const config = pillMap[posture];
        const count = counts[posture] || 0;
        pill.innerHTML =
          '<img src="' + config.icon + '.png" ' +
               'srcset="' + config.icon + '@2x.png 2x" ' +
               'class="posture-pill-icon" alt=""> ' +
          config.label + ' (' + count + ')';
      }
    });
    log("Posture pills upgraded with 24px icons + counts");
  }

  // ============================================================
  // 4. MARKER + SIDEBAR FILTERING
  // ============================================================
  let __markerRegistry = null;
  let __clusterGroup = null;

  function discoverMarkers() {
    if (!window.leafletMap) return null;
    const registry = {};
    let clusterGroup = null;

    window.leafletMap.eachLayer(layer => {
      if (layer && typeof layer.getLayers === 'function' && !layer._latlng) {
        clusterGroup = layer;
        try {
          layer.getLayers().forEach(m => {
            const sno = extractSno(m);
            if (sno != null) registry[sno] = m;
          });
        } catch (e) { /* ignore */ }
        return;
      }
      if (layer && layer._latlng && layer.options) {
        const sno = extractSno(layer);
        if (sno != null) registry[sno] = layer;
      }
    });

    return { registry, clusterGroup };
  }

  function extractSno(marker) {
    if (!marker) return null;
    if (marker.options && marker.options.templeData && marker.options.templeData.sno != null) {
      return marker.options.templeData.sno;
    }
    if (marker.options && marker.options.sno != null) return marker.options.sno;
    if (marker.templeData && marker.templeData.sno != null) return marker.templeData.sno;
    if (marker._templeData && marker._templeData.sno != null) return marker._templeData.sno;
    if (marker._popup && marker._popup._content) {
      const c = typeof marker._popup._content === "string" ? marker._popup._content : marker._popup._content.outerHTML || "";
      const m = c.match(/data-sno=["']?(\d+)/);
      if (m) return parseInt(m[1]);
    }
    return null;
  }

  function ensureMarkersDiscovered() {
    if (!__markerRegistry) {
      const disc = discoverMarkers();
      if (disc) {
        __markerRegistry = disc.registry;
        __clusterGroup = disc.clusterGroup;
        log("Discovered " + Object.keys(__markerRegistry).length + " markers" +
            (__clusterGroup ? " (in cluster group)" : ""));
      } else {
        log("⚠️ Could not discover markers — filtering may not affect map");
      }
    }
    return __markerRegistry;
  }

  function shouldShowTemple(t, posture) {
    if (posture === "all") return true;
    if (t.is_celestial) return false;
    return classifyPosture(t.posture) === posture;
  }

  function applyPostureFilter(posture) {
    const registry = ensureMarkersDiscovered();
    const temples = window.DIVYA_DESAMS || [];
    let shown = 0, hidden = 0;

    if (registry && __clusterGroup) {
      const toShow = [];
      const toHide = [];
      temples.forEach(t => {
        const m = registry[t.sno];
        if (!m) return;
        if (shouldShowTemple(t, posture)) { toShow.push(m); shown++; }
        else { toHide.push(m); hidden++; }
      });
      try {
        __clusterGroup.removeLayers(toHide);
        __clusterGroup.addLayers(toShow);
      } catch (e) {
        toHide.forEach(m => __clusterGroup.removeLayer(m));
        toShow.forEach(m => __clusterGroup.addLayer(m));
      }
    } else if (registry) {
      temples.forEach(t => {
        const m = registry[t.sno];
        if (!m) return;
        if (shouldShowTemple(t, posture)) {
          if (!window.leafletMap.hasLayer(m)) m.addTo(window.leafletMap);
          shown++;
        } else {
          if (window.leafletMap.hasLayer(m)) window.leafletMap.removeLayer(m);
          hidden++;
        }
      });
    }

    filterSidebar(posture);
    log("Filter '" + posture + "' applied: " + shown + " shown, " + hidden + " hidden");
  }

  function filterSidebar(posture) {
    const list = document.getElementById('temple-list');
    if (!list) return;
    const temples = window.DIVYA_DESAMS || [];

    const selectors = ['[data-sno]', '.temple-list-item', '.sidebar-item', '.temple-item'];
    let items = null;
    for (const sel of selectors) {
      const found = list.querySelectorAll(sel);
      if (found.length > 0) { items = found; break; }
    }
    if (!items || items.length === 0) return;

    items.forEach(el => {
      let sno = parseInt(el.dataset.sno || "0");
      if (!sno) {
        const inner = el.querySelector('[data-sno]');
        if (inner) sno = parseInt(inner.dataset.sno || "0");
      }
      if (!sno) return;

      const t = temples.find(x => x.sno === sno);
      if (!t) return;

      el.style.display = shouldShowTemple(t, posture) ? "" : "none";
    });
  }

  // ============================================================
  // 5. WIRE PILL HANDLERS
  // ============================================================
  function wirePillHandlers() {
    document.querySelectorAll('.posture-pill').forEach(pill => {
      const newPill = pill.cloneNode(true);
      pill.parentNode.replaceChild(newPill, pill);

      newPill.addEventListener('click', function() {
        document.querySelectorAll('.posture-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        const posture = this.dataset.posture;
        applyPostureFilter(posture);

        if (typeof gtag !== 'undefined') {
          gtag('event', 'filter_posture', { event_label: posture });
        }
      });
    });
    log("Pill click handlers wired for actual filtering");
  }

  // ============================================================
  // MAIN INITIALIZATION
  // ============================================================
  whenReady(function() {
    log("Phase 2 enhancements starting…");

    cleanupNav();

    const counts = computePostureCounts();
    log("Posture counts: Standing=" + counts.Nindra +
        ", Sitting=" + counts.Veetrirundha +
        ", Reclining=" + counts.Kidantha +
        ", Celestial=" + counts.celestial +
        ", Unknown=" + counts.unknown +
        " (Total=" + counts.total + ")");

    if (counts.unknown > 0) {
      log("⚠️ " + counts.unknown + " temples had unrecognized posture — will appear only in 'All'");
      const temples = window.DIVYA_DESAMS || [];
      const unknowns = temples.filter(t => !t.is_celestial && classifyPosture(t.posture) === null);
      console.table(unknowns.slice(0, 10).map(t => ({ sno: t.sno, name: t.temple_name_short, posture: t.posture })));
    }

    upgradePostureUI(counts);
    wirePillHandlers();

    log("✅ Phase 2 enhancements applied");
  });
})();
