const POST_URL = "https://script.google.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec";

var myBrowser = (identifyBrowser() === "chrome" ? chrome : browser);
var port = myBrowser.runtime.connect({name: "reminder control"});
window.googleDocCallback = function () { return true; }; // needed to guarantee CORS headers are properly set

function identifyBrowser() {
  if (navigator.userAgent.indexOf("Chrome") >= 0) { //browser is Chrome
    return "chrome"
  }
  else { //  assuming browser is Firefox
    return "firefox"
  }
} // identifyBrowser

function storeData(postBody) {  
  // console.log(postBody);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', POST_URL);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      // console.log(xhr.statusText);
      window.close();
    }
  }
  xhr.send(JSON.stringify(postBody));
} // storeData

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
    let stateOfMind = registerSoM(e.target.textContent);
    port.postMessage("clear");
    storeData(stateOfMind);
    port.postMessage("create");
  });
} // listenForClicks

listenForClicks();