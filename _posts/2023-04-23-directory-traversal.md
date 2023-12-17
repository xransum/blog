---
title: Directory Traversal
author: xransum
date: 2023-04-23 17:52:31 -0500
categories:
  - Web Security
tags:
  - hacking
  - exploits
  - learning
image:
  path: /commons/en-lan-2000-03.jpg
  lqip: null
  alt: null
---

## Introduction

This article is a part of the **Web Exploitation** series. You can check the other
articles in the series below.

- [Web Exploitation]({{ base.url | prepend: site.url }}/web-exploitation)

Now, let's get started!

## What is Directory Traversal?

Directory Traversal is a security vulnerability that occurs when an application accepts user input to construct a directory path but fails to properly sanitize or sandbox the input. This vulnerability allows an attacker to traverse up and down the directory structure of the file system and access files they shouldn't have access to.

## Example of a Directory Traversal Attack

Consider the following PHP code that demonstrates a directory traversal vulnerability:

```php
<?php
   $page = $_GET['page']; // index.php
   include("/var/www/html/" . $page);
?>
```

Under normal operation, the page would be set to "`index.php`". However, if a malicious user submits a different value for the "`page`" parameter, such as "`../../../../../../../../etc/passwd`", the code can be manipulated to load the "`/etc/passwd`" file instead of the intended file.

```php
<?php
   $page = $_GET['page']; // ../../../../../../../../etc/passwd
   include("/var/www/html/" . $page);
?>
```

In this example, the user submits "`../../../../../../../../etc/passwd`". This causes the PHP interpreter to leave the directory it is coded to look in (`/var/www/html`) and instead be forced up to the root folder. Ultimately, the file path becomes "`/etc/passwd`" because the computer will not go a directory above its top directory.

The application will then load the "`/etc/passwd`" file and output its contents to the user.

## Potential Impact

The contents of the `/etc/passwd` file typically contain user account information, such as usernames, user IDs, home directories, and shell information. By exploiting a directory traversal vulnerability, an attacker can gain unauthorized access to sensitive data.

Here is an example of what the `/etc/passwd` file might contain:

```
root:x:0:0:root:/root:/bin/ash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
...
```

Attackers can use the obtained data to launch further attacks, such as extracting credentials, injecting malicious code, or launching phishing campaigns.

## Prevention Measures

To prevent directory traversal attacks, it is crucial to properly sanitize and validate user input. Here are some preventive measures:

1. **Input Validation**: Validate user input to ensure it adheres to the expected format and does not contain any malicious characters or sequences.
2. **Whitelisting**: Maintain a whitelist of allowed file or directory names and compare user input against the whitelist.
3. **Canonicalization**: Use canonicalization functions provided by the programming language or framework to convert user input into a normalized and safe file path.
4. **Access Controls**: Implement strict access controls to restrict the application's ability to access files and directories outside of the intended scope.
5. **File System Permissions**: Set appropriate file system permissions to prevent unauthorized access to sensitive files and directories.
6. **Security Updates**: Keep the application and its dependencies up to date with the latest security patches to mitigate known vulnerabilities.

By implementing these preventive measures, you can strengthen the security of your application and protect against directory traversal attacks.