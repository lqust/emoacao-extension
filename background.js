const DELAY = 1;
const REMINDER_LOGO_PATH = "../icons/emoacao-logo-reminder-128.png";
const ORIGINAL_LOGO_PATH = "../icons/emoacao-logo-128.png";

var myBrowser;
if (navigator.userAgent.indexOf("Chrome") >= 0) {myBrowser = chrome} //browser is Chrome
else {myBrowser = browser} //  assuming browser is Firefox

myBrowser.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
         if (msg === "clear") {
            myBrowser.alarms.clear("oneHourReminder");
            myBrowser.browserAction.setIcon({path: ORIGINAL_LOGO_PATH});
            console.log("Icon: " + ORIGINAL_LOGO_PATH);
            
         } else if (msg === "create") {
            myBrowser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});
            console.log("Icon: " + ORIGINAL_LOGO_PATH);

         }
    });
})

myBrowser.alarms.onAlarm.addListener(oneHourNotification);
myBrowser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});

function oneHourNotification() {

    console.log("changing icon to " + REMINDER_LOGO_PATH);
    myBrowser.browserAction.setIcon({path: REMINDER_LOGO_PATH});
  
}
