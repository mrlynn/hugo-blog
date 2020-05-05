---
author: "mlynn"
date: 2019-02-18T21:13:12Z
draft: false
cover:  "/images/2019/02/1_02LVdlAj9fhWpu36LIKWmw.png"
tags: ["mongodb", "Getting Started"]
title: "Getting started with MongoDB Atlas"
url: "/getting-started-with-mongodb-atlas"
aliases:
    - "getting-started-with-mongodb-atlas"

---

### Launching an M0 - Free Tier Instance

MongoDB Atlas is a database as a service offering from MongoDB. Getting started is super simple and takes only about 10 minutes. Atlas offers various tiered service levels started with m0 and continuing with larger amounts of resource (cpu, disk, etc.) on up to m400 that comes with 488GB of RAM and 3TB of storage by default.

{{< figure src="/content/images/2019/02/image-4.png" >}}

Obviously, the larger the instance size, the more you'll spend per hour but the good news is that you can pause these clusters when they're not needed. You'll still be billed nominally, but starting and stopping can let you decrease your overall spend.

<iframe width="480" height="270" src="https://www.youtube.com/embed/tON8dUrvquE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The process should take you about 10 minutes or less. The longest amount of time in this process is waiting about 7 minutes for the 3 nodes to deploy in the cloud hosting provider.

Once you've deployed your cluster, connecting to your instance is simple. Just click the CONNECT button and you'll be presented with three options.

{{< figure src="/content/images/2019/02/image-5.png" caption="Choose a connection method" >}}

Connecting via the MongoDB Shell is simple once you have the MongoDB packages installed. To do that, visit the [MongoDB Download center](http://mongodb.com/downloads) and choose the package associated with the operating system you'll be running the shell on.

{{< figure src="/content/images/2019/02/image-6.png" caption="Connecting Via MongoDB Shell" >}}

MongoDB Atlas deploys highly available replica sets which means that connecting to the instance requires that you either provide a connection string listing each of the three nodes in your cluster — or — you can leverage an SRV record connection string. That's the simplest way, so let's do that.

{{< figure src="/content/images/2019/02/ScreenFlow.gif" caption="Connecting to our MongoDB Instance via Command Line - Shell" >}}

### Upgrading your M0 Free Tier Instance to a Paid Tier

Assuming your great idea has taken off and the cluster you just built is going to require some additional resource, let's take a look at how to upgrade your instance.

<iframe width="480" height="270" src="https://www.youtube.com/embed/JMBGERZqd4Q?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The upgrade process is seamless and at its heart leverages a migration of your current resources to a new, larger sized MongoDB Cluster. Note that during the process of upgrading, once you select your new, larger tier you will need to provide payment details in the form of a credit card. M0 is the only free tier available today.

The upgrade/migration process should take approximately 10-12 minutes depending upon the size you choose to upgrade to.

