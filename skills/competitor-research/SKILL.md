---
name: competitor-research
slug: competitor-research
description: >
  Use this skill when analyzing competing YouTube channels and videos to identify
  gaps, weaknesses, and keyword opportunities. Covers SERP analysis, competitor
  weakness scoring, content gap identification, and opportunity ranking. Runs
  at client onboarding for a full gap report and per-video for a targeted
  competitor brief.
tags:
  - intelligence
  - competitor
  - serp
  - gaps
  - keywords
---

# Competitor Research

## When to Use

Activate this skill in two contexts:

**At onboarding**: Full Competitor Gap Report covering the client's entire niche
**Per video**: Targeted Competitor Brief for a specific keyword or topic before Production begins

Never let Production begin on a video without a per-video competitor brief. The keyword landscape can shift — what was a gap 3 months ago may now be crowded.

## Inputs Required

**For full report**: Approved Niche Intelligence Profile (top 10 channels list)
**For per-video brief**: Video topic and primary keyword candidate from client

## Process — Full Competitor Gap Report

### Step 1 — Deep-Audit Each Top Channel
For each of the 10 channels in the Niche Intelligence Profile, document:
- Their 5 highest-view videos: titles, thumbnail style, keyword usage
- Their description quality: long/short, keyword-rich or thin?
- Tag usage: do they tag well or leave tags empty?
- Chapter usage: yes or no?
- Upload consistency: regular or sporadic?
- Comment engagement: do they respond? Does the community engage?

### Step 2 — Score Competitor Weaknesses
For each competitor, score (1–5) on:
- **SEO quality**: title keyword placement, description depth, tag coverage
- **Production consistency**: upload frequency and format consistency
- **Engagement**: comment responses, community posts, likes-to-views ratio
- **Content depth**: do they go deep or stay surface-level?
- **Format variety**: do they vary formats or repeat the same style?

Low scores = exploitable weakness.

### Step 3 — Identify Keyword Gaps
Search YouTube for the top 20 keywords in the niche vocabulary list (from niche-mapping skill).

For each keyword, assess:
- Number of results
- Quality of top 5 videos (production, SEO, channel size)
- View counts of top results
- Age of top results (old videos = opportunity if the topic is still searched)

Score each keyword:
- **High opportunity**: strong search demand + weak or old top results
- **Medium opportunity**: decent demand + some strong competition
- **Low opportunity**: low demand or dominated by large channels

### Step 4 — Rank the Top 20 Gap Opportunities
List the top 20 keyword gaps ranked by opportunity score. Include:
- Keyword
- Estimated search demand (low/medium/high)
- Competition strength (weak/medium/strong)
- Opportunity score (1–10)
- Recommended content angle

## Process — Per-Video Competitor Brief

### Step 1 — Search the Target Keyword
Search the proposed primary keyword on YouTube. Document the top 5–10 results:
- Title and thumbnail
- Channel name and subscriber count
- View count and upload date
- Description quality (visible in search snippet)

### Step 2 — Assess Each Result
For each result, note:
- What does this video do well? (strong title, good retention hook, great thumbnail)
- Where is it weak? (thin description, no chapters, dated content, wrong intent match)
- What angle does it take?

### Step 3 — Define the Differentiation Angle
Based on the weaknesses found, recommend:
- The best angle for the client's video to differentiate
- Any title framing that fills an intent gap the top results miss
- Whether the keyword is worth targeting or should be refined

## Output Format — Full Report

```
COMPETITOR GAP REPORT
Client: [Name]
Date: [YYYY-MM-DD]

COMPETITOR WEAKNESS SCORES
| Channel | SEO | Consistency | Engagement | Depth | Format | Total |
|---------|-----|-------------|------------|-------|--------|-------|
| ...     | /5  | /5          | /5         | /5    | /5     | /25   |

TOP 20 KEYWORD GAP OPPORTUNITIES
| Rank | Keyword | Demand | Competition | Score | Recommended Angle |
|------|---------|--------|-------------|-------|-------------------|
| 1    | ...     | High   | Weak        | 9/10  | ...               |

KEY STRATEGIC OBSERVATIONS
- [observation]
- [observation]
```

## Output Format — Per-Video Brief

```
PER-VIDEO COMPETITOR BRIEF
Keyword: [target keyword]
Date: [YYYY-MM-DD]

TOP RESULTS ANALYSIS
| Rank | Title | Channel | Views | Age | Weakness |
|------|-------|---------|-------|-----|----------|
| 1    | ...   | ...     | ...   | ... | ...      |

DIFFERENTIATION ANGLE
[Recommended angle for client's video]

KEYWORD VERDICT
[ ] Proceed — strong opportunity
[ ] Refine — suggest: [alternative keyword]
[ ] Avoid — reason: [explanation]
```

## Handoff

Full Report → Chief Strategy Officer → Keyword Researcher + Title Copywriter
Per-Video Brief → Keyword Researcher (before every Production run)

## Quality Check

- [ ] All 10 competitors scored on all 5 dimensions (full report)
- [ ] Top 20 gaps ranked with opportunity scores
- [ ] Per-video brief includes a clear differentiation angle
- [ ] Keyword verdict clearly stated
