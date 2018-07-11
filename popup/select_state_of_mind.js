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

    function registerSoM(stateOfMind) {

      var currentdate = new Date(); 
      var datetime = currentdate.getFullYear() + "-"
                   + (currentdate.getMonth()+1)  + "-" 
                   + currentdate.getDate() + " "  
                   + currentdate.getHours() + ":"  
                   + currentdate.getMinutes() + ":" 
                   + currentdate.getSeconds();

      switch (stateOfMind) {
        case "Sem foco & Feliz":
          return datetime + ",0,1";
        case "Com foco & Triste":
          return datetime + ",1,0";
        case "Sem foco & Triste":
          return datetime + ",0,0";
        case "Com foco & Feliz":
          return datetime + ",1,1";
      }
    }

    function emoacao(tabs) {
      browser.tabs.insertCSS({code: hidePage}).then(() => {
        console.log(registerSoM(e.target.textContent));

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
