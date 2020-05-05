+++
author = "Michael Lynn"
date = 2018-10-13T17:20:39Z
description = ""
draft = true
image = "/images/2018/10/yvan-musy-369832-unsplash.jpg"
slug = "in-defense-of-the-sspl"
title = "In defense of the SSPL"

+++

Recently, MongoDB announced that they're releasing their database software under a newly created license called the [Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license).

The license is a fork of the [General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html) with an additional provision. This provision, labeled #13 in the license text, states the following:

> 13. Offering the Program as a Service.

> If you make the functionality of the Program or a modified version available to third parties as a service, you must make the Service Source Code available via network download to everyone at no charge, under the terms of this License. Making the functionality of the Program or modified version available to third parties as a service includes, without limitation, enabling third parties to interact with the functionality of the Program or modified version remotely through a computer network, offering a service the value of which entirely or primarily derives from the value of the Program or modified version, or offering a service that accomplishes for users the primary purpose of the Program or modified version.

> “Service Source Code” means the Corresponding Source for the Program or the modified version, and the Corresponding Source for all programs that you use to make the Program or modified version available as a service, including, without limitation, management software, user interfaces, application program interfaces, automation software, monitoring software, backup software, storage software and hosting software, all such that a user could run an instance of the service using the Service Source Code you make available.

My laymen's interpretation is this: if you create a public service to make the functionality of a program licensed under the SSPL available then you must make the source code for that service available under the SSPL.

It goes without saying that the world has undergone massive changes since the original authors created the first open source licenses. These original licenses were designed to provide freedoms and protection for developers and their programs during a time when consumption and distribution of these works were largely limited to offline mechanisms. The very concept of an online service was nascent during the time the first open source licenses were drafted.

No longer is it safe to assume that channels for consumption and usage of programs is limited individuals interacting directly, downloading, or sharing copies of the program personally. Online business models, wherein programs and their functionality are made available via the Internet are fast becoming the norm.

Imagine you write a piece of software that provides a unique set of utility to its users. You want users to be able to review its source, make copies of it and even make other works based on it. You make the program available to users, along with its source code. The program can then be downloaded and users can execute the program to derive this unique utility. You want to protect the freedom of this work so you license it in such a way as to ensure that the program, copies of it, and derivatives remain available under the same freedoms.

Now imagine that someone is able to access the functionality of your program WITHOUT downloading, copying or otherwise interacting with you at all.

This is precisely what happens service provider takes a program, like MongoDB, and makes its functionality available online without providing any value back to the community. The freedoms and original intentions of the program are stripped from the creator and any benefit can only be derived by the service provider.

The SSPL was created to ensure that when this situation occurs, the service provider must make the service (source code) available to the community under the same license — effectively ensuring that the service provider gives back to the community. I believe this is not only fair - I believe it's the right, most courageous thing to do. I'm proud to work at a company where the leadership have the courage to be the first to take actions that will ultimately result in freedom for other developers of similar programs.

The fact of the matter is that a majority of the people that use MongoDB will be unaffected by the change in licensing. Only those who plan on, or already are offering MongoDB as a Service will be impacted.

My thoughts and opinions are my own and may or may not reflect those of my employer.

For more information on the SSPL, see the following resources:

* [The SSPL Definition](https://www.mongodb.com/licensing/server-side-public-license/faq)
* [Frequently Asked Questions about the SSPL](https://www.mongodb.com/licensing/server-side-public-license/faq)
* [Eliot's Blog Article on the SSPL](https://www.mongodb.com/blog/post/mongodb-now-released-under-the-server-side-public-license)
* [Newswire Article](https://www.mongodb.com/press/mongodb-issues-new-server-side-public-license-for-mongodb-community-server)



