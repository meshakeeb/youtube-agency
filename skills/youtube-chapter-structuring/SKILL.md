---
name: youtube-chapter-structuring
slug: youtube-chapter-structuring
description: Use this skill when designing video chapters and timestamps. Takes the video summary or script outline and the Keyword Brief as inputs. Chapters must start at 0:00, contain a minimum of 3 segments, use keyword-rich titles, and be formatted for direct paste into YouTube descriptions. Chapters appear in Google search as rich snippets — this is an external discovery tool, not just a navigation aid.
tags:
  - production
  - chapters
  - timestamps
  - watch-time
---

# YouTube Chapter Structuring

## When to Use

Activate this skill after the Tag Set has been delivered. Fifth step in the Production pipeline.

Note: If the client has not yet finalized video edit timing, deliver a structural template with estimated timestamps. Flag explicitly that timestamps need client confirmation before upload.

## Inputs Required

- Video summary or script outline (from client)
- Keyword Brief (primary keyword and long-tail variants)
- Approximate total video length

## Why Chapters Matter for SEO

YouTube chapters serve two distinct purposes:

1. **On-platform retention**: viewers can jump to relevant sections, which signals structured content and reduces rage-quits that hurt retention metrics.
2. **Google search visibility**: chapters appear as individual snippets in Google search results under the video. Each chapter title is independently indexed. This means more surface area for keyword discovery outside of YouTube.

Every chapter title is a micro-SEO opportunity.

## YouTube's Chapter Rules

- First timestamp MUST be `0:00` — YouTube rejects chapters if this is absent
- Minimum 3 chapters required for YouTube to display them
- Each chapter must be at least 10 seconds long
- Timestamps must be in ascending order
- Format: `X:XX - Chapter Title` (for videos under 1 hour) or `X:XX:XX - Chapter Title` (for videos over 1 hour)

## Chapter Design Principles

### Structure Before Keywords
First, design the chapter structure based on the video's actual content flow:
- What is the logical sequence of the video?
- Where are the major topic transitions?
- Where does the viewer need a navigation point?

Then apply keyword thinking to the titles.

### Chapter Title Formula
```
[Keyword or topic term] + [specific angle or action]
```

Good chapter titles:
- "Price Action Setup #1: The Pin Bar"
- "Biggest Beginner Mistakes in Forex"
- "How to Set Your Stop Loss Correctly"
- "Live Trade Breakdown: EUR/USD"

Poor chapter titles:
- "Part 2"
- "More tips"
- "Continued"
- "Other stuff"

### Keyword Integration in Chapters
- The intro chapter (0:00) can be: "Introduction", "Overview", or a curiosity hook
- Chapters 2 onward should use niche vocabulary and long-tail variants where natural
- Do not force every chapter to include the primary keyword — it reads as stuffed
- Aim for 50–60% of chapters to include a searchable term

### Chapter Density by Video Length
| Video Length | Recommended Chapters |
|---|---|
| Under 5 minutes | 3 chapters (minimum) |
| 5–10 minutes | 4–6 chapters |
| 10–20 minutes | 6–9 chapters |
| 20–30 minutes | 8–12 chapters |
| 30+ minutes | 10–15 chapters |

## Structural Templates by Video Type

### Tutorial / How-To Video
```
0:00 - Introduction
X:XX - [Setup or requirements]
X:XX - Step 1: [action]
X:XX - Step 2: [action]
X:XX - Step 3: [action]
X:XX - Common Mistakes to Avoid
X:XX - Final Results / Summary
```

### Market Outlook / Analysis Video
```
0:00 - Week Overview
X:XX - [Asset 1] Analysis
X:XX - [Asset 2] Analysis
X:XX - [Asset 3] Analysis
X:XX - Key Levels to Watch
X:XX - Trading Plan for the Week
```

### Listicle / Tips Video
```
0:00 - Introduction
X:XX - Tip #1: [keyword-rich title]
X:XX - Tip #2: [keyword-rich title]
[...continue per item]
X:XX - Recap and Final Thoughts
```

### Review / Comparison Video
```
0:00 - Introduction
X:XX - Overview: [subject A]
X:XX - Overview: [subject B]
X:XX - Key Differences
X:XX - Performance Comparison
X:XX - Final Verdict
```

## Output Format

```
CHAPTER SET
Client: [Name]
Video: [Primary Title]
Total Length: [X:XX estimated / confirmed]
Date: [YYYY-MM-DD]

CHAPTERS (copy-paste ready for description):
0:00 - [Chapter title]
X:XX - [Chapter title]
X:XX - [Chapter title]
X:XX - [Chapter title]
X:XX - [Chapter title]
X:XX - [Chapter title]

Chapter count: [X]
Keyword-integrated chapters: [X of X]

STATUS:
[ ] Timestamps confirmed by client — ready to paste
[ ] Timestamps estimated — needs client confirmation before upload

KEYWORDS USED IN CHAPTERS:
[List which long-tail variants or niche terms appear in chapter titles]
```

## Handoff

Chapter Set → Thumbnail Strategist (for full video context)
Chapter Set → Description Writer (to replace timestamps placeholder)

## Quality Check

- [ ] First chapter is exactly `0:00`
- [ ] Minimum 3 chapters present
- [ ] All chapters at least 10 seconds apart
- [ ] Timestamps in ascending order
- [ ] No generic chapter titles ("Part 2", "More tips")
- [ ] At least 50% of chapters use niche vocabulary or long-tail keywords
- [ ] Status clearly flagged (confirmed vs. estimated)
