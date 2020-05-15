##### 1. `Ajax` 一共有多少种回调？
在网上查的有两种情况
- 八种：
  >onSuccess / onFailure / onUninitialized / onLoading / onLoaded / onInteractive / onComplete / onException

  我觉得这八种可以根据 Ajax 本身的五个状态有关。
    - 0-未初始化(uninitialized)，尚未调用open()方法 
    - 1-载入(loading)，调用open()方法，已调用send()的方法，正在发送请求
    - 2-载入完成(loaded)，已经调用send()方法，已接受到响应
    - 3-交互(interactive) 正在解析响应数据
    - 4-完成(completed)，响应数据解析完成，客户端可以调用
- 五种：
  >beforeSend、error、dataFilter、success、complete。

  - beforeSend  
  在发送请求之前调用，并且传入一个 XMLHttpRequest 作为参数。  
  - error  
  在请求出错时调用。传入 XMLHttpRequest 对象，描述错误类型的字符串以及一个异常对象（如果有的话）
  - dataFilter  
  在请求成功之后调用。传入返回的数据以及 "dataType" 参数的值。并且必须返回新的数据（可能是处理过的）传递给 success 回调函数。  
  - success  
  当请求之后调用。传入返回后的数据，以及包含成功代码的字符串。  
  - complete  
  当请求完成之后调用这个函数，无论成功或失败。传入 XMLHttpRequest 对象，以及一个包含成功或错误代码的字符串。

  这五种应该是 jQuery 中常用的回调函数，即 $.ajax()。

回调函数是另外某件事结束时执行的一个函数。在 Ajax 中，回调函数就是服务器对一个请求对象作出响应时调用的函数。浏览器会在某个时刻”回调”这个函数。使用回调函数，代码就可以继续进行其他任务，而无需空等。  

##### 2. 编程
```
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
ajax.request("script.php", "post", myCallback, "first=John&last=Smith");
```

##### 3. 造成跨域的原因  
1. 浏览器限制，目前所有浏览器都实现了同源策略规范。
2. 请求方式Type为xhr。如果非xhr，如json，script则也不会存在跨域问题
3. 请求方与服务方的源不同，即跨域，包括：
    - 协议不同，例如：http & https
    - 域名不同，例如：www.a.com & www.b.com
    - 端口不同，例如：8080 & 80端口
    
    注意：同一域名下的不同文件夹不算跨域；域名对应的IP也属于跨域。
    具体可以参考[这里](https://www.cnblogs.com/smiler/p/5829621.html)。

三个同时满足才有跨域的可能。

##### 4. 怎样解决跨域问题
1. `Jsonp`：动态导入外部 js，css，img 文件，因为这些 script、link 和 img 是可以获取到其他域的资源的。  
用 Ajax 请求 datatype 取 “jsonp” ，因为这种方法只能是 get 方法，所以不管设置 type 为 post 还是 get 都会用 get 方法。  
Ajax 核心是通过 XMLHttpRequest 获取非本页内容，添加一条 `jsonp: 'callback'(jQuery中)`，一般就定义一个回调函数即可，然后服务器端会自动将所有需要的 json 封装在这个名字的函数里面，作为参数调用。

  **优缺点**：优点是不像 XMLHttpRequest 对象实现 Ajax 请求那样受到同源限制，兼容性更好，不需要 XMLHR 或 ActiveX 的支持，用 callback 的方式回传结果就好。不足是只能 get 不能 post 且只处理 http 请求，像不同域之间进行 js 调用就不行了；没有关于 JSONP 调用的错误处理，比如 404 错误，只能看他是否长时间不响应了。
2. `CORS策略`：W3C 标准(跨域资源共享)这是一种浏览器与跨源服务器之间的交互方式，使得浏览器可以向服务器发送 XMLHttpRequest 请求，从而克服了 Ajax 只能同源使用的限制。支持所有浏览器（IE10+）。  
一般的 AJAX：`xhr.open("GET", "/file", true)`; 这里带的是本域的相对路径 “/file”；CORS的AJAX：`xhr.open("GET", "http://blog.csdn.net/file", true)`; 这里带的是其他域的相对路径服务器会自动添加一些附加的头信息，比如 `Access-Control-Allow-Origin` 来进行，如果浏览器检测到，则可以跨域访问。 

  **优缺点**：优点是 CORS 支持所有类型的 http 请求，并且开发者可以使用普通的 XMLHttpRequest 发起请求和获得数据，比 JSONP 有更好的错误请求。缺点是 IE10+ 才支持，兼容性不太好。
3. `document.domain+iframe` 的设置（只有在主域相同的时候才能使用该方法）：例如：www.example.com/a.html 和 example.come/b.html 一样，只要把这两个页面的 document.domain 都设置成相同的域名就可以了，但是只能把 document.domain 设置成自身或者更高一级的父域才 ok。  
例如：`a.b.example.com` 可以设为它本身以及 `b.example.com` 和 `example.com` 中的任何一个，但不可以是 `c.a.b.example.com` 这样子。缺点就是只有在主域相同的时候才可以使用这个方法了。
4. `HTML5 和 postMessage`：这是 HTML5 提供的一个API，window.postMessage 是一个安全的、基于事件的消息API。  
调用该方法的可以是 window、文档窗口中的 iframe、js 中打开的窗口 `var win = window.open()`、当前文档窗口的父窗口 `var win = window.parent`、`var win = window.opener` ...  
找到源 window 对象后，即可调用postMessage API 向目标窗口发送消息：`win.postMessage(msg, targetOrigin)`，这两个参数中，msg 是要发送的消息，可以是 js 参数例如字符串数组对象什么的。targetOrigin 就是“目标域”，例如在 2.com 上向 1.com 上传消息，自然是输入 1.com 的域名，注意是完整域名：`主机名+端口号`，eg：`http://g.cn:80/`  
目标域的接收就只要监听window的message事件就好了：
    ```
    var onmessgae = function(event) {
      var data = event.data;
      var origin = event.origin;
      /*还可以传source，是Event对象的实例event的第三个属性，代表发送消息窗口的window对象引用*/
    };
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', onmessage, false);
    } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('message', onmessage);
      //兼容IE
    }
    ```

  **优缺点**：方便安全有效 ；ie8+ 才是支持，且 ie8～ie10 只支持 iframe 方法可以这么用。  
5. `window.name`(相对比较完美的办法)：当 iframe 的页面跳到其他地址时，其 window.name 值保持不变，并且可以支持非常长的 name(2M)，当然跨域情况下是不允许读取 iframe 的 window.name 的值的。
	使用方法：
    - 准备三个页面 `http://www.a.com/main.html`、`…a.com/other.html`、`…b.com/data.html` 分别是应用页面、代理页面（和应用页面在同一个域，一般是一个空的html）、应用页面获取数据的页面。
    - 数据页面将数据传到 `window.name` 中去：//data.html 下 window.name = [1, 1]…//数组字符串对象都可以应用页面下 先将自己定位 `window.location` 到 other.html 中，再接收 window.name 再监听添加iframe
    - 销毁iframe释放内存： 
      ```
      iframe.contentWindow.document.write('');
      iframe.contentWindow.close();
      document.body.removeChild(iframe);
      ```
      也保证了安全(不被其他域 frame/js访问)，浏览器支持好，比较普遍使用的方法。

##### 5. 编程
```
/**
options = {
  url: "",
  method: "",
  headers: {},   // 传给
  data: "",     // 传给服务器的参数
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
var request = function(options) {
  var ajax = (window.XMLHttpRequest) ? new XMLHttpRequest() 
           : new ActiveXObject("Microsoft.XMLHTTP");
  ajax.open(options.method, options.url, true);
  if(options.method === "GET") {
    ajax.send();
  } else {
    ajax.send(options.data);
  }
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if(ajax.status === 200) {
        options.success();
      } else {
        options.fail();
      }
    }
  }
}
```
