> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行联系，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day02 - JavaScript + CSS Clock

第二天的练习是用Js+CSS模拟时钟效果。

_[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/02%20-%20JS%20%2B%20CSS%20Clock/index.html)_

实现以上模拟时钟的效果，大致思路和解决方案如下：
* 分别获取到当前时间的时、分、秒。
* 通过时分秒对一圈360度，进行映射，确定每一个指针所需旋转的角度。
* 通过CSS的`transform：rotate(deg)`，来实时的调整指针在键盘中的位置。

## 页面布局&&样式style
主要的html布局代码如下：
```html
<div class="clock">
    <div class="clock-face">
      <div class="hand hour-hand"></div>
      <div class="hand min-hand"></div>
      <div class="hand second-hand"></div>
    </div>
  </div>
```
主要的CSS样式设置如下：
```CSS
.clock {
      width: 30rem;
      height: 30rem;
      border:20px solid white;
      border-radius:50%; /*设置50%将正方形变为圆形*/
      margin:50px auto;
      position: relative;
      padding:2rem;
      box-shadow:
        0 0 0 4px rgba(0,0,0,0.1),
        inset 0 0 0 3px #EFEFEF,
        inset 0 0 10px black,
        0 0 10px rgba(0,0,0,0.2); /*可以对元素设置多阴影，用，隔开即可，inset表示内阴影*/
    }

    .clock-face {
      position: relative;
      width: 100%;
      height: 100%;
      transform: translateY(-3px); /* 由于指针占有6px，因此要想居中对齐，上移3px */
    }
    /*添加中间的中心圆点*/
    .clock-face::after {
    content: "";
    width: 1em;
    height: 1em;
    background: #000;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    margin-left: -.5em;
    margin-top: -.5em;  /*这两行代码的作用和下面一行的作用相同*/
    transform: translate(-50%, -50%);/*top：50%;left:50%;对齐的是左上角，应该在向左上移动自身尺寸的50%*/
    box-shadow:
                0 0 0 2px rgba(0,0,0,0.1),
                0 0 10px rgba(0,0,0,0.2);
    }
    .hand {
      width:50%;
      height:6px;
      background:black;
      position: absolute;
      top:50%;
      transition: all .5s;  /*设置动画时间为0.5秒*/
      /*transition-timing-function: ease-in-out;*/
      transition-timing-function: cubic-bezier(0, 1.74, 0.26, 0.99); //cubic-bezier()函数可以自定义过度时间函数
      transform: rotate(90deg); /*初始化使三个指针全部指向12时*/
      transform-origin: 100%; /*默认旋转中心为center，通过此属性设置旋转中心为最右侧，也可设置为：right*/
    }
    .min-hand{
      width: 40%; /*分针稍微短些*/
      margin-left: 10%;
    }
    .hour-hand{
      width: 30%;/*时针更短些*/
      margin-left: 20%;
    }
```
重要的CSS属性如下：（已在代码中注释解释）
* `border-radius： 50%;`
* `transition: all .5s;` 
* `transition-timing-function: cubic-bezier(0, 1.74, 0.26, 0.99);`
* `transform-origin: 100%;`

关于CSS属性等有问题的，希望我们都能养成随时[查看文档](http://www.ayqy.net/doc/css2-1/cover.html)的习惯。

## JavaScript

主要的Javascript代码如下：
```JavaScript
const hourHand = document.querySelector('.hour-hand'); 
const minHand = document.querySelector('.min-hand'); 
const secondHand = document.querySelector('.second-hand'); /*分别获取时、分、秒针*/
function setDate() {
    const now = new Date();
    const hours = now.getHours();
    const minutes= now.getMinutes();
    const seconds = now.getSeconds(); /*分别获取到当前时间的时分秒*/
    const secondDegree = ( seconds / 60) * 360 + 90;  /*秒针需旋转的度数*/
    const minDegree = (( minutes/ 60) * 360) + ((seconds / 60) * 6) + 90; /*分针需旋转的度数：当前分钟数 + 秒数在分钟的映射（如过了30秒，相当于半分钟）*/
    const hourDegree = (( hours/ 12) * 360) + ((minutes / 60) * 30) + 90; /*时针需旋转的度数：当前时数 + 分钟在小时的映射（如过了30分钟，相当于半小时）*/
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
    minHand.style.transform = `rotate(${minDegree}deg)`;
    secondHand.style.transform = `rotate(${secondDegree}deg)`; /*仍运用ES6的模板字符串，分别将当前的旋转度数传入，使各指针旋转*/
}
setInterval(setDate, 1000);
```

在Javascript部分的代码相对简单，主要分别获取当前时间的时分秒，在通过转换到旋转的度数，通过设置各个指针的CSS`transform`属性，控制其旋转值。

但到目前为止，不知你是否发现，任然存在问题，就是当秒针指到12时，秒针的度数会经历一个骤变（450deg->90deg->6deg）;在这时指针会突然转一圈指到90度再回来，感觉很怪异，可以通过一下的方法来修改。

__方法一：__

由于在这一瞬间的动画是在0.5s内完成的，所以我们可以在这个瞬间设置动画时间为0秒，具体如下：
```JavaScript
if (secondDegree === 90) secondHand.style.transition = 'all 0s';
else secondHand.style.transition = 'all .5s';

if (minDegree === 90) minHand.style.transition = 'all 0s';
else minHand.style.transition = 'all 0.1s';
```
__方法二：__

这个方法是参考网上的解决方案。问题是由角度所引发的，那么就在角度这里想办法解决。

此前的代码中，每秒都会重新 new 一个 Date 对象，用来计算角度值，但如果让这个角度值一直保持增长，也就不会出现逆时针回旋的问题了。

因此，只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

```JavaScript
let secondDeg = 0,
minDeg = 0,
hourDeg = 0;

function initDate() {
    const date = new Date();
    const second = date.getSeconds();
    secondDeg = 90 + (second / 60) * 360;
    const min = date.getMinutes();
    minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
    const hour = date.getHours();
    hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
}

function updateDate() {
    secondDeg += (1 / 60) * 360;
    minDeg += ((1 / 60) / 60) * 360;
    hourDeg += (((1 / 60) / 60) / 12);

    secHand.style.transform = `rotate(${ secondDeg}deg)`;
    minHand.style.transform = `rotate(${ minDeg }deg)`;
    hourHand.style.transform = `rotate(${ hourDeg }deg)`;
}

initDate();
setInterval(updateDate, 1000);
```
至此为止就大功告成了！

顺便推荐一个用CSS Animation制作时钟的很棒的[教程](https://cssanimation.rocks/clocks/)。