var pNode = document.createElement("p");
var text = document.createTextNode("Hello parameter!");
pNode.appendChild(text);
var para = document.getElementById("para");
para.appendChild(pNode);

var list = document.getElementsByClassName("fruit-list");
list[0].children[3].innerHTML = "mango";
//childNodes 会包含所有的节点包括文本和子元素 例如：list[0].childNodes = [li, test, li ,test...]
list[1].removeChild(list[1].children[1]);
var listItem = document.createTextNode("pear");
var item = document.getElementsByTagName("ul");
// item[1].replaceChild(listItem, item[1].childNodes[0]);
// 只加文本节点的话，会删除之前元素的属性，比如 li 前面的黑点
var oList = document.createElement("li");
oList.appendChild(listItem);
item[0].childNodes[3].innerHTML = "pineapple";
item[1].replaceChild(oList, item[1].childNodes[2]);
item[1].childNodes[2].style.color = "#ddd";
//如果先创建 element 再往 element 里加文本节点 就可以保留 li 的属性
//添加属性能用 setAttribute() 方法 / document.getElementById('id').style.color = '#fff'。
var childList = item[0].childNodes[3];
childList.parentElement.replaceChild(oList, childList);
//必须要节点的父元素，比如 item[1] 如果只有子节点，就要加 parentNode/parentElement，
//唯一的区别就是，前者找的是父节点，后者找的是父元素，如果一直往上找，
//前者可以多遍历到一个节点 body < html < #document < null，后者只能是 body < html < null 并且报错。
