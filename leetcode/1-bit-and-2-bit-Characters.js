/* We have two special characters.
The first character can be represented by one bit 0.
The second character can be represented by two bits (10 or 11). 

Now given a string represented by several bits.
Return whether the last character must be a one-bit character or not.
The given string will always end with a zero. */

var bits = [0, 1, 1, 0, 0];

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


var isOneBitCharacter = function(bits) {
  let numberOfOnes = 0;
  for(let i = bits.length - 2; i >= 0; i--){
      if(bits[i] === 1) numberOfOnes++;
      else break;
  }
   return numberOfOnes % 2 === 0; 
  };

  isOneBitCharacter(bits);
