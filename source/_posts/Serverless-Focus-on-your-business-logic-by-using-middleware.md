---
title: 'Serverless: Focus on your business logic by using middleware.'
date: 2018-03-03 10:30:00
tags: serverless
---

It's easy to shoot yourself in the foot with serverless technologies.

We find ourselves in the serverless wild west without the opinionated guidance of a framework.

To give you some background, our team uses the serverless framework to build serverless APIs for our platform.

We use API Gateway in front of lambda functions which take incoming requests and return standardized HTTP responses.

A problem we find ourselves encountering is that we're trying to write the framework code you'd get from Express or Rails into each of our projects.

The logic for each of our endpoints within our serverless projects starts to get awfully repetitive. This takes us away from focussing on the code that matters to our business.

Recently our friends at [IOPipe](https://www.iopipe.com/) recommended [MiddyJS](https://github.com/middyjs/middy), a middleware engine for AWS Lambda to help with this.

MiddyJS offers an engine that allows you to wrap your lambda function and abstract out the repetitive parts of your lambda functions into ['before', 'after' and 'on error' hooks](https://github.com/middyjs/middy#how-it-works).

Any validation that you perform on the HTTP requests coming into your API can be moved out into a 'before' hook.

Similarly, instead of having to manually call the lambda callback when an error occurs you can simply throw the error and have one of MiddyJS's middleware's pick it up within an 'on error' hook.

Some middlewares we found to be useful have abstracted out all of the [validation](https://github.com/middyjs/middy/blob/master/docs/middlewares.md#validator), [error handling](https://github.com/middyjs/middy/blob/master/docs/middlewares.md#httperrorhandler) and [JSON parsing of the request](https://github.com/middyjs/middy/blob/master/docs/middlewares.md#jsonbodyparser).

You can also write your own middlewares which are [custom built to your needs](https://github.com/middyjs/middy#writing-a-middleware).

This allowed us to slim down our lambda functions to only contain the business logic that we care about.

[Here's an example of a lambda function](https://gist.github.com/lucasklaassen/d69a448a2b78f393f468a3064d3400de) that includes that ability for [warmup](https://github.com/FidelLimited/serverless-plugin-warmup), request validation, error handling and JSON parsing of the request.

There are ways you could refactor this on its own and move out the different pieces into their own functions, files, etc.

That being said since there is no framework like Express or Rails available to us it's easy to find yourself in a situation like this when left unchecked.

[Here is another example](https://gist.github.com/lucasklaassen/e05ac99d42f5c9b0b1d4c85164f8fa6d), but this time using MiddyJS middleware.

We've found that this pattern has reduced noise and promoted code reuse across our lambda functions.

Our team is on a mission to identify the ways in which other teams are protecting themselves against problems like these whilst utilizing serverless technologies.

If you have any comments or questions please reach out on the gist's provided or [send me an email](mailto:lucasklaassen1@gmail.com).
