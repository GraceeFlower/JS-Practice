##### 1. 创建对象的方式：

- 字面量创建法

  ```
  var person = {
    name: "Grace",
    age: 18,
    gender: "female"
  };
  ```

- 借助 **new** 操作符 + **Object** 创建
  ```
  var person = new Object();
  person.name = "Grace";

  //下面是另一种创建属性的方式

  var myHeight = "height";
  var myHeightValue = "163cm";
  person[myHeight] = myHeightValue;
  person.height === person[myHeight]; // true
  ```  

- 构造函数  
  ```
  function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  var kitty = new Person("Kitty", 8, "female");
  var grace = new Person("Grace", 18, "female");

  kitty.name; // "Kitty"
  grace.age; // 18

  Person.prototype.greet = function () {
    return ("Hello, I\'m " + this.name + "!");
  }

  grace.greet(); // "Hello, I'm Grace!"
  ```

1. 该方法可以利用一个构造函数（`new Person(...)`）来创建很多个对象，并且构造函数中的 `this` 会在创建的时候，指向新创建的对象，并且默认返回 this，所以在最后就不用 `return this` 了。  
2. 如果想要给这些对象创建一个新的属性，例如 `greet` 就只要将这个属性加到他们的原型链上就好了，即 `Person.prototype.greet` ，这样就可以让他们的 greet 函数都可以共享一个属性，节省内存。
3. 需要注意的是：
    ```
    kitty.greet; // function: Person.greet()
    grace.greet; // function: Person.greet()
    kitty.greet === grace.greet // true
    ```
    但是如果是下面这样写：(直接写在构造函数里)
    ```
    function Person(name) {
      this.name = name;
      this.hello = function () {
        alert('Hello, I\'m ' + this.name + '!');
      }
    }

    var kitty = new Person("Kitty");
    var grace = new Person("Grace");

    kitty.hello; // function: Person.hello()
    grace.hello; // function: Person.hello()
    kitty.hello === grace.hello; // false
    ```

   这个时候它们并不是共用一个函数，只不过是函数的名称和内容相同而已，所以实际上是两个不同的函数。

4. 上面的第一段代码中：
    ```
    return ("Hello, I\'m " + this.name + "!");
    ``` 

    可以写成： 
    ```
    return (`Hello, I'm ${this.name}!`);
    ```

##### 2. 编程程序，完成下列需求：
- 创建一个空对象，变量名为 user；
- 添加一个 name 属性，并设置值为 John；
- 添加一个 surname 属性，并设置其值为 Mike；
- 将 name 属性的值改为 Peter;
- 删除 user 的 name 属性；

```
var user = {};
user.name = "John";
user.surname = "Mike";
user.name = "Peter";
delete user.name;
```

##### 3. 判断打印结果  
```
var a = {
   name: "xiaoming",
   age: 32  
};
var b = a;
b.age = 18;
console.log(a.age); // 打印出什么值？为什么？
```

结果是 **18**。  
因为 `var b = a` 只是将 a 的地址赋给了 b；  
所以它们指向同一块内存空间，即 `b.age === a.age`；  
所以改变 `b.age` 其实就是改变 `a.age`，所以是18.  

##### 4. 判断打印结果  
- 第一段代码：
  ```
  var name = 'window-Jack';
  var person = {
    name : 'person-Rose',
    greeting: function() {
      console.log('Hi! I\'m ' + this.name + '.');
    }
  }
  var greeting = person.greeting;
  greeting();
  ```
  打印结果：`Hi! I'm window-Jack.`  
  原因：greeting 只是继承了 person 这个对象中的 `greeting` 这个函数，它的 this 是指向 `window` 的，所以它的 `this.name === window.name === 'window-Jack'`。

- 第二段代码：
  ```
  var name = 'window-Jack';
  var person = {
    name : 'person-Rose',
    greeting: function() {
      console.log('Hi! I\'m ' + this.name + '.');
    }
  }
  var greeting = person.greeting.bind(person);
  greeting();
  ```
  打印结果：`Hi! I'm person-Rose.`  
  原因：这里利用了 `.bind()` 方法，将 `greeting` 这个变量的 this 指向改为了 `person` 对象，所以它的 `this.name === person.name === 'person-Rose'`。  
  注意：这里的 `.bind()` 方法与 `.call()/.apply()` 不同，它的执行是有延时的，也就是说，只有在调用了 `greeting()` （也就是最后一行代码）的时候，才会有打印结果，而另外两个可以立即执行。  

- 第三段代码：
  ```
  var name = 'window-Jack';
  var person = {
    name : 'person-Rose',
    greeting: function() {
      console.log('Hi! I\'m ' + this.name + '.');
    }
  }
  person.greeting.apply(this);
  ``` 
  打印结果：`Hi! I'm window-Jack.`  
  原因：这里的 this 在没有特别指定的情况下，是指向 `window` 的，如果括号里的 `this` 改为 `person` 那么输出就是 `Hi! I'm person-Rose.`了。  

- 第四段代码：
  ```
  var name = 'window-Jack';
  var person = {
    name : 'person-Rose',
    greeting: function() {
      console.log('Hi! I\'m ' + this.name + '.');
    }
  }
  person.greeting.call(this);
  ```
  打印结果：`Hi! I'm window-Jack.`  
  原因：与第三段一样。  

  `.call()` 与 `.apply()` 都是用另一个对象替换当前对象：
  ```
  // apply()方法
  function.apply(thisObj[, argArray])

  // call()方法
  function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
  ```
  所以它们的区别就是传递的参数，call 是直接传递参数，例如 `.call(null, 1, 2, 'a')`；而 apply 是将参数都放在一个数组对象里面进行传递的，例如 `.apply(null, [1, 2, 'a'])`。  

##### 5. 编写程序，实现下列需求：计算下面 fruit 对象共有多少个水果，应该输出 50。  
```
var fruit = {
   apple: 20,
   pear: 20,
   peach: 10
};

function countFruitSum() {
  var sum = 0;
  for(key in fruit) {
    sum += fruit[key];
  }
  console.log(sum);
}

countFruitSum();
```

##### 6. 什么是 JSON？JSON 和 JavaScript 的关系以及 JSON 的适用场景是什么？  
- 什么是 JSON ？  
JSON (**J**ava**S**cript **O**bject **N**otation)，是一种轻量级的数据交换格式，是一种独立的语言。本质是字符串。  
它的语法：
  - 数据为 键/值 对。
  - 数据由逗号分隔。
  - 大括号保存对象
  - 方括号保存数组

  例如：
  ```
  {
    "topic": "information",
    "person": [
      {"name": "Grace", "age": 18},
      {"name": "Huanhuan", "age": 20},
      {"name": "YY", "age": 22},
    ],
    "boolean": true
  }
  ```
  JSON 与 对象之间的转换可以用：`JSON.parse()` 和 `JSON.stringify()`。

- JSON 与 JavaScript 的关系  
JSON 是 JavaScript 的原生格式，这意味着在 JavaScript 中处理 JSON 数据不需要任何特殊的 API 或工具包。JSON 已经是 JavaScript标准的一部分。目前，主流的浏览器对 JSON 支持都非常完善。应用 JSON，我们可以从 XML 的解析中摆脱出来，对那些应用 Ajax 的网站来说，JSON 确实是目前最灵活的轻量级方案。  
JSON 可以将 JavaScript 对象中表示的一组数据转换为字符串，然后就可以在函数之间轻松地传递这个字符串，或者在异步应用程序中将字符串从 Web 客户端传递给服务器端程序。

- JSON 的适用场景  
  1. 前后端数据传输时会用到 json；
  2. 数据量不大时，很多 json 库都是一次性读取 json ，所以太大了就搞不定了；
  3. 减少网络负荷，比如在同样带宽下，json 会减少网络负荷；

##### 7. [简书链接](https://www.jianshu.com/p/8d96526fb3b5)
