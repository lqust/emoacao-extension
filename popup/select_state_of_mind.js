function listenForClicks() {

  document.addEventListener("click", (e) => {

    function registerSoM(stateOfMind) {

      var currentdate = new Date(); 
      var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-"  + currentdate.getDate() + " "  
                   + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      switch (stateOfMind) {
        case "Sem foco & Feliz":  return datetime + ",0,1";
        case "Com foco & Triste": return datetime + ",1,0";
        case "Sem foco & Triste": return datetime + ",0,0";
        case "Com foco & Feliz":  return datetime + ",1,1";

      }
    }

    function emoacao(tabs) {
        let stateOfMindRow = registerSoM(e.target.textContent);
        console.log(stateOfMindRow);
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

