
 /*
  * LIBRARIES
  *
  */

// @include ../lib/watch.js
// @include ../lib/underscore.js
// @include ../lib/underscore-contrib.js

/*
 * BACKBONE AGENT
 *
 */

// @include utils/util/debug.js
// @include utils/util/bind.js
// @include utils/util/isObject.js
// @include utils/util/isArray.js
// @include utils/util/clone.js
// @include utils/util/sendMessage.js
// @include utils/util/getHiddenProperty.js
// @include utils/util/setHiddenProperty.js

// @include utils/watchers/stopWatching.js
// @include utils/watchers/onObjectAndPropertiesSetted.js
// @include utils/watchers/watchOnce.js
// @include utils/watchers/onSetted.js
// @include utils/watchers/onceSetted.js
// @include utils/watchers/onSettedDeep.js
// @include utils/watchers/stopOnSetted.js
// @include utils/watchers/stopOnSetted.js
// @include utils/watchers/onSettedDeep.js
// @include utils/watchers/stealthOnSetted.js
// @include utils/watchers/stopStealthOnSetted.js
// @include utils/watchers/onDefined.js
// @include utils/watchers/onceDefined.js

// @include utils/patch/patchFunction.js
// @include utils/patch/patchFunctionLater.js


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

// @include patches/patchDefine.js
// @include patches/patchBackbone.js
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

// @include marionetteObserver.js
// @include marionette/EventInterceptor.js
//


/*
 * MAIN
 *  
 */

// @include logic.js
