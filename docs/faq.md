# FAQ


### 1. The UI tree does not show up

There are a couple of reasons why this might happen:
1. **The inspector could not patch Backbone & Marionette.** To check, look in `window.__agent.patchedBackbone` && `window.__agent.patchedMarionette`. If you don't see these libraries, the best thing to do is to manually start the inspector w/ those libraries. See [Caveats](https://github.com/marionettejs/marionette.inspector#caveats)

2. **The inspector could not find the application.** The inspector currently requires that you're using a Marionette Application. This will not always be the case. To see if the inspector found your app, look in `window.__agent.patchedApp`. If your app wasn't found stop by in the [gitter](https://gitter.im/marionettejs/marionette.inspector) or file an issue.

3. **The inspector could not find your UI Tree Root.** The inspector currently assumes that your application either uses application regions or has a topmost view. A topmost view can either be referenced as `app.layout` or `app.rootView` and it must be a layoutView.
