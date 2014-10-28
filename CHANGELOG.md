## V0.0.5
#### ()


## V0.04
#### (247c08e) 10-25-2014

### Added


+ backboneAgent improvements
  + Added a queue to the backboneAgent message system so that messages that are sent from the browser window to inspector tab would be debounced and capped at 1000.

  + Added more information to backboneAgent messages, so that the inspector has more information about what happened to the application.


+ Inspector Application improvements:
  + Started debouncing key inspector data fetch and render functions because they were being called excessively.
  + Added a new Logger utility for monitoring inspector events without cluttering the console.


+ Inspector UI improvements:
  + Added a new UI tree with expanding / collapsing powers.
  + Improved the UI layout with independent pain scrolling.

### Changed
+ Refactored the backboneAgent so that each module was in its own file [diff](https://gist.github.com/jasonLaster/8cee8a0564c1bdeabb43).


### Removed
+ removed the backboneAgent `eventInterceptor`.

### Fixed
+ Fixed bug where the regionTree was not serializing  collection child views
+ Fix bug where the patched amd define function was no longer checking if the module was Backbone.
+ Fixed bug where showing a view's information when the element was empty would throw an error.

## V0.0.3
#### (0a3f0ad2) - 10-22-2014

### Added
+ Added element and function hyper-linking. Clicking on an element will take you to the elements tab. Clicking on a function will take you to the sources tab.
+ Added a `regionTree:updated` event for notifying the inspector that the region tree has changed and it should fetch new data.
+ Added an "app not found" message so that apps that aren't available via `window.app` will atleast get a decent error message.
+ Added a build step for the backboneAgent so that we can simplify the backboneAgent compilation phase, which chrome makes opaque.
+ Added `localBackboneAgent`, which is a separate build of the backboneAgent designed for debugging apps locally. the local backboneAgent can be loaded independently of the extension via a script tag and is much easier to debug.

### Fixed
+ Fixed the logic checking to see if the inspected script had loaded.
+ Fixed the logic for detecting `window.Backbone` so that `Backbone.View` and other classes must also be detected as well.

## V0.0.2
#### (3924fa089c) 10-17-2014

### Fixed
+ Fixed issue where the Inspector router was requiring files that were not available.



## V0.0.1
#### (ff0a30b76) (10-16-2014)

### Added
+ Everything, this was the MVP! And it was great.
