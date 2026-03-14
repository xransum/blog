---
title: Python Challenges
author: xransum
date: 2026-03-13 10:00:00 -0500
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

You've got the building blocks. Now put them to use.

Each challenge below gives you a problem, the expected output, and a starter editor to work in. There's no single right answer -- if your code produces the correct output, it's correct. Once you're done (or if you're stuck), expand the solution to see two different approaches and how they compare.

---

## Challenge 1: FizzBuzz

Loop through the numbers 1 to 20. For each number:

- Print `"Fizz"` if it is divisible by 3
- Print `"Buzz"` if it is divisible by 5
- Print `"FizzBuzz"` if it is divisible by both
- Otherwise print the number itself

**Expected output:**

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
```

Give it a shot:

{% include embed/python-training/python-editor.html id='challenges-fizzbuzz-starter' source='challenges-fizzbuzz-starter' %}

<details class="spoiler">
<summary>Show solution</summary>

<p class="spoiler-section">Approach A -- if/elif/else chain</p>

Check the combined case first, then each condition individually. The order matters: if you checked `% 3` first you'd print "Fizz" for 15 before ever reaching the "FizzBuzz" branch.

{% include embed/python-training/python-editor.html id='challenges-fizzbuzz-solution-a' source='challenges-fizzbuzz-solution-a' %}

<p class="spoiler-section">Approach B -- build a result string</p>

Each condition appends to a string independently. Because both `% 3` and `% 5` run on every iteration, "Fizz" and "Buzz" combine into "FizzBuzz" automatically -- no special case needed.

{% include embed/python-training/python-editor.html id='challenges-fizzbuzz-solution-b' source='challenges-fizzbuzz-solution-b' %}

<p class="spoiler-note">Approach A is easier to read at a glance. Approach B is shorter and handles the combined case without an explicit check -- a small example of letting logic do the work instead of spelling it out.</p>

</details>

---

## Challenge 2: Reverse a List

Given the list below, print each number on its own line in reverse order -- without just calling `reversed()` or `.reverse()`.

```python
numbers = [1, 2, 3, 4, 5]
```

**Expected output:**

```
5
4
3
2
1
```

Give it a shot:

{% include embed/python-training/python-editor.html id='challenges-reverse-starter' source='challenges-reverse-starter' %}

<details class="spoiler">
<summary>Show solution</summary>

<p class="spoiler-section">Approach A -- slicing</p>

`[::-1]` steps through the list from the last index to the first. Concise and idiomatic Python.

{% include embed/python-training/python-editor.html id='challenges-reverse-solution-a' source='challenges-reverse-solution-a' %}

<p class="spoiler-section">Approach B -- loop with range() counting backwards</p>

`range(len(numbers) - 1, -1, -1)` generates indexes from the last position down to 0. More explicit -- you can see exactly what's happening at each step.

{% include embed/python-training/python-editor.html id='challenges-reverse-solution-b' source='challenges-reverse-solution-b' %}

<p class="spoiler-note">Both produce the same output. The slicing approach is more concise and what most Python programmers would reach for. The loop approach makes the mechanics visible -- which is worth understanding even if you end up using slicing in practice. Neither is wrong.</p>

</details>

---

## Challenge 3: Grade Calculator

Write a function called `get_grade` that takes a score (0-100) and returns the corresponding letter grade:

| Score | Grade |
|-------|-------|
| 90+   | A     |
| 80+   | B     |
| 70+   | C     |
| 60+   | D     |
| below 60 | F  |

**Expected output:**

```
A
B
C
D
F
```

Give it a shot:

{% include embed/python-training/python-editor.html id='challenges-grade-starter' source='challenges-grade-starter' %}

<details class="spoiler">
<summary>Show solution</summary>

<p class="spoiler-section">Approach A -- if/elif/else chain</p>

Straightforward and easy to read. Each condition maps directly to a row in the table above.

{% include embed/python-training/python-editor.html id='challenges-grade-solution-a' source='challenges-grade-solution-a' %}

<p class="spoiler-section">Approach B -- thresholds in a list</p>

The grade boundaries live in a list of pairs. The function loops through them and returns the first grade whose minimum the score meets. Adding a new grade band means adding one line to the list -- not a new `elif`.

{% include embed/python-training/python-editor.html id='challenges-grade-solution-b' source='challenges-grade-solution-b' %}

<p class="spoiler-note">Approach A is probably where your head went first, and there's nothing wrong with it. Approach B uses a list of pairs to drive the logic. When you find yourself writing a long chain of nearly-identical conditions, it's often a sign the data belongs in a list.</p>

</details>

---

## Conclusion

Three challenges, and likely more than three solutions between you and the two examples. That's the point -- there's rarely one right way to write a program. What matters is that your code is correct, readable, and you understand why it works.

The more you write, the more your instincts about which approach fits a situation will sharpen. Keep experimenting.
