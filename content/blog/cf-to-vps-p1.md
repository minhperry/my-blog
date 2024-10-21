---
date: '2024-10-20T04:45:55+02:00'
draft: false
tags: ['linux', 'english']
title: 'Part 1: Why the migration?'
series: 'Migrating from Cloudflare Pages to VPS'
---
A brief introduction to why I made the change.
<!--more-->

## What is Cloudflare Pages?
Similar to GitHub Pages, [Cloudflare Pages](https://pages.cloudflare.com/) is a free platform for hosting static websites, offering automatic build and deployment every time you push changes to your GitHub repository. What sets Cloudflare apart is its use of a CDN (Content Delivery Network), which ensures your site is served from the server closest to the user, making it incredibly fast.

To put it simply: Imagine you’re in Australia. If your website is hosted in the USA, the data has to travel across the ocean and back, which can slow things down. With Cloudflare’s CDN, your website is copied to servers in Australia or New Zealand, so the data travels a much shorter distance, improving speed.

In addition to speed, Cloudflare Pages offers other benefits, like a free SSL certificate for HTTPS and distributed traffic handling to reduce downtime. Though it’s not like my site is getting millions of visits a day anyway.

## But why the switch?

At the moment, I have two Angular apps deployed on Cloudflare Pages. However, as mentioned earlier, Pages only support static websites. This means the project must already be built, and Cloudflare's job is simply to serve the final result. This process is known as **Client-Side Rendering** (CSR): when a user requests a website, the server sends the HTML along with links to the necessary JavaScript and CSS. The user’s browser then fetches and executes these files, with most of the work being done on the client side. This allows for less work load on the server, while also making the UI way more responsive and fluid.

While CSR works well for static sites, it has limitations and flaws when it comes to dynamic content. For example, if I want to share my website with some preview, which heavily depends on [OpenGraphProtocol](https://ogp.me/), I can only define the metadata once in the `<head>`er for the whole website and that's it. No more custom metadata for deeper routes. And since Discord, Twitter or other social medias generate previews by requesting the website on their server but not actually rendering it, they will only see the original HTML data with that original OPG metadata. This also hurts **Search Engine Optimization** ([SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)), where Google does the same thing, by only requesting HTML and not executing JS, thus not being able to see any additional contents.

**Server Side Rendering** (SSR) shifts much of the rendering workload to the server. In this approach, the server generates the complete HTML content before sending it to the user's browser. This means that when a user requests a page, they receive fully rendered HTML along with the necessary styles, ensuring that the content is immediately available without waiting for JavaScript to load and execute. SSR enhances user experience by providing faster initial load times and better performance, as users can view the page content right away. Additionally, since search engines can crawl and index the pre-rendered HTML, this method significantly improves SEO, making it easier for users to discover your site through search results.

By migrating to a VPS, I can leverage SSR for my Angular apps, allowing me to:

- Serve dynamic content based on user requests.
- Improve SEO and ensure proper Open Graph tag handling.
- Have more flexibility over server-side features, like database integration or custom back-end logic.

This flexibility and control over server-side rendering is a key reason I’m making the transition from Cloudflare Pages to a VPS.

