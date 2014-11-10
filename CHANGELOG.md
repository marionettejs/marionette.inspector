## V0.1.1
#### 11-10-2014

### Added
+ Added the activity feed behind a flag. It's hidden for now while performance and UI is improved.
+ Added a "start inspector" button so that the inspector doesn't force a refresh
+ Added reloading logic so that the inspector stays uptodate
+ Added support for Backbone.Radio in the radio tab
+ Added support for fetching the regionTree from app.layout

### Fixed
+ fixed agent.js script name, so that it's given the name of the script for debugging purposes.


## V0.1.0
#### 11-6-2014

### Added
+ Added a manual inspector start method `__agent.start` for when the app is not discoverable.
+ Added the Radio pane. Now all of the Radio channels are browsable.
+ Started logging view and model create and destroy events individually.

### Fixed
+ Fixed a bug where Backbone was being set on the window and was not being detected.


## V0.0.8
#### 11-4-2014

### Fixes
+ Fixed a couple small bugs that were an issue for v0.0.7



## V0.0.7
#### 11-4-2014

Release seven adds two exciting features:
1. A [data pane](http://cl.ly/YLgM) for seeing your app's models
2. Automatic app detection. Previously the app had to be referenced on `window.app`

### Added
+ Add Data pane for viewing models created in the application

+ Started patching Marionette Application.
  We now automatically detect applications when they're created.

+ Created empty Radio and Activity panes. They'll be filled in soon.

+ Added a test-harness and some initial tests for the agent core. More will
happen here soon.

+ Added an Inspector Module base class that is shared between panes (ui, data, ...)

### Removed
+ Stopped logging view dom events as they weren't being used in the inspector.

### Changed
+ Improved serializing significantly.
  Views and Models now share an internal `inspectValue` function that identifies
  types and creates a summary for use in the inspector.

+ Dramatically improved backbone and marionette patching.
  We were previously patching both libraries at the same time, but they're now
  split up so we will patch backbone when we find it and Marionette later when it's detected.

+ Split up the build step a little bit further. We now compile an `agent.js`, `localAgent.js` and `core.js`
  Core is the agent.js minus library dependencies and library patching.
  It's useful for the test harness because we want to re-load libraries that will be patched before each test.

+ `agent/logic.js` was changed to `agent/agent.js` to be more consistent.

+ Updated the `updated.html` to refer to the Marionette Inspector.


### Fixed
+ Fixed inspector router issue when navigating between two panes


## V0.0.6
#### 10-29-2014

### Fixed
  + Fixed backbone detection so that we get region tree update events again
  + Fixed the regionInspector so that collection and composite views get added to the region tree.

## V0.0.5
#### 10-28-2014


### Added
  + Added a highlight feature, where when you mouseover a view, the inspector highlights the dom on the page where the view resides.
  + Added a magnifying glass feature, where when you turn it on and mouseover a part of the page, we show you which view manages that region.
  + Improved the regionTree function so that it now checks both the application and app.rootView for those using the `rootView` V3 api. cough cough @jmeas

### Removed
  + Removed both the panel folder and elementsSidebar work as that was strictly for the backbone-debugger.

### Changed
  + Renamed core Inspector components to be more inline with the venacular we've been using on the project. backboneAgent became agent, devTools became inspector.
  + Moved Logger and Debug to the common/utils folder. In a future release debug will be deprecated in favor of Logger.
  + Refactored marionetteObserver code into smaller chunks in the `agent/marionette` folder.

### Fixed
  + Fixed the "app not found" language to make it clear that you have to expose the app on `window.app`
  + Fixed the commands api, so that clicking on an element or function will take you to the elements tab and sources tab
  + Fixed a backbone observer bug where, the agent would blow up if the listeners weren't properly set. This was happening for people who were using webpack and browserify


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
