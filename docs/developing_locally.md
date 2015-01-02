## 1. Installing the Extension in Chrome

### 1. Download the Extension
```bash
git clone github.com/marionettejs/marionette.inspector.git
```


### 2. Build the extension

```bash
npm i
npm run bower
grunt build
```


### 3. Install in Chrome
```
1. go to the Extensions tab in chrome > Window
2. check the "Developer Mode" checkbox
3. click the "Load unpacked extension" and select the extension folder in the repo
```

---
## 2. Running the unit tests

### Inspector

1. Start localhost
```bash
python -m SimpleHTTPServer 4040
```

2. go to InspectorSpecRunner.html
```
http://localhost:4040/extension/js/test/unit/InspectorSpecRunner.html
```


### Agent

1. Open the AgentSpecRunner.html
```
open extension/js/test/unit/AgentSpecRunner.html
```

---

## 3. Turning on the loggers

Local logging can be turned on easily by enabling the two logger classes (`debug`, `logger`)

https://github.com/marionettejs/marionette.inspector/blob/master/extension/js/common/util/Logger.js#L14
https://github.com/marionettejs/marionette.inspector/blob/master/extension/js/common/util/debug.js#L4

**debug** is the window `agent` logger
**logger** is the inspector logger

---
## 4. Debugging the Inspector in development

Once you have the inspector installed locally in chrome, there are a couple things to do.

#### 1. Setup grunt to watch for changes
  This will make sure that all of your changes get compiled.
```
grunt watch
```

#### 2. Open an undocked chrome devtools
  By default, devtools is opened docked to the right or bottom of the window. There's a button in the top right of devtools for undocking it. Undocking devtools will open it in its own window.

#### 3. Open a second inspector for the inspector
  This chrome inception (inspection...) is the key to inspector kungfu. The way to open the second inspector is to press `<cmd>+<option>+i`. This is the same keystroke that opens the first inspector from the app.

  There are a bunch of cool things you'll notice about the second inspector over time.
  1. You can inspect any pane in the first inspector. The elements pane, for example, is just another website. WOW
  2. You can see all of the inspector source code `<cmd>+o` will open a source prompt. Try looking for `UI.js`. All of the source is under the inspector chrome:// url.
  3. In the console you can select the last frame (usually panel.js or ui) to enter the inspector frame scope. Then in the console you have access to the inspector app. Fun expressions to try include (`app`, `app.UI.viewCollection`)...
  4. Refreshing the second inspector is the best way to reload the marionette inspector pane. When you start adding a feature and you want to quickly reload the inspector, the best thing to do is refresh the second inspector and then click on the marionette tab in the inspector. Trust me, you'll get good at this one :)
  5. Log messages can be a bit funny at first. What you'll notice with time is that log messages from the inspector are printed in the second inspector, log messages coming from agent.js are in the first inspector.


![](http://f.cl.ly/items/2c3f2h230w2H2Y3I3f1v/Image%202014-12-22%20at%2010.54.52%20AM.png)


---
## 5. Debugging agent.js in development

Believe it or not, the agent.js script which the inspector injects into the app window is not automatically available in the devtools source panel.

![](http://f.cl.ly/items/0p0o2X2D1n0p2H3S2k02/Image%202014-12-22%20at%2010.49.46%20AM.png)


There are two ways to get `agent.js` to appear in the sources panel.

1. Use chrome canary. Seriously, we got two bug fixes into the most recent version of chrome so this will be fixed.

2. add a script tag in your app to `localAgent.js` This will load `agent.js` a second time, but even though that's weird it should load the script.


```html
<script src="http://localhost:4001/build/src/localAgent.js"></script>
````

```bash
cd extension/js/agent
python -m SimpleHTTPServer 4001
```

## 6. Using the Inspector in a sandboxed environment

While it's not too bad to hack on the inspector directly, sometimes it's nice to work on it by itself. If you think about it, working on the inspector requires maintaing three separate screens, the first is the app you're inspecting, the second is the inspector, and the third is the inspector for your inspector. Sometimes, you just *want* to work on the inspector and it's great not to think about the app it's inspecting or the agent that needs to be injected.

**Enter the Recorder and Sandbox.**
The recorder lets you record one inspector session and save all of the messages that the agent sends to the inspector. The sandbox is a locally hosted page for the inspector where the recorder messages are replayed. We basically fake out the inspector so that it thinks it's in the chrome devtools window and it thinks it's receiving agent messages from the inspected app. Don't tell the inspector it's all a lie.

**Why build a Sandbox and a Recorder?**  
The major use cases are new features to the inspector and UI css tweaks where it's really nice to refresh often. You'll see that once you start running the inspector in the sandbox, working on the inspector feels like developing any old Marionette App, hopefully that's a pleasurable experience for you :) Don't forget, that at this point that means that you can turn on the inspector for the sandboxed inspector you're working on... Did I just blow yo mind?



![](http://f.cl.ly/items/470q10142Q1V1o162e3s/Image%202015-01-02%20at%2011.28.37%20AM.png)

> Photo of the Inspector being run locally in the sandbox.  
  Note: Inspector inception has been unlocked. The Marionette Inspector is inspecting the Inspector panel.


### Running the sandbox
The sandbox is a small hosted environment, where the inspector can be run safely.

#### Steps to set it up
```bash
cd recorder
ruby sandbox.rb
```

Once the sandbox is started, go to `localhost:9494` to start the inspector. It's really that simple :)



### Running the recorder


The sandbox works by playing back a recording of the a previous inspector session. By default, it plays back a session that was recorded and saved as a gist. If you'd like to make your own recording to test out a different app or develop a different feature, it's not too hard.

There are three steps for running the recorder:

#### 1. Add a flag in the inspector's main.js bootstrap script to turn it on.
After it's on, all of the messages will be written to the `recorder/messages.json` file.

```diff
diff --git a/extension/js/inspector/main.js b/extension/js/inspector/main.js
index 85c9e36..c2875b2 100644
--- a/extension/js/inspector/main.js
+++ b/extension/js/inspector/main.js
@@ -76,7 +76,7 @@ require([
  return Handlebars.compile(template)(data);
};

-
+    window.recordMessages = true;

$(document).ready(function() {
  // var router = new Router();
  ```

#### 2. Turn on the recorder

```bash
cd recorder
bundle install
ruby record.rb
```

#### 3. Turn off the recorder flag

```diff
diff --git a/extension/js/inspector/main.js b/extension/js/inspector/main.js
index 85c9e36..c2875b2 100644
--- a/extension/js/inspector/main.js
+++ b/extension/js/inspector/main.js
@@ -76,7 +76,7 @@ require([
  return Handlebars.compile(template)(data);
};

-    window.recordMessages = true;

$(document).ready(function() {
// var router = new Router();
```


## 7. Debugging the background.html page

This is almost never done. In fact, I haven't reloaded my development version of the inspector in weeks. The background.html is principally used to connect the inspector pane with the chrome tab where the website lives. The communication layer is solid and there's little chance you'll want to go in there and mess with it.


## 8. Watch some live coding screencasts

There are two screencasts of live coding exercises that offer an "over the shoulder" perspective of what it's like to work on the inspector. They're both fairly lengthy, but offer lots of tips for getting started.

[Hacking the Inspector Activity Pane](https://www.youtube.com/watch?v=yG3e5nKey20)  
[Add some perf wins to the marionette inspector activity pane](https://www.youtube.com/watch?v=071wSIxlf-o&feature=youtu.be)
