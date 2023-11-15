---
layout: article-layout.njk
title: On Links and SC 1.4.1 Use of Color
date: 2023-11-14
tags: ["post"]
---

[SC 1.4.1](https://www.digitala11y.com/understanding-sc-1-4-1-use-of-color/) states that you need 2 ways of distinguishing "an action, prompting a response, or...a visual element". This applies to every interaction on the web, but let's talk about links. A design system's links will in my experience often fail 1.4.1 by relying solely on the use of color to distinguish it from the surrounding text. There are many ways to decorate text that can satisfy this requirement like:

-   `text-decoration-color`: can use translucency to distinguish the link via contrast
-   `text-decoration-line`: I gotta say--seems IDEAL :)
-   (...?)

The first one is tough to get right. You have to make sure your texts "luminescence" has 4.5:1 contrast across all your various themes and usage (3:1 for text greater than 18ish pixels).

WIP
