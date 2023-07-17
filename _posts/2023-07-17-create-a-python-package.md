---
title: Create a Python Package
excerpt: Learn how to create a Python Package for efficient code organization and reusability.
categories: 
    - Development
tags: 
    - Python
    - Packages
---

# Create a Python Package

Creating a Python package is a great way to organize your code and make it reusable across different projects. A package is a collection of modules that can be imported and used in other programs. In this tutorial, we will go through the steps of creating a Python package.

## What are we going to do?

1. Create a package (with a setup.py script)
2. Make it available on PyPI

## What does this do?

1. Allows us to easily install a Python script from a distribution:
   ```
   python3 setup.py install
   ```
2. Or install it from the Internet:
   ```
   pip install package_name
   ```

## What are we going to use?

- [Python 3](https://www.python.org/download/releases/3.0/) (it's nearly the same for Python 2)
- [distutils](https://docs.python.org/3/library/distutils.html) (packaging framework)
- [setuptools](https://pypi.python.org/pypi/setuptools) (Python Packaging Authority enhanced alternative)
- [PyPI](https://pypi.python.org/) (Python Package Index)

## Getting Started

### Directory Structure

#### Simple Mode

If you have a simple tool with **only 1 Python script file**, you can place the `.py` script file under the root folder.

```
└── example
    ├── example.py
    ├── LICENCE
    ├── README.md
    └── setup.py
```

#### Lib Mode

If you have a more complex tool with **several Python script files**, place the `.py` script files under a "lib" folder.

```
└── example
    ├── example
    │   ├── __init__.py
    │   ├── script.py
    │   └── main.py
    ├── LICENCE
    ├── README.md
    └── setup.py
```

Make sure to include a `__init__.py` file.

### Setup Script

- The distutils setup script is a Python script!
- Keep it simple to avoid bugs; exoticism is not needed.
- It describes the project's metadata.

#### The First Line

The first line of the distutils setup script will always be the same:

```python
from distutils.core import setup
```

This imports the `setup()` function, which takes some parameters.

#### Minimal Parameters

Only 3 fields are required:

- **name**: must be unique to publish on PyPI
- **version**: keeps track of different releases
- **url**: the home page address of the project (e.g., GitHub, Bitbucket, website, PyPI page, ...)

### Other Parameters

You can add additional parameters to the setup script:

- **description**: one-line summary of the project
- **long_description**: multi-line string in [reStructuredText](http://docutils.sourceforge.net/rst.html) (PyPI converts it to HTML and displays it on the package page)
- **author**: author name
- **author_email**: author email
- **maintainer**: maintainer name
- **maintainer_email**: maintainer email
- **license**: license name
- **keywords**: keywords
- **classifiers**: list of PyPI categories (more details later)

Differentiate the source code from other files using:

- **py_modules** or **packages**: describes where the Python source code is located
    - **py_modules**: for a single-file Python script
    - **packages**: for a multi-file Python script

Additional metadata can be found in the [Python documentation](https://docs.python.org/3/distutils/setupscript.html#additional-meta-data).

To classify the package, use the `classifiers` parameter of the `setup()` function. This contains a list of strings. All classifier strings must match the [PyPI classifiers list](http://pypi.python.org/pypi?:action=list_classifiers).

### Manifest

By default, Distutils only includes certain files in the release package. To include additional files (e.g., `LICENCE`, `NOTICE`, `README.md`, or a `docs/` documentation folder), create a `MANIFEST.in` file in the project's root directory.

The Manifest file is not a Python script and allows you to include or exclude files and directories. It maintains the directory structure.

### Setup.cfg

If you're using a Markdown readme file, create a `setup.cfg` file in the project's root directory. This file is not a Python script. It allows you to specify the path to the `README.md` file.

### Checking the Setup Script

Distutils has a built-in validation command:

```
python3 setup.py check
```

## Creating a Source Distribution

To create a source distribution containing the source code, setup script, README file, and additional files from the MANIFEST, run the following command:

```
python3 setup.py sdist
```

This will create a `dist/` folder in your project directory with a `package_name.tar.gz` archive inside it (or a `.zip` file for Windows users).

## PyPI

PyPI is the Python Package Index, which contains thousands of Python libraries and tools. Publishing your package on PyPI allows easy distribution and installation.

To make it easier to upload packages, create a `~/.pypirc` file in your home directory with your PyPI account information.

### Register the Package

To register the package project, run the following command:

```
python setup.py register -r pypi
```

### Upload the Package

To upload the package distribution, run the following command:

```
python setup.py sdist upload -r pypi
```

You can also upload the package to PyPI's test server first:

```bash
python setup.py register -r pypitest
python setup.py sdist upload -r pypitest
```

## Git Tips

If your package's source code is hosted on a Git repository:

- Use a `.gitignore` file to avoid uploading unnecessary files (e.g., `dist/` or `build/` folders) to the remote Git repository.
- If your Git remote repository is GitHub, you can use `git tag` to generate and host the package:
   ```
   git tag 0.1 -m "message"
   git push --tags origin master
   ```

## Conclusion

In this tutorial, we learned how to create a Python package. We also learned how to make it available on PyPI. We hope you found this tutorial helpful. If you have any questions, please feel free to reach out to us on [Twitter](https://twitter.com/linode).

## References

- [Dive into Python 3](http://www.diveintopython3.net/packaging.html)
- [Distutils documentation](https://docs.python.org/3/distutils/index.html)
- [Python Package Index (PyPI)](https://pypi.python.org/pypi)
- [The Hitchhiker's Guide to Packaging](http://the-hitchhikers-guide-to-packaging.readthedocs.io/en/latest/quickstart.html)
