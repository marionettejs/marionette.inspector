
// @private
var sendMessage = function(message) {
    message.target = "page"; // il messaggio riguarda la pagina
    window.postMessage(message, "*");

    console.log('bb -> ', message)
};
