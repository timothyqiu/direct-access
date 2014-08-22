(function() {

  "use strict";

  function removeRedirection(element) {
      element.removeAttribute('onmousedown');

      // get rid of all event listeners
      var clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);

      chrome.runtime.sendMessage({"count": 1});
  }

  function getDirectAccess(element) {
    var action = element.getAttribute('onmousedown');
    if (action && action.indexOf('rwt') > -1) {
      removeRedirection(element);
    }
  }

  var matches = [ "/", "/webhp", "/search" ];

  if (matches.indexOf(window.location.pathname) > -1) {

    document.addEventListener('mouseenter', function (ev) {
      var element = ev.target;
      var maxDepth = 1; // e.g. the <em> beneath <a>

      for (var i = 0; i < maxDepth && element && element.tagName != 'A'; i++) {
        element = element.parentNode;
      }

      if (element && element.tagName == 'A') {
        getDirectAccess(element);
      }
    }, true);

  }

}());

