function chooseMaxEven(arr) {
  var res = [];
  arr.map((item) => item % 2 ? '' : res.push(item));
  console.log(Math.max.apply(Math, res));
  console.log(Math.max(...res));
}

var arr = [2,4,6,5,7,9,11];
chooseMaxEven(arr);

let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }

  return result;
}

console.log(msg);