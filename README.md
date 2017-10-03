mySpaceBase
=========

### mySpaceBase is a Sass-based responsive CSS framework built on spaceBase.

## Getting Started
```sh
1. $ git clone https://user-name@bitbucket.org/dsgfed/myspacebase.git
2. $ npm i
3. $ gulp launch
```
5. Work out of the 'src' directory directly
4. Open scss/_vars.scss to make changes to your global variables.
4. Start building out your HTML. I've included index.html as a starting point.
6. scss/base/ is the core of mySpaceBase. Build your UI layer in scss/ui/
7. Do a find and replace on the entire project directory for '.mySpaceBaseWrap' and replace the name with your project specfic name (e.g. '.gameCrusher3' )

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


Your editor can be setup with EditorConfig so that code style standards are enforced automatically. See http://editorconfig.org/#download and install the plugin for your editor of choice.

## IMPORTANT

* If you're building a static content page for DSG, GGXY, or FnS, your welcome tp import the code base from 'src/scss/sites-base/' . This way you can see how the site will effect yout local build. However, please do not leave these imported for productions.

## The mySpaceBase structure

Read the [CSS Architecture Overview](src/scss/README.md) for documentation of the SCSS files.

```
Build in the src directory. 

src/
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

* [Adam Knee] (http://adamknee.net/)
* [Harry Robert’s Inuit.css](https://github.com/csswizardry/inuit.css)
* [Sass MQ](https://github.com/sass-mq/sass-mq)
* [Bootstrap](http://getbootstrap.com)
* [HTML5 Boilerplate](http://html5boilerplate.com)
* [Normalize.css](http://necolas.github.io/normalize.css)
* [Eric Meyer’s CSS Reset](http://meyerweb.com/eric/tools/css/reset)

## License

mySpaceBase is free to use under the [MIT License](LICENSE.md).

Copyright 2017 [Adam Knee](http://www.adamknee.net)

## Original Boilerplate License:

spaceBase is free to use under the [MIT License](LICENSE.md).

Copyright 2016 [space150](http://www.space150.com)
