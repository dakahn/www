---
layout: article-layout.njk
title: Windows screen readers require onClick event listeners on buttons to
  activate in Browse mode
date: 2024-05-13
tags: ["post"]
---

## The background

Recently the company I work for launched changes to it's site top level navigation in an effort to remove a
frustrating usability barrier for their keyboard users. Previously for users
inside the main navigation landmark we required
them to slog through every top level, secondary and tertiary menu item before
moving _past_ the navigation and onto the page's main content. A refactor of the navigation was undertaken adding a menu-button interaction to the sub and sub-sub menus making them opt-in.

In our internal accessibility verification testing the interaction worked as
expected on Safari/Chrome/Firefox on macOS, but on Windows 11 it was discovered
that our Button components were not responding to <kbd>Enter</kbd>
key presses. The NVDA user was required to enter Focus (or Forms mode in
JAWS) mode by using <kbd>Ctrl/Shift</kbd>+<kbd>Enter</kbd> in order to operate
the button and open the menu. Not understanding fully _why_ this was happening at the time an assumption was made that perhaps Windows screen
reader users expected to have to manually invoke Forms/Focus mode to operate
_some_ buttons.

External user testing with a screen reader user totally invalidated this assumption and confirmed we had a major problem. The user was on Windows 11 using a latest (at the time of writing) build of NVDA. During testing our user was asked to navigate to a menu item fairly deep inside
the menu. They'd have to operate the menu button and then down and into the menu
itself to complete the task. When the menu-button received reading focus they
attempted to operate with the raw--as in with no modifier--<kbd>Enter</kbd> key and heard no feedback. They gave us the benefit of the doubt and assumed the menu had opened and that simply the _state_ wasn't being communicated via ARIA, but that wasn't the case. The menu was not opening since the keypress wasn't being registered.

## The problem or: it's a feature not a bug but also there's a bug

[The culprit it seems](https://github.com/nvaccess/nvda/issues/7898#issuecomment-529384975)\* was _our code_ (isn't that always the case? :)). Or more specifically a combination of default Windows screen reader behavior and our JavaScript Button's lack of a `onClick` event handler. Windows screen readers are _modal_ selectively passing some commands through to the browser and intercepting others for reader specific actions. Which ones they intercept and pass through depends on the mode. [Here's an excellent primer on the behavior i'm hinting at by Léonie Watson](https://tink.uk/understanding-screen-reader-interaction-modes/), but to summarize the issue: while in Browse mode NVDA is registering the <kbd>Enter</kbd> key press and looking for an 'onClick' event listener to subsequently pass a click event to, but ours didn't have one--the developer had opted for an `onKeyDown` event listener instead for some reason--and so logically nothing was happening. Swapping the `onKeyDown` event for an `onClick` fixed the bug.

The reason the action could still be performed with the <kbd>Ctrl</kbd> modifier
plus <kbd>Enter</kbd> is because adding the modifier forces the screen reader
into Focus/Forms mode (for NVDA/JAWS respectively) which passes _all keypresses_
onto the browser. Think of this mode like typing a paragraph or two into a textbox. You wouldn't
want an <kbd>Enter</kbd> keypress to send the form off to the server. You probably want a
newline and to be able to continue typing.

There is way more depth and nuance to
how these modes interplay and when they are and aren't activated I wont detail
here, but [here's some further reading by the ADG](https://www.accessibility-developer-guide.com/knowledge/screen-readers/desktop/browse-focus-modes/) that describes those interactions much more in depth as well as the distinction between basic and complex interactions which you need to wrap your head around if you're going to fully conceptualize what's going on here.

Moving forward all Button components will require an `onClick` event listener by
default.

_\* a user in this Github thread suggests that the developer could utilize
`role="application"` to have all keypresses passed through like Focus or Forms
mode, but this is a pretty bad idea because while it would fix the bug, any and all other keyboard functionality
would have to be fully re-implemented in JavaScript--for example tabbing between
interactive elements inside the `role="application"` container._

## TLDR

Windows screen readers send a synthetic click event to the browser to activate buttons. They do not send a keypress of anykind by default (but will in Forms/Focus mode). So if your button doesn’t have an `onClick` event listener it will be essentially inoperable. This differs from macOS screen reader which send both events. The reason this is interesting is because it seems to be completely undocumented behavior. there are likely countless buttons in JS and non-JS based websites all over the web that are totally inaccessible to Windows screen reader users for this exact reason. 
