> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day14 - JavaScript References VS Copying

第十四天我们主要练习的是JavaScript的变量引用和变量复制。简单一句话总结就是：基本类型按值操作，而对象类型由引用操作。
如果还在困惑，就看下面的练习代码吧。（在console面板中调试运行）
[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/14%20-%20JavaScript%20References%20VS%20Copying/index.html)

## 按值操作

基本类型由值操作。以下类型在JavaScript中被视为基本类型：

`String`

`Number`

`Boolean`

`Null`

`Undefined`

这意味着如果我们将变量定义为基本类型，然后将另一个变量定义为之前定义的那个变量。
则第二个变量将复制第一个变量的当前值。对第一个变量的任何更改都不会影响第二个变量，反之亦然。

### 实例

```Javascript
let me = "Winar"
let me2 = me
console.log(me === me2) // true

me2 = "Jackie"
console.log(me === me2, me, me2) // false, "Winar", "Jackie"; 

me = "Not Winar"
console.log(me === me2, me, me2) // false, "Not Winar", "Jackie"
```
由此可见，基本类型，按值操作，新建的变量会将值复制给新的变量，各自的改变不会互相影响。

## 通过引用操作

对象`Object`类型是按引用操作的，如果它不是基本类型中的一个，那么它就是对象，这里如果我们细究的话，JavaScript中每一个东西都可以当做对象，甚至是基本的类型（不包括`null`和`undefined`），但我们尽量不要钻这个牛角尖。

一些JavaScript中的对象：

`Object`

`Function`

`Array`

`Set`

`Map`

### 实例
假设我们声明一个变量并将其定义为一个对象，然后声明另一个变量并将其定义为第一个变量：
```Javascript
const me = {name: "Winar", age: 23}
const me2 = me
console.log(me === me2) // true
```
如果我们调用这两个变量中的任何一个，并更改其中的属性值，那么这两个变量都会相应的发生变化。
```Javascript
me.name = "Jackie"
console.log(me === me2) // true
console.log(me2) // { name: 'Jackie', age: 23 }
```
这是因为`me2`并不是简单的复`me`的值，它是指向用`const`定义的`me`的一个引用，任何对这个变量的更改都会立即反映到每一个变量上，可以理解为它们实际上指向的都是一个值，只要有一个改变了它，其他的值自然就会变。

那么如果我们想要简单拷贝原始对象的值，以便后期对变量的操作不会影响原始对象的值，那我们该怎么做呢？

```Javascript
const me3 = Object.assign({}, me) // create a new object,and copy me to me3
console.log(me3) // { name: 'Jackie', age: 23 }
console.log(me === me3) // false! ! 
// 🔔 这两个分别是两个不同的对象实例，就像两个人虽然都叫小明，但他们确是两个人一样。
console.log(me.name === me3.name) // true! The property values are the same!
me3.name = "Devin"
console.log(`${me.name}, ${me3.name}`) // 'Jackie, Devin'
```
我们成功的创建了一个新的对象，并对它进行复制操作，这样我们在修改我们的副本对象时就不用担心对原对象产生影响了。

❗️如果我们复制的对象也包含对象，那么我们只能复制到第一层。 任何比第一层更深的值仍然是原对象的引用。

解决此问题有以下两种途径：

* 采用深拷贝的方法
```Javascript
function clone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
```
> -- 来自于[StackOverflow](http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object)

* 采用JSON字符串

`JSON.parse(JSON.stringify(obj))`

首先调用`JSON.stringify()`方法将对象解析为字符串，再调用`JSON.parse()`方法，将字符串解析为对象，这是一个小技巧，在处理对象的复制时很有用。

[参考文档1](http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)
[4种复制对象的方法](http://heyjavascript.com/4-creative-ways-to-clone-objects/)
到这里这个练习就算结束了。⚓