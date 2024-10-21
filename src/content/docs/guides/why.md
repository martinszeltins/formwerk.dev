---
title: Why Formwerk?
description: Why we think you should choose Formwerk over other form libraries.
---

### A Balance of Abstraction and Control

Forms are a crucial part of web applications and they are one of the first things you learn as a web developer. Unfortunately, forms are hard.

There are too many expectations today on what forms should offer: data collection is non-negotiable, validation is nice to have, delightful interaction is desired and accessibility is a must that gets overlooked.

The web already offers a solid foundation on many of these aspects, but it falls short when it comes to using it in modern web applications due to the ever increasing complexity in how we build our applications.

With many libraries to choose from, there isn't a one-size-fits-all solution. In the Vue ecosystem we have a couple of schools of thought on how to build forms:

- **Headless Implementations:** They offer composables to help you handle some aspects of form building, like validation, and leave the rest up to you.
- **UI Libraries:** Whether or not they focus on forms, UI libraries often tick all of the feature boxes mentioned above and more. But they can force you into a "reward early, punish later" kind of situation. UI libraries are usually opinionated on their style and brand and even if you can override or customize them, they are opinionated on the markup which limits your ability to style them.

Both approaches try to balance two important aspects: Abstraction and Control. You lose control when you abstract too much, and you lose function when you don't abstract enough.

Formwerk is different. We took a look at both approaches and found there yet exists a gap in the middle where a different balance of abstraction and control can be achieved.

We don't want the developer to write too much code with low-level abstraction, nor did we want them to fight a losing battle against styles and markup.

### What are you getting

Formwerk offers a different approach to building forms. It offers a set of composables that help you build specific form components in a way that you are in full control over every aspect.

Each composable offers:

- First class accessibility support.
- An adaptive API that adapts to the way you like to build forms, hidden labels but still want the field accessible? We got you covered.
- Value tracking and collection, even with non-input elements.
- Behavior and user interaction via keyboard that adheres to each component's native HTML counterpart standard. Custom checkboxes behave exactly the same like native checkboxes.
- Multi-level form validation with native HTML constraints and custom validation schemas with popular libraries like Yup and Zod.
- First class internationalization and RTL support.
- A consistent API for both simple and complex form components.

We don't intend to do everything, but rather we want to offer a solid foundation that helps you build high quality forms that are both accessible and delightful to use.

That means there is no UI, no styles, no markup. That's up to you to build. That means you can use Tailwind, CSS, or whatever you like.

### Who is Formwerk for?

Formwerk is for builders who want to build design systems from scratch, and want to have a solid foundational baseline, so that they can focus on the business logic and the brand design for many years to come.

Formwerk is also for UI library developers who want to offer a solid offering of form components to their users. So they can focus on their main offering, a delightful UI.

Formwerk is not for:

- Those who use existing UI libraries.
- Those who are looking to prototype fast. Building with Formwerk is fast, but not as fast as using a UI library.

## Why not ....?

All those libraries are excellent at what they do and you won't go wrong with any of them, assuming you understand the trade-offs.

### vee-validate

I'm the author of vee-validate and I'm proud of what we've built there for 6 years now. It's a great library that does a few things well.

However I consider it to be a bit low-level for building form components. There is still a lot of stuff you still have to implement yourself.

Formwerk is an attempt to offer a more complete solution for building forms by stepping up the abstraction level. Formwerk takes a lot of key learnings from vee-validate and applies them broadly to form building.

### vuelidate

A great option for form validation. But out of all the options available, it is one with the lowest level of abstraction.

This means you have control over every other aspect. Albeit by omission rather than design, this means you have to implement everything except the validation.

### FormKit

> FormKit is more than a UI library. It is comprehensive with a lot of features and great developer experience.

However, it has the same problems as other UI libraries. No matter how much you can configure or override by slots or props, you are one design away from considering a re-write.

Formwerk doesn't offer as much in terms of UI, actually it doesn't offer any UI. But everything else? It has you covered. You build your own UI with CSS or Tailwind or that cool new thing you found on twitter last week. There is nothing to override, nothing to configure.
