---
title: "Setting Up Python Virtual Environment"
subtitle: "Steps on setting up a Python virtual environment on your server or any other Linux-based machine."
categories:
  - Programming
---

Developing software with Python often involves setting up Python on your local machine, installing required libraries via the terminal, writing code in a single .py file or notebook, and running the program in the terminal. This approach is commonly followed by beginners and those transitioning from Python for data analytics.

While this method works well for simple scripting projects, it may become challenging when dealing with complex software development projects. For instance, when building a Python library, an API, or a software development kit, you often work with multiple files, packages, and dependencies. In such cases, it becomes necessary to isolate your Python development environment specific to that project.

Imagine a scenario where you are working on Application A using your system-installed Python and have installed Package X Version 1.0 globally. Later, you switch to Project B on your machine and install Package X Version 2.0, which introduces significant changes from Version 1.0.

When you return to run Application A, you now encounter various errors, and the application fails to run. This situation is not uncommon when working with Python software development. To address this issue, virtual environments come to the rescue.

Don't want to read through the whole post? You can jump to the [TLDR](#tldr) section.

### What is a Python Virtual Environment?

Virtual environments are isolated Python environments that allow you to install packages and dependencies without affecting your system-installed Python. You can create multiple virtual environments on your machine, each with its own Python version and package dependencies.


### Installation

To get started with virtual environments, you need to first have a version of Python installed on your machine. I've made a post on [How to Install a Custom Python Version]({{ base.url | prepend: site.url }}/install-custom-python-version/) on your server or any other Linux-based machine.

Once you've installed Python, you can use the following command to create a virtual environment:

```bash
$ python3 -m venv myenv
```

This command creates a virtual environment named `myenv` in the current directory. You can replace `myenv` with any name you want.

However, the more common approach is to create a virtual environment in a separate directory. To do this, you can use the following command:

```bash
$ python3 -m venv .venv
```

This command creates a virtual environment named `.venv` in the current directory. You can replace `.venv` with any name you want.

Now that you've created a virtual environment, you can activate it by running the following command:

```bash
$ source .venv/bin/activate
```

This command activates the virtual environment named `.venv` in the current directory. You can replace `.venv` with any name you want.

Once you've activated the virtual environment, you can install packages and dependencies using `pip`:

```bash
$ pip install requests
```

This command installs the `requests` package in the virtual environment named `.venv` in the current directory. You can replace `.venv` with any name you want.

If you want to store all of the packages and dependencies in a `requirements.txt` file, you can use the following command:

```bash
$ pip freeze > requirements.txt
```

This command creates a `requirements.txt` file in the current directory with all of the packages and dependencies installed in the virtual environment named `.venv`. You can replace `.venv` with any name you want.

To deactivate the virtual environment, you can run the following command:

```bash
$ deactivate
```

## TLDR

```bash
$ python3 -m venv .venv           # create virtual environment named .venv
$ source .venv/bin/activate       # activate virtual environment named .venv
$ pip install requests            # install requests package
$ pip freeze > requirements.txt   # create requirements.txt file with all installed packages and dependencies
$ deactivate                      # deactivate virtual environment
```

## Conclusion

Virtual environments are a great way to isolate your Python development environment specific to a project. They allow you to install packages and dependencies without affecting your system-installed Python. You can create multiple virtual environments on your machine, each with its own Python version and package dependencies.

**Happy coding!**
