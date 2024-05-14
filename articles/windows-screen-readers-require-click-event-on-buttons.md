---
layout: article-layout.njk
title: Windows screen readers require onClick event listeners on buttons to
  activate in Browse mode
date: 2024-05-13
tags: ["post"]
---

## The background

We recently rolled out changes to our site navigation in an effort to remove a
frustrating usability barrier for our keyboard users. Previously for users
inside the navigation landmark we required
them to slog through every top level, secondary and tertiary menu item before
moving _past_ the navigation and onto the page's main content. A refactor of the navigation was undertaken adding a menu-button interaction to the sub and sub-sub menus making them opt-in.

In our internal accessibility verification testing the interaction worked as
expected on Safari/Chrome/Firefox on macOS, but on Windows 11 it was discovered
that our Button component's were not responding as expected to <kbd>Enter</kbd>
key presses and the NVDA user was required to enter Focus (or Forms mode in
JAWS) mode by using <kbd>Ctrl/Shift</kbd>+<kbd>Enter</kbd> in order to operate
the button and open the disclosure. Not understanding fully _why_ we were
encountering this behavior and assumption was made that perhaps Windows screen
reader users expected to have to manually invoke Forms/Focus mode to operate
_some_ buttons.

External user testing with a screen reader user invalidated this assumption and confirmed we had a problem. The user was on Windows 11 using a latest (at the time of writing) build of NVDA. During testing our user was asked to navigate to a menu item fairly deep inside
the menu. They'd have to operate the menu button and then down and into the menu
itself to complete the task. When the menu-button received reading focus they
attempted to operate with the raw--as in with no modifier--<kbd>Enter</kbd> key and heard no feedback. They gave us the benefit of the doubt and assumed the menu had opened and that simply the _state_ wasn't being communicated via ARIA, but that wasn't the case. The menu was not opening since the keypress wasn't being registered.

## The problem or: it's a feature not a bug but also there's a bug

[The culprit it seems](https://github.com/nvaccess/nvda/issues/7898#issuecomment-529384975) was _our code_ (isn't that always the case? :)). Or more specifically a combination of default Windows screen reader behavior and our JavaScript Button's lack of a `onClick` event handler. Windows screen readers are _modal_ selectively passing some commands through to the browser and intercepting others for reader specific actions. Which ones they intercept and pass through depends on the mode. [Here's an excellent primer on the behavior i'm hinting at by Léonie Watson](https://tink.uk/understanding-screen-reader-interaction-modes/), but to summarize the issue: while in Browse mode NVDA is registering the <kbd>Enter</kbd> key press and looking for an 'onClick' event listener to subsequently pass a click event to, but ours didn't have one--the developer had opted for an `onKeyDown` event listener instead for some reason--and so logically nothing was happening. Swapping the `onKeyDown` event for an `onClick` fixed the bug.

The reason the action could still be performed with the <kbd>Ctrl</kbd> modifier
plus <kbd>Enter</kbd> is because adding the modifier forces the screen reader
into Focus/Forms mode (for NVDA/JAWS respectively) which passes _all keypresses_
onto the browser. Think of this mode like typing a paragraph or two into a textbox. You wouldn't
want an <kbd>Enter</kbd> keypress to send the form off to the server. You probably want a
newline and to be able to continue typing.

Moving forward all Button components will require an `onClick` event listener by
default.
