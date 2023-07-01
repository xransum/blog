---
title: "Cross Site Request Forgery (CSRF)"
excerpt: "A guide on how to exploit CSRF vulnerabilities."
categories:
  - Web Exploits
tags:
  - Hacking
  - Web Security
  - Web Exploitation
  - Learning
---


A Cross-Site Request Forgery (CSRF) attack is a type of attack that targets an
authenticated user and leverages their active session to perform unauthorized
actions, such as making a purchase, transferring funds, or changing account
details.

The success of a CSRF attack relies on session hijacking, which occurs when an
attacker injects malicious elements, such as an `<img>` or `<iframe>` tag,
into a webpage. These elements reference external resources that have not been
verified, and when a user interacts with the webpage, their session is used to
execute the unauthorized action without their knowledge or consent.

To prevent CSRF attacks, web developers should implement measures such as
anti-CSRF tokens, which generate unique tokens for each user session and
validate them upon submission, or implement same-site cookies, which prevent
unauthorized access to cookies across different sites.

Websites commonly use HTTP `GET` requests to receive user input, such as
search queries or form submissions. In some cases, these requests can include
sensitive information, such as account details or financial transactions.

For example, when a user logs in to a banking site, their browser may receive
a session cookie that keeps them logged in. When the user initiates a
transaction, the URL that is sent to the server may contain sensitive
information, such as the recipient's account number and the amount of money
being transferred, in the following format:

```
https://examplebank.com/transfer.do?recipient=[ACCOUNT_NUMBER]&amount=[AMOUNT]&sessionid=[SESSION_ID]
```

An attacker can exploit this vulnerability by tricking the user into clicking
on a hyperlink or loading an image that references a malicious URL that
follows the same format. For instance, an attacker could include an invisible
image tag with the malicious URL as its source, causing the user's browser to
automatically send a request to the attacker's server, without the user's
knowledge or consent.

Here's an example of a malicious URL:
```html
<img src="https://examplebank.com/transfer.do?recipient=[ATTACKER_ACCOUNT]&amount=[HUGE_AMOUNT]&sessionid=[ATTACKER_SESSION_ID]" width="0" height="0" border="0">
```