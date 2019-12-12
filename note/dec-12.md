##### 1. 关于变量提升和内存之间

  ```
  var foo = 1;
  function foo() {}
  // 其实这个函数可以等价于：
  // var foo = function () {};
  ```
所以说它并不会重新申请一块空间，而是会忽略掉这个 foo 的新的一个初始化    
给 foo 赋不同的值而已。解析的时候是 undefined 和 匿名函数且后者优先  
后来是运行到 foo = 1，所以就直接把 foo 的内容给改了

Finally  附上一个关于 JS 堆栈队列的文章：[链接](https://juejin.im/post/5b1deac06fb9a01e643e2a95)

##### 2. 关于 BigInt()
```
var test = '101';

BigInt('0b' + test);
// 5n 二进制转十进制
BigInt('0x' + test);
// 257n 十六进制转十进制
BigInt('0o' + test);
// 65n 八进制转十进制
```

##### 3. 关于 `~~` 运算符