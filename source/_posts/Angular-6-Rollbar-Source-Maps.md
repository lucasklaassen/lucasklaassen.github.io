---
title: Angular 6 Rollbar Source Maps
date: 2018-05-29 19:10:00
tags: angular
---

[Link To Github Repo](https://github.com/lucasklaassen/angular-rollbar-source-maps)

Rollbar is a great tool that helps shed light on errors that occur within your code. However, when you minify your javascript code for deployment, it is hard to debug exceptions that arise in a production environment.

Luckily for us, [Rollbar allows us to upload our javascript source maps](https://docs.rollbar.com/docs/source-maps) so that we can see metadata from the exception including the original source filename, line number, method name, and code snippet.

Unfortunately for us, Rollbar does not have a streamlined process for uploading these source maps within an Angular 6 deployment pipeline. There is a [webpack solution](https://github.com/thredup/rollbar-sourcemap-webpack-plugin) but this requires you to use `ng eject` to gain access to make changes to the webpack configuration file.

I built a script that can loop through the javascript map files within your dist folder and upload them to Rollbar when you build your Angular 6 application. After the javascript source map files have been uploaded to Rollbar via their API, it wipes them out from the dist folder to prevent them from being deployed to production. (Although a user can deobfuscate your code without source maps, I recommend you always cover all of your bases)

If you have any followup questions or comments, [send me an email.](mailto:lucasklaassen1@gmail.com)
