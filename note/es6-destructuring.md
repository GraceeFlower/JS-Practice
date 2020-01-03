#### FE_41 GraceeJS
***
(这是一篇跨年的日志 这个模块是二号才看完的 想写在一起～)
今天站会完了，花了一个小时把最后五个题写完了，遇到的问题就是，`concat` 没有办法直接改变原数组，这个坑之前没遇到所以有点忽视了，还一个就是 `script.sh` 需要重新配置，看起来好像是一个绝对路径的问题，已解决～  
晚上聚餐回来开始看 **ES6** 的东西：  
1. 数组

    - 模式匹配：从数组（可每遍历对象 set...）中提取值，按照对应位置，对变量赋值。  
        ```
        let [a, b, c] = [1, 2, 3];
        a // 1
        let [foo, [bar], baz] = [1, [2], 3];
        bar // 2
        let [head, ...tail] = [1, 2, 3, 4];
        head // 1
        tail // [2, 3, 4]
        let [ , , third] = ["foo", "bar", "baz"];
        third // "baz"
        let [x, y , ...z] = ["a"];
        x // "a"
        y // undefined
        z // []
        let [foo] = [];
        let [bar, foo] = [1];
        // 上面这种情况 foo 都是 undefined，这叫做解构不成功
        // 下面这个叫解构不完全
        let [a, [b], d] = [1, [2, 3], 4];
        a // 1
        b // 2
        d // 4
        ```

    - 默认值  
       ```
       let [foo = true] = [];
       foo // true
       let [x, y = "b"] = [undefined];
       x // undefined
       y // "b"
       let [x, y = "b"] = ["a"];
       x // "a"
       y // "b"
       let [x = 1] = [null];
       x // null
       ```

       只有在等号右边里的数组成员是严格等于 `undefined` 的时候才会按左边数组中赋予的值走，例如最后两个例子。
       下面这个例子也是一样的，因为 x 被赋值 1 了，所以不会执行 f 函数，如果把 1 去掉，就会直接执行一次 f 函数，打印 "aaa"
       
       ```
       function f() {
         console.log("aaa");
       }
       let [x = f()] = [1];
       x // 1
       let [x = f()] = [];
       // "aaa"
       x // undefined
       ```
          
2. 对象
    - 对象的解构赋值
    解构不仅可以用于数组，还可以用于对象
        ```
        let {foo, bar} = { foo: "aaa", bar: "bbb" };
        foo // "aaa"
        bar // "bbb"
        
        //上面等价于：
        let {foo: foo, bar: bar} = {foo: "aaa", bar: "bbb"}
        //因为这个的属性值和变量名相同，所以可以简写，不同的下面有例子

        let { baz } = { foo: 'aaa', bar: 'bbb' };
        baz // undefined
        foo // ReferenceError: foo is not defined
        // (bar is the same)
        // 就算是一般的对象，也是这样的结果，所以说这里取不到很正常
        var obj = {foo: 1, bar: 2}
        foo // foo is not defined
        ```   

      上面这两个例子就说明，必须是左边的变量名必须与右边的属性同名才可以取到值，如果解构失败：
        ```
        let {foo} = {bar: "aaa"}
        foo // undefined
        ```

      对象解构也可以将现有的对象的方法赋给变量，比如：
        ```
        let {floor, ceil, sin} = Math;
        floor(12.9) // 12
        const {log} = console;
        log("a"); // "a"
        ```

      如果**变量名与属性名不一致**，必须写成下面这样
        ```
        let {foo: baz} = {foo: "aaa"}
        baz // "aaa"
        foo // foo is not defined
        ```
        
      >**那么第一个问题来了**：当变量名和属性名相同时，它默认创建 {foo: foo} 还是说只创建了，变量或者是属性名呢，如果是，那到底是创建的变量名还是属性名呢？因为如果从上面这个例子来看，foo 是没有意义的，有点形参的样子，baz 才是变量，不太理解这里属性名和变量名的用意，以及什么情况下会用这种两个值不一致的定义方式。
      
      在这个例子里面，foo 是匹配的模式，bar 才是变量，foo 并不会被赋值，变量才会被赋值。
        ```
        let obj = {first: “hello”, last: “world”};
        let {first: f, last: l} = obj;
        f // ”hello“
        l // “world”
        ```

      上面这个例子就是将 obj 对象的方法赋给变量 f 和 l。  
      对于对象来说，也可以用**嵌套**的模式：
        ```
        let obj = {
          p: [
            "Hello",
            {y: "World"}
          ]
        };

        let {p: [x, {y}]} = obj;
        x // "Hello"
        y // "World"
        ```
      这个时候 p 也是模式，不是变量，如果要让它变成变量，就改成 `{p, p: [x, {y}]}`，这个时候 p 就是 `["Hello", {y: "World"}]`。
      再看下面这个例子～
        ```
        const node = {
          loc: {
            start: {
              line: 1,
              column: 5
            }
          }
        };

        let { loc, loc: { start }, loc: { start: { line }} } = node;
        loc // {start: {line: 1, column: 5}}
        start // {line: 1, column: 5}
        line // 1
        column // column is not defined
        
        // 如果子对象所在的父属性不存在，会报错 TypeError，例如：
        let {foo: {bar}} = {baz: 'baz'};
        // 可以这样改，总之 foo 必须在等号右边对应上才行，不能是 undefined
        let {foo: {bar}} = {foo: {bar: "baz"}};
        ```

        最后一个变量只有 line。
        看一个**嵌套赋值**的例子：
        ```
        let obj = {};
        let arr = [];

        ({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});

        obj // {prop:123}
        arr // [true]
        ```
        
      >**第二个问题来了**：上面这段代码中的括号是什么意思呀，为什么加了括号能成功赋值，不加就不行呢？
      >fix: 后面阮一峰前辈解答了～
      
      康康下面这个例子，继承原型属性来咯：
      ```
      const obj1 = {};
      const obj2 = {foo: "bar"};
      Object.setPrototypeOf(obj1, obj2);
      // 这句就是将 obj2 设置为 obj1 的原型，并让其继承它的属性 foo
      const {foo} = obj1;
      foo // "bar"
      ```
      
    - 默认值(生效条件也是默认严格等于 `undefined`)

        这个和数组的类似：
        ```
        var {x = 3} = {} 
        x // 3
        
        var {x, y = 1} = {x: 5}
        x // 5
     
        var {x: y = 3} = {x: 5};
        y // 5
        
        var {x = 3} = {x: undefined};
        x // 3
        ```

      **注意点**：
      - 圆括号的使用
      ```
      let x;
      {x} = {x: 1};
      ```
      直接连续写上这么两句，会报语法错误，因为 JS 引擎会把 {x} 理解成一个**代码块**，所以会有作用域的问题，所以要加一个括号在外面，解决了上面的第二个问题：
      ```
      let x;
      ({x} = {x: 1});
      ```
      - 数组的特殊用法
      ```
      let arr = [1, 2, 3];
      let {0 : first, [arr.length - 1] : last} = arr;
      first // 1
      last // 3
      ```

      就是将数组的第一和第三项的值分别赋给了 first 和 last。
      
 3. 字符串的解构赋值
    ```
    const [a, b, c, d, e] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"
    
    let {length : len} = 'hello';
    len // 5
    ```
 4. 数值和布尔值的解构赋值（解构赋值时，如果等号右边是数值和布尔值，则会先转为对象）
 5. 函数参数的解构赋值
    ```
    function add([x, y]){
      return x + y;
    }
    add([1, 2]); // 3
    
    [[1, 2], [3, 4]].map(([a, b]) => a + b);
    // [ 3, 7 ]
    ```
 6. 不得使用圆括号的情况
    
    - 变量声明语句(包括函数的参数声明)，eg：
    ```
    let ({x}) = {x: 1}
    // ReferenceError: let is not defined
    let {(x): c} = {}
    // SyntaxError: Unexpected token '('
    let {x: (c)} = {}
    function f([z,(x)]) {return x;}
    // SyntaxError: Invalid destructuring assignment target
    //无效的解构赋值目标
    ```
    
    - 赋值语句的模式(不管是整个模式还是部分模式)
    ```
    ({ p: a }) = { p: 42 };
    ([a]) = [5];
    // SyntaxError: Invalid left-hand side in assignment
    [({ p: a }), { x: c }] = [{}, {}];
    // SyntaxError: Invalid destructuring assignment target
    ```
    
    - 可以使用圆括号的情况可以类推出来，非模式部分：
    ```
    [(b)] = [3];
    ({ p: (d) } = {});
    [(parseInt.prop)] = [3];
    ```
    
##### 7. 用途(是的 看到这里第一个问题也被解决了～)
 
   - 交换变量的值
        ```
        let x = 1;
        let y = 2;
        [x, y] = [y, x]
        x // 2
        y // 1
        ```

      很方便啊～  
    
   - 从函数中返回多个值
        ```
        // 返回一个数组
        function example() {
          return [1, 2, 3];
        }
        let [a, b, c] = example();

        // 返回一个对象
        function example() {
          return {
            foo: 1,
            bar: 2
          };
        }
        let { foo, bar } = example();
        ``` 

      我的天 也太好用了吧！一直想要这种 return 的方法
    
   - 函数参数的定义(数组或者是对象，不举例了)
    
   - 快速提取 JSON 对象数据的值！
        ```
        let jsonData = {
          id: 42,
          status: "OK",
          data: [867, 5309]
        };

        let { id, status, data: number } = jsonData;

        console.log(id, status, number);
        // 42, "OK", [867, 5309]
        ```
   
   - 函数参数的默认值(这个其实没有很深的体会)
   
   - 遍历 Map 结构(部署了 Iterator 接口的对象都 OK)
        ```
        const map = new Map();
        map.set('first', 'hello');
        map.set('second', 'world');

        for (let [key, value] of map) {
          console.log(key + " is " + value);
        }
        // first is hello
        // second is world
        
        // 获取键名
        for (let [key] of map) {
          // ...
        }

        // 获取键值
        for (let [,value] of map) {
          // ...
        }
        ```

      可以很快拿到键值对的值诶～
    
  - 输入模块的指定方式(这个也需要以后多多体会)

[阮一峰大大的博客](http://es6.ruanyifeng.com/#docs/destructuring) 真 nb！
     

