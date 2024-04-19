---
layout: article-layout.njk
title: NVDA Does Not Read an Element's aria-describedby Value in Browse Mode
date: 2024-04-17
tags: ["post"]
---

Recently I was testing a removable tag component that was part of a filtered
search flow that looked something like this:

```html
<div class="tag">
  <span id="tag1">Soda</span>
  <button aria-describedby="tag1" aria-label="remove" type="button">×</button>
</div>
```

The component was very simple--made up of a text leaf and a button as siblings inside a parent `div` used for styling. The whole thing looks like the side profile of a pill with text on the left and a X on the right used to remove the filter from the search results shown below in the user interface. Testing in VoiceOver on Safari in macOS produced expected results: "remove Soda, Button".

Since we're good eggs and want to make sure to [test our normative user's
experience](https://webaim.org/projects/screenreadersurvey10/#browsercombos) we
opened up our Windows 11 testing environment and fired up NVDA on Chrome, moved
the screen reader's navigator object to the 'remove' button with <kbd>CAPS</kbd>+<kbd>↓</kbd> (your NVDA key might be different than capslock but I test on a laptop and can't use insert easily enough) and heard simply, "button
remove". Interesting! It's not reading the description. Double checked the code
then double checked the environment. Trauma from when I first started testing
with screen readers many years ago taught me to also totally close and open the browser. Still
the same results.

Darkness descends on me and imposter syndrome begins to take hold. But
undeterred (after a triple check of all the aforementioned things) I take to
NVAccess's Github repo and find an open issue [describing what we're seeing](https://github.com/nvaccess/nvda/issues/12718).

TLDR this is a feature and not a bug--and a long standing one at that. If the element receives _system focus_ (blue box for my sighted tester pals) it's name and description will be read in full, but in browse mode (red box) only the text on the page and the element's role will be read. While great detail wasn't really gone into in the thread if the reasoning is something like, 'being less verbose in Browse mode is how we've always done it' that's totally alright with me and will actually inform how I design and develop moving forward by making a point to rely less on `aria-describedby` in situation's like this.

[Coded example tags for testing](https://codepen.io/dakahn/pen/PogyzzW)
