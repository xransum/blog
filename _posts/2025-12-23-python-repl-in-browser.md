---
title: Python REPL (in-browser)
author: xransum
date: 2025-12-23 10:00:00 -0500
categories:
  - Tutorial
tags:
  - learning
  - python
pin: false
image:
  path: /commons/python-repl.png
  lqip: null
  alt: null
---

<link rel="stylesheet" href="https://pyscript.net/releases/2025.11.2/core.css">
<script type="module" src="https://pyscript.net/releases/2025.11.2/core.js"></script>

## Python REPL (in-browser)

This is a simplified integration of a Python REPL (Read-Eval-Print Loop) using PyScript. You can type Python code into the input area, and it will be executed in the browser. The output or any errors will be displayed below the input area.

<script type="py" terminal worker>
import codeop
import traceback

banner = "PyScript REPL (worker). Use exit()/quit to leave."
print(banner)

compiler = codeop.CommandCompiler()
buf = []
g = {}

while True:
    try:
        prompt = "... " if buf else ">>> "
        line = (await input(prompt))
    except EOFError:
        break

    if not buf and line.strip() in ("exit()", "quit()", "exit", "quit"):
        print("bye")
        break

    buf.append(line)
    src = "\n".join(buf)

    try:
        codeobj = compiler(src)  # None => needs more input
    except SyntaxError:
        traceback.print_exc()
        buf.clear()
        continue

    if codeobj is None:
        continue

    buf.clear()
    try:
        exec(codeobj, g, g)
    except Exception:
        traceback.print_exc()
</script>

