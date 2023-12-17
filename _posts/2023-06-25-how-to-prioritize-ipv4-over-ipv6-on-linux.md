---
title: How to Prioritize IPv4 over IPv6 on Linux
author: xransum
date: 2023-06-25 09:26:07 -0500
categories:
  - Networking
tags:
  - ubuntu
image:
  path: /commons/trolley.jpg
  lqip: null
  alt: null
---

## Introduction

This will be a short and simple guide on how to prioritize IPv4 over IPv6 on Linux.
These steps should work on most Linux distributions, but I will be focusing on Debian based distributions.

## Why?

There are many reasons why you would want to prioritize IPv4 over IPv6, but the main reason is that some applications do not support IPv6.

But most importantly, the timeouts that occur when your system to cycle through its IPv6 addresses before it tries IPv4 could cause even the most patient person to lose their mind.

## Instructions

Their are two ways to prioritize IPv4 over IPv6 on Linux, the first way is to set the precedence of IPv4 over IPv6, and the second way is to disable IPv6 completely.

Choose the option that best suits your needs.

### Option 1: Prioritize IPv4 over IPv6

The `/etc/gai.conf` file provides a mechanism to dynamically alter the preference order of IP address families during hostname resolution. It is used by the `getaddrinfo()` function, which resolves domain names to IP addresses. This mechanism is similar to how the `/etc/hosts` file is used for hostname resolution.

In the `/etc/gai.conf` file, the precedence order of each IP address family is determined by the `precedence` value. The address families are listed in descending order of precedence, from highest to lowest. The default `precedence` value is typically `100`, and the highest allowed value is `1024`.

```bash
$ sudo nano /etc/gai.conf
```

### Step 2: Uncomment the following line

In the `gai.conf` file, under the section for "Prefer IPv4," locate the line containing the IPv4 address family and remove the comment symbol (`#`) at the beginning of the line. Ensure that the line has a value of `100` to prioritize IPv4. If the line is absent or has a different value, add the following line:

```bash
precedence ::ffff:0:0/96  100
```

### Step 3: Save and exit the file

```bash
Ctrl + X
Y
Enter
```

### Option 2: Disable IPv6

```bash
$ sudo nano /etc/sysctl.conf
```

### Step 2: Add the following lines to the file

Append the following lines at the end of the `sysctl.conf` file:

```bash
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

### Step 3: Save and exit the file

```bash
Ctrl + X
Y
Enter
```

### Step 4: Apply the changes

```bash
$ sudo sysctl -p
```

### Step 5: Reboot your system

```bash
$ sudo reboot
```

## Conclusion

That's it! You have successfully prioritized IPv4 over IPv6 on Linux.