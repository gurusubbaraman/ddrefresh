# 108 Divya Desams

An interactive bilingual atlas of the 108 Divya Desams — the temples of Vishnu
sung by the twelve Alwars in the Nalayira Divya Prabandham between the sixth and
ninth centuries.

**Live:** https://gurusubbaraman.github.io/ddrefresh/

Every temple carries a sthala purana in English and Tamil, deity and consort
names, vimana, pushkarini, festivals, Alwar attestation and verified
coordinates. The map filters compose: search, region, pilgrimage set, posture
and Alwar can all be applied at once.

---

## Contents

- [Corpus at a glance](#corpus-at-a-glance)
- [Architecture](#architecture)
- [Load order](#load-order)
- [Data model](#data-model)
- [Why sno 79 is empty](#why-sno-79-is-empty)
- [The bake](#the-bake)
- [Canon](#canon)
- [Filters and markers](#filters-and-markers)
- [Known issues](#known-issues)
- [What was deliberately not built](#what-was-deliberately-not-built)
- [How to make a change](#how-to-make-a-change)
- [Lessons from the build](#lessons-from-the-build)
- [Session history](#session-history)

---

## Corpus at a glance

| | |
|---|---|
| Terrestrial Divya Desams | **106** |
| Celestial Divya Desams | **2** (#110 Ksheera Sagara, #111 Sri Vaikuntham) |
| **Canonical total** | **108** |
| Abhimana Kshetrams | 2 (#100 Simhachalam, #109 Mannargudi) — outside the 108 |
| Records in the corpus | 110 |
| Vacant slot | #79 — [see below](#why-sno-79-is-empty) |
| Coordinates owner-verified | 49 of 108 |
| Bilingual content | ~564 KB (283 KB EN, 294 KB TA) |

### Regional distribution

Matches the canonical six-Nadu division exactly:

| Nadu | Count |
|---|---:|
| Chola Nadu | 40 |
| Thondai Nadu | 22 |
| Pandya Nadu | 18 |
| Malai Nadu | 13 |
| Vada Nadu | 11 |
| Nadu Nadu | 2 |
| **Total** | **106** |

---

## Architecture

The site is a single static page with no build step and no framework. Everything
is plain ES5 in nine script files, served from GitHub Pages.

```
index.html            markup, CSS, map init, mobile interactions
  dd_v1_patch.js      legacy: 5-tab popup, sidebar renderer, ALWARS, CATEGORIES
  dd_v2_base.js       BAKED — thin temple array, 24 fields x 110 records
  dd_v2_enrichment.js BAKED — deep content keyed by sno, plus retired records
  dd_v2_loader.js     joins base to enrichment, publishes the fused view
  dd_v2_canon.js      canonical sets, category metadata, Alwar counts
  dd_v2_filters.js    composable filter chain, category pills, posture pills
  dd_v2_markers.js    category-coloured numbered markers, coordinate audit
  dd_v2_shim.js       sidebar highlight, hover preview cards, click-to-fly
  dd_feedback.js      visitor feedback widget
```

The split follows the pattern used by the companion Paadal Petra Sthalams site:
a **thin base** holding only what the map, sidebar, search and filters need, and
a **parallel enrichment** store holding the deep content. First paint reads the
base alone.

### Why `dd_v1_patch.js` is still here

It is a 2.8 MB legacy file predating the split. It still owns the five-tab
temple popup, the sidebar renderer, the Alwar avatars and the compare modal, and
those have not been ported. Two of its globals — `window.ALWARS` and
`window.CATEGORIES` — are rebuilt on every page load with **stale values**, and
`dd_v2_canon.js` corrects them at runtime for exactly that reason.

⚠️ **It must load first.** Its Section A assigns `window.DIVYA_DESAMS`
unconditionally. If it ran after the v2 files it would silently overwrite the
corrected corpus with pre-split data.

---

## Load order

Load order is **load-bearing**, not stylistic:

| Position | File | Why there |
|---|---|---|
| 1 | `dd_v1_patch.js` | assigns `DIVYA_DESAMS` unconditionally; must be overwritten, not overwrite |
| 2–3 | `dd_v2_base.js`, `dd_v2_enrichment.js` | data must exist before the loader runs |
| 4 | `dd_v2_loader.js` | prunes v1's stale records, merges base + enrichment in place |
| 5 | `dd_v2_canon.js` | stamps categories onto the fused view; corrects `ALWARS` and `CATEGORIES` |
| 6–7 | `dd_v2_filters.js`, `dd_v2_markers.js` | both read `DD_CANON` and `DD_CAT_META` |
| 8 | `dd_v2_shim.js` | supplies two functions `dd_v2_markers.js` calls but does not define |
| 9 | `dd_feedback.js` | touches no data |

### The in-place rule

`dd_v1_patch.js` Section B captures its array reference at parse time:

```js
const DIVYA_DESAMS = window.DIVYA_DESAMS;   // inside the Section B IIFE
```

So the global must be **mutated, never reassigned**. `window.DIVYA_DESAMS = x`
orphans Section B and blanks every popup tab. The loader splices and copies
fields; it never replaces the array object. The same applies to
`window.CATEGORIES`.

### Cache-busting

Every script tag carries `?v=` — currently `v5.2`. **Bump it on every deploy.**
GitHub Pages caches aggressively and a stale file has bitten this project more
than once. If a fix appears not to have landed, check the version string first.

---

## Data model

Two stores joined on `sno`.

### Base — `dd_v2_base.js`

24 fields per record. Everything the map, sidebar, search and filters read:

```
sno  region  temple_name  temple_name_ta  temple_name_short
temple_name_short_ta  town  town_ta  district  state
lat  lng  posture  posture_class  categories  canonical_position
is_celestial  is_abhimana  sthala_purana_tagline
sthala_purana_tagline_ta  kalvettu_tier  wiki_url
coords_verified  coords_source
```

### Enrichment — `dd_v2_enrichment.js`

Keyed by `sno`. Sthala purana EN and TA, perumal and thayar names in both
languages, vimana, pushkarini, facing, festivals, distinctive features, Alwar
attestation with pasuram counts, acharya associations, epigraphy notes,
canonical notes and external sources.

### `sno` is canonical

It is referenced by `CANON` membership arrays, retired-record restore targets,
marker keys, sidebar `onclick` handlers and any URL a visitor has saved.

**Never renumber.** Every gap in the sequence is deliberate and documented.

### Retired records

Five records displaced by merges are preserved in full inside
`dd_v2_enrichment.js` under `window.DD_RETIRED_RECORDS`:

| Key | Was | Displaced by |
|---|---|---|
| `loganatha_thetriyambalam` | #68 | duplicate of #70 |
| `thiruvali` | #42 | merged into #80 |
| `manikundram` | #44 | merged into #43 |
| `thanjaiyali` | #45 | merged into #43 |
| `aravindalochanar` | #79 | merged into #78 |

Each carries full base **and** enrichment. Any merge is reversible:

```js
DDRemap.restoreRetired('thiruvali', 42);
```

No ruling made during this project is irreversible.

---

## Why sno 79 is empty

**The corpus runs #1–108 with #79 vacant, and that is correct.**

Irattai Tirupathi is two shrines about 160 m apart at Tholaivillimangalam —
Devapiran and Aravindalochanar. Within the Nava Tirupathi circuit they count as
**two of the nine** and carry separate navagraha assignments, Rahu and Ketu. But
the canonical 108 counts them as **one Divya Desam**. Session 2A.3 merged them
into #78, which released #79.

- **Filling it** creates a 109th Divya Desam.
- **Renumbering to close it** breaks the retired-record restore targets, every
  `CANON` membership array, the audit trail across eight session files, and any
  saved link.

The gap is the evidence the merge was done correctly. This is also stated in the
header of `dd_v2_base.js`, because a future maintainer will otherwise try to
helpfully fix it.

**Do not fill #79. Do not renumber.**

---

## The bake

Corpus edits are made as **runtime patch sessions** — a new file appended to the
chain that mutates `window.DD_TEMPLES` on load. The base file is never rewritten
by hand.

Periodically those sessions are **baked**: run in order, the result captured, and
fresh `dd_v2_base.js` and `dd_v2_enrichment.js` emitted. Session files stay in the
repo as the audit trail but stop executing.

Two bakes so far. The current files carry `2026-08-01` and fold in eight
sessions.

### ⚠️ Baking freezes derived fields

This cost two deploy cycles and is the single most important thing to know.

`posture_class` is *derived* from the freeform `posture` string by a classifier
in `dd_v2_filters.js`. The bake froze the computed values. When the classifier
was later corrected, the function still opened with:

```js
if (t.posture_class) return t.posture_class;   // returns the STALE baked value
```

The fix ran, the tests passed, and nothing changed on the site — because the
function returned before reaching any of the new logic.

**When baking, either recompute derived fields or do not read them back.** The
current classifier caches under a private key and writes the corrected value
back to `posture_class`.

### Verifying a bake

Diff the baked output against the runtime stack field by field, across every
record. The last bake compared 2,438 base fields and 4,347 enrichment fields and
reported zero differences. Anything less is not a verification.

---

## Canon

Ten pilgrimage sets, in `dd_v2_canon.js`:

| Set | Members | snos |
|---|---:|---|
| `divya_kanchi` | 14 | 46–59 |
| `thirunangur_cluster` | 11 | 60–70 |
| `nava_tirupathi` | 8 | 71–78 |
| `swayamvyakta` | 6 | 1, 45, 98, 99, 107, 108 |
| `pancha_pandava` | 5 | 90, 91, 92, 93, 95 |
| `ulagalantha_complex` | 4 | 49, 53, 54, 55 |
| `alwar_birthplace` | 4 | 47, 48, 71, 72 |
| `pancha_rangam` | 4 | 1, 4, 5, 7 |
| `sapta_mokshapuri` | 4 | 101, 102, 104, 107 |
| `char_dham` | 2 | 104, 107 |

### Two counts that look wrong and are not

**Nava Tirupathi shows 8, not 9.** The circuit visits nine shrines but the 108
counts eight Divya Desams among them, because Irattai Tirupathi is one desam
with two sannidhis.

**Swayamvyakta shows 6 of 8.** Two of the Ashta Swayam Vyakta Kshetras —
Srimushnam and Pushkar — are not Divya Desams. Similarly **Char Dham shows 2 of
4**: Puri is Jagannath and Rameswaram is a Jyotirlinga.

Each affected record discloses this in its own text.

### Adding or changing a set

Two places must agree:

1. `CANON[slug]` — the membership array
2. `CAT_META[slug]`, `ICONS[slug]`, `PRECEDENCE` — presentation

Then `reconcileCategories()` stamps the slug onto every record, and
`syncLegacyCategories()` rebuilds `window.CATEGORIES` so the Related tab shows
the right count. Both run on every load and cannot be baked, because they repair
objects that `dd_v1_patch.js` recreates each time.

### Rulings

Five candidate sets were researched. Two enabled, three declined — with reasons
kept in `DD_RULINGS_RESOLVED` so the research is not repeated:

| Set | Ruling |
|---|---|
| `swayamvyakta` | **enabled**, 6 of 8 |
| `char_dham` | **enabled**, 2 of 4 |
| `pancha_krishnam` | declined — real set, membership unverified |
| `pancha_naranyam` | declined — resolves to Pancha Narasimha, only 1 in-corpus member |
| `andal_thiruppavai` | declined — redundant with the Alwar filter |

Run `DDCanon.rulings()` in the console for the full reasoning.

⚠️ **One conflict is recorded rather than resolved.** The sixth Swayam Vyakta
Kshetra is *Toyadri* in the Sanskrit verse. One source glosses this literally as
Thiruneermalai (#36) — *neer* water, *malai* hill. Most sources read it as
Thothadri, the Sanskrit name of Vanamamalai (#45). The corpus follows the
majority and stamps #45; the minority reading is written onto that record. To
switch, change one `sno`.

---

## Filters and markers

### Composable filtering

`dd_v2_filters.js` replaces the original if/else with an AND-chain:

```js
naduOK(t) && catOK(t) && postureOK(t) && alwarOK(t) && searchOK(t)
```

Search, region chip, category pill, posture and Alwar all apply simultaneously.
Previously typing in the search box silently ignored an active region chip.

### Posture pills overlap deliberately

Six temples hold more than one posture — Thirukkoodal has all three on three
levels of one vimana. They appear under **each** posture filter, so the three
pills sum to more than the corpus. The tooltip discloses this. Forcing each
temple into a single bucket would be the inaccurate choice.

### Markers

Numbered pins coloured by pilgrimage set, with a gold ring on the 11 temples
belonging to two or more sets and a stack badge where several temples share one
coordinate. `PRECEDENCE` resolves the fill colour deterministically.

⚠️ Four temples share `12.83917, 79.705` — #49, #53, #54, #55, the Ulagalantha
complex. That is genuine, not a data error: all four Divya Desams sit inside one
temple compound.

### Coordinate audit

```js
DDMarkers.auditCoords();   // precision buckets, collisions, set dispersion
DDCoordAudit.unverified(); // the 59 not yet owner-verified
```

---

## Known issues

### Alwar attestation diverges from tradition

`window.ALWARS.divyaDesamsSung` is now measured from the corpus rather than
inherited, and `attestationSnos` records the exact evidence. But the corpus and
the published tradition **agree on the total and disagree on the distribution**:

| Alwar | Corpus | Traditional |
|---|---:|---:|
| Nammalvar | 50 | 37 |
| Thirumangai | 80 | 86 |
| Thondaradippodi | 7 | 1 |
| Periyalvar | 10 | 17 |
| Thiruppan | 3 | 1 |
| **Total** | **217** | **217** |

Thondaradippodi is the clearest case. Tradition credits him with **Srirangam
alone** — he famously never left it. The corpus tags him at seven, and five of
those references read *"Thirumaalai verse referencing Ayodhya"* and similar:
the poem *mentioning* a place, not mangalasasanam of a temple.

The aggregate agreement means the counting basis is the same and the error is in
individual assignments. Correcting it requires checking all 108 against a
per-kshetram pasuram authority. **Not done.** Both figures are stored, so
nothing is hidden.

### 59 coordinates unverified

49 of 108 carry owner GPS. The rest are published values, mostly Wikipedia, and
each records its provenance in `coords_source`.

### Baked `posture_class` is stale on disk

The runtime classifier corrects it, but the value frozen in `dd_v2_base.js` is
from the superseded logic. If the file is ever re-baked, recompute that field
rather than carrying it forward.

---

## What was deliberately not built

### Alwar Journeys

The original plan included tracing each Alwar's pilgrimage as an animated route,
matching the companion PPS site. **It was not built, and the reason matters.**

An attestation audit classified all 219 records by evidence strength. Filtering
to strong evidence and terrestrial temples only:

| Alwar | Route-viable stops |
|---|---:|
| Thirumangai | 76 — too many |
| Nammalvar | 48 — too many |
| Peyalvar | 9 |
| Periyalvar | 8 |
| all others | ≤ 7 |

PPS works because four saints carry 17–24 stops each, which reads as a
narrative. Here, two Alwars are unmappable and the rest are too sparse.
Peyalvar's nine stops span five regions — a scatter, not an itinerary.

More fundamentally: PPS validated its routes against a dedicated attestation
field, and that check caught three real misattributions. **DD has no equivalent.**
The `alwars` object is the only source, and it is the thing in question.

Building routes now would produce authoritative-looking lines resting on data
demonstrably unreliable. The prerequisite is the attestation reconciliation
above.

---

## How to make a change

### Correcting coordinates

Create a new session file. Do not edit the baked base.

```js
(function () {
  if (window.DD_SESSION_1D4_LOADED) return;
  window.DD_SESSION_1D4_LOADED = true;
  var FIXES = { 42: [9.914397, 78.114108, 'Thirukkoodal'] };
  // apply to every array in DD_TEMPLES / DIVYA_DESAMS / DD_FUSED,
  // setting lat, lng, coords_verified and coords_source together
})();
```

Add one `<script>` tag, bump `?v=`, deploy, verify, then fold into the next bake.

### Correcting content

Same pattern, writing to `window.DD_ENRICHMENT[sno]` and mirroring onto the
non-thin arrays so the v1 popup reads the change. `dd_v2_kerala.js` is the
worked example — nine records rewritten, then baked in and retired.

### Always

- **Verify before shipping.** Every session in this project was diffed against
  the previous state before deploying.
- **Record conflicts, do not resolve them silently.** Where sources disagree,
  both readings go into the record.
- **Guard against double-loading.** Every session file opens with a
  `DD_SESSION_x_LOADED` check, so a forgotten script tag is untidy rather than
  destructive.

---

## Lessons from the build

Three failure modes this project actually hit. All three are the same shape: a
check that passed while the underlying thing was wrong.

**1. Baking freezes derived values.** A corrected classifier ran, tests passed,
and the site did not change — because the function read a stale baked field and
returned before reaching the new logic. *Derived data needs recomputing or not
reading back.*

**2. A correct opening line can wrap entirely wrong content.** Nine Kerala
puranas each opened by naming their correct Malai Nadu ordinal — "the FOURTH…",
"the FIFTH…" — so a structural check passed. The bodies described other temples.
Thrikkakara, where Onam originates, had no mention of Onam. *Validate the body,
not the header.*

**3. An audit finding can be a canon error in disguise.** The coordinate audit
reported four temples stacked at one point. It was recorded as "genuinely
co-located" and set aside. Those four were the Ulagalantha complex, and the
canon set listing them was missing its principal shrine. The evidence had been
on screen for weeks. *When data surprises you, ask what else it implies.*

---

## Session history

| Session | Change |
|---|---|
| 1D.1 | 21 owner-GPS coordinates; Thirunangur cluster separated |
| 2A.1 | #83 Thiruvellakulam remapped to #68; Loganatha retired |
| 2A.2 | #70 renamed Thiruthetriyambalam; Kazheesirama added; Thiruvali merged into #80 |
| 2A.3 | Thanjai 43+44+45 → 43; Irattai 78+79 → 78; three Pandya temples added; Simhachalam reclassified |
| 2A.4 | Regional reclassification to the canonical 40/18/22/13/11/2 |
| 2A.5 | All twelve Alwar counts corrected and evidenced |
| 2B.1 | Five category rulings; coordinate audit helper |
| 2B.2 | Feedback widget |
| — | **First bake** — 16 scripts to 8 |
| 1D.2 | 28 coordinates, including the 52.8 km Nathan Koil correction |
| 2C.1 | Deity and consort names corrected for #87–94 |
| 2C.2 | Nine Kerala puranas rewritten, ~40 KB bilingual |
| 1D.3 | #95 Thiruvanvandoor refined |
| — | **Re-bake** — Kerala and canon folded in |
| 2C.3 | `ulagalantha_complex` corrected to include #49 |

---

## Sources

Wikipedia, garudaseva.org, divyadesam.com, divineguide.com, 108divyadesams.in,
templenet.com, the TRS Iyengar kshetram-wise pasuram tables, Kerala Tourism,
temple trust websites, and the *108 Tirupathi Anthathi* of Pillai Perumal
Iyengar. Individual attributions are recorded in each record's
`external_sources` and `canonical_note`.

Corrections are welcome through the feedback widget on the site.

---

## Credits

Built and maintained by **Guru Subbaraman**.

Companion project: **Paadal Petra Sthalams** — the 276 Shiva temples of the
Thevaram. The architectural patterns here — the base/enrichment split, canonical
set reconciliation, runtime patch sessions, coordinate provenance — were
developed there first and ported.

*ஓம் நமோ நாராயணா*
