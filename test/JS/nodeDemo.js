'use strict'
console.log("my first node!");
var s = 'Hello';
function sayHello(name) {
  console.log(s + ', ' + name);
}

module.exports = sayHello;

const crypto = require('crypto');
const hash = crypto.createHash('md5');// 'sha1' 'sha256' 'sha512' more security

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...