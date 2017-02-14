> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day09 - Dev Tools Domination

第九天的练习是主要是为了熟悉和掌握常见的非常有用的Console调试小技巧。

[效果如下（请在Console面板中查看）](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/09%20-%20Dev%20Tools%20Domination/index.html)

## 给页面节点添加断点
在按 F12 出现的 Chrome 开发工具中，在 Elements 选项卡之中，选择页面的某个标签（以 <p>为例），右键 → Break on → Attributes modifications。即可为该元素添加断点，当它的属性发生改变时，会自动定位到页面代码中的对应行。

此时点击页面上的`p`元素就可以看到效果。

通过定位到代码中相应的行就可以很方便的对页面进行调试。

## Consol的更多用法

* `console.log(String)`
直接将带输出的字符串传给`.log()`方法，就可以直接输出，这是目前最常用的调试方法，但是除了这个还有其他的方法，可以像C语言这样使用字符串的替换，如下：
  * %s： 字符串
  * %f： 浮点数
  * %o： 对象Object
  * %d： 整数
  * %c： 设定输出的样式，在之后的文字将按照第二个参数里的设置进行显示

例子如下：
```Javascript
console.log("I am a String: %s ", "log"); //log
console.log("I am a int number: %d ", 1); //1
console.log("I am a float number: %d ", 1.23); //1.23
console.log("%c different style", "color: #00fdff; font-size: 2em;");
```
* `console.warn(String)`
输出警告信息，Console面板上面在文字前面显示黄色警告图标：⚠️，点击该警告消息会出现当前的程序栈的状态。

* `console.error(String)`
输出错误信息，Console面板上面在文字前面显示红色错误图标：❌，点击该错误消息会出现当前的程序栈的状态。

* `console.info(String)`
输出常规信息，Console面板上面在文字前面显示蓝色图标：ℹ，点击该蓝色消息会出现当前的程序栈的状态。

## 打印DOM节点
获取 DOM 元素之后，可以直接打印输出。
* `console.log(p);`
.log 输出这个 DOM 的 HTML 标签。
* `console.dir(p);`
.dir 则会输出这个 DOM 元素的属性列表。

## 清空 console 面板
`console.clear()`
可以清空当前Console面板的打印出的内容，还有可以通过浏览器的快捷键 `Ctrl + L`也可以清空Console面板，或者点击Console面板上面的灰色禁止按钮也可以直接清空Console面板。

## console.asset 方法进行测试
`console.asset(arg1,arg2)`方法接受一个表达式作为参数，如果参数返回值是 false，则会输出第二个参数中的内容。

## 打印表格
`console.table()`方法，可以将数组、对象以表格的形式打印输出，如果只输出其中的某一列，可以加上第二个参数，如下所示：

```Javascript
console.table(dogs);
console.table(dogs, ["age"]);
```
## 分组打印
```Javascript
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
dogs.forEach(dog => {
    console.group(`${dog.name}`);        
//  console.groupCollapsed(`${dog.name}`);  // 列表默认叠起状态
    console.log(`${dog.name}`);
    console.log(`${dog.age}`);
    console.log(`${dog.name} 有 ${dog.age} 岁了`);
    console.groupEnd();
});
```
group()方法中可以传入这个分组的名称。group()/groupCollapsed() 与 groupEnd() 之间的内容会自动分组，区别在于是否能自动折叠。

## console.count() 计数
通过`console.count()`可以对输出的对象进行计数。但需要注意的是这里的计数对象仅限于由 count() 输出的内容，并非所有 console 中的输出。

## console.time() 计时

用 `console.time("name")` 和 `console.timeEnd("name")` 可以分别控制开始点和结束点，它们的参数表示当前计时的名称，可以自定义但前后必须保持相同。如下例子所示：

```Javascript
console.time('fetch my data');
fetch("https://api.github.com/users/soyaine")
  .then(data => data.json())
  .then(data => {
  console.timeEnd('fetch my data');
  console.log(data);
});
```
会打印输出`fetch my data: *ms`标签。

这部分的内容就到这里，这篇不是讲的技术，但这些方法更需要自己在工作中不断的使用，才能更方便自己，也使得自己能更加高效的工作。