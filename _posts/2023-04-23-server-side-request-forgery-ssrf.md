---
title: Server Side Request Forgery (SSRF)
author: xransum
date: 2023-04-23 13:34:00 -0500
categories:
  - Web Security
tags:
  - hacking
  - exploits
  - learning
image:
  path: /commons/beard-10.jpg
  lqip: null
  alt: null
---

## Introduction

This article is a part of the **Web Exploitation** series. You can check the other articles in the series below.

- [Web Exploitation]({{ base.url | prepend: site.url }}/web-exploitation)

Now, let's get started!

## What is Server Side Request Forgery (SSRF)?

Server Side Request Forgery (SSRF) is a web application vulnerability that allows an attacker to make requests to other systems or services that the vulnerable application has access to. This can be used to perform attacks on internal systems or retrieve sensitive information.

SSRF attacks occur when an application processes a user-supplied URL and makes a request to that URL. An attacker can manipulate the URL to make the application send requests to other systems or services that are accessible to the application.

## Example of an SSRF Attack

An example of an SSRF attack involves a web application that allows users to upload profile pictures that are stored on a separate server. The application uses the following code to retrieve the user's profile picture:

```php
<?php
   $url = 'https://profilepictures.com/' . $_GET['picture_id'];
   $data = file_get_contents($url);
   echo '<img src="' . $url . '">';
?>
```

An attacker could exploit an SSRF vulnerability by providing a malicious URL as the `picture_id` parameter, such as:

```
https://profilepictures.com/?picture_id=https://attacker.com/malicious_script
```

When the application requests the user's profile picture using the URL provided in the `picture_id` parameter, it will make a request to `https://attacker.com/malicious_script`. The attacker can then use this request to launch further attacks on internal systems or retrieve sensitive information.

For example, the attacker could modify the URL to access an internal web service:

```
https://profilepictures.com/?picture_id=https://internal-service.local:8080
```

If the internal service is not properly secured, the attacker could potentially access sensitive data or carry out further attacks.

## Prevention Measures

SSRF attacks can be prevented by implementing proper input validation and sanitization, as well as restricting the access that the application has to other systems and services. Additionally, applications should be tested thoroughly for SSRF vulnerabilities, and any discovered vulnerabilities should be patched as soon as possible.