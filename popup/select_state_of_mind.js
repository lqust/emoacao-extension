
const postURL = "https://script.google.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec";

window.googleDocCallback = function () { return true; };

function storeData(postBody) {  

  console.log(postURL);
  console.log(postBody);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', postURL);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      
      console.log(xhr.responseText);

    }
  }

  xhr.send(JSON.stringify(postBody));
  
}

function registerSoM(stateOfMind) {

  var outputSoM;

  switch (stateOfMind) {
    case "Sem foco & Feliz" : outputSoM = { "foco":"0", "feliz":"1" };
    case "Com foco & Triste": outputSoM = { "foco":"1", "feliz":"0" }; 
    case "Sem foco & Triste": outputSoM = { "foco":"0", "feliz":"0" }; 
    case "Com foco & Feliz" : outputSoM = { "foco":"1", "feliz":"1" };
  }

  return outputSoM;

}

function listenForClicks() {
  document.addEventListener("click", (e) => {
    let stateOfMind = registerSoM(e.target.textContent);
    storeData(stateOfMind);
  });
}

console.log("rodando...");

listenForClicks();