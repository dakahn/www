---
layout: article-layout.njk
title: Using Intersection Observer to Improve Carousel Keyboard Usability
date: 2023-09-27
tags: ["post"]
---

A carousel is typically a `div` with a list of interactive items arranged horizontally inside of it. The `div` has `overflow: auto` set in CSS so the user can scroll through the items. Each item could have multiple interactive elements. Typically these will be links. The carousel also may include redundant scrolling controls like buttons with left and right chevrons or something like that. A poorly engineered carousel component can create many usabiltiy challenges for users across the ability spectrum. Today we're thinking about sighted keyboard users, the problems our carousels create for them and one solution for how to mitigate the damage. 

If the sighted keyboard user lucks out each item in the carousel has one single tab stop and they only have to get around one dozen or so items. If they're unlucky each item will have multiple interactive elements or carousel items load infinitely and the number of tab stops quickly balloons into the dozens or maybe infinitely. The problem compounds with multi-carousel layouts which are more common than you'd think ([here's a popular website's recipe page](https://cooking.nytimes.com/) which at the time of writing boasts 11).

Using the Intersection Observer web API we can allow the user to opt into which carousel items they want to be able to focus with their keyboard. Allowing them to more easily move past our carousels and onto other content on the page. 


## The setup: HTML and CSS
First we'll setup the bones of our carousel with some HTML:

```html
<div id="carouselWrapper" tabindex="0">
    <a href="/" class="card">
        <img src="https://placehold.co/200x200" />
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise.</p>
    </a>
    <a href="/" class="card">
        <img src="https://placehold.co/200x200" />
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise.</p>
    </a>
    <a href="/" class="card">
        <img src="https://placehold.co/200x200" />
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise.</p>
    </a>
    <a href="/" class="card">
        <img src="https://placehold.co/200x200" />
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise.</p>
    </a>
    <a href="/" class="card">
        <img src="https://placehold.co/200x200" />
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise.</p>
    </a>
    <a href="/" class="card">
        <img src="https://placehold.co/200x200" />
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise.</p>
    </a>
</div>
```

We've got a keyboard accessible `div` and a handful of "cards" which should be enough for demonstration purposes. Next, we'll apply some styling to create the core carousel interaction: 

```css
#carouselWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 25rem;
    margin: 2rem;
    overflow: auto;
    width: 70rem;
    scroll-snap-type: x mandatory;
}

.card {
    background-color: skyblue;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 20rem;
    margin: 1rem;
    padding: 0.75rem;
    scroll-snap-align: start;
    width: 15rem;
}
```

Not a lot to dig into here, but some points of interest are the set width of the `div` and the `overflow: auto` attribute which gives us the aforementioned horizontally scrolling viewport effect. One more thing to mention is we're using `scroll-snap-align: start` to make sure our focusable cards are never half in the viewport. For a more detailed explanation of scroll snap [check out this CSS Tricks article](https://css-tricks.com/practical-css-scroll-snapping/).

So at this point we have our carousel done. The viewport scrolls, cards snap into view and each card is focusable. If your carousel has 4 cards you have five tab stops in your interaction (including the overflowing `div` itself). If your carousel has 25 cards--then you have 26 tab stops etc etc. Using JavaScript and the Intersection Observer web API we can make it so that only cards currently _in view_ are focusable. Which gives a keyboard user the same level of agency and control that a mouse user would have flicking past a page's carousels brimming with uninteresting items.

## The Intersection Observer API

[There is A LOT to the Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), but getting it going is easier than it may seem at first blush. But at a high level we need three things: the element we want to "observe" for intersecting, the element(s) that will intersect the thing we're observing and a function that's called when that intersection happens. 

Let's start with some setup (just a bit) and build an options object we'll need later:

```js
let options = {
    root: document.querySelector("#carouselWrapper"),
    rootMargin: "0px",
    threshold: 0
};

function callback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.setAttribute("tabindex", "0");
        } else {
            entry.target.setAttribute("tabindex", "-1");
        }
    });
}

let observer = new IntersectionObserver(callback, options);

let targets = document.querySelectorAll(".card");
targets.forEach((target) => observer.observe(target));
```

`options` is optional and has defaults we're overriding here. `root` should point to the element we want to watch for intersections--in this case the `id` of the overflowing `div` that's our carousel viewport. `rootMargin` acts just like CSS `margin` and allows you to tell the Intersection Observer about a margin for your root element (if it has one that needs to be ignored). Threshold lets you define _how much_ intersection will fire off the callback function. 1 is all of it and 0 is _any of it_. 

Next we've got a callback function that we'll pass to our `IntersectionObserver`. The callback has two arguments that will be passed to it when it runs: the entries that you're watching and the observer itself. Then in curly braces we have something we want to happen everytime we get an intersection. Each entry will be passed to this callback everytime _an_ entry's state changes. We're concerned specifically with assigning a `tabindex` attribute of either `0` (for focusable) or `-1` (for unfocusable) depending on if `isIntersecting` is coming back true or false.

Then we create a new instance of IntersectionObserver and pass that function the callback and options we've just setup. Then finally we query for our cards and use a forEach loop to define those cards as potential targets for intersection.

[Link to working CodePen example](https://codepen.io/dakahn/pen/rNodvvK?editors=1010)
