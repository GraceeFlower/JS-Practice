### FE_46 GraceeJS
***
今天决定先把 ES6 中函数那块看完，把卡做一下。（还是向任务卡低头了...）

#### [函数的拓展](http://es6.ruanyifeng.com/#docs/function)  

1. 函数参数的默认值  

    - 基本用法  
    以前需要用判断结合一些关系运算符给函数中的变量赋默认值，es6 中就可以直接在形参里给参数赋默认值：
  
      ```
      function log(x, y = 'World') {
        console.log(x, y);
      }

      log('Hello') // Hello World
      log('Hello', 'China') // Hello China
      log('Hello', '') // Hello
      
      function Point(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }

      const p = new Point();
      p // { x: 0, y: 0 }
      ```
    
      这样做不仅代码简洁，而且可以告诉别人那些参数是默认不需要去再次声明的。  
      本来这些赋了默认值的参数就不能用 let const 重新赋值的( var 可以)；而且在有默认赋值的参数中，不能有重名的参数；如果是表达式，每次都会重新计算默认值，而不是一成不变的：

      ```
      // 不报错
      function foo(x, x, y) {
        // ...
      }

      // 报错
      function foo(x, x, y = 1) {
        // ...
      }
      // SyntaxError

      let x = 99;
      function foo(p = x + 1) {
        console.log(p);
      }

      foo() // 100

      x = 100;
      foo() // 101
      ```

    - 与解构赋值默认值结合使用  
    将函数参数默认值，与解构赋值默认值结合起来使用。  
    这个我看的时候觉得挺有意思的，先看三个例子：
    
      ```
      // 1.刚学的给函数参数赋默认值
      function foo(x, y = 1) {
        console.log(x, y);
      }
      foo() // undefined 1
      // 因为 x 实际上是声明了的，只不过没赋值所以是 undefined

      // 2.这个是解构赋值默认值当作参数，只有当参数是对象时才会使用该默认值
      function foo({x, y = 1}) {
        console.log(x, y);
      }
      foo()
      // TypeError: Cannot read property 'x' of undefined...
      // 因为 foo 的参数不是一个对象
      foo({}) // undefined 1
      foo({x: 1}) // 1 1
      foo({x: 1, y: 2}) // 1 2

      // 3.这个只是把一个解构对象的赋值的结果当做参数的默认值
      function foo({x, y} = {y: 1}) {
        console.log(x, y);
      }
      foo() // undefined 1
      ```

      上面三种情况，都没有完全结合**函数参数默认值**和**解构赋值默认值**这两个东西。在第二个例子的第二个输出可以发现，当我们把参数设置为对象时，就可以解决这个问题了，所以就有了：
      
      ```
      function foo({x, y = 1} = {}) {
        console.log(x, y);
      }

      foo() // undefined 1
      ```

      顺利解决了一个报错的问题，这就是将解构赋值的默认值设置成了函数参数的默认值，也就是无论如何都会生成 x y，只是赋值不同而已。再看一个复杂一点的例子：

      ```
      function fetch(url, { body = '', method = 'GET', headers = {} }) {
        console.log(method);
      }

      fetch('http://example.com', {})
      // "GET"
      fetch('http://example.com')
      //  TypeError: Cannot read property 'body' of undefined...
      
      function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
        console.log(method);
      }

      fetch('http://example.com')
      // "GET"
      fetch();
      // "GET"
      ```

      只有将两者结合，才能顺利取到默认值，就算 method 没有给值，那也会返回 undefined，而不会报错～  
      关于最后一种解构对象赋值，作者做了个对比：

      ```
      // 写法一：这就是我们要学的
      function m1({x = 0, y = 0} = {}) {
        return [x, y];
      }

      // 写法二：这是单纯的解构对象赋值
      function m2({x, y} = { x: 0, y: 0 }) {
        return [x, y];
      }

      m1() // [0, 0]
      m2() // [0, 0]

      m1({x: 2}) // [2, 0]
      m2({x: 2}) // [2, undefined]

      m1({x: 2, y: 2}) // [2, 2]
      m2({x: 2, y: 2}) // [2, 2]

      m1({}) // [0, 0]
      m2({}) // [undefined, undefined]

      m1({z: 1}); // [0, 0]
      m2({z: 1}); // [undefined, undefined]
      ```

      我们可以很明显的看出，前者是成功设置了默认值的，后者并没有。

    - 参数默认值的位置  
      这个其实就只是说了一下，如果被设置默认值的参数不是最末尾的参数，就要用 undefined 来替代才能触发默认值：
      
      ```
      // 例一：一般情况，默认值在末尾
      function f(x, y = 1) {
        return [x, y];
      }
      f() // [undefined, 1]
      f(1) // [1, 1]

      // 例二：特殊情况，默认值在前者
      function f(x = 1, y) {
        return [x, y];
      }

      f() // [1, undefined]
      f(2) // [2, undefined])
      f(, 1) // SyntaxError
      f(undefined, 1) // [1, 1]

      // 例三：特殊情况，默认值在中间某个参数上
      function f(x, y = 5, z) {
        return [x, y, z];
      }

      f() // [undefined, 5, undefined]
      f(1) // [1, 5, undefined]
      f(1, ,2) // 报错
      f(1, undefined, 2) // [1, 5, 2]
      ```
      
      这就不用多解释了，当然，绝对等于 undefined 才能触发，如果是 null 之类的也不行。

    - 函数的 `length` 属性  
    指定了默认值以后，函数的 length 属性，将**返回没有指定默认值的参数个数**。也就是说，指定了默认值后，length 属性将失真。看例子：
    
      ```
      (function (a) {}).length // 1
      (function (a = 5) {}).length // 0
      (function (a, b, c = 5) {}).length // 2
      (function(...args) {}).length // 0
      (function (a = 0, b, c) {}).length // 0
      (function (a, b = 1, c) {}).length // 1
      ```

      **注意点**：`length` 是指该函数**预期**传入的参数个数，所以像 rest 参数和被设定了默认值的参数就不在这个范围里面，而且是一碰到设置默认值就停止计算长度。

    - 作用域  
    一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。  

      简单的例子，来咯～
      
      ```
      // 示例一
      var x = 1;

      function f(x, y = x) {
        console.log(y);
      }

      f(2) // 2
      f() // undefined

      // 示例二
      var x = 1;

      function f(y = x) {
        var x = 3;
        console.log(y);
      }

      f(2) // 2
      f() // 1

      // 示例三
      function f(y = x) {
        let x = 2;
        console.log(y);
      }

      f(2) // 2
      f() // ReferenceError: x is not defined
      ```

      我小小给大家分析一下：首先三个 `f(2)` 的输出都相同，是因为覆盖了默认值嘛，所以就正常输出。  

      那么示例一中，我们的参数里是有设置默认值的，按照作者开题说的内容，x 和 y 这两个参数就会在声明的时候形成一个单独的作用域，并且初始化，`x 为 undefined`，然后清除这个作用域；接着默认的输出就是初始化之后的值～  

      示例二中，在初始化的阶段，该作用域里面没有 x，所以 y 没有办法被赋值，所以就往全局找 x 并且找到了，赋值为 1，作用域消失。所以默认输出就是 1。

      示例三中，和二差不多，但是全局也没有找到 x，所以报错也是可想而知的～  

      看看复杂的例子吧～
    
      ```
      var x = 1;
      function foo(x, y = function() {x = 2;}) {
        var x = 3;
        y();
        console.log(x);
      }

      foo() // 3
      x // 1
      ```

      在上面这个例子中，为什么最后 foo() 不是输出 2 呢？  

      按照作者的解释，因为在初始化的时候，x 和 y 这个匿名函数中的 x 指向的是同一个作用域，也就是同一个 x，而 foo 函数内部重新定义了一个 x，这个 x 和之前声明初始化的 x 不在一个作用域，所以说，y 中的 x 不会起作用，既不会影响函数里的 x，也不会影响全局的 x。  

      看下面这个例子，就算你在这个之前打印一下 x，也是 undefined，很明显是因为变量提升，之前我们参数里的声明的 x 已经不属于这里了～下面的第二个例子是为了证明一下，它曾经来过！
      
      ```
      var x = 1;
      function foo(x, y = function () {x = 2;}) {
        y();
        console.log(x);
        var x = 3;
        y();
        console.log(x);
      }

      foo() // undefined 3
      x // 1

      function bar(x, y = function () {x = 2;}) {
        y();
        console.log(x);
      }

      bar() // 2
      ```

    - 应用  
    利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
    
      ```
      function throwIfMissing() {
        throw new Error('Missing parameter');
      }

      function foo(mustBeProvided = throwIfMissing()) {
        return mustBeProvided;
      }

      foo()
      // Error: Missing parameter
      ```

      上面代码的 foo 函数，如果调用的时候没有参数，就会调用默认值 throwIfMissing 函数，从而抛出一个错误。

      从上面代码还可以看到，参数 mustBeProvided 的默认值等于 throwIfMissing 函数的运行结果（注意函数名 throwIfMissing 之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在**运行时执行**。如果参数已经赋值，默认值中的函数就不会运行。

      另外，可以将参数默认值设为 undefined ，表明这个参数是可以省略的。  
      `function foo(optional = undefined) { ··· }`
      
      >这个应用看起来好像...太具体了，我想知道除了这个还有什么其他的应用？


2. `rest` 参数  
  ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。  

    ```
    // arguments 变量的写法
    // arguments 对象不是数组，而是一个类似数组的对象
    function sortNumbers() {
      return Array.prototype.slice.call(arguments).sort();
    }

    // rest 参数的写法
    const sortNumbers = (...numbers) => numbers.sort();
    ```

    **注意点**就是上面提过的 length 属性；还有一个就是，`rest` 参数只能写在最后一个参数的位置，否则会报错哦～例如：`function foo(a, b, ...values, c) {}`

3. 严格模式  
  据说 ES5 开始就已经可以用严格模式 `'use strict'` 了，但是在有了默认值、解构赋值、扩展运算符等之后啊，函数内部就不能设置成显式的严格模式了，原因很简单。  
  因为函数内部的严格模式，同时适用于函数体和函数参数，但是有默认值的函数参数在声明初始化的时候就赋值了，并且赋值是成功的，只有运行到函数内部才会报错。  
  
    看个例子：
    
      ```
      function doSomething(value = 070) {
        'use strict';
        return value;
      }
      /* Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list */
      ```

      严格模式下不能使用 0 当前缀表示八进制，但其实已经在运行函数参数是成功赋值了，运行函数体的时候才发现这个错误。

      解决办法有两个：
        
      ```
      // 方法一：全局严格模式
      'use strict';

      function doSomething(a, b = a) {
        // code
      }

      // 方法二：将参数放在一个无参数的立即执行函数里
      const doSomething = (function () {
        'use strict';
        return function(value = 42) {
          return value;
        };
      }());
      ```

      自己的一个误区：之前说的解构赋值、默认值之类的，不是说在严格模式下无法使用，只是如果不符合严格模式规定的才没法用～

4. `name` 属性  
  就是一个表示函数名称的属性：
  
    ```
    function foo() {}
    foo.name // "foo"

    var f = function () {}
    // ES5
    f.name // ""

    // ES6
    f.name // "f"

    const bar = function baz() {}
    bar.name // "baz"

    (new Function).name // "anonymous"

    function foo() {};
    foo.bind({}).name // "bound foo"

    (function () {}).bind({}).name // "bound "
    // 注意有个空格哦～
    ```

5. 箭头函数  
    - 基本用法  
      最基本的我就不再写了，还有关于大括号可以把对象保护起来而不被识别成语句，之前也提过了～记录几个自己我之前犯过的错误以及一些结合 ES6 新方法的用法：  
      - 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。

        ```
        let fn = () => void doesNotReturn();
        ```

      - 箭头函数可以与变量解构结合使用。

        ```
        const full = ({ first, last }) => first + ' ' + last;

        // 等同于
        function full(person) {
          return person.first + ' ' + person.last;
        }
        ```

      - 箭头函数的一个用处是简化回调函数。

        ```
        // 正常函数写法
        [1,2,3].map(function (x) {
          return x * x;
        });

        // 箭头函数写法
        [1,2,3].map(x => x * x);

        // 正常函数写法
        var result = values.sort(function (a, b) {
          return a - b;
        });

        // 箭头函数写法
        var result = values.sort((a, b) => a - b);
        ```

      - rest 参数与箭头函数结合的例子。

        ```
        const numbers = (...nums) => nums;

        numbers(1, 2, 3, 4, 5)
        // [1,2,3,4,5]

        const headAndTail = (head, ...tail) => [head, tail];

        headAndTail(1, 2, 3, 4, 5)
        // [1,[2,3,4,5]]
        ```

    - 使用注意点  
      （1）函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象。

      （2）不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。

      （3）不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。

      （4）不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。  
      
      最重要的貌似是第一点，用三个我觉得最适合理解的例子：
        
        ```
        // 示例一
        function foo() {
          setTimeout(() => {
            console.log('id:', this.id);
          }, 100);
        }

        var id = 21;

        foo.call({ id: 42 });
        // id: 42

        // 示例二
        function Timer() {
          this.s1 = 0;
          this.s2 = 0;
          // 箭头函数
          setInterval(() => this.s1++, 1000);
          // 普通函数
          setInterval(function () {
            this.s2++;
          }, 1000);
        }

        var timer = new Timer();

        setTimeout(() => console.log('s1: ', timer.s1), 3100);
        setTimeout(() => console.log('s2: ', timer.s2), 3100);
        // s1: 3
        // s2: 0

        // 示例三
        // ES6
        function foo() {
          setTimeout(() => {
            console.log('id:', this.id);
          }, 100);
        }

        // ES5
        function foo() {
          var _this = this;

          setTimeout(function () {
            console.log('id:', _this.id);
          }, 100);
        }
        ```

        都是计时器的例子，充分的说明了，this 在定义时就被绑在它所在的那个作用域了，而不是说运行时所在的作用域，最后一个例子，说明这种嵌套函数的情况，会绑它上一层的 this，还有一个特别的例子：

        ```
        function foo() {
          return () => {
            return () => {
              return () => {
                console.log('id:', this.id);
              };
            };
          };
        }

        var f = foo.call({id: 1});

        var t1 = f.call({id: 2})()(); // id: 1
        var t2 = f().call({id: 3})(); // id: 1
        var t3 = f()().call({id: 4}); // id: 1
        ```

        这个例子只有一个 this，就是 foo 函数中最外层的那个 this，因为箭头函数这种情况就只能找上一层的 this，所以都是指向了最外层那个，所以结果都是一样的～用 call、apply、bind 都不好使。  

    - 不适合场景  
     上面注意点都说过了，所以不适合的场景自然就是需要用到动态 this 的情况啦～比如你定义一个对象并且用到了 this，或者是事件监听的对象之类的。  

    - 嵌套的箭头函数  
      举两个例子吧～  
      
      ```
      // 第一个是部署管道的简单应用
      const pipeline = (...funcs) =>
        val => funcs.reduce((a, b) => b(a), val);

      const plus1 = a => a + 1;
      const mult2 = a => a * 2;
      const addThenMult = pipeline(plus1, mult2);

      addThenMult(5)
      // 12
      // val 就是初值
      // 整个过程就是，(5 + 1) * 2

      // 第二个据说是计算机科学中很重要的东东
      // λ演算的写法
      fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

      // ES6的写法
      var fix = f => (x => f(v => x(x)(v)))
                    (x => f(v => x(x)(v)));
      ```


