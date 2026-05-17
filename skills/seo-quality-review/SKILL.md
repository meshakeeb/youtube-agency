---
name: seo-quality-review
slug: seo-quality-review
description: >
  Use this skill when reviewing a completed Production Package before client
  delivery. Covers SEO accuracy checks, brand voice compliance, output scoring,
  and revision feedback writing. Every Production Package must pass this review
  before delivery. Packages scoring below 80/100 are returned to Production
  with specific, actionable revision notes.
tags:
  - operations
  - quality-control
  - seo
  - brand-voice
---

# SEO Quality Review

## When to Use

Activate this skill when the full Production Package (title set, description, tags, hashtags, chapters, thumbnail brief) has been assembled and is ready for QC review. This is the final gate before client delivery.

Never approve a partial package. If any element is missing, return to Production immediately.

## Inputs Required

- Complete Production Package (all 6 elements)
- Brand Voice Profile for the client
- Audience Persona Card for the client
- Keyword Brief for this specific video

## Scoring Framework

Score each of the 5 categories out of 20. Total score is out of 100.

### Category 1 — SEO Accuracy (0–20)

**Title** (8 points):
- Primary keyword in first 50 characters: 4 points (0 or 4 — binary)
- Title between 50–70 characters: 2 points
- Search intent matched correctly: 2 points

**Description** (7 points):
- Primary keyword in first 150 characters: 3 points
- Long-tail variants integrated (minimum 3): 2 points
- No keyword stuffing detected: 2 points

**Tags** (3 points):
- 8–12 tags present: 1 point
- Character count under 500: 1 point
- All four tag layers represented: 1 point
- Deduct 1 point for any prohibited tags (competitor names, generic viral tags)

**Hashtags** (2 points):
- 3–5 hashtags present: 1 point
- First 3 are the strongest relevance signals: 1 point

### Category 2 — Brand Voice Compliance (0–20)

- All three ALWAYS rules applied: 6 points (2 per rule, max 3 rules scored)
- No NEVER rules violated: 8 points (deduct 2 per violation found)
- Vocabulary matches: power words used, avoided terms absent: 4 points
- Overall tone classification match: 2 points

Score honestly. A single NEVER rule violation is a significant failure. Two violations means automatic return to Production regardless of overall score.

### Category 3 — CTR Potential (0–20)

Evaluate the title set:
- Primary title uses an identified audience click trigger: 6 points
- Benefit or hook is specific and concrete (not vague): 4 points
- All 3 title alternatives are genuinely different angles: 4 points
- Thumbnail brief supports the title's promise: 6 points

### Category 4 — Structural Completeness (0–20)

- All 6 elements present in the package: 10 points (binary)
- Description follows the agency template (above fold, body, timestamps, links, hashtags, boilerplate): 5 points
- Chapters: minimum 3, correct format, first chapter at 0:00: 5 points

### Category 5 — Niche Specificity (0–20)

The most subjective but most important category. Could this package have been written for any channel in any niche?

- Titles use niche vocabulary, not generic marketing language: 6 points
- Description body references niche-specific concepts and audience context: 6 points
- Thumbnail brief reflects niche visual conventions: 4 points
- Tags include niche-specific terms from the vocabulary list: 4 points

## Approval Thresholds

| Score | Decision |
|---|---|
| 90–100 | Approve — excellent package |
| 80–89 | Approve — minor notes for Production team awareness |
| 70–79 | Return — specific revisions required in 1–2 categories |
| Below 70 | Return — systematic revision required |
| Any NEVER rule violated (2+) | Auto-return regardless of score |

## Revision Feedback Standards

Revision notes must be:
- **Specific**: cite the exact element and the exact problem
- **Actionable**: state what the correct version should look like
- **Non-duplicative**: if the same issue appears twice, flag it once with all instances noted

What revision feedback must NOT be:
- "The title needs to be better" (vague)
- "The tone is off" without explaining which NEVER rule was violated
- Generic checklists without specific observations

Example of good revision feedback:
```
TITLE — RETURN
Issue: Primary keyword "price action trading" appears at character 54, not within the first 50.
Fix: Restructure to lead with "Price Action Trading" — e.g. "Price Action Trading: The Pin Bar Setup Explained"
```

Example of bad revision feedback:
```
TITLE — RETURN
The title needs to be more SEO-friendly.
```

## Output Format

```
QC REVIEW
Client: [Name]
Video: [Title]
Reviewer date: [YYYY-MM-DD]

SCORES
| Category              | Score | /20 |
|-----------------------|-------|-----|
| SEO Accuracy          | XX    | /20 |
| Brand Voice Compliance| XX    | /20 |
| CTR Potential         | XX    | /20 |
| Structural Completeness| XX   | /20 |
| Niche Specificity     | XX    | /20 |
| TOTAL                 | XX    | /100|

DECISION: [APPROVED / RETURNED]

IF APPROVED:
[Any awareness notes for Production team — optional, non-blocking]

IF RETURNED:
[Element]: [Specific issue] → [Specific fix]
[Element]: [Specific issue] → [Specific fix]
[Return reason summary — 1 sentence]
```

## Handoff

APPROVED → Client delivery
RETURNED → Production Team lead with full QC Review attached
Systemic failures (same agent failing 3+ consecutive reviews) → CEO escalation

## Quality Check (self-check before submitting QC Review)

- [ ] All 5 categories scored
- [ ] Scoring justification documented per category
- [ ] Decision is unambiguous (APPROVED or RETURNED — never "maybe")
- [ ] If RETURNED: every revision note is specific and actionable
- [ ] NEVER rule violations explicitly called out if present
