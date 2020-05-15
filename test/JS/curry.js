var numbers= [1,2,3,4,5];
 var res = numbers.filter(function(item,index,array){
       return (item>2);
 })
 console.log(numbers);   
 console.log(res);                 

 function multiplicationCalculator(...num) {
  var multiplication = 1;
  for(var value of num) {
    multiplication *= value;
  }
  console.log(multiplication);
}
multiplicationCalculator(1, 2, 3, 4);

function add(former) {
  function continueAdd(latter) {
     return add(former + latter);
   }
  continueAdd.toString = function() {
      return former; 
  }
  return continueAdd;
}

var a = add(2)(3)(4);
console.log(a.toString());// 9

function add(a) { 
  var temp = function(b) {return add(a + b);} 
  temp.valueOf = temp.toString = function(){return a;}; 
  return temp;
} 
var ans = add(1)(2)(3); 
console.log(ans); // 6

function curry (fn, currArgs) {
  return function() {
      let args = [].slice.call(arguments);
      // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
      if (currArgs !== undefined) {
          args = args.concat(currArgs);
      }
      // 递归调用
      if (args.length < fn.length) {
          return curry(fn, args);
      }
      // 递归出口
      return fn.apply(null, args);
  }
}

function sum(a, b, c) {
  console.log(a + b + c);
}

const fn = curry(sum);
fn(1, 2, 3); // 6
fn(1, 2)(3); // 6
fn(1)(2, 3); // 6
fn(1)(2)(3); // 6 

var addSecond = function (second) {
  res += second;
  return res;
};

var addFirst = function (first) {
  res += first;
  return addSecond;
};

var add = function (firstNumber) {
  res += firstNumber;
  return addFirst;
}

var res = 0;
add(1)(2)(3);
console.log(res);
