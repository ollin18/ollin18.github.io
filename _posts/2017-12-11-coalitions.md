---
title: "Mexican Senate Coalitions"
categories:
  - Senate
tags:
  - dynamics senate mexico mexican coalition vote bill
last_modified_at: 2017-12-11T16:55:37-04:00
---
# Coalitions in the Mexican Senate
### In this post I'm going to talk about how the current mexican senators are colluded with each other in a complex network point of view.

A very hot topic in complex networks is community detection which is basically finding groups of nodes that are densely connected. I described this
as *hot* becase it's not a closed problem and new detection algorithms are released constantly, in a future post I will discuss this data set with my own algorithm but in this one we are going to talk about assortativity mixing.

Assortativity mixing is the tendency of vertices to connect to others that are alike it in some way, this
is also called homophily which is clearer to understand as it resembles the predilection of agents to connect to their equals.
To measure this we need some definitions first:

> **Community**:
>
> A group of nodes within a network that are tightly connected to eachother and weakly connected to the rest of the network.

Now we want to compare some statistical properities of the communities such as the inter and intra cluster links.
> Let $$c_{in}$$ be the number of links between nodes from the same cluster and $$c{_out}$$ the links between nodes that
don't belong to the same communities.
>
> A necessary condition for a network to be assortative is $$c_{in}$$ > $$c_{out}$$

The detectability threshold states that in the limit $$n \rightarrow \infty$$
unless:

$$c_{in}-c_{out} > 2\sqrt{<k>}$$

where $$<k>$$ is the average degree, the randomness in the graph washes out the block structure to the extent that no algorithm can label the vertices
better than chance meaning that no community structure can be found in such a network.

When it comes to merely topological assortativity the most common one is by degree
correlation and it has been long studied. In general a network displays degree corre-
lations if the number of links between the high and low degree nodes is systematically
different from what is expected by chance when the high degree vertices will be
preferentially attached to other high degree vertices and the analogous way fot the low
degree we’ll say that the network presents assortativity mixing by degree but if the high
degree vertices tend to connect to low degree ones and vice versa we’ll have disassorta-
tive mixing by degree. Several social network present assortativity mixing.

In thist case we're going to use a different kind of assortativity, by properity. This means that
a node will tend to pair others if they have certain similarity by a property or metadata.
Since we are reviewing political data the first and most naive clusters we may consider are the ones
formed by parties.
The Mexican Chamber of Senators it's conformed by the following:

| Party | Senators |
|:----:|:-----:|
| PRI | 55 |
| PAN | 37 |
| PT | 14 |
| PRD | 10 |
| PVEM | 7 |
| Independent | 5 |
| Total | 128 |

These numbers are not the original ones since Senators like Sofío Ramírez, Manuel Merino, Layda Sansores and Marco Antonio Blásquez
to name a few were elected as part of a party but then changed their membership to another one. Also (although illegal) some Senators
change or try to change their seat to become governors or other jobs.
<img src="/assets/images/senadores-1.png" alt="Cambios de partido">
[El Financiero.](http://www.elfinanciero.com.mx/nacional/en-anos-senadores-cambian-hasta-veces-de-partido.html)

Parties like Movimiento Ciudadano doesn't have any current senators because the ones that got elected
under the MC flag (the aforementioned Layda Sansores and Marco Antonio Blásquez) changed their party affiliation
and neither do MORENA because it was created after the last elections and even though some of them are affilieted to
MORENA they can't officially represent it.

Assortativity is important because it measures a degree of community structure within a network. And we can use our previous knowledge
about the metadata to gain some insights.

As I said earlier in this post, let's see the assortativity, $$c_{in}-c_{out}$$, if we consider each party as a cluster:

<img src="/assets/images/assortativity_party.png" alt="Assortativity by party">

The red line indicates the community detection threshold i.e. $$2\sqrt{<k>}$$ and what it tells us is that considering
the parties alone is not a good partition of the network or it doesn't contains groups at all as the assortativity is
way below the threshold.

We now may use some previous knowledge of the system in order to improve the assortativity measure. We now can consider PRI and PVEM
as a unique cluster and the same for PRD, PT and Independent (as the majority of them belong to MORENA) leaving PAN Senators alone.

<img src="/assets/images/assortativity_pripvem-pan-izq.png" alt="Assortativity PAN alone">

We can see a signifant improvement but it is still not enough to consider this ones as true communities. So maybe there's something
about one of these groups that we are not considering and what first comes to mind is the shiny new PAN-PRD-MC coalition *"Por México,
Al Frente"*, so perhaps we should now consider PAN as an ally to left parties.

<img src="/assets/images/assortativity_pripvem-panizq.png" alt="Assortativity frente">

This is quite interesting, isn't it? Now we can be sure that the network has community structure in at least 4 quarters. The third trimester
in 2012 (first of the legislature), the second trimester of 2015, and the third and fourth trimesters of 2016. Four out of twenty is interesting but
not enough.
Do you know what happend in this periods?
Leave a comment!

Now we've seen that PAN is a key player in this assortativity game and from the previous results we can think that the other 16 quarters the
senators from that party were closer to the PRI-PVEM ones.

<img src="/assets/images/assortativity_right-left.png" alt="Assortativity right left">

Ok... now we can be sure that community structure indeed exist in every quarter of both legislatures (LXII and LXIII)! and not only that,
we can see that for the third trimester of 2012 and the fourth of 2016 the assortativity is greater than with the PAN-PRD-PT-Independent cluster,
telling us that PAN has being close to them only twice while 18 times to the PRI-PVEM (quarterly-wise). This leads us to conclude that
the Senate is very well divided in Right (PRI-PAN-PVEM) and Left (PRD-PT) wings, belie that there's not such thing as the PRIAN.

Another measure that we can be interested to see is the ratio of intra and inter clusters in these groups.

<img src="/assets/images/todos_ratio.png" alt="Ratio party">

<img src="/assets/images/todos_coaliciones_ratio.png" alt="Ratio coalition">

We can verify with these ones the voting dynamics that were seen previously.

To conclude, the Mexican Senate shows community structure which we can see by naive methods and that we'll compare
later to a community detection algorithm. We also saw that it is very well segregated into Right and Left wings.
If you have any comments please be sure to leave them in the box below.
