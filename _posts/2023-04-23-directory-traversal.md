---
title: "Directory Traversal"
categories:
  - Hacking
---


Directory Traversal is a security vulnerability that occurs when an
application accepts user input to construct a directory path but fails to
properly sanitize or sandbox the input. This vulnerability can allow an
attacker to traverse up and down the directory structure of the file system
and access files they shouldn't have access to.

Consider this PHP code that allows the user to choose what page to load from a
**GET** parameter:

```php
<?php
$page = $_GET['page']; // index.php
include("/var/www/html/" . $page);
?>
```

Under normal operation, the page would be "`index.php`". However, if a
malicious user were to submit a different value for the "`page`" parameter,
such as "`../../../../../../../../etc/passwd`", the code could be manipulated
to load the "`/etc/passwd`" file instead of the intended file.

```php
<?php
$page = $_GET['page']; // ../../../../../../../../etc/passwd
include("/var/www/html/" . $page);
?>
```

In this example, the user is submitting
"`../../../../../../../../etc/passwd`". This will cause the PHP interpreter to
leave the directory that it is coded to look in ("`/var/www/html`") and
instead be forced up to the root folder. Ultimately, this will become
"`/etc/passwd`" because the computer will not go a directory above its top
directory.

The application will then load the "`/etc/passwd`" file and output something
of the following to the user:

```
root:x:0:0:root:/root:/bin/ash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/mail:/sbin/nologin
news:x:9:13:news:/usr/lib/news:/sbin/nologin
uucp:x:10:14:uucp:/var/spool/uucppublic:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
man:x:13:15:man:/usr/man:/sbin/nologin
postmaster:x:14:12:postmaster:/var/mail:/sbin/nologin
cron:x:16:16:cron:/var/spool/cron:/sbin/nologin
ftp:x:21:21::/var/lib/ftp:/sbin/nologin
sshd:x:22:22:sshd:/dev/null:/sbin/nologin
at:x:25:25:at:/var/spool/cron/atjobs:/sbin/nologin
squid:x:31:31:Squid:/var/cache/squid:/sbin/nologin
xfs:x:33:33:X Font Server:/etc/X11/fs:/sbin/nologin
games:x:35:35:games:/usr/games:/sbin/nologin
cyrus:x:85:12::/usr/cyrus:/sbin/nologin
vpopmail:x:89:89::/var/vpopmail:/sbin/nologin
ntp:x:123:123:NTP:/var/empty:/sbin/nologin
smmsp:x:209:209:smmsp:/var/spool/mqueue:/sbin/nologin
guest:x:405:100:guest:/dev/null:/sbin/nologin
nobody:x:65534:65534:nobody:/:/sbin/nologin
nginx:x:100:101:nginx:/var/lib/nginx:/sbin/nologin
vnstat:x:101:102:vnstat:/var/lib/vnstat:/bin/false
redis:x:102:103:redis:/var/lib/redis:/bin/false
```

The concept of directory traversal can be applied to any application that
accepts input from a user to construct a file path. This vulnerability can be
exploited to gain unauthorized access to sensitive data, such as configuration
files, application source code, or user data, by manipulating the input to
traverse to directories outside of the intended scope.

Attackers can use the obtained data to launch further attacks, such as
extracting credentials, injecting malicious code, or launching phishing
campaigns. Therefore, it is critical to properly sanitize and validate user
input to prevent directory traversal attacks and ensure the security of the
application and the system it runs on.
