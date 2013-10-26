
var require = {};

(function () {

  "use strict";

  var stats = {};

  require['getStats'] = function (id) {
    console.log("Queried:", id, stats[id]);
    return stats[id];
  }

  chrome.runtime.onMessage.addListener(function (message, sender, _) {
    var id = sender.tab.id;
    if (message.count > 0) {
      chrome.pageAction.show(id);
    } else {
      chrome.pageAction.hide(id);
    }
    stats[id] = message.count;
    console.log("Updated:", message, stats);
  });

  chrome.tabs.onRemoved.addListener(function (id) {
    delete stats[id];
    console.log("Removed:", id, stats);
  });

}());

