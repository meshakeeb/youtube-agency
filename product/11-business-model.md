# Business Model — Pricing, Unit Economics, Revenue Streams

> Sourced from market gap analysis in [research-competitive.md](research-competitive.md). Target positioning: own the empty $80–$200/mo agentic premium tier; expand into agency ($499) and enterprise (custom).

---

## 1. Pricing Tiers

| Tier | Price | Target | Included |
|---|---|---|---|
| **Starter** | $79 / mo | Solo creators 1K–25K subs | 1 channel · 4 Production runs/mo · weekly monitoring · Material You theme only · email support |
| **Pro** | $149 / mo | Niche professionals 25K–500K subs (trading, finance, dev, fitness) | 1 channel · **unlimited** Production · brand-voice profile · niche intelligence · weekly + monthly reports · both themes · integrations (Buffer, Hypefury, Telegram, Slack) · Priority support |
| **Agency** | $499 / mo | Agencies running 8–40 client channels | Up to 10 channels · all Pro features · white-label client portal (custom domain + brand) · multi-client switcher · CSV/API exports · dedicated Slack channel |
| **Custom (Enterprise)** | from $2,500 / mo | Brand studios, MCNs, talent agencies | Unlimited channels · on-prem option · custom agents · per-tenant voice-model fine-tuning · SOC2 + DPA · SLAs |

**Annual discount:** 17% (2 months free) — standard SaaS.

### Why these price points

- Spotter caps at **$49** (ideation-only). vidIQ Max is **$79** (assistive only). Tubular jumps to **$1,500**. The **$79–$499 band is open white space** with no agentic competitor.
- Trading-edu creators carry **$10–$25 CPM**. A creator at 100K subs averaging 100K views/video can fund $149/mo from a single video.
- Agency price benchmarks against Spotter Studio team seats (~$49/seat × 6 seats = $294) and Vidooly Brand Intelligence ($999) — we sit in the middle with broader feature surface.

### What is *not* metered

- Production runs in Pro are unlimited. Metering is the #1 reason vidIQ feels stingy in 2026 reviews. We intentionally avoid this UX failure.
- Channel-connected analytics reads (the YouTube API cost is on us).

### What *is* metered (Starter only)

- 4 Production runs/month at Starter. Designed to push serious creators to Pro within 90 days.

---

## 2. Revenue Streams

1. **Core subscriptions** (95%+ of revenue Y1–Y2): Starter / Pro / Agency / Custom.
2. **Premium add-ons** (post-V2):
   - **Thumbnail Image Generation pack**: +$29/mo — generated images, not briefs only.
   - **Backlog Optimization Sweep**: +$49/mo — weekly re-scoring + re-optimization of historical catalog.
   - **Compliance Co-Pilot** (trading niche): +$39/mo — SEC/FINRA-adjacent risk scanning.
3. **API / data licensing** (V3+): structured niche intelligence + competitor outputs available to MCNs and brand-side buyers.
4. **One-time services** (low priority): channel-rescue consulting, custom voice-model fine-tuning.

---

## 3. Unit Economics (steady-state, end Y1)

| Metric | Starter ($79) | Pro ($149) | Agency ($499) |
|---|---|---|---|
| Avg LLM cost per Production run | $0.85 | $0.85 | $0.85 |
| Avg runs / mo | 4 | 18 | 64 (across clients) |
| Monthly LLM cost / account | $3.40 | $15.30 | $54.40 |
| Monthly YouTube API + infra | $0.80 | $1.80 | $5.40 |
| Avg payment processing | $2.45 | $4.62 | $15.47 |
| Avg customer support | $2.10 | $4.50 | $18.00 |
| **Total COGS** | **$8.75** | **$26.22** | **$93.27** |
| **Gross margin** | **89%** | **82%** | **81%** |

These margins are healthy because:
- Most LLM calls are short prompts (title/tag work).
- Niche intelligence + brand voice are amortized across hundreds of videos.
- LangSmith + Postgres + pgvector all on Supabase keep infra cost flat at $0.80–$5/mo per account.

---

## 4. CAC / LTV Model (target end Y2)

| Tier | Blended CAC | Payback months | 24-mo LTV | LTV/CAC |
|---|---|---|---|---|
| Starter | $42 | 0.6 | $1,560 | 37× |
| Pro | $185 | 1.5 | $3,200 | 17× |
| Agency | $1,200 | 3.0 | $11,000 | 9× |

**Assumed monthly logo churn:** 4% Starter / 2.5% Pro / 1.5% Agency (anchored on Spotter/Taja review-aggregated retention).

**Net dollar retention target:** 110%+ — driven by tier upgrades (Starter → Pro within 90 days for ~30% of cohort) and add-on adoption.

---

## 5. Go-to-Market

### Wedge: trading-education creators
- Tightest niche where the brand-voice + QC differentiation is most visible.
- Highest CPM = highest willingness to pay.
- Tight community on Twitter/X + Discord — high virality if we land 5 hero customers.

### Channels
1. **Founder-led content** — weekly long-form on Blackbird's own YouTube about "how we built the agent that built this video."
2. **Co-marketing with trading creators** — 12 hero case studies with measurable CTR/AVD lifts.
3. **Twitter/X presence** — daily Blackbird-generated repurposing posts demonstrate the product itself.
4. **Affiliate program** — 20% recurring for agency operators that bring in clients.
5. **Direct outreach to Spotter/vidIQ churned customers** — these are pre-qualified leads who already pay for the category.

### NOT channels
- Cold paid social (creator economy is brand-skeptical of generic ads).
- Generic SEO content marketing (LLMs have flooded this).
- Influencer marketing through brand-side platforms (wrong audience).

---

## 6. 24-Month Financial Trajectory

| Quarter | New paid seats | MRR | Cumulative ARR | Burn / mo |
|---|---|---|---|---|
| Q3 2026 | 5 design partners | $0.5K | $6K | $90K |
| Q4 2026 | 250 | $50K | $600K | $120K |
| Q1 2027 | 400 | $70K | $840K | $140K |
| Q2 2027 | 600 | $83K | $1.0M ARR | $160K |
| Q3 2027 | 900 | $128K | $1.5M ARR | $185K |
| Q4 2027 | 1,400 | $200K | $2.4M ARR | $215K |

**Implied fundraise:** $1.5M seed (Q3 2026) gets to $1M ARR. $4–6M Series A around $1M ARR for the niche-expansion + autonomous-strategy build-out.

---

## 7. Anti-Patterns We Will Not Adopt

- **Credits/usage metering on the core flow.** vidIQ and 1of10 frustrate users with this. We absorb the variance into the tier price.
- **Feature gating across 6+ tiers.** Three tiers + one custom is the ceiling.
- **AI add-on tax.** "Pay extra for AI" is the TubeBuddy Legend mistake; in 2026 the AI *is* the product.
- **Free tier that gives away the moat.** Brand voice + QC + agentic pipeline are paywalled from day one. A 14-day trial of Pro is the only freemium surface.
