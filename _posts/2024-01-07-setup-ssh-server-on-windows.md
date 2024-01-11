---
title: Setup SSH Server on Windows
author: xransum
date: 2024-01-07 00:01:02 -0500
categories:
  - Development
tags:
  - environments
  - windows
pin: false
image:
  path: /commons/ssh.jpg
  lqip: null
  alt: null
---

Since Windows 10's 1709 update, they've added a built-in ssh client and server, making it surprisingly easy to set up. Unlike before, with the Windows Subsystem for Linux (WSL), native support for remote execution was lacking, forcing users to resort to less-than-ideal third-party solutions like **Psexec** and **WinRM**, each with its own limitations.

Microsoft's OpenSSH for Windows is actually an open-source solution, available on [GitHub](https://github.com/PowerShell/Win32-OpenSSH). It's designed for easy configuration through a `sshd_config` file, much like Linux SSH servers, but with additional Windows-specific features. It even uses the same variables as Linux SSH servers for a familiar experience.

**Yea, so?** Well, prior to this release, our go-to was RDP, which, though GUI-friendly, lacked the ability to run remote commands on your machine without resorting to 3rd-party software. With the introduction of Microsoft's OpenSSH for Windows, we finally have a native solution that bridges that gap, making remote execution more seamless and less dependent on external tools. It's a game-changer for those who prefer command-line efficiency.


## Install OpenSSH Client

To check the status of the feature, use the following command:
```powershell
Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Client*'
```

If you see the following output, it means you'll need to enable it:
```powershell
PS C:\Users\User> Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Client*'


Name  : OpenSSH.Client~~~~0.0.1.0
State : Uninstalled
```

To do so, use the following command:
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Now if you recheck it, you should see this:
```powershell
PS C:\Users\User> Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Client*'


Name  : OpenSSH.Client~~~~0.0.1.0
State : Installed
```

Now we can move on to enabling the server.


## Install OpenSSH Server

First, check if it's installed already:
```powershell
Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Server*'
```

If you see the following output, it means you'll need to enable it:
```powershell
PS C:\Users\User> Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Server*'


Name  : OpenSSH.Server~~~~0.0.1.0
State : Uninstalled
```

Enable it, if necessary:
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Recheck to see if it was successful:
```powershell
PS C:\Users\User> Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Server*'


Name  : OpenSSH.Server~~~~0.0.1.0
State : Installed
```

## Setup the OpenSSH Server

Once the OpenSSH server installation is complete (considering you've also run this for the `OpenSSH.Client`), then we can start the server.

To start the sshd service following PowerShell commands:
```powershell
Start-Service sshd
```

Verify the service status:

```powershell
Get-Service sshd
```

To check if the server is running, you can use the **netstat** command:
```powershell
netstat -na | Select-String ":22.*LISTENING"
```

You should spot something like this in your output:
```powershell
PS C:\Users\User> netstat -na | Select-String ":22.*LISTENING"        

  TCP    0.0.0.0:22             0.0.0.0:0              LISTENING
  TCP    [::]:22                [::]:0                 LISTENING       
```

Here's the catch: after a system reboot, you'll need to use the `Start-Service sshd` command to get the service running again.

But, to save you from that hassle, let's make it automatic. Run the following command:

```powershell
Set-Service -Name sshd -StartupType 'Automatic'
```

Now, whenever your machine boots up, the service will start on its own. No need for manual intervention.

As the SSH server functions as a Windows Service, if you were to open `services.msc`, you could find it by the name "**OpenSSH SSH Server**".


#### Configure the Firewall

Don't forget, since SSH works through port 22, make sure your firewall allows incoming traffic on that port. When handling security, think about limiting SSH access to your Windows machine by using public keys instead of passwords or adopting other security measures that suit your preferences.

To check if you have the correct firewall rules set on your windows machine using:
```powershell
Get-NetFirewallRule -Name *OpenSSH-Server* | Select Name, DisplayName, Description, Enabled
```

If you already have it added, then you should see this:
```powershell
PS C:\Users\User> Get-NetFirewallRule -Name *OpenSSH-Server* | Select 
Name, DisplayName, Description, Enabled

Name                  DisplayName               Description
----                  -----------               -----------
OpenSSH-Server-In-TCP OpenSSH SSH Server (sshd) Inbound rule for Op...
```

Otherwise, set the firewall rule with the following command:
```powershell
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH SAH Server' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

#### Changing the Default Shell

By default, the OpenSSH server uses the Windows command prompt (`cmd.exe`) as the default shell. If you prefer to use PowerShell, you can change it by adding a registry key.

To do so, run the following command:
```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```

Now, when you connect to your Windows machine via SSH, you'll be greeted with PowerShell instead of the command prompt.


#### Configure the SSH Server

The OpenSSH server configuration file is located at `C:\ProgramData\ssh\sshd_config`. You can edit it with your favorite text editor, but make sure you **run it as an administrator**.

You can also use the following command to open it in Notepad:
```powershell
Start-Process notepad "${env:ProgramData}\ssh\sshd_config" -Verb runAs
```

We should start by disabling password authentication. This is a security measure that prevents brute-force attacks. To do so, find the following line and change it to `no`:

```powershell
PasswordAuthentication no
```

If the above line begins with a `#`, remove it to uncomment it, OpenSSH requires that the option be explicitly set to `no` to disable password authentication.

Next, we'll enable public key authentication. This is a more secure way to authenticate with your Windows machine. To do so, find the following line and change it to `yes`:

```powershell
PubkeyAuthentication yes
```

Now, we'll enable the `AuthorizedKeysFile` option. This option tells the server where to look for the public keys. By default, it's set to `.ssh/authorized_keys`, which is the user's home directory.

> **Important:** If your user account is an **Administrator**, you have `PubkeyAuthentication` enabled, then the SSH server instead of looking for the public keys in the user's home directory, it will look for them in the `C:\ProgramData\ssh\administrators_authorized_keys` file. This is a security measure to prevent users with administrative privileges from logging in with their public keys.
>
> However, if you want to change this behavior, you can do so by commenting out the following lines in the `sshd_config` file.
>
> ```powershell
> #Match Group administrators
> #    AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
> ```
{: .prompt-danger }

Now that we've enabled public key authentication, we need to generate a key pair. To do so, we'll use the `ssh-keygen` command. If you don't have it installed, it actually comes pre-installed with the OpenSSH client. So, if you haven't already installed it, you can do so by following the instructions under [Install OpenSSH Client](#install-openssh-client).

To generate a key pair, run the following command:
```powershell
ssh-keygen -t rsa -b 4096 -C "" -f "${env:USERPROFILE}\.ssh\id_rsa"
```

This command will generate two files: `id_rsa` and `id_rsa.pub`. The first is the private key, and the second is the public key. The public key is safe to share with others, but the private key should be kept secret.

Now, we need to add the public key to the `authorized_keys` file. To do so, run the following command:
```powershell
Add-Content -Path "${env:USERPROFILE}\.ssh\.authorized_keys" -Value (Get-Content "${env:USERPROFILE}\.ssh\id_rsa.pub")
```

Now, we need to restart the SSH server for the changes to take effect. To do so, run the following command:
```powershell
Restart-Service sshd
```

Now, we can test our configuration by connecting to our Windows machine via SSH. To do so, run the following command:
```powershell
ssh localhost
```

If everything went well, you should be greeted with a PowerShell prompt. If you're prompted for a password, then something went wrong. Check the `sshd_config` file for any typos or mistakes.

If you're greeted with a message like this:
```powershell
PS C:\Users\User> ssh localhost

The authenticity of host 'localhost (::1)' can't be established.
ECDSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.

Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Then, it means that the SSH server is working, but you haven't added your public key to the `administrators_authorized_keys` file. To do so, run the following command:
```powershell
Add-Content -Path "${env:ProgramData}\ssh\administrators_authorized_keys" -Value (Get-Content "${env:USERPROFILE}\.ssh\id_rsa.pub")
```

Now, try connecting again. If everything went well, you should be greeted with a PowerShell prompt.


#### Ensuring SSH Keys are Properly Permitted

This is not entirely necessary and has been found to cause issues with some users, but if you're having trouble connecting to your Windows machine via SSH, you can try the steps in the below spoiler.

> **Continue with caution.**
>
> It is very important to ensure that the permissions on the SSH keys are set properly. You should be fine, however there are slight uncertainties when using Windows. To ensure that ONLY your user account and the SYSTEM account have access to the SSH keys, run the following commands:
> 
> ```powershell
> # List of files to apply permissions to
> $fileList = @(
>     "${env:USERPROFILE}\.ssh\id_rsa",
>     "${env:USERPROFILE}\.ssh\id_rsa.pub",
>     "${env:USERPROFILE}\.ssh\authorized_keys"
> )
> # Loop through each file in the list
> foreach ($file in $fileList) {
>     icacls "$file" /inheritance:r  # Remove inherited permissions
>     icacls "$file" /grant:r "$($env:USERNAME):(F)"  # Grant full access to the current user
>     icacls "$file" /grant:r "SYSTEM:(F)"  # Grant full access to the SYSTEM account
>     icacls "$file" /deny "*S-1-1-0:(F)"  # Deny full access to the Everyone group
> }
> ```
{: .prompt-warning }


#### Configuring OpenSSH Logs

For Windows, SSH server connection logs default to Event Tracing for Windows (ETW), not text files. To check these logs, go to the Event Viewer (`eventvwr.msc`), then navigate to **Application and Service Logs** > **OpenSSH** > **Operational**.

If you attempted to connect to your Windows machine via SSH, using a password, you'll see something like this:
```
EventID: 4
sshd: Accepted password for root from 192.168.1.53 port 65749 ssh2     
```

For public key authentication, you'll see something like this:
```
sshd: Accepted publickey for User from 192.168.1.53 port 61426       
ssh2: ED25519 SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  
```

However, if you prefer to have your logs in a plain text file, you can do so by editing the `sshd_config` file. To do so, open the `sshd_config` file with your favorite text editor, and add the following lines:

```powershell
# Logging
SyslogFacility LOCAL0
LogLevel INFO
```

Now, restart the SSH server for the changes to take effect. To do so, run the following command:
```powershell
Restart-Service sshd
```

Now, you should see the logs in the following file: `C:\ProgramData\ssh\logs\sshd.log`.


#### Testing the SSH Server

Now that we've configured the SSH server, we can test it by connecting to it from another machine. If you're using Linux or macOS, you can use the built-in SSH client. If you're using Windows, you can use the built-in SSH client, or you can install a third-party client like [PuTTY](https://www.putty.org/).

Including the `.local` root domain in the example ensures seamless connectivity within your local network, avoiding any hiccups from devices connected via VPN.

```bash
$ ssh User@testbox.local

Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Try the new cross-platform PowerShell https://aka.ms/pscore6

PS C:\Users\User>
```


## Conclusion

Now that you have your SSH server up and running, you can connect to it from any machine that has an SSH client installed. If you're using Linux or macOS, you can use the built-in SSH client. If you're using Windows, you can use the built-in SSH client, or you can install a third-party client like [PuTTY](https://www.putty.org/).

If you're using Windows, you can use the built-in SSH client, or you can install a third-party client like [PuTTY](https://www.putty.org/).

If you're using Windows, you can use the built-in SSH client, or you can install a third-party client like [PuTTY](https://www.putty.org/).
