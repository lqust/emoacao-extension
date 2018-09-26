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


function listenForClicks() {

  document.addEventListener("click", (e) => {
    var clickTarget = e.target;
    switch (clickTarget.id) {
      case "save-team": 
        document.cookie="emoacao-team=" + document.getElementById("team-name").value; // set team name
        window.close();
        break;
      case "reset-team":
        document.cookie="emoacao-team=";
        window.close();
        break;
      case "com-foco-triste":
        port.postMessage({ "foco":"1", "feliz":"0", "time": teamName }); 
        window.setTimeout(function() {window.close()},100);
        break;
      case "com-foco-feliz" :
        port.postMessage({ "foco":"1", "feliz":"1", "time": teamName });
        window.setTimeout(function() {window.close()},100);
        break;
      case "sem-foco-triste":
        port.postMessage({ "foco":"0", "feliz":"0", "time": teamName }); 
        window.setTimeout(function() {window.close()},100);
        break;
      case "sem-foco-feliz" :
        port.postMessage({ "foco":"0", "feliz":"1", "time": teamName });
        window.setTimeout(function() {window.close()},100);
        break;
    }

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
