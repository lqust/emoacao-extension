const POST_URL = "https://script.google.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec";
const DELAY = 60;
const REMINDER_LOGO_PATH = "../icons/emoacao-logo-reminder-128.png";
const ORIGINAL_LOGO_PATH = "../icons/emoacao-logo-128.png";

window.googleDocCallback = function () { return true; }; // needed to guarantee CORS headers are properly set
function storeData(postBody) {  
  // console.log(postBody);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', POST_URL);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {console.log(xhr.statusText);}
  xhr.send(JSON.stringify(postBody));
} // storeData

var myBrowser = (identifyBrowser() === "chrome" ? chrome : browser);
myBrowser.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        myBrowser.alarms.clear("oneHourReminder");
        myBrowser.browserAction.setIcon({path: ORIGINAL_LOGO_PATH});
        storeData(msg); // write state of mind to speadsheet
        myBrowser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});
    });
})

function oneHourNotification() {
    console.log("changing icon to " + REMINDER_LOGO_PATH);
    myBrowser.browserAction.setIcon({path: REMINDER_LOGO_PATH});
} // oneHourNotification

function identifyBrowser() {
    if (navigator.userAgent.indexOf("Chrome") >= 0) { //browser is Chrome
      return "chrome"
    }
    else { //  assuming browser is Firefox
      return "firefox"
    }
  } // identifyBrowser

myBrowser.alarms.onAlarm.addListener(oneHourNotification);
myBrowser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});
