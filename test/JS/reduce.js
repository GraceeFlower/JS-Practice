//select the highest frequency item
var frequency = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3, 3];

function findHighestFrequency(arr) {
  var max = 0;
  var highest;
  var letter = arr.reduce((pre, cur) => {
    (cur in pre) ? pre[cur]++ : pre[cur] = 1;
    return pre;
  },{});
  for(key in letter) {
    if(letter[key] > max) {
      max = letter[key];
      highest = key;
    }
  }
  console.log(highest);
}

findHighestFrequency(frequency);

//delete the repeat items
var repeat = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3, 3];

function deleteRepeat(arr) {
  var noRepeat = arr.reduce((pre, cur) => {
    if(pre.indexOf(cur) == -1) { //这块是可以用 include() 方法的
      return pre.concat(cur); //不能用 push，push 会返回进栈之后的数组长度！
    } else {
      return pre; 
      //如果这句不写的话，就没有返回值，pre 就会变成 undefined，if 语句将不能继续执行
    }
  }, []);
  console.log(noRepeat);
}

deleteRepeat(repeat);

//turn two-dimension array to one
var dimension = [[1, 2.2], [5, -7], [10, 0]];

function reduceDimension(arr) {
  var oneDimension = arr.reduce((pre, cur) => {
      return pre.concat(cur);
  }, []);
  console.log(oneDimension);
}

reduceDimension(dimension);

//turn multi-dimension array to one
var multi = [[1, 2], [3, 4], [[7, 8], 10]];

var reduceMultiDimension = function(arr) {
  return arr.reduce((pre, cur) => { 
    return pre.concat(Array.isArray(cur) ? reduceMultiDimension(cur) : cur)}, []);
}
// 花括号会被解释为一个代码块，所以注意以下几点：
// 要么就直接返回值不带大括号，arrow 函数会默认加上一个 return；
// 要么就加上 return，否则是没有返回值的，像这种还会返回调用的情况就会报错，一般的就会没有返回值；
// 如果是要返回一个对象例如 var sum = () => ({name: 'a'}) 就必须加一个括号在外面，否则也不会返回对象。

console.log(reduceMultiDimension(multi));

// 下面这个就是省略了花括号的写法
let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
const newArr = function(arr){
   return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}
console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]

// 对象中的数值求和
var result = [
  {
      subject: 'math',
      score: 10
  },
  {
      subject: 'chinese',
      score: 20
  },
  {
      subject: 'english',
      score: 30
  }
];

var sum = result.reduce((prev, cur) => (cur.score + prev), 0);
console.log(sum) //60
