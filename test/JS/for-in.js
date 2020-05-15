function kv2List(source) {
  var list = [];

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      var item = {
        k: key,
        v: source[key]
      };
      list.push(item);
    }
  }
  console.log(list);
}

var source = {
  name: 'YY',
  age: 18,
  sex: 'male'
};
kv2List(source);

// 为什么不用 if (source[key]) ?
// 可以判断该对象是否有自身属性并且忽略它的继承属性
// 滤掉原型链上的属性
// 比如:
var arr=["item",2,"apple"];
console.log(arr.hasOwnProperty("toString")); // false
console.log(Object.prototype.hasOwnProperty("toString")); //true

let oArr = [{age: 1}, {age: 5}, {age: 100}, {age: 34}];
for (let key in oArr) {
  console.log(key, oArr[key]);
}

// 0 { age: 1 }...

// 不允许使用 for in 遍历数组；
// 数组对象可能存在数字以外的属性，这种情况下得不到正确的结果
// 比如上面的 key 值。 
// 1. 迭代顺序依赖于环境，不一定保证顺序；
// 2. 不仅会遍历当前对象，还包括原型链上的可枚举属性，所以可以用 hasOwnProperty 解决；
// 3. 没有 break 中断；
// 4. 不适合数组，主要是对象

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