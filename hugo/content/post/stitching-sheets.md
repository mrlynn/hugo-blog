---
author: "Michael Lynn"
categories: ["api", "mongodb", "serverless", "beginner"]
date: 2019-03-03T13:16:00Z
description: "Integrate data from Google Sheets to MongoDB"
draft: false
cover: "/images/2019/03/sewing.jpeg"
url: "/stitching-sheets"
alias: 
    - "/stitching-sheets"
tags: ["api", "mongodb", "serverless", "beginner"]
title: "Stitching Sheets: Using MongoDB Stitch to Create an API for Data in Google Sheets"

---

MongoDB Stitch is a power tool in your toolbox, capable of integrating your databases to any service with a publically available API. I've written a number of articles on this on MongoDB's Blog but in this article, I'll share a quick lesson on how to integrate data from Google Sheets, Google's online spreadsheet, into MongoDB using MongoDB Stitch. Watch the video or read on to learn what's involved.

## Starting the Workflow

There are two key elements that make this solution work. First, we have a [Google Sheets script](https://gist.github.com/mrlynn/08786459db46b731c478468869bcb7a2) which runs from a menu item we add to the sheet. This script collects a row of data at a time and POSTs it to a MongoDB Stitch HTTP Service incoming webhook. The second is the function that runs when the [webhook is called](https://gist.github.com/mrlynn/16a9ed0e1cb0fc98374816dfa79b4365) — this is where the data is received and inserted into a MongoDB Database Collection.

Here's an [example spreadsheet](https://docs.google.com/spreadsheets/d/1NOeo12Rcc09j91kQgtRiGd7vMgbB3rrIcNJRDAoBKC8/edit?usp=drive_web&ouid=112239861731016170701) that contains data for my team's event tracking spreadsheet.


Google Sheets works well for this because we need to collaborate on the events that we'll cover. Each Developer Advocate adds interesting events or conferences to the sheet. But what if I wanted to make this data available outside of Google Sheets?

What if I wanted to build an API so that this data was exposed and available for another application to consume? Slack, for example?

To accomplish this, we'll use Google Sheets Scripting to send the data from a worksheet to a MongoDB Stitch Service API.

## Create a Google Sheets Script

Google Apps Script is a scripting language for light-weight application development in the G Suite platform. It is based on JavaScript 1.6 with some portions of 1.7 and 1.8 and provides a subset of ECMAScript 5 API, however instead of running on the client, it gets executed in the Google Cloud.

![1](/media/image1-hldtk372nb.png)

From the Tools menu in Google Sheets, select Script editor. If you want to skip this section, you can make a copy of the [spreadsheet](https://docs.google.com/spreadsheets/d/1NOeo12Rcc09j91kQgtRiGd7vMgbB3rrIcNJRDAoBKC8/edit#gid=0) that already has the script attached.

## Sending Data from Sheets to MongoDB

In our sheet, we have the following structure - columns: Events, URL, Type, Start, End, location, Status and Owner.

The script simply loops through the active data in the sheet, each column in each row and builds an object with the values. This is what an object from a row of values looks like:

```
{
	"_id" : ObjectId("5c7bf99caf6a96a9b45f84b4"),
	"owner" : "Steve",
	"date_start" : "2019-02-09T05:00:00Z",
	"name" : "PyTennessee",
	"location" : "Nashville, TN",
	"date_end" : "2019-02-10T05:00:00Z",
	"type" : "Conference",
	"status" : "Approved"
}
```

Then we form a POST request using the Google Script class [UrlFetchApp](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app) to send the object with our values to a MongoDB Stitch HTTP Service.

{{< gist mrlynn 08786459db46b731c478468869bcb7a2 >}} 
