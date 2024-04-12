---
layout: article-layout.njk
title: A Note on NextJS Router's Assertive Announcements 
date: 2024-04-10
tags: ["post"]
---

_This is a quick note on a potential NextJS pitfall for accessibility engineers
regarding it's router announcements._ 

I recently discovered a bug during some accessibility verification testing that
was specific to NextJS and the way it's router works. 

## Background
At a high level (forgive me, NextJS devotee's) each time the user clicks a NextJS link the framework mimics browser behavior by changing the page's URL and sending out an
announcement for screen reader users by pushing an update to it's announcer
component that has a `role="alert"` and `aria-live="assertive"`. 

## Problem
I was testing a flow where the user finds themselves on a page with a category
of products. There are buttons at the top of the page that act as sub-filters
for the categories (think going from Drinks to Sodas for example). As the user
filters the page there is a number displayed that tells them visually how many
results their filters have produced. Since the look of the page was very SPA
like (no big chunky refresh etc), my assumption was this number should be an
ARIA live region. In particular a `polite` one (please always be polite). 

The previously mentioned sub filters weren't SPA button's updating the page's
content at all. They were links to distinct page's that represent a set of
filters with search results in the application. And each time one was clicked
the page's new route was announced by the NextJS router's assertive live region. The number was updated as well, since going from "Drinks" to "Soda" will yeild _fewer_ results, But the `aria-live="polite"` region's announcement was getting clobbered by the assertive router announcement. This took a little bit of research on my part because I was unfamiliar with NextJS's accessibility features in particular their router's ARIA live region.

## Solution

ARIA is for screen reader users. From the perspective of a screen reader user
the SPA like nature of the page is totally lost. What they hear is search
results and links that take them to more precise results. So the decision was
made to ditch the live region on the number updating the product count. Because
each filter is a link to a new page the product count isn't dynamic content that
is changing under the user and needs to be updated. It's just content on the new
page the screen reader user needs to explore and orient themselves on.
