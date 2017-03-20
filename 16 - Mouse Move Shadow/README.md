> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day16 - Mouse Shadow

第十六天主要是练习是一个较常用的效果：鼠标移动时，元素的字体阴影随着鼠标移动的方向发生改变，达到字体阴影随着鼠标一起走的效果。 [代码参考](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/15%20-%20LocalStorage/index.html) ，且实现的样式如图所示。
![todolist](http://7xss68.com1.z0.glb.clouddn.com/blog/post/todolist.png)
## 主要思路


![鼠标点击事件的几个属性实例](http://7xss68.com1.z0.glb.clouddn.com/2014091409260873.png)
* event.clientX、event.clientY:鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。IE事件和标准事件都定义了这2个属性.

* event.pageX、event.pageY:类似于event.clientX、event.clientY，但它们使用的是__文档坐标__而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没有这2个属性。

* event.offsetX、event.offsetY:鼠标相对于事件源元素（srcElement）(鼠标点击的元素)的X,Y坐标，只有IE事件有这2个属性，标准事件没有对应的属性。

* event.screenX、event.screenY:鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性

![页面元素offset的几个属性示例](http://7xss68.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-03-20%20%E4%B8%8B%E5%8D%889.35.21.png)

> 该图是对本例子的例子的更改，为外层元素加上了`relative`定位属性，并更改了其高度和宽度的值，为了显示以下所示效果。

* HTMLElement.offsetParent：是一个只读属性，指向最近的包含该元素的__定位__元素.如果没有定位的元素，则 offsetParent 为最近的 table 元素对象或根元素（标准模式下为 html；quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。
offsetParent 很有用，因为 _offsetTop_ 和 _offsetLeft_ 都是相对于其内边距边界的。
* HTMLElement.offsetTop：指的是当前元素到其offsetParent指向元素的__上边距__的距离。（如图所示）
* HTMLElement.offsetLeft：指的是当前元素到其offsetParent指向元素的__左边距__的距离。（如图所示）
* HTMLElement.offsetHeight：指的是当前元素的__高度__，包含__content，padding，border__的高度值，但不包括__margin__的值。（如图所示）
* HTMLElement.offsetWidth：指的是当前元素的__宽度__，包含__content，padding，border__的高度值，但不包括__margin__的值。（如图所示）