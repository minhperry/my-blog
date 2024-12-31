---
date: '2024-12-31T00:25:37+01:00'
draft: false
title: 'Every Color'
tags: ['react', 'frontend', 'webdev']
---
You may know [Nolen](https://x.com/itseieio), also known as eieio, for his [everyuuid.com](https://everyuuid.com) website. But, what if the UUID were colors instead?

<!--more-->

<h3> >>> <a href="https://every-color.minhperry.de">every-color.minhperry.de</a> <<< </h3>

# The beninging

On the beginning of December, [Nolen / eieio](https://x.com/itseieio), created a website that lists all available UUID. With how UUIDs are defined, there are almost 2<sup>122</sup> (or 5 &times; 10<sup>36</sup>) available ones (five undecillion, or five trillion trillion trillion). 

In his [blog post](https://eieio.games/blog/writing-down-every-uuid/), he went through all the challenges to create this. Here's a tldr:

- Only render what can be seen, instead of rendering all and clipping it (browser definitely won't like that much amount of divs). Instead only render what can be seen, which means viewed UUIDs are generated on the fly.
- Virtual scrolling: Since only fixed amount of divs are rendered, he has to handle all the scrolling manually.
- Sequential ordering of UUIDs is boring, so he added some randomness to it with a [bijective function](https://en.wikipedia.org/wiki/Bijection). One index is mapped to one and exactly one UUID, and vice versa.
- Searching is done by generating valid UUIDs from search patterns and selecting the closest match to the current position.

He also posted [a thread of him summarizing the process](https://x.com/itseieio/status/1865087304877982037).

# The sequel

A few days ago, on 29th December, [solst/ICE](https://x.com/IceSolst) posted their version at [every-ssn.com](https://every-ssn.com/) with their take on it. Instead of UUIDs, it's the list of all SSN (Social Security Number).

# My take

Inspired by both projects, I decided to forked Nolen's project and modify it to my own takes. 

My idea started with the [RGBA color model](https://en.wikipedia.org/wiki/RGBA_color_model). With 8 bits for each channel, the whole color can fit inside a 32-bit integer. There are 2 types of the model: RGBA32 where Alpha is the last significant byte, and ARGB32 with Alpha being the most significant byte. With [RGBA being W3C standard](https://www.w3.org/TR/css-color-4/#hex-notation), I decided to go with it.

I was more familiar with Angular more than React and its state things, so it was a challenge for me at first. However, after a little bit of learning, plus being familiar with component-based framework, I managed to get the first version of my website on and working.

{{< image src="/images/firstver.png" alt="First version" >}}

But again, sequential incremental is boring ahh. So [I asked Claude](https://claude.ai/chat/86af0c41-4302-4ab4-99da-8a3e257fbc9e) for a bijective function of Index to RGBA, which involves reversible logical operators like `XOR` and rotations.

~~~python {filename="rgba-number.py"}
def number_to_rgba(n):    
    # Constants for mixing (these are carefully chosen prime numbers)
    PRIME1 = 2654435761  # Knuth's multiplicative hash constant
    PRIME2 = 2246822519
    PRIME3 = 3266489917
    PRIME4 = 668265263
    
    def rotate_left(x, r):
        return ((x << r) | (x >> (32 - r))) & 0xFFFFFFFF
    
    # Apply reversible transformations
    x = n
    x = x ^ PRIME1
    x = rotate_left(x, 13)
    x = x * PRIME2 & 0xFFFFFFFF
    x = rotate_left(x, 17)
    x = x ^ PRIME3
    x = rotate_left(x, 5)
    x = x * PRIME4 & 0xFFFFFFFF
    
    # Convert to hex string
    rgba_hex = f"#{x:08x}"
    return rgba_hex

def rgba_to_number(rgba_hex):
    
    # Constants (same as above)
    PRIME1 = 2654435761
    PRIME2 = 2246822519
    PRIME3 = 3266489917
    PRIME4 = 668265263
    
    def rotate_right(x, r):
        return ((x >> r) | (x << (32 - r))) & 0xFFFFFFFF
    
    # Get number from hex
    x = int(rgba_hex[1:], 16)
    
    # Reverse all operations
    x = (x * pow(PRIME4, -1, 2**32)) & 0xFFFFFFFF
    x = rotate_right(x, 5)
    x = x ^ PRIME3
    x = rotate_right(x, 17)
    x = (x * pow(PRIME2, -1, 2**32)) & 0xFFFFFFFF
    x = rotate_right(x, 13)
    x = x ^ PRIME1
    
    return x
~~~

To verify if it's really bijection:

{{< image src="/images/bijection.png" alt="Bijection verification" >}}

This resulted in the second version of the site:

{{< image src="/images/v2.png" alt="Version 2" >}}

This was hell of a ride from my very first experience at working with React.