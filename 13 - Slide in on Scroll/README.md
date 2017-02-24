> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day12 - Key Sequence Detection

第十二天的目标是要完成按键按下的序列侦查，比如我们预设一个字符串“haha”，只要用户在浏览器中按顺序按下这四个字母，就可以触发所绑定的事件，这个功能也经常被公司在浏览器中为用户埋下小的把戏和惊喜。

[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/11%20-%20Custom%20Video%20Player/index.html)

## 实现思路

1. 首先为整个文档绑定`keyup`事件，监听用户的键盘操作，当用户按下键盘松开时，触发此事件，根据`e.key`可以获得这次按下的是什么按键。
2. 实现绑定的事件，将用户输入的字符序列存入数组中，并截取最后几个输入的和预设字符串相同长度的字符串，将两者进行比较，相同则触发trick。

## 整体代码
```Javascript
const candidateCode = [];
const secretCode = 'iamboss';
window.addEventListener('keyup', (e) => {
//document.addEventListener('keyup',(e) => {
candidateCode.push(e.key);
candidateCode.splice(-secretCode.length-1,candidateCode.length - secretCode.length);
// candidateCode.splice(0,candidateCode.length - secretCode.length);
if(candidateCode.join('').includes(secretCode)){
  alert('awesome！');
}
console.log(candidateCode);
});
```

### `window`/`document`
Window：是主Javascript的根对象，也是浏览器中的全局对象，也可以被视为文档对象模型的根。 在大多数浏览器中，我们可以直接通过`window`获取。
window.document：或者可以称为document，是可视化的文档对象模型（DOM）的主对象。

![windows/document](https://i.stack.imgur.com/hrvHr.jpg)

> The window object represents the current browsing context. It holds things like window.location, window.history, window.screen, window.status, or the window.document. Also, it has information about the framing setup (the frames, parent, top, self properties), and holds important interfaces such as applicationCache, XMLHttpRequest, setTimeout, escape, console or localStorage. Last but not least it acts as the global scope for JavaScript, i.e. all global variables are properties of it.
> In contrast, the (window.)document object represents the DOM that is currently loaded in the window - it's just a part of it. A document holds information like the documentElement (usually <html>), the forms collection, the cookie string, its location, or its readyState. It also implements a different interface (there might be multiple Documents, for example an XML document obtained via ajax), with methods like getElementById or addEventListener.
> 
> ——Answered By Bergi in [StackoverFlow](http://stackoverflow.com/questions/17227008/trying-to-understand-the-difference-between-window-and-document-objects-in-js) 

在这里我们通过为全局对象window绑定`keyup`事件，获取按下的每一个按键值。

### 截取字符串
在将用户按下的按键获取到后，存储到一个数组中，通过`candidateCode.splice()`截取字符串，需要删去前面的所有字符，只保留最后的几个字符，长度为`secretCode `字符串的长度，因此此时第一个参数可以设为`0`代表从第一个字符开始删除，也可以设置为`-secretCode.length-1`，第一个参数为负数，代表从后往前数，数到的位置作为删除的起始点，`-secretCode.length`的长度会数到第二个值，因为字符串数组的下标是从0开始索引的，所以要想从第1个开始删除，需要再-1。
第二个参数是欲删除字符的个数，因为我们要留下和`secretCode`长度相同的字符串，因为应该删除前面所有的字符，也就是输入字符串的长度-`secretCode`的长度，即`candidateCode.length - secretCode.length`。

### 判断是否相同
当截取了和`secretCode`相同长度的字符串后，就要判断两者是否相同，通过调用`String.prototype.includes()`方法，若一个字符串中包含另一个字符串，返回`true`，否则返回`false`。当返回`true`的时候触发trick。

还记得上一篇提到的使用&&运算符优化代码的方法么？
当&&的左边为true是才会继续执行&右边的表达式。
因此这一例也可以这样写：`candidateCode.join('').includes(secretCode) && alert('awesome！')`

到这里，键盘序列侦查的功能已经完成。👍