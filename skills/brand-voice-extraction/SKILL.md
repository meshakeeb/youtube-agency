---
name: brand-voice-extraction
slug: brand-voice-extraction
description: >
  Use this skill when building or refreshing a Brand Voice Profile for a client.
  Covers tone classification, vocabulary extraction, sentence structure analysis,
  and explicit do/don't rules. Takes the client's existing content as input.
  Output is the Brand Voice Profile — a mandatory reference for every Production
  agent before writing any deliverable.
tags:
  - onboarding
  - brand-voice
  - tone
  - style
---

# Brand Voice Extraction

## When to Use

Activate this skill when:
- A new client's Channel Audit is complete and no Brand Voice Profile exists
- A client requests a tone evolution or rebrand
- The Quality Controller flags 3 or more consecutive brand voice violations
- A client begins targeting a new audience segment with different language expectations

Never begin Production for a client without an approved Brand Voice Profile.

## Inputs Required

- Channel Audit Report (specifically the top 5 performing videos and recent 5 videos)
- Access to client's video transcripts or scripts (if available)
- Access to client's existing video descriptions and community posts
- Client's self-described tone preferences (from onboarding intake)

## Process

### Step 1 — Tone Classification
Watch or read transcripts of the client's top 5 performing videos. Classify their tone on each axis:

**Energy level**: Low-key and calm ↔ High-energy and hype
**Formality**: Conversational and casual ↔ Professional and authoritative
**Teaching style**: Storytelling ↔ Direct instruction ↔ Analysis-first
**Relationship with viewer**: Peer-to-peer ↔ Mentor-to-student ↔ Expert-to-audience
**Use of humor**: Never ↔ Occasional ↔ Regular part of style

Do not guess. Derive from actual content.

### Step 2 — Vocabulary Extraction
From the top 5 videos and their descriptions, extract:

**Recurring phrases**: expressions the creator uses repeatedly (these are ownable)
**Power words**: words that appear in their best-performing titles and hooks
**Niche vocabulary**: technical or community terms they use correctly and consistently
**Filler avoidance**: words or phrases they never use (may not be obvious — look for consistent absence)

### Step 3 — Sentence and Structure Analysis
Analyze sentence construction patterns:
- Average sentence length: short and punchy vs. longer and explanatory?
- Use of questions: do they ask the viewer questions regularly?
- Use of lists: numbered / bullet style or flowing prose?
- Use of calls-to-action: how do they phrase subscribe/like/comment requests?
- Opening hook style: shock stat / story / question / direct statement?

### Step 4 — Explicit Rules
From the above analysis, derive explicit rules in both directions:

**ALWAYS rules**: things this creator consistently does (must be preserved in every deliverable)
**NEVER rules**: things this creator never does (must be avoided in every deliverable)

Examples:
- ALWAYS: uses first-person plural ("we", "let's look at")
- ALWAYS: ends with a direct question to the viewer
- NEVER: uses corporate buzzwords ("leverage", "synergy", "optimize")
- NEVER: uses excessive enthusiasm punctuation (!!!, all caps energy)

### Step 5 — Red Lines
Identify absolute non-negotiables — things that would make the creator reject content immediately:
- Tone that contradicts their persona
- Claims they would never make
- Language beneath or above their audience's level
- Anything that conflicts with their stated values or niche positioning

## Output Format

```
BRAND VOICE PROFILE
Client: [Name]
Date: [YYYY-MM-DD]
Version: [1.0]
Based on: [number] videos analyzed

TONE CLASSIFICATION
Energy level: [1–10, 1=calm, 10=high-energy] — [descriptor]
Formality: [1–10, 1=casual, 10=professional] — [descriptor]
Teaching style: [Storytelling / Direct / Analysis-first / Mixed]
Viewer relationship: [Peer / Mentor / Expert] — [description]
Humor: [Never / Occasional / Regular]

VOCABULARY
Recurring phrases: [list with examples]
Power words: [list]
Niche vocabulary: [list]
Implicit avoidances: [list]

SENTENCE AND STRUCTURE PATTERNS
Sentence length: [Short / Medium / Long / Mixed]
Use of questions: [Never / Occasional / Frequent]
List style: [Numbered / Bullet / Prose / Mixed]
CTA phrasing: [examples from actual content]
Hook style: [Shock stat / Story / Question / Direct statement]

ALWAYS RULES
- [Rule]
- [Rule]
- [Rule]

NEVER RULES
- [Rule]
- [Rule]
- [Rule]

RED LINES
- [Non-negotiable 1]
- [Non-negotiable 2]

SAMPLE PHRASES
Good example: "[phrase that sounds like this creator]"
Bad example: "[phrase that would get rejected immediately]"
```

## Handoff

- Brand Voice Profile → Chief Strategy Officer (review and approval)
- Brand Voice Profile → Title Copywriter (mandatory reference)
- Brand Voice Profile → Description Writer (mandatory reference)
- Brand Voice Profile → Thumbnail Strategist (text overlay tone)
- Brand Voice Profile → Quality Controller (benchmark for all QC reviews)

## Quality Check

- [ ] Tone classification is evidence-based, not assumed
- [ ] Vocabulary lists contain real examples from actual content
- [ ] At least 5 ALWAYS rules and 5 NEVER rules documented
- [ ] Red lines are non-negotiable and clearly stated
- [ ] Good/bad sample phrases demonstrate the profile in action
