var myBrowser = (identifyBrowser() === "chrome" ? chrome : browser);
var port = myBrowser.runtime.connect({name: "reminder control"});

function identifyBrowser() {
  if (navigator.userAgent.indexOf("Chrome") >= 0) { //browser is Chrome
    return "chrome"
  }
  else { //  assuming browser is Firefox
    return "firefox"
  }
} // identifyBrowser

function registerSoM(stateOfMind) {
  switch (stateOfMind) {
    case "Sem foco & Feliz" : return { "foco":"0", "feliz":"1" };
    case "Com foco & Triste": return { "foco":"1", "feliz":"0" }; 
    case "Sem foco & Triste": return { "foco":"0", "feliz":"0" }; 
    case "Com foco & Feliz" : return { "foco":"1", "feliz":"1" };
  }
} // registerSoM

function listenForClicks() {
  document.addEventListener("click", (e) => {
    port.postMessage(registerSoM(e.target.textContent));
    window.close();
  });
} // listenForClicks

listenForClicks();
