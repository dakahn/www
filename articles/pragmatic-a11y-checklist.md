---
layout: article-layout.njk
title: A Pragmatic Accessibility Checklist for Developers
date: 2024-01-31
tags: ["post"]
---
[updated April 2024]

_This is a pragmatic accessibility verification testing tool for working developers (and potentially designers who code). It's not 100% bullet proof or holistic, but is intended to be enough to mostly guarantee most users with impairments can access and use your website at least to some satisfactory degree. This ideally would live close to where code is submitted and even potentially a part of your pull request/merge request flow, but your mileage may vary._

--- 

The issues on this list are considered supplemental and superseded by automated accessibility testing. Prior to completing this checklist the developer should confirm that no new errors are found when scanning with the axe DevTools browser extension. Axe violations are considered Critical errors and must be addressed before merging to master.

The issues below are divided into Critical, Serious and Moderate severity tags to help with backlog prioritization, but all work should comply with each list item (or have an approved exemption) before developers merge to master. The tags can be understood in the following ways:

## Checklist

### Critical
_Critical issues represent major and insurmountable accessibility barriers for certain users. These issues can make our experiences and UI components totally unusable or impossible to understand._

1. All interactive page elements can be accessed and operated with only a keyboard

2. Focus is properly managed when modal dialogs are opened, ensuring that the keyboard focus is moved to the modal and trapped within it until closed.

3. The page is still functional when the text is magnified to 200% it's initial size

4. All page content reflows in one direction only and doesn't requiring scrolling in two directions (except where required, such as a map or data table)

5. Content or regions of the page do no trap keyboard focus

6. All form inputs have explicit labeling and are associated programmatically with all instructions using one of the following techniques:
    - Explicitely by programmatically linking label/input sibling elements with for or aria-labelledby
    - With ARIA using aria-label. 🚨Warning🚨 aria-label should only be used when there is no visible label available
    - Implicitely by wrapping the input in a <label> element
7. No visually present text or page elements have an aria-hidden attribute

8. All text on the page less than 18px in size has a contrast ratio of at least 4.5:1

9. All text on the page greater than 18px in size has a contrast ratio of at least 3:1

10. All focusable elements on the page must be in a logical* and intuitive navigation order

11. Focus is never lost or reset to the top of the page except on page reload

### Serious
_Serious issues represent time consuming accessibility barriers for certain users. These issues can result in costly user errors or make simple tasks extremely arduous and difficult often resulting in the user quitting in frustration._

1. All use of ARIA conforms to WAI-ARIA Authoring Practices Guidelines

2. Any audio and video content includes accessible alternatives (captions, transcripts)

3. Navigation mechanisms, such as menus and buttons, are consistent across the application.

4. UI components (e.g., controls), not just text, meet color contrast requirements (3:1 against background)

5. Keyboard operation should strictly adhere to established controls for native elements and their ARIA equivalents

6. Non-interactive page elements cannot receive focus with a keyboard

7. The contrast ratio of all visible focus indicators is at minimum 3:1 against adjacent colors

8. Focus indicators entirely surrounds the interactive component or sub-component

9. tabindex attributes on the page never have a positive value

10. Visual labels precisely match corresponding programmatic labels

11. Elements on the page are not repositioned out of logical order using CSS
    - If repositioning an element with CSS changes the meaning of the page or makes it more difficult to understand list item 18 is failed.

### Moderate
_Moderate issues are irritating, annoying or highly frustrating for certain users. While not barriers to access these issues represent best practices and should be followed so that our users expectations are met and ideally exceeded._

1. All decorative images have an aria-hidden attribute

2. Semantic HTML elements (e.g. `<nav>`, `<main>`, `<article>`) are used instead of ARIA when possible, to improve the structure and meaning of the page.

3. Include a "Skip to Content" link at the beginning of the page to allow keyboard users to bypass repetitive navigation and jump directly to the main content.
