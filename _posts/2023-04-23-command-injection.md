---
title: "Command Injection"
categories:
  - Hacking
---

Command Injection is a vulnerability that arises when an application allows a
user to enter system commands that are executed by the operating system. This
can occur when the application fails to properly encode or sanitize user input
that is passed to a system shell. This vulnerability is often seen when a
developer uses the system() command or its equivalent in the programming
language of the application.

Consider the following Python code that uses the `os.system()` function to
ping a domain:

```python
import os
domain = user_input() # example.com
os.system('ping ' + domain)
```

In this code, the user is prompted to enter a domain to ping. However, if the
user enters a semicolon followed by another command, such as "; ls", the
operating system will execute both commands, as shown below:

```python
import os
domain = user_input() # ; ls
os.system('ping ' + domain)
```

In this example, the semicolon acts as a command separator, causing the ping
command to be terminated early, and the `ls` command to be executed instead.
This is the core concept behind command injection.

Command injection can be used to execute other system commands as well, such
as `wget`, `curl`, and `bash`, among others. It is a common means of privilege
escalation within web applications and applications that interface with system
commands. Many home routers, for example, are vulnerable to command injection
because they take user input and directly append it to a system command.

Other examples of payloads that can be used for command injection include:

- `;ls`
- `$(pwd)`
- `whoami`

Developers can prevent command injection by validating and sanitizing user
input, as well as using safe programming practices such as input encoding,
parameterized queries, and avoiding the use of system commands whenever
possible.

