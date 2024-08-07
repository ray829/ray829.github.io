# JS-String方法

## charAt()

charAt()方法返回给定索引位置的字符，由传给方法的整数参数指定。

```js
let str = 'hello world!';
let res = str.charAt(2);
console.log(res); // res => 'l'
```

## charCodeAt()

charCodeAt()方法查看指定码元(JavaScript 字符串由 16 位码元组成。对多数字符来说，每 16 位码元对应一个字符)的字符编码。

```js
let str = 'hello world!';
let res = str.charCodeAt(2);
console.log(res); // res => 108

let a = '8';
console.log(a.charCodeAt()); // => 56

console.log('c'.charCodeAt()); // => 99
```

## concat()

用于将一个或多个字符串拼接成一个新字符串。

concat()方法可以接收任意多个参数，因此可以一次性拼接多个字符串，但更常用的方式是使用加号操作符（+）。

```js
let stringValue = "hello ";
let result = stringValue.concat("world", "!");
console.log(result); // "hello world!" 
console.log(stringValue); // "hello"
```

## slice()、substr()和 substring()

`str.slice(start [, end])`

返回字符串从 `start` 到（但不包括）`end` 的部分。如果没有第二个参数，`slice` 会一直运行到字符串末尾。

```js
let str="stringify";
alert(str.slice(0,5));// 'strin'，从 0 到 5 的子字符串（不包括 5）
alert(str.slice(0,1));// 's'，从 0 到 1，但不包括 1，所以只有在 0 处的字符
```

`start/end` 也有可能是负值。它们的意思是起始位置从字符串结尾计算

```js
let str = "stringify";

// 从右边的第四个位置开始，在右边的第一个位置结束
alert(str.slice(-4, -1)); // 'gif'
```

`str.substring(start [, end])`

返回字符串从 `start` 到（但不包括）`end` 的部分。不支持负参数（不像 slice），它们被视为 `0`

这与 `slice` 几乎相同，但它允许 `start` 大于 `end`。

```js
let str = "stringify";

// 这些对于 substring 是相同的
alert(str.substring(2, 6)); // "ring"
alert(str.substring(6, 2)); // "ring"

// ……但对 slice 是不同的：
alert(str.slice(2, 6)); // "ring"（一样）
alert(str.slice(6, 2)); // ""（空字符串）
```

## indexOf()和 lastIndexOf()

这两个方法从字符串中搜索传入的字符串，并返回位置（如果没找到，则返回-1）。

两者的区别在于，indexOf()方法从字符串开头开始查找子字符串，而 lastIndexOf()方法从字符串末尾开始查找子字符串。

```js
let stringValue = "hello world"; 
console.log(stringValue.indexOf("o")); // 4 
console.log(stringValue.lastIndexOf("o")); // 7
```

## startsWith()、endsWith()和 includes()

**ECMAScript 6** 增加的 3 个用于判断字符串中是否包含另一个字符串的方法。

这些方法都会从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值。

它们的区别在于，startsWith()检查开始于索引 0 的匹配项，endsWith()检查开始于索引(string.length - substring.length)的匹配项，而 includes()检查整个字符串。

```js
let message = "foobarbaz"; 
console.log(message.startsWith("foo")); // true 
console.log(message.startsWith("bar")); // false 
console.log(message.endsWith("baz")); // true 
console.log(message.endsWith("bar")); // false 
console.log(message.includes("bar")); // true 
console.log(message.includes("qux")); // false
```

startsWith()和 includes()方法接收可选的第二个参数，表示开始搜索的位置。如果传入第二个参数，则意味着这两个方法会从指定位置向着字符串末尾搜索，忽略该位置之前的所有字符。

## trim()

这个方法会**创建字符串的一个副本**，删除前、后所有空格符，再返回结果。

