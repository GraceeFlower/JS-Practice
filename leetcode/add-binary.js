/* Given two binary strings, return their sum (also a binary string).
The input strings are both non-empty and contains only characters 1 or 0. */

var a = "1010";
var b = "1011";

//简单粗暴的方法：
var addBinary = function(a, b) {
  var res = parseInt(a, 2) + parseInt(b, 2);
  console.log(res.toString(2));
};

addBinary(a, b);

// 执行结果：
// a = "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101"
// b = "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"
// output: "110111101100010011000101110110100000011101000101011000000000000000000000000000000000000000000000000"
// expected: "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000"

// 尝试：
// a = "110111101100010011000101110110100000011101000101011111" 54位
// b = "110111101100010011000101110110100000011101000101011"    51位
// output:   "111110101001110101011110100101010100100000101110001100" 从54位开始异常
// expected: "111110101001110101011110100101010100100000101110001010"
// 原因是 Number 类型只能安全地表示 -9007199254740991 (-(2^53-1)) 和 9007199254740991(2^53-1) 之间的整数

// 所以新的数据类型来咯～
var addBinary = function(a, b) {
  return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};


//接下来这个就是直接按位计算了啦～也没有什么特别的地方（运算符 ~~ 是将字符串转换成数字类型哦）
const addBinary = (a, b) => {
  let str = '';
  let i = a.length -1;
  let j = b.length -1;
  let dight = 0;
  let cary = 0;
  let sum = 0;
  while (i >= 0 || j >= 0) {
    sum = ~~a[i] + ~~b[j] + cary;
    dight = sum % 2;
    cary = (sum - dight) / 2;
    str = dight + str;
    i--;
    j--;
  }
  return cary ? cary + str : str;
}


//最后一个方法是直接用字符串去进行异或操作，不会转换成数字类型的
var addBinary = function(a, b) {
  let [lenA, lenB] = [a.length, b.length];
  let res = '';
  if (lenA > lenB) {
    return addBinary(b, a);
  }
  let diff = lenB - lenA;
  // 默认a是长度较小的字符串 将其补0
  while (diff > 0) {
    a = '0' + a;
    diff--;
  }
  let carry = 0;
  for (let i = lenB - 1; i >= 0; i--) {
    let xor = a[i] ^ b[i] ^ carry;
    res = xor.toString() + res;
    carry = (parseInt(a[i]) + parseInt(b[i]) + carry) >= 2 ? 1 : 0;
  }
  if (carry === 1) {
    res = '1' + res;
  }
  return res;
};
