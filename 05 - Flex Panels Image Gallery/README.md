> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行联系，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day05 - Flex Panel Gallery

第五天的练习是能够使用弹性布局（flex布局）创建一个简单的页面，包含基本的动画效果。点击某一图片，可以放大该图片，并且上下有文字滑出，再次点击该图片，回到初始的状态。

[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/05%20-%20Flex%20Panels%20Image%20Gallery/index.html)

## HTML和CSS相关
```HTML
<div class="panels">
    <div class="panel panel1">
        <p>Hey</p>
        <p>Let's</p>
        <p>Dance</p>
    </div>
    <div class="panel panel2">
        <p>Give</p>
        <p>Take</p>
        <p>Receive</p>
    </div>
    <div class="panel panel3">
        <p>Experience</p>
        <p>It</p>
        <p>Today</p>
    </div>
    <div class="panel panel4">
        <p>Give</p>
        <p>All</p>
        <p>You can</p>
    </div>
    <div class="panel panel5">
        <p>Life</p>
        <p>In</p>
        <p>Motion</p>
    </div>
</div>
```
在HTML内容部分，只有一个类为`.panels`大的容器,分别包含了五个`div`，类名为`.panel`，并且分别为每一个`div`设置不同的背景图片，每一个`div`下都有三个`p`标签。

```CSS
.panels {
    min-height:100vh;
    overflow: hidden;
    display: flex;
}
.panel {
    background:#6B0F9C;
    box-shadow:inset 0 0 0 5px rgba(255,255,255,0.1);
    color:white;
    text-align: center;
    align-items:center;
    /* Safari transitionend event.propertyName === flex */
    /* Chrome + FF transitionend event.propertyName === flex-grow */
    transition:
    font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    background 0.2s;
    font-size: 20px;
    background-size:cover;
    background-position:center;
    flex: 1;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.panel > * {
    margin:0;
    width: 100%;
    transition:transform 0.5s;
    flex: 1 0 auto;
    display:flex;
    justify-content: center;
    align-items: center;
}
.panel p:first-child{
    transform: translateY(-100%);
}
.panel.open-active p:first-child{
    transform: translateY(0);
}
.panel p:last-child{
    transform: translateY(100%);
}
.panel.open-active p:last-child{
    transform: translateY(0);
}
.panel.open {
    font-size:40px;
    flex: 5;
}
```

* Flex相关属性
    * `display: flex;` 设置该容器显示为flex容器；
    * `flex: 1 0 auto;` 三个值分别为`flex-grow`, `flex-shrink` 和 `flex-basis`的值；
    * `flex-direction: column;` 显示方向，可以设置为`column`和`row`，意为按列显示和按行显示；
    * `align-items: center;` 与显示方向垂直方向上flex元素的内容的排列方式；
    * `justify-content: center;` 显示方向上flex元素的内容的排列方式；
> 不过以上对flex的介绍是很不负责任的，此部分内容展开写可以写出一整篇长文，在此推荐一篇flexbox的非常棒的指南。
> 👉 [参考指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

* `transform: translateY(-100%);` 过渡效果，在Y轴方向上移动。

## JavaScript相关

```JavaScript
const panels = document.querySelectorAll('.panel');
panels.forEach(panel => panel.addEventListener('click',function(){
    this.classList.toggle('open');
}));
panels.forEach(panel => panel.addEventListener('transitionend',function(e){
    //this.classList.toggle('open-active');
    //console.log(e.propertyName);
    if(e.propertyName.includes('flex')){
        this.classList.toggle('open-active');
    }
}));
```
 
* `this.classList.toggle('open');` 类名的切换，如果有`.open`类，就移除该类，反之亦然。

* `transitionend` 对每一个div监听`transitionend`事件，当`.open`类触发的动画结束后会同时触发该事件，通过`event.propertyName`可以得到以上动画的名称，但是在Safari浏览器中，`event.propertyName === flex`，在Chrome和Firefox浏览器中，`event.propertyName === flex-grow`，因此可以通过`.includes('flex')`方法，只要属性名中包含‘flex’字符串，就继续执行。

## 一点思考

在以上实现的效果中，点击一个div会放大图片，同时显示文字，再点击另一个div，也会放大该图片，同时显示该文字，此时会呈现两者甚至多者同时放大的状态；假设我们想要达到通过点击某div来聚焦于此的状态，以上方案实现不了，只需做一下改进即可。

在每一次点击，放大图片之前，先清除每一个div的`.open`类，在进行`.open`的toggle，便可达到此效果。

并提取出所有函数，改进后的代码如下所示：

```JavaScript
const panels = document.querySelectorAll('.panel');
function clearOpenClass(){
    panels.forEach(panel => panel.classList.remove('open'));
}
function toggleOpen() {
if(this.classList.contains('open')){
    clearOpenClass();
    this.classList.remove('open');
}else{
    clearOpenClass();
    this.classList.add('open');
}
// this.classList.toggle('open');
}
function toggleActive(e) {
//   console.log(e.propertyName);
if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
}
}
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

```

至此为止，day05就算是完成了。👍