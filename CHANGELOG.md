## V0.9
#### 12-06-2017

### Fixed
+ Do not show Commands section in Radio side pane when using Radio >= v2 

### Added
+ Support for Firefox

### Changed
+ Reduced size of injected script (window.__agent)
+ Reduced latency between layout changes and UI inspector update
+ Migrated inspector to Marionette V3 


## V0.8.1
#### 05-28-2017

### Fixed
+ Fix loading inspector in OS with case sensitive file system

## V0.8
#### 02-28-2017

### Fixed
+ Loading Marionette v2.4 applications
+ Do not show dummy timestamp region in UI tree
+ Fix endless loop in WatchJS when observing view._events

### Added
+ Support for Marionette v3 applications
+ Show a meaningful message in the side panel for empty regions


## V0.7
#### 10-30-2015

### Fixed
+ fixed grunt-sass dependency [thanks @jdaudier]

### Added
+ A flamechart timeline of event activity. It's insanely great.


## V0.6
#### 6-30-2015

### Fixed
+ scrolling when an element is selected
+ fixed serializing views with undefined getters

### Added
+ responsive info panels
+ Moved watch loop into it's own file
+ added class names based on require path
+ start sending region tree updates immediately (feels faster)
+ added startLogging and getViews convenience methods



## V0.5.6
#### 4-13-2015


### Added
+ Added a batching system for checking for changed properties. Previously, all the objects we were watching were checked synchronously, now we check in groups of a thousand, which could have a big impact on performance. As a rule of thumb, checking for changes took 10ms per thousand objects.

### Fixed
+ Fixed the loop interval, so that instead of checking every 50 milliseconds, we now check every 200ms and when there are idle cycles. This was a regression introduced in a previous release.


## V0.5.5
#### 4-13-2015

This release fixes an ES6 issue, is significantly faster for big apps, and adds class IDs.

### Added
+ Now tests across multiple versions of _ and bb and mn
+ Model attributes are now sorted
+ Started patching extend, which gives us a class id
+ Make serialize collection lazy
+ Make QueuedWorker.send lazy - communication with the inspector will be much faster

### Fixed
+ Removed Wreqr as knownType for backbone 2.0.0 apps,
+ stopped patching render and remove function calls, which will be a nice perf win
+ better handle undefined / invalid getters
+ clicking a function in the inspector used to jump to source

## V0.5.4
#### 3-10-2015

### Added
+ License
+ Usage analytics
+ Wires URL
+ Static build

## V0.5.3
#### 3-1-2015

### Added
+ Re-Added the Activity feed.

### Changed
+ Hid the "application" view tree root, which was confusing a lot of people

## V0.5.2
#### 1-7-2015

### Added
+ Added a context field to the Activity feed
+ Added some big performance improvements to the Activity Feed

### Changed
+ Continued refactoring the agent to support an IIFE pattern
+ Refactored setHiddenProperty
+ Fixed a bug that was impacting marionette 2.3

### Removed
+ Removed the Activity tool for the time being. It'll come back when it's more ready for the prime time.


## V0.5.1
#### 1-2-2015

### Overview
This is a small, hopefully uneventful Inspector Release.

The nicest thing here is the introduction of a back & forward button, which helps when you use the inspector a lot to jump from one view, to another, and then a model get back to where you came from.

The other nice little thing, is a "View is loading" pane, which is useful now that we delay serializing views. In 0.5 it became kinda common to have to wait a second or two for everything to load. During that time, you'd see a blank view info pane if you clicked on a region. Now we let you know, you just gotta hold your horses.


### Added
+ Added a default recording for the sandbox
+ Added an inspector back/forward button
+ Added an inspector loading view for fetching views

### Changed
+ Refactored agent utilities to be more consistent

## V0.5
#### 12-24-2014

### Overview

### Added
+ Added the LazyWorker. The lazy worker throttles agent tasks so that the tasks are run primarily during window idle cycles.
+ Added Inspector sandbox. The sandbox is a new dev environment for working on the inspector w/o a running app.
+ Added lots of new documentation for getting started
+ Improved the activity pane duration precision from milliseconds to nanoseconds.
+ Added an inspector test-suite. We should have had this a long time ago, but the environment was difficult to configure.
+ Added UI activity and warnings pane for showing events in the UI info panel
+ Added a selected state for the activity tree node

### Changed
+ Changed vendor 3rd party libraries to be installed from bower and npm rather than a local version in the repo.
+ Upgraded to latest grunt-mocha
+ Extracted tests scripts into their own file
+ Switched to grunt-sass for 1000x perf speedup on build times
+ Refactored agent to use more underscore utils
+ Refactored agent util folder to use iife pattern with Agent namespaces.


## V0.4
#### 12-18-2014

### Overview
+ We're enabling the Activity Pane for the first time
+ UI Info shows triggers, listeners, activity, and warnings
+ Data Info shows class hierarchy
+ Radio handler contexts and callbacks are much better supported


### Added
+ Added more metadata for event triggers (listeners, tart, end, and actionId)
+ Added Behaviors, Module, Object, Application, and Controller to app component registry
+ Added printProperty helper for console messages
+ Re-styled inspector header
+ Add view Triggers pane
+ Add view Listeners pane
+ Improved findKey helper so that it unwraps listenToOnce and detects the underlying callback
+ Improved findKey helper so that it looks up the prototype chain
+ Added class heiararchy panes to Model
+ Added much better support for detecting Radio contexts and callbacks


### Changed
+ Refactored patchDefine to split it up into smaller pieces
+ Refactored serializeEvents to conform to B.Events


### Fixed
+ Fixed bug where the info pane would appear clipped
+ Fixed bug where inspecting an element would fail if underscore weren't defined globally in the window
+ Fixed serious issue where agent.js linenumbers were mis-aligned
+ Fixed clientInspect so that it works for jQuery elements
+ Fixed search for sessions that changed the elements while search was on
+ Fixed clientInspect's handling of native functions
+ Fixed Activity pane UI so that it's based off of the new components tree
+ Fixed Activity pane perf issues by debouncing a couple things
+ Fixed patchWindow bug where marionette could be found w/o backbone

### Removed

## V0.3
#### 12-1-2014

0.3 Adds tons of features for surfacing view and model properties and making them clickable.

+ Views now show their parent class properties
+ Models show the objects that are listening to their events
+ Models have an info pane for cid, collection, _pending, and _changing flags
+ Views have an info pane for cid, element, model, and many other fields.
+ Almost everything in the model and view pane is clickable, which will jump to an element, function, or print a value to the console.
+ The Radio pane now gives the context and function name for events, request, and commands.

There are many more small features bundled in aswell.

### Added
+ Added support for seeing Radio pane handler callback and context for events, requests and commands
+ Added a view info pane for showing the view's cid, element, model, ...
+ Added ancestor class panes for views. A typical view will now have a pane for (Marionette.ItemView, Marionette.View, and Backbone.View properties)
+ Added support for clicking on View and Model Properties
+ Added support for clicking on Backbone Models and Backbone Views
+ Added support for looking up an ononymous function's name based on the object it was defined in.
+ Added an inspectValue keys field for when a value is defined in an object.
+ Improved the Model info pane to show the cid, id, _pending, _changing, _listenerId, and collection field
+ Added support for showing a model's listeners, which lists the objects listening to the model.

### Fixed
+ Fixed the tests to better handle global __agent methods
+ Fixed a bug where Marionette is defined on Backbone and in its own module
+ Fixed a bug where `define` did not work with 3rd party libraries
+ Fixed the bootstrap responsive nav - so that it stops showing the nav button on small widths.
+ Fixed "file not found" errors w/ requirejs

### Changed
+ Re-organized the inspector's styles. They're now decently well factored in partials.
+ Cleaned up the serializing naming conventions to be more consistent. (Added inspectObject)

## V0.2.1
#### 11-20-2014

This version introduces realtime syncing for some properties (view ui, model attribues) and hyperlinking for some objects (models in view options). Future versions will add a lot more property syncing and object links.

We also fixed a pretty bad bug, where when the page refreshes the inspector would have multiple views in the cache with the same cid.

### Added
+ The <Backbone.Model> links in View options now link to the model in the data pane
+ The view UI attributes are now updated when they change
+ The Model Attribues are now updated when they change
+ Added Collections to the data pane
+ Added the array type to the inspectValue function so that arrays are serialized properly


### Fixed
+ Fixed a bug where the inspector would not clear it's cache of views and models when the page was refreshed. This resulted in multiple views in the cache having the same cid.
+ Fixed phantomjs Function.prototype.bind bug
+ Removed unused libraries
+ Fixed Readme puppet org references


## V0.2
#### 11-17-2014

Version 0.2 sports a brand new UI tree with significantly improved performance and magnifying glass.

### Added
+ Added a highlight mask when using the magnifying glass. Previously the element got a background color, which would be hidden by other elements.
+ Added a new backbone based tree component for use in the UI tree.
+ Added an inspector view collection for keeping track of view instances created in the inspected app.
+ Added a new ui architecture for updating the UI tree on changes. Previously the full serialized ui tree was sent with every change, now a trimmed down UI tree with just cids is sent. This results in a 30% performance improvement.
+ Added a scriptUrl for the injected script (agent.js)
+ Added sass compilation

### Fixed
+ Fix page refresh logic so that the inspector stays uptodate after router.navigate calls
+ Fix select and hover state for Radio and Data ui panes
+ Fix agent toJSON function so that catches circular exceptions when parsing
+ Fixed inconsistency with logger file name.

### Upgraded
+ Upgraded Handlebars to 2.0

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
