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
      // html
      <div id="btn">This block should contain a button</div>

      // js
      document.getElementById("btn").innerHTML = "<input type='button' value='button' />";

      document.getElementById("btn").innerHTML
      // "<input type='button' value='button' />";
      ```
      这个操作可以让 id 为 btn 的节点的内容变成一个按钮，而不是一段文字，并且通过这方式获取到的节点内容也是我们所添加到的整段 html。

  2. `innerText`  
  获取或设置**文本**内容，例如：
      ```
      // html
      <div class="box" id="text">outer<span> inner</span></div>

      //js
      document.getElementById("text").innerText; // "outer inner" 注意哦～空格也是文本的一部分呢

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
      document.nodeName; // "#document"
      document.head.nodeName; // "HEAD"
      document.getElementById("text").nodeName; // "DIV"
      document.getElementsByTagName("div")[0].children[0].nodeName; // "INPUT"
      ```
      这个时候我给 js 中加上一句：
      ```
      document.getElementById("btn").children[0].setAttribute("type", "text");

      document.getElementById("btn").children[0].attributes.type.nodeName; // "type"
      ```
      它会把原来的 button 类型转换为 text，并且可以获得它的属性节点的名称 "type"。

      还有另一种属性的写法：
      ```
      document.getElementById("text").style.color = "#ddd";
      document.getElementById("text").attributes.style.nodeName; // "style"
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
        document.getElementsByTagName("div")[1].nodeType; // 1
        document.getElementsByTagName("div")[1].attributes[0].nodeType; // 2
        document.getElementsByTagName("div")[1].childNodes[0].nodeType; // 3
        ```
        (其实还有更多的类型，例如注释是 8 ...)

    
