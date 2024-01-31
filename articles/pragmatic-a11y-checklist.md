---
layout: article-layout.njk
title: A Pragmatic Accessibility Checklist for Developers
date: 2024-01-31
tags: ["post"]
---

This is a pragmatic accessibility verification checklist for working developers (and potentially designers who code). It's not 100% bullet proof or holistic, but should be enough to ensure most users with impairments can access and use your website, webpage, component, whatever.

The issues below are divided into three severity tags to help with backlog prioritization. The tags can be understood in the following ways:

-   [Severity 1] issues represent major and insurmountable accessibility barriers for certain users. These issues can make our experiences and UI components totally unusable or impossible to understand.

-   [Severity 2] issues represent time consuming accessibility barriers for certain users. These issues can result in costly user errors or make simple tasks extremely arduous and difficult often resulting in the user quitting in frustration.

-   [Severity 3] issues are irritating, annoying or highly frustrating for certain users. While not barriers to access these issues represent best practices and should be followed so that our users expectations are met and ideally exceeded.

## The Checklist

1. [Severity 1] All interactive page elements can be accessed and operated with only a keyboard

2. [Severity 1] The page is still functional when the text is magnified to 200% it's initial size

3. [Severity 1] All page content reflows in one direction only and doesn't requiring scrolling in two directions (except where required, such as a map or data table)

4. [Severity 1] Content or regions of the page do no trap keyboard focus

5. [Severity 1] All form inputs have explicit labeling and are associated programmatically with all instructions using one of the following techniques:

    - Implicitly by programmatically linking label/input sibling elements with the `for` attribute.

    - With ARIA using `aria-labelledby` or `aria-label`. 🚨Warning🚨 aria-label should only be used when there is no visible label available

6. [Severity 1] No visually present text or page elements have an aria-hidden attribute

7. [Severity 1] All text on the page less than 18px in size has a contrast ratio of at least 4.5:1

8. [Severity 1] All text on the page greater than 18px in size has a contrast ratio of at least 3:1

9. [Severity 1] All focusable elements on the page must be in a logical\* and intuitive navigation order. 'Logical' here means left to right and top to bottom, but should be adjusted for other regions without that reading order.

10. [Severity 1] Focus is never lost or reset to the top of the page except on page reload

11. [Severity 2] All use of ARIA conforms to WAI-ARIA Authoring Practices Guidelines

12. [Severity 2] Keyboard operation should strictly adhere to established controls for native elements and their ARIA equivalents

13. [Severity 2] Non-interactive page elements cannot receive focus with a keyboard

14. [Severity 2] The contrast ratio of all visible focus indicators is at minimum 3:1 against adjacent colors

15. [Severity 2] Focus indicators entirely surrounds the interactive component or sub-component

16. [Severity 2] tabindex attributes on the page never have a positive value

17. [Severity 2] Visual labels precisely match corresponding programmatic labels

18. [Severity 2] Elements on the page are not repositioned out of logical order using CSS. If repositioning an element with CSS changes the meaning of the page or makes it more difficult to understand list item 18 is failed.

19. [Severity 3] All decorative images have an aria-hidden attribute
