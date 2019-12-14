document.getElementById("btn").innerHTML = "<input type='button' value='button' />";
document.getElementById("btn").children[0].setAttribute("type", "text");
document.getElementById("text").style.color = "#ddd";
document.getElementById("text").innerText = "<span>new text</span>";
document.getElementById("text").attributes.style.nodeValue = "color: #000";