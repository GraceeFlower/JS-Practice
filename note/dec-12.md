#### 1. 关于变量提升和内存之间

  ```
  var foo = 1;
  function foo() {}
  // 其实这个函数可以等价于：
  // var foo = function () {};
  ```
所以说它并不会重新申请一块空间，而是会忽略掉这个 foo 的新的一个初始化，给 foo 赋不同的值而已。解析的时候是 undefined 和 匿名函数且后者优先，后来是运行到 foo = 1，所以就直接把 foo 的内容给改了。

Finally  附上一个关于 JS 堆栈队列的文章：[链接](https://juejin.im/post/5b1deac06fb9a01e643e2a95)

#### 2. 关于 BigInt
- 首先，`BigInt` 是 JS 中新添的一种基本数据类型(目前共八种)。  

  它是一种比 `Number` 数据类型支持的范围更大的整数值。在对大整数执行数学运算时，以任意精度表示整数的能力尤为重要。使用BigInt，整数溢出将不再是问题，就比如 `add-binary` 那道题中，如果直接用 Number 的 parseInt 方法转换整个数的进制，遇到 53 位以上的就会出现溢出现象。  

  在原来的标准下，无法精确表示的非常大的整数将自动四舍五入。确切地说，JS 中的Number类型只能安全地表示 -9007199254740991 (-(2^53-1)) 和 9007199254740991(2^53-1) 之间的整数(当然 JS 提供了 `Number.MAX_SAFE_INTEGER` 常量来表示`最大安全整数`，`Number.MIN_SAFE_INTEGER` 常量表示`最小安全整数`)，任何超出此范围的整数值都可能失去精度，例如：
  ```
  console.log(9999999999999999); // 10000000000000000`

  9007199254740992 === 9007199254740993; // true
  ```

- 要创建 `BigInt`，就只要在整数末尾加上 **n** 即可，例如：
  ```
  console.log(9007199254740995n); // 9007199254740995n
  console.log(9007199254740995); // 9007199254740996
  ```
  或者是借助 `BigInt()` 这个构造函数：  
  ```
  BigInt("9007199254740995"); // 9007199254740995n
  ```
  它也支持二/八/十六进制，但是不支持旧的八进制语法哦～
  ```
  console.log(0400000000000000003n);
  // SyntaxError
  ```
  下面是我简单写的几个进制转换的 🌰：
  ```
  var test = '101';

  BigInt('0b' + test);
  // 5n 二进制转十进制
  BigInt('0x' + test);
  // 257n 十六进制转十进制
  BigInt('0o' + test);
  // 65n 八进制转十进制
  ```

- 注意事项来咯！  
  - **首先**，既然它是一个新的基本数据类型，那它和 `Number` 当然是不能严格相等的啦～
    ```
    typeof 5n // "bigint"
    typeof 5  // "number"
    5n == 5   // true
    5n === 5  // false 
    ```
    并且也咩有办法和 `Number` 类型混着用，也不能使用 Web api 和内置的 JS 函数：
    ```
    (9007199254740992n + 1n) + 0.5
    10 + 10n;
    Math.max(2n, 4n, 6n);  

    // Uncaught TypeError: Cannot mix BigInt and other types
    ```
    但是关系运算符是可以使用的（大于小于等于...）：
    ```
    10n > 5; //true
    4n <= 10; //true
    10n === 10; //false
    ```

  - **在运算符方面**，似乎除了(+)没有办法用于 `BigInt` (不支持一元加号（+）运算符的原因是某些程序可能依赖于 '+' 始终生成Number的不变量，或者抛出异常)，别的都ok：
    ```
    10n + 20n;    // 30n
    10n - 20n;    // -10n
    +10n;         // TypeError: Cannot convert a BigInt value to a number
    -10n;         // -10n
    10n * 20n;    // 200n
    20n / 10n;    // 2n
    23n % 10n;    // 3n
    10n ** 3n;    // 1000n

    var x = 10n;
    ++x;          // 11n
    --x;          // 10n
    ```

    当然，与BigInt操作数一起使用时，算术运算符应该返回BigInt值。因此，除法 (/) 运算符的结果会自动向下舍入到最接近的整数。例如：
    ```
    25 / 10;   // 2.5
    25n / 10n; // 2n
    ```

  - 如果你实在想要使用BigInt和Number执行**算术计算**，首先需要确定在哪个类型中执行该操作。然后再通过调用 `Number()`或 `BigInt()` 来转换操作数即可：
    ```
    BigInt(10) + 10n; // 20n
    // or
    10 + Number(10n); // 20

    Number(10n) * 10; // 100
    ```
    当 Boolean 类型与 BigInt 类型相遇时，BigInt 的处理方式与 Number 类似，只要不是0n，BigInt就被视为true：
    ```
    if (0n) {
      console.log(1);
    }

    if (5n) {
      console.log(2);
    }
    // 2
    ```
  - `BigInt` 构造函数  
  一般是可以将传参自动转换成 BigInt 类型，无法转换的会报错：
    ```
    BigInt("10");  // 10n
    BigInt(10);    // 10n
    BigInt(true);  // 1n

    BigInt(10.2);  // RangeError(因为不是整数)
    BigInt(null);  // TypeError
    BigInt("abc"); // SyntaxError
    Number(10.2n); // SyntaxError
    Number(null);  // 0
    Number("abc"); // NaN 
    ```

(例子部分取自：[JS最新基本数据类型:BigInt](https://segmentfault.com/a/1190000019912017?utm_source=tag-newest)）  
    有些作者不合理的例子已经修正～


#### 3. 关于 `~~` 运算符
这个运算符就是将变量转换成 Number 类型：

- 数字类型字符串转化成纯数字： 
  ```
  var a = "123";
  ~~a; // 123
  ```
- 非数字类型字符串转化成0：
  ```
  var a = "123asd!";
  ~~a; // 0
  ```
- boolean类型转化成 1/0：
  ```
  ~~(1 > 2);    // 0
  ~~(10 == 10); // 1
  ```
- 特殊数据类型转换：
  ```
  ~~(undefined); // 0
  ~~(null);      // 0
  ```
