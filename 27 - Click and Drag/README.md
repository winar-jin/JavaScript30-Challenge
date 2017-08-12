> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

![demo](images/0812-demo.gif)

第27天的练习是一个鼠标点击并进行拖拽的效果，详见👆动画。

> [线上DEMO](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/27%20-%20Click%20and%20Drag/index.html)

## 源码
```javascript
// javascript
const item = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
item.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    console.log(startX);
    e.preventDefault();
    let x = e.pageX - item.offsetLeft;
    let walkX = (x - startX) * 3;
    item.scrollLeft = scrollLeft - walkX;

});
item.addEventListener('mouseleave', () => {
    isDown = false;
    item.classList.remove('active');
});
item.addEventListener('mouseup', () => {
    isDown = false;
    item.classList.remove('active');
});
item.addEventListener('mousedown', e => {
    isDown = true;
    item.classList.add('active');
    startX = e.pageX - item.offsetLeft;
    scrollLeft = item.scrollLeft;
});
```

```css
<!-- 部分CSS -->
.items {
  height:800px;
  padding: 100px;
  width:100%;
  border:1px solid white;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;
  transform: scale(0.98);
  will-change: transform;
  position: relative;
  background: rgba(255,255,255,0.1);
  font-size: 0;
  perspective: 500px;
}

.items.active {
  background: rgba(255,255,255,0.3);
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1);
}
```

## 部分代码解析
* 鼠标松开或者离开容器，`mouseleave`为当鼠标移出该容器是会触发。
```
item.addEventListener('mouseleave', () => {
    isDown = false;
    item.classList.remove('active');
});
item.addEventListener('mouseup', () => {
    isDown = false;
    item.classList.remove('active');
});
```
将鼠标是否按下的标志位设置为`false`，并移除该容器的激活类名。

* 事件模型中并没有鼠标点击拖拽的事件，因此我们需要将多个事件配合使用以达到鼠标点击拖拽的效果，就是使用`mousedown`和`mousemove`事件配合，提前声明一个鼠标是否按下的标志，当鼠标按下的时候设置为`true`，在鼠标标志为真的时候再执行具体的点击拖拽的逻辑。

* 要实现鼠标点击拖拽的功能肯定要知道鼠标点击拖拽的距离，这个距离可以通过首先记录鼠标点击的位置和鼠标滑动时的位置相减得到，即源码中的`let walkX = (x - startX) * 3;`这里加上乘三或者乘小数，可以控制鼠标点击拖拽的灵敏度。

* 要得到鼠标当前点相对于容器的左边的水平距离可以用`e.pageX - item.offsetLeft`来求得，这里`e.pageX`是当前点相对于浏览器左边框的距离，
`item.offsetLeft`是当前容器相对于浏览器左边框的距离，两者相减即可得到鼠标当前点相对于容器的左边的水平距离。

* 这里还要提前记录该容器在水平方向上的滚动距离`scrollLeft = item.scrollLeft;`，这样当鼠标在容器中移动的时候会计算出鼠标移动的距离，之后再动态的更新该容器的水平滚动距离，`item.scrollLeft = scrollLeft - walkX;`，用之前的水平滚动距离减去当前的水平滚动距离。

* 这里的`e.preventDefault();`是为了阻止默认事件，在这里的默认事件其实主要是指，鼠标点击滑动时对文本的选中等。

* 鼠标点击后的小动画的原理如下：将该容器元素的缩放比例由0.98放大到1,`scale(1);`；再修改鼠标点击时的鼠标样式为`grabbing`（一个抓着的小手状）；再加上`transition: all 0.2s;`就可以有动画的效果了。

END! 💯