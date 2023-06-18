---
title: "SQL Injection"
categories:
  - Hacking
---

SQL Injection is a security vulnerability that occurs when an application
accepts user input without properly checking it for extra SQL code. This means
that if a malicious user enters a specially crafted input, the application
could execute unintended SQL commands and potentially access data they
shouldn't have access to.

For example, let's say there's a website that requires users to enter their
username and password to log in. The website uses the following SQL query to
check if the user's credentials are correct:

```sql
SELECT * FROM users WHERE username='$username' AND password='$password'
```

If the website doesn't properly check user input, a malicious user could enter
code in the username or password fields that changes the SQL query and allows
them to log in without a valid username or password. For instance, consider
this input:

```
Username: ' OR 1=1--
Password:
```

The resulting SQL query would look like this:

```sql
SELECT * FROM users WHERE username='' OR 1=1--' AND password=''
```

In this case, the `OR 1=1` statement modifies the SQL query to select all rows
in the "users" table, and the `--` comment hides the rest of the original
query. This means that the attacker could log in without knowing a valid
username or password.

Another example is when a user enters a single quote character in their input,
which could break the SQL query and cause an error. For example:

```php
<?php
$username = $_GET['username']; // if the user enters a single quote here, it could break the SQL query
$result = mysql_query("SELECT * FROM users WHERE username='$username'");
?>
```

A malicious user could enter a single quote in the username field, which would
result in the following SQL query:

```sql
SELECT * FROM users WHERE username=''''
```

This query is incorrect and will cause the application to crash.

Using SQL injection techniques, attackers can manipulate SQL queries to return
data that they are not supposed to have access to. It's important for
developers to properly validate user input and sanitize data to prevent SQL
injection attacks.
