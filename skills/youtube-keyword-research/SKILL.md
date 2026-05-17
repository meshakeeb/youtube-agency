---
name: youtube-keyword-research
slug: youtube-keyword-research
description: Use this skill when identifying the primary keyword and long-tail variants for a specific video. Takes the video topic and Competitor Brief as inputs. Covers search intent analysis, keyword opportunity scoring, and long-tail mapping. Output is the Keyword Brief — first input in the Production pipeline. Do not begin any production run without an approved Keyword Brief.
tags:
  - production
  - keywords
  - search-intent
  - seo
---

# YouTube Keyword Research

## When to Use

Activate this skill at the start of every Production run — for every video, every time. No exceptions. Even if the topic seems obvious, the keyword must be confirmed before titles are written.

## Inputs Required

- Video topic or working title (from client)
- Per-Video Competitor Brief (from Competitor Analyst)
- Niche Intelligence Profile (niche vocabulary section)
- Client's channel size (subscriber count — affects competitive targeting)

## Process

### Step 1 — Seed Keywords
Generate 5–10 seed keyword candidates based on the video topic:
- Start with the most literal description of the video topic
- Add intent modifiers: "how to", "best", "for beginners", "vs", "review", "explained"
- Reference the niche vocabulary list for terms the audience actually searches
- Reference the Competitor Brief for keywords already being targeted by top videos

### Step 2 — Evaluate Each Seed Keyword
For each seed keyword, assess:

**Search demand** (estimate from YouTube autocomplete and result volume):
- High: term autocompletes immediately, 100K+ results
- Medium: term autocompletes with variations, 10K–100K results
- Low: term does not autocomplete easily, under 10K results

**Competition strength** (from Competitor Brief):
- Strong: top results are large channels (500K+ subs) with high view counts
- Medium: mix of channel sizes, some recent videos
- Weak: small channels, old videos, or thin content dominating top results

**Intent match**: does this keyword match what the client's video actually delivers?
- Exact match: the video fully answers the keyword's implied question
- Partial match: the video touches on it but doesn't fully answer it
- Mismatch: the video is about something different than what this keyword implies

Only proceed with keywords that are an exact intent match. A mismatch will hurt retention.

### Step 3 — Select the Primary Keyword
Choose the keyword with the best combination of:
- Adequate search demand (not low, ideally high or medium)
- Exploitable competition (weak or medium preferred for smaller channels)
- Exact intent match
- Channel size alignment (smaller channels should target longer, more specific keywords)

### Step 4 — Build Long-Tail Variants
Generate 5–8 long-tail variants of the primary keyword:
- Add year: "[keyword] 2025"
- Add specificity: "[keyword] for beginners" / "[keyword] advanced"
- Add comparison: "[keyword] vs [alternative]"
- Add format: "how to [keyword]" / "[keyword] tutorial" / "[keyword] explained"
- Add outcome: "best [keyword]" / "[keyword] that works"

These are secondary targets for the description and tags — not for the title.

### Step 5 — Classify Search Intent
Classify the primary keyword's search intent:
- **Informational**: viewer wants to learn (triggers: "how to", "what is", "explained")
- **Comparative**: viewer is deciding between options (triggers: "vs", "best", "review")
- **Validation**: viewer wants confirmation (triggers: "is X worth it", "should I", "honest")
- **Navigational**: viewer is looking for a specific channel or video

Intent classification feeds directly into the Title Copywriter's framing decision.

## Output Format

```
KEYWORD BRIEF
Client: [Name]
Video Topic: [client's topic]
Date: [YYYY-MM-DD]

PRIMARY KEYWORD
Keyword: [confirmed primary keyword]
Search demand: [High / Medium / Low]
Competition: [Strong / Medium / Weak]
Intent match: [Exact / Partial — note if partial]
Search intent type: [Informational / Comparative / Validation / Navigational]
Opportunity score: [1–10]

LONG-TAIL VARIANTS (secondary targets)
1. [variant]
2. [variant]
3. [variant]
4. [variant]
5. [variant]
6. [variant — optional]
7. [variant — optional]
8. [variant — optional]

KEYWORD PLACEMENT GUIDANCE
Title: primary keyword must appear in first 50 characters
Description (above fold): primary keyword in first 150 characters
Description body: integrate 2–3 long-tail variants naturally
Tags: primary keyword as first tag; long-tails as subsequent tags
Chapters: use long-tail variants as chapter title keywords where natural

NOTES FOR TITLE COPYWRITER
[Any specific framing recommendations based on intent and competitor gap]
```

## Handoff

Keyword Brief → Title Copywriter (first input for title generation)

## Quality Check

- [ ] Primary keyword selected with demand, competition, and intent documented
- [ ] Intent match confirmed as exact (flag if partial)
- [ ] 5–8 long-tail variants generated
- [ ] Search intent classified
- [ ] Placement guidance completed
- [ ] Notes for Title Copywriter included
