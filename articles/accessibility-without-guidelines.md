---
layout: article-layout.njk
title: Accessibility Without Guidelines
date: 2020-10-12
tags: ["post"]
---

## You don't need this

Let me start by saying -- you probably don't need this article. User interfaces on the web are for the most part a solved problem. I'll go even further -- I'm willing to bet there's nothing _your_ users need to do that is special or unique. They're filling out forms, reading bits of content, navigating to and from information (etc) and they're probably doing those things using text inputs, list boxes, dialogs, and unordered lists of links. For all the people that fall into that category [just use the W3 guidance](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/) or a well regarded interpretation of said guidance and go on with your life.

But what if that's not you, well then you might fall into one of a few boxes:

1. You're mistaken.
2. You build/maintain a component library and your users want extended functionality of some kind.
3. You're attempting to bring some operating system or native software interaction to the web.
4. You're making accessible data visualizations.

It's not that the list of W3 primitives that have guidance is totally complete and comprehensive. There are certain common-enough web components that are notable by their absence (tree, "advanced" datagrid and some I'm probably forgetting). It's just that the web is made up of 100 or so patterns (if [The Design of Sites](https://www.abebooks.com/servlet/BookDetailsPL?bi=30697302756&searchurl=isbn%3D9780201721492%26sortby%3D17&cm_sp=snippet-_-srp1-_-title1) is to be believed) -- maybe a dozen or so more, but not _hundreds more_ -- and those patterns have interactions and those interactions are pretty well represented in that aforementioned list.

But let's say you're category two or three. Let's say -- and this is a terrible idea, don't do this -- you have a combobox that has checkboxes in the listbox (dropdown). What do you do?

## Understand the primitives you're about to break

What I mean is really deeply understand your subject matter. What is a combobox? What is the expected interaction for mouse, keyboard, and screen reader users? Know that _before_ you extend, change or deviate so you can preserve as much of that experience as possible. Like I mentioned above. The web is 100 or so patterns. The user has most of these dedicated to memory and can draw from past experiences to complete tasks on the web efficiently. When you break those patterns you introduce friction. I'm no UX researcher, but throwing the user a curve ball mid sign-up process is probably less than ideal and to be avoided.

Okay, so you did your homework and you understand a combobox is a text input with a listbox. The user types and options matching what the user is typing appear below the text input. The user can then use various keyboard controls or their mouse to select those options. There are some more branching paths to consider (can the user _add_ to the options? can they remove options?), but for now we'll omit those details for the sake of clarity.

Let's stare at some HTML and see if we can see any potential problems with our proposed checkbox interaction

```html
<label for="ex1-input" id="ex1-label" class="combobox-label">
  Choice 1 Fruit or Vegetable
</label>
<div class="combobox-wrapper">
  <div
    role="combobox"
    aria-expanded="false"
    aria-owns="ex1-listbox"
    aria-haspopup="listbox"
    id="ex1-combobox"
  >
    <input
      type="text"
      aria-autocomplete="list"
      aria-controls="ex1-listbox"
      id="ex1-input"
    />
  </div>
  <ul
    aria-labelledby="ex1-label"
    role="listbox"
    id="ex1-listbox"
    class="listbox hidden"
  ></ul>
</div>
```

We've got a label, a text input wrapped in some divs that's a sibling with an unordered list that through the magic of Javascript and CSS hides/shows as the user types. What about a checkbox -- or to be more precise a group of checkboxes?

```html
<h3 id="id-group-label">
  Sandwich Condiments
</h3>
<div role="group" aria-labelledby="id-group-label">
  <ul class="checkboxes">
    <li>
      <div role="checkbox" aria-checked="false" tabindex="0">
        Lettuce
      </div>
    </li>
    <li>
      <div role="checkbox" aria-checked="true" tabindex="0">
        Tomato
      </div>
    </li>
    <li>
      <div role="checkbox" aria-checked="false" tabindex="0">
        Mustard
      </div>
    </li>
    <li>
      <div role="checkbox" aria-checked="false" tabindex="0">
        Sprouts
      </div>
    </li>
  </ul>
</div>
```

So there's a lot of similarity there which is encouraging. But keen eyes will see very different aria. The Combobox's listbox has the attribute `role="listbox"` while the checkbox's unordered list has no aria role and instead a wrapper `div` surrounding the unordered list has `role="group"`. Aria roles stacked in aria roles will almost always result in a broken at worst and inconsistent and frustrating at best screen reader experience. Since our base interaction is a combobox _being extended_ with checkbox options your next question may be "what does the attribute `role="group"` communicate to the user?".

## More problems the more we learn

Digging further into the WAI-Aria guides you'll see a list of expected keyboard commands. For each component. Cross referencing both combobox and checkbox highlights another problem. The <kbd>space</kbd> key. The <kbd>space</kbd> key is used to toggle a dual state checkbox, but how would that work if that checkbox was tied to a text input? Then <kbd>space</kbd> would only enter white space into the textbox and not toggle the checkbox's state. Maybe we could have the checkbox toggle on <kbd>enter</kbd> instead. Still problematic because typically when using a combobox the <kbd>enter</kbd> key would make a selection, close the listbox and populate the textbox with the selection. The user would be forced to use <kbd>escape</kbd> to close the listbox.

The task can still be completed, but for keyboard/screen reader user's this interaction subverts their expectations and introduces friction and potentially confusion as well. Even if the keyboard commands could work together well, we're still unsure how this component would speak itself to our screen reader users. "How does our frankenstein component represent itself in the accessibiltiy tree?".

All that's to say when it comes to accessibiltiy, superficial knowledge of the elements or components you're attempting to combine or extend will only result in frustration or maybe even failure while taking some time to understand the base interaction from an accessibility standpint can help you problem solve or avoid the situation altogether.
