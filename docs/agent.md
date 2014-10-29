## Agent

The Agent is the script that is injected into the application window. The agent is responsible for spying on the the Application and communicating with the Inspector.

### Spying

The Agent spies on the Application by patching a Backbone and Marionette [source](../extension/js/agent/agent.js).
Patching the key classes, lets the agent monitor for application events like a new View being instantiated or a Radio command being executed. All of the patches can be found in
the patches [folder](../extension/js/agent/patches).

### Inspector Actions

When the Inspector wants to carry out an action on the page like highlight a dom element, or starting search, the inspector talks to the Agent's appObserver. The AppObserver, knows about all of the actions that are possible and will delegate to the responsible party to see it through. The appObserver can be found [here](../extension/js/agent/marionette/appObserver.js)


### Agent Events

The main way that the Agent communicates with the Inspector is via events. When something happens in a patched application component (View, Model, ...), the Agent will send an `appComponentReport` to the Inspector. AppComponentReports are translated to simple events on the Client that the Inspector can listen to. An example of an appComponentReport that is really useful is the view event `show`, which cause the Inspector to re-fetch the regionTree.

### Components

When a new component (View, Model) is detected, the agent adds the component to the `appComponentsInfo` object which holds the component and some metadata about it. The `appComonentsInfo` object is really useful for showing all of the components that are running in the app. This is the primary way that the data pane is populated for example.  The agent components and component events can be found [here](../extension/js/agent/components).
