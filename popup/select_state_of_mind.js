
const postURL = "https://script.google.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec";

window.googleDocCallback = function () { return true; };

function storeData(postBody) {  

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

  switch (stateOfMind) {
    case "Sem foco & Feliz" : return { "foco":"0", "feliz":"1" };
    case "Com foco & Triste": return { "foco":"1", "feliz":"0" }; 
    case "Sem foco & Triste": return { "foco":"0", "feliz":"0" }; 
    case "Com foco & Feliz" : return { "foco":"1", "feliz":"1" };
  }

}

function listenForClicks() {
  document.addEventListener("click", (e) => {
    let stateOfMind = registerSoM(e.target.textContent);
    storeData(stateOfMind);
  });
}

listenForClicks();