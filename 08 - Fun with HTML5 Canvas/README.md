> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day08 - Fun with HTML5 Canvas

第八天的练习是制作一个Canvas画板，可以用鼠标随意书写作画，颜色呈彩虹色渐变，画笔的大小呈大小渐变循环。这部分内容不涉及HTML和CSS相关内容，由纯JS实现。

[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/08%20-%20Fun%20with%20HTML5%20Canvas/index.html)

## 完整代码
```Javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

let isDrawing = true;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return;
  let lineX = e.offsetX;
  let lineY = e.offsetY;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(lineX,lineY);
  ctx.stroke();
  [lastX,lastY] = [e.offsetX,e.offsetY];
  if(direction){
    ctx.lineWidth--;
  }else{
    ctx.lineWidth++;
  }
  // if(ctx.lineWidth<=1){
  //   direction = false;
  // }else if(ctx.lineWidth > 50){
  //   direction = true;
  // }
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  
  hue++;
  hue %= 361;
  // if(hue > 360){
  //   hue = 0;
  // }
}

canvas.addEventListener('mousemove',draw,false);
canvas.addEventListener('mousedown',(e) => { 
  [lastX,lastY] = [e.offsetX,e.offsetY];
  isDrawing = true;
},false);
canvas.addEventListener('mouseup',() => { isDrawing = false;},false);
canvas.addEventListener('mouseover',() => { isDrawing = false;},false);
```

## Canvas
`<canvas>`是 HTML5 新增的元素，可使用JavaScript脚本来绘制图形。例如：画图，合成照片，创建动画甚至实时视频处理与渲染。在本例中，应先获取页面Canvas元素，并进行初始化设置如下：
```Javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;
```

* `canvas.getContext(contextType, contextAttributes);`返回canvas的上下文，若没有定义上下文的话返回`null`，该方法有两个参数：
    * `contextType`代表__上下文类型__,可能取值为：
        * `"2d"`，代表一个二维渲染上下文；
        * `"webgl"`代表三维渲染上下文对象，只能在浏览器实现WebGL 版本1；
        * `"webg2"`代表三维渲染上下文对象，只能在浏览器实现WebGL 版本2；
        * `"bitmaprenderer"`会创建一个` ImageBitmapRenderingContext`，只提供功能去替换指定canvas的`ImageBitmap`内容。
    * `contextAttributes`代表__上下文属性__。
[MDN参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)

* `ctx.strokeStyle`是Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性。默认值是 #000 (black)。
* `ctx.lineJoin`是 Canvas 2D API 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。__如果两个线段的相连部分在同一方向，那么linejoin不会产生任何效果。__可以取以下三个值：
    * `'round'`：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度；
    * `'bevel'`：在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角；
    * `'miter'`(默认值)：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 miterLimit 属性看到效果。
* `ctx.lineCap` 是 Canvas 2D API 指定如何绘制每一条线段末端的属性。可以取以下三个值：
    * `'round'`：线段末端以圆形结束；
    * `'butt'`(默认值)：线段末端以方形结束；
    * `'square'`：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
* `ctx.lineWidth`是 Canvas 2D API 设置线段厚度的属性（即线段的宽度）。当获取属性值时，它可以返回当前的值（默认值是1.0 ）。 当给属性赋值时， 0、 负数、 Infinity 和 NaN 都会被忽略；除此之外，都会被赋予一个新值。

## 画线
```Javascript
let isDrawing = true;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return;
  let lineX = e.offsetX;
  let lineY = e.offsetY;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(lineX,lineY);
  ctx.stroke();
  [lastX,lastY] = [e.offsetX,e.offsetY];
  hue++;
  if(direction){
    ctx.lineWidth--;
  }else{
    ctx.lineWidth++;
  }
  // if(ctx.lineWidth<=1){
  //   direction = false;
  // }else if(ctx.lineWidth > 50){
  //   direction = true;
  // }
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  
  hue %= 361;
  // if(hue > 360){
  //   hue = 0;
  // }
}
```

* 想要划线的话就要清楚以下几件事：线段的起点是哪里、线段的终点是哪里、怎样是画线的状态（按下鼠标移动画线，松开鼠标画线结束），因此需要初始化一下变量：
```Javascript
let isDrawing = true; //代表是否正在画线的flag
let lastX = 0; //线段的起点X坐标
let lastY = 0; //线段的起点Y坐标
let hue = 0; //标识线段颜色（hsl颜色表示法）
let direction = true; //线段的粗细变化flag
```
* 使用canvas进行画线，使用 beginPath()开始绘制新的路径，使用 moveTo()移动画笔至路径的起始点，使用lineTo标识路径的终点，使用 stroke() 方法真正地画线。
    * `ctx.beginPath();`是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
    * `ctx.moveTo(x, y);`是 Canvas 2D API 将一个新的子路径的起始点移动到(x，y)坐标的方法。
    * `ctx.lineTo(x, y);`是 Canvas 2D API 使用直线连接子路径的终点到x，y坐标的方法（并不会真正地绘制）。
    * `ctx.stroke();`是 Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。
    * `ctx.closePath();`是 Canvas 2D API 将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。 如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。(此例中未用到)
    
## 颜色变化
```Javascript
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
hue++;
hue %= 361;
// if(hue > 360){
//   hue = 0;
// }
```
在画线的过程中动态的改变线条的颜色，采用hsl颜色表示，hue的值可以从0-360；将hue的值每次每次加一，`hue %= 361;`可以0-360一直循环，当然也可使用`if(hue > 360)    hue = 0;`来做到。

## 线条粗细的变化
```Javascript
if(direction){
    ctx.lineWidth--;
}else{
    ctx.lineWidth++;
}
// if(ctx.lineWidth<=1){
//   direction = false;
// }else if(ctx.lineWidth > 50){
//   direction = true;
// }
if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
}
```
设置一个flag，当flag为true时，线段宽度就减小；当flag为false时，线段宽度就增加。使用`if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
}`可以当线段的宽度在50和1处，使flag的值变化，已达到线段粗细循环渐变的效果，等同于以下代码：`if(ctx.lineWidth<=1){   direction = false;}else if(ctx.lineWidth > 50){   direction = true; }`。

在draw函数的开始`if(!isDrawing) return;`代表当状态flag为假时就不画线，为真时才画线。

## 事件监听
```Javascript
canvas.addEventListener('mousemove',draw,false);
canvas.addEventListener('mousedown',(e) => { 
  [lastX,lastY] = [e.offsetX,e.offsetY];
  isDrawing = true;
},false);
canvas.addEventListener('mouseup',() => { isDrawing = false;},false);
canvas.addEventListener('mouseover',() => { isDrawing = false;},false);
```
分别监听其`mousemove`,`mousedown`,`mouseup`,`mouseover`事件，当鼠标点下时设置线段起点为鼠标的当前坐标，`[lastX,lastY] = [e.offsetX,e.offsetY]`;并且只设置`mousedown`事件的`isDrawing`状态flag为true，代表当鼠标按下时画线，鼠标弹起状态和鼠标移开canvas对象下状态不画线。

>  `[lastX,lastY] = [e.offsetX,e.offsetY];`等同于`lastX = e.offsetX;lastY = e.offsetY;`

至此就实现了一个canvas下彩虹画笔的画板效果，以上一些属性的介绍参考了[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)，同样我也认为在学习前端的过程中，应该多多浏览MDN等文档，以熟练自己的知识。