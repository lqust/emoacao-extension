var myBrowser = (identifyBrowser() === "chrome" ? chrome : browser);
var port = myBrowser.runtime.connect({name: "reminder control"});
var stateOfMindPicker = document.getElementById("state-of-mind-picker");
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
    case "com-foco-triste": return { "foco":"1", "feliz":"0", "time": teamName }; 
    case "com-foco-feliz" : return { "foco":"1", "feliz":"1", "time": teamName };
    case "sem-foco-triste": return { "foco":"0", "feliz":"0", "time": teamName }; 
    case "sem-foco-feliz" : return { "foco":"0", "feliz":"1", "time": teamName };
  }
} // registerSoM

function listenForClicks() {

  document.addEventListener("click", (e) => {
    var clickTarget = e.target;
    switch (clickTarget.id) {
      case "save-team": 
        document.cookie="emoacao-team=" + document.getElementById("team-name").value; // set team name
        break;
      case "reset-team":
        document.cookie="emoacao-team=";
        break;
      default: port.postMessage(registerSoM(clickTarget.id));
    }
    window.close();

  });
} // listenForClicks

/******************************************* MAIN ********************************************/

var cookieArray = document.cookie.split(';').filter((item) => item.includes('emoacao-team='));
var teamName = (cookieArray[0] ? cookieArray[0].slice(cookieArray[0].indexOf("=")+1) : "");

if (teamName === "") { // team name is defined, ask for State of Mind
  teamPicker.style.display="";
  stateOfMindPicker.style.display="none";
} else { // first run, ask for team name
  teamPicker.style.display="none";
  stateOfMindPicker.style.display="";
}

listenForClicks();
