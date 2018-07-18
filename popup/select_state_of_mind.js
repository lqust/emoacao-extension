
const gsURL = "https://script.google.com/macros/d/1J2cVAQohwv58U94o3yIVYu4xg9ScrORK--n5oo9sqvY_WAYfkHKlLNd4/exec"

function postToSpreadsheet(stateOfMindData) {

  var xhr = new XMLHttpRequest();
  xhr.open("POST", gsURL, true);
  xhr.setRequestHeader('Content-Type', 'text/plain');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.send(stateOfMindData);

}


function listenForClicks() {

  document.addEventListener("click", (e) => {

    function registerSoM(stateOfMind) {

      var currentdate = new Date(); 
      var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-"  + currentdate.getDate() + " "  
                   + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      switch (stateOfMind) {
        case "Sem foco & Feliz":  return "{ timestamp:" + datetime + ", foco:0, feliz:1 }";
        case "Com foco & Triste": return "{ timestamp:" + datetime + ", foco:1, feliz:0 }";
        case "Sem foco & Triste": return "{ timestamp:" + datetime + ", foco:0, feliz:0 }";
        case "Com foco & Feliz":  return "{ timestamp:" + datetime + ", foco:1, feliz:1 }";

      }
    }

    function emoacao(tabs) {
        let stateOfMindRow = registerSoM(e.target.textContent);
        postToSpreadsheet(stateOfMindRow);
      }

    function reportError(error) {
      console.error(`Could not register Emotion: ${error}`);
    }

   browser.tabs.query({active: true, currentWindow: true})
    .then(emoacao)
    .catch(reportError);
   
  });

}

listenForClicks();

