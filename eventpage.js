var require = {};

(function () {

  "use strict";

  var stats = {};

  require['getStats'] = function (id) {
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
  });

  chrome.tabs.onRemoved.addListener(function (id) {
    delete stats[id];
  });

}());

