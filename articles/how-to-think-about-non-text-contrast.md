---
layout: article-layout.njk
title: How to Think About Non-text Contrast
date: 2023-09-29
tags: ["post"]
---

You get a Slack notification and it's new screens from your visual designer. Everything seems pretty much on system and typical, but the call to action buttons sitting in the cards halfway down the page are a little suspect:

- the buttons have a very light 1px stroke outline
- the background color to the card itself is very close to the button's background color
- the text on the label hits our 4.5:1 target for contrast though!

So how do we assess the accessibility of this component from the perceivability standpoint we're investigating? [1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) seems like the obvious answer here, right? So what does it say:

```markdown
The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):

User Interface Components:

Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;
...
```

I admittedly misinterpreted this guidance for years. Over correcting and requiring that the flat designed Material-esque components in the design language I was working as an accessibility advocate for were 3:1 contrast against their surrounding colors. Which--honestly resulted in big bright readable buttons in all use cases across our various themes so 🤷. I wanted to highlight this misinterpretation though because I think it underlines some purposeful gaps/gray area in the WCAG.

What the WCAG says is that if the boundaries/background of your buttons are the _only_ means of identifying it's a control THEN those boundaries and backgrounds should meet a 3:1 contrast against their surrounding colors. In the case above (and probably yours) the label text alone is enough to exempt any other aspect of this button from falling under the recommendations of 1.4.11.

So is that accessible? Yes--or at least that's what the folks thinking about these problems at the highest level have decided. Is it thoroughly usable and should you closely adhere to it going no further than necessary? Probably not! While an assumption, I'm sure your users would appreciate thoughtfully designed big bright readable buttons in all use cases across your various themes as well. ✌🏼
