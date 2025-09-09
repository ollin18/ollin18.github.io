---
title: "Socioeconomic Disparities in Mobility During COVID-19"
categories:
  - complex_systems
tags:
  - mobility covid-19 inequality gps developing-countries
last_modified_at: 2025-09-08T21:33:37-04:00
---

<iframe style="width:110%;height:600px;border:none;overflow:hidden;" src="/assets/images/disparities_covid/mobility-country.html"></iframe>

When the COVID-19 pandemic arrived in 2020, people across the world drastically changed their daily movements. But not everyone could change in the same way. In developing countries, where large parts of the population rely on informal jobs and long commutes, staying at home was often not an option.

In our paper published in *EPJ Data Science*, we analyzed anonymized GPS data from **281 million users across six middle-income countries**—Brazil, Colombia, Mexico, South Africa, Indonesia, and the Philippines—between March and December 2020. By combining mobility data with census-based wealth indices, we uncovered stark inequalities in how different socioeconomic groups responded to the pandemic.

---

## Self-Isolation at Home

Staying home was one of the first lines of defense against the virus. Yet, not all groups could afford it.

- People living in **high-wealth neighborhoods** were **252% more likely** to self-isolate compared to the pre-pandemic baseline.
- In contrast, those in **low-wealth neighborhoods** saw only a **141% increase**.

That’s a **111 percentage-point gap**, visible consistently across all six countries.

<img src="/assets/images/disparities_covid/self_isolation.png" alt="Change in self-isolation rates by wealth group" style="width:500px;">

The ability to work from home, access to digital infrastructure, and greater financial security all made it easier for wealthier households to comply with restrictions, while poorer groups remained exposed.

---

## Relocation to Rural Areas

Another striking inequality emerged in **urban flight**.

- Users from high-wealth neighborhoods were **49 percentage points more likely** to relocate to rural areas than their low-wealth counterparts.
- This pattern was most pronounced in South Africa, with an 80-point gap.

<img src="/assets/images/disparities_covid/relocation.png" alt="Urban-to-rural relocation flows by wealth group" style="width:500px;">

Wealthier groups could escape dense urban centers, while poorer groups had fewer options, remaining in the most affected areas.

---

## Commuting and Economic Stress

Commuting patterns revealed perhaps the clearest link between mobility and inequality.

- High-wealth users stopped commuting at a rate **30 percentage points higher** than low-wealth users.
- Among low-wealth residents, those who worked in **high-wealth neighborhoods** were **37 percentage points more likely** to stop commuting than those working in low-wealth areas.

<img src="/assets/images/disparities_covid/commuting.png" alt="Commuting reductions by home and workplace wealth" style="width:500px;">

This meant that workers in vulnerable areas not only faced job insecurity but were also disproportionately hit when public transport was shut down, as they often had the longest commutes.

---

## The Role of Policy

Most containment policies—school closures, workplace restrictions, and transport shutdowns—were implemented country-wide. But their effects were **unequal**.

- **Public transport closures** particularly hurt low-wealth commuters traveling to high-wealth neighborhoods.
- In contrast, wealthier residents were more responsive to case incidence, adjusting behavior as infections rose.

<img src="/assets/images/disparities_covid/policy_effects.png" alt="Impact of policy restrictions on commuting" style="width:500px;">

This highlights how blanket policies can deepen existing inequalities if not designed with vulnerable groups in mind.

---

## Lessons Learned

Our findings show that:

1. **Mobility inequality persisted throughout 2020**—even as restrictions eased, wealth gaps in self-isolation, relocation, and commuting remained.
2. **Workers from low-wealth neighborhoods commuting to high-wealth areas bore the greatest burden**, losing jobs or being cut off from transport.
3. **Mobile data can help** identify these disparities in real time, offering a way to design place-based policies when individual-level information isn’t available.

---

The pandemic forced everyone to change how they moved, but it did not do so equally. By using large-scale GPS data across continents, we show that **mobility inequality is a critical dimension of vulnerability in crises**. Future responses must take these disparities into account, ensuring that the burden of protecting public health does not fall most heavily on those least able to bear it.

