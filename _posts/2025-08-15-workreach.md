---
title: "WorkReach: How Distance, Job Quality, and Informality Shape Where We Work"
categories:
  - complex_systems
tags:
  - mobility
  - employment
  - economic_complexity
  - informality
  - accessibility
last_modified_at: 2025-09-08T18:45:00-07:00
---

<iframe style="width:110%;height:600px;border:none;overflow:hidden;" src="/assets/images/workreach/p5js/index.html"></iframe>

Cities don’t offer the same jobs to everyone. Commuters weigh **how far a job is**, **how good the job is**, and **their own constraints** (like informality at home) when deciding where to work. In our new paper, we introduce **WorkReach**, a discrete-choice framework that blends **distance**, **Economic Complexity (ECI)** at the destination, and **informality** at the origin to explain—and quantify—those trade-offs across **Mexico City, Rio de Janeiro, Los Angeles, and the Bay Area**. :contentReference[oaicite:0]{index=0}

---

## What’s different here

Most flow models (gravity, radiation) are great at prediction but say little about **why** people choose specific work locations. **WorkReach** is built for **interpretability**:

- A **utility function** captures the decision of working at location *j* from home *i*.
- A **transition weight** (a logistic in distance) lets behavior shift from a **“convenience-first”** regime (nearby jobs) to an **“opportunity-first”** regime (farther, higher-quality jobs).
- We estimate **city-specific parameters** you can read directly: how much extra distance people will tolerate for higher ECI, and how origin **informality** changes that willingness.

<img src="/assets/images/workreach/concept_model.png" alt="Conceptual diagram of WorkReach utility and distance transition" style="width:720px;">

---

## Data, cities, and measures

We pair **anonymized mobility/commuting flows** with **employment registries** and **census-based informality** to compute:
- **ECI** (sub-city): diversity and sophistication of local economic activity.
- **Informality** (home areas): proxies based on social protection/registration data adapted to each country.
- **Flows**: observed or synthetic (U.S.) home→work trips mapped to consistent spatial units.

<img src="/assets/images/workreach/eci_informality_maps.png" alt="Choropleths of ECI and informality across the four cities" style="width:720px;">

*What stands out:* Latin American metros show stronger **spatial segregation** (higher informality farther from high-ECI cores), while the U.S. metros are more mixed.

---

## Key findings

### 1) Distance–complexity gradient
Everywhere, people prefer **short commutes**—but they will go **farther** for **higher-ECI** jobs. The **marginal substitution** between distance and ECI is largest in **Mexico City**, smallest in **Los Angeles**, meaning MC workers accept the biggest distance penalties to reach complex opportunities.

<img src="/assets/images/workreach/msr_elasticities.png" alt="Marginal substitution rates and elasticities for ECI vs distance and informality vs distance" style="width:720px;">

### 2) Informality flips by region
- **Mexico City & Rio**: Higher **origin informality** *increases* willingness to travel farther **if** the destination has high ECI (chasing better opportunities).
- **Bay Area & Los Angeles**: Higher origin informality *reduces* willingness to take long trips to high-ECI destinations (constraints dominate).

### 3) A behavioral “threshold” in distance
The estimated **distance threshold (τ)** marks when commuters switch from **nearby-first** to **opportunity-first** mode. It’s **larger** in **Mexico City/Rio** (longer convenience regime) and **very small/sharp** in **U.S.** metros (opportunities matter earlier as distance grows).

---

## How well does it predict?

Despite prioritizing interpretability, **WorkReach** matches **benchmark** gravity/radiation models in **CPC** and **correlation**—and in the **Bay Area**, it takes the top CPC. The payoff is that we can read *why* choices look the way they do—not just that they do.

<img src="/assets/images/workreach/model_fit.png" alt="Observed vs predicted flows, WorkReach vs baselines" style="width:720px;">

---

## Accessibility: distance isn’t the whole story

We compute two complementary metrics:

1) **Distance-weighted accessibility** (closer flows count more)
2) **Consumer-surplus accessibility** (a logsum from discrete choice): the **expected max utility** across all job options, integrating distance, destination ECI, and origin informality.

**Result:** Consumer-surplus accessibility is **consistently lower** for **high-informality** origins in **all four cities**, even where simple distance metrics look favorable. Quality and constraints reshape who truly benefits from the urban job market.

<img src="/assets/images/workreach/accessibility_boxplots.png" alt="Accessibility boxplots by informality group, distance-weighted vs consumer-surplus" style="width:720px;">
<img src="/assets/images/workreach/accessibility_maps.png" alt="Accessibility maps (z-scores) and a combined PCA index" style="width:720px;">

---

## Why this matters for policy

- **Target connections where they unlock quality**: Improve access from high-informality origins to **high-ECI** destinations (Latin America), and reduce **non-distance barriers** for informal workers in U.S. metros.
- **Invest where the trade-off is steep**: Places with high ECI but poor consumer-surplus for vulnerable groups are prime for **transit improvements**; areas with good physical access but low ECI call for **local economic development**.
- **Measure the right accessibility**: Pair **distance metrics** with **utility-based** measures to avoid overestimating access where job *quality* is out of reach.

---

*Paper:* “WorkReach: Modeling Urban Work Location Choices Through Economic Complexity, Informality, and Mobility Data.” (Mexico City, Rio de Janeiro, Los Angeles, Bay Area). :contentReference[oaicite:1]{index=1}

---
