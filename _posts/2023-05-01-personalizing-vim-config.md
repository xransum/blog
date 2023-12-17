---
title: Personalizing Vim Config
author: xransum
date: 2023-05-01 06:58:47 -0500
categories:
  - Linux
tags:
  - tools
image:
  path: /commons/en-lan-2000-06.jpg
  lqip: null
  alt: null
---

Personalizing your Vim configurations can be an incredibly helpful and efficient way to optimize your coding experience. As someone who has been hacking for years, I've learned that every developer has their own unique style, preferences, and habits. Customizing your Vim configuration file, `.vimrc`, can help you tailor the editor to your specific needs and workflow.

Below, I'll provide an overview of some essential Vim configurations that I use and recommend:


## General Configurations

- `set number` \- displays line numbers on the left-hand side of the screen
- `set linebreak` \- breaks lines at words, which requires wrap lines to be enabled as well
- `set showbreak=+++` \- defines a prefix to use when a line is wrapped
- `set textwidth=100` \- sets the number of columns to wrap the line
- `set showmatch` \- highlights matching brace pairs
- `set spell` \- enables spell-checking
- `set errorbells` \- produces an audible or visible error message when you make a mistake
- `set visualbell` \- displays a visual indication instead of an audible beep

## Advanced Configurations

- `set ruler` \- shows the row and column ruler information

## Search Configurations

- `set hlsearch` \- highlights all search results
- `set smartcase` \- enables smart-case search
- `set ignorecase` \- makes searches case-insensitive by default
- `set incsearch` \- searches strings incrementally, highlighting matches as you type

## Indentation Configurations

- `set autoindent` \- automatically indents new lines to match the previous line
- `set expandtab` \- replaces tabs with spaces
- `set shiftwidth=4` \- sets the number of spaces for auto-indentation
- `set smartindent` \- enables smart-indentation
- `set smarttab` \- enables smart-tabs
- `set softtabstop=4` \- sets the number of spaces per Tab

## Visual Mode Configuration

- `set mouse-=a` \- disables visual mode when pasting from outside of the editor

In conclusion, customizing your Vim configurations can be a game-changer for your productivity and workflow. These are just a few of my recommended configurations to help personalize and streamline your Vim experience. Feel free to experiment and find what works best for you. 

Happy hacking!


Here's the contents of my `.vimrc`:
```
set number
set linebreak
set showbreak=+++
set textwidth=100
set showmatch
set spell
set errorbells
set visualbell
set hlsearch
set smartcase
set ignorecase
set incsearch
set autoindent
set expandtab
set shiftwidth=4
set smartindent
set smarttab
set softtabstop=4
set ruler
set undolevels=1000
set backspace=indent,eol,start
set mouse-=a
```