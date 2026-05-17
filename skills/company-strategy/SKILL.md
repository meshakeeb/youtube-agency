---
name: company-strategy
slug: company-strategy
description: Use this skill when making company-level decisions — client onboarding approval, quality governance, performance review against company goals, and client retention decisions. Used exclusively by the CEO. Covers quarterly goal reviews, client portfolio health assessment, and structural decisions about teams, agents, and skills.
tags:
  - leadership
  - ceo
  - governance
  - retention
---

# Company Strategy

## When to Use

Activate this skill when:
- A new client is being considered for onboarding (final CEO approval required)
- Quarterly company goal review is due
- A client is flagged as at-risk and a retention decision is needed
- A Quality Controller escalation requires CEO intervention
- A team, agent, or skill needs to be restructured

This skill is used exclusively by the CEO. No other agent activates it.

## Client Onboarding Approval

Every new client must pass CEO approval before onboarding begins. The CEO review covers:

### Onboarding Criteria
1. **Niche fit**: does this client operate in a niche YouTube Agency can serve well?
   - In scope: YouTube creator economy, any niche
   - Flag for review: clients who want services outside the agency's scope (paid ads, video production, etc.)

2. **Realistic expectations**: has the client been told what the agency does and doesn't do?
   - Does the client understand this is SEO and content strategy — not a magic view-growth guarantee?
   - Is the client's upload capacity sufficient for meaningful results? (minimum 1 video/week)

3. **Retainer alignment**: does the client's budget match their growth expectations?
   - Misaligned budgets create pressure that leads to scope creep and churn

4. **Risk assessment**: any signals that this client will be high-maintenance for low return?
   - Unclear niche, constantly shifting direction, unwillingness to share content access

**Decision**: APPROVE / CONDITIONAL (with specific requirements) / DECLINE

## Quarterly Company Goal Review

### Goals to Review Each Quarter

| Goal | Target | Current | Status |
|---|---|---|---|
| ARR | $X (quarterly milestone toward $1M) | $X | 🟢/🟡/🔴 |
| Active clients | X clients | X | 🟢/🟡/🔴 |
| Client retention rate | 85%+ | XX% | 🟢/🟡/🔴 |
| Avg client channel growth | 40% in 90 days | XX% | 🟢/🟡/🔴 |
| QC approval rate | 90%+ first-pass | XX% | 🟢/🟡/🔴 |

### What Each Status Means

🟢 GREEN: On track — maintain current approach
🟡 AMBER: Within 15% of target — review contributing factors, adjust if needed
🔴 RED: More than 15% off target — requires immediate structural response

### Structural Response Options (for RED status)
- **Client acquisition shortfall**: review onboarding funnel, pricing, or outreach
- **Retention shortfall**: deep-dive on at-risk clients, audit reporting quality
- **Growth results shortfall**: audit Production quality and Intelligence Team outputs
- **QC failure rate**: identify which agents are producing failing packages, retrain or restructure

## Client Portfolio Health Assessment

Monthly review of all active clients across four dimensions:

### Health Dimensions
1. **Performance health**: are their channels growing? (from Performance Analyst data)
2. **Satisfaction health**: are they engaging positively with reports and deliverables?
3. **Operational health**: is Production delivering on time and passing QC?
4. **Strategic health**: is the content strategy still aligned with their niche and goals?

### Client Risk Classification
- **GREEN**: all four dimensions healthy — no action required
- **AMBER**: 1–2 dimensions showing strain — CSO to address, CEO monitoring
- **RED**: 3–4 dimensions in decline — CEO-led retention intervention required

### Retention Intervention Protocol (RED clients)
When a client is RED:
1. CEO reviews all available data (reports, performance flags, QC history)
2. CEO meets with CSO to understand root cause
3. CEO decides: strategy adjustment, scope renegotiation, or managed offboarding
4. CEO leads client communication for retention conversations (not delegated)

## Quality Governance

The CEO receives Quality Controller escalations when:
- The same agent fails QC review 3 or more consecutive times
- A client receives a substandard package that the QC process failed to catch

### CEO Response Protocol
1. Review the specific packages that failed
2. Identify whether it is a skill gap (the SKILL.md needs updating) or an execution gap
3. If skill gap: update or replace the relevant SKILL.md
4. If execution gap: retrain the agent by updating their AGENTS.md with more specific instructions
5. Document the failure and resolution in the references/ folder

## Structural Decisions

The CEO has authority to:
- Add new agent roles to the team structure
- Retire agent roles that are no longer needed
- Commission new SKILL.md files or update existing ones
- Restructure team reporting lines
- Approve new client onboarding criteria changes

All structural changes must be documented in COMPANY.md and the relevant TEAM.md files.

## Output Format — Quarterly Review

```
QUARTERLY COMPANY REVIEW
Quarter: [Q1/Q2/Q3/Q4 YYYY]
Reviewed by: CEO
Date: [YYYY-MM-DD]

GOAL PERFORMANCE
[Full goals table with current status]

KEY WINS THIS QUARTER
- [Win]
- [Win]

KEY CHALLENGES THIS QUARTER
- [Challenge] → [Response / Decision made]

STRUCTURAL DECISIONS
- [Any changes to team structure, agents, or skills this quarter]

FOCUS FOR NEXT QUARTER
- [Top 1–3 CEO-level priorities]
```

## Output Format — Client Onboarding Decision

```
CLIENT ONBOARDING DECISION
Client name: [Name]
Channel URL: [URL]
Date reviewed: [YYYY-MM-DD]

DECISION: [APPROVED / CONDITIONAL / DECLINED]

Niche fit: [PASS / FLAG — reason]
Expectation alignment: [PASS / FLAG — reason]
Retainer alignment: [PASS / FLAG — reason]
Risk assessment: [LOW / MEDIUM / HIGH — reason]

If CONDITIONAL: [Specific requirements before onboarding begins]
If DECLINED: [Reason — documented for reference]

Next step: [Who is notified and what happens next]
```

## Quality Check

- [ ] All quarterly goals scored with status
- [ ] Every RED metric has a structural response attached
- [ ] Client onboarding decisions are documented with rationale
- [ ] Quality escalations are resolved with either skill update or agent retraining
- [ ] Structural decisions are logged and referenced in relevant manifest files
