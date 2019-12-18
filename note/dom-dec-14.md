#### Some cookies about DOM 🍪
***
##### 1. DOM 是什么
说明：DOM全称 Document Object Model，即文档对象模型。将文档抽象成一个树型结构，文档中的标签、标签属性或标签内容可以表示为树上的结点。

##### 2. DOM 的功能
- 查询某个元素
- 查询某个元素的祖先、兄弟以及后代元素
- 获取、修改元素的属性
- 获取、修改元素的内容
- 创建、插入和删除元素

##### 3. DOM 节点
- 节点的分类
  - 文档节点(Document)：整个XML、HTML文档
  - 元素节点(Element)：每个XML、HTML元素
  - 属性节点(Attr)：每个XML、HTML元素的属性
  - 文本节点(Text)：每个XML、HTML元素内的文本
  - 注释节点(Comment)：每个注释

- 节点的属性  
  1. `innerHTML`
  它是以 **html 格式**获取或者是修改节点内容的，例如：
      ```
      /* html */
      <div class="box" id="btn">This block should contain a button</div>

      /* js */
      document.getElementById("btn").innerHTML = "<input type='button' value='button' />";

      document.getElementById("btn").innerHTML;
      // "<input type='button' value='button' />"
      ```
      这个操作可以让 id 为 btn 的节点的内容变成一个按钮，而不是一段文字，并且通过这方式获取到的节点内容也是我们所添加到的整段 html。

  2. `innerText`  
  获取或设置**文本**内容，例如：
      ```
      /* html */
      <div class="box" id="text">outer<span> inner</span></div>

      /* js */
      document.getElementById("text").innerText;
      // "outer inner" 注意哦～空格也是文本的一部分呢

      document.getElementById("text").innerText = "<span>new text</span>";
      ```
      最后这一步操作完，会看见这块区域中的内容变成了 `<span>new text</span>` 而不是 “new text”，它会完完全全按照你所修改的内容显示，包括空格。获取的时候却只有文本部分会被得到。

  3. `nodeName`  
  获取节点名称。这个没有什么操作空间，只是可以获取到节点的名字，节点类型有：
  
      |节点类型|nodeName|
      |:---|:---|
      |文档节点(Document)|#document|
      |元素节点(Element)|大写元素名称|
      |属性节点(Attribute)|属性名称|
      |文本节点(Text)|#text|

      以上面最后一个 🌰 来说：
      ```
      document.nodeName;
      // "#document"
      document.head.nodeName;
      // "HEAD"
      document.getElementById("text").nodeName;
      // "DIV"
      document.getElementsByTagName("div")[0].children[0].nodeName;
      // "INPUT"
      ```
      这个时候我给 js 中加上一句：
      ```
      document.getElementById("btn").children[0].setAttribute("type", "text");

      document.getElementById("btn").children[0].attributes.type.nodeName;
      // "type"
      ```
      它会把原来的 button 类型转换为 text，并且可以获得它的属性节点的名称 "type"。

      还有另一种属性的写法：
      ```
      document.getElementById("text").style.color = "#ddd";
      document.getElementById("text").attributes.style.nodeName;
      // "style"
      ```
      文本节点也是一样的～创建再获取就好啦

    4. `nodeValue`  
    获取或设置节点的值，也有四类：

        |节点类型|nodeValue|
        |:---|:---|
        |文档节点(Document)|只读，返回null|
        |元素节点(Element)|只读，返回null|
        |属性节点(Attribute)|获取或设置属性值|
        |文本节点(Text)|获取或设置文本值|

        举一个栗子叭～
        ```
        document.getElementById("text").attributes.style.nodeValue = "color: #000";
        ```
        现在我加上这一句，就可以让原本灰色的字体变成黑色。

    5. `nodeType`  
    返回节点类型，分类如下：
    
        |节点类型|nodeType|
        |:---|:---|
        |文档节点(Document)|9|
        |元素节点(Element)|3|
        |属性节点(Attribute)|2|
        |文本节点(Text)|1|
        
        是的，例子又来了(还是基于最初的 html)：
        ```
        document.getElementsByTagName("div")[1].nodeType;
        // 1
        document.getElementsByTagName("div")[1].attributes[0].nodeType;
        // 2
        document.getElementsByTagName("div")[1].childNodes[0].nodeType;
        // 3
        ```
        (其实还有更多的类型，例如注释是 8 ...)

- 获取 HTML 元素节点的方法
  1. `.getElementById(id)`  
  获取指定 id 的元素，例如：
      ```
      document.getElementById("btn"); 
      // "<div id="btn">...</div>"
      ```
      (如果没有找到返回 `null`)  

  2. `.getElementsByClassName(className)`  
  获取一个包含指定 `class` 名称的元素**数组**。
      ```
      document.getElementsByClassName("box"); 
      // HTMLCollection(2) [div#btn.box, div#text.box, btn: div#btn.box, text: div#text.box]
      ```
      这个时候你在用数组的 index 就可以取到相应的那一个元素了～

  3. `.getElementsByTagName(elementName)`  
  获取一个包含指定标签名的元素**数组**。
      ```
      document.getElementsByTagName("div");
      // HTMLCollection(2) [div#btn.box, div#text.box, btn: div#btn.box, text: div#text.box]

      document.getElementsByTagName("input")[0];
      // <input type=​"text" value=​"button">​
      ```

  4. `.getElementsByName(name)`  
  获取一个包含指定 `name` 名称的的元素**数组**。  
  比如 `form` 表单中的各种带有 `name` 属性的元素，这里就举一个 `null` 的例子：
      ```
      document.getElementsByName("btn"); // []
      ```
      啊哦～不是 `null` 哦，是空数组～只有第一个没找到才是 `null` 

  5. `.querySelector()` & `.querySelectAll()`
  获取匹配指定 **CSS 选择器**元素的（第一个）子元素。  
  这个方法 IE 8+ 才支持，括号里可以是各种 css选择器，例如：
        ```
        document.querySelector("div#btn"); 
        // <div class=​"box" id=​"btn">...</div>​

        document.querySelectorAll("div");
        // NodeList(2) [div#btn.box, div#text.box]
        ```

- 访问节点的属性

    |方法|描述|
    |:---|:---|
    |getAttribute(属性名)|获取Attribute
    |removeAttribute(属性名)|删除Attribute
    |setAttribute(属性名, 新值)|设置Attribute
    |hasAttribute(属性名)|返回布尔值，判断Attribute是否存在
    
    这个可以对节点属性做一些操作，之前其实有举例说到 `setAttribute()`，其他的其实都差不多，就不再多演示。

- 获取关系节点

    |属性|描述|
    |:---|:---|
    |node.parentNode|获取父节点
    |node.childNodes|获取子节点集合
    |node.firstChild|获取第一个子节点
    |node.lastChild|获取最后一个子节点
    |node.previousSibling|获取前一个兄弟节点
    |node.nextSibling|获取后一个兄弟节点
    
    这个也是一些访问性的属性，例如：
    ```
    document.getElementById("btn").parentNode;
    // <body>...</body>

    document.getElementsByTagName("div")[1].lastChild;
    // "<span>new text</span>"

    document.getElementById("btn").nextSibling;
    // #text

    document.getElementById("btn").nextElementSibling;
    // <div class=​"box" id=​"text">...​</div>​

    document.getElementsByTagName("body")[0].firstChild;
    // #text

    document.getElementsByTagName("body")[0].firstElementChild;
    // <div class=​"box" id=​"btn">...​</div>​
    ```
    我们可以看见，如果只是用 `childNodes` 这种属性，会取到空白的文本节点，而用 `firstElementChild` 这类可以取到元素类型子节点，这就分为两种了：
    
    - 第一种叫节点树🌲  
    父子关系: parentNode, childNode, firstChild, lastChild;  
    兄弟关系: previousSibling, nextSibling;  
    - 另一种叫元素树🌲  
    父子关系:parentElement, children, firstElementChild, lastElementChild;  
    兄弟关系: previousElementSibling, nextElementSibling
    它们的规则和用法都是相同的。

- 创建新节点  

    |方法|描述|
    |:---|:---|
    |document.createElement()|创建某种类型的元素
    |document.createDocumentFragment()|创建一个新的空白的文档片段
    |document.createTextNode(data)|创建文本节点

- 节点插入、替换、删除、克隆
    注意：新创建的节点需要插入文档树才会生效

    |方法|描述|
    |:---|:---|
    |node.append()|追加子节点，IE不支持
    |node.appendChild()|追加子节点
    |node.insertBefore(新节点，参照节点)|在参照物前插入节点
    |node.replaceChild(新节点，被替换节点)|替换节点
    |node.removeChild(需要移除的节点)|删除节点
    |node.cloneNode(true / false)|克隆调用该方法的节点，一般参数选择true（深克隆）

    那我们这次用一个新的 🌰 ～
    ```
    /* html */
    <div id="para"></div>
    <ul class="fruit-list">
    <li>apple</li>
    <li>banana</li>
    <li>orange</li>
    <li>watermelon</li>
    </ul>
    <ul class="fruit-list"><li>mango</li><li>grape</li><li>lemon</li><li>coconut</li></ul>
    ```
    就是这么个简单的列表，接下来是 js 咯～
    ```
    /* js */
    var pNode = document.createElement('p');
    var text = document.createTextNode('Hello parameter!');
    pNode.appendChild(text);
    var para = document.getElementById('para');
    para.appendChild(pNode);

    var list = document.getElementsByClassName('fruit-list');
    list[0].children[3].innerHTML = 'mango';
    //childNodes 会包含所有的节点包括文本和子元素 例如：list[0].childNodes = [li, test, li ,test...]
    list[1].removeChild(list[1].children[1]);
    var listItem = document.createTextNode("pear");
    var item = document.getElementsByTagName('ul');
    // item[1].replaceChild(listItem, item[1].childNodes[0]);
    // 只加文本节点的话，会删除之前元素的属性，比如 li 前面的黑点
    var oList = document.createElement('li');
    oList.appendChild(listItem);
    item[0].childNodes[3].innerHTML = 'pineapple';
    item[1].replaceChild(oList, item[1].childNodes[2]);
    item[1].childNodes[2].style.color = '#ddd';
    //如果先创建 element 再往 element 里加文本节点 就可以保留 li 的属性
    //添加属性能用 setAttribute() 方法 / document.getElementById('id').style.color = '#fff'。
    var childList = item[0].childNodes[3];
    childList.parentElement.replaceChild(oList, childList);
    //必须要节点的父元素，比如 item[1] 如果只有子节点，就要加 parentNode/parentElement，
    //唯一的区别就是，前者找的是父节点，后者找的是父元素，如果一直往上找，
    //前者可以多遍历到一个节点 body < html < #document < null，后者只能是 body < html < null。
    ```
    这个是我之前自己写的一小段 demo，有些混乱但是尽力在尝试了，希望能对您有些帮助，欢迎纠错！

    表格部分来自[这里](https://www.jianshu.com/p/fa56da886218)，感谢这个小可爱的总结～

