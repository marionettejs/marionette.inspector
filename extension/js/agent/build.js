
 /*
  * LIBRARIES
  *
  */


// @include ../lib/underscore.js
var _ = this._;


// add jQuery if it's not there
if (_.isUndefined(window.$)) {
  // @include ../lib/jquery.js
}

// add jQuery to window.__agent because Backbone requires it on the root
this.$ = window.$;

// @include ../lib/watch.js
// @include ../lib/underscore-contrib.js

// @include ../lib/backbone-no-amd.js
// @include ../lib/backbone.radio.js
// @include ../lib/marionette.js

// define Backbone and Marionette locally in the agent closure
var Backbone = this.Backbone;
var Marionette = this.Marionette;


/*
 * UTILS
 *
 */

// @include ../common/util/debug.js
// @include utils/bind.js
// @include utils/isObject.js
// @include utils/isArray.js
// @include utils/clone.js
// @include utils/sendMessage.js
// @include utils/getHiddenProperty.js
// @include utils/setHiddenProperty.js
// @include utils/setProperty.js
// @include utils/objectPath.js
// @include utils/serializeObject.js


/*
 * WATCHERS
 *
 */

// @include watchers/stopWatching.js
// @include watchers/onObjectAndPropertiesSetted.js
// @include watchers/watchOnce.js
// @include watchers/onSetted.js
// @include watchers/onceSetted.js
// @include watchers/onSettedDeep.js
// @include watchers/stopOnSetted.js
// @include watchers/stopOnSetted.js
// @include watchers/onSettedDeep.js
// @include watchers/stealthOnSetted.js
// @include watchers/stopStealthOnSetted.js
// @include watchers/onDefined.js
// @include watchers/onceDefined.js


/*
 * COMPONENTS
 *
 */

// @include components/components.js
// @include components/util/sendAppComponentReport.js

// @include components/AppComponentAction.js
// @include components/AppComponentInfo.js

// @include components/getAppComponentsIndexes.js
// @include components/getAppComponentInfo.js
// @include components/getAppComponentInfoByIndex.js
// @include components/getAppViewInfoFromElement.js
// @include components/setAppComponentInfo.js
// @include components/registerAppComponent.js
// @include components/monitorAppComponentProperty.js
// @include components/addAppComponentAction.js


/*
* PATCHES
*
*/

// @include patches/util/patchFunction.js
// @include patches/util/patchFunctionLater.js

// @include patches/patchDefine.js
// @include patches/patchBackbone.js
// @include patches/patchBackboneComponent.js
// @include patches/patchAppComponentTrigger.js
// @include patches/patchAppComponentEvents.js
// @include patches/patchAppComponentSync.js
// @include patches/patchBackboneView.js
// @include patches/patchBackboneModel.js
// @include patches/patchBackboneCollection.js
// @include patches/patchBackboneRouter.js


/*
 * MARIONETTE
 *
 */

// @include marionette/knownTypes.js
// @include marionette/serialize/serializeEventsHash.js
// @include marionette/serialize/serializeElement.js
// @include marionette/serialize/viewSerializer.js
// @include marionette/actions/search.js
// @include marionette/actions/stopSearch.js
// @include marionette/actions/highlightEl.js
// @include marionette/actions/unhighlightEl.js
// @include marionette/utils/viewList.js
// @include marionette/utils/regionInspector.js

// @include marionette/appObserver.js


/*
 * MAIN
 *
 */

// @include agent.js
