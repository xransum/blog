---
title: Command Injection
author: xransum
date: 2023-04-23 16:35:04 -0500
categories:
  - Web Security
tags:
  - hacking
  - exploits
  - learning
image:
  path: /commons/beard-07.jpg
  lqip: null
  alt: null
---

## Introduction

This article is a part of the **Web Exploitation** series. You can check the other
articles in the series below.

- [Web Exploitation]({{ base.url | prepend: site.url }}/web-exploitation)

Now, let's get started!

## What is Command Injection?

Command Injection is a vulnerability that arises when an application allows a user to enter system commands that are executed by the operating system. This can occur when the application fails to properly encode or sanitize user input that is passed to a system shell. This vulnerability is often seen when a developer uses the `system()` command or its equivalent in the programming language of the application.

## Example

Consider the following Python code that uses the `os.system()` function to ping a domain:

```python
import os
domain = user_input() # example.com
os.system('ping ' + domain)
```

In this code, the user is prompted to enter a domain to ping. However, if the user enters a semicolon followed by another command, such as `; ls`, the operating system will execute both commands, as shown below:

```python
import os
domain = user_input() # ; ls
os.system('ping ' + domain)
```

In this example, the semicolon acts as a command separator, causing the ping command to be terminated early, and the `ls` command to be executed instead. This is the core concept behind command injection.

## Payloads

Command injection can be used to execute other system commands as well, such as `wget`, `curl`, and `bash`, among others. It is a common means of privilege escalation within web applications and applications that interface with system commands. Many home routers, for example, are vulnerable to command injection because they take user input and directly append it to a system command.

Here are some examples of payloads that can be used for command injection:

- `;ls`
- `$(pwd)`
- `whoami`

## Prevention Measures

Developers can prevent command injection by validating and sanitizing user input, as well as using safe programming practices such as input encoding, parameterized queries, and avoiding the use of system commands whenever possible.