var myBrowser = (identifyBrowser() === "chrome" ? chrome : browser);
var port = myBrowser.runtime.connect({name: "reminder control"});
var stateOfMindPicker = document.getElementById("team-picker");
var teamPicker = document.getElementById("team-picker");


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
    var clickTarget = e.target;
    switch (clickTarget.id) {
      case "save-team": document.cookie="emoacao-team=" + document.getElementById("team-name").value; // set team name
      case "reset-team": document.cookie="emoacao-team="
      default: port.postMessage(registerSoM(e.target.textContent));
    }

    // window.close();
  });
} // listenForClicks

/******************************************* MAIN ********************************************/

var cookieArray = document.cookie.split(';').filter((item) => item.includes('emoacao-team='));
var teamName = (cookieArray[0] ? cookieArray[0].slice(cookieArray[0].indexOf("=")+1) : "");

if (teamName) { // team name is defined, ask for State of Mind
  teamPicker.style.display="none";
  stateOfMindPicker.style.display="";
} else { // first run, ask for team name
  teamPicker.style.display="";
  stateOfMindPicker.style.display="none";
}

listenForClicks();
