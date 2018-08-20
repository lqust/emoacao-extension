const POST_URL = "https://script.google.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec";
const DELAY = 0.1;
const REMINDER_LOGO_PATH = "../icons/emoacao-logo-reminder.png";
const ORIGINAL_LOGO_PATH = "../icons/emoacao-logo.png";

browser.alarms.onAlarm.addListener(oneHourNotification);
browser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});

window.googleDocCallback = function () { return true; }; // needed to guarantee CORS headers are properly set

function storeData(postBody) {  

  console.log(postBody);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', POST_URL);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      
      console.log(xhr.statusText); // esse log não é exibido quando o window.close é chamado de dentro do listener (lin: 61)
      // window.close(); // inserido aqui para decomentar para testar

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

function oneHourNotification() {

  console.log("changing icon to" + REMINDER_LOGO_PATH);
  browser.browserAction.setIcon({path: REMINDER_LOGO_PATH});

}

function listenForClicks() {

  document.addEventListener("click", (e) => {

    let stateOfMind = registerSoM(e.target.textContent);

    browser.alarms.clear("oneHourReminder");
    browser.browserAction.setIcon({path: ORIGINAL_LOGO_PATH});
  
    storeData(stateOfMind);

    window.close(); // comente essa linha e descomente na store data (lin: 23) para ver a resposta do post

    browser.alarms.create("oneHourReminder", {delayInMinutes: DELAY});

  });

}

listenForClicks();