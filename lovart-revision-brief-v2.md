# ShakeSecret — Concept Art Revision Brief v2 (Final)

## Overview

**Product**: ShakeSecret — Blind Box  
**Platform**: Mobile (iOS / Android), portrait-first  
**Art style**: Maintain the cream-tone + Pop Mart ugly-cute IP aesthetic from the original 4 pages. Keep the quality, warmth, rounded corners, ribbon/bow decorative elements.  
**Core mechanic**: Shake blind boxes, listen to the sound, and match what's inside to the correct box — simulating the real blind box shaking experience.

**Changes from v1**: This brief supersedes the previous round. All changes are marked below.

---

## Global Changes (All Pages)

1. **Brand name**: Main title **"ShakeSecret"**, subtitle **"Blind Box"**. Remove "PUFF & PALS" and "Collect · Care · Cherish"
2. **No level system**: Do not display Lv.XX or any progression numbers
3. **No virtual currency**: No diamonds, coins, or Daily Reward counters
4. **No rarity tiers among regulars**: All regular figures in a series have equal probability. Only two tiers exist: Regular and Hidden. Do NOT use heart/star rarity indicators for regular figures — show character **name** instead
5. **Overall tone**: Warm, cute, healing — unchanged

---

## Page 1: Home (Redesigned Entry Page)

### Layout (Minimalist)

```
[Settings icon]                          ← Top-left, small gear, low visual weight

        SHAKESECRET                      ← Main title (3D embossed lettering, cream+pink)
        Blind Box                        ← Subtitle (handwritten ribbon style)

   ┌──────────────────────────┐
   │                          │
   │   [Current theme         │          ← Central hero card, 60% of page
   │    featured character]   │             Shows character from currently
   │                          │             selected theme
   │   "Vanilla Whisper"      │          ← Character NAME (not "LEGENDARY")
   │   No.07                  │          ← Figure number
   │                          │
   └──────────────────────────┘

   ╔════════════════════════════╗
   ║        ★ START ★          ║         ← Primary CTA, large pink capsule button
   ╚════════════════════════════╝            Must be the most visually prominent element

   ┌──────────────────────────┐
   │  📖 Collection Guide      │         ← Secondary CTA, ~2/3 size of START
   └──────────────────────────┘
```

### Requirements:
- **No bottom navigation bar** (remove HOME/COLLECTION/GARDEN/SHOP/EVENTS 5-tab bar entirely)
- Only two entry points: START (play) + Collection Guide (view collection)
- START button must be the most visually prominent element on the page
- Settings icon in top-left corner, small and unobtrusive
- Hero card shows the featured character from the player's current theme
- Character card displays: character illustration + **character name** (not rarity label like "LEGENDARY") + figure number

---

## Page 2: Collection Wall (Restructured)

### Layout

```
┌─────────────────────────────────────┐
│  ✕                    COLLECTION    │
│                           WALL       │
├─────────────────────────────────────┤
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │    ← Series tabs
│ │Tab1│ │Tab2│ │Tab3│ │Tab4│ │Tab5│ │
│ └────┘ └────┘ └────┘ └────┘ └────┘ │
│                                     │
│  ✦ COZY FRIENDS ✦      [👁]        │    ← Series name + preview icon on FAR RIGHT
│  Snuggly buddies...                 │       Click icon → floating modal with
│                                     │       full lineup preview (family photo)
│ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │  01    │ │  02    │ │  03    │   │    ← 3-column grid (3 cols × 3 rows)
│ │ [fig]  │ │ [fig]  │ │  ?     │   │    ← Collected = full illustration
│ │ Banana │ │ Glacier│ │         │   │    ← Show character NAME (not hearts/stars)
│ └────────┘ └────────┘ └────────┘   │    ← Uncollected = gray + "?" + number
│                                     │
│ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │  04    │ │  05    │ │  06    │   │
│ │  ?     │ │ [fig]  │ │ [fig]  │   │
│ │         │ │ Mint   │ │ Choco  │   │
│ └────────┘ └────────┘ └────────┘   │
│                                     │
│ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │  07    │ │  08    │ │  09    │   │
│ │ [fig]  │ │ [fig]  │ │ ⭐ HIDDEN│ │    ← Position 9 = Hidden edition
│ │ Berry  │ │ Cream  │ │ ???     │   │    ← Gold border + silhouette + "?"
│ └────────┘ └────────┘ └────────┘   │    ← "HIDDEN" label
│                                     │
│  56% COMPLETE  5/9     [SHARE]     │    ← Progress bar
└─────────────────────────────────────┘
```

### Requirements:
1. **Grid layout**: 3 columns × 3 rows = 9 cells (8 regular + 1 hidden)
2. **Preview icon** (eye icon or similar): placed at the **far right of the series name**. Clicking it opens a **floating modal** showing all characters in this series as small thumbnails (hidden = silhouette only)
3. **Hidden edition**: Fixed at **position 9** (bottom-right cell). Display as: gold border + character silhouette + "?" + "HIDDEN" small label. Add a note near the series title: "✦ This series contains a Hidden Edition! ✦"
4. **No heart/star rarity markers** — all regular figures have equal probability, so show **character name** instead
5. **Three cell states**:
   - Collected: full color illustration + character name + figure number
   - Uncollected: gray cell + large "?" + figure number
   - Hidden (untriggered): gold border + silhouette + "?" + "HIDDEN" label
6. **Clicking "?" cell** → enters gameplay level for that character (guaranteed to contain that target; distractors are random from same series; hidden edition can randomly appear)

---

## Page 3: Core Gameplay (Major Redesign)

This is the most changed page. The interaction model is completely restructured.

### Layout

```
┌─────────────────────────────────────┐
│                                     │
│  find:  [🎭?]  (0/1)               │    ← Target area (see detail below)
│                                     │
│                                     │
│       ┌───┐  ╔═══════╗  ┌───┐      │    ← 3 boxes in carousel
│       │ ? │  ║  ?    ║  │ ? │      │    ← ALL IDENTICAL appearance
│       │BOX│  ║  BOX  ║  │BOX│      │    ← Center box = LARGER + elevated
│       └───┘  ╚═══════╝  └───┘      │    ← Side boxes = smaller + slightly dimmed
│              [小头像]               │         ← Bound avatar appears ABOVE center box
│            ┌──────────┐            │       (swipe left/right to switch selected box)
│            │ Your pick│            │    ← Small tag/label below center box
│            └──────────┘            │       Communicates "CONFIRM = buying THIS box"
│                                     │
│  ─── Match → ───                   │    ← Instruction line (NOT "Which box is it?")
│                                     │
│        [🔔 SHAKE]  x7              │    ← SHAKE: custom icon button ABOVE candidates
│                                     │       Remaining shake count in plain number
│  ┌──────┐  ┌──────┐  ┌──────┐     │    ← Candidate avatars (3~5 in a row)
│  │ 🎭1  │  │ 🎭2  │  │ 🎭3  │     │    ← Click → binds to currently selected box
│  │Banana│  │Mint  │  │Berry │     │    ← Show character NAME below each avatar
│  └──────┘  └──────┘  └──────┘     │    ← tap to match
│                                     │
│  ╔═════════════════════════════════╗│
│  ║       Take this one              ║│    ← Full-width bottom bar button
│  ╚═════════════════════════════════╝│    ← Gray/disabled until all 3 boxes matched
└─────────────────────────────────────┘
```

### Detailed Requirements:

#### ① Target Area (Top)
```
find:  [silhouette ?]  (0/1)
```
- Normal state: **1 target** shown as a **character silhouette + "?"** + counter `(0/1)`
- When hidden edition is triggered: **2 targets displayed side by side**
  ```
  find:  [regular ?]  [⭐ hidden ?]  (0/1)
  ```
  - First: regular target silhouette + "?"
  - Second: hidden target shown as **star silhouette + "?"** (matching the collection wall hidden style)
  - **Do NOT use large "HIDDEN EDITION" banner text** — use silhouette differentiation only
- Counter `(0/1)` tracks whether the primary target was found

#### ② Blind Box Area (CRITICAL CHANGE)
- **3 blind boxes, ALL IDENTICAL in appearance** — same color, same shape, same size template, same "?" pattern, same "mystery BOX" text
- **Do NOT color-code the boxes** (no purple/green/pink/yellow/blue differentiation like the original)
- Boxes should be uniform cream/off-white with a simple "?" and gift-box pattern
- **Carousel layout with visual focus**:
  - Center box: **visually 15-20% larger** than side boxes + slightly elevated (soft shadow) + slight glow/spotlight
  - Left/right boxes: smaller + slightly dimmed (opacity ~0.6-0.7)
  - User can **swipe left/right** or tap side boxes to switch the focused box
- **"Your pick" visual language (IMPORTANT)**:
  - The center/focused box = the box the player is currently considering buying. When CONFIRM is tapped, this is the box the player "takes home"
  - Add a subtle visual indicator on/near the center box that communicates "this is the one you're picking" — suggestions:
    - A small shopping bag icon, tag icon, or gift tag hanging from the center box
    - A small label below the center box saying "Your pick" or "Pick this" in a rounded tag shape
    - A subtle highlight/glow ring around the center box (warmer/brighter than side boxes)
  - When the player swipes to a different box, this indicator moves with the new center box
  - The goal: make it visually obvious that **CONFIRM = buying the center box**, not all 3 boxes
- **Binding feedback**: When a candidate avatar is selected, a **mini circular avatar** appears **above the corresponding box** (like a small tag), showing which character the player has assigned to that box
- If a box has a binding, the mini avatar stays above it even when the box is not the current focus

#### ③ "Match →" Instruction Line
- Replace the original "Which box is it?" — it sounds too childish/preschool
- Use a concise matching instruction like **"Match →"** or **"Pick & Match"** with a small arrow pointing down toward the candidate area
- This tells the player: "tap a character below, then it gets matched to the focused box"
- Keep it minimal — 1-2 words + an arrow icon

#### ④ SHAKE Button (Custom Icon, Above Candidates)
- **Position**: Above the candidate avatar row, not below it
- **Style**: A **custom-shaped icon button** (not a plain text button) — suggest a shaking bell or shaking bottle silhouette shape
- **Format**: `[🔔 icon] SHAKE  x7` — remaining shake count shown as plain number (NOT heart shapes)
- **Default**: 3 boxes / 10 shake attempts per level
- Each tap: -1 count, plays audio + vibration + animation for the **currently focused box only**
- When count reaches 0: button grays out

#### ⑤ Candidate Avatar Area
- Shows all possible characters in this round (typically 3, matching the 3 boxes)
- Each candidate: round-cornered card with character avatar + character **name** below
- **Interaction**: Tap a candidate → it binds to the currently focused box (mini avatar appears above that box)
- Player can re-tap to change binding at any time
- Below the candidate row: small hint text "tap to match"

#### ⑥ CONFIRM Button (Full-Width Bottom Bar)
- **Position**: Full-width bar at the very bottom of the screen
- **Default state**: Grayed out / disabled
- **Active state**: When all 3 boxes have been matched with candidates → button lights up (color fill + subtle pulse)
- Optional disabled-state text: "3 matches to confirm"
- Tap CONFIRM → **the player "buys" the center box** → result page shows what was inside that center box only
- The CONFIRM button text could reinforce the purchase metaphor: "Take this one" or "Open" (rather than generic "CONFIRM")

---

## Page 4: Result Popup (Real Blind Box Purchase Experience)

### Core Concept Change
**Original**: All 4 boxes opened with ✅❌? marks + Mastermind reveal = information overload  
**New**: Simulate **real blind box purchase** — you picked 1 out of 3, you only see what you took home

### Layout

```
┌─────────────────────────────────────┐
│  ✕                                  │
│                                     │
│  ╔═════════════════════════════════╗│
│  ║                                 ║│
│  ║    ┌──────────────────────┐    ║│
│  ║    │                      │    ║│
│  ║    │   [Selected character]│    ║│    ← Only show the ONE box player chose
│  ║    │                      │    ║│
│  ║    └──────────────────────┘    ║│
│  ║                                 ║│
│  ║    "Banana"  No.03             ║│    ← Character name + number
│  ║    ┌──────┐                    ║│
│  ║    │ NEW! │                    ║│    ← "NEW!" tag (if new character)
│  ║    └──────┘                    ║│    ← OR "Already Owned" (if duplicate)
│  ║                                 ║│
│  ╚═════════════════════════════════╝│
│                                     │
│  (If target hit — celebration)      │
│  ╔═════════════════════════════════╗│
│  ║  ★ You found it! ★             ║│    ← Celebration animation + confetti
│  ╚═════════════════════════════════╝│
│                                     │
│  (If hidden hit — golden ritual)    │
│  ╔═════════════════════════════════╗│
│  ║  Hidden Edition Unlocked!       ║│    ← Gold-themed large card
│  ║  "So rare! X% of players!"      ║│    ← Scarcity indicator
│  ╚═════════════════════════════════╝│
│                                     │
│  ✦ Added to your collection! ✦     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐      │    ← Mini collection progress strip
│  │ 🎭 │ │ 🎭 │ │ 🎭 │ │ ?  │     │    ← NEW! tag on newly acquired
│  │NEW!│ │    │ │    │ │    │     │
│  └────┘ └────┘ └────┘ └────┘      │
│                                     │
│  ╔═════════════════════════════════╗│
│  ║      Continue / Play Again       ║│    ← Full-width bottom button
│  ╚═════════════════════════════════╝│
└─────────────────────────────────────┘
```

### Result Scenarios & Button Behavior:

| Scenario | Popup Shows | Continue Goes To | Play Again |
|----------|------------|-----------------|------------|
| Got new character | Character card + "NEW!" | Home | Replay this level |
| Got duplicate | Character card + "Already Owned" | Home | Replay this level |
| **Hit target** | Celebration + "You found it!" | **→ This theme's Collection Wall** (pick next "?") | — |
| **Hit hidden** | Gold ritual card + "Hidden Edition Unlocked!" + rarity % | **→ This theme's Collection Wall** | — |

### Requirements:
- **Only show 1 box result** — the one the player chose via CONFIRM. The other 2 boxes remain unopened and unshown
- No Mastermind-style ✅❌? marks (no comparison needed since only 1 result is shown)
- **Emotion focused on a single point**: joy (new/hidden) or mild disappointment (duplicate/missed)
- Target hit: celebration animation (confetti, glow, "You found it!" text)
- Hidden hit: gold-themed ritual card, emphasize scarcity ("So rare! X% of players have this!")
- Duplicate: show character with "Already Owned" in muted style, then let player Continue or retry
- Bottom: single full-width button (text changes based on scenario: "Continue" or "Play Again" or "Go to Collection")
- Mini collection progress strip at bottom (shows collection state with NEW! tag on newly acquired)

---

## Design Specifications Summary

| Dimension | Requirement |
|-----------|------------|
| Color palette | Cream white (#FFF8F0) + soft pink (#FFD4E5) + light gold (#F5E6D3) + warm brown (#8B7355) — unchanged from original |
| Border radius | Large (16-24px) throughout, capsule buttons (full round), medium cards (12px) |
| Typography | Title: 3D embossed effect; body: handwritten or rounded sans-serif |
| Decorative elements | Ribbons, bows, star sparkles, gift-box wrapping feel — unchanged |
| IP style | Pop Mart ugly-cute: big head, small body, round lines, innocent expression, soft colors |
| Blind boxes | **3 boxes, ALL IDENTICAL appearance** (same color, shape, size, pattern) — center one visually larger |
| Rarity | **No rarity tiers for regulars** — show character NAME only. Only "Regular" vs "Hidden" distinction |
| Shake count | **Plain number** format (x7, x6...) — NOT heart/star shapes |

---

## Quick Reference: What Changed from Original 4 Pages

| Element | Original (Lovart v1) | Revised (This Brief) |
|---------|---------------------|---------------------|
| Brand name | PUFF & PALS / Collect Care Cherish | **ShakeSecret / Blind Box** |
| Home page tabs | 5-tab bottom nav | **No tabs — START + Collection only** |
| Level display | Lv.24 | **Removed** |
| Currency | Daily Reward x25 diamonds | **Removed** |
| Rarity indicators | Heart-shaped rarity stars | **Removed — show character name** |
| Featured card label | "LEGENDARY" | **Character name** |
| Collection grid | 4×4 (16 cells) | **3×3 (9 cells: 8 regular + 1 hidden)** |
| Hidden position | Fixed at cell #11 | **Fixed at cell #9 (bottom-right)** |
| Family photo preview | Not present | **Eye icon at series name far right → floating modal** |
| Game: box count | 5 boxes | **3 boxes** |
| Game: box colors | Purple/Green/Pink/Yellow/Blue | **ALL IDENTICAL (cream/off-white)** |
| Game: instruction | "Which box is it?" | **"Match →"** (concise, not childish) |
| Game: shake button | Bottom, with heart icons | **Custom icon ABOVE candidates, with x7 number** |
| Game: confirm button | Side by side with SHAKE | **Full-width bottom bar, "Take this one"** |
| Game: box selection | Not specified | **Carousel: center box enlarged, swipe to switch** |
| Game: binding feedback | Not shown | **Mini avatar above matched box** |
| Game: purchase metaphor | Not shown | **"Your pick" tag below center box = CONFIRM buys THIS one** |
| Result: boxes shown | 4 boxes opened + ✅❌? | **Only 1 box (player's choice), no comparison** |
| Result: format | Mastermind reveal | **Real purchase experience: what did I take home?** |

---

Please produce revised 4-page UI concept art based on this brief, maintaining the original art style and quality.
