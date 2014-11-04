var port = chrome.runtime.connect({
    name: 'contentscript'
});

// Receives messages from the inspected page and redirects them to the background,
// building up the first step towards the communication between the backbone agent and the panel.
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window) return;

    var message = event.data;
    port.postMessage(message);
}, false);

// Sends a message to the background when the DOM of the inspected page is ready
// (typically used by the panel to check if the backbone agent is on the page).
window.addEventListener('DOMContentLoaded', function() {
    port.postMessage({
        target: 'page',
        name: 'ready'
    });
}, false);

