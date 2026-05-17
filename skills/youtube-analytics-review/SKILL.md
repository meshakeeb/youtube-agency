---
name: youtube-analytics-review
slug: youtube-analytics-review
description: >
  Use this skill when reviewing YouTube Analytics data for a client channel.
  Covers CTR benchmarking, AVD interpretation, view velocity tracking,
  subscriber growth analysis, and underperformance detection. Used weekly by
  the Performance Analyst and at onboarding by the Channel Auditor. Outputs
  flag reports and data summaries for the Client Reporting Agent.
tags:
  - operations
  - analytics
  - performance
  - benchmarking
---

# YouTube Analytics Review

## When to Use

Activate this skill in two contexts:
1. **Weekly (Performance Analyst)**: monitor all active client channels, flag issues
2. **At onboarding (Channel Auditor)**: establish baseline metrics for a new client

## Inputs Required

- YouTube Studio Analytics access for the client (or exported data)
- Previous week's metrics (for trend comparison)
- Onboarding baseline metrics (for long-term comparison)
- Niche benchmarks (from Niche Intelligence Profile — what's typical for this niche's channel size)

## Key Metrics and Benchmarks

### Metric 1 — Click-Through Rate (CTR)
CTR measures how often viewers click after seeing the thumbnail in impressions.

**How to read it**:
- YouTube's platform average: 2–10% (varies heavily by niche and channel size)
- Strong performance: 6–10%+
- Acceptable: 3–6%
- Needs attention: below 3% (thumbnail and/or title problem)
- Critical: below 1% (significant thumbnail/title issue or wrong audience targeting)

**What affects CTR**:
- Thumbnail quality and niche alignment
- Title hook strength and keyword match
- Traffic source (subscriber notifications tend to have higher CTR than browse)
- Topic relevance to current audience

**When to flag**: CTR below 3% on any video within its first 7 days.

### Metric 2 — Average View Duration (AVD) and Retention Rate
AVD is the average time viewers spend watching the video. Retention rate is AVD as a percentage of total video length.

**How to read it**:
- Strong: 50%+ retention (viewers watching more than half the video)
- Acceptable: 35–50%
- Needs attention: 25–35%
- Critical: below 25% (content, hook, or audience mismatch problem)

**The retention curve matters more than the average**:
- Drop before 30 seconds: hook failure — the intro is not delivering on the title/thumbnail promise
- Drop at specific chapter: content issue at that chapter
- Gradual decay: normal; steep decay: content or pacing problem

**When to flag**: Retention rate below 35% on any video, or any video showing a cliff-drop in the first 30 seconds.

### Metric 3 — View Velocity (Views in First 48 Hours)
View velocity measures how fast a video gets watched after publish. High early velocity signals strong subscriber interest and triggers algorithm promotion.

**Benchmarks** (relative to channel size):
- Strong: more than 10% of subscriber count in first 48 hours
- Acceptable: 5–10% of subscriber count
- Needs attention: below 5% of subscriber count
- New channels: absolute numbers matter more — look for trend, not benchmark

**When to flag**: Any video performing 50% below the client's own average velocity from the previous 4 weeks.

### Metric 4 — Subscriber Growth Rate
Track net subscriber additions weekly (new subscribers minus lost).

**What to monitor**:
- Week-over-week growth direction (up / flat / down)
- Spike days (which video drove a growth spike?)
- Loss spikes (which video caused unusual unsubscribes?)

**When to flag**: Two or more consecutive weeks of net negative subscriber growth.

### Metric 5 — Traffic Sources
Understand where views are coming from:
- **YouTube Search**: indicates SEO is working
- **Browse / Home**: indicates algorithm is recommending the video
- **Suggested Videos**: indicates the video is being recommended alongside related content
- **Subscriber notifications**: healthy if it's not the only source
- **External**: social sharing and repurposed content driving traffic

**When to flag**: If YouTube Search is below 20% of total traffic for a channel with 3+ months of consistent uploads — indicates SEO is underperforming.

## Weekly Monitoring Workflow

### Step 1 — Pull This Week's Data
For each active client, pull:
- CTR for all videos published in the last 30 days
- AVD and retention for all videos published in the last 30 days
- View velocity for all videos published in the last 7 days
- Net subscriber change for the week
- Traffic source breakdown for the channel

### Step 2 — Compare to Baselines
Compare current metrics to:
- The client's own onboarding baseline (long-term benchmark)
- The previous 4-week rolling average (short-term trend)

### Step 3 — Detect Underperformance
Flag any metric that triggers a threshold defined above.

### Step 4 — Identify the Cause
For every flagged metric, investigate the likely cause before issuing the flag:
- Low CTR: review the thumbnail and title for the flagged video
- Low AVD: check where in the retention curve the drop occurs
- Low velocity: was this a topic misaligned with the audience? Was it published at an unusual time?

Flags with a probable cause are more actionable than flags without one.

## Output Format — Weekly Flag Report (Internal)

```
WEEKLY PERFORMANCE FLAG REPORT
Client: [Name]
Week of: [YYYY-MM-DD]
Analyst: Performance Analyst

METRICS SUMMARY
CTR (last 30 days): [X%] — [vs. 4-week avg: X%] — [UP / FLAT / DOWN]
AVD (last 30 days): [X:XX] — [vs. 4-week avg: X:XX] — [UP / FLAT / DOWN]
Net subscribers (this week): [+X / -X] — [vs. prev week: +X / -X]
View velocity (new videos): [X views / 48hrs] — [vs. avg: X]

FLAGS RAISED
[Video title or metric] — [threshold breached] — [probable cause] — [recommended action]
[Video title or metric] — [threshold breached] — [probable cause] — [recommended action]

STATUS: [GREEN — no flags / AMBER — 1–2 flags / RED — 3+ flags or critical flag]
```

## Output Format — Weekly Data Summary (to Client Reporting Agent)

```
WEEKLY DATA SUMMARY FOR REPORTING
Client: [Name]
Week of: [YYYY-MM-DD]

[All key metrics in table format]
[Trend direction per metric]
[Flag summary — how many flags, severity]
```

## Handoff

Flag Report → Chief Strategy Officer (for strategy adjustment)
Data Summary → Client Reporting Agent (for weekly pulse and monthly report)
Critical flags → CEO escalation

## Quality Check

- [ ] All 5 key metrics pulled and compared to baseline
- [ ] Every flag includes probable cause and recommended action
- [ ] Status (GREEN / AMBER / RED) clearly assigned
- [ ] Data summary formatted for Client Reporting Agent input
