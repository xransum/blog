---
title: "Setup an SSH Server with VirtualBox"
excerpt: "Walkthrough on setting up an isolated SSH server within a local network."
categories:
  - Linux
tags:
  - Linux
  - VirtualBox
  - Networking
---


# Server Setup Steps

To enable SSH access to your VirtualBox virtual machine, follow these steps:

**Step 1**: Configure Network Settings

- Open VirtualBox and go to the Network Settings of your virtual machine.
- Select an available network adapter or replace an existing one.
- Set the **Network Adapter** mode to **Bridged** and choose your **Primary Network Adapter** as the **Bridge**.
- Under **Advanced**, make sure that **Promiscuous Mode** is set to **Allow All**.

**Step 2**: Set Up UFW Rules (If applicable)

Check if UFW (Uncomplicated Firewall) is active or disabled on your virtual machine by running the following command:

```bash
sudo ufw status
``` 

If UFW is inactive or disabled, you can skip this step. Otherwise, follow the instructions [Setting Up UFW Rules on the Firewall](#setting-up-ufw-rules-on-the-firewall).

**Step 3**: Install OpenSSH Server

Install the OpenSSH server on your virtual machine using the appropriate package manager:

For Ubuntu/Debian-based systems:

```bash
sudo apt update
sudo apt-get install openssh-server
```

For CentOS/RHEL-based systems:

```bash
sudo yum install openssh-server
``` 

**Step 4**: Enable SSH Server at Startup

To configure the SSH server to start automatically during boot, run the following command:

```bash
sudo systemctl enable ssh
``` 

If you ever want to remove the SSH server from startup, you can use the following command:

```bash
sudo systemctl disable ssh
``` 

**Step 5**: Start the SSH Server

Start the SSH server on your virtual machine with the following command:

```bash
sudo systemctl start ssh
``` 

### Setting Up Public Key Authentication

Public key authentication is preferred as it eliminates the need for password input each time a connection is established. Follow these steps to set up public key authentication:

**Step 1**: Create the SSH Directory

If you don't already have an `~/.ssh` directory on your virtual machine, create it using the following command:

```bash
mkdir -p ~/.ssh
``` 

**Step 2**: Set Directory Permissions

Set the proper permissions for the `~/.ssh` directory to allow the owner to read, write, and execute files within it:

```bash
chmod 700 ~/.ssh
``` 

**Step 3**: Generate an SSH Key Pair

To generate an SSH key pair on your virtual machine, run the following command:

```bash
ssh-keygen -t rsa -b 2048 -f ~/.ssh/id_rsa -C "" -N ""
```

If you want to set a password for your private key, remove the `-N ""` option.

Once the key pair is generated, copy the private key (`id_rsa`) to your host machine, preferably to your current user's `~/.ssh/` directory or `%USERPROFILE%/.ssh/` for Windows.

You can use one of the following methods to copy the private key:

**Method 1**: Manual Copy/Paste

On your virtual machine, display the contents of the private key and public key files:

```bash
cat ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub
``` 

Save the contents in the same location on your host machine:

```bash
~/.ssh/<vm-shortname>.id_rsa
~/.ssh/<vm-shortname>.id_rsa.pub
``` 

For Windows users:

```cmd
%USERPROFILE%/.ssh/<vm-shortname>.id_rsa
%USERPROFILE%/.ssh/<vm-shortname>.id_rsa.pub
``` 

**Method 2**: Use SCP Command

Copy the private key from your virtual machine to your host machine using the SCP command:

```bash
scp <username>@<ip-addr>:~/.ssh/id_rsa ~/.ssh/id_rsa
``` 

For Windows users:

```cmd
scp <username>@<ip-addr>:~/.ssh/id_rsa %USERPROFILE%/.ssh/id_rsa
``` 

**Step 4**: Transfer the Public Key to the Virtual Machine

Copy the public key from your host machine to your virtual machine:

```bash
scp ~/.ssh/id_rsa.pub <username>@<ip-addr>:~/.ssh/id_rsa.pub
``` 

For Windows users:

```cmd
scp %USERPROFILE%/.ssh/id_rsa.pub <username>@<ip-addr>:~/.ssh/id_rsa.pub
``` 

If you encounter any issues during the transfer, ensure that the `~/.ssh` directory on your virtual machine has the correct permissions:

```bash
chmod 700 ~/.ssh
``` 

**Step 5**: Add Public Key to `authorized_keys` File

On your virtual machine, append the contents of the public key file (`id_rsa.pub`) to the `~/.ssh/authorized_keys` file:

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
``` 

Ensure that the `authorized_keys` file has the correct permissions so that it is properly read during the connection:

```bash
chmod 600 ~/.ssh/authorized_keys
``` 

**Step 6**: Verify SSH Key Setup

From your host machine, establish an SSH connection to your virtual machine, specifying your private key:

```bash
ssh -i ~/.ssh/id_rsa <username>@<ip-addr>
```

For Windows users:

```cmd
ssh -i %USERPROFILE%/.ssh/id_rsa <username>@<ip-addr>
```

If you are prompted to provide a password while using the above command, it means your key pair is not working correctly.

Possible reasons for this issue include:

- The private key path provided in the command is invalid or doesn't exist on the host machine.
- The private key (`id_rsa`) on the host machine is not a valid pair for the public key on the virtual machine.
- The `~/.ssh` directory on the virtual machine does not have the correct `700` permissions.
- The `~/.ssh/authorized_keys` file on the virtual machine does not have the correct `600` permissions.
- The SSH configuration on the virtual machine has the `PubkeyAuthentication` variable set to "**no**" instead of its default "**yes**" (this can be fixed by following the steps below).

**Step 7**: Update SSH Server Configuration

Edit the SSH server configuration file using a text editor:

```bash
sudo vi /etc/sshd_config
``` 

Locate the `PubkeyAuthentication` line, remove the leading `#` if applicable, and set it to "**yes**":

```
PubkeyAuthentication yes
``` 

Scroll down and find the `PasswordAuthentication` line, change the value from "**yes**" to "**no**":

```
PasswordAuthentication no
``` 

Save the changes and exit the text editor.

**Step 8**: Restart the SSH Server

To apply the changes made to the SSH server configuration, restart the SSH server:

```bash
sudo systemctl restart ssh
``` 

### Setting Up UFW Rules on the Firewall

If UFW is active on your virtual machine, follow these steps to set up the necessary firewall rules:

**Step 1**: Check UFW Status

Verify the status of UFW by running the following command:

```bash
sudo ufw status
``` 

**Step 2**: Allow SSH Access

To allow SSH access through the firewall, add a rule to allow port 22:

```bash
sudo ufw allow 22
``` 

You can also allow SSH access using TCP or UDP specifically:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 22/udp
``` 

Alternatively, you can allow SSH access by specifying the service name:

```bash
sudo ufw allow ssh
``` 

This method utilizes the default port for SSH as specified in the `/etc/services` file.

Another option is to use UFW's built-in application profiles. List the available profiles using:

```bash
sudo ufw app list
``` 

Locate the profile specific to your SSH service and allow it:

```bash
sudo ufw allow OpenSSH
``` 

Finally, you can verify the added rules:

```bash
sudo ufw show added
``` 

These steps should help you set up an SSH server with VirtualBox and configure it for public key authentication.
