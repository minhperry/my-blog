---
title: "From Hugo to Astro"
pubDatetime: 2025-07-18T23:30:00+01:00
modDatetime: 2025-07-18T23:44:56Z
featured: false
draft: false
tags:
  - astro
  - hugo
  - static-site
  - webdev
  - migration
  - english
description: "From Hugo to Astro"
author: "minhperry"
---

## Why?

If you've ever noticed, the old blog post was written in Hugo. However, besides easy static site gen with Markdown, the customization is pretty meh.

Yesterday I discovered [Astro](https://astro.build/), which is more of a framework than a SSG like Hugo. It's more like an extension of Hugo with a lot of better aspects.

## What made Astro special?

1. It supports many popular frameworks out of the box: React, Preact, Vue, Svelte, etc, plus the Astro template itself is pretty similar to React/Svelte too. Though I'm an Angular guy. Angular support however can be done with an [Analog plugin](https://analogjs.org/docs/packages/astro-angular/overview).

2. It is something in-between: Not really a fully JS/TS framework, but also not really a SSG either. An app consists of pure static HTML and Astro "islands", which are interactive fragments that are hydrated with JS. This makes Astro somewhat a partial hydrated framework.

## The migration

It's pretty simple. Both accept Markdown syntax, so the only thing I need to do is to just copy the posts over. Voilà, done! It's just as simple as eating some phở.
