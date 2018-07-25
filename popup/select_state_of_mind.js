const postURL = "https://script.google.com/macros/d/1J2cVAQohwv58U94o3yIVYu4xg9ScrORK--n5oo9sqvY_WAYfkHKlLNd4/exec"

function storeData(postBody) {  

  console.log(postURL);
  console.log(postBody);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', postURL);
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

function listenForClicks() {
  document.addEventListener("click", (e) => {
    console.log("oi");
    storeData(registerSoM(e.target.textContent));
  });
}

listenForClicks();