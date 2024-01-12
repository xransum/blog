---
title: Setup Github Copilot with VIM
author: xransum
date: 2024-01-12 12:59:00 -0500
categories:
  - Text Editor
tags:
  - linux
  - vim
pin: false
image:
  path: /commons/copilot-vim.png
  lqip: null
  alt: null
---


## Pre-requisites

- Install the latest version of [Vim](https://github.com/vim/vim) (9.0.0185 or newer).
- Install [NodeJS](https://nodejs.org/en/) (v20.2.0 or newer).


## Installing Latest Vim Version

Clone the Vim repository:
```bash
cd $HOME
git clone https://github.com/vim/vim.git
```

Change to the Vim source directory:
```bash
cd $HOME/vim/src
```

Configure make to use all available cores:
```bash
export NB_CORES="$(grep -c '^processor' /proc/cpuinfo)"
export MAKEFLAGS="-j$((NB_CORES+1)) -l${NB_CORES}"
```

Build Vim:
```bash
make
```

Run the Vim test suite:
```bash
make test
```

Install Vim:
```bash
sudo make install
```

Cleanup:
```bash
cd $HOME
rm -rf $HOME/vim
```

Verify Vim version:
```bash
vim --version
```


## Install NodeJS with NVM

If you already have NodeJS installed, you can skip this step.

Install Node Version Manager (NVM):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Verify NVM version:
```bash
nvm --version
```

List available NodeJS versions:
```bash
nvm list-remote
```

Install NodeJS:
```bash
nvm install v20.2.0
```

Verify NodeJS version:
```bash
node -v
```

Set default NodeJS version:
```bash
nvm alias default 20.2.0
```

Use default NodeJS version:
```bash
nvm use default
```

Verify NodeJS version:
```bash
node -v
```


## Install Copilot Vim Plugin

Dowload the Copilot Vim plugin:
```bash
git clone https://github.com/github/copilot.vim.git $HOME/.vim/pack/github/start/copilot.vim
```

Create a vimrc config file, if it doesn't already exist:
```bash
vim $HOME/.vimrc
```

Add the following to the vimrc config file:
```vim
" Fix backspace issues
set backspace=indent,eol,start

" Adds line numbers to editor gutter
set number

" Disables vi compatibility that could cause errors
set nocompatible

" Automatic filetype detection
filetype on

" The below line enables copilot
" Enable plugins and load plugin for the detected file type.

" Enable copilot
filetype plugin on

" Load filetype specific indentation
filetype indent on

" Syntax highlighting on
syntax on
```

Some optional configurations you can add to your vim config file:

Enable Copilot for specific filetypes, be sure to specify the filetype and not the file extension:
```vim
" Enable Copilot for specific filetypes
" See: https://github.com/github/copilot.vim/blob/1a55183ef9347d6f420406a3746474b6b9fb9ef5/doc/copilot.txt#L46
let g:copilot_filetypes = {
        \ 'python': v:true
\}
```

Disable Copilot for files larger than 100kb:
```vim
" Disable Copilot for files larger than 100kb
autocmd BufReadPre *
    \ let f=getfsize(expand("<afile>"))
    \ | if f > 100000 || f == -2
    \ | let b:copilot_enabled = v:false
    \ | endif
```

You should be able to save and exit Vim now.

## Setup Copilot

You will need to open Vim using your new vimrc config file. You can do this by running the following command:

```bash
vim
```


Once Vim is open, you can start the Copilot setup process by running the following command:
```vim
:Copilot Setup
```

This will open a browser window and prompt you to login to Github. Once you login, you will be prompted to authorize Copilot. Once you authorize Copilot, you will be given a code to paste into Vim. Paste the code into Vim and press enter. You should see a message that says "Copilot is ready to use!".

You can check the status of Copilot by running the following command:
```vim
:Copilot Status
```


### Using Copilot

Copilot will automatically start suggesting code as you type. To accept a suggestion, press `Ctrl + Space`. To reject a suggestion, press `Ctrl + E`. To undo a suggestion, press `Ctrl + Z`.


### Copilot Commands

| Command | Description |
| --- | --- |
| `:Copilot Setup` | Setup Copilot |
| `:Copilot Enable` | Enable Copilot |
| `:Copilot Disable` | Disable Copilot |
| `:Copilot Status` | Check Copilot status |
| `:Copilot ClearCache` | Clear Copilot cache |


## References

- [Github Copilot](https://copilot.github.com/)
- [Github Copilot for Vim](https://github.com/github/copilot.vim)
- [Vim](https://github.com/vim/vim)
- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [NodeJS](https://nodejs.org/en/)



