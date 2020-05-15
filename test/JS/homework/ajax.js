function getMessage(msg, callback) {
  setTimeout(function () {
    console.log(msg);
    callback();
  }, 2000);
}

function getAlert(msg) {
  console.log(msg);
}

function displayMessage() {
  setTimeout(function () {console.log("msg");}, 1000);
}

getMessage("Hi", displayMessage);
getAlert("Come on!");



var ajax = (window.XMLHttpRequest) ? new XMLHttpRequest() 
            : new ActiveXObject("Microsoft.XMLHTTP");
ajax.request = function (url, method, callback, params) {
  ajax.open = (method.toUpperCase(), url, true);
  if(method === "post") {
    ajax.send(params);
  } else {
    ajax.send();
  }
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if(ajax.status === 200) {
        callback(ajax);
      }
    }
  }
}

function myCallback(xhr) { 
  alert(xhr.responseText); 
}
ajax.request("somefile.txt", "get", myCallback);
// ajax.request("script.php", "post", myCallback, "first=John&last=Smith");