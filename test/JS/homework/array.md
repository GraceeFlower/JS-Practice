##### 1. 定义数组的方法  
- 第一种办法就是利用 **Array** 构造函数：  
  ```
  var fruit = new Array();
  var fruit = new Array(4);//创建一个长度为4的数组
  var fruit = new Array("apple", "banana", "grape");
  ```

- 第二种就是数组字面量表示法：
（与上面的效果一样）
  ```
  var fruit = [];
  var fruit = [4];
  var fruit = ["apple", "banana", "grape"];
  ```

##### 2. 判断是否是数组  
- 首先第一个不是数组，是字符串，它是用引号包裹着的，并且用`typeof` 方法也可以判断出它的类型是 string  

- 第二个是数组，是用数组字面量表示法创建的，并且能够用`[1, 2, 3, 4] instanceof Array` 得出它是 Array 的一个实例。 

##### 3. 每项乘二  
```
var a = [1, 2, 3, 4];
function outputTwice(arr) {
  var twiceArr = arr.map((a) => {return a *= 2});
  console.log(twiceArr);
}

outputTwice(a); // [2, 4, 6, 8]
```

##### 4. 数组元素拼接
```
var colors = ["Red", "Green", "White", "Black"];
function connectColor(arr, connectOrder) {
  var connectedColor;
  switch(connectOrder) {
    case 1:
      connectedColor = arr.join(' ');
      break;

    case 2:
      connectedColor = arr.join('+');
      break;

    case 3:
      connectedColor = arr.join(',');
      break;

    default:
      break;
  }
  console.log(connectedColor);
}

connectColor(colors, 2);
// case 1 output: 'Red Green White Black'
// case 2 output: 'Red+Green+White+Black'
// case 3 output: 'Red,Green,White,Black'
```

##### 5. 排序  
```
var a = [5,1,8,10,4];
function sortNum(arr) {
  arr.sort((a, b) => {return b - a});
  console.log(arr);
}

sortNum(a); // [10,8,5,4,1]
```

##### 6. 找出频率最高
```
var a = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
function findOutHighestFrequency(arr) {
  var max = 0;
  var highest;
  var letter = {};
  for(var i = 0; i < arr.length; i++) {
    letter[arr[i]] ? letter[arr[i]]++ : letter[arr[i]] = 1;
    if(letter[arr[i]] > max) {
      max = letter[arr[i]];
      highest = arr[i];
    }
  }
  console.log(highest);
}

findOutHighestFrequency(a); // "a"
```

但是上面这种办法没办法选出多个相同频率的元素，改进如下(不过代码还是不够简洁)：  
```
function test(arr) {
  var max = 0;
  var maxItem;
  var highest = [];
  var obj = {};

  for(var i = 0; i < arr.length; i++) {
    obj[arr[i]] ? obj[arr[i]]++ : obj[arr[i]] = 1;
  }

  for(var key in obj) {
    if(obj[key] > max) {
      max = obj[key];
      maxItem = key;
      highest.length = 0;
    } else if(obj[key] == max) {
      highest.push(key);
    }
  }
  highest.push(maxItem);
  console.log(highest);
}

var a = [3， 3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
test(a); // ["a", "3"];
```
