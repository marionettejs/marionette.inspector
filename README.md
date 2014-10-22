[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/MarionetteLabs/marionette.inspector?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Marionette Inspector

![](http://f.cl.ly/items/3A3c421s0p2Y0V0X1E1W/Image%202014-10-20%20at%207.12.22%20PM.png)


### A tool for good

The Inspector complements the console, elements, and sources tab as a trusty companion as you build out your Marionette Apps.

You can use the Inspector to see what's going on under the hood with your **ui**, **data**, **messages**, and **network**.


Ofcourse, there's also a helpful :mag: as well.

---
### Developing Locally

##### Installing the Extension in Chrome

###### 1. git clone the repo
```bash
git clone git@github.com:MarionetteLabs/marionette.inspector.git
```

###### 2. build the backboneAgent
The backboneAgent needs to be built with this grunt command: ``

```bash
grunt backboneAgent
```


###### 3. install in chrome
```
1. go to the Extensions tab in chrome > Window
2. check the "Developer Mode" checkbox
3. click the "Load unpacked extension" and select the extension folder in the repo
```

---
### Special Thanks

**Etsy** - The Inspector has largely been built as an open-source project at Etsy.

**Backbone-Debugger** - The Inspector is built on top of the Backbone Debugger core, written in large part by @Maluen.
