
if (typeof window._ == "undefined") {
  // @include ../../lib/underscore/underscore.js
 var _ = this._;
}

// @include ../../lib/nanodom.js
var nanodom = this.nanodom;

var Agent = this;

 /*
  * LIBRARIES
  *
  */

// @include ../../lib/watchjs/src/watch.js

/*
 * UTILS
 *
 */


// @include ../../common/util/debug.js
// @include ../utils/domHelpers.js
// @include ../utils/sendMessage.js
// @include ../utils/hiddenProperty.js
// @include ../utils/setProperty.js
// @include ../utils/objectPath.js
// @include ../utils/inspectValue.js
// @include ../utils/serializeObject.js
// @include ../utils/findKey.js
// @include ../utils/unwrapListenToOnceWrapper.js
// @include ../utils/isNativeFunction.js
// @include ../utils/printProperty.js
// @include ../utils/lazyWorker.js
// @include ../utils/stackFrame.js
// @include ../utils/randomString.js





/*
 * WATCHERS
 *
 */

// @include ../watchers/stopWatching.js
// @include ../watchers/onObjectAndPropertiesSetted.js
// @include ../watchers/watchOnce.js
// @include ../watchers/onSetted.js
// @include ../watchers/onceSetted.js
// @include ../watchers/onSettedDeep.js
// @include ../watchers/stopOnSetted.js
// @include ../watchers/stopOnSetted.js
// @include ../watchers/onSettedDeep.js
// @include ../watchers/stealthOnSetted.js
// @include ../watchers/stopStealthOnSetted.js
// @include ../watchers/onDefined.js
// @include ../watchers/onceDefined.js
// @include ../watchers/onChange.js


/*
 * COMPONENTS
 *
 */

// @include ../components/util/sendAppComponentReport.js

// @include ../components/AppComponentAction.js
// @include ../components/AppComponentInfo.js
// @include ../components/getAppComponentByTypeAndCid.js
// @include ../components/getAppViewInfoFromElement.js
// @include ../components/registerAppComponent.js
// @include ../components/addAppComponentAction.js


/*
* PATCHES
*
*/

// @include ../patches/util/patchFunction.js
// @include ../patches/util/patchFunctionLater.js
// @include ../patches/util/addCidToComponent.js

// @include ../patches/patchDefineCallback.js
// @include ../patches/patchDefine.js
// @include ../patches/patchBackbone.js
// @include ../patches/patchBackboneExtend.js
// @include ../patches/patchBackboneComponent.js
// @include ../patches/patchAppComponentTrigger.js
// @include ../patches/patchBackboneView.js
// @include ../patches/patchBackboneModel.js
// @include ../patches/patchBackboneCollection.js
// @include ../patches/patchBackboneRouter.js
// @include ../patches/patchMarionetteApplication.js
// @include ../patches/patchMarionetteBehavior.js
// @include ../patches/patchMarionetteModule.js
// @include ../patches/patchMarionetteController.js
// @include ../patches/patchMarionetteObject.js
// @include ../patches/patchWindow.js
// @include ../patches/patchBackbone.js
// @include ../patches/patchMarionette.js
// @include ../patches/patchBackboneWreqr.js
// @include ../patches/patchBackboneRadio.js

/*
 * ACTIONS
 *
 */

// @include ../actions/highlightEl.js
// @include ../actions/search.js
// @include ../actions/analytics.js
// @include ../actions/observeChanges.js

/*
 * MARIONETTE
 *
 */

// @include ../utils/knownTypes.js
// @include ../serializes/serializeEvents.js
// @include ../serializes/serializeEventsHash.js
// @include ../serializes/serializeElement.js
// @include ../serializes/serializeView.js
// @include ../serializes/serializeModel.js
// @include ../serializes/serializeCollection.js
// @include ../serializes/serializeChannelWreqr.js
// @include ../serializes/serializeChannelRadio.js
// @include ../actions/viewList.js
// @include ../actions/regionInspector.js

// @include ../actions/appObserver.js
