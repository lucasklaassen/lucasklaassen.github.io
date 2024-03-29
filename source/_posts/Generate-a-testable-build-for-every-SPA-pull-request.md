---
title: Generate a testable build for every SPA pull request
date: 2019-01-27 10:00:00
---

Our dream was to have multiple developers post a pull request to our Angular SPA Github repo and have a bot comment a link allowing you to test it. We got this idea from the [Angular repo](https://github.com/angular/angular/pull/28329#issuecomment-457151836). They have a bot called "mary-poppins" that posts a link every time someone creates a PR related to their [getting started site](https://angular.io). This allows anyone to visually QA the PR and ensure the site is still intact.

We searched around the internet looking for solutions for this. We came across a hosted solution called [Surge](https://surge.sh) that allows you to deploy static assets to their service and have a unique URL be generated. This was cool and would do everything we needed but we wanted to see if there was a way to do this that was open source. We knew that if we could deploy our assets onto an instance and route requests via a reverse proxy we could achieve what we wanted.

I was an idiot and assumed the Angular repo wouldn't expose how they were accomplishing it themselves. Their build pipeline is open source and all of the steps to accomplish what we wanted are clearly outlined. Their circle-ci build configuration is included in [their main repo](https://github.com/angular/angular/blob/master/.circleci/config.yml).

Reading through it, we found a job called "aio_preview" which is building their project, creating a tarball and saving it as an artifact. They then trigger a webhook to the following URL: https://ngbuilds.io/circle-build. The documentation says that this request will trigger their build server to grab the newly saved build artifact from circle-ci, copy it to the server and then trigger their bot to comment on the PR with a link composed of the commit SHA and PR number.

Navigating through the Angular repo we found that they have documentation outlining how to configure their [build server with Docker](https://github.com/angular/angular/blob/master/aio/aio-builds-setup/docs/_TOC.md).

We copied this setup and customized it for our build URL, while also adding some other customizations specific to our company needs. Luckily for us, we were already using circle-ci to build our projects but these steps could be copied to other continuous integration pipelines. Kudos to the Angular team for being so self-documenting and opening up this build pipeline to the world. We are forever grateful!

If you have any followup questions or comments, [send me an email](mailto:lucasklaassen1@gmail.com).
