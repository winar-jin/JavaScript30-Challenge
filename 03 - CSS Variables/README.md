> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day03 - CSS Variables

第三天的练习是用 JavaScript 和 CSS3 实现当改变CSS属性的值时，能够实时调整图片的内边距、模糊度、背景颜色，同时标题中 JS 两字的颜色也随图片背景颜色而变化的效果。

_[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/03%20-%20CSS%20Variables/index.html)_

实现以上模拟时钟的效果，大致思路和解决方案如下：
* 首先先在CSS中定义变量，并在页面样式中对页面变量进行关联。
* 使用JavaScript实时获取变量的值，并更新CSS属性的值，实时改变页面的效果。

## CSS3

```CSS
:root{   
        --base: #ffc600;
        --blur: 10px;
        --spacing: 10px;
    }
span.hl{
        color: var(--base);
    }
img{
        padding: var(--spacing);
        filter: blur(var(--blur));
        background: var(--base);
    }
```

* `:root`表示文档树的根元素,应用到HTML，:root 即表示为<html>元素，除了优先级更高外，相当于html标签选择器。[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)

* `:root`在声明全局CSS变量的时候很有用，使用`--***`就可以自定义CSS全局变量。在使用CSS全局变量时，只需要将属性的值设置为`var(--***)`即可。[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

* `filter: blur();`是指滤镜，是一个功能强大的工具，可以通过使用滤镜达到不同的视觉效果，比较像PS中的滤镜。滤镜通常用于调整图像，背景或边框的绘制。可以一次设置一个滤镜也可以同时设置多个滤镜，常见的滤镜有模糊滤镜`blur()`,透明度滤镜`opacity()`,灰度滤镜`grayscale()`等。[参考文档](https://developer.mozilla.org/en/docs/Web/CSS/filter)

## JavaScript

```JavaScript
const inputs = document.querySelectorAll('.controls input');
inputs.forEach(input =>  input.addEventListener('mousemove',updateData));
inputs.forEach(input =>  input.addEventListener('change',updateData));
function updateData(e){
    const suffix = this.dataset.sizing || ' ';
    document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
}
```

* `inputs`返回一个nodelist，是`.controls input`下三个控制属性变化的节点。

* 为每一个节点监听`mousemove`事件，可以在该滑块的值变化时实时的改变CSS全局变量。

* `this.dataset.sizing`返回`data-sizing`属性的值，`dataset`可以返回该元素所有自定义的`data-*`属性，该例中`data-sizing`保存的是单位，因此`this.dataset.sizing`可返回该属性的单位。

* 通过`this.value`获取的值不能直接设置为CSS属性，因为没有单位，但是`--blue`和`--sapcing`变量有属性，而`--base`属性没有，因此设置一变量保存他们的后缀作为单位，若无单位，则设置为空。即`const suffix = this.dataset.sizing || ' ';`，再通过`this.value + suffix`就可以正确的设置CSS属性的值。

* `document.documentElement`表示文档的根元素，对于HTML文档来说就是`<html>`。[参考文档](https://developer.mozilla.org/en/docs/Web/API/Document/documentElement)

* 之所以又监听元素`change`事件，是因为`color`，当改变了颜色的值时，只监听`mousemove`事件，无法实时的改变颜色，直到鼠标从color颜色块上滑过，添加`change`事件就可以当改变过后实时的改变。

通过以上就可以实现该任务所示的效果。