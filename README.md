mySpaceBase
=========

### mySpaceBase is a Sass-based responsive CSS framework.

Many CSS frameworks are meant to be included and left alone. But mySpaceBase is a boilerplate layer that can be built upon and tailored for your needs. It combines best practices for today’s responsive web with the core components we use on every project. Consider it the launch pad for your adventures into cyberspace.

mySpaceBase is the front-end starter files for any new web project. It sets up your Sass architecture and normalizes your CSS and native HTML elements. It provides the structural groundwork for your application.

Built on spaceBase:
[![Build Status](https://img.shields.io/travis/space150/spaceBase.svg?style=flat-square)](https://travis-ci.org/space150/spaceBase)

### Highlights

* Object-oriented CSS
* Optimized for light speed
* Common UI components (buttons, lists, media object)
* Helper classes and mixins
* Cross-browser form controls
* Built on REMs, with px fallback
* Supports modern browsers including IE8+

### Customizable Features

* Compatible with any Sass 3.3 compiler
* Start with Normalize (default) or CSS Reset
* Scalable, mobile-first grid - choose how robust you want it
* Base font size for mobile vs desktop
* Global variables for breakpoints, colors, fonts and more

## Getting Started
```sh
1. $ git clone the project directory
2. $ npm install
3. $ gulp launch or 'gulp dev' to start the tasker
```
3. Open scss/_vars.scss to make changes to your global variables.
4. Start building out your HTML. I've included index.html as a starting point.
5. scss/base/ is the core of mySpaceBase. Build your UI layer in scss/ui/

Your editor can be setup with EditorConfig so that code style standards are enforced automatically. See http://editorconfig.org/#download and install the plugin for your editor of choice.

## IMPORTANT

* If you're building a static content page for DSG, GGXY, or FnS, import the code base from 'app/scss/sites-base/' . This way your local build will have the same starting files as the site.

## The spaceBase structure

Read the [CSS Architecture Overview](app/scss/README.md) for documentation of the SCSS files.

```
Build in the app directory. 

app/
  assets/
    fonts/
    images/
    media/
scss/
  base/
    ...
  ui/
    ...
  vendor/
    ...
  sites-base/
    ...
  _manifest.scss
  _vars.scss
  application-ie.scss
  application.scss
  styleguide.scss
css/
  application-ie.css
  application.css
  styleguide.css
js/
  scripts.js
```

You can remove:
- `bower.json`
- `Gemfile`
- `Gemfile.lock`
- `Rakefile`
- `test/`
(If you download the original)

## Credits

* [Harry Robert’s Inuit.css](https://github.com/csswizardry/inuit.css)
* [Sass MQ](https://github.com/sass-mq/sass-mq)
* [Bootstrap](http://getbootstrap.com)
* [HTML5 Boilerplate](http://html5boilerplate.com)
* [Normalize.css](http://necolas.github.io/normalize.css)
* [Eric Meyer’s CSS Reset](http://meyerweb.com/eric/tools/css/reset)

## License

mySpaceBase is free to use under the [MIT License](LICENSE.md).

Copyright 2017 [Adam Knee](http://www.adamknee.net)

## Original Theme License

spaceBase is free to use under the [MIT License](LICENSE.md).

Copyright 2016 [space150](http://www.space150.com)
