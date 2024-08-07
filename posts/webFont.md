# 前端字体优化

## 起因

网页中经常会用到一些特殊字体，而这些字体在用户的电脑上通常是不存在的。因此，需要通过css的`@font-face`定义，并从服务器中加载字体资源。然而，字体文件一般都是比较大的，甚至有时候一个字体比其他所有的资源（js、css、图片）加起来还要大，对网页的加载性能起到非常关键的影响，因此有必要对字体进行一些压缩。

## 转换字体格式

现在，各主流设备基本都支持 woff2 字体格式。一般地，建议只引入 woff2 就好了。

+ TIF  ==> woff2

  TTF 字体，是苹果和 windows 都支持的一种字体，推荐在线上进行字体转换：

  [CloudConvert](https://cloudconvert.com/)

  也可以用node库 `ttf2woff2`进行转换，使用方法：

  ```
  cat font.ttf | ttf2woff2 > font.woff2
  //由于使用了cat命令，如果是windows环境需要使用git bash或wsl来运行
  ```

+ OTF ==> woff2

  也可以在这个网站上进行转换：

  [CloudConvert](https://cloudconvert.com/)

## 压缩字体

一般的，尽管将字体转换成 woff2 格式，最小依然也有好几百 K ，而更多情况下会有 1-4M 左右。有时候，我们只有少数的文字需要用到特殊字体，比如说只有 `0-9` 这 10 个数字用到某种特殊字体，如果把整个字体文件引入就没有必要了。可以使用`font-spider`来提取需要的字体，从而减小字体体积。



首先全局安装`font-spider`

```css
npm i font-spider -g
```

然后新建一个`html`文件，里面用元素包裹所有你需要提取的文字

```html
<h1>
    为了一个未知的放弃已经得到的，是非常愚蠢的行为，永远会有更好的，但眼下的便是最好的。 ---《最大的麦穗》</h1>

<h3>
	人生若只如初见，何事秋风悲画扇。
</h3>

<style> 
    @font-face {
        font-family: "CKTKingKong";
        src: url("./assets/font/ChuangKeTieJinGangTi-2.otf");
        font-weight: normal;
        font-size: normal;
    }
    h1, h3 {
        font-family: "CKTKingKong";
    }
</style>
```

最好在这个`html`文件目录执行以下命令：

```css
font-spider <html-name>.html
```

**注意：**引用的字体文件（url资源路径）**不能为woff2格式**，否则会报以下错误：

```js
Error: "CKTKingKong" did not find truetype or opentype fonts
```

## 小结

关于字体体积压缩的技巧就讲到这里，如果有什么不对的欢迎留言交流。