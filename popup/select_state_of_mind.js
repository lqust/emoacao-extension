
  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below

    let stateOfMindRow = document.getElementById("som");
    var data = postToSpreadsheet(stateOfMindRow);   

    disableAllButtons(event.target);
    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
    
  }
  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var form = document.getElementById("gform");
    form.addEventListener("submit", handleFormSubmit, false);
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
}

function registerSoM(stateOfMind) {

  var currentdate = new Date(); 
  var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-"  + currentdate.getDate() + " "  
                + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

  switch (stateOfMind) {
    case "0,1":  return "{ timestamp:" + datetime + ", foco:0, feliz:1 }";
    case "1,0": return "{ timestamp:" + datetime + ", foco:1, feliz:0 }";
    case "0,0": return "{ timestamp:" + datetime + ", foco:0, feliz:0 }";
    case "1,1":  return "{ timestamp:" + datetime + ", foco:1, feliz:1 }";

  }
}

document.getElementsByTagName("td").onclick({
  
//  var inputSoM = document.getElementById('som');
//  inputSoM.value = "";

})

