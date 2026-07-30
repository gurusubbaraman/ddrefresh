/* ==================================================================
   DD v2 — SHIM                                    (Session UI.1)
   ------------------------------------------------------------------
   Restores three behaviours that lived only inside the inline
   STEP_5_MAP_MARKERS block in index.html, which is being deleted
   because it overwrote the category markers built by
   dd_v2_markers.js.

   WHY THE INLINE BLOCK HAD TO GO
   ------------------------------
   Both it and dd_v2_markers.js registered on DOMContentLoaded and
   both assigned window.templeMarkersGroup / templeMarkersMap. The
   inline block sits later in the document, so it ran second and won
   every time. The map showed the old Nadu-coloured circles while the
   legend drawn by dd_v2_markers.js described the category scheme.
   Verified live: #1 Srirangam rendered rgb(30,90,160) — Nadu blue —
   with 0 gold rings and 0 stack badges, and
   templeMarkersGroup !== DDMarkers._state.group.

   WHAT THIS FILE PUTS BACK
   ------------------------
   dd_v2_markers.js calls two functions it does not define, each
   behind a typeof guard, so their absence fails silently rather than
   throwing:

       highlightSidebarEntry(sno)   marker click -> highlight the
                                    sidebar row and scroll it into view
       buildPreviewCardHtml(temple) desktop hover preview card

   The inline block also wired sidebar clicks to fly the map to the
   selected marker. That is reinstated here too.

   NOT shimmed, deliberately:
       applyMarkerSelection   dd_v2_markers.js defines its own
       refreshMapMarkers      superseded by DDFilter.apply()
       initMapMarkers         superseded by DDMarkers.build()

   ONE IMPROVEMENT
   ---------------
   The preview card now takes its colour from DDCanon.fillColorOf(),
   so hover cards match the category markers instead of the retired
   Nadu palette. A temple in two or more sets shows its precedence
   colour, exactly as its pin does.

   LOAD ORDER — last, after dd_v2_markers.js:
     dd_v2_filters.js
     dd_v2_markers.js
     dd_v2_shim.js          <- this file
     dd_feedback.js
   ================================================================== */
(function () {
  'use strict';
  if (window.DD_V2_SHIM_LOADED) return;
  window.DD_V2_SHIM_LOADED = true;

  /* ---------------------------------------------------------------- */
  /* 1. highlightSidebarEntry — called by dd_v2_markers.js on click    */
  /* ---------------------------------------------------------------- */
  window.highlightSidebarEntry = function (sno) {
    document.querySelectorAll('.dd-temple-entry.dd-entry-highlighted')
      .forEach(function (el) { el.classList.remove('dd-entry-highlighted'); });

    var entries = document.querySelectorAll('.dd-temple-entry');
    for (var i = 0; i < entries.length; i++) {
      var attr = entries[i].getAttribute('onclick') || '';
      var m = attr.match(/openTemplePopup\((\d+)\)/);
      if (m && parseInt(m[1], 10) === sno) {
        entries[i].classList.add('dd-entry-highlighted');
        entries[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        break;
      }
    }
  };

  /* ---------------------------------------------------------------- */
  /* 2. buildPreviewCardHtml — desktop hover card                      */
  /* ---------------------------------------------------------------- */
  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.buildPreviewCardHtml = function (temple) {
    var gfv = window.getFieldValue || function (t, f) { return t[f] || ''; };

    /* Category colour, so the card agrees with the pin. Falls back to
       the Vaishnava blue if canon has not loaded for any reason. */
    var color = '#1E5AA0';
    if (window.DDCanon && typeof window.DDCanon.fillColorOf === 'function') {
      try { color = window.DDCanon.fillColorOf(temple); } catch (e) {}
    }

    var label  = temple.is_abhimana ? '\u2605' : temple.sno;
    var name   = gfv(temple, 'temple_name_short') || gfv(temple, 'temple_name') || '';
    var town   = gfv(temple, 'town') || '';
    var region = temple.is_abhimana
                   ? 'Abhimana Kshetram'
                   : (gfv(temple, 'region') || temple.region || '');
    var tag    = gfv(temple, 'sthala_purana_tagline') || '';

    var h = '<div class="dd-preview-card">';
    h += '<div class="dd-preview-card-header">';
    h += '<div class="dd-preview-card-badge" style="background:' + color + ';">' + label + '</div>';
    h += '<div class="dd-preview-card-titles">';
    h += '<div class="dd-preview-card-name">' + esc(name) + '</div>';
    if (town) {
      h += '<div class="dd-preview-card-town">' + esc(town) + '</div>';
    }
    if (region) {
      h += '<span class="dd-preview-card-nadu" style="border-color:' + color +
           '; color:' + color + '; background:' + color + '15;">' + esc(region) + '</span>';
    }
    h += '</div></div>';
    if (tag) {
      h += '<div class="dd-preview-card-tagline">' + esc(tag) + '</div>';
    }
    h += '</div>';
    return h;
  };

  /* ---------------------------------------------------------------- */
  /* 3. Sidebar click -> select marker and fly to it                   */
  /* ---------------------------------------------------------------- */
  /* Capture phase, so it still fires when v1 rebuilds the list via
     innerHTML and destroys the clicked element mid-flight. */
  function wireSidebar(tries) {
    tries = tries || 0;
    var list = document.getElementById('temple-list');
    if (!list) {
      if (tries > 120) return;
      return setTimeout(function () { wireSidebar(tries + 1); }, 100);
    }
    if (list._ddShimWired) return;
    list._ddShimWired = true;

    list.addEventListener('click', function (e) {
      var entry = e.target.closest && e.target.closest('.dd-temple-entry');
      if (!entry) return;
      var m = (entry.getAttribute('onclick') || '').match(/openTemplePopup\((\d+)\)/);
      if (!m) return;
      var sno = parseInt(m[1], 10);

      window.selectedTempleSno = sno;
      if (typeof window.applyMarkerSelection === 'function') {
        try { window.applyMarkerSelection(sno); } catch (err) {}
      }
      setTimeout(function () {
        try { window.highlightSidebarEntry(sno); } catch (err) {}
      }, 30);

      var marker = window.templeMarkersMap && window.templeMarkersMap[sno];
      if (marker && window.leafletMap) {
        try {
          window.leafletMap.flyTo(
            marker.getLatLng(),
            Math.max(window.leafletMap.getZoom(), 11),
            { animate: true, duration: 0.8 }
          );
        } catch (err) {}
      }
    }, true);

    console.log('[dd_v2_shim] sidebar-to-map sync active');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { wireSidebar(0); });
  } else {
    wireSidebar(0);
  }

  console.log('[dd_v2_shim] highlightSidebarEntry + buildPreviewCardHtml restored ' +
              '(preview cards now use category colours).');
})();
