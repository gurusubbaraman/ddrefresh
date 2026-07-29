# DD v2 — PPS-Style Enrichment Split

**Status:** Split complete and verified lossless. Additive — nothing in the existing repo is rewritten or deleted.

---

## What changed

DD v1 kept ~50 fields fused into one 2.73 MB array inside `dd_v1_patch.js`. DD v2 separates that into the PPS pattern:

| File | Size | Role |
|---|---:|---|
| `dd_v2_base.js` | 177 KB | Thin base — 22 fields × 111 records. Everything the map, sidebar, filters and search need. |
| `dd_v2_enrichment.js` | 2.38 MB | Parallel deep content keyed by `sno`. 69 fields. |
| `dd_v2_loader.js` | 3 KB | Joins the two and rebuilds the fused view for v1 back-compat. |
| `dd_v2_canon.js` | 16 KB | Canonical set membership + reconcile. Fixes the category system. |

### Verification

| Check | Result |
|---|---|
| Round-trip base + enrichment → original | **0 field differences** across all 111 records |
| Unexpected fields introduced | **0** (only the derived `posture_class`) |
| Enrichment intact on fused view | ✅ all deep fields match byte-for-byte |
| v1 popup system after split | ✅ loads clean, `openTemplePopup` / `buildSidebarList` present |
| CANON reconcile | ✅ 8/8 sets stamp exactly |

---

## Load order — this matters

```html
<script src="dd_v1_patch.js"></script>       <!-- 1. legacy: popup + sidebar fns -->
<script src="dd_v2_base.js"></script>        <!-- 2. thin base -->
<script src="dd_v2_enrichment.js"></script>  <!-- 3. parallel enrichment -->
<script src="dd_v2_loader.js"></script>      <!-- 4. join + fused view -->
<script src="dd_v2_canon.js"></script>       <!-- 5. reconcile categories -->
```

⚠️ **`dd_v1_patch.js` must load first.** Its Section A assigns `window.DIVYA_DESAMS` unconditionally, so if it loads *after* the v2 files it silently overwrites the v2 data with the stale fused copy. Loading it first lets v2 become the data authority while v1's Section B functions stay available.

This mirrors PPS, where `pps_v3_patch.js` loads first and later patches take authority over `window.TEMPLES`.

### Globals after load

```js
window.DD_TEMPLES     // thin base    — new source of truth
window.DD_ENRICHMENT  // by sno       — new source of truth
window.DIVYA_DESAMS   // fused view   — back-compat, v1 reads this
window.ddEnrich(sno)  // accessor for migrated code
window.ddTemple(sno)  // accessor for migrated code
```

---

## Why the shim exists

PPS keeps base and enrichment permanently apart because its `render()` only touches base fields and its detail panel reads `TEMPLE_ENRICHMENT[sno]` explicitly.

DD isn't there yet — Section B's five-tab popup reads enrichment straight off the temple object (`temple.sthala_purana`, `temple.alwars`, `temple.sii_references`). Splitting without a shim would blank every popup tab.

So `dd_v2_loader.js` is deliberately transitional. As each tab is migrated to read `ddEnrich(sno)`, the fused view can be retired and the shim deleted.

---

## What CANON fixes

### The stale `members` arrays

`window.CATEGORIES` defined 9 sets whose `members` arrays are on an **obsolete numbering**. Verified against town names:

| Set | `members` said | Those actually are | Real membership |
|---|---|---|---|
| `divya_kanchi` | 76–89 | Pandya Nadu / Nava Tirupathi | **46–59** (Kanchipuram) |
| `nava_tirupathi` | 50–59 | Kanchipuram | **71–79** (Thamirabarani) |
| `thirunangur_cluster` | 24–36 | Aadhanoor, Thirumogur, Thirumalirunjolai | **60–70** (Thirunangur) |

`buildRelatedTab()` reads those arrays for its "All N temples" counts — so **every one of those counts is currently wrong on the live site.**

### The 130 undefined slugs

Of 139 category slugs in the data, 130 had no definition. `buildRelatedTab` drops undefined slugs silently, so they render as nothing.

CANON is built from the **data stamps**, each verified against town names — not from the stale arrays.

### Sets now canonical (8)

| Set | Members | Basis |
|---|---:|---|
| Divya Kanchi | 14 | town = Kanchipuram, verified |
| Thirunangur 11 | 11 | town = Thirunangur, verified |
| Nava Tirupathi | 9 | Thamirabarani cluster, verified |
| Pancha Pandava | 5 | Kuttanad, complete 5/5 |
| Alwar Birthplace | 4 | avatara sthalams attested in corpus |
| Pancha Rangam | 4 | resolved from corpus's own text |
| Sapta Mokshapuri | 4 | 4 of 7 fall in corpus |
| Ulagalantha Complex | 3 | Big Kanchipuram complex |

**Result:** 54 canonical stamps · 7 temples in 2+ sets (gold ring) · 64 uncategorised (slate) · 92 descriptive tags preserved untouched.

### Notable find — a complete latent set

Nava Tirupathi doubles as the **navagraha correspondence, complete 9/9**. v1 encoded this as nine separate single-member slugs (`surya_sthala`, `chandra_sthala`, …). Those are retired — the per-temple `planet` field already carries it, and nine one-member "sets" aren't sets.

### Slugs retired

- **23 region duplicates** (`malai_nadu`, `vada_nadu`, `chola_nadu`, …) — duplicate the `region` field verbatim
- **2 exact duplicates** — `nangur_11` → `thirunangur_cluster`, `element_temples` → `ulagalantha_complex`
- **14 folded into fields/sets** — the 9 graha slugs → `planet`; the 5 Pandava shrine slugs → `pancha_pandava`

---

## Rulings pending — your call

Recorded in `window.DD_RULINGS_PENDING`, **not** silently resolved. None are enabled.

| Set | Issue | Suggested |
|---|---|---|
| `pancha_naranyam` | Obsolete members; **zero** textual matches in the whole corpus; one stray stamp on #97 (an Andal shrine) | Research needed |
| `pancha_krishnam` | Obsolete members; zero stamps; only #10 mentions it | Research needed |
| `swayamvyakta` | 1 live stamp vs 7 claimed | Propose **[1, 98, 107, 108]** in-corpus |
| `char_dham` | Only 2 of 4 are Divya Desams | Propose **[104, 107]**, disclosed as 2 of 4 |
| `andal_thiruppavai` | Hand list vs 11 attested in `alwars` data | Derive from attestation |

Also unresolved: **#6 Anbil** and **#20 Thirukkoodalur** describe themselves as *"extended Pancharanga tradition"*. Excluded from the core 4 — say the word if you want them in.

---

## Bonus fixes included

**`posture_class`** — a derived, normalised field. `posture` is 32 freeform strings; the v1 Phase-2 regex mis-binned three multi-posture temples (#36 Thirunīrmalai, #37 Sholingar, #82 Ahobilam) by test order. New classifier gives them their own `Multiple` class:

```
Nindra 78 · Kidantha 20 · Veetrirundha 7 · Multiple 6
```

**Performance** — first paint now needs **177 KB instead of 2.73 MB (93.7% less)**. `dd_v2_enrichment.js` can be deferred or lazy-loaded on first popup open, since nothing in the map, sidebar, filters or search touches it.

---

## Not yet done

The split is infrastructure. Still open, in the order I'd tackle them:

1. **Rewrite DD's filter core** — `refreshMapMarkers` uses `if (search) … else if (chip)`, so filters can't stack. PPS's composable `passes()` chain is the model. This blocks category pills, tier pills and posture filter all stacking.
2. **Wire `dd_phase2_enhancements.js`** — still not called from `index.html`, and its `extractSno()` finds nothing because markers carry no sno. One-line fix: `marker._sno = temple.sno`.
3. **Define `filterByNadu` / `filterByCategory` / `filterByAlwar`** — referenced by every Related-tab CTA, defined nowhere. All dead clicks today.
4. **Reconcile `ALWARS` metadata** — says Nammalvar 37 / Thirumangai 86 / Andal 13; live data attests 49 / 83 / 11. Must be fixed before any Alwar journey can be trusted.
5. **`content_tier`** — DD has `kalvettu_tier` (epigraphy) but no editorial-depth tier. Deliberately *not* invented here: PPS's Session 2C.5 had to unwind exactly that conflation. Content is unusually uniform (median 4,640 chars, min 2,001, max 10,458), so anchors should be an owner ruling on theological significance, not a length threshold.
