[Web Toolkit](http://skyglobal.github.io/web-toolkit/) [![Build Status](https://circleci.com/gh/skyglobal/web-toolkit.png?circle-token=24eeba25d7352dec038ea9fa25b22671ba28be5e)](https://circleci.com/gh/skyglobal/web-toolkit) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
========================

> Sky branded CSS, JavaScript utilities, and UI components.

> Save time by using the toolkit to set your base styles. Create Sky styled headings and buttons within seconds.

> The toolkit can also help you quickly build robust components like accordions and carousels.

> Business descriptions of component functionality is visible from directly within the demo site (created from the actual unit-test reports)


## Contents

 1. [Getting Started](#getting-started)
  1. [Prerequisites](#prerequisites)
  2. [Setup](#setup)
  3. [Building/Running the Toolkit](#buildingrunning-the-toolkit)
 2. [Code Overview](#code-overview)
  1. [Folder Structure](#folder-structure) 
 3. [Contributing](CONTRIBUTING.md)
 4. [Versioning and Releases](RELEASING.md)
 5. [Change log](CHANGELOG.md)
 6. [Troubleshooting](TROUBLESHOOTING.md)


## Getting Started

This project contains the code to generate the `toolkit` files, e.g. `toolkit.js` + `toolkit.css`.
The code to generate the [demo site](http://skyglobal.github.io/web-toolkit/) is also here.

### Prerequisites

To build the toolkit locally, you'll need to install:
 * [ruby](https://www.ruby-lang.org/) (version 1.9.3 or later),
 * [node.js](http://nodejs.org),
 * [npm](https://www.npmjs.org),
 * [grunt cli](http://gruntjs.com/getting-started),
 * [Bundler](http://bundler.io)

To check you have these tools with the correct versions, run:
 * `which node && which npm && which grunt && which ruby && which bundle`
 * `bundle check && npm update`

### Setup

Clone the repository and install the dependencies

```bash
git clone https://github.com/skyglobal/web-toolkit.git
cd web-toolkit
git add remote upstream https://github.com/skyglobal/web-toolkit.git
npm install
bundle install
```

### Building/Running the Toolkit

Update the toolkit by making your change and testing it within the demo site.

 * `grunt server` : Grunt will spin up the [Jekyll](http://jekyllrb.com/docs/github-pages/) server, watch for code changes and rebuild on the fly.
 * `grunt server --beautify` : To help when debugging.
 * `grunt test` : Runs the unit tests in [PhantomJS](http://phantomjs.org/)
 * `grunt test-cross-browser` : Runs the unit tests using multiple browsers remotely.
 * `grunt fonts` : Only needed to rebuild the Icon Fonts (skycons).

Please help us out by contributing any changes you make locally back into the source project. See [CONTRIBUTING.md](CONTRIBUTING.md).

For more details about the available commands please see [grunt/README.md](./grunt#web-toolkit-grunt)

## Code Overview

The repository contains two main components; the Web Toolkit and the demo site.

*  Sass files are in [`grunt/sass`](./grunt/sass) and compiled output is saved into [`dist/stylesheets`](./dist/stylesheets)
*  JavaScript code is in [`grunt/js`](.grunt/js) and contains four modules which are output to [`dist/scripts`](./dist/scripts)
  *  `toolkit` contains the JS utilities and toolkit UI components code
  *  `demo` provides demo support for the website
  *  `changes` provides support for the changes page of the website
  *  `testIframe` provides support for running unit tests online on the website
* HTML files are in [`_includes`](./_includes)
*  Skycons are in the [`static/font-svgs`](./static/font-svgs) and minified into [`grunt/fonts/min`](./grunt/fonts/min).

### Folder Structure

    $ tree
    .
    ├── _includes       => Source code for the toolkit documentation. Your demo html goes here
    │   └── allIncludes.html => a single file referencing all includes. used for demo and test page
    ├── _layouts        => layout for the index and test html pages
    ├── _site           => content generated by Jekyll
    ├── dist            => content generated by Grunt
    ├── grunt           => dev area for source code. get stuck in
    │   ├── fonts       => templates used to generate the font icons (skycons)
    │   ├── icons       => icons that are multi coloured and used within scss for spriting (not yet converted to svg's)
    │   ├── js          => place for source JS files
    │   ├── sass        => place for source SCSS files
    │   └── svgs        => retina ready multi-coloured icons.
    ├── node_modules    => npm plugins
    ├── static          => home of the unchanging and non-generated code
    │   ├── deprecated  => code moved from the masthead project
    │   ├── font-svgs   => src svg files used to generate font icons (skycons)
    │   ├── fonts       => Sky Text Fonts
    │   ├── images      => images not for spriting
    │   ├── lib         => untouched third-party files
    |   └── wiki-images => images used for demos in the wiki
    ├── test
    │   ├── libararies  => Third-party src files for testing
    │   ├── specs       => place for *-spec.js files
    │   ├── screenshots
    │   ├── config.js   => RequireJS and Mocha config file
    │   └── runner.js   => explitly call each spec file for `grunt test` to run
    ├── config.yml      => Jekyll config file
    ├── changes.html    => Page for users to see changes between toolkit version
    ├── circle.yml      => CircleCI config file
    ├── gemfile
    ├── gruntfile.js    => grunt config file
    ├── index.html      => Main demo page
    ├── package.json    => NodeJS config file, includes version number for toolkit
    ├── rakefile        => build script
    ├── test.html       => used by `grunt test` to run all tests at once
    └── README.md
    
[^ back to contents](#contents)
