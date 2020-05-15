function add(former) {
  function continueAdd(latter) {
     return add(former + latter);
   }
  continueAdd.toString = function() {
      return former; 
  }
  return continueAdd;
}

var a = add(1)(2)(3)(4);
console.log(a.toString());


function repeatStr(str, n) {
  var finalStr = '';
  if(n <= 0) {
    console.log(str);
    return str;
  }
  for(var i = 0; i < n; i++) {
    finalStr += str;
  }
  console.log(finalStr);
}
repeatStr('hello', 0);


function multiplicationCalculator() {
  var multiplication = 1;
  for(var i = 0; i < arguments.length; i++) {
    multiplication *= arguments[i];
  }
  console.log(multiplication);
}

multiplicationCalculator(23,2);


function test(...num) {
  var res = 1;
  for(var i = 0; i < num.length; i++) {
    res *= num[i];
  }
  console.log(res);
}

test(1,2,3,4);


function convertToUpper(name) {
  var upper = name.toUpperCase();
  console.log(upper);
}
var name = 'hello';
convertToUpper(name);


var sentence = 'good afternoon, mr mike.';
function convertFirstLetterToUpper(sentence) {
  var upperSentence;
  var arr = sentence.split(' ');
  for(var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  upperSentence = arr.join(' ');
  console.log(upperSentence);
}
// convertFirstLetterToUpper(sentence);

// 这道题木木韬的解法！绝妙  
function firstUpperCase(sentence) {
  var reg = /(^| )[a-z]/g;
  return sentence.toLowerCase().replace(reg, (l) => l.toUpperCase());
}

firstUpperCase(sentence); // console的值是对的！
console.log(sentence); // 会是原来的字符串 因为本身字符串的值就是不会变的基本数据类型


var money = '￥20';
function extractValue(money) {
  var value = money.slice(1);
  console.log(value);
}
function extractNum(money) {
  var reg = /\d+/;
  var num = money.match(reg);
  console.log(num);
}
extractNum(money);
extractValue(money);

function toCamelStyle(str) {
  var arr;
  var camelStr = '';
  if(str[0] === '_') {
    camelStr = '_';
    str = str.slice(1);
  }
  arr = str.split('_');
  for(var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].charAt('0').toUpperCase() + arr[i].slice(1);
  }
  camelStr += arr.join('');
  console.log(camelStr);
}
  
toCamelStyle('abc_bcd');  // 输出 'abcBcd'
toCamelStyle('a_3_c_d_ef');  // 输出 'a3CDEf'
toCamelStyle('_a_b_c_d_ef');  // 输出 '_aBCDEf'

function outputTwice(arr) {
  var res = arr.map((a) => {return a *= 2});
  console.log(res);
}

var a = [1, 2, 3, 4];
outputTwice(a);

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

var colors = ["Red", "Green", "White", "Black"];
connectColor(colors, 2);

function sortNum(arr) {
  arr.sort((a, b) => {return b - a});
  console.log(arr);
}
var a = [5,1,8,10,4];
sortNum(a);
// should output: [10,8,5,4,1]

var a = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3, 3];
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
findOutHighestFrequency(a);
// should output: 'a'

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
var a = [3, 'a', 'a', 'a', 2,2,2,2,2, 3, 'a', 3, 'a', 2, 4, 9, 3, 3];
test(a);


var a = [3, "a", "a", "a", 2, 3, 3, "a", 3, "a", 2, 4, 9, 3];
// should output: 'a'

function findMaxFreqEle(arr) {
  var maxEle = null;
  var maxNum = 0;
  var countDic = {};

  for (ele of arr) {
    countDic[ele] ? countDic[ele]++ : (countDic[ele] = 1);
    if (countDic[ele] > maxNum) {
      maxEle = ele;
      maxNum = countDic[ele];
    }
  }
  return maxEle;
}

console.log(findMaxFreqEle(a));