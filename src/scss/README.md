# SCSS Architecture Overview

## File Structure

The `scss/` directory contains a few important things.

- **Bootsrap4** contains the entirety of the bootstrap4 beta framework. It contains all of the scss partials and mixins that make up bootstrap4. This boilerplate has all bootsrap 4 components imported into the stylesheet but you can make it as robust as you need it. Exclude items you don't need or won't use. These items all get imported in the '_bootstrap4' partial and the bootstap4 partial gets imported into the manifest which is then imported into the main stylesheet.
- **vars** is the partial where you will define global variables to reuse throughout your code. See Global Variables below for more information.
- **manifest** is the partial that imports the bootstrap4 framework and your custom variables from the var partial.


## Compilation

All scss files are processed by GULP and put into the dist folder. You can choose to pull a minified version or not.


## Global Variables

Customizable variables are stored in the `_vars.scss` partial. This includes things like font styles, colors, breakpoints and base sizing measurements. Use these variables throughout the rest of the project, and add more as you see fit. `_vars.scss` also contains switches to include or exclude features as you need them.

(Adam Knee)[http://www.adamknee.net]








