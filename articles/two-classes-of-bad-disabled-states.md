---
layout: article-layout.njk
title: Two classes of disabled states (and they're both bad)
date: 2023-11-13
tags: ["post"]
---

Yeah so to start this I want to say that disabled states in general are an anti-pattern. An actively harmful design decision with various tenuous justifications that don't solve the problem they're supposed to and create friction and usability issues at best and are full blown inaccessible at worst. At a high level disabled elements are a frustrating dead end that requires your users to seek out a way of removing them from the page.

That said they're everywhere and people have been writing about how bad an idea they are for about as long as they've been around, but unlike placeholder text in lieu of visible labels they persist in broadly two categories (one talked about _very_ often and one not so much):

1. A disabled state communicating an error

Justification: we don't want the user to waste a click/trip to the server and return an error they have to fix (??? this seems to be the most oft-cited reasoning at least; there could be others).

For sighted users it's too subtle and inefficient necessitating easy to miss inline error messaging anyway trading one frustration for another (not totally down to design. Users can't know website to website when their form will be validated) and for screen reader users it requires a highly illogical solution to be accessible--allowing a disabled element to receive focus--which potentially degrades sighted keyboard user's experience. When folks write about disabled form elements being problematic this case is usually what they're referring to.

2. A disabled state acting as a funnel

Justification: this allows the user to explore options, configurations--sometimes It's potentially a marketing tactic with lower stakes as part of a 'funnel'

This is a little harder to visualize, but we're in probably an ecommerce situation and we have a disabled form element that communicates that some previous choice a user's made has resulted in the disabled choice being invalid. So in this case we're not necessarily thinking of a user whose spent some amount of time carefully (or not so carefully) filling out a form being unable to continue until they correct some error. This use case has "legitimate" (but still wrong) business justifications but still will fail to clearly communicate it's intentions without further (and maybe further still) labellling, messaging etc.

for example it would seem like messaging in plain text in close proximity to the disabled element is the way to go: "Server size options are unavailable when configuring a serverless framework" or something.
