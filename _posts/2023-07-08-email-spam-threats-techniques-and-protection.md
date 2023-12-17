---
title: 'Email Spam - Threats, Techniques, and Protection'
author: xransum
date: 2023-07-08 04:00:56 -0500
categories:
  - Security
tags:
  - security
  - email-spam
  - learning
  - linux
image:
  path: /commons/en-lan-2000-04.jpg
  lqip: null
  alt: null
---

## Introduction

Email spam continues to be a significant cybersecurity concern, with cybercriminals attempting to deceive recipients and compromise personal information through fraudulent emails.

In this post, we will discuss what email spam is, how it works, and how you can protect yourself from it.

## What is Email Spam?

Email spam refers to **unsolicited and unwanted emails that are sent in bulk to a large number of recipients**. These emails often contain deceptive or malicious content and aim to trick users into revealing sensitive information or engaging in harmful actions.

Email spam is a form of social engineering, **a technique used to manipulate people into performing actions or divulging confidential information**. Social engineering attacks are often successful because they exploit human psychology and emotions, such as fear, curiosity, and trust.

## Email Spam Statistics

For an idea of just how prevalent email spam is, consider the following statistics gathered by [Statista](https://www.statista.com/statistics/420391/spam-email-traffic-share/) in 2022:

- **336.1B** emails sent and received per day.
- **283.0B** (88.6%) of those were spam emails.
- **102.0B** (36.0%) of spam were **marketing/advertising**.
- **90.0B** (31.7%) of spam were **adult-related content**.
- **75.0B** (26.5%) of spam were **financial scams**.
- **4.5B** (6%) of *financial scams* use **fax machines**.
- **7.0B** (2.5%) of spam were **fraudulent emails**.
- **5.0B** (73%) of *fraudulent emails* were **phishing emails**.
- **1.56B** (33%) of *phishing emails* **contained malware or malicious code**.
- **1 in 12.5M** spam emails get a reply from the recipient.
- For every **12.5M** spam emails sent, the websites advertised in the emails earn around **$7,000** per day.
- Email spam costs businesses a ~**$20.5B** every year in lost productivity and technical expenses.


# How Spam Campaigns Collect Email Addresses

Spammers employ various methods to collect email addresses for their spam campaigns. Understanding how they obtain these addresses can help us better protect ourselves. Here are some common techniques used by spammers:

- **Hacking Company Databases**: Spammers may target company databases and exploit vulnerabilities to gain access to a vast amount of data, including email addresses.
- **Compromising Mailing Lists**: Attackers might focus on hacking servers hosting mailing lists and extract email addresses from these compromised sources.
- **Crawling Websites and Forums**: Spammers search websites and forums for email addresses, especially if they are publicly displayed without proper protection.
- **Phishing on Social Media Channels**: Spammers utilize social engineering techniques to trick users into sharing their email addresses through tempting offers or access requirements.
- **Man-in-the-Middle Attack**: In insecure network environments, attackers can eavesdrop on data exchanges and intercept email addresses and other information provided by users.
- **Ransomware**: Certain ransomware strains collect email contacts from infected machines and send them to cybercriminal-controlled servers for further exploitation.
- **Purchasing Email Databases on the Dark Web**: Cybercriminals can acquire bulk email addresses from other attackers who have harvested them and made them available for sale on the dark web.
- **Compromising Browsers**: Spammers exploit vulnerabilities in web browsers to intercept and collect email addresses entered on various websites.
- **Attacking Website Domain Contact Points**: Email addresses associated with website domain registrations can be obtained using tools like the "whois" command or freely available databases.
- **Guessing**: Some attackers resort to guessing email addresses, sending test messages to verify their validity for future attacks.
- **Social Engineering**: Spammers may impersonate trusted organizations, contacting potential victims by phone and requesting their email addresses and other personal information.

## Types of Email Spam

Email spam comes in various forms, each with its own objectives and tactics. Here are some common types you may encounter:

- **Product Advertisements**: Spam emails that promote products such as weight loss pills or sexual enhancers.
- **Scams**: Emails attempting to deceive recipients into paying money or divulging personal information through techniques like advance fees, current events, or tech support scams.
- **Phishing Emails**: Messages that mimic legitimate entities and aim to trick recipients into revealing sensitive information like usernames, passwords, and credit card details.
- **Blank Spam**: Empty emails, sometimes without subject lines, used by cybercriminals to validate the existence and validity of email addresses for future spam campaigns.
- **Malware Messages**: Emails designed to deceive users into sharing private information, paying money, or taking actions they would not normally take.
- **Antivirus Alerts**: Emails posing as antivirus alerts, falsely notifying recipients of virus infections and providing malicious links or attachments.
- **"You Won" Emails**: Spammers send emails claiming that the recipient has won a prize or contest, luring them to click on a malicious link designed to steal sensitive data.

## Identifying Email Spam

While some spam emails are easy to recognize, others are highly deceptive and require careful scrutiny. To protect yourself from spam, consider the following best practices for identifying spam emails:

- **Look for Unfamiliar or Suspicious Email Addresses**: Pay attention to the sender's email address, especially if it appears unusual or suspicious. Spammers often use spoofed email addresses to make emails seem legitimate.
- **Be Cautious with Attachments and Links**: Exercise caution when encountering email attachments or links from unknown or untrustworthy sources. Malicious programs and malware can be easily distributed through these mediums.
- **Watch for Spelling Errors and Unusual Content**: Spammers may introduce spelling mistakes or add extra characters to bypass spam filters. Scrutinize emails with grammatical errors or unusual content.
- **Be Wary of Unrealistic Offers**: If an email promises something too good to be true, it likely is. Phishing scams often use enticing offers to trick users into sharing sensitive information. Never provide passwords, social security numbers, or banking details via email.
- **Beware of Urgent or Intimidating Emails**: Many spam emails create a sense of urgency, using terms like "unauthorized login attempt" or "last date." Treat such emails with suspicion, as they are often phishing attempts.
- **Pay Attention to Personalized Greetings**: Authentic emails often contain unique and personal greetings. Generic salutations like "valued customers" may indicate a spam email.
- **Verify Email Signatures**: Legitimate emails usually have detailed signatures with contact information.

## Reading Raw Emails

To better understand how spam emails work, let's take a look at a sample spam email. We will use the [email message format](https://en.wikipedia.org/wiki/Email#Message_format), which is the original, unprocessed version of an email message.

Here is our sample email message:

```
Delivered-To: johndoe@example.com
Received: by 10.52.187.136 with SMTP id fs8cs74847vdc;
        Tue, 3 May 2011 15:26:05 -0700 (PDT)
Received: by 10.42.117.133 with SMTP id t5mr561320icq.490.1304461564856;
        Tue, 03 May 2011 15:26:04 -0700 (PDT)
Return-Path: <janedoe@example.com>
Received: from sg2plout10-02.prod.sin2.secureserver.net (sg2plout10-02.prod.sin2.secureserver.net [182.50.145.5])
        by mx.google.com with SMTP id ul8si1063393icb.126.2011.05.03.15.25.54;
        Tue, 03 May 2011 15:25:56 -0700 (PDT)
Received-SPF: error (google.com: error in processing during lookup of janedoe@example.com: DNS timeout) client-ip=182.50.145.5;
Authentication-Results: mx.google.com; spf=temperror (google.com: error in processing during lookup of janedoe@example.com: DNS timeout) smtp.mail=janedoe@example.com
Received: (qmail 19185 invoked from network); 3 May 2011 22:25:53 -0000
Received: from unknown (172.158.118.70)
  by sg2plout10-02.prod.sin2.secureserver.net (182.50.145.5) with ESMTP; 03 May 2011 22:25:46 -0000
MIME-Version: 1.0
X-Unsent: 1
Date: Wed, 04 May 2011 01:06:15 +0300
Content-Type: multipart/related;
   boundary="------------000501070504030807060107_.REL"
Reply-To: chris_forb@live.com
X-Priority: Normal
Subject: Re: With 128 GB SSD, Apple MacBook Air 13.3 - $350
X-Mailer: Vodamail 10
To: "johndoe" <johndoe@example.com>
From: "Dave C" <davec@example.com>
Message-ID: <BF7F22F37F776BA10DAA84290D4BBC60FC4A03DE@p>

This is a multi-part message in MIME format.

--------------000501070504030807060107_.REL
Content-Type: multipart/alternative;
   boundary="------------050705080400040003030501"

This is a multi-part message in MIME format.

--------------050705080400040003030501
Content-Transfer-Encoding: quoted-printable
Content-Type: text/plain; charset="iso-8859-1";format="flowed"

Hi,=20

Come buy my Apple MacBook Air 13.3 - $350. It is in excellent condition, =
no scratches or dents, and it has been used for only 2 months. It comes =
with the original box and all the accessories. I am selling it because I =
need money for my daughter's surgery. I am selling it for $350. If you =
are interested, please email me back. I will ship it to you for free. =
Here are some pictures of the laptop:

Thanks,=20
Chris

=20
--------------050705080400040003030501
Content-Type: text/html; charset="iso-8859-1"
Content-Transfer-Encoding: quoted-printable

<!DOCTYPE HTML PUBLIC =22-//W3C//DTD HTML 4.0 Transitional//EN=22><HTML><HE=
AD>
<TITLE>Placeholder Example</TITLE><BODY><P>Hi,=20</P>=
<P>Come buy my Apple MacBook Air 13.3 - $350. It is in excellent condition, no scratches or dents, and it has been used for only 2 months. It comes with the original box and all the accessories. I am selling it because I need money for my daughter's surgery. I am selling it for $350. If you are interested, please email me back. I will ship it to you for free. Here are some pictures of the laptop:</P>=
<P>Thanks,=20</P>=
Chris=
</BODY></HTML>
--------------050705080400040003030501--

--------------000501070504030807060107_.REL
Content-Type: image/jpeg;name="186a_12.jpg"
Content-Disposition: inline; filename="186a_12.jpg"
Content-ID: <CID-f5c4bc6f-e3fc-8e82-efb6-02e4af7e1ba4>
Content-Location: file:///E:/aaaaaa/New%20Folder%20NOU/bbbbb/Apple%20MacBook%20Air%2016%20GHz%2013.3%20Laptop/186a_12.jpg
Content-Transfer-Encoding: base64

<base64 data>

--------------000501070504030807060107_.REL
Content-Type: image/jpeg;name="a17a_12.jpg"
Content-Disposition: inline; filename="a17a_12.jpg"
Content-ID: <CID-6583eb20-eead-c7a5-9016-24a3810a2978>
Content-Location: file:///E:/aaaaaa/New%20Folder%20NOU/bbbbb/Apple%20MacBook%20Air%2016%20GHz%2013.3%20Laptop/a17a_12.jpg
Content-Transfer-Encoding: base64

<base64 data>

--------------000501070504030807060107_.REL--
```

The above email message is a spam email that attempts to deceive the recipient into purchasing a MacBook Air laptop. Let's break down the various components of this email message, starting with the header.

### Email Header

The email header contains information about the email, including the sender, recipient, subject, and date. Here is the header of our sample email:

```
Delivered-To: johndoe@example.com
Received: by 10.52.187.136 with SMTP id fs8cs74847vdc;
        Tue, 3 May 2011 15:26:05 -0700 (PDT)
Received: by 10.42.117.133 with SMTP id t5mr561320icq.490.1304461564856;
        Tue, 03 May 2011 15:26:04 -0700 (PDT)
Return-Path: <janedoe@example.com>
Received: from sg2plout10-02.prod.sin2.secureserver.net (sg2plout10-02.prod.sin2.secureserver.net [182.50.145.5])
        by mx.google.com with SMTP id ul8si1063393icb.126.2011.05.03.15.25.54;
        Tue, 03 May 2011 15:25:56 -0700 (PDT)
Received-SPF: error (google.com: error in processing during lookup of janedoe@example.com: DNS timeout) client-ip=182.50.145.5;
Authentication-Results: mx.google.com; spf=temperror (google.com: error in processing during lookup of janedoe@example.com: DNS timeout) smtp.mail=janedoe@example.com
Received: (qmail 19185 invoked from network); 3 May 2011 22:25:53 -0000
Received: from unknown (172.158.118.70)
  by sg2plout10-02.prod.sin2.secureserver.net (182.50.145.5) with ESMTP; 03 May 2011 22:25:46 -0000
MIME-Version: 1.0
X-Unsent: 1
Date: Wed, 04 May 2011 01:06:15 +0300
Content-Type: multipart/related;
   boundary="------------000501070504030807060107_.REL"
Reply-To: chris_forb@live.com
X-Priority: Normal
Subject: Re: With 128 GB SSD, Apple MacBook Air 13.3 - $350
X-Mailer: Vodamail 10
To: "johndoe" <johndoe@example.com>
From: "Dave C" <davec@example.com>
Message-ID: <BF7F22F37F776BA10DAA84290D4BBC60FC4A03DE@p>
```

The general format of an email header is as follows:

```
Header-Name: Header-Value
```

The standard header fields are typically:

- `From`: The name and email address of the sender
- `To`: The name and/or email address of the receiver
- `Date`: The date and time the email was sent
- `Subject`: The subject of the email

Some other header fields may include:
- `Return-Path`: This header identifies where emails that cannot be delivered should be sent for processing. Typically, an SMTP address for handling bounced messages is specified here.
- `Authentication-Results`: This header specifies the results of the message authentication checks performed by the receiving server. It is used to indicate whether the message passed or failed the authentication checks.
- `Received*`: 	Here are all the message’s recipients—this is sort of a log of IPs for everywhere the message was received en route to its final destination. This header is especially useful in case of any errors because you can check at which point your email was changed and where it came from.
- `Message-ID`: This is a unique identifier generated specifically for the email sent.
- `MIME-Version`: MIME (Multipurpose Internet Mail Extensions), is a standard for formatting non-ASCII messages so that they can be sent over the Internet. This header specifies the MIME version used in the email.
- `Content-type`: This header specifies the type of content contained in the email. It is used to specify the type of data contained in the message body. For example, if the message body contains text, the header will be set to text/plain. If the message body contains HTML, the header will be set to text/html.
- `Precedence`: This header specifies the priority of the email. It is used to indicate whether the email is urgent or not. The possible values are: bulk, junk, list, or normal.

Sometimes when you are looking at the headers, you will see it may contain multiple `Received` headers. This is due to the fact that the email was sent through multiple servers before it reached its final destination. 

When an email is sent, it goes through multiple servers before it reaches its final destination. Each time the email is received by a server and handed off to another server, the server first adds a `Received` header to the top of email with the server's information and the date in which it was received.

The `Received: by` and `Received: from` fields in email headers serve different purposes:

1. `Received: by` indicates the server or software that received and processed the email message. It provides information about the server that added the particular "Received" header to the email's header section. This field typically includes the server's IP address or hostname and may also include additional details such as the SMTP (Simple Mail Transfer Protocol) ID and the timestamp of when the server received the email. The `Received: by` field is used to trace the path of the email from one server to another.

Example:
```
Received: by example.com (Postfix) 
    id ABC123; 
    Wed, 7 July 2023 10:15:00 +0000 (UTC)
```

1. `Received: from` indicates the source of the email message. It specifies the sending server's information, such as its IP address or hostname. This field provides details about the server that originally sent the email, allowing the recipient to see where the message originated from. The `Received: from` field is particularly useful for identifying potential spam or spoofed emails, as it reveals the server that claimed to send the message.

Example:
```
Received: from mail.example.net (mail.example.net [192.168.1.100])
    by example.com (Postfix) 
    with ESMTP id DEF456;
    Wed, 7 July 2023 10:14:00 +0000 (UTC)
```

In summary, `Received: by` describes the server that received and processed the email, while `Received: from` identifies the server that claimed to send the email. Together, these fields help trace the email's path and verify its source.


### Email Body

The email body contains a couple of different parts:

**Plain Text Part:**

- `Content-Transfer-Encoding: quoted-printable`
- `Content-Type: text/plain; charset="iso-8859-1"; format="flowed"`

The plain text part of the email is encoded using quoted-printable, which represents special characters using printable ASCII characters. The content type is "text/plain" with a character set of ISO-8859-1 (Latin-1) and the format is set to "flowed".

```
Hi,

Come buy my Apple MacBook Air 13.3 - $350. It is in excellent condition,
no scratches or dents, and it has been used for only 2 months. It comes
with the original box and all the accessories. I am selling it because I
need money for my daughter's surgery. I am selling it for $350. If you
are interested, please email me back. I will ship it to you for free.
Here are some pictures of the laptop:

Thanks,
Chris
```

**HTML Part:**

- `Content-Transfer-Encoding: quoted-printable`
- `Content-Type: text/html; charset="iso-8859-1"`

The HTML part of the email is also encoded using quoted-printable. It represents HTML content and has a content type of "text/html" with a character set of ISO-8859-1 (Latin-1).

```
Content-Type: text/html; charset="iso-8859-1"

<!DOCTYPE HTML PUBLIC =22-//W3C//DTD HTML 4.0 Transitional//EN=22><HTML><HE=
AD>
<TITLE>Placeholder Example</TITLE><BODY><P>Hi,=20</P>=
<P>Come buy my Apple MacBook Air 13.3 - $350. It is in excellent condition, no scratches or dents, and it has been used for only 2 months. It comes with the original box and all the accessories. I am selling it because I need money for my daughter's surgery. I am selling it for $350. If you are interested, please email me back. I will ship it to you for free. Here are some pictures of the laptop:</P>=
<P>Thanks,=20</P>=
Chris=
</BODY></HTML>
```

**Image Attachments:**

- `Content-Transfer-Encoding: base64`
- `Content-Type: image/jpeg; name="186a_12.jpg"`

The image attachments in the email are encoded using base64, which converts binary data into ASCII characters for transmission. The content type indicates that the images are in JPEG format and the name of the file is "186a_12.jpg".

```
Content-Type: image/jpeg; name="186a_12.jpg"
Content-Disposition: inline; filename="186a_12.jpg"
Content-ID: <CID-f5c4bc6f-e3fc-8e82-efb6-02e4af7e1ba4>
Content-Location: file:///E:/aaaaaa/New%20Folder%20NOU/bbbbb/Apple%20MacBook%20Air%2016%20GHz%2013.3%20Laptop/186a_12.jpg
Content-Transfer-Encoding: base64

<base64 image data>

Content-Type: image/jpeg; name="a17a_12.jpg"
Content-Disposition: inline; filename="a17a_12.jpg"
Content-ID: <CID-6583eb20-eead-c7a5-9016-24a3810a2978>
Content-Location: file:///E:/aaaaaa/New%20Folder%20NOU/bbbbb/Apple%20MacBook%20Air%2016%20GHz%2013.3%20Laptop/a17a_12.jpg
Content-Transfer-Encoding: base64

<base64 image data>
```

Please note that the same Content-Transfer-Encoding (base64) applies to the subsequent image attachment as well.


## How Email Spam Works

Now that we have a better understanding of email spam, let's take a look at how it works. Here is a high-level overview of the spam email process:

1. **Spammers collect email addresses** using various methods, including hacking databases, compromising mailing lists, crawling websites, and social engineering.
2. **Spammers send spam emails** to the collected email addresses. They may use botnets to send emails from multiple IP addresses and avoid detection.
3. **Spam filters** analyze the emails and determine if they are spam. If the emails are deemed spam, they are **blocked or flagged**.

### Spam Filters

Spam filters are software programs that analyze incoming emails and determine if they are spam. They use various techniques to identify spam, including:

- **Blacklists**: Spam filters maintain lists of known spam sources, such as IP addresses, domains, and email addresses. If an email is sent from a blacklisted source, it is flagged as spam.
- **Whitelists**: Spam filters maintain lists of trusted sources, such as IP addresses, domains, and email addresses. If an email is sent from a whitelisted source, it is not flagged as spam.
- **Content Analysis**: Spam filters analyze the content of emails and look for spam-like characteristics, such as suspicious links, attachments, and keywords.
- **Header Analysis**: Spam filters examine the email headers and look for suspicious or spoofed information.
- **Machine Learning**: Spam filters use machine learning algorithms to analyze emails and identify spam patterns.
- **Sender Reputation**: Spam filters check the sender's reputation and look for any suspicious activity or poor reputation.
- **Spam Traps**: Spam filters use spam traps, which are email addresses used to identify spammers. If an email is sent to a spam trap, it is flagged as spam.
- **URL Analysis**: Spam filters analyze URLs in emails and look for suspicious or malicious links.
- **Image Analysis**: Spam filters analyze images in emails and look for suspicious or malicious content.
- **Email Authentication**: Spam filters check if the email has been authenticated using SPF, DKIM, or DMARC. If the email fails authentication, it is flagged as spam.


## Investigation Techniques

When it comes to advanced investigation and vetting of potential email spam, Linux commands and other services can provide valuable insights. By utilizing these tools, you can dig deeper into the technical aspects and gather more information about suspicious emails, including their origin, IP addresses, and content integrity.

Here are some additional Linux commands and services that can aid in your investigations:

### Dig

The `dig` command is a versatile tool for DNS (Domain Name System) analysis. It allows you to query DNS records, retrieve information about a domain's DNS configuration, and verify the authenticity of DNS responses.

```bash
dig example.com
```

### Traceroute

The `traceroute` command helps trace the path taken by network packets from your computer to a target IP address. It can assist in understanding the network infrastructure and identify any unexpected hops or routing anomalies.

```bash
traceroute example.com
```

### Reverse DNS Lookup

A reverse DNS lookup allows you to find the domain name associated with a given IP address. This can be helpful in verifying the legitimacy of an IP address used in an email.

```bash
host 192.168.1.1
```

### IP Geolocation

To obtain geolocation information for an IP address, you can use services like **ipinfo.io** or **ip-api.com**. These services provide details such as the country, region, city, and Internet service provider (ISP) associated with the IP address.

```bash
curl ipinfo.io/192.168.1.1
```

### DNSBL (DNS-based Blackhole List) Check

DNSBL is a service that identifies and lists IP addresses known to be sources of spam or malicious activities. By checking an IP address against DNSBLs, you can determine if it has a poor reputation.

```bash
host 192.168.1.1.zen.spamhaus.org
```

### WHOIS Lookup

The `whois` command provides detailed information about domain registrations, including contact details of the domain owner, registrar information, and registration dates.

```bash
whois example.com
```

### Whois History

For a comprehensive view of a domain's historical ownership and registration changes, you can utilize WHOIS history services such as **WhoisXML API** or **DomainTools**. These services provide detailed records of a domain's ownership and can help detect any suspicious changes or patterns.

### MX Record Lookup

To determine the mail servers responsible for handling emails for a specific domain, you can perform an MX (Mail Exchanger) record lookup.

```bash
dig example.com MX
```

### SPF Record Lookup

The Sender Policy Framework (SPF) is a DNS record that helps prevent email spoofing. By checking the SPF record, you can verify if the sender's IP address is authorized to send emails on behalf of the domain.

```bash
dig example.com TXT
```

### SSL/TLS Certificate Analysis

Analyzing the SSL/TLS certificate of a website can reveal useful information. The `openssl` command can help extract and examine certificate details, including the common name, issuer, validity period, and certificate chain.

```bash
openssl s_client -showcerts -connect example.com:443
```

### HTTP Headers

Examining the HTTP headers of a website can provide valuable insights into its server configuration and response. The `curl` command can be used to retrieve and analyze HTTP headers.

```bash
curl -I example.com
```

### Validate URLs

To verify the integrity of a URL and ensure they are not malicious or leading to phishing sites, you can use the `curl` command to retrieve the webpage content and examine it.

The flag `-L` instructs `curl` to follow any redirects and retrieve the final URL content.

```bash
curl -L example.com
```

If you want to **check the URL without downloading the content**, you can use the `-I` flag as well.

```bash
curl -IL example.com
```

Replace `example.com` with the actual URL you want to validate. The `-I` flag requests only the response headers, while the `-L` flag follows any redirects.

**Advanced Tip**: You can also use a command called `lynx` to view the webpage content in the terminal. This can be useful if you want to quickly check the content of a URL without opening it in a browser.

```bash
lynx example.com
```

**Advanced Alternative**: `lynx` allows for piping the output of `curl` to it, which can be useful for quickly checking the content of a URL without opening it in a browser.

```bash
curl -L example.com | lynx -stdin -dump
```

### Phishing Website Detection Services

Various online services specialize in detecting phishing websites. These services use machine learning algorithms and reputation databases to determine the likelihood of a website being involved in phishing activities. Examples include **[Google Safe Browsing](https://safebrowsing.google.com/)** and **[PhishTank](https://phishtank.org/)**.

### IP Reputation Check

Online IP reputation services like **[AbuseIPDB](https://www.abuseipdb.com/check/)** or **[IPVoid](https://www.ipvoid.com/)** allow you to check the reputation of an IP address and identify if it has been associated with

any malicious activities or reported as abusive.

### Analyze Email Attachments

To investigate email attachments for potential malware or suspicious content, you can use antivirus software or online services like **VirusTotal** to scan the attachments.

Upload the email attachment file to VirusTotal's website (https://www.virustotal.com) for analysis.

Remember to take appropriate precautions when handling suspicious attachments to avoid accidentally executing any malicious code.

## Investigation Examples

Here we will start to analyze a raw email and its headers to gather relevant information:

```
Return-Path: <sender@example.com>
Received: from mail.example.com (mail.example.com [192.168.1.100])
	by mx.example.com (Postfix) with SMTP id ABC123
	for <recipient@example.com>; Thu, 9 Jul 2023 12:00:00 +0000 (UTC)
Received: from unknown (HELO [192.168.1.200])
	by mail.example.com with SMTP; Thu, 9 Jul 2023 12:00:01 +0000 (UTC)
From: sender@example.com
To: recipient@example.com
Subject: Important Announcement
Date: Thu, 9 Jul 2023 12:00:01 +0000
Message-ID: <XYZ789@example.com>
MIME-Version: 1.0
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: quoted-printable

This is the content of the email.
```

Now, let's proceed with the verification process using a series of advanced commands and methods:

1. **Use the `whois` command to gather information about the IP addresses involved in the email headers**:
```bash
whois 192.168.1.100
```

Look for any discrepancies or indications that the IP address is associated with spam activities.

Sample output:
```
NetRange:       192.0.2.0 - 192.0.2.255
CIDR:           192.0.2.0/24
NetName:        EXAMPLE-NET
NetHandle:      NET-192-0-2-0-1
Parent:         EXAMPLE-COM-NET
NetType:        ALLOCATED UNSPECIFIED
OriginAS:
Organization:   Example Organization (EXAMPLE)
RegDate:        1996-12-01
Updated:        2023-07-01
...
```


2. **Examine the header to determine if the IP addresses have been tampered with**:
```bash
$ dig -x 192.168.1.100
```

**Sample Output**:
```
;; ANSWER SECTION:
100.1.168.192.in-addr.arpa. 3600 IN	PTR	mail.example.com.
```

Based on the output, we can see that the reverse DNS lookup for the IP address `192.168.1.100` corresponds to `mail.example.com`, which is the expected hostname for the sending mail server.


3. **Check the SPF record of the sender's domain to validate the email source**:
```bash
$ dig +short TXT example.com | grep spf
```

**Sample Output**:
```
"v=spf1 mx -all"
```

The SPF record states that the only permitted sender for the domain `example.com` is the MX (mail exchanger) server. This indicates that the email was sent from an authorized source.


4. **Use a tool like SpamAssassin to analyze the email content and determine its spam score**:
```bash
spamassassin -t email.txt
```

Review the output and check for any indications that the email might be spam.

Sample output:
```
Content analysis details:   (6.4 points, 5.0 required)

 pts rule name              description
---- ---------------------- --------------------------------------------------
 0.2 BAYES_50               BODY: Bayes spam probability is 40 to 60%
...
 2.5 RCVD_IN_SBL            RBL: Received via a relay in Spamhaus SBL
                            [192.0.2.3 listed in sbl.example.net]
...
```

3. Analyze the email headers for any signs of tampering or spoofing:
```bash
$ cat email.txt | formail -x Received
```

Sample Output:
```
from mail.example.com (mail.example.com [192.168.1.100]) by mx.example.com (Postfix) with SMTP id ABC123 for <recipient@example.com>; Thu, 9 Jul 2023 12:00:00 +0000 (UTC)
from unknown (HELO [192.168.1.200]) by mail.example.com with SMTP; Thu, 9 Jul 2023 12:00:01 +0000 (UTC)
```

The email headers show the path the email has taken. We can observe that the email was received by `mail.example.com` from `192.168.1.100` and then passed through an unknown host with IP `192.168.1.200`. This information will help identify any suspicious hops.


4. Perform a trace route to determine the network path:
```bash
$ traceroute -n mail.example.com
```

Sample Output:
```
traceroute to mail.example.com (192.168.1.100), 30 hops max, 60 byte packets
 1  203.0.113.1  0.5 ms  AS12345  United States
 2  198.51.100.2  1.0 ms  AS12345  United States
 3  192.0.2.100  2.0 ms  AS12345  United States
 4  192.168.1.100  5.0 ms  Unknown
```

The trace route shows the network path to `mail.example.com`. The last hop with IP `192.168.1.100` is the destination IP. If this IP matches the previous information, it indicates the absence of spoofing.


5. Validate the authenticity of the email by examining the DKIM signature:
```bash
$ opendkim-testmsg -vv -f email.txt
```

Sample Output:
```
opendkim-testmsg: DKIM verification successful
```

The DKIM verification result indicates that the email has a valid DKIM signature, which further strengthens its authenticity.

6. **If the email contains attachments, you can use various command-line tools like file or strings to analyze the file type and extract any embedded information.**
```bash
file attachment.doc
```

Sample Output:
```
attachment.doc: Composite Document File V2 Document, Little Endian, Os: Windows, Version 6.1, Code page: 1252, Author: John Doe, Template: Normal.dotm, Last Saved By: John Doe, Revision Number: 1, Name of Creating Application: Microsoft Office Word, Total Editing Time: 01:00, Create Time/Date: Wed Jul 07 12:00:00 2023, Last Saved Time/Date: Wed Jul 07 12:00:00 2023, Number of Pages: 1, Number of Words: 0, Number of Characters: 0, Security: 0
```

```bash
strings attachment.doc
```

Sample Output:
```
bjbj
c]sdc]sd
nch			Jump X		9	Jumps to Address X
			Skipcond (C)	8	Skips the next instruction based on C: if (C) = 
     - 000: Skips if AC < 0
...
```