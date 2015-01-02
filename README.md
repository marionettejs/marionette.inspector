
# Marionette Inspector

+ [Chrome Web Store](https://chrome.google.com/webstore/detail/marionette-inspector/fbgfjlockdhidoaempmjcddibjklhpka?hl=en)

+ [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/marionettejs/marionette.inspector?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

+ [BBConf Talk: Backbone Under the Magnifying glass](https://www.youtube.com/watch?v=jbGm3mJXh_s)


![](http://f.cl.ly/items/0D0k2I0N2p2D2s3M1S21/Image%202014-12-18%20at%2011.05.43%20PM.png)




### Functionality

The inspector makes it possible to understand how your App works, without needing to understand how all the code works. This is possible because everything's one click away. You'll be amazed at how quickly this changes everything.


+ **Visualize** the view hierarchy with the UI tree
+ **Visualize** application activity with a full history of actions
+ **Inspect** view ui, events, listeners, properties
+ **Inspect** model attributes, listeners, properties
+ **Explore** Radio channel events, requests, commands
+ **Explore** application with an inspector magnifying glass
+ **Jump** between the inspector elements and source panel with intelligent links


---
### Getting Started


#### Download it
The inspector should work out of the box with most setups. You can download it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/marionette-inspector/fbgfjlockdhidoaempmjcddibjklhpka?hl=en).

#### Caveats
If you're either using `Browserify` or `Webpack` or not exposing `Backbone` & `Marionette` as globals, you'll need to add one block to your setup.

```js
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}
```

> Note this line should be placed after all underscore, backbone, and marionette REQUIRES, but before Application or View classes are defined.

#### Frequently Asked Questions
If you have any additional questions, check out our [FAQ](https://github.com/marionettejs/marionette.inspector/blob/master/docs/faq.md).

---

### Play with it locally
Follows these these steps in the [Install Guide](docs/developing_locally.md) and you should be up and running in no time. Read the [agent](https://github.com/marionettejs/marionette.inspector/blob/master/docs/agent.md) overview to understand how the inspector gathers all the information.


### Open Source (a.k.a. you)

The inspector is built with 100% open source love. That means, we absolutely want your help and your passion. If you want to get involved, stop by and say hello [here](https://gitter.im/marionettejs/marionette.inspector). We've got tons of [help wanted](https://github.com/marionettejs/marionette.inspector/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) tickets and would be be happy to setup a 30 minute [screenhero](https://screenhero.com/) pairing session to help you get started. Many of our contributions, even some of the best ones like the Activity pane, came from first time contributors.


---
### Special Thanks

**Etsy** - The Inspector was largely built as an open-source project at Etsy.

**Backbone-Debugger** - The Inspector is built on top of the [Backbone Debugger](https://github.com/Maluen/Backbone-Debugger) core, written in large part by @Maluen.


---
### Screens


# UI
![](http://f.cl.ly/items/0D0k2I0N2p2D2s3M1S21/Image%202014-12-18%20at%2011.05.43%20PM.png)

![](http://f.cl.ly/items/3G3B1Y303e3O0L400s2O/Image%202014-12-18%20at%2011.06.29%20PM.png)

---
# Data
![](http://f.cl.ly/items/0Z190J1V45172N021d11/Image%202014-12-18%20at%2011.07.07%20PM.png)

---
# Radio
![](http://f.cl.ly/items/3d3R283O3e1W3C302F2B/Image%202014-12-18%20at%2011.07.25%20PM.png)

---
# Activity
![](http://f.cl.ly/items/1A410C15311t1c0w1c3L/Image%202014-12-18%20at%2011.07.43%20PM.png)
