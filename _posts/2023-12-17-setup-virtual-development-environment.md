---
title: Setup Virtual Development Environment
author: xransum
date: 2023-12-7 01:05:00 -0500
categories:
  - Development
  - Virtual Environments
tags:
  - environments
  - programming
  - linux
pin: true
image:
  path: /commons/virtual-iris.png
  lqip: null
  alt: null
---

## Hypervisor Setup

A hypervisor in it's simplest form is software used to manage and run virtual machines.

I can't harp enough on how much I love [VirtualBox](https://www.virtualbox.org/), it's free, open-source, and really enabling bidirectional copy-pasta's is a godsend. VMware is also a good alternative, but I've never returned since the time they made the clipboard feature a paid feature.

> Download and install [VirtualBox](https://www.virtualbox.org/wiki/Downloads).
{: .prompt-tip }

I would also recommend installing the VirtualBox's Extension Pack, it adds a lot of useful features, one of which is the Guest Additions. The Guest Additions is a set of drivers and software that will allow you to install the necessary drivers for your VMs, it will allow you to resize your VM window and enable bidirectional copy-pasta's.

> Download and install [VirtualBox Guest Additions](https://www.virtualbox.org/manual/ch04.html).
{: .prompt-tip }

## Virtual Machine Setup

A virtual machine is really just a regular computer that is completely virtual and managed by the hypervisor.

You can use any operating system installation iso image to create a virtual machine, as long as you have the resources to support the minimal requirements. If you have experience with it, you can use [DistroWatch](https://distrowatch.com/) and [Linux Distribution Timeline](https://en.wikipedia.org/wiki/List_of_Linux_distributions) for finding other distributions.

However, for the sake of this write-up I'm going to stick to and recommend **Ubuntu 22.2**. 

## Creating a Virtual Machine

To kick this off, you should download **Ubuntu 22 LTS**, you can download the ISO image from the following link:

> Download [Ubuntu 22 LTS](https://ubuntu.com/download/desktop).
{: .prompt-tip }

Now that you have your ISO image, you can create your virtual machine.

Once you've opened **VirtualBox**, you can create your virtual machine by clicking on `New` to create a new virtual machine.

A popup will appear, fill out the following:

> **Virtual Machine Name and Operating System**
> - Name: `vm-ubuntu-1`
> - Folder: `Default`
> - ISO Image: `Select the Ubuntu ISO image you downloaded`
> - Edition: `Default` (Greyed out)
> - Type: `Linux` (Greyed out)
> - Version: `Ubuntu (64-bit)` (Greyed out)
> - Skip Unattended Installation: `CHECKED` (**DO NOT UNCHECK THIS BOX**) For Ubuntu checking this will NOT set the root password and will not add you to sudoers.
{: .prompt-info }

After you've filled out the above, click `Next` to continue. You will now be prompted to select your hardware settings.

> **Hardware**
> - Base Memory: `1024 MB` (Recommended between `4096 MB` to `8192 MB` for a dev machine).
> - Processors: `1 CPU` (Recommended between `2 CPU` to `4 CPU` for a dev machine, too many can cause lag).
> - Enable EFI (special OSes only): `UNCHECKED` *(unless you're installing macOS)*
{: .prompt-info }

After you've filled out the above, click `Next` to continue. You will now be prompted to select your virtual hard disk settings.

> **Virtual Hard Disk**
> - Hard disk: `Create a virtual hard disk now`
> - Disk Size: `25.00 GB` (Recommended between `50.00 GB` to `100.00 GB` for a dev machine, or more).
>  - Pre-allocate Full Size: `UNCHECKED`
{: .prompt-info }

After you've filled out the above, click `Next` to continue. You will now be prompted with a summary of your settings, click `Finish` to create your VM.

Now on your **VirtualBox Manager**, select your newly created VM from the panel and click on `Settings`.

You need to update your Network Adapter settings:

> **Settings Menu:**
> - **Network Adapter:**
>   - Attached to: `Bridged Adapter`
>   - Name: `Select the network adapter that is connected to your local host`
>   - **Advanved:**
>     - Promiscuous Mode: `Allow All`
>     - MAC Address: `Default`
>     - Cable Connected: <input type="checkbox" checked readonly />
>     - Port Forwarding: `EMPTY`
{: .prompt-info }

Click on `OK` to save your network adapter settings.

This next step is optional, this is primarily for users who are intending to use the GUI for their VM and want to have a better experience.

You can also update your Display settings:

> **Settings Menu:**
> - **Display:**
>   - **Screen:**
>     - Video Memory: `128 MB` (Recommended between `256 MB` to `512 MB` for a dev machine).
>     - Graphics Controller: `VMSVGA`
{: .prompt-info }

Click on `OK` to save your display settings.

Another optional, yet highly recommended step is to update your **Shared Clipboard settings**:

> **Settings Menu:**
> - **General**
>   - **Advanced:**
>     - Shared Clipboard: `Bidirectional`
{: .prompt-info }

Click on `OK` to save your shared clipboard settings.


## Instance First Startup

Finally, you can start your VM by clicking on `Start`.

Sometimes, but not always, you may get a popup asking you to select your boot media. If you do, then you can select your ISO image and click on `Start`.

You should now be greeted with the Ubuntu installation screen.

> **Setup Menus:**
> 1. Select your language and press `ENTER`.
> 2. Select **Install Ubuntu Desktop** and press `ENTER`.
> 3. Select your language and press `ENTER`.
> 4. Select your keyboard layout and press `ENTER`.
> 5. Select **Normal installation** and press `ENTER`.
> 6. Select **Download updates while installing Ubuntu** and press `ENTER`.
> 7. Select **Erase disk and install Ubuntu** and press `ENTER`.
> 8. Select **Continue** and press `ENTER`.
> 9. Select your **timezone** and press `ENTER`.
> 10. Select your **keyboard** layout and press `ENTER`.
> 11. Enter your user details:
>     - Your name: `username`
>     - Your computer's name: `vm-ubuntu-1`
>     - Pick a username: `username`
>     - Choose a password: `password`
>     - Confirm your password: `password`
> 12. Log in automatically: `UNCHECKED`
>   > This is entirely user preference, if you setup an SSH server then you will almost never need to login to your VM directly if you really like the CLI. Once your VM is on, you can SSH into it.
>   {: .prompt-tip }
> 13. Select `Continue` and press `ENTER`.
{: .prompt-info }

Once you've completed the above steps, you can now wait for the installation to finish.

> **Note**: This may take a while, so you can go grab a coffee or something.
{: .prompt-tip }

Once the installation is complete, you will be prompted to restart your VM.

> **Note**: You can restart your VM by clicking on the `Machine` menu and selecting `Reset`.
{: .prompt-tip }

Once your VM has restarted, you will be prompted to login.

> 1. Enter your password and press `ENTER`.
> 2. You will be prompted to enter your password again, enter your password and press `ENTER`.
{: .prompt-info }

You should now be greeted with the Ubuntu desktop.

> **Note**: If you're using a VM with a GUI, you can resize your VM window to your liking. If you're using a VM without a GUI, you can skip this step.
{: .prompt-tip }

You can now shutdown your VM by clicking on the `Power` icon on the top right corner of the screen and selecting `Power Off`.

> **Note**: You can also shutdown your VM by clicking on the `Machine` menu and selecting `ACPI Shutdown`.
{: .prompt-tip }


### Initial Setup and Configuration

Now that you have your VM setup, you can start using it. We can start off by updating your system, since your packages and system updates are a bit behind since they created the ISO image.

1. Open a terminal with `CTRL+ALT+T`.
2. Update your system.
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```
3. If you get an error like `user is not in the sudoers file`, then you have two options.

> **Option 1**: Add your yourself to sudoers group.
> 1. First drop into root user shell.
>    ```bash
>    sudo su -
>    ```
> 2. Add your user to the sudoers file.
>    ```bash
>    usermod -aG sudo <username>
>    ```
>    or
>    ```bash
>    adduser <username> sudo
>    ```
> 3. Exit the root user shell.
>    ```bash
>    exit
>    ```
> 4. Restart your VM.
>    ```bash
>    sudo reboot
>    ```
{: .prompt-tip }

> **Option 2**: Manually add your user to the sudoers file.
> 1. Open the sudoers file.
>    ```bash
>    sudo nano /etc/sudoers
>    ```
> 2. Add the following line to the end of the file.
>   ```bash
>    <username> ALL=(ALL) NOPASSWD:ALL
>    ```
> 3. Save the file with `CTRL+O` and exit with `CTRL+X`.
> 4. Restart your VM.
>    ```bash
>    sudo reboot
>    ```
{: .prompt-tip }

4. Install required dependencies for future steps.

```bash
sudo apt install -y make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev \
libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl git
```