---
title: The AI Opportunity Prioritization Framework
subtitle: How to find your first AI win in any company.
layout: page
permalink: /frameworks/ai-prioritization/
comment: false
---

*Created by [Lucas Klaassen](https://www.lucasklaassen.com) — AI Consultant helping companies automate back-office processes with AI Agents.*

---

## The Problem

Every department has manual processes that AI could improve. The challenge isn't finding opportunities — it's deciding which one to start with. Most companies stall here.

This framework gets you to a decision in one meeting.

---

## Step 1: Discovery

**Timeline:** 1–3 weeks depending on company size.

Sit with each department individually. Record every session.

**Ask these 5 questions:**

1. What's the task you or your team enjoys the least?
2. Walk me through exactly how you do it, step by step.
3. How often does this happen? (daily, weekly, monthly)
4. What data do you look at to make decisions during this task?
5. What happens when it goes wrong?

**What you're listening for:**

- **Repetitive data review** — people scanning reports for exceptions
- **Manual routing** — someone reviews something, then messages another team
- **Mental task-holding** — doing a thing, waiting for a response, coming back later
- **"We've always done it this way"** — process nobody has questioned
- **Time estimates** — "this takes me 2 hours every Monday"

Capture every opportunity. Don't filter yet. You want the full picture.

In one recent engagement, this process surfaced **40 pain points across 7 departments.**

---

## Step 2: Score Each Opportunity

Rate every opportunity on two axes:

### Impact (How much value does solving this create?)

**1 — Highest Impact**
Multiple people affected daily. Hours saved per week. Direct revenue/cost implications. Cross-department benefit.

**2 — High Impact**
Multiple people affected weekly. Meaningful time saved. Indirect revenue/cost benefit.

**3 — Moderate Impact**
Few people affected. Moderate time saved. Quality-of-life improvement.

**4 — Lower Impact**
Single person or rare occurrence. Minor time saved. Nice to have.

### Effort (How hard is this to build and deploy?)

**1 — Lowest Effort**
Data already exists and is accessible. Logic is clear and rule-based. Output is read-only. Existing tools can support it.

**2 — Low-Medium Effort**
Data exists but needs light transformation. Logic has some edge cases. May need one new integration.

**3 — Medium-High Effort**
Data spread across multiple systems. Logic requires domain expertise to encode. Needs new infrastructure.

**4 — Highest Effort**
Data doesn't exist or is unstructured. Logic is highly subjective. Requires significant new infrastructure.

---

## Step 3: Plot on the Matrix

```
                HIGH EFFORT              LOW EFFORT
          ┌──────────────────────┬──────────────────────┐
          │                      │                      │
HIGH      │   MAJOR PROJECTS     │    QUICK WINS        │
VALUE     │   >> Plan for        │    >> Start here     │
          │                      │                      │
          ├──────────────────────┼──────────────────────┤
          │                      │                      │
LOW       │   TIME SINKS         │    FILL-INS          │
VALUE     │   >> Avoid           │    >> Grab later     │
          │                      │                      │
          └──────────────────────┴──────────────────────┘
```

---

## Step 4: Pick Your First Project

Your first AI project should be a Quick Win that also meets these criteria:

- ✅ **Infrastructure is reusable** — Will the data pipeline, agent framework, or integration you build for this project make the *next* project easier?
- ✅ **One clear owner** — Is there a single person who will review the output daily and give you feedback?
- ✅ **Success is measurable** — Can you measure before/after? (time saved, errors caught, tasks eliminated)
- ✅ **Low risk** — Is the agent read-only? (surfacing information for humans, not writing to production systems)

Start read-only. Surface information for humans to review. Build trust. Then expand.

---

## Opportunity Log Template

Use this format to catalogue what you find:

<table>
<thead>
<tr><th>#</th><th>Department</th><th>Process</th><th>Frequency</th><th>People</th><th>Impact</th><th>Effort</th><th>Quadrant</th></tr>
</thead>
<tbody>
<tr><td>1</td><td></td><td></td><td></td><td></td><td>1–4</td><td>1–4</td><td>QW / MP / FI / TS</td></tr>
<tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>

---

## Real Example (anonymized)

40 opportunities across 7 departments. 12 Quick Wins identified:

<table>
<thead>
<tr><th>#</th><th>Department</th><th>Process</th><th>Frequency</th><th>People</th><th>Impact</th><th>Effort</th><th>Quadrant</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Purchasing</td><td>Daily inventory discrepancy review</td><td>Daily</td><td>6</td><td>1</td><td>1</td><td>Quick Win</td></tr>
<tr><td>2</td><td>Customer Care</td><td>Manual order approval</td><td>Daily</td><td>6</td><td>1</td><td>2</td><td>Quick Win</td></tr>
<tr><td>3</td><td>Warehouse</td><td>Morning health check across 4 systems</td><td>Daily</td><td>1</td><td>1</td><td>2</td><td>Quick Win</td></tr>
<tr><td>4</td><td>Finance</td><td>Freight invoice audit</td><td>Daily</td><td>2</td><td>1</td><td>3</td><td>Major Project</td></tr>
<tr><td>5</td><td>Sales</td><td>Pre-call customer briefing</td><td>Daily</td><td>13</td><td>1</td><td>3</td><td>Major Project</td></tr>
<tr><td>6</td><td>Marketing</td><td>Promo status tracking</td><td>Daily</td><td>3</td><td>1</td><td>3</td><td>Major Project</td></tr>
</tbody>
</table>

**Result:** Executive team picked #1 unanimously. Shipped in weeks. Infrastructure from #1 accelerated #2 and #3.

---

## The Golden Rule

> The biggest risk in AI adoption isn't picking the wrong project. It's spending 6 months debating and picking nothing.

**Pick a Quick Win. Ship it. Build trust. Expand.**

---

## Want help running this at your company?

I help companies identify and automate back-office processes with AI Agents. If you want to find your Quick Wins, let's talk.

📧 [hello@lucasklaassen.com](mailto:hello@lucasklaassen.com)
🌐 [lucasklaassen.com](https://www.lucasklaassen.com)
💼 [LinkedIn](https://www.linkedin.com/in/lucas-klaassen/)
