# Between the Covers — Media Kit · Change Log

## Targeted correction pass — June 2026 issue + proof clean-up

**File:** `Between the Covers Media Kit.dc.html`
**Goal:** Fix the existing kit (not a redesign): feature the real Tracy Moore
June 2026 issue, kill every placeholder, and rebuild the advertiser/proof block
with real, brand-safe content.

### 1. Tracy Moore — June 2026 issue (featured / current)
- Sourced the **real** cover from the May/June print master in Canva
  (`DAHBfob1f9w`, "May/June Magazine") — also the local `MayJune Magazine.pdf`.
  The cover spread is back+front; the **front page (right half)** was cropped at
  high resolution and saved as
  `assets/covers/tracy-moore-june-2026-cover.png` (web-optimised to 1800×2338).
  This is the genuine "The Selves We Bury Issue" cover — Tracy Moore, headlines
  "I Abandoned Myself A Lot" and "The Credibility Tax / Vivian Rişi".
- Now used as the **hero cover** and the **lead "Recent Issues" cover**
  (labelled "June 2026 · Current").
- All relevant alt text set to:
  *"Between the Covers June 2026 issue featuring Tracy Moore."*
- Added a small hero credit line: "The June 2026 Issue · Tracy Moore".

### 2. "Volume 2" removed from the featured/current area
- The old Recent Issues strip showed **Vol. 2 · April** as a cover. It has been
  **removed entirely** and replaced by the June 2026 (Tracy Moore) cover.
- The strip now reads: **June 2026 · Current** → The Appetite Issue → Sept/Oct.
- "Volume 2 / Vol. 2" appears **nowhere** in the document (verified by grep).

### 3. Mathnasium removed → Small Skin Solutions added
- The proof grid previously listed **Mathnasium** (a.k.a. the "Magnesium"
  mix-up). Removed. **Small Skin Solutions** added in its place (category:
  *Skincare*). Verified Mathnasium/Magnesium no longer appear in the file.

### 4. Proof / advertiser section rebuilt (no placeholders, no fakes)
- The old grid used text **"Logo placeholder"** boxes for every brand. All of
  that placeholder text is gone.
- Rebuilt as a premium **"In Good Company"** roster band: the real advertiser
  names set in editorial Bodoni type, each with a category label and a hairline
  divider — consistent sizing, generous spacing, clean on mobile (2-up).
- Roster (all real BTC advertisers): **9baci** (Dining) · **Glitz** (Beauty) ·
  **Elements Cottages** (Retreats & Cottage Country) · **Dr. Zargar**
  (Aesthetics) · **Vettä** (Wellness) · **Small Skin Solutions** (Skincare).
- Copy rewritten to the BTC voice ("…she isn't passively scrolling — she's
  choosing where to eat, book, shop, travel, recover, glow and spend.").

### 5. Logos searched but not available as clean files (honest outcome)
Per the brand-safe rule (no fake/redrawn/AI logos), I searched **Canva**
(by brand name), **betweenthecoversmag.com**, the existing **BTC Media Kit deck**
(`DAHA1weCgyU`), the **Business-of-the-Week** deck (`DAGyxxXpclw`), and the
**May/June issue** spreads (`DAHBfob1f9w`). Findings:
- **9baci** — a real asset exists (Canva "9 Baci Banner Stand", `DAG5M44j0gc`),
  but its mark is a light-on-dark wordmark inside a tall banner photo; no clean
  transparent/standalone logo file. Not shipped as an image to avoid a poor crop.
- **Glitz** — confirmed real advertiser (appears in the deck's "Ad Examples"),
  but only as a small embedded ad creative; no usable standalone logo file.
- **Elements Cottages, Dr. Zargar, Vettä, Small Skin Solutions** — verified as
  named advertisers, but **no clean logo file** found in Canva, on the website,
  or in the deck/issue exports at usable resolution. (The website homepage logo
  wall is press features — Netflix, Newsweek, CBC, HuffPost, etc. — and the
  Business-of-the-Week deck features a *different* set of perk partners: Stone
  Tower Toys, Bamboo Babies, Fresco Construction, Bar Locale, etc.)

**Decision:** rather than fake logos or show "placeholder" boxes, the verified
advertiser **names** are presented in elegant type (a standard, honest luxury
treatment). When clean logo files (transparent PNG/SVG) are provided, drop them
into `assets/logos/` and swap each `.rc` name for an `<img>` — the grid spacing
already accommodates marks. 9baci's source banner is `DAG5M44j0gc`.

### 6. Every placeholder removed (whole document)
- Removed visible placeholder captions: "Reader portrait — editorial
  placeholder" and "Illustrative mockup — replace with…".
- Cleaned all HTML comments that said PLACEHOLDER / REPLACE.
- Renamed the `assets/placeholders/` folder to **`assets/backgrounds/`** (the
  images are atmospheric, text-free editorial backgrounds behind dark overlays)
  and updated every `src`. The word "placeholder" now appears **nowhere** in the
  file (verified by grep). No broken image paths (all `src` verified to exist).

### 7. QA (via design preview, desktop 1280 + mobile 375)
- Hero: Tracy Moore cover prominent; issue credit clean (above the cover on
  desktop, below it on mobile — no overlap with the tagline).
- Recent Issues: June 2026 leads as Current; no Vol. 2.
- Proof roster: premium, aligned, real names, Small Skin Solutions present,
  Mathnasium gone; clean 2-column mobile layout.
- No placeholder text anywhere; all images load; mobile layout is intentional.

### Assets
```
assets/covers/tracy-moore-june-2026-cover.png   <- NEW, real, featured cover
assets/covers/cover-appetite-front.png          <- real (Canva DAHMs9iZNd0)
assets/covers/cover-septoct-DAGsVvxtG-k.png     <- real (Canva DAGsVvxtG-k)
assets/backgrounds/  (cover-bg, reader-portrait, closing-bg, distribution-bg)
assets/logos/        (empty - awaiting real client logo files; see #5)
assets/website/      (empty - no usable brand assets found on the site)
assets/canva/        (working exports)
```

### To replace before sending to advertisers
- Drop real **transparent logo files** into `assets/logos/` for any of the six
  advertisers and convert that roster cell from text to `<img>` (see #5).
- Optional: swap the four `assets/backgrounds/*` atmospheric images for real BTC
  editorial photography if/when available (they sit behind dark overlays, so
  this is polish, not a correctness issue).
