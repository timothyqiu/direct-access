
(function() {

  "use strict";

  function removeRedirection(element) {
    var action = element.getAttribute("onmousedown");
    if (action && (action.indexOf("rwt") > -1)) {
      element.removeAttribute("onmousedown");
      return true;
    }
    return false;
  }

  function getDirectAccess() {
    var links = document.querySelectorAll("h3.r a");
    var len = links.length;

    var count = 0;
    for (var i = 0; i < len; i++) {
      if (removeRedirection(links[i])) {
        count++;
      }
    }

    chrome.runtime.sendMessage({"count": count});
  }

  var matches = [ "/", "/webhp", "/search" ];

  if (matches.indexOf(window.location.pathname) > -1) {

    // Normal search
    document.addEventListener("DOMContentLoaded", getDirectAccess);

    // Instant search
    document.addEventListener("DOMNodeInserted", function (ev) {
      if (ev.target.id == 'rhs') {
        getDirectAccess();
      }
    });

  }

}());

