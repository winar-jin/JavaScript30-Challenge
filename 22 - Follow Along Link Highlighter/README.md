> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。


第22天的练习是一个动画练习，当鼠标移动到锚点处，会有一个白色的色块移动到当前锚点所在的位置。演示图如下所示：

![Demo](/images/0714-demo.gif)

线上DEMO请[点击这里](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/22%20-%20Follow%20Along%20Link%20Highlighter/index.html)

## 源代码
```Javascript
const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);

function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    console.log(linkCoords);
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
```
* 通过观察HTML代码结构，可以发现需要显示白色动画背景的都是`a`标签，因此首先获取到能够触发事件的DOM元素。
* 当处于动画时查看开发者工具，可以发现我们的DOM结构如下图所示：

![dom](/images/0714-html.png)

* 即这个白色色块儿是一个相对于文档绝对定位的`<span>`，当我们的鼠标移动到`<a>`标签的时候，它的`top`和`left`随鼠标移动的位置的变化而动态变化，再加上我们对CSS的`highlight`类设置了`transition: all 0.2s;`属性，因此会有动画的效果。

* 介绍一个比较新的API，`object.getBoundingClientRect()`，这个方法返回元素的大小及其相对于视口的位置。返回值是一个[DOMRect](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)对象,该对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。具体可以下图所示的边界：
![getboundclient](/images/0714-getboundclient.png)
> 以上介绍摘自MDN，MDN的文档真的很好，建议直接看[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

* 但是当我们的页面发生滚动时就会出现问题了，因为我们动态的设置`left`和`top`的值是相对于窗口（初始化容器）左上角设置的，当我们滚动时页面会有一个滚动的距离产生，因此我们改变`top`和`left`的值的时候，应该把`window.scrollX`和`window.scrollY`加上，才能显示正确的位置。

END! 💯