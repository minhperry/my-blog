---
title: "Migrate from Nginx to Caddy"
pubDatetime: 2025-07-24T00:45:00+01:00
featured: true
draft: false
tags:
  - caddy
  - nginx
  - migration
  - english
description: "Nginx is cool, but the syntax just puts me off..."
author: "minhperry"
---

If you have read [my first post](/posts/2024/cf-to-vps-p2), you can see that Nginx syntax is very long, verbose and complicated:

- You have to auto redirect HTTP:80 to HTTPS:443.
- You need to define a block for each subdomain.
- You also need to configure SSL certificates for each subdomain.
- Blocks for reverse proxy is an absolute header mess.
- And many more...

Thus, I decided to migrate to Caddy.

## The best of Caddy

Caddy uses the main default config `/etc/caddy/Caddyfile`, with very simple syntax:

```caddyfile file=/etc/caddy/Caddyfile
subdomain.minhperry.de {
    root * /path/to/index
    file_server
    try_files {path} {path}/ /index.html
}
```

Just 3 lines for a single subdomain, comparing to 8-10 lines for Nginx. Works well with SPAs too.

And when it comes to reverse proxy, it's just a single line:

```caddyfile file=/etc/caddy/Caddyfile
subdomain.minhperry.de {
    reverse_proxy http://localhost:8080
}
```

The process is as simple as that. You can read more about Caddy syntax [here](https://caddyserver.com/docs/caddyfile).
