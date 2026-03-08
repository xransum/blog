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

## Overview

Now that you've got Python installed, it's time to actually learn the language. This post covers the fundamentals you'll use in pretty much every Python program you ever write. Nothing too crazy yet — just the building blocks.

## Variables & Data Types

Variables are how your program remembers things. You give a value a name, and from that point on you can use that name anywhere in your code. Python figures out the type on its own — you don't have to tell it.

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

```python
print(type(42))        # <class 'int'>
print(type("hello"))   # <class 'str'>
print(type(3.14))      # <class 'float'>
print(type(True))      # <class 'bool'>
```

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-variables' %}

## Basic Operators

### Arithmetic

These work pretty much how you'd expect:

```python
print(10 + 3)   # 13  — addition
print(10 - 3)   # 7   — subtraction
print(10 * 3)   # 30  — multiplication
print(10 / 3)   # 3.3333... — division (always returns a float)
print(10 // 3)  # 3   — floor division (drops the remainder)
print(10 % 3)   # 1   — modulo (remainder only)
print(10 ** 3)  # 1000 — exponentiation
```

### Comparison

Comparison operators return `True` or `False`:

```python
print(5 == 5)   # True  — equal to
print(5 != 3)   # True  — not equal to
print(5 > 3)    # True  — greater than
print(5 < 3)    # False — less than
print(5 >= 5)   # True  — greater than or equal to
print(5 <= 4)   # False — less than or equal to
```

### Logical

Use these to combine conditions:

```python
print(True and False)   # False — both must be True
print(True or False)    # True  — at least one must be True
print(not True)         # False — flips the value
```

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-operators' %}

## Strings

Strings are just text. Anything wrapped in quotes is a string — single or double, Python doesn't care which you use.

```python
greeting = "Hello, World!"
name = 'Python'
```

### Concatenation & f-strings

You can join strings together with `+`, but f-strings are usually cleaner:

```python
name = "Alice"

# Concatenation
print("Hello, " + name + "!")

# f-string (recommended)
print(f"Hello, {name}!")
```

### Useful String Methods

Python gives you a bunch of built-in methods for working with strings. Here are the ones you'll actually reach for on a regular basis:

```python
text = "  hello, world  "

print(text.strip())         # "hello, world"    — removes leading/trailing whitespace
print(text.upper())         # "  HELLO, WORLD  "
print(text.lower())         # "  hello, world  "
print(text.strip().split(","))  # ["hello", " world"] — splits into a list
print("hello".replace("l", "r"))  # "herro"
print("hello".startswith("he"))   # True
print(len("hello"))               # 5 — length of the string
```

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-strings' %}

## Lists

Lists are exactly what they sound like — a way to keep track of multiple things at once. You can throw anything in a list: numbers, strings, even other lists.

```python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", True, 3.14]
```

### Indexing & Slicing

Lists are zero-indexed, meaning the first item is at position `0`:

```python
fruits = ["apple", "banana", "cherry"]

print(fruits[0])    # "apple"
print(fruits[-1])   # "cherry" — negative index counts from the end
print(fruits[1:3])  # ["banana", "cherry"] — slice from index 1 up to (not including) 3
```

### Common List Operations

```python
fruits = ["apple", "banana"]

fruits.append("cherry")     # adds to the end
print(fruits)               # ["apple", "banana", "cherry"]

fruits.remove("banana")     # removes by value
print(fruits)               # ["apple", "cherry"]

print(len(fruits))          # 2 — number of items
print("apple" in fruits)    # True — check membership
```

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-lists' %}

## Conditionals

Most programs need to behave differently depending on the situation — and that's what conditionals are for. The basic structure is `if`, optionally followed by `elif` (else if) and `else`.

```python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
```

> Indentation matters in Python. Everything inside a block must be indented consistently -- the standard is 4 spaces. Python will throw an error if the indentation is off.
{: .prompt-warning }

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-conditionals' %}

## Loops

### for Loops

A `for` loop iterates over a sequence — a list, a string, a range of numbers, etc.

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

Use `range()` when you want to loop a specific number of times:

```python
for i in range(5):
    print(i)   # prints 0, 1, 2, 3, 4
```

`range(start, stop, step)` gives you more control:

```python
for i in range(0, 10, 2):
    print(i)   # prints 0, 2, 4, 6, 8
```

### while Loops

Use a `while` loop when you don't know ahead of time how many times you need to loop — you just want to keep going until some condition changes. If you already know what you're iterating over, a `for` loop is usually the better fit.

A `while` loop keeps running as long as its condition is `True`:

```python
count = 0

while count < 5:
    print(count)
    count += 1   # same as: count = count + 1
```

> Make sure your `while` loop has a way to eventually become `False`, otherwise it'll run forever and you'll have to force-kill your program.
{: .prompt-danger }

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-loops' %}

## Functions

Once you start writing more than a handful of lines, you'll notice yourself repeating the same logic in different places. Functions fix that — write it once, use it anywhere. They also make your code a lot easier to read and reason about.

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")   # Hello, Alice!
greet("Bob")     # Hello, Bob!
```

Use `return` to send a value back to the caller:

```python
def add(a, b):
    return a + b

result = add(3, 4)
print(result)   # 7
```

Functions can have **default parameter values**, so callers don't always have to pass every argument:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Alice", "Hey")       # Hey, Alice!
```

Try it yourself:

{% include embed/python-training/python-playground.html id='basics-functions' %}

## Comments

Comments are lines Python ignores — they're just there for you (and anyone else reading your code).

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

The nice thing about docstrings is that Python can actually read them at runtime. Try calling `help(multiply)` after defining that function — you'll see the docstring show up right there in the output. Way more useful than a plain comment when you're writing code other people (or future you) will need to understand.

## Conclusion

That covers the core building blocks of Python. Variables, operators, strings, lists, conditionals, loops, functions, and comments — these will show up in virtually every program you write. The next post will put these pieces together and walk through writing some actual small programs.
