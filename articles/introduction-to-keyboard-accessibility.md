---
layout: article-layout.njk
title: An Introduction to Keyboard Accessibility on the Web
date: 2020-08-14
tags: ["post"]
---

This is a living resource for some general (mostly high level) keyboard accessibility guidance. It's to be added to and amended over time and will generally remain a work in progress.

## What should be tabbable?

If an element on the page can be interacted with using a mouse in some way, it should be a tab stop on the page. To make an element a tab stop you give it the attribute and value `tabindex="0"`. There are a few notable exceptions to this rule -- [data grid cells](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/dataGrids.html) come to mind, but generally don't make something a tab stop if the user can't _do anything with it_.

## So what about arrow keys?

In general arrow keys come into play when you're manipulating controls _within a component_. For example we hit `tab` which focuses [our list box component](https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html) then pressing `down arrow` opens the list box so the user can make a selection. Similarly in a group of radio buttons you'd tab to the group and use arrow keys to make your selection.

## What about navigation menu's?

This is a [big gnarly controversial subject](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html) that I'm going to write about more fully at a later time, but in 2020 using `role="menu"` in your site navigation is an anti-pattern. If you remove styling and think about the core interaction and its primitive elements. A site navigation is an unordered list of links. If we apply the above rule regarding what should be a tab stop on the page here -- an anchor clearly fits that bill nicely. Each link (hopefully) or button (bummer) should be reachable via tab.
