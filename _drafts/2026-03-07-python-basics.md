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

These work pretty much how you'd expect:

### Comparison

Comparison operators return `True` or `False`.

### Logical

Use `and`, `or`, and `not` to combine or invert conditions.

<script type="py-editor" env="basics-operators">
# arithmetic
print(10 + 3)    # addition
print(10 - 3)    # subtraction
print(10 * 3)    # multiplication
print(10 / 3)    # division (always returns a float)
print(10 // 3)   # floor division (drops the remainder)
print(10 % 3)    # modulo (remainder only)
print(10 ** 3)   # exponentiation

# comparison
print(5 == 5)    # equal to
print(5 != 3)    # not equal to
print(5 > 3)     # greater than
print(5 < 3)     # less than
print(5 >= 5)    # greater than or equal to
print(5 <= 4)    # less than or equal to

# logical
print(True and False)   # both must be True
print(True or False)    # at least one must be True
print(not True)         # flips the value
</script>

## Strings

Strings are just text. Anything wrapped in quotes is a string -- single or double, Python doesn't care which you use.

```python
greeting = "Hello, World!"
name = 'Python'
```

### Concatenation & f-strings

You can join strings together with `+`, but f-strings are usually cleaner.

### Useful String Methods

Python gives you a bunch of built-in methods for working with strings. Here are the ones you'll actually reach for on a regular basis:

<script type="py-editor" env="basics-strings">
name = "Alice"

# concatenation
print("Hello, " + name + "!")

# f-string (recommended)
print(f"Hello, {name}!")

# string methods
text = "  hello, world  "
print(text.strip())
print(text.upper())
print(text.lower())
print(text.strip().split(","))
print("hello".replace("l", "r"))
print("hello".startswith("he"))
print(len("hello"))
</script>

## Lists

Lists are exactly what they sound like -- a way to keep track of multiple things at once. You can throw anything in a list: numbers, strings, even other lists.

```python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", True, 3.14]
```

### Indexing & Slicing

Lists are zero-indexed, meaning the first item is at position `0`.

### Common List Operations

<script type="py-editor" env="basics-lists">
fruits = ["apple", "banana", "cherry"]

# indexing and slicing
print(fruits[0])     # first item
print(fruits[-1])    # last item (negative index counts from the end)
print(fruits[1:3])   # slice from index 1 up to (not including) 3

# common operations
fruits.append("mango")
print(fruits)

fruits.remove("banana")
print(fruits)

print(len(fruits))
print("apple" in fruits)
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

A `for` loop iterates over a sequence -- a list, a string, a range of numbers, etc. Use `range()` when you want to loop a specific number of times. `range(start, stop, step)` gives you more control.

### while Loops

Use a `while` loop when you don't know ahead of time how many times you need to loop -- you just want to keep going until some condition changes. If you already know what you're iterating over, a `for` loop is usually the better fit.

> Make sure your `while` loop has a way to eventually become `False`, otherwise it'll run forever and you'll have to force-kill your program.
{: .prompt-danger }

<script type="py-editor" env="basics-loops">
# for loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# range
for i in range(5):
    print(i)

# range with step
for i in range(0, 10, 2):
    print(i)

# while loop
count = 0
while count < 5:
    print(count)
    count += 1
</script>

## Functions

Once you start writing more than a handful of lines, you'll notice yourself repeating the same logic in different places. Functions fix that -- write it once, use it anywhere. They also make your code a lot easier to read and reason about.

Use `return` to send a value back to the caller. Functions can also have **default parameter values** so callers don't always have to pass every argument.

<script type="py-editor" env="basics-functions">
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")
greet("Bob", "Hey")

def add(a, b):
    return a + b

print(add(3, 4))
print(add(10, 20))
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
