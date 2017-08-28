> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。


第28天的练习是一个视频播放速率控制的效果。

> [线上DEMO](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/28%20-%20Video%20Speed%20Controller/index.html)

## 源码
```javascript
  const video = document.querySelector('.flex');
  const speed = document.querySelector('.speed');
  const speedBar = speed.querySelector('.speed-bar');

  function handelMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const height = Math.ceil(percent * 100) + '%';
    const min = 0.4;
    const max = 4;
    const playBackRate = (max - min) * percent + min;
    speedBar.style.height = height;
    speedBar.textContent = playBackRate.toFixed(2) + '×';
    video.playbackRate = playBackRate;
  }

  speed.addEventListener('mousemove', handelMove, false);
```
目的是要通过视频右边的拖动条来控制视频的播放速率，因此首先要监听右侧`speedBar`的`mousemove`事件，然后通过计算鼠标当前所在的位置占滚动条的距离的百分比，通过此百分比映射到播放速率的最大值和最小值，最后改变右侧滚动条的高度和`video`的`playbackRate`属性即可完成对视频播放速率的控制。

## 部分代码解析
* `e.pageY`: 鼠标当前所在位置距离页面顶端的距离
* `this.offsetTop`: 当前元素顶端距离页面顶端的距离
* `this.offsetHeightH`: 当前元素的高度
* `const playBackRate = (max - min) * percent + min;`: 通过这句话能够将百分比映射到最大值和最小值之间，由于最小值不是从0开始的，因此应该用它们的跨度乘以百分比，在加上最小值，这种思想也可以当做一个公式，在求最小值到最大值之间的随机数时也会用到这句话。
* `video.playbackRate = playBackRate;`: `playbackRate`属性代表视频的播放速率，是一个可读可写的属性，因此我们可直接为该属性赋值。
* 有一点需要注意，在我们为`speed`元素绑定`mousemove`事件的时候，若在事件监听器中有用的`this`，建议不要使用箭头函数，因为es6的箭头函数会绑定父级作用域，若在这种情况下使用箭头函数会发生意外的错误。


END! 💯