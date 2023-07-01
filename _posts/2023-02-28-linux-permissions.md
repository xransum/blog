---
title: "Linux Permissions"
excerpt: "Fundamentals of Linux permissions and how attackers target Linux machines."
categories:
  - Linux
tags:
  - Linux
  - Permissions
  - Vulnerabilities
---


I'll cover the fundamentals of Linux security and how attackers target Linux machines.

Before we dive into securing Linux systems, it's important to understand the Linux permissions model. Understanding how to manage permissions on Linux systems will help you understand attacks that exploit the permissions system, such as most privilege escalation techniques.

Linux inherited the Unix model of file ownership and permissions. Every file and directory on the system has a set of permissions that specifies who is allowed to do what with that particular file.

There are three types of permissions: read, write, and execute. 
- **Read** permission on a file allows a user to read the contents of the file. 
- **Write** permission allows a user to modify or delete the file. 
- **Execute** permission allows a user to run the file as a script or an executable.

You can view the permissions of a file or directory by using the `ls -l` command in a directory. Here's an example output:

```bash
-rwxrwxrwx 1 user user 8192 May 9 10:27 myscript.sh
drwxr-xr-x 2 user user 4096 May 9 10:27 mydir/
```

The first character indicates whether the item is a file or a directory. A dash means that the item is a file, whereas a "d" means it's a directory. The next three characters are the permissions of the file's owner. The owner is usually the user who created the file and has the most control over it. "r" indicates read, "w" indicates write, and "x" indicates execute. And a dash indicates the lack of that permission. The next three characters are the permissions of the owner's group, and the final three are the permissions for everyone else.

You can set file permissions by using the `chmod` command. In this command, you use the characters "u", "g", and "o" to indicate the owner user, owner group, and others. For example, to add execution permissions for a file's owner group, you can use the command:

```bash
chmod g+x filepath
```

And to set execute permissions for everyone, you can use the command:

```bash
chmod +x filepath
```

On the other hand, when you want to remove a permission, you can swap out the plus sign for a minus sign. For example, this command will remove execute permissions for everyone:

```bash
chmod -x filepath
```

Another useful command is `chown`, which is used to change the ownership of a file or directory. By default, files are owned by the user who created them, but sometimes it's necessary to change ownership to another user or group. Here's an example of how to change the ownership of a file:

```bash
sudo chown john:users filename
```

In this example, we're changing the ownership of the file "filename" to the user "john" and the group "users". The `sudo` command is used to elevate our privileges to perform the operation as root, which is necessary since only the root user has permission to change ownership.

In summary, understanding Linux file permissions is critical to managing the security of your system. By using commands like `chmod` and `chown`, you can control who can access and modify files on your system. Always be mindful of the permissions you grant to users and groups, and make sure to keep your system up-to-date with security patches and updates.