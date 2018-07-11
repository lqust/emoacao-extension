(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function writeSoM(registeredSoM) {
    document.body.appendChild(registeredSoM);
  }


  /**
   * Listen for messages from the background script.
   * Call "emoacao()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "emoacao") {
      writeSoM(message.stateOfMind);
    } else if (message.command === "reset") {
      console.log("reset");
    }
  });

})();
