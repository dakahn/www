---
layout: article-layout.njk
title: Polite Suggestions, Not Rules
tags: ["post"]
---

# Polite Suggestions, Not Rules: An A11y Education

The way I see it there are three big 'eras' or personal growth when a dev decides to start seriously specializing in accessibility (whatever the hell that means):

## Era 1 - The beginner or: You Don't Know What You Don't Know

Most front-end devs (worth their paycheck) sojourn into accessibility a few times a month. Clumsily referencing documentation they maybe don't fully understand, but now you linger on those docs. Carefully scanning the needlessly complex markup examples and out of date ARIA techniques dedicating what you can to memory to regurgitate later on your unexpecting screen reader users. You're approaching these ancient purportedly hallowed tomes like the reactjs.org Getting Started guide. You're not sure whose writing this stuff or what their claims to fame are, but rest assured they definitely know more than you and if asked you can point to them and say 'look it says so here'. Wait--they're written by committee?

## Era 2 - The Intermediate or: You Know What You Don't Know

Ok, yes--the go to accessibility docs are written by committee and sometimes [not especially thoughtfully](https://github.com/w3c/aria-practices/issues/353). There are obscure references, out of date examples, lawyer-esque turn of phrase and really very little resembling modern JS based front-end development tools and techniques. The guidelines are made to be universally applicable and long lived. A little like a driver's license test--if you follow those rules you'll get home safe and sound (and probably accessibly). The problem is in translation and that's the magic trick you're slowly learning. Inspecting their working example of a tab component and translating it to _your app's tab component_ that was hastily thrown together using mostly `<divs>` as an 'MVP' (lol) multiple years before you joined the company. While doing this translation you begin to build up a handful of techniques and patterns you can apply over and over again. You've integrated automated tooling into your workflow and can spot at a distance mistakes less experienced colleagues are making. These patterns combined with tooling start to establish rules in your head and those rules--because they're based on the aforementioned hallowed tomes and tome-derived robots should be bulletproof, right? At least until the next WCAG version?

## Era 3 - The Expert or: You know What They Don't Know

No.

Actually--very no. The WCAG and WAI-ARIA don't really represent 'rules' at all. They're polite suggestions that a group of well meaning and technically proficient volunteers has deemed over some of amount of time to be 'pretty good'. At least most of the time they're suggestions. There are lots of pretty good things you should definitely do for your disabled users that the WCAG doesn't really politely suggest you do at all. For example making your buttons a good contrasting color from your page's background. There's no rule that says you have to (many--including me for more years than I'd like to admit--are too strictly interpreting [1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) in these exact instances) but you definitely always should. There's no compelling reason to have controls be difficult to spot and operate that I'm aware of. 

It's at this point that what was *clearly* a science before--becomes something closer to art. Context becomes key to determining the best path forward. Are you coding a shopping cart with tiny images of the items next to a clickable description. The images of the items are important, but if you give them proper alt text a screen reader user could potentially hear something like _'Image. Limited edition colorway tomato red soccer cleats, limited edition colorway tomato red soccer cleats; link. click to activate'_. Not ideal--especially if there is a real possibility of a user filling their cart with many items from your store. So then maybe we should hide these very-not-decorative images from screen readers with `aria-hidden`--which seems to go against a11y patterns you learned in era 1 and 2? Yes, please do that. 

---

I found approaching this last era extremely frustrating. I'm a developer by training and the gray area in which a lot (most?) of accessibility engineering exists can be very off putting to someone looking for hard provable rules and a comforting pass/fail binary. Yeah, your text input should always have a visible label, but what if it can't due to some awful design constraint? What if it's a search bar with a spyglass icon? What if there is actually literally no room above it because of some dumb marketing hero image? Then what?

Then that's where all that previous experience of the past two eras can be utilized to figure out and (hopefully) iterate on finding the most accessible and usable experience for all your users using that big bag of patterns, tools, techniques. There's no amount of end to end testing or linting or 5+ year old Stackoverflow threads that can answer those questions. Just be careful because more than likely no one else knows what you don't know either.   

✌️
