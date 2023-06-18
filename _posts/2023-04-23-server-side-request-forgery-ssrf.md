---
title: "Server Side Request Forgery (SSRF)"
categories:
  - Hacking
---


Server Side Request Forgery (SSRF) is a web application vulnerability that
allows an attacker to make requests to other systems or services that the
vulnerable application has access to. This can be used to perform attacks on
internal systems or retrieve sensitive information.

SSRF attacks occur when an application processes a user-supplied URL and makes
a request to that URL. An attacker can manipulate the URL to make the
application send requests to other systems or services that are accessible to
the application.

An example of an SSRF attack involves a web application that allows users to
upload profile pictures that are stored on a separate server. The application
uses the following code to retrieve the user's profile picture:

```php
<?php
$url = 'https://profilepictures.com/' . $_GET['picture_id'];
$data = file_get_contents($url);
echo '<img src="' . $url . '">';
?>
```

An attacker could exploit an SSRF vulnerability by providing a malicious URL
as the `picture_id` parameter, such as:

```
https://profilepictures.com/?picture_id=http://attacker.com/malicious_script
```

When the application requests the user's profile picture using the URL
provided in the `picture_id` parameter, it will make a request to
`http://attacker.com/malicious_script`. The attacker can then use this request
to launch further attacks on internal systems or retrieve sensitive
information.

For example, the attacker could modify the URL to access an internal web
service:

```
https://profilepictures.com/?picture_id=http://internal-service.local:8080
```

If the internal service is not properly secured, the attacker could
potentially access sensitive data or carry out further attacks.

SSRF attacks can be prevented by implementing proper input validation and
sanitization, as well as restricting the access that the application has to
other systems and services. Additionally, applications should be tested
thoroughly for SSRF vulnerabilities, and any discovered vulnerabilities should
be patched as soon as possible.
