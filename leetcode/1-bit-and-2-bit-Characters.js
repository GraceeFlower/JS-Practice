/* We have two special characters.
The first character can be represented by one bit 0.
The second character can be represented by two bits (10 or 11). 

Now given a string represented by several bits.
Return whether the last character must be a one-bit character or not.
The given string will always end with a zero. */

var bits = [1, 1, 0, 1, 0];

var isOneBitCharacter = function (bits) {
  var len = bits.length;
  var last;
  for(var i = 0; i < len;) {
    if (bits[i] === 0) {
      last = i;
      i++;
    } else {
      i += 2;
    }
  }
  return last === len - 1;
};

/* 第一种方法是用标记法：
   碰见 1 的时候就跳过下一个元素，因为一定会构成 2-bit
   其次就是遇见 0 记录下来它的位置，不停地更新最后一个 0 的位置即可，最后与数组长度比较 */


var isOneBitCharacter = function (bits) {
  var reg = /^(10|11|0)*0$/;
  console.log(reg.test(bits.join("")));
}

/* 第二种方法是正则表达式 匹配零个或多个 2-bit|1-bit 并以 0 结尾 */

var isOneBitCharacter = function(bits) {
  let numberOfOnes = 0;
  for(let i = bits.length - 2; i >= 0; i--){
      if(bits[i] === 1) numberOfOnes++;
      else break;
  }
   return numberOfOnes % 2 === 0; 
  };

  isOneBitCharacter(bits);

/* 第三种方法其实是比较有效率的方法：
   因为最后一位肯定是零，只要保证最后一个零不会与它前一位的 1 组成 2-bit 即可
   所以说只要判断最后一位前面的连续 1 的个数是不是偶数即可 并也许能提前跳出循环节省内存 */

/* 最开始我想的是从最后开始判断，以为只要判断前面的位数是奇是偶就好了，后来发现也有特殊情况：
   比如全是零或者穿插连续的零这样子，所以说还是要从 1 的奇偶下手。
   在此整理三种方法与大家共勉～ */