//// BASE ////
window._ = this._;















//// Metodi per impostare proprietà "nascoste" all'interno degli oggetti
//// (tipicamente usati per memorizzare l'AppComponentInfo di un dato componente dell'app
////  o i dati riguardanti l'initialize patchata nei componenti backbone)

// NOTA DI SVILUPPO: non memorizzare le proprietà nascoste in oggetti contenitori
// in quanto sarebbero condivise da tutti i cloni / istanze e sottotipi
// (quest'ultime in caso di proprietà nascoste impostate nel prototype del tipo),
// infatti gli oggetti sono copiati per riferimento.

// @private
// Prefisso dei nomi delle proprietà nascoste






