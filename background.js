const DELAY = 60; // must be the same value as in popup.js
const REMINDER_LOGO_PATH = "../icons/emoacao-logo-reminder.png";

var myBrowser;
if (navigator.userAgent.indexOf("Chrome") >= 0) {myBrowser = chrome} //browser is Chrome
else {myBrowser = browser} //  assuming browser is Firefox

myBrowser.alarm.onAlarm.addListener(oneHourNotification);
myBrowser.alarm.create("oneHourReminder", {delayInMinutes: DELAY});

function oneHourNotification() {

    console.log("changing icon to" + REMINDER_LOGO_PATH);
    myBrowser.browserAction.setIcon({path: REMINDER_LOGO_PATH});
  
}
