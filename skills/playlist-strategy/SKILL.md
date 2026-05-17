---
name: playlist-strategy
slug: playlist-strategy
description: Use this skill when designing or updating a client's playlist structure, internal linking strategy (end screens and cards), and channel architecture. Maximizes session watch time by grouping videos into logical clusters and designing handoff flows between videos. Runs at onboarding and quarterly thereafter.
tags:
  - growth
  - playlists
  - channel-architecture
  - watch-time
---

# Playlist Strategy

## When to Use

Activate this skill at two points:
1. **At onboarding**: Full Channel Architecture Plan (rebuild or design from scratch)
2. **Per video (ongoing)**: Per-Video Architecture Note (which playlists + end screens for each new video)
3. **Quarterly review**: Reassess as content library grows

## Inputs Required

- Full list of all published videos (titles and topics)
- Channel Audit Report (existing playlist structure assessment)
- Niche Intelligence Profile (content cluster patterns in the niche)
- Future content plan from CSO (what topics are coming next quarter)

## Why Session Watch Time Matters

YouTube's algorithm rewards **session watch time** — the total time a viewer spends on YouTube starting from a given video. When a viewer watches one video and immediately watches another from the same channel, YouTube credits the originating channel for the additional session time.

Playlists and end screens are the primary tools for engineering these chain-watch sessions.

## Content Cluster Design

The first step is grouping existing and planned videos into **content clusters** — thematically related groups that a viewer would logically binge.

### Cluster Identification Process
1. List all published videos by topic
2. Group into logical parent themes (3–8 clusters for most channels)
3. Identify which videos naturally lead to another ("if you liked this, watch that")
4. Name each cluster with a viewer-benefit lens: "Beginner Setups", "Advanced Strategies", "Weekly Market Outlook"

### Cluster Rules
- Each cluster should have at least 4–6 videos to be worth a playlist
- Clusters should map to distinct audience intent or knowledge level
- A video can belong to multiple playlists (YouTube allows this)
- Clusters should have clear entry points (the "start here" video)

## Playlist Design

### Playlist Title Optimization
Playlist titles are indexed by YouTube and Google. Treat them as SEO assets:
- Lead with the primary keyword for the cluster
- Add a viewer-benefit modifier: "Complete Guide", "Full Series", "Beginner to Advanced"
- Keep under 60 characters

Example:
```
❌ "Trading Videos"
✅ "Price Action Trading: Complete Beginner Series"
```

### Playlist Description
- 200+ words following similar principles to video descriptions
- Primary cluster keyword in first 150 characters
- List what the playlist covers (each major topic = one bullet)
- End with a watch-order recommendation if the videos have a logical sequence

### Playlist Video Order
- **Sequential series**: order by intended watch progression (Part 1 → Part 2)
- **Non-sequential but themed**: order by performance (highest views first — creates strong first impression for new viewers browsing the playlist)
- **Mixed**: pin the best "entry point" video first, then sequence by performance

## End Screen Strategy

End screens appear in the last 20 seconds of every YouTube video. They are the most direct tool for directing viewers to the next video.

### End Screen Placement Rules
- Every video must have an end screen configured before publish
- End screen duration: 15–20 seconds (YouTube minimum is 5 seconds, maximum is 20)
- Recommended elements: 1 video + 1 playlist + 1 subscribe button (max 4 elements total)

### Video Selection for End Screen
Two options:
1. **Best for viewer**: YouTube automatically selects the video it predicts the viewer will want next (use "Best for viewer" option in YouTube Studio)
2. **Manual selection**: Choose a specific video that logically follows the current one

Use "Best for viewer" as default. Override manually only when there is a clear logical next video (e.g. Part 1 links to Part 2).

### Playlist End Screen
Always feature the playlist the current video belongs to on the end screen. This gives viewers the option to binge the full cluster.

## Card Strategy

Cards appear as small clickable overlays during the video. They are best used mid-video to reference related content without disrupting the viewing experience.

### Card Placement Principles
- Place cards at moments where the creator references a related topic
- Example: if the creator says "I made a full video on this setup" — that's a card moment
- Place no more than 3 cards per video
- Cards should appear at least 30 seconds apart

### Card Timing Guide
| Video Length | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| Under 10 min | 2–3 min | 5–7 min | — |
| 10–20 min | 3–5 min | 8–12 min | 15–17 min |
| 20–30 min | 5 min | 12 min | 20 min |

## Output Format — Channel Architecture Plan (Onboarding)

```
CHANNEL ARCHITECTURE PLAN
Client: [Name]
Date: [YYYY-MM-DD]
Total videos reviewed: [X]

CONTENT CLUSTERS
Cluster 1: "[Cluster Name]"
  Videos: [list of titles]
  Entry point: [recommended first video]
  Playlist title: "[SEO-optimized title]"
  Playlist description: [full description]
  Video order: [sequential / performance / entry-first]

Cluster 2: "[Cluster Name]"
  [same structure]

[...continue for all clusters]

END SCREEN TEMPLATE
Default: Best for viewer + Cluster playlist + Subscribe
Override cases: [list any specific video pairs]

CARD STRATEGY
Default card timing: [timing guide for this channel's average video length]
Priority card moments: [any recurring verbal cues the creator uses that trigger cards]
```

## Output Format — Per-Video Architecture Note (Ongoing)

```
PER-VIDEO ARCHITECTURE NOTE
Video: [Title]
Date: [YYYY-MM-DD]

ADD TO PLAYLISTS:
- [Playlist name 1]
- [Playlist name 2 — if applicable]

END SCREEN:
Primary video: [Best for viewer / or specific video title]
Playlist: [Cluster playlist name]

CARDS:
Card 1 at [X:XX]: [Video title to link]
Card 2 at [X:XX]: [Video title to link]
Card 3 at [X:XX]: [Video title to link — if applicable]
```

## Handoff

Channel Architecture Plan → Chief Strategy Officer (review)
Per-Video Architecture Note → Client (for upload configuration)
All outputs → Client Reporting Agent (for session time attribution)

## Quality Check

- [ ] All videos assigned to at least one playlist
- [ ] Each playlist has SEO-optimized title and 200+ word description
- [ ] End screen instructions clear for every video
- [ ] Card timing specified per video
- [ ] Entry point video identified for each cluster
