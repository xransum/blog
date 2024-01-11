---
title: Manage VMs with VirtualBox CLI
author: xransum
date: 2024-01-07 00:01:02 -0500
categories:
  - Development
tags:
  - environments
  - windows
pin: false
image:
  path: /commons/oracle-vbox-cli.png
  lqip: null
  alt: null
---


Delving deeper into the capabilities of Oracle VM VirtualBox, we find that **VBoxManage** serves as the command-line gateway, as introduced in greater detail in [Section 1.18, “Alternative Front-Ends”](https://www.virtualbox.org/manual/ch01.html#frontends "1.18. Alternative Front-Ends"). Positioned as the command-line interface to Oracle VM VirtualBox, **VBoxManage** empowers users to exercise comprehensive control over the virtualization platform directly from the command line of their host operating system.

While the graphical user interface provides a user-friendly interface for managing Oracle VM VirtualBox, **VBoxManage** transcends these boundaries, offering not only parity with GUI features but extending its support to a myriad of additional functionalities. Unveiling the full spectrum of the virtualization engine's capabilities, **VBoxManage** becomes the conduit to features that lie beyond the reach of the graphical interface, providing users with a robust and versatile toolset for virtualization management.

Unlock the full potential of **VBoxManage** when you find yourself needing to:

1. Employ an alternative user interface, such as the VBoxHeadless server, for a different VirtualBox experience.
2. Take command of advanced and experimental configuration settings for your virtual machines, surpassing the limits imposed by the graphical interface.

Embrace the command line for a richer, more versatile VirtualBox experience, where **VBoxManage** becomes your gateway to unparalleled control and configuration.

## Setup

Interesting enough, **VBoxManage** comes pre-installed with Oracle VM VirtualBox, so there's no need to install anything extra. Simply launch the command-line interface of your host operating system and you're ready to go.

However, for the command to be recognized, you'll need to add the path to the **VBoxManage** executable to your system's PATH environment variable. This will allow you to execute the command from any directory on your system.

**VBoxManage** can actually be found in the same directory as the VirtualBox executable, which is typically located in the following directory:
```
C:\Program Files\Oracle\VirtualBox
```

To add the path to the **VBoxManage** executable to your system's PATH environment variable, follow these steps:

1. Press **Windows Key + R** to open the **Run** dialog.
2. Type `sysdm.cpl` and press **Enter** to open the **System Properties** dialog.
3. Navigate to the **Advanced** tab.
4. Click the **Environment Variables** button.
5. Under **System variables**, select the **Path** variable and click **Edit**.
6. Click **New** and enter the path to the **VBoxManage** executable, which is typically located in the following directory:
    ```
    C:\Program Files\Oracle\VirtualBox
    ```
7. Click **OK** to save your changes.
8. Click **OK** to close the **Environment Variables** dialog.
9. Click **OK** to close the **System Properties** dialog.

Now you can launch the command-line interface of your host operating system and execute the **VBoxManage** command from any directory on your system.

```
PS C:\Users\User> vboxmanage --version
7.0.8r156879
```


## Usage

The **VBoxManage** command is structured as follows:

```
vboxmanage [options]
```

The **VBoxManage** command accepts a variety of options, which can be found in the [VBoxManage Command Reference](https://www.virtualbox.org/manual/ch08.html "8. VBoxManage Reference"). For example, the following command displays the version of Oracle VM VirtualBox:
```
vboxmanage --version
```

**List All VMs:**
```
vboxmanage list vms
```

**List Running VMs:**
```
vboxmanage list runningvms
```

**Start a VM:**
```
vboxmanage startvm <vm-name or uuid>
```

**Start a VM in Headless Mode (No GUI):**
```
vboxmanage startvm <vm-name or uuid> --type headless
```

**Power Off a VM:**
```
vboxmanage controlvm <vm-name or uuid> poweroff
```

**Power Button a VM (ACPI Shutdown):**
```
vboxmanage controlvm <vm-name or uuid> acpipowerbutton
```

**Reset a VM:**
```
vboxmanage controlvm <vm-name or uuid> reset
```

**Pause a VM:**
```
vboxmanage controlvm <vm-name or uuid> pause
```

**Resume a VM:**
```
vboxmanage controlvm <vm-name or uuid> resume
```

**Save a VM State:**
```
vboxmanage controlvm <vm-name or uuid> savestate
```

**Take a Snapshot of a VM:**
```
vboxmanage snapshot <vm-name or uuid> take <snapshot-name>
```

**Restore a VM to a Snapshot:**
```
vboxmanage snapshot <vm-name or uuid> restore <snapshot-name>
```

**Delete a Snapshot of a VM:**
```
vboxmanage snapshot <vm-name or uuid> delete <snapshot-name>
```

**Change the VM's Memory:**
```
vboxmanage modifyvm <vm-name or uuid> --memory <memory-in-mb>
```

**Change the VM's CPU Count:**
```
vboxmanage modifyvm <vm-name or uuid> --cpus <cpu-count>
```

**Change the VM's Boot Order:**
```
vboxmanage modifyvm <vm-name or uuid> --boot1 dvd --boot2 disk --boot3 none --boot4 none
```

**Change the VM's Network Adapter Type:**
```
vboxmanage modifyvm <vm-name or uuid> --nic1 bridged --bridgeadapter1 "Intel(R) Ethernet Connection (7) I219-V"
```

**Change the VM's Network Adapter MAC Address:**
```
vboxmanage modifyvm <vm-name or uuid> --macaddress1 <mac-address>
```

**Change the VM's Network Adapter Cable Connected State:**
```
vboxmanage modifyvm <vm-name or uuid> --cableconnected1 on
```

**Change the VM's Network Adapter Promiscuous Mode:**
```
vboxmanage modifyvm <vm-name or uuid> --nicpromisc1 allow-all
```


## Conclusion

**VBoxManage** is a powerful command-line interface that empowers users to exercise comprehensive control over the virtualization platform directly from the command line of their host operating system. Unlock the full potential of **VBoxManage** when you find yourself needing to employ an alternative user interface, such as the VBoxHeadless server, for a different VirtualBox experience or take command of advanced and experimental configuration settings for your virtual machines, surpassing the limits imposed by the graphical interface.