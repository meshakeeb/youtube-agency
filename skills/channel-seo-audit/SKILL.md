---
name: channel-seo-audit
slug: channel-seo-audit
description: >
  Use this skill when auditing a new client's YouTube channel at onboarding.
  Covers SEO health scoring across titles, descriptions, tags, thumbnails,
  chapters, and upload patterns. Identifies quick wins and long-term structural
  issues. Also used for semi-annual re-audits. Output is the Channel Audit
  Report and baseline metrics used by the Client Reporting Agent.
tags:
  - onboarding
  - audit
  - seo
  - channel-health
---

# Channel SEO Audit

## When to Use

Activate this skill when:
- A new client joins and no audit exists
- A semi-annual re-audit is due (every 6 months per active client)
- The Performance Analyst flags a sustained channel-wide decline that may indicate structural SEO issues

## Inputs Required

- Client's YouTube channel URL
- Access to channel analytics (if client grants access) or public-facing data
- Last 20–50 uploaded videos for analysis

## Audit Categories and Scoring

Score each category 0–20 for a total score out of 100.

### Category 1 — Title Quality (0–20)
Review last 20 titles. Score based on:
- Is the primary keyword in the first 50 characters? (+4 per title average)
- Are titles between 50–70 characters? (+3)
- Do titles use a clear hook or benefit statement? (+3)
- Are titles consistent in case and style? (+2)
- Do titles avoid misleading clickbait? (+2)
- Are titles niche-specific or generic? (+3 for niche-specific, +1 for generic)
- Deduct for: all caps, excessive punctuation, keyword stuffing

### Category 2 — Description Quality (0–20)
Review last 20 descriptions. Score based on:
- Does the first 150 characters contain keyword + hook? (+5)
- Is the body 200+ words? (+4)
- Are keywords integrated naturally (not stuffed)? (+4)
- Are timestamps / chapters included? (+3)
- Are social links and CTAs present? (+2)
- Is boilerplate consistent across videos? (+2)

### Category 3 — Tags and Hashtags (0–20)
Review last 20 videos' tags and hashtags. Score based on:
- Are 8–12 tags used per video? (+5)
- Does the tag set include exact match, broad, and related terms? (+5)
- Is the channel/brand name tagged? (+2)
- Are hashtags relevant (not generic viral tags)? (+4)
- Are 3–5 hashtags used in descriptions? (+4)

### Category 4 — Thumbnails (0–20)
Review last 20 thumbnails. Score based on:
- Is there a consistent visual style (color palette, font, layout)? (+5)
- Is text overlay present and readable at small size? (+4)
- Does the thumbnail communicate the video topic without the title? (+4)
- Is the subject (face or visual) clearly visible on mobile? (+4)
- Are critical elements within safe zones? (+3)

### Category 5 — Upload Patterns and Channel Structure (0–20)
Score based on:
- Is the upload frequency consistent (weekly, bi-weekly, etc.)? (+5)
- Are videos organized into playlists? (+4)
- Are end screens configured on all videos? (+4)
- Are cards used within videos? (+3)
- Is the channel description complete and keyword-rich? (+2)
- Is the channel trailer present and effective? (+2)

## Quick Wins Identification

After scoring, identify the top 5 quick wins — high-impact changes to existing content that can improve performance within 30 days:

Quick win types (ranked by typical impact):
1. **Thumbnail replacement** on top 5 videos with weak thumbnails
2. **Title rewrite** on top 10 videos missing primary keyword in first 50 chars
3. **Description expansion** on top 10 videos with thin or empty descriptions
4. **Chapter addition** to all videos over 8 minutes with no chapters
5. **Playlist creation** to organize existing content into logical clusters
6. **Tag set repair** on videos with fewer than 5 tags

## Baseline Metrics

Document the following as the performance baseline (used by Client Reporting Agent):
- Channel average CTR (if analytics accessible)
- Channel average AVD (average view duration)
- Subscriber growth rate (last 90 days)
- Top 5 videos by view count
- Most recent 5 videos' view performance (first 7 days)

## Output Format

```
CHANNEL AUDIT REPORT
Client: [Name]
Channel URL: [URL]
Audit Date: [YYYY-MM-DD]
Videos Reviewed: [number]

SEO HEALTH SCORE
| Category              | Score | /20 |
|-----------------------|-------|-----|
| Title Quality         | XX    | /20 |
| Description Quality   | XX    | /20 |
| Tags and Hashtags     | XX    | /20 |
| Thumbnails            | XX    | /20 |
| Upload Pattern/Structure | XX | /20 |
| TOTAL                 | XX    | /100 |

SCORE INTERPRETATION
90–100: Excellent — minor optimization only
70–89:  Good — targeted improvements needed
50–69:  Moderate — systematic SEO rebuild required
Below 50: Poor — foundational overhaul needed

TOP 5 QUICK WINS
1. [Action] — [specific videos or elements to change] — [expected impact]
2. [Action] — [specific videos or elements to change] — [expected impact]
3. [Action] — [specific videos or elements to change] — [expected impact]
4. [Action] — [specific videos or elements to change] — [expected impact]
5. [Action] — [specific videos or elements to change] — [expected impact]

LONG-TERM STRUCTURAL ISSUES
- [Issue and recommended ongoing fix]
- [Issue and recommended ongoing fix]

BASELINE METRICS
Average CTR: [X%] or [not accessible]
Average AVD: [X:XX] or [not accessible]
Sub growth rate (90d): [+X subs/month]
Top 5 videos by views: [list with view counts]
Recent performance (last 5 videos, first 7 days): [list]
```

## Handoff

- Full report → Brand Voice Specialist (top 5 videos as style reference)
- Full report → Chief Strategy Officer (review and approval)
- Baseline metrics → Client Reporting Agent (performance benchmark)
- Quick wins list → CSO (for prioritization with client)

## Quality Check

- [ ] All 5 categories scored with justification
- [ ] At least 5 quick wins identified with specific action items
- [ ] Baseline metrics documented (or flagged as inaccessible)
- [ ] Long-term structural issues listed separately from quick wins
