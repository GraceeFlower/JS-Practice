function scoreTesting(score) {
  var scoreClass;
  if(score <= 100 && score >= 0) {
    if(score >= 95) {
      scoreClass = '卓越';
    } else if(score >= 85) {
      scoreClass = '优秀';
    } else if(score >= 75) {
      scoreClass = '一般';
    } else if(score >= 60) {
      scoreClass = '及格';
    } else {
      scoreClass = '不合格';
    }
  } else {
    scoreClass = '分数错误';
  }
  console.log(scoreClass);
}
// scoreTesting(100);

function scoreTesting(score) {
  var scoreClass;
  if(score > 100 || score < 0) {
    console.log('分数错误');
    return '';
  }
  switch(Math.round(score/10)) {
    case 10:
      scoreClass = '卓越';
      break;
    case 9:
      scoreClass = '优秀';
      break;
    case 8:
      scoreClass = '一般';
      break;
    case 7:
      scoreClass = '及格';
      break;
    default:
      switch(Math.floor(score/10)) {
        case 6:
          scoreClass = '及格';
          break;
        default: 
          scoreClass = '不合格';
          break;
      }
  }
  console.log(scoreClass);
}
scoreTesting(90);

function calculator(operator) {
  var x = 10, y = 8;
  var res = 0;
  switch(operator) {
    case '+':
      res = x + y;
      break;
    case '-':
      res = x - y;
      break;
    case '*':
      res = x * y;
      break;
    case '/':
      res = x / y;
      break;
    case '%':
      res = x % y;
      break;
    default:
      res = 'Wrong operator!';
      break;
  }
  console.log(res);
}
calculator('*');


function adder() {
  // var reg = /3$/;
  var res = 0;
  for(var i = 1; i <= 100; i++) {
    // if(!i.toString().match(reg)) {
    //   res += i;
    // }
    if((i-3)%10) {
      res += i;
    }
  }
  console.log(res);
}
adder();

function printAsterisk(n) {
  var str = '';
  for(var i = n; i > 0; i--) {
    for(var j = 1; j <= i; j++) {
      if(j == i) {
        str += '*';
      } else {
        str += '*' + ' ';
      }
    }
    console.log(str);
    str = '';
  }
}
printAsterisk(6);

function multiplicationTable() {
  var product = 0;
  var str = '';
  for(var i = 1; i <= 9; i++) {
    for(var j = 1; j <= i; j++) {
      product = i * j;
      str +=  i + '*' + j + '=' + product + ' ';
    }
    console.log(str);
    str = '';
  }
}
multiplicationTable();
