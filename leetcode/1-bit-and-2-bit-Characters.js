/* We have two special characters.
The first character can be represented by one bit 0.
The second character can be represented by two bits (10 or 11). 

Now given a string represented by several bits.
Return whether the last character must be a one-bit character or not.
The given string will always end with a zero. */

var bits = [1, 1, 0];

var isOneBitCharacter = function (bits) {
  
};

var foo = 1;
function foo() {}
// 其实这个函数可以等价于：
// var foo = function () {};
// 所以说它并不会重新申请一块空间，而是会忽略掉这个 foo 的新的一个初始化  
// 给 foo 赋不同的值而已。解析的时候是 undefined 和 匿名函数且后者优先
// 后来是运行到 foo = 1，所以就直接把 foo 的内容给改了
