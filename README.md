# Versatile Core Component (Style) Guidelines

This revolves around style or CSS guidelines.

A "core component" or element is one that is intended to be repeatedly reused within arbitrary contexts. In order to meet the UI needs in as many contexts as possible, _the styling of the component must be easily extensible_.

Other non-core, one-off, or single-use components don't necessarily need to be as flexible as this guide promotes, though it's never a bad thing to get in some extra practice and make them so anyway.

# Terminology

-   **Component**: scoped, composable building blocks in native JS, Angular, React, and other frameworks.
-   **Consumer**: whatever uses the component, most likely a "parent" component; any place where the core component is instantiated in HTML.
-   **Component selector**: the tag name used in HTML, like `<div>` or `<my-component>` (but not including the angle brackets). This is defined when you register your component (the exact process and syntax for which varies by framework).
-   **Host**: the root scope in the component's HTML template; the component itself. Styled in CSS with `:host`.

# Core Component Key Principles

-   The component should be responsive and open to different consumer styling.
-   The component should properly separate responsibilities between CSS, HTML, and JS.

# How to Accomplish the Key Principles

While this is not an exhaustive guide, following these guidelines will dramatically improve the reusability of a core component:

-   Default CSS properties, especially sizing properties (height, width, padding), should be defined on the `:host` selector.
-   Use `:host()` classes for standard style variations
    -   Do not try to use `:host()` classes for _every_ style variation.
    -   Style one-off component uses in the consumer, not with `:host()` classes.
-   Prefix `:host()` class names with the component selector.
-   Internals or children should inherit styles, as much as possible, from the host.
-   Internals or children should be responsive to the host at any size.
-   No JS inputs that are CSS values or properties or class names.
    -   Solutions to this include [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) or [host-context](<https://developer.mozilla.org/en-US/docs/Web/CSS/:host-context()>).
-   When complex and highly variable internals are possible (and desired), just use `slot` or `ng-content` (or whatever your framework's equivalent is).
    -   When this is not the case, prefer using simple JS inputs (such as a string or number) instead.
-   Avoid unnecessary children wrapper elements (like `<div>`). Utilize the component host itself (which is a wrapper of sorts already) as much as possible.
-   Do not define margins on `:host`. There should be no extra whitespace outside of the component at all. (Consumers should define spacing.)
-   Padding, if required, should be defined on the host and inherited if possible (this one is tricky and thus is a loose guideline).

**tl;dr:** put as many styles as possible on the component host.

# Quick Example

For more explanation and context, read the [Motivational Example](#motivational-example) section instead.

## Bad Component

-   Component definition: [banner-bad.element.js](./banner-bad.element.js)
-   Trying to use: https://codepen.io/electrovir/pen/bGdLxLZ?editors=0100

## Good Component

-   Follows guidelines
-   [Pull request with changes](https://github.com/electrovir/core-component-guidelines/pull/1/files?diff=unified&w=1)
-   Component definition: [banner-good.element.js](./banner-good.element.js)
-   Usage: https://codepen.io/electrovir/pen/LYVQgPd?editors=0100

## Better Component

-   Adds supported style variations
-   [Pull request with changes](https://github.com/electrovir/core-component-guidelines/pull/2/files?diff=unified&w=1)
-   Component definition: [banner-better.element.js](./banner-better.element.js)
-   Usage: https://codepen.io/electrovir/pen/BaNYqKB?editors=1100

# Motivational Example

The following example is a simplified version of a real life, in use, production code component which did not follow these guidelines. For simplicity's sake, this example will be defined and used as a native custom web component (though originally it was in Angular). Focus on the HTML and CSS, not the other implementation details.

## Deviant Component

Say you've been tasked with using an already-built component that's used for showing users notifications of some sort. You've been tasked with using this in a context which is slightly different than what the component was built for so you need to modify the styles a bit.

The component in question is defined in the file [banner-bad.element.js](./banner-bad.element.js). An attempt at reusing this component is shown in this CodePen: https://codepen.io/electrovir/pen/bGdLxLZ?editors=0100.

Try playing around with the styles on CodePen for a bit. It's a mess! You can't do anything! Some styles do worse than not working, they do crazy unexpected things. (Note that, as always, there are multiple solutions to this problem. I'm sure there is a way to make something sort of work here. Do you really want to deal with that every time you use this component though?)

### Guideline Violations

The reason why this component is hard to use is because it doesn't follow the guidelines. While the list of violations is relatively short, they make it nearly impossible to use. Specifically, the violations are the following:

-   It has an unnecessary wrapper element (`div.banner`)
-   Styles aren't applied on `:host`

## Reusable Component

It is relatively easy to fix this component and make it more reusable. Really all that needs to happen is to fix the guideline violations above. [This PR](https://github.com/electrovir/core-component-guidelines/pull/1/files?diff=unified&w=1) shows how to make these changes. This new component definition is in the file [banner-good.element.js](./banner-good.element.js).

Now it's much easier to use! You can alter styles without completely breaking the component. This new component in use on CodePen with the same styles as before here: https://codepen.io/electrovir/pen/LYVQgPd?editors=0100.

The majority of these style changes work well because now the default styles are on `:host` and can be overridden in the consumer. This, for example, is what's happening when `border-color` is changed in the CodePen above. You may also notice that the original component was actually following _some_ guidelines, such as "Internals or children should be responsive to the host at any size" with `flex-grow: 1` on `.banner-message`.

Of course, there are still some holes, like the inability to style the icon's color from the consumer. There are ways to solve this, but you probably have an icon infrastructure already that can do that (or hopefully you do). CSS custom properties or `host-context` can also solve this but that won't be covered here.

## Supported Default Styles

While it's best to support direct style changes in the consumer as much as possible, further improvements can be made here by adding some supported style variations. [This PR](https://github.com/electrovir/core-component-guidelines/pull/2/files?diff=unified&w=1) adds some of these. The classes are simple and few in number. This allows some style reuse without attempting to support all style variations (which is impossible, there will always be more).

These added class names are all prefixed with the component's selector, `my-component`, per the "Prefix `:host()` class names with the component selector" guideline. Because of this, it is extremely easy to know that this class comes from the component's internal styles, not from consumer's styles.

See the different variations in use on CodePen here: https://codepen.io/electrovir/pen/BaNYqKB?editors=1100.
