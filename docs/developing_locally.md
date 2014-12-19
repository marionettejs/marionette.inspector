## Installing the Extension in Chrome

### 1. Download the Extension
```bash
git clone github.com/marionettejs/marionette.inspector.git

```

### 2. Build the extension

```bash
grunt build
```


### 3. Install in Chrome
```
1. go to the Extensions tab in chrome > Window
2. check the "Developer Mode" checkbox
3. click the "Load unpacked extension" and select the extension folder in the repo
```

---
## Testing

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

## Logging

Local logging can be turned on easily by enabling the two logger classes (`debug`, `logger`)

https://github.com/marionettejs/marionette.inspector/blob/master/extension/js/common/util/Logger.js#L14
https://github.com/marionettejs/marionette.inspector/blob/master/extension/js/common/util/debug.js#L4

**debug** is the window `agent` logger
**logger** is the inspector logger


---

## agent

### Testing locally
If you have chrome canary you'll see the agent.js in the sources pane. If not, you have to do this hack:

A good way to test the agent is to run it locally in the `index.html` of the
app you want to inspect.

```html
<script src="http://localhost:4001/build/src/localAgent.js"></script>
````

```bash
cd extension/js/agent
python -m SimpleHTTPServer 4001
```

Including the `localAgent` directly this way, is easier than
debugging the `agent` when it's injected into the window via the extension.
