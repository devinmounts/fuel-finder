# Fuel Finder

#### 12/20/2018

#### By Devin Mounts

## A web application that consumes the National Renewable Energy Laboratory API of alternative fuel station locations. Locations are mapped using Leaflet.js maps. Signed in users can post, update and delete comments after clicking on a location.  Comments are stored in a MongoDB using an Node/Express API. Change streams in the database are observed with Pusher, creating a realtime db*.  Site is deployed through Zeit (now) AWS.

## Setup on OSX

* Clone the repo
* [Install and run Mongodb via Homebrew](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* instantiate a mongo daemon with replica set `mongod --replSet "rs"`
* Create a `.gitignore` file and include: `.DS_STORE, node_modules, build.`
* `npm install` to install dependencies
* `webpack-dev-server` to build and start the dev server
* `npm run lint` to explicitly run ESLint
* `npm run test` to run the unit tests with

## Contribution Requirements

1. Clone the repo
1. Make a new branch
1. Commit and push your changes
1. Create a PR

## Technologies Used

* JavaScript
* Node.js
* Express
* React.js
* Redux
* Babel
* Moment.js
* Leaflet.js
* National Renewable Energy Laboratory API
* MongoDB
* Mongoose.js
* Pusher.js

## Links

* Repo: https://github.com/devinmounts/fuel_finder
* Deployed Site:
https://www.chargemyengine.com

## *Notes 
* MongoDB deployed through mLab sandbox for development. Development db does not have access to change streams in mongo oplog.  To view application with realtime db, follow instructions for clonning application and running on localhost.

## License

This software is licensed under the MIT license.

Copyright (c) 2018 **Devin Mounts**
