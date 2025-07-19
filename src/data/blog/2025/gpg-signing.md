---
title: "My first experience with GPG signing"
pubDatetime: 2025-07-20T10:00:00+01:00
modDatetime: 2025-07-20T10:00:00+01:00
featured: false
draft: false
tags:
  - security
  - gpg
  - cryptography
  - git
  - digital-signature
  - english
description: "GPG keys are actually pretty cool, and I'm glad I finally got to use them."
author: "minhperry"
---

## Table of contents

## What is it?

Recently, I have discovered something that I think is pretty cool. It's called GPG signing. Using some "magical ahh crypto" stuff, you can basically put your digital signature on things. It's like signing a check, but for your code commits. It proves that you actually wrote that code and nobody messed with it after you did.

## Why should you care?

Ok but "my commits already have my info! what's the big deal??". Well, you're too innocent - anyone can put your name on a commit and Git can't really tell the difference.

When you sign your commits with GPG, you're basically saying:

1. **"This is really me"** - No one can fake your commits
2. **"Nobody messed with this code"** - The signature proves it's exactly what you wrote
3. **"I'm a real person"** - Your GPG key is tied to your actual identity

## How to set it up?

It's fairly simple, easy and straight forward.

### Step 1: Make Your First GPG Key

First, you need to create a GPG key pair:

```bash
gpg --full-generate-key
```

Just hit enter for all the defaults (RSA and RSA, 3072 bits, no expiration). Though I suggest a medium expiry like 2-5 years, or even longer like 10 years if you're feeling paranoid.

A passphrase is optional, but I suggest using one. It's a good way to protect your key in case it's leaked somehow. I then store both the passphrase and my priv key in Bitwarden.

### Step 2: Tell Git About Your Key

Now you need to find your key ID and tell Git to use it:

```bash
gpg --list-secret-keys --keyid-format=long
```

Look for a line that says something like `sec   rsa3072/ABC123DEF456 2025-01-20`. That `ABC123DEF456` part is your key ID.

Now tell Git to use it:

```bash
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

Does not have to be global, you can set it to the current repository if you can manage all the keys for every repository you have.

### Step 3: Show Off Your Key

You need to add your public key to GitHub/GitLab so they know it's really you:

```bash
gpg --armor --export YOUR_KEY_ID
```

Copy all that output (including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` parts) and paste it into your GitHub/GitLab account settings.

Hell, you can even just share the public key anywhere. You can find mine in the [about section](/about).

### Step 4: Test it

```bash
git commit -m "test commit"
```

## Common issues

### gpg: signing failed: Inappropriate ioctl for device

This happens when GPG can't access your terminal for the passphrase. Fix it with:

```bash file=~/.zshrc
export GPG_TTY=$(tty)
```

### error: gpg failed to sign the data

Usually means your key isn't set up right. Check:

- Your key ID is correct
- Git is configured properly
- GPG agent is running

Especially when you are running WSL on VSCode or any of the AI VSC forks, and is commiting purely with the UIs, then you want to set it up like this:

This one tell Git to always sign the commits:

```bash
git config --global commit.gpgsign true
```

This one tells git to use a certain GPG agent:

```bash
git config --global gpg.program gpg
```

Then create a GPG agent config file:

```ini file=~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-curses # or wherever your pinentry is installed, use `which pinentry` to find it
# Optionally:
# Set the cache so that you don't have to type the passphrase every time. Numbers in seconds.
default-cache-ttl 3600
max-cache-ttl 7200
# Allow the agent to be used by other programs.
allow-loopback-pinentry
```

And then in the GPG config itself:

```ini file=~/.gnupg/gpg.conf
use-agent
```

This tells GPG to use the agent for passphrase input instead of prompting every time.

Finally, restart the GPG agent:

```bash
gpgconf --kill gpg-agent && gpg-agent --daemon
```

### gpg: no default secret key

You haven't set a default signing key. Fix it:

```bash
git config --global user.signingkey YOUR_KEY_ID
```

## External resources

- [GPG Official Docs](https://gnupg.org/documentation/) - The source of truth
- [GitHub GPG Docs](https://docs.github.com/en/authentication/managing-commit-signature-verification) - GitHub-specific stuff
- [GPG Best Practices](https://riseup.net/en/security/message-security/openpgp/best-practices) - The good stuff
