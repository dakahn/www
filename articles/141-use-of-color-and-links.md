---
layout: article-layout.njk
title: On Links and SC 1.4.1 Use of Color
date: 2023-11-14
tags: ["post"]
---

[SC 1.4.1](https://www.digitala11y.com/understanding-sc-1-4-1-use-of-color/) states that you need 2 ways of distinguishing "an action, prompting a response, or...a visual element". This applies to every interaction on the web, but let's talk about links.

A design system's links will in my experience often fail 1.4.1 by relying solely on the use of color to distinguish it from the surrounding text. There are a few ways to decorate text that can satisfy this requirement, but let's look at two mentioned in the success criteria itself:

- `text-decoration-color`: can use translucency to distinguish the link via contrast
- `text-decoration-line`: I gotta say--seems IDEAL :)

The first one is tough to get right. You have to make sure your texts "luminescence" has 4.5:1 contrast against the other non-interactive text on the page across all your various themes and usage (3:1 for text greater than 18ish pixels--or "big"). Why would you do this when you can just do the second one?

There's a concept in architecture I have pretty slavish devotion to when it comes to visual and UX design for the we called Truth to Materials that essentially boils down to using the best material for the job you're trying to accomplish (instead of making the wrong material work through some amount of effort) AND don't hide the nature of the materials (make it look like something it's not through some amount of effort). Let it seem like what it is. When we want to send users to new URLs at our current URL we show them links and links are differentiated via color and an underline text decoration.

Ah, but what about weight--boldness? Well, this is a topic of debate but you'd need to know for sure that _only links_ were ever emboldened on the page (probably not the case considering traditional heading styling) AND your boldness was very clear--like probably aesthetically questionable it's so clear.

At this point we're breaking Truth to Materials for almost certainly no good reason as--other than sites with the most unimaginably scant line height aside--you are not so lacking in vertical space as to necessitate the removal of all underline text decoration.
