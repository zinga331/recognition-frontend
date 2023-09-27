# SSH into your server bruh

ssh -i 260-indexing.pem ubuntu@35.171.86.84

# Technology stack

> The collection of technologies that you use to create or deliver your web application is called a _technology stack_. It is a stack because they usually layer one on top of each other.

![260 tech stack](https://raw.githubusercontent.com/webprogramming260/.github/main/profile/essentials/techStack/essentialsTechStack260.jpg)

# Making connections

- In order for two different devices to talk to one another, the devices must have an IP address.
- But because humans are bad at remembering numbers, we use domain names instead.
- They are converted into IP address by a DNS server, a Domain Name System.

## Network internals

The actual sending of data across the internet uses the TCP/IP model. This is a layered architecture that covers everything from the physical wires to the data that a web application sends. At the top of the TCP/IP protocol is the application layer. It represents user functionality, such as the web (HTTP), mail (SMTP), files (FTP), remote shell (SSH), and chat (IRC). Underneath that is the transport layer which breaks the application layer's information into small chunks and sends the data. The actual connection is made using the internet layer. This finds the device you want to talk to and keeps the connection alive. Finally, at the bottom of the model is the link layer which deals with the physical connections and hardware.

### [TCP/IP](https://en.wikipedia.org/wiki/Internet_protocol_suite) layers

| Layer       | Example         | Purpose                               |
| ----------- | --------------- | ------------------------------------- |
| Application | HTTPS           | Functionality like web browsing       |
| Transport   | TCP             | Moving connection information packets |
| Internet    | IP              | Establishing connections              |
| Link        | Fiber, hardware | Physical connections                  |

# Web servers

> A web server is a computing device that is hosting a web service that knows how to accept incoming internet connections and speak the HTTP application protocol.

# Microservices

> Web services that provide a single functional purpose are referred to as microservices. By partitioning functionality into small logical chucks, you can develop and manage them independently from other functionality in a larger system. They can also handle large fluctuations in user demand by simply running more and more stateless copies of the microservice from multiple virtual servers hosted in a dynamic cloud environment. For example, one microservice for generating your genealogical family tree might be able to handle 1,000 users concurrently. So in order to support 1 million users, you just deploy 1,000 instances of the service running on scalable virtual hardware.

# Domain Names

> Domain names are broken up into a root domain, with one or more possible subdomain prefixes. The root domain is represented by a secondary level domain and a top level domain. The top level domain (TLD) represent things like com, edu, or click. So a root domain would look something like byu.edu, google.com, or cs260.click. The possible list of TLDs is controlled by ICANN, one of the governing boards of the internet.

# Caddy

In order to modify my caddy file I had to use the following command from the root directory of this project in git bash:

```ssh -i 260-indexing.pem ubuntu@zinga.click

```
