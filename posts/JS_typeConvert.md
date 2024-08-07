# 类型转换

在转换操作数的类型时，相等和不相等操作符遵循如下规则：

+ 如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false 转换为 0，true 转换为 1
+ 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等
+ 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法取得其原始值，再根据前面的规则进行比较
+ null 和 undefined 相等
+ null 和 undefined 不能转换为其他类型的值再进行比较。
+ 如果有任一操作数是 NaN，则相等操作符返回 false，不相等操作符返回 true， 注：`NaN != NaN`

[![41d604372c8c6adc5917444fb4e43cfb.png](https://s1.imagehub.cc/images/2024/07/23/41d604372c8c6adc5917444fb4e43cfb.png)](https://www.imagehub.cc/image/bsnmbz)

面试题：

```js
// ？ 位置应该怎么写，才能输出 true
const a = ?
console.log(a == 1 && a == 2 && a == 3)

答：
const a = {
    n: 1,
    valueOf() {
        return this.n++
    }
}
```

