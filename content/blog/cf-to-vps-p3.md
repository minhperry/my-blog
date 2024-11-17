---
date: '2024-10-24T22:06:03+02:00'
draft: true
tags: ['linux', 'english']
title: 'Part 3: Convert Angular to SSR'
series: 'Migrating from Cloudflare Pages to VPS'
---
It is very shrimple. Angular has a guide [here](https://angular.dev/guide/ssr).
<!--more-->
Angular will create some files. If you see any conflicts, like in my case i got some conflict between something like `@angular/profile-browser` and `@angular/profile-server`, then just [update your dependencies](https://angular.dev/cli/update).

```bash {filename="bash"}
ng update @angular/cli @angular/core [...]
```
But then something broke... Some routes weren't being pre-rendered, keep timing out continuosly.

By default, with CSR, there's this predefined `setInterval`:

```ts
declare function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
```
Like I explained in Part 1, the pre-render is being handled on the server. So, this code must be server-side compatible and Node defaults this function to return a **`NodeJS.Timeout`** type instead! So pretty much all of