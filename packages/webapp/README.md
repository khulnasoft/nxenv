# nxenv.khulnasoft.com Web App

A Next.js + React web application of nxenv.khulnasoft.com.
It utilizes the brand new incremental static generation feature of Next.js to deliver pages fast.
Available at: https://app.nxenv.khulnasoft.com

## Stack

* Node (a `.nvmrc` is presented for [nvm](https://github.com/nvm-sh/nvm) users).
* NPM for managing dependencies.
* Next.js as a SSR (ISG) framework
* React
* Tailwind CSS for styling

## Project structure

* `__mocks__` - Global mocks.
* `__tests__` - There you can find all the tests and fixtures. Tests are written using `jest`.
* `components` - React and styled-components components that are used across the app.
* `pages` - Contains the pages of the app. This is required by Next.js
* `public` - Files that should be publicly available and not processed by any way.

## Local environment

nxenv.khulnasoft.com web app requires a running environment of nxenv.khulnasoft.com.
[Check out this guide](https://github.com/khulnasoft/nxenv#-running-dailydev-locally) of how to run nxenv.khulnasoft.com locally.

Finally run `npm run dev` to run the service and listen to port `5002`.


## Want to Help?

So you want to contribute to nxenv.khulnasoft.com web app and make an impact, we are glad to hear it. :heart_eyes:

Before you proceed we have a few guidelines for contribution that will make everything much easier.
We would appreciate if you dedicate the time and read them carefully:
https://github.com/khulnasoft/.github/blob/master/CONTRIBUTING.md
