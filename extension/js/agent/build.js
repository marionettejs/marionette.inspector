
 /*
  * LIBRARIES
  *
  */

// @include ../lib/watch.js
// @include ../lib/underscore.js
// @include ../lib/underscore-contrib.js



var _ = this._;

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
// @include utils/objectPath.js


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
// @include components/patchBackboneComponent.js
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
// @include patches/patchAppComponentTrigger.js
// @include patches/patchAppComponentEvents.js
// @include patches/patchAppComponentSync.js
// @include patches/patchBackboneView.js
// @include patches/patchBackboneModel.js
// @include patches/patchBackboneCollection.js
// @include patches/patchBackboneRouter.js
 // @include patches/patchMarionetteApplication.js


/*
 * MARIONETTE
 *
 */

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

// @include logic.js
