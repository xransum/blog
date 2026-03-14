---
title: Python Dictionaries and Tuples
author: xransum
date: 2026-03-13 12:00:00 -0500
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

You already know lists. They're great for ordered collections of things -- a shopping cart, a sequence of numbers, a set of results. But they're not the right tool for every job.

This post covers two more data structures. First **dictionaries** -- the most important data structure in Python, and the one you'll use constantly. Then **tuples** -- which you'll actually encounter inside dictionaries before we've formally introduced them, so the order makes sense.

---

## Dictionaries

Here's a problem. You're tracking the scores of three players. You could use a list:

```python
scores = [92, 78, 85]
```

But now you have to remember that index `0` is Alice, index `1` is Bob, and index `2` is Carol. That's fine with three players. With thirty it's a mess. And if you ever sort the list or insert someone in the middle, all your indexes shift.

A dictionary solves this by letting you use names as keys instead of positions:

```python
scores = {
    "alice": 92,
    "bob":   78,
    "carol": 85,
}
```

Now you look up Alice by name. The data is self-describing. You don't need to remember any indexes.

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-vs-list' source='dicts-tuples-dict-vs-list' %}

This is the core idea behind dictionaries: **when you need to look something up by a meaningful name rather than a position, use a dict.**

A phone book is the classic example. You know the person's name, you want their number. A list of phone numbers with no names attached is useless. A dict with names as keys is exactly the right structure.

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-phonebook' source='dicts-tuples-dict-phonebook' %}

You'll reach for a dict any time your data has this shape: there's a label (the key) and a piece of information attached to it (the value). User profiles, config settings, word counts, API responses -- they all fit this pattern.

Keys must be unique and immutable. Strings are the most common choice. Values can be anything: strings, numbers, lists, other dicts.

### Creating and Adding Keys

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-create' source='dicts-tuples-dict-create' %}

You don't have to define all keys upfront. Assigning to a key that doesn't exist yet just creates it.

### Accessing Values

There are two ways to read a value. They behave differently when the key doesn't exist -- and that difference matters.

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-access' source='dicts-tuples-dict-access' %}

`d["key"]` crashes with a `KeyError` if the key isn't there. `d.get("key")` returns `None` instead -- or a default you supply. Use `.get()` any time you're not certain the key exists. It's the safer habit.

### Modifying a Dictionary

You can update a value, add a new key, or remove one entirely.

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-modify' source='dicts-tuples-dict-modify' %}

`del` removes the key and you're done with it. `.pop()` removes it and hands the value back -- useful when you want to take something out of the dict and use it at the same time.

### Checking if a Key Exists

Before accessing a key you're not sure about, check with `in` -- the same operator you already know from lists.

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-membership' source='dicts-tuples-dict-membership' %}

This pattern -- check first, then access -- is how you avoid `KeyError` crashes without needing `.get()`.

### Iterating Over a Dictionary

You'll often need to go through every entry in a dict. There are three ways, each giving you something different.

**Keys only** -- useful when you just need the names:

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-iterate-keys' source='dicts-tuples-dict-iterate-keys' %}

**Values only** -- useful when you only care about the data, not the labels:

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-iterate-values' source='dicts-tuples-dict-iterate-values' %}

**Keys and values together** -- the one you'll use most. `.items()` gives you both at once, and you can unpack them directly in the `for` line:

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-iterate-items' source='dicts-tuples-dict-iterate-items' %}

`for name, score in scores.items()` is idiomatic Python. Get comfortable with it -- you'll write it constantly.

Notice what `.items()` is doing: it's giving you each entry as a pair -- a key and a value bound together. That pair has a name in Python. It's called a tuple. We'll cover those properly in a moment, but you've already been using them.

### Nested Dictionaries

A dict's values can be anything, including other dicts. This is how you represent a record with multiple fields -- a user profile, a config block, a row from a database.

{% include embed/python-training/python-editor.html id='dicts-tuples-dict-nested' source='dicts-tuples-dict-nested' %}

You chain keys to go deeper: `users["alice"]["role"]` -- get Alice's entry first (a dict), then get the role from that. This pattern shows up everywhere once you start working with real data.

Keep nesting reasonable. Two levels is common. Three is occasionally necessary. Deeper than that and the data usually wants to be restructured.

### The Connection to Objects

Every Python object stores its attributes in a dictionary internally. When you write `person.name`, Python is essentially doing `person.__dict__["name"]` behind the scenes.

This is why dicts are worth understanding deeply before you get to classes. Objects aren't a new concept built on top of dicts -- they're a friendlier interface to the same underlying structure. When you get there, it'll feel familiar.

---

## Tuples

You've already seen tuples without knowing it. When you call `.items()` on a dict, each entry you get back -- `("alice", 92)`, `("bob", 78)` -- is a tuple. And back in the challenges post, the grade thresholds list was full of them: `(90, "A")`, `(80, "B")`.

A tuple is an ordered sequence, just like a list. The difference is that it's **immutable** -- once created, it can't be changed. No appending, no removing, no replacing items in place.

```python
point = (10, 20)
rgb = (255, 128, 0)
```

Parentheses instead of square brackets. Simple on the surface -- but the immutability is what makes it a distinct tool.

### Indexing

Indexing works exactly like lists: zero-based, negatives count from the end.

{% include embed/python-training/python-editor.html id='dicts-tuples-tuple-basics' source='dicts-tuples-tuple-basics' %}

> Watch the single-item tuple: `(42,)` not `(42)`. Without the trailing comma, Python sees parentheses around a number -- not a tuple.
{: .prompt-warning }

### Unpacking

The most useful thing you can do with a tuple is unpack it -- assign each item to its own variable in one line. This is exactly what happens when you write `for name, score in scores.items()`.

{% include embed/python-training/python-editor.html id='dicts-tuples-tuple-unpack' source='dicts-tuples-tuple-unpack' %}

### Tuples vs Lists -- when to use which

Both are ordered sequences. The question is whether the data is meant to change.

| Use a list when... | Use a tuple when... |
|--------------------|---------------------|
| The collection will grow or shrink | The data is fixed and shouldn't change |
| Order matters but items are interchangeable | Each position has a specific meaning |
| You need `.append()`, `.remove()`, etc. | You want to signal "this is a record, not a collection" |

A list of users grows over time -- you add and remove entries. A single user's coordinates `(lat, lon)` is a tuple -- those two values belong together and neither should be swapped or overwritten independently.

{% include embed/python-training/python-editor.html id='dicts-tuples-tuple-vs-list' source='dicts-tuples-tuple-vs-list' %}

Immutability also has a practical side effect: tuples can be used as dictionary keys, lists cannot. Dict keys must be immutable, and tuples qualify. That's what makes things like `{(0, 0): "origin", (3, 4): "point B"}` valid.

---

## Conclusion

Lists, dictionaries, and tuples are the three workhorses of Python data. You now have all three.

Dictionaries are for named data -- any time you need to look something up by a label rather than a position. When you find yourself mentally mapping list indexes to meanings, that's a dict waiting to happen. Most structured data you'll encounter in the real world -- from files, APIs, databases -- arrives as a dictionary or a list of dictionaries.

Tuples are for data that belongs together and shouldn't change. They're lighter than lists and their immutability carries intent: these values are a fixed unit. You'll see them constantly as the pairs that come out of `.items()`, as return values from functions, and anywhere a record has a known, fixed shape.
