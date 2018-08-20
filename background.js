const DELAY = 60; // must be the same value as in popup.js
const REMINDER_LOGO_PATH = "../icons/emoacao-logo-reminder.png";

browser.alarms.onAlarm.addListener(oneHourNotification);
browser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});

function oneHourNotification() {

    console.log("changing icon to" + REMINDER_LOGO_PATH);
    browser.browserAction.setIcon({path: REMINDER_LOGO_PATH});
  
}
