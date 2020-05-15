/* 3. Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Example:

Input: 38
Output: 2 
Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
             Since 2 has only one digit, return it.
*/

/**
 * @param {number} num
 * @return {number}
 */

var addDigits = function(num) {
  let total = num + "";
  let numArr = total.split("");
  while (numArr.length  > 1) {
      total = numArr.reduce((pre, cur) => pre += parseInt(cur),0);
      numArr = (total + "").split("");
  }
  return total;
};

// 也可以用 Number.toString() 来将数字转为字符串，但是如果要直接用数字的话记得做区分处理哦～
// 例如：1..toString() / 1. toString() / (1).toString()

// 直接O(1)解决！前面的条件判断是为了防止 0 的错选 
// return num <= 9 ? num : (num % 9 || 9);
addDigits(38);   


