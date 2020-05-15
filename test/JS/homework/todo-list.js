  
var itemValue = document.getElementsByName("item-value")[0];
var todoList = document.getElementsByClassName("task-list")[0];
var checkItem = document.getElementsByName("check-item");
var sortList = document.getElementsByClassName("sort-list")[0];

function loadItem() {
  todoList.innerHTML = "";
  if(localStorage.length) {
    for(var item = 0; item < localStorage.length; item++) {
      addItem(item);
    }
  } 
}

function addStorage() {
  if(itemValue.value) {
    var localKey = localStorage.length;
    var localValue = [itemValue.value, ""];
    localStorage.setItem(localKey, JSON.stringify(localValue));
    addItem(localKey);
    itemValue.value = "";
    itemValue.focus();
  }
}

function addItem(key) {
  var value = JSON.parse(localStorage.getItem(key));
  var todoItem = document.createElement("li");
  var checkState = value[1];
  todoItem.setAttribute("class", (checkState ? "done-item" : ""));
  todoItem.innerHTML = `
    <input type="checkbox" name="check-item" ${checkState} />
    <span>${value[0]}</span>
  `
  todoList.appendChild(todoItem);
}

function getNodeIndex(list){
  var index = 0;
  while (list = list.previousSibling) {
    index++;
  }
  return index;
}

function changeState(list) {
  var key = getNodeIndex(list);
  var state = list.className ? "checked" : "";
  var localValue = [list.innerText, state];
  localStorage.setItem(key, JSON.stringify(localValue));
}

todoList.addEventListener("click", function (event) {
  var target = event.target;
  if(target.name === "check-item") {
    var list = event.target.parentNode;
    list.setAttribute("class", (list.className ? "" : "done-item"));
    changeState(list);
  }
})

function reloadItem(state) {
  todoList.innerHTML = "";
  for(var item = 0; item < localStorage.length; item++) {
    var values = JSON.parse(localStorage.getItem(item));
    if(Boolean(values[1]) == state) {
      addItem(item);
    }
  }
}

sortList.addEventListener("click", function (event) {
  var target = event.target;
  switch(target.name) {
    case ("choose-todo"):
      reloadItem(false);
      break;
    case ("choose-done"):
      reloadItem(true);
      break;
    case ("choose-all"):
      loadItem();
    default:
      break;
  }
})

loadItem();