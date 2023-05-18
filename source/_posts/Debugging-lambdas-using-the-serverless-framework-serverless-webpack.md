---
title: Debugging lambdas using the serverless framework + serverless-webpack.
date: 2017-12-17 17:30:00
---
Our team has started to use the [serverless-framework](https://serverless.com/) to create microservices. We have built API's for basic CRUD features to full fledged ETL processes which pipe our microservice data back to our reporting database. This framework saves us a lot of time and gives us guidelines to organize our lambda's and AWS resources into categorized services. We use the [serverless-offline plugin](https://github.com/dherault/serverless-offline) to run our lambdas in a local environment and we use it alongside our test suite. One thing that we were missing with this framework was the ability to use [visual studio debugging](https://code.visualstudio.com/docs/editor/debugging) support with nodejs. It's a beautiful thing to be able to see what's going on in your app at runtime. As a team, we missed dropping in `debugger`.

We use the [serverless-webpack plugin](https://github.com/serverless-heaven/serverless-webpack) to bundle our project before we deploy to AWS. This initially appeared to add a layer of complexity to debugging. After reading through this [thread](https://github.com/serverless-heaven/serverless-webpack/issues/42#issuecomment-288845943) however, we saw the light.

All we needed to do was update our [webpack.config.js](https://gist.github.com/lucasklaassen/7c18b28d8c4d692db439ca367e973db0) with `devtool: 'source-map'`. [Here is a copy of our launch.json file](https://gist.github.com/lucasklaassen/6b09ae7ee5542f2a69c494a66362fc4b) which you can use within Visual Studio Code to get debugging support setup.

If you have any comments or questions please reach out on the gist's provided or [send me an email.](mailto:lucasklaassen1@gmail.com)
