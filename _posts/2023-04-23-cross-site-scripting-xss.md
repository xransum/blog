---
title: Cross Site Scripting (XSS)
author: xransum
date: 2023-04-23 04:38:18 -0500
categories:
  - Web Security
tags:
  - hacking
  - exploits
  - learning
image:
  path: /commons/beard-06.jpg
  lqip: null
  alt: null
---

## Introduction

This article is a part of the **Web Exploitation** series. You can check the other
articles in the series below.

- [Web Exploitation](https://example.com/web-exploitation)

Now, let's get started!

## What is Cross-Site Scripting (XSS)?

Cross-Site Scripting (XSS) is a vulnerability that allows an attacker to
inject malicious code into a web page viewed by other users. This type of
attack can take many forms, but the most common ones are Reflected XSS, Stored
XSS, and DOM XSS.

## Reflected XSS

Reflected XSS is a type of XSS attack where the malicious script is reflected
back to the user by the server in response to a request. This type of attack
usually requires some form of user interaction, such as clicking on a link or
submitting a form. Here's an example of a Reflected XSS attack:

```bash
$ curl "https://example.com/search?q=<script>alert('XSS!');</script>"
```

If a user clicks on this link, the server will reflect the search term back to
the user, including the malicious script tag. When the user's browser
processes the script, it will execute the alert function and display an alert
box that says "XSS!".

## Stored XSS

Stored XSS is a type of XSS attack where the attacker injects malicious code
into a web page that is permanently stored on the server and served to all
users who view the page. This type of attack is especially dangerous because
it can affect many users at once and can be difficult to detect and remove. Here's an example of a Stored XSS attack:

```html
<script>
    alert('XSS!');
</script>
```

When other users view the article page, the server will serve the stored
comment to them, including the malicious script tag. When the user's browser
processes the script, it will execute the alert function and display an alert
box that says "XSS!".

## DOM XSS

DOM XSS is a type of XSS attack where the attacker injects malicious code into
a web page that is processed by the user's browser, rather than the server.
This type of attack is usually caused by client-side JavaScript code that is
vulnerable to input from untrusted sources. Here's an example of a DOM XSS
attack:

```html
<script>
    alert('XSS!');
</script>
```

When the user's browser processes the script, it will execute the alert
function and display an alert box that says "XSS!". This type of attack can be
prevented by properly sanitizing user input and using a Content Security
Policy (CSP) to restrict the execution of scripts on the page.

## Prevention Measures

To prevent XSS attacks, web developers should sanitize all user input and use
server-side validation to ensure that the input conforms to expected formats.
Additionally, developers should use input validation and output encoding to
prevent untrusted input from being executed as code. Finally, web developers
should use a Content Security Policy (CSP) to restrict the types of scripts
that can be executed on a page, and to prevent inline scripts from being
executed altogether.

## Conclusion

XSS attacks are dangerous and can lead to a wide range of consequences,
including stealing user credentials, taking control of user accounts, defacing
websites, and stealing sensitive data. It is important for web developers to
understand the risks associated with XSS and take steps to prevent it in their
applications.

By understanding the different types of XSS attacks and implementing proper
security measures, web developers can protect their users from the dangers of
XSS and ensure the safety and integrity of their applications.