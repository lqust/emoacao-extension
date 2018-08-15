const postURL = "https://script.google.com/a/thoughtworks.com/macros/s/AKfycbxkA-kYvVfCI_k_q0Qn96CmQ2y0MaL2NrnLgAikInW5G_rt15s/exec"

window.googleDocCallback = function () { return true; };

function storeData(postBody) {  

  console.log(postURL);
  console.log(postBody);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', postURL);
  // xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      
      console.log(xhr.responseText);

      var response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.status === 'OK') {
           console.log('successful');
        } else {
           console.log('failed');
        }
    }
  }

  xhr.send(postBody);
  
}

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

function listenForClicks() {
  document.addEventListener("click", (e) => {
    let stateOfMind = registerSoM(e.target.textContent);
    storeData(stateOfMind);
  });
}

console.log("rodando...");

listenForClicks();