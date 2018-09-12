const POST_URL = "https://script.google.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec";
const DELAY = 60;  // must be the same value as in background.js
const ORIGINAL_LOGO_PATH = "../icons/emoacao-logo.png";

var myBrowser;
if (navigator.userAgent.indexOf("Chrome") >= 0) {myBrowser = chrome} //browser is Chrome
else {myBrowser = browser} //  assuming browser is Firefox

window.googleDocCallback = function () { return true; }; // needed to guarantee CORS headers are properly set

function storeData(postBody) {  

  console.log(postBody);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', POST_URL);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {

    if (xhr.readyState === 4) {
      
      console.log(xhr.statusText);
      window.close();

    }

  }

  xhr.send(JSON.stringify(postBody));
  
}

function registerSoM(stateOfMind) {

  switch (stateOfMind) {
    case "Sem foco & Feliz" : return { "foco":"0", "feliz":"1" };
    case "Com foco & Triste": return { "foco":"1", "feliz":"0" }; 
    case "Sem foco & Triste": return { "foco":"0", "feliz":"0" }; 
    case "Com foco & Feliz" : return { "foco":"1", "feliz":"1" };
  }

}

function listenForClicks() {

  document.addEventListener("click", (e) => {

    let stateOfMind = registerSoM(e.target.textContent);

    myBrowser.alarms.clear("oneHourReminder");
    myBrowser.browserAction.setIcon({path: ORIGINAL_LOGO_PATH});
  
    storeData(stateOfMind);

    myBrowser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});

  });

}

listenForClicks();