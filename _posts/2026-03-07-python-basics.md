---
title: Python Basics
description: Covers Python fundamentals -- variables, data types, conditionals, loops, and functions -- with interactive in-browser code examples via PyScript.
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

{% include embed/python-training/python-editor.html id='basics-variables' source='basics-variables' %}

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

## Basic Operators

### Arithmetic

These work pretty much how you'd expect -- they do math and give you a number back.

{% include embed/python-training/python-editor.html id='basics-operators-arith' source='basics-operators-arith' %}

### Comparison

Comparison operators evaluate two values and return `True` or `False`. You'll use these constantly inside conditionals.

{% include embed/python-training/python-editor.html id='basics-operators-comparison' source='basics-operators-comparison' %}

### Logical

Logical operators let you combine or invert conditions. You'll use these constantly once you start writing conditionals.

{% include embed/python-training/python-editor.html id='basics-operators-logical' source='basics-operators-logical' %}

## Strings

Strings are just text. Anything wrapped in quotes is a string -- single or double, Python doesn't care which you use.

```python
greeting = "Hello, World!"
name = 'Python'
```

### Concatenation & f-strings

You can join strings together with `+`, but f-strings are usually cleaner. An f-string lets you drop any variable directly into the text by wrapping it in `{}`.

{% include embed/python-training/python-editor.html id='basics-strings-concat' source='basics-strings-concat' %}

### Reshaping Strings

These methods change the shape, case, or structure of a string -- useful for cleaning up user input or formatting output.

{% include embed/python-training/python-editor.html id='basics-strings-reshape' source='basics-strings-reshape' %}

### Searching & Inspecting Strings

These methods let you look inside a string -- check what's in it, find something, or measure it -- without changing it.

{% include embed/python-training/python-editor.html id='basics-strings-search' source='basics-strings-search' %}

## Lists

Lists are exactly what they sound like -- a way to keep track of multiple things at once. You can throw anything in a list: numbers, strings, even other lists.

```python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", True, 3.14]
```

### Indexing & Slicing

Lists are zero-indexed, meaning the first item is at position `0`. Negative indexes count from the end. Slicing lets you grab a chunk of the list at once.

{% include embed/python-training/python-editor.html id='basics-lists-index' source='basics-lists-index' %}

### Modifying Lists

These methods change the list in place -- adding, removing, or inserting items.

{% include embed/python-training/python-editor.html id='basics-lists-mutate' source='basics-lists-mutate' %}

### Querying Lists

These let you read information about a list without changing it.

{% include embed/python-training/python-editor.html id='basics-lists-query' source='basics-lists-query' %}

## Conditionals

Most programs need to behave differently depending on the situation -- and that's what conditionals are for. The basic structure is `if`, optionally followed by `elif` (else if) and `else`.

> Indentation matters in Python. Everything inside a block must be indented consistently -- the standard is 4 spaces. Python will throw an error if the indentation is off.
{: .prompt-warning }

{% include embed/python-training/python-editor.html id='basics-conditionals' source='basics-conditionals' %}

## Loops

### for Loops

A `for` loop iterates over a sequence -- a list, a string, anything you can step through one item at a time.

{% include embed/python-training/python-editor.html id='basics-loops-for-seq' source='basics-loops-for-seq' %}

Use `range()` when you want to loop a specific number of times. `range(start, stop, step)` gives you finer control.

{% include embed/python-training/python-editor.html id='basics-loops-for-range' source='basics-loops-for-range' %}

### while Loops

Use a `while` loop when you don't know ahead of time how many times you need to loop -- you just want to keep going until some condition changes. If you already know what you're iterating over, a `for` loop is usually the better fit.

> Make sure your `while` loop has a way to eventually become `False`, otherwise it'll run forever and you'll have to force-kill your program.
{: .prompt-danger }

{% include embed/python-training/python-editor.html id='basics-loops-while' source='basics-loops-while' %}

## Functions

Once you start writing more than a handful of lines, you'll notice yourself repeating the same logic in different places. Functions fix that -- write it once, use it anywhere. They also make your code a lot easier to read and reason about.

Define a function with `def`, give it a name, and list any inputs it needs in parentheses.

{% include embed/python-training/python-editor.html id='basics-functions-def' source='basics-functions-def' %}

Use `return` to send a value back to whoever called the function. Without `return`, a function just does something -- with it, a function produces something you can use.

{% include embed/python-training/python-editor.html id='basics-functions-return' source='basics-functions-return' %}

### Default Parameters

Functions can have default parameter values so callers don't always have to pass every argument. If the caller skips a parameter that has a default, Python just uses the default.

{% include embed/python-training/python-editor.html id='basics-functions-defaults' source='basics-functions-defaults' %}

## Conclusion

That covers the core building blocks of Python. Variables, operators, strings, lists, conditionals, loops, functions, and comments -- these will show up in virtually every program you write. The next post will put these pieces together and walk through writing some actual small programs.
