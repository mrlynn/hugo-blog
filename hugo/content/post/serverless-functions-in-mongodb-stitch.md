+++
author = "Michael Lynn"
categories = ["serverless", "mongodb"]
date = 2018-10-13T12:46:47Z
description = "Serverless and Functions as a Service don't have to be complex. MongoDB Stitch offers a simple service that will help you get started swiftly."
draft = false
image = "/images/2018/10/798.png"
slug = "serverless-functions-in-mongodb-stitch"
tags = ["serverless", "mongodb"]
title = "Serverless Functions in MongoDB Stitch"

+++

[Serverless](https://en.wikipedia.org/wiki/Serverless_computing) and [Functions as a Service](https://en.wikipedia.org/wiki/Function_as_a_service) are relatively new development paradigms that are gaining in popularity. Let’s take a quick look at what [MongoDB Stitch](http://www.mongodb.com/stitch) offers in this space.

<img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=58bba222186b057d9e88ada20ec520a7" caption="Photo by <a href="https://unsplash.com/@ilyapavlov?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Ilya Pavlov</a> / <a href="https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Unsplash</a>

Functions in Stitch are written in JavaScript [ECMAScript](https://www.ecma-international.org/publications/standards/Ecma-262.htm) and can be called from others scripts in Stitch, or from external JavaScript leveraging the client [SDK](https://s3.amazonaws.com/stitch-sdks/js/docs/4.0.0/index.html).

Here’s an example of a function in Stitch:

```
exports = function(message) {

  const mongodb = context.services.get("mongodb-atlas");

  const coll = mongodb.db("db").collection("users");

  const twilio = context.services.get("my-twilio-service");

  const yourTwilioNumber = context.values.get("twilioNumber");

  coll.find().toArray().then(users => {

    users.forEach(user => twilio.send({

      to: user.phone,

      from: yourTwilioNumber,

      body: message

    })

  );

});
```

A few things might stand out about the structure and content of this script. Let’s take a closer look at some of these components.

The first thing you’ll notice is **exports**. All Stitch functions run the JavaScript function assigned to the global variable **exports**. This is similar in theory and practice to the Node.js `module.exports` object.

Next, you’re likely to see references to **context**. Access to resources from within Stitch scripts is facilitated through the use of a context object. This object has several elements:

* **context.services:** There are several built-in services like “mongodb-atlas”. This provides access to the underlying database within Atlas. Other services can be instantiated for third-party services including GitHub, AWS, Twilio and more. These additional services will be accessed using the name you provide during configuration.

```
const db = context.services.get(“mongodb-atlas”).db(“ecommerce”);
```

Notice how easily I’m able to begin accessing my database, and collection.

* **context.values:** Values are named constants that you can use in MongoDB Stitch functions and rules. These are like global variables available to all functions in a Stitch application.
* **context.functions:** This enables you to reference other serverless functions written and hosted in Stitch.

```
exports = function(a, b) {
 return context.functions.execute(“sum”, a, -1 * b);
};
```

* **context.users:** Provides a view of the currently authenticated user.

```
{
  “id”: “5a01f135b6fc810a19421c12”,

  “type”: “server”,

  “data”: {

    “name”: “api-key”

  },

  “identities”: [{

    “id”: “5a09f135b6fc810f19421c13”,

    “provider_type”: “api-key”

  }]

}
```

Lastly, a resource available to developers of serverless functions in Stitch that we’re not representing in the example function, but that bears mentioning is the set of **utilities** exposed as methods in Stitch functions. There are several pre-imported JavaScript libraries available for your serverless functions:

* **console** can be used to output to the debug console and console logs.
* **JSON** can be used to convert between string and object representations of standard JSON.
* **EJSON** can be used to convert between string and object representations of MongoDB Extended JSON.
* **BSON** can be used to construct and manipulate BSON types.
* **utils.crypto** provides methods for working with cryptographic algorithms.

Utilities and context objects leveraged as a part of your application make it possible to create rich, powerfully integrated applications that don’t need a lot of the boilerplate code set up.

Developing applications leveraging serverless is a bit different — but once you get used to leveraging the tools available, it is extremely powerful and helps you create better applications. And do it faster as well. It’s a huge benefit to using MongoDB Stitch in your development cycle.

To read more, and get started, check out the [documentation](https://docs.mongodb.com/stitch/functions/), sign up for a [free Atlas account](http://cloud.mongodb.com) and begin writing a serverless application today.



