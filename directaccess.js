(function() {

  "use strict";

  function updateMessages(count) {
    var headerStats = document.getElementById("header-stats");
    var statsText = document.getElementById("stats");

    headerStats.innerText = chrome.i18n.getMessage("htmlHeaderStats");
    statsText.innerText = chrome.i18n.getMessage("htmlStatsText", [count]);
  }

  function onLoad() {
    chrome.tabs.query({
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function(tabs) {
      if (tabs.length > 0) {
        var currentTab = tabs[0];
        chrome.runtime.getBackgroundPage(function(window) {
          var getStats = window.require['getStats'];
          var count = getStats(currentTab.id);
          if (typeof count === 'undefined') {
            count = 0;
          }
          updateMessages(count);
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", onLoad);

}());

