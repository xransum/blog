---
title: Python Basics
author: xransum
date: 2026-03-07 10:00:00 -0500
categories:
  - Tutorial
tags:
  - learning
  - python
pin: false
image:
  path: /commons/python-code-logo.png
  lqip: null
  alt: null
---

{% include embed/python-training/pyscript-loader.html %}

## Overview

Now that you've got Python installed, it's time to actually learn the language. This post covers the fundamentals you'll use in pretty much every Python program you ever write. Nothing too crazy yet -- just the building blocks.

## Variables & Data Types

Variables are how your program remembers things. You give a value a name, and from that point on you can use that name anywhere in your code. Python figures out the type on its own -- you don't have to tell it.

```python
name = "Alice"
age = 30
height = 5.7
is_student = True
```

Python has four basic data types you'll use constantly:

| Type | Example | Description |
|------|---------|-------------|
| `int` | `42` | Whole numbers |
| `float` | `3.14` | Decimal numbers |
| `str` | `"hello"` | Text |
| `bool` | `True` / `False` | True or false values |

If you're ever unsure what type something is, use the built-in `type()` function:

<script type="py-editor" env="basics-variables">
name = "Alice"
age = 30
height = 5.7
is_student = True

print(type(name))
print(type(age))
print(type(height))
print(type(is_student))
</script>

## Basic Operators

### Arithmetic

These work pretty much how you'd expect -- they do math and give you a number back.

<script type="py-editor" env="basics-operators-arith">
print(10 + 3)    # addition
print(10 - 3)    # subtraction
print(10 * 3)    # multiplication
print(10 / 3)    # division (always returns a float)
print(10 // 3)   # floor division (drops the remainder)
print(10 % 3)    # modulo (remainder only)
print(10 ** 3)   # exponentiation
</script>

### Comparison

Comparison operators evaluate two values and return `True` or `False`. You'll use these constantly inside conditionals.

<script type="py-editor" env="basics-operators-comparison">
print(5 == 5)    # equal to
print(5 != 3)    # not equal to
print(5 > 3)     # greater than
print(5 < 3)     # less than
print(5 >= 5)    # greater than or equal to
print(5 <= 4)    # less than or equal to
</script>

### Logical

Logical operators let you combine or invert conditions. You'll use these constantly once you start writing conditionals.

<script type="py-editor" env="basics-operators-logical">
print(True and False)   # both must be True
print(True or False)    # at least one must be True
print(not True)         # flips the value

# combining conditions
age = 25
has_id = True
print(age >= 18 and has_id)   # True
print(age < 18 or has_id)     # True
print(not has_id)             # False
</script>

## Strings

Strings are just text. Anything wrapped in quotes is a string -- single or double, Python doesn't care which you use.

```python
greeting = "Hello, World!"
name = 'Python'
```

### Concatenation & f-strings

You can join strings together with `+`, but f-strings are usually cleaner. An f-string lets you drop any variable directly into the text by wrapping it in `{}`.

<script type="py-editor" env="basics-strings-concat">
name = "Alice"

# concatenation
print("Hello, " + name + "!")

# f-string (recommended)
print(f"Hello, {name}!")

# f-strings can hold any expression
age = 30
print(f"{name} is {age} years old.")
print(f"In 10 years, {name} will be {age + 10}.")
</script>

### Reshaping Strings

These methods change the shape, case, or structure of a string -- useful for cleaning up user input or formatting output.

<script type="py-editor" env="basics-strings-reshape">
text = "  hello, world  "

print(text.strip())              # remove leading/trailing whitespace
print(text.upper())              # uppercase
print(text.lower())              # lowercase
print(text.strip().split(","))   # split into a list on a delimiter
</script>

### Searching & Inspecting Strings

These methods let you look inside a string -- check what's in it, find something, or measure it -- without changing it.

<script type="py-editor" env="basics-strings-search">
print("hello".replace("l", "r"))   # replace all occurrences
print("hello".startswith("he"))    # check prefix
print("hello".endswith("lo"))      # check suffix
print(len("hello"))                # length

# practical example
email = "alice@example.com"
print(email.endswith(".com"))
print("@" in email)
print(len(email))
</script>

## Lists

Lists are exactly what they sound like -- a way to keep track of multiple things at once. You can throw anything in a list: numbers, strings, even other lists.

```python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", True, 3.14]
```

### Indexing & Slicing

Lists are zero-indexed, meaning the first item is at position `0`. Negative indexes count from the end. Slicing lets you grab a chunk of the list at once.

<script type="py-editor" env="basics-lists-index">
fruits = ["apple", "banana", "cherry", "mango", "grape"]

print(fruits[0])     # first item
print(fruits[-1])    # last item
print(fruits[1:3])   # slice: index 1 up to (not including) 3
print(fruits[:2])    # everything before index 2
print(fruits[2:])    # everything from index 2 onward
</script>

### Modifying Lists

These methods change the list in place -- adding, removing, or inserting items.

<script type="py-editor" env="basics-lists-mutate">
fruits = ["apple", "banana", "cherry"]

fruits.append("mango")       # add to the end
print(fruits)

fruits.remove("banana")      # remove by value
print(fruits)

fruits.insert(1, "kiwi")     # insert at a specific position
print(fruits)
</script>

### Querying Lists

These let you read information about a list without changing it.

<script type="py-editor" env="basics-lists-query">
fruits = ["apple", "kiwi", "cherry", "mango"]

print(len(fruits))            # number of items
print("apple" in fruits)      # membership check
print("grape" in fruits)      # False
print(fruits.index("kiwi"))   # position of a value
</script>

## Conditionals

Most programs need to behave differently depending on the situation -- and that's what conditionals are for. The basic structure is `if`, optionally followed by `elif` (else if) and `else`.

> Indentation matters in Python. Everything inside a block must be indented consistently -- the standard is 4 spaces. Python will throw an error if the indentation is off.
{: .prompt-warning }

<script type="py-editor" env="basics-conditionals">
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
</script>

## Loops

### for Loops

A `for` loop iterates over a sequence -- a list, a string, anything you can step through one item at a time.

<script type="py-editor" env="basics-loops-for-seq">
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

# strings are sequences too
for char in "hello":
    print(char)
</script>

Use `range()` when you want to loop a specific number of times. `range(start, stop, step)` gives you finer control.

<script type="py-editor" env="basics-loops-for-range">
# loop n times
for i in range(5):
    print(i)

# range with start and stop
for i in range(2, 6):
    print(i)

# range with step
for i in range(0, 10, 2):
    print(i)
</script>

### while Loops

Use a `while` loop when you don't know ahead of time how many times you need to loop -- you just want to keep going until some condition changes. If you already know what you're iterating over, a `for` loop is usually the better fit.

> Make sure your `while` loop has a way to eventually become `False`, otherwise it'll run forever and you'll have to force-kill your program.
{: .prompt-danger }

<script type="py-editor" env="basics-loops-while">
count = 0

while count < 5:
    print(count)
    count += 1   # same as: count = count + 1
</script>

## Functions

Once you start writing more than a handful of lines, you'll notice yourself repeating the same logic in different places. Functions fix that -- write it once, use it anywhere. They also make your code a lot easier to read and reason about.

Define a function with `def`, give it a name, and list any inputs it needs in parentheses.

<script type="py-editor" env="basics-functions-def">
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")
</script>

Use `return` to send a value back to whoever called the function. Without `return`, a function just does something -- with it, a function produces something you can use.

<script type="py-editor" env="basics-functions-return">
def add(a, b):
    return a + b

result = add(3, 4)
print(result)
print(add(10, 20))
</script>

### Default Parameters

Functions can have default parameter values so callers don't always have to pass every argument. If the caller skips a parameter that has a default, Python just uses the default.

<script type="py-editor" env="basics-functions-defaults">
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # uses the default greeting
greet("Bob", "Hey")         # overrides the default

def power(base, exponent=2):
    return base ** exponent

print(power(3))     # 3 squared = 9
print(power(3, 3))  # 3 cubed = 27
</script>

## Comments

Comments are lines Python ignores -- they're just there for you (and anyone else reading your code).

```python
# This is a single-line comment

x = 10  # you can also put them at the end of a line
```

For longer explanations, especially at the top of a function, use a **docstring**:

```python
def multiply(a, b):
    """
    Multiplies two numbers together and returns the result.
    """
    return a * b
```

The nice thing about docstrings is that Python can actually read them at runtime. Try calling `help(multiply)` after defining that function -- you'll see the docstring show up right there in the output. Way more useful than a plain comment when you're writing code other people (or future you) will need to understand.

## Conclusion

That covers the core building blocks of Python. Variables, operators, strings, lists, conditionals, loops, functions, and comments -- these will show up in virtually every program you write. The next post will put these pieces together and walk through writing some actual small programs.
