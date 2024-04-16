---
layout: article-layout.njk
title: Notes on Accessibility and The Product Development Lifecycle
date: 2024-04-16
tags: ["post"]
---
_A general truism i've observed: the later in the design and development process accessibility becomes a sized and addressable consideration the larger and more difficult creating an accessible outcome becomes--it may not even be possible with the right set of constraints (delivery time, etc)._

For the past two years I've spent the majority of my time standing up and establishing an internal accessibility program for a medium-large ecommerce company. Slowly shifting over time from a one-man-army style approach to something like a hub-and-spoke model with various designated Accessibility Advocates deployed on key feature teams utilizing me as a central source of truth and resource for their development in the space career-wise. These advocates are sometimes present during early ideation and conceptualization in the design phase and always present for the handoff and entire lifespan of the development phase (there's lots of overlap there, but for our purposes here we'll simplify). The expectation is that these accessibility advocates will be able to speak to the as-is and to-be of the product's accessibility story as well as potential impacts proposed work might have on said story in the future both positive (value) and negative (cost, respectively). 

**Here's some high level notes on strategy for successfully integrated (and "shifting
left") accessibility into a product design/development roadmap:**

## Why Accessibility Advocacy and Expertise in the Planning Phase is important 
Product, design and development should align as early as possible with as much information as possible so the team can pragmatically represent accessibility on their roadmap (iteration, development, testing). There will be accessibility unknowns discovered in this alignment process. Teams should utilize resources (local and not local) to fully understand the technical scope from an accessibility perspective.

Some seemingly simple (anti-)patterns in visual and UX design are complex to implement accessibly. Considering accessibility early allows product and design to properly weigh these features in relation to more critical or impactful features that are less complex from an accessibility standpoint.

Whenever new features are added or removed or existing features are changed the scope of the accessibility ask should be re-evaluated. Sometimes a seemingly innocuous late stage tweak (due to deadlines, technical constraints, whatever) can have negative ramifications for accessibility and usability that require larger unforeseen changes (or worse!). This has the added benefit of giving teams a chance to _always_ involve accessibility in each step of the process. With a tangible road marker representing those moments.

## What does Accessibility Advocacy in the Planning Phase look like functionally

_Functionally_ access to accessibility expertise during planning (and execution if that's not obvious) allows teams to discover assumptions, gaps in thinking or shed light on unknown variables and unforeseen consequences that--if accessibility is an expectation and not a feature or a "fast-follow"--can greatly slow development, cause scope to alter unexpectedly or delay delivery. A voice in the room that can speak to the size of the work required to create an accessible experience, potential pitfalls, known issues etc is invaluable here if a realistic understanding of the size of the unit of work proposed is a desired outcome. 

## An example with three potential outcomes

A practical example: there has been a cart redesign. Each list item inside the cart now includes a way to increase or decrease the required amount--even allowing the user to remove the item altogether. As this happens the total price of the cart visible on the page is updated dynamically. Previously this cart total was static and as the user was only allowed to add or remove items any cart adjustments resulted in a page refresh. Here's three potential ways this plays out in order or most-common to least (but best):

### 1. There is no or only a fundamental understanding of web accessibility in the room 
Here the team is mostly in the dark about what is required to successfully deliver an accessible experience--nevermind how much effort that delivery will it will take. Typically you can expect issues to slip by this team or be missed in cursory examination. If issues are caught it's near to delivery at which point delivery dates may need to be pushed or folks will have to work hard to get the fixes in before launch. This will often necessitate late stage bargaining and iteration with design (who have often moved on to their next project) and generally can be expected to result in shipping a bad experience for users with impairments.
### 2. There is an intermediate level of accessibility knowledge in the room
In this scenario what is required is understood. The team knows what they need to deliver an accessible experience, but can't speak at a deep level about what it might take to implement those requirements. Relative difficulty is understood but maybe not specifically in context. They know they need an `aria-live` region, but maybe not that it should be `polite` or on the page _on initial render_ etc. Often times these teams can find themselves shipping even less-accessible experiences than folks with no or only fundamental accessibility knowledge as more damage can be done with ARIA and good intentions than without. 
### 3. There is intermediate or advanced level of accessibility knowledge in the room with access to accessibility resources 
Here the team has locally or immediately available resources to help them
conceptualize the problem and plan for solutions. Resources can include an accessibility team, a designated point person or advocate who knows where to find answers or a component library or design system team with a local expert(s) in accessibility. This team can completely understand the scope of the task and plan according cordoning off ample time for prototyping, testing and iteration. They can move confidently and swiftly delivering a digital product that meets an accepted minimum level of accessibility with no zero hour gotchas or last minute refactors required. Design as well will be able to catch gaps or wrong assumptions in their work at hand off (or more "left") and have time to course correct or pivot.
