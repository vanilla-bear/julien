-= ImageLightBox Drupal module =-

Summary
=========================
This module provides integration with ImageLightBox library.

Requirements
=========================
 * imagelightbox should be installed to libraries/imagelightbox directory.

Installation
=========================
 * Install as usual, see http://drupal.org/node/895232 for further information.
 * Download ImageLightBox library from https://github.com/osvaldasvalutis/imageLightbox.js.
 * Unzip the library and place files from dist directory to
   libraries/imagelightbox directory.

Notes
=========================
 * You can use `drush imagelightbox-download` command for easy installation of the
   library.
 * To make it work with Views you should either set "Use field template"
   checkbox or manually add "imagelightbox" class in View field style settings.
