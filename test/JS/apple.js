function countApple(fruit) {
  let arr = fruit.split("\n");
  let count = 0;
  arr.forEach(item => {
    if (item.match("apple")) {
      return count++;
    }
  });
  console.log(count);
}

var num = 4;
var fruit = "apple orange berry bayberry \n orange apple \n apricot banana \n avocado";
countApple(fruit);

function chooseWord(start, str) {
  let arr = str.split("\n");
  let count = 0;
  arr.forEach(item => {
    if (start === item.slice(0, start.length)) {
      return count++;
    }
  });
  console.log(count);
}

var start = "ox";
var str = "oxsas\nass\ndasda\nox\n";
chooseWord(start, str);
