+++
author = "Michael Lynn"
categories = ["mongodb", "sizing"]
date = 2018-10-13T15:17:24Z
description = "In this article, I'll talk about the process I use to get as close to comfortable with a prediction as possible - essentially, to know the unknowable."
draft = false
image = "/images/2018/10/nostradamus.jpeg"
slug = "sizing-mongodb-knowing-the-unknowable"
tags = ["mongodb", "sizing"]
title = "Sizing MongoDB: Knowing the Unknowable"

+++

## How many servers do I need?  How many CPU's, how much memory?  How fast should the storage be?  Do I need to I shard?

As part of my job as a Solutions Architect, I'm asked to help provide guidance and recommendations for sizing infrastructure that will run MongoDB databases.  In nearly every case, I feel like [Nostradamus](https://en.wikipedia.org/wiki/Nostradamus).  That is to say, I feel like I'm being asked to predict the future.

In this article, I'll talk about the process I use to get as close to comfortable with a prediction as possible - essentially, to _know the unknowable_.

## Charting the Unknown

Let's start out with some basic MongoDB Sizing Theory.  In order to adequately size a MongoDB deployment, you need to understand the following

1. Total Amount of Data that will be stored.
2. Frequently accessed documents
3. Read / Write Profile of the application
4. Indexes that will be leveraged by the application to read data efficiently

These four key elements will help you build what is known as the [**Working Set**.](https://docs.mongodb.com/manual/faq/diagnostics/#faq-memory) The Working Set is the total amount of data, plus indexes that you will try to fit into RAM.

> Wait a minute..., how can it be unknowable?  How is it possible that I'm not be able to know my performance requirements?

Ok - this may be exaggeration, or at least a bit of hyperbole but if you've ever completed an exercise in MongoDB sizing for a live production application, you'll completely agree or at least understand.

The reason I chose the word "unknowable" is because it's literally impossible to know every possible data point required to ensure that your server resource meets or exceeds the requirements 100% of the time.  This is because most application environments are not closed.  They are changeable and in many cases we are at the mercy of an unpredictable user population.

The best we can hope for is close.  The rest, we will leave up to the flexible, scalable architecture that MongoDB brings to the table.

When it comes right down to it, there are a lot of things we know... or at least can predict with pretty good accuracy when it comes to an application running in production.  Let's start with the data.  Here's where we employ good discovery technique.

To understand how MongoDB will perform, you must understand the following elements:

* Data Volume - How much data will our application manage and store?
* Application Read Profile - How will the application access this data?
* Application Write Profile - How will the data be updated or written?

```
{
  _id: 100001,
  First_Name: 'Michael',
  Last_Name: 'Lynn',
  Address: {
    Street: '123 Main Street',
    City: 'Philadelphia',
    State: 'PA',
    Zip: '19147'
  },
  Customer_Since: ISODate("2014-02-10T10:50:42.389Z"),
  Cars: [{
    _id: 3000001,
    Make: 'Ford',
    Model: 'Focus',
    Year: '2016',
    Purchased: ISODate("2016-01-01T01:00:00.100Z"),
    Mileage: 38292
  },{
    _id: 3000002,
    Make: 'Volvo',
    Model: 'XC70',
    Year: '2012',
    Purchased: ISODate("2014-01-01T01:00:00.100Z"),
    Mileage: 72909
  }]
}```

In this example, I'm expressing the relationship between people and their cars through embedding.  This leaves us with a single collection for People and their Cars.  In reality, you may require a more diverse mix - so let's include a linked example collection for service records.  Imagine for our purposes that each person will have on average 10 service records per person.

#### Service:  Avg Doc Size: 350bytes, # of Docs: 10b

```
{
  _id: 2000001,
  Customer_id: 1000001,
  Car: 3000002,
  Date: ISODate("2017-08-01T01:00:00.100Z"), 
  Description: 'Transmission Problem Diagnosis',
  Outcome: 'Replace TCV and reset TLV regulator switches'
  Parts_Cost: 109.00,
  Parts_Sale: 619.99,
  Service_Hours: 2,
  Service_Cost: 110.00,
  Service_Billable: 220.00
  Service_Status: 'Pending'
}
```

Here's what our architecture might look like visually:

{{< figure src="/content/images/2018/10/People-and-Cars-Architecture-2-580x435.png" >}}

Let's do the math:  (1b users * 1024bytes) + (10b * 350bytes) =

1024000000000 + 3500000000000 = 4524000000000 = 4.524TB

Given the estimated users, their cars and their service records, we'll be storing approximately 4.5TB of data in our database.   As stated previously, the goal in sizing MongoDB is to fit the working set into RAM.  So, to get an accurate assessment of the working set - we need to know how much of that 4.5TB will be accessed on a regular basis.

In many sizing exercises, we're asked to estimateLet's assume at any given time during any given day, approximately 30-40% of our user population is actively logged in and reviewing their data.  That would mean that we would have 35% * 1b users * 1024 bytes (user documents) plus 35% * 10b service docs * 350 bytes or...

(.35 * 1b * 1024) = 358400000000plus(.35 * 10b * 350) = 1225000000000----------------------------------------------equals1583400000000 or **1.6TB**

The last bit of information we need to understand is the indexes we'll maintain so that the application can swiftly, and efficiently access the data.  Let's assume that for each People and each Service Record document we'll create an index document that's approximately 100bytes in size... or 11b * 100 bytes = 1.1TB

So our total working set will consist of 1.6TB of frequently accessed data and 1.1TB of index for a total working set size of 2.7TB.

## Application Read / Write Profile

Your application is going to be writing, updating, reading and deleting your MongoDB data.  Each of these activities is going to consume resource from the servers on which MongoDB is running.  Therefore, to ensure that the performance of MongoDB is going to be acceptable, we should really understand the nature of these actions.

## How many reads?  How frequent?

Understanding how many reads, and what data you'll be accessing as well as how frequently you'll be reading is critical to ensure that your databases have enough memory to store these frequently accessed documents.

In many cases, knowing this will require estimation.  Here is where we'll attempt to know the unknown.

In our example application, assume we'll have an active user population of anywhere between 30% and 40% of the total number of users in our database, or 35% of 1 billion users which will be 350,000,000 users.  Let's finish out the math.  With 350m users, that means MongoDB will be regularly accessing 350m user documents each approximately 1k in size.  Additionally, each user will likely be accessing their service records - so - 350m users - each having 3 cars with at least 5 service records - let's assume each accessed the system, thereby causing the application to fetch all of their People documents (350m) and all of their Service Record Documents (3 cars * 5 service records each at 350bytes each).

350m users * 3cars * 5 service records * 350bytes = 1837500000000bytes or 1.83tb

## How many writes?

As important as reads are, so too is understanding how many writes, and what the size and frequency will be.  This will probably be the most important factor that will determine the disk [IOPS](http://www.webopedia.com/TERM/I/IOPS.html) rating you will need to support your use case.

If we continue our imaginary example, you can probably guess that the application, as I've described it will not provide a great deal of write workload.  People looking at their car inventories, and reviewing their service records doesn't exactly sound like a high bandwidth, low-latency requirement.

However, it will be in our best interest to do the math to ensure our infrastructure can support our workload.

Let's ask some questions.  Regardless of the actual details of your application, the questions are always the same.  What is the data?  How often will it change?  How does this change impact the total data stored?

In our example case the questions will be as follows:

* How often will users be added?1m users per dayWith 1m user additions, we'll be looking at a daily incremental storage requirement of 1m * 1024bytes or 1GB.  This incremental value is likely negligible for most disk subsystems.
* How often will service records be added?10m service updates per dayWith 10m service updates, we'll need to support a daily incremental storage requirement of 10m * 350bytes or 3.5GB.  Again - not monumental.

With both people and service records, we're going to need to ensure that our infrastructure can support a write profile of at least 5GB per day.  The next logical question to ask is WHEN are these updates completed?  Based on what we know about our data and our application, the users will most likely come in at random periods - but let's say we don't want to make any assumptions and we want to understand what kind of load this will place on our disks.

We typically measure write performance in terms of IOPs - Input Output Operations Per Second and to understand how much data we'll be able to move in terms of IOPS, consider the following:

IOPS*TransferSizeInBytes=BytesPerSec

Let's take a look at what modern disk subsystems can accomplish in terms of IOPs.

* **HDDs: Small reads** – 175 IOPs, Small writes – 280 IOPs
* **Flash SSDs: Small reads** – 1075 IOPs (6x), Small writes – 21 IOPs (0.1x)
* **DRAM SSDs: Small reads** – 4091 IOPs (23x), Small writes – 4184 IOPs (14x)

For this exercise, we'll assume the fastest disks available for random, small write workloads: DRAM SSDs.

## To Shard or Not to Shard

In order for us to determine whether or not we will need to shard, or partition our database, we need to figure out whether or not we'll be able to provision a service with enough RAM to support our working set.

Do you have servers with in excess of 2.7TB of RAM?  Probably not.  Then let's take a look at sharding.

## What is sharding?

Sharding is the process of storing data records across multiple machines and is MongoDB's approach to meeting the demands of data growth. As the size of the data increases, a single machine may not be sufficient to store the data nor provide an acceptable read and write throughput.

The most common goal of sharding is to store and manipulate a larger amount of data at a greater throughput than that which a single server can manage.  (You may also shard, or partition your data to accomplish data locality or residency using zone-based sharding... but we're going to leave that for another article.)

To determine the total number of partitions we'll roughly divide the total required data size from our working set by the amount of memory available in each server we'll use for a partition.

If you're fortunate enough to be ordering server hardware prior to deployment of your application, make your server order so that each server has the most amount of ram you can afford.  This will limit the number of shards and enable you to scale in the future should it be required.

For the sake of this exercise, let's assume our standard server profile is equipped with **256GB of RAM**.  In order to safely fit our working set into memory, we would want to partition the data in such a way that we created (**2.7TB/256GB**) or 11 partitions (rounded up, of course.)

In future articles, we'll discuss in further detail the process of determining exactly how to partition or shard your data.

## Conclusion

In summary, we've answered the question, how do we go about sizing for a MongoDB deployment - or - how do I go about coming to know the unknowable?  We looked at the data, and the access patterns of that data.  We worked through an example and found that there are really no shortcuts - we must understand the data and how it will be manipulated and managed.

Lastly, we came to a conclusion - an educated guess about the number of servers, and the amount of RAM that will be required for each.  I want to stress that Sizing MongoDB is part art, and part science.  You can rarely, if ever get all of the facts so to bridge the path of uncertainty, we use educated guesses and then we test... we search for empirical data to support our hypotheses and we test again.  You will do yourself a great disservice if you try to size your MongoDB deployment and you neglect this fact.  You must test your sizing predictions and adjust where you see deviations in the patters associated with your application - or your test harness.

If you have a challenge or a project in front of you where you need to deploy server resource for a new MongoDB deployment, let me know.  Reach out via the contact page, or hit me up on [LinkedIn](http://linkedin.com/in/mlynn), or [Twitter](http://twitter.com/mlynn) and let me know how you're making out with your project.

