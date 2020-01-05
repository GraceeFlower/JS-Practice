#### FE_44 GraceeJS
***
今天也是看阮一峰大大 es6 的一天呢！
##### 1. [字符串的拓展](http://es6.ruanyifeng.com/#docs/string)

- 字符的 Unicode 表示法
  ES6 之前：

    ```
    "\u0061"  // "a"
    "\u00617" // "a7"
    "\u{20BB7}" // " 7"
    "\uD842\uDFB7" // "𠮷"
    ```
    
  只能取 "\u0000" ~ "\uFFFF" 之间的字符，超出了就用双字节表示，例如最后一个汉字的例子。
  ES6：(只要将码点放入大括号，就能正确解读该字符)
  
    ```
    "\u{20BB7}" // "𠮷"
    "\u{41}\u{42}\u{43}" // "ABC"
  
    let hello = 123;
    hell\u{6F} // 123
  
    "\u{1F680}" === "\uD83D\uDE80" // true
  
    // 同一个字符的多种表示方法
    '\z' === 'z'  // true
    '\172' === 'z' // true
    '\x7A' === 'z' // true
    '\u007A' === 'z' // true
    '\u{7A}' === 'z' // true
    ```
 
- Iterator 接口 （字符串遍历器接口）
  可以使字符串被 `for...of` 循环遍历
    
    ```
    for (let codePoint of "Grace") {
      console.log(codePoint);
    }
    // "G" "r" "a" "c" "e"
    
    // 这种遍历器相比传统的 for 循环，能识别大于 0xFFFF 的码点
    let text = String.fromCodePoint(0x20BB7);

    for (let i = 0; i < text.length; i++) {
      console.log(text[i]);
    }
    // " "
    // " "

    for (let i of text) {
      console.log(i);
    }
    // "𠮷"
    ```

- 直接输入 U+2028 和 U+2029 （行分隔符和段分隔符）
  这个没什么特别的体会，以后用到了再看吧
  
- JSON.stringify() 的改造（返回超出 UTF-8 字符的转义字符串）
  比如：
  
    ```
    JSON.stringify('\u{D834}') 
    // ""\\uD834""
    JSON.stringify('\uDF06\uD834') 
    // ""\\udf06\\ud834""
    ```  
    
- 模板字符串
  `反引号 + ${params}` 我们都很熟悉了，几个注意事项：  
  1.在模板字符串中要用反引号，得用反斜杠转义；  
  2.模板字符串会保留空格和换行，可以在字符串之后用 trim 等方法去除；  
  3.大括号内可以用表达式进行计算，也可以调用函数：
    
    ```
    let x = 1;
    let y = 2;

    `${x} + ${y} = ${x + y}`
    // "1 + 2 = 3"

    `${x} + ${y * 2} = ${x + y * 2}`
    // "1 + 4 = 5"

    let obj = {x: 1, y: 2};
    `${obj.x + obj.y}`
    // "3"
    
    function fn() {
      return "Hello World";
    }

    `foo ${fn()} bar`
    // foo Hello World bar
    
    let func = (name) => `Hello ${name}!`;
    func('Jack') // "Hello Jack!"
    ```
  
  4.如果大括号中的不是字符串会按一般的规则转换成字符串；  
  5.可以嵌套模板字符串：
    
    ```
    const tmpl = addrs => `
      <table>
      ${addrs.map(addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
      `).join('')}
      </table>
    `;
    
    const data = [
      { first: '<Jane>', last: 'Bond' },
      { first: 'Lars', last: '<Croft>' },
    ];

    console.log(tmpl(data));
    // <table>
    //
    //   <tr><td><Jane></td></tr>
    //   <tr><td>Bond</td></tr>
    //
    //   <tr><td>Lars</td></tr>
    //   <tr><td><Croft></td></tr>
    //
    // </table>
    ```
  
- 实例：模板编译
  这个部分讲了一个 `<%...%>` 和 `<%=...%>` 输入 JS 代码和输出 JS 表达式的一个模板的封装以及应用，并没有看的很清楚...
 
- 标签模板（tagged template）：
  紧跟在函数名(“标签”)后面，模板字符串(“参数”)被调用处理。
    
    ```
    alert(123)
    // 等价于
    alert`123`
    ```
  看一个复杂点的例子：
  
    ```
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
    
    msg // "The total is 30 (31.5 with tax)" 
    ```
  
  这个例子说明，arguments 传进来的是所有参数，literals 传进来的是字符串数组，也就是说 `arguments` 等价于 `[Array(3), 30, 31.5]`，其中 `Array(3)` 就是 `literals` 的内容：`["The total is ", " (", " with the tax)"]`，所以说函数参数部分也可以用 rest 参数写法写成：`function passthru(literals, ...values)`。 
  
  “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容；还有一个就是用于多语言的转换；以及在 js 中运行别的语言都 ok。
  
- 模板字符串的限制
  不同语言对不同的字符串转义可能意义不同，慎用！
  
##### 2. [字符串的新增方法](http://es6.ruanyifeng.com/#docs/string-methods) 

- `String.fromCodePoint()`  
  功能和 `Sring.fromCharCode()` 一样，与 `codePointAt()` 和 `charCodeAt()` 相反 不同的地方在于，新方法可以转换编码大于 "0xFFFF" 的字符，例如：
  
    ```
    String.fromCharCode(0x20BB7)
    // "ஷ"
    String.fromCodePoint(0x20BB7)
    // "𠮷"
    String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
    // true
    ```
    
  因为 20BB7 大于 FFFF，所以会舍弃最高位，返回码点 U+0BB7，而新的方法就没有这个烦恼，另外，如果它有多个多个参数，会被返回成一个字符串返回，例如第三个例子。  
  注意，这个方法是定义在字符串上的，而 `codePointAt` 是定义在字符串的实例对象上的。
  
- `codeCharAt()`
  该方法是 `fromCodePoint()` 的相反方法：
    
    ```
    // ES6 之前：
    var s = "𠮷";

    s.length // 2
    s.charAt(0) // ''
    s.charAt(1) // ''
    s.charCodeAt(0) // 55362
    s.charCodeAt(1) // 57271
    
    // ES6：
    let s = '𠮷a';

    s.codePointAt(0) // 134071
    s.codePointAt(1) // 57271
    s.codePointAt(2) // 97
    
    let s = '𠮷a';

    s.codePointAt(0).toString(16) // "20bb7"
    s.codePointAt(2).toString(16) // "61"
    ```
    
  老办法会把超出部分看成两个字符，新办法才能够直接返回正确的码点～
  注意：codePointAt()方法的参数，是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt()方法传入 2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
    
    ```
    let s = '𠮷a';
    for (let ch of s) {
      console.log(ch.codePointAt(0).toString(16));
    }
    
    // or
    
    let arr = [...'𠮷a']; // arr.length 为 2
    arr.forEach(
      ch => console.log(ch.codePointAt(0).toString(16))
    );
    // 20bb7
    // 61
    ```
  
  这个办法也是**测试一个字符是两个字节还是四个字节**最简单的办法!
    
    ```
    function is32Bit(c) {
      return c.codePointAt(0) > 0xFFFF;
    }

    is32Bit("𠮷") // true
    is32Bit("a") // false
    ```
  
- `String.raw()`
  String.raw() 方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。个人感觉其内部原理和标签模板有点像。
    
    ``` 
    String.raw`Hi\n${2+3}!` // "Hi\n5!"
    String.raw`Hi\\n` === "Hi\\\\n" // true
    ```
    
- 实例方法 `normalize()`
  ES6 提供字符串实例的 normalize() 方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。它还有不同的参数：NFC、NFD、NFKC、NFKD。
    
    ```
    '\u01D1'==='\u004F\u030C' //false

    '\u01D1'.length // 1
    '\u004F\u030C'.length // 2
    
    '\u01D1'.normalize() === '\u004F\u030C'.normalize()
    // true
    ```
    
  不过，normalize 方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。
  
- 实例方法：`includes() | startsWith() | endsWith()`
  includes()：返回布尔值，表示是否找到了参数字符串。
  startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
  endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
  它们都有第二个参数 [interger]，表示从第几个字符开始检索，不过，endWith() 是从该下标往前检索，不支持负数，但是 includes 貌似可以默认转换成 0 ～
  
    ```
    let s = 'Hello world!';
    
    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false
    ```
    
- 实例方法：`repeat()`
  该方法返回一个新字符串，表示将原字符串重复 n 遍。  
  如果 n 是小数，会向下取整；如果 n 是负数或者 Infinity，会报错；如果是 0～-1 之间的小数，一律返回 ""，想想就明白了；如果是 NaN或者字符串等非数字，就会转换成数字 0。
  
- 实例方法：`padStart() | padEnd()`
  字符串补全长度的方法，分别是在头部和尾部补全，有两个参数：第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。  
  如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串；如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串；如果省略第二个参数，默认使用空格补全长度。
    
    ```
    'x'.padStart(5, 'ab') // 'ababx'
    'x'.padEnd(4, 'ab') // 'xaba'
    
    'xxx'.padStart(2, 'ab') // 'xxx'
    'xxx'.padEnd(2, 'ab') // 'xxx'
    
    'abc'.padStart(10, '0123456789')
    // '0123456abc'
    
    'x'.padStart(4) // '   x'
    'x'.padEnd(4) // 'x   '
    
    '123456'.padStart(10, '0') // "0000123456"
    '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
    ```
    
  主要用途是最后两个例子，一个是补全字符数字位数；一个是提示字符格式～
  
- 实例方法：`trimStart() | trimEnd()` (ES10 / ES2019)
  和 trim 差不多，就是去除头或尾部的空格，返回新的字符串，**不会改变原字符串**，对 tab 键、换行键以及一些不可以见的空白符号也有空。别名是 `trimLeft() | trimRight()` 
   
- 实例方法：`matchAll()`
  `matchAll()` 方法返回一个正则表达式在当前字符串的所有匹配，下面会详写！
  
##### 3. [正则的扩展](http://es6.ruanyifeng.com/#docs/regex)

- `RegExp` 构造函数
  修正了无法改变构造函数中第一个参数为正则表达式的 flags 的情况：
  
    ```
    // es6 之前不能这么写：
    var regex = new RegExp(/xyz/, 'i');
    regex // /xyz/i
    var regex = new RegExp(/abc/ig, 'i');
    regex // /abc/i
    
    new RegExp(/abc/ig, 'i').flags
    // "i"
    ```
    
- 字符串的正则方法：
  字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和 split()。
  现在它将这些方法都定义在 `RegExp` 对象上，字符串调用这些方法的时候，实际上是调用 RegExp 对象实例上的方法。
  
- `u` 修饰符
  用来识别超过 0xFFFF 的码点。
  1.（.）点字符  
  在正则表达式中，点字符是代表除了换行符以外任意的单个字符，然而对于码点大于 0xFFFF 的 Unicode 字符是没有办法识别的，所以说，要加上一个 u 修饰符：
    
    ```
    var s = '𠮷';

    /^.$/.test(s) // false
    /^.$/u.test(s) // true
    ```
    
  2.Unicode 字符表示法  
  上面有提到过，ES6 中新添了大括号来表示 Unicode 字符，这种时候，就得搭配上 u 修饰符，不然的话会被误解成字符的连续个数，而不是 Unicode 码：
    
    ```
    /\u{61}/.test('a') // false
    /\u{61}/u.test('a') // true
    /\u{20BB7}/u.test('𠮷') // true
    ```
  
  3.量词  
  正确识别码点大于 0xFFFF 的 Unicode 字符
    
    ```
    /a{2}/.test('aa') // true
    /a{2}/u.test('aa') // true
    /𠮷{2}/.test('𠮷𠮷') // false
    /𠮷{2}/u.test('𠮷𠮷') // true
    ```
  
  4.预定义模式  
  以前都不知道 `\S` 叫预定义模式，匹配所有非空字符串，同理，可以匹配大于...的字符。例如：
  
    ```
    function codePointLength(text) {
      var result = text.match(/[\s\S]/gu);
      return result ? result.length : 0;
    }

    var s = '𠮷𠮷';

    s.length // 4
    codePointLength(s) // 2
    // 如果不加 u 修饰符的话，这个地方就是 4
    ```
    
  5.i 修饰符  
  有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B 与 \u212A 都是大写的 K。

    ```
    /[a-z]/i.test('\u212A') // false
    /[a-z]/iu.test('\u212A') // true
    ```
   
  上面代码中，不加u修饰符，就无法识别非规范的K字符。
  
  6.转义  
  没有 u 修饰符的情况下，正则中**没有定义的转义**（如逗号的转义 \,）无效，而在 u 模式会报错。

    ```
    /\,/ // /\,/
    /\,/u // 报错
    ```
    
- `RegExp.prototype.unicode` 属性  
  判断一个正则实例对象有没有设置 u 修饰符。
  
- `y` 修饰符（sticky）  
  类似于 g 全局修饰符，但是它是 sticky 的，它会紧跟着上一次匹配剩余的字符串的头部开始匹配。
    
    ```
    var s = 'aaa_aa_a';
    var r = /a+_/y;

    r.exec(s) // ["aaa_"]
    r.exec(s) // ["aa_"]
    r.exec(s) // null
    
    const REGEX = /a/gy;
    'aaxa'.replace(REGEX, '-') // '--xa'
    ```
    
  `y` 修饰符的设计本意，就是让**头部匹配**的标志 `^` 在**全局**匹配中都有效。  
  和 `match` 方法搭配的时候，y 修饰符没办法把所有符合的匹配出来，就算想 `exec` 一样一遍一遍匹配也是不行的，所以要配合 `g` 修饰符：
    
    ```
    'a1a2a3'.match(/a\d/y) // ["a1"]
    'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
    'a1a2_a3'.match(/a\d/gy) // ["a1", "a2"]
    ```
  
  一个经典应用就是，可以在遇到非法字符时停止匹配，而 g 不行：
  
    ```
    const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
    const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

    function tokenize(TOKEN_REGEX, str) {
      let result = [];
      let match;
      while (match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
      }
      return result;
    }
    
    tokenize(TOKEN_Y, '3x + 4')
    // [ '3' ]
    tokenize(TOKEN_G, '3x + 4')
    // [ '3', '+', '4' ]
    ```
  
- `RegExp.prototype.sticky` 属性  
  同理 就有这么一个属性咯～看看这个正则实例对象有没有 y 修饰符啦～
  
- `RegExp.prototype.flags` 属性
  返回正则表达式的修饰符
  
    ```
    // ES5 的 source 属性
    // 返回正则表达式的正文
    /abc/ig.source
    // "abc"

    // ES6 的 flags 属性
    // 返回正则表达式的修饰符
    /abc/ig.flags
    // 'gi'
    ```
 
 - `s` 修饰符：`dotAll` 模式
  `dotAll` 模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个 `dotAll` 属性，返回一个布尔值，表示该正则表达式是否处在 `dotAll` 模式。
  
    ```
    const re = /foo.bar/s;
    // 另一种写法
    // const re = new RegExp('foo.bar', 's');

    re.test('foo\nbar') // true
    re.dotAll // true
    re.flags // 's'
    ```
    
  这个与多行修饰符 `m` 不冲突，关于 m 修饰符：
  
    ```
    var str="This is an\n antzone good"; 
    var reg=/an$/;
    str.match(reg) // null

    var str="This is an\n antzone good"; 
    var reg=/an$/m;
    str.match(reg) // 匹配成功 index: 8
    
    var reg = /foo.$/sm
    var str = "bazfoo1\nhappy"
    str.match(reg)
    // ["foo1", index: 3, ...]
    ```
    
- 后行断言  
  先说说 **先行断言和先行否定断言**：
  `先行断言`：x 只有在 y 前面才匹配，必须写成 `/x(?=y)/`。比如，只匹配百分号之前的数字，要写成 `/\d+(?=%)/`。  
  `先行否定断言`：x 只有不在 y 前面才匹配(只要不在 y 前面的就能匹配上)，必须写成 `/x(?!y)/`。比如，只匹配不在百分号之前的数字，要写成 `/\d+(?!%)/`。
  
    ```
    /\d+(?=%)/.exec('100% of US presidents have been male')
    // ["100"]
    /\d+(?!%)/.exec('that’s all 44 of them')   
    // ["44"]
    /\d+(?!%)/.exec('that’s 100% all 44 of them')   
    // ["10"]
    ```
    
  “后行断言”正好与“先行断言”相反，x 只有在 y 后面才匹配，必须写成 `/(?<=y)x/`。比如，只匹配美元符号之后的数字，要写成 `/(?<=\$)\d+/`。“后行否定断言”则与“先行否定断言”相反，x 只有不在 y 后面才匹配，必须写成 `/(?<!y)x/`。比如，只匹配不在美元符号后面的数字，要写成 `/(?<!\$)\d+/`。（从右往左匹配）
  
    ```
    /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')
    // ["100"]
    /(?<!\$)\d+/.exec('it’s is worth about €90')         // ["90"]
    
    const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
    '$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
    // '$bar %foo foo'
    ```
    
- Unicode 属性类  
  ES2018（ES9）引入了一种新的类的写法 `\p{...}` 和 `\P{...}`，允许正则表达式匹配符合 Unicode 某种属性的所有字符。
    
    ```
    // 匹配所有数字
    const regex = /^\p{Number}+$/u;
    regex.test('²³¹¼½¾') // true
    regex.test('㉛㉜㉝') // true
    regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true
    
    // 匹配 Emoji
    /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

    // 匹配所有的箭头字符
    const regexArrows = /^\p{Block=Arrows}+$/u;
    regexArrows.test('←→↔↖⇏⇐⇑⇔⇕⇘⇩')
    // true
    ```
    
- 具名组匹配(ES2018)
  1.简介
  正则表达式利用圆括号进行组匹配。
    
    ```
    const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
  
    const matchObj = RE_DATE.exec('1999-12-31');
    const year = matchObj[1]; // 1999
    const month = matchObj[2]; // 12
    const day = matchObj[3]; // 31
    ```
    
  组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如 matchObj[1] ）引用，要是组的顺序变了，引用的时候就必须修改序号，所以就出现了`具名组匹配`这个东西。
  
    ```
    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

    const matchObj = RE_DATE.exec('1999-12-31');
    const year = matchObj.groups.year; // 1999
    const month = matchObj.groups.month; // 12
    const day = matchObj.groups.day; // 31
    matchObj[0] // 1999-12-31
    matchObj[1] // 1999
    matchObj[4] // undefined
    ```
  
  “具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名” `(?<year>)`，然后就可以在 exec 方法返回结果的 groups 属性上引用该组名。同时，数字序号（matchObj[1]）依然有效。如果匹配不到就是 undefined，但是组名（year之类的）会一直存在。
  
  2.解析赋值和替换
  replace 第二个参数可以是字符串也可以是函数。
    
    ```
    // 赋值
    let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
    one  // foo
    two  // bar
    
    // 替换
    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

    '2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
    // '02/01/2015'
    ```
  
  3.引用
  如果要在正则表达式内部引用某个“具名组匹配”，可以使用 `\k<组名>` 的写法。
  
    ```
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
    // 引用的必须和之前匹配的相同
    
    // 数字引用（\1）依然有效
    // \1 就是第一个括号匹配到的内容！
    const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
    
    // 两者还可以混着用
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
    RE_TWICE.test('abc!abc!abc') // true
    RE_TWICE.test('abc!abc!ab') // false
    ```
    
- `String.prototype.matchAll()` (ES2020)
  如果一个正则表达式在字符串里面有多个匹配，现在一般使用 g 修饰符或 y 修饰符，在循环里面逐一取出。
  ES2020 增加了 String.prototype.matchAll() 方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。要用 for...of 循环取出，相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源，转数组很容易：
    
    ```
    const string = 'test1test2test3';

    // g 修饰符加不加都可以
    const regex = /t(e)(st(\d?))/g;

    for (const match of string.matchAll(regex)) {
      console.log(match);
    }
    // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
    // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
    // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
    
    // 转为数组方法一
    [...string.matchAll(regex)]

    // 转为数组方法二
    Array.from(string.matchAll(regex))
    ```
  （记得查阅 `exec` 的贪婪匹配原则～）
  
***
Replenished on Jan.5th 2020
#### 正则表达式中的贪婪和懒惰模式
这个是我上次遗留的问题，所以在这还是补充一下。  
这两个模式是什么意思呢？先看一个例子吧～

  ```
  var str = "<h3>abc</h3><h3>def</h3>";
  var reg = /<h3>.*<\/h3>/;

  str.match(reg);
  //["<h3>abc</h3><h3>def</h3>", ...]
  ```

这个例子就是想要匹配两个 `h3` 标签，以及它里面的内容，结果却不尽人意，它把整个都匹配上了，我们想要的效果应该是 `["<h3>abc</h3>", "<h3>def</h3>", ...]` 这个样子的，这就叫做贪婪模式。

- 一般情况的贪婪模式和懒惰模式   
像 `? + * {m, n}...` 这些默认都是贪婪的，它们会匹配尽可能多的字符，比如上面的例子，`reg = /<h3>.{0,}<\/h3>/` 的匹配结果是一样的，先看一下解决办法吧～

  ```
  var str = "<h3>abc</h3><h3>def</h3>";
  var reg1 = /<h3>.*?<\/h3>/;
  var reg2 = /<h3>.{0,}?<\/h3>/g;

  str.match(reg1);
  // ["<h3>abc</h3>"]
  str.match(reg2);
  // ["<h3>abc</h3>", "<h3>def</h3>"]
  ```

  这就将贪婪模式改成了懒惰模式，在表示重复元素的字符后面加上 `?` 即可。  
  正则表达式还有另一条规则，比懒惰／贪婪规则的优先级更高：最先开始的匹配拥有最高的优先权——The match that begins earliest wins。例如：
  
    ```
    var str = "aabab";
    var reg = /a.*b/g;
    
    str.match(reg);
    // ["aabab"]

    var reg1 = /a.*?b/g;
    
    str.match(reg1);
    // ["aab", "ab"]
    ```
  
  它并没有匹配完了 `ab` 再去匹配 `aab`。  
  下面是几种常见的将贪婪改成懒惰模式的说明：
  
    |代码语法|说明|
    |:--|:--|
    |*?|重复任意次，但尽可能少重复|
    |+?|重复1次或更多次，但尽可能少重复|
    |??|重复0次或1次，但尽可能少重复|
    |{n,m}?|重复n到m次，但尽可能少重复|
    |{n,}?|重复n次以上，但尽可能少重复|

- 后行断言中的匹配模式
  举个例子：
    
    ```
    /(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
    /^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]

    /(?<=(\d+)(\d+?))$/.exec('1053') // ["", "105", "3]
    ```
  
  后行断言会先匹配 `/(?<=y)x/` 中的 x，再匹配 y，从右往左，所以贪婪模式和懒惰模式正好也是相反啦～
  