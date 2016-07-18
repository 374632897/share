const Watcher = require('../utils/watcher');
const watcher = new Watcher();
console.log(watcher);
watcher.register('../utils/dom/DOM-util.js');
watcher.register('./components/share.js');
