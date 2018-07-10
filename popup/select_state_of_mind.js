/**
 * CSS to hide everything on the page,
 * except for elements that have the "emoacao-image" class.
 */
const hidePage = `body > :not(.emoacao-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Sem foco & Feliz":
          return browser.extension.getURL("beasts/frog.jpg");
        case "Com foco & Triste":
          return browser.extension.getURL("beasts/snake.jpg");
        case "Sem foco & Triste":
          return browser.extension.getURL("beasts/turtle.jpg");
        case "Com foco & Feliz":
          return browser.extension.getURL("beasts/cst.png");
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function emoacao(tabs) {
      browser.tabs.insertCSS({code: hidePage}).then(() => {
        let url = beastNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "emoacao",
          beastURL: url
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not register Emotion: ${error}`);
    }

   browser.tabs.query({active: true, currentWindow: true})
    .then(emoacao)
    .catch(reportError);
   
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute emoacao content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/emoacao.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
