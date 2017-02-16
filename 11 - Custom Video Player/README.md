> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day11 - Custom Video Player

第十一天是要做一个自定义的视频播放器，在具有基本样式的前提下，实现视频的播放，暂停，进度条拖拽，音量加减，播放速度加减，快进快退的功能。

[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/11%20-%20Custom%20Video%20Player/index.html)

## 实现思路

1. 首先需要分别将变量绑定至页面上的元素
2. 分别实现播放，暂停，声音加减，播放速度加减，拖拽快进，点击快进等函数
3. 事件绑定，将页面元素绑定相应触发事件

## 变量绑定
分别将变量和页面上的元素绑定，采用`document.querySelector()`或`document.querySelectorAll()`即可。如下：
```Javascript
// 获取所有的页面元素
let video = document.querySelector('.viewer');
let progress = document.querySelector('.progress');
let toggle = document.querySelector('.toggle');
let player__slider = document.querySelectorAll('.player__slider');
let skip = document.querySelectorAll('[data-skip]');
let filled = document.querySelector('.progress__filled');
let progressBar = document.querySelector('.progress');
```

## 函数实现

* 视频播放与暂停转换函数
```Javascript
function videoplay(e){
    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
```
判断当前视频的播放状态，播放时则变为暂停状态、暂停则变为播放状态；分别调用`video.play()`和`video.pause()`方法，在此使用`video[play]()`和`video[pause]()`是因为，使用中括号能够动态的传递变量进去，而使用点运算符不能传参。

* 播放按钮状态显示函数
```Javascript
function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
```
如果视频是暂停状态就显示播放键'►'，否则显示暂定键'❚❚'

* 音量大小和播放速度控制函数
```Javascript
function handlePlayerSlider(e){
    video[e.target.name] = e.target.value;
}
```
在页面HTML中是这样设置的：
```HTML
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
分别给每一个范围设置了一个`name`属性，代表该范围所表示的内容，同时也是需控制的方法名，因此我们通过设置`video[e.target.name] = e.target.value;`就可以分别改变视频的音量和播放速度，此处`e.target`就是这两个`input`元素，也等同于`this`。

* 快进快退函数
```Javascript
function handleSkip(e){
    let skiptime = parseFloat(this.dataset.skip);
    video.currentTime += skiptime;
}
```
页面中快进快退的HTML代码如下:
```HTML
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```
分别设置了`data-skip`属性，这样就可以通过`.dataset.skip`获取到该属性的值，也即`this.dataset.skip`，但该值是字符串类型，需要用`parseFloat()`讲其转换为float数值型，分别将时间加减当前视频的播放事件就可以做到快进快退。

* 进度条随播放时间而显示的函数
```Javascript
function filledUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    filled.style.flexBasis = `${portion}%`;
}
```
通过视频当前的播放时间除以视频的总时长*100，就是当前视频播放的百分比，将该值使用模版字符串的方式传给`flexBasis`样式中即可，在CSS中该样式名为`flex-basis`,但是谨记在js中需要多单词的CSS属性需要变为驼峰式的命名，第二个单词大写，切不可用连字符连接。

* 拖拽进度条定点观看的函数
```Javascript
function handlefilled(e){    
    let pice = (e.offsetX / progressBar.offsetWidth) * video.duration;
    // let pice = (e.offsetX / progressBar.clientWidth) * video.duration;
    video.currentTime = pice;
}
```
通过当前点击的位置与进度条的总长度相比，就可以知道当前位置占总进度条的比例，乘以视频的总长度，就可以将当前的进度条比例映射为视频播放的长度，赋值给`video.currentTime`即可。
> 此处应注意offsetX、clientX和pageX等的区别:[参考](http://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y)

## 事件监听
```javascript
video.addEventListener('click',videoplay);
// video.addEventListener('click',handleToggle);
video.addEventListener('play',handleToggle);
video.addEventListener('pause',handleToggle);
video.addEventListener('timeupdate',filledUpdate);


toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);

let mouseflag = false;
player__slider.forEach(item => item.addEventListener('click',handlePlayerSlider));
player__slider.forEach(item => item.addEventListener('mousedown',() => mouseflag = true));
player__slider.forEach(item => item.addEventListener('mouseup',() => mouseflag = false));
player__slider.forEach(item => item.addEventListener('mousemove',(e) => mouseflag && handlePlayerSlider(e)));

skip.forEach(item => item.addEventListener('click',handleSkip));

let filledflag = false;
progressBar.addEventListener('click',handlefilled);
progressBar.addEventListener('mousemove',(e) => filledflag && handlefilled(e));
progressBar.addEventListener('mousedown',() => filledflag = true);
progressBar.addEventListener('mouseup',() => filledflag = false);
```
分别给页面元素建立事件监听，并绑定其实现函数即可。此处有两处需注意:
1. 有实现进度条的点击拖拽，不能仅绑定`mousemove`事件，因为这样鼠标在上面滑过就会出发事件，还需判断鼠标是否点下，此处可设立一个布尔类型的`flag`标志鼠标是否按下，并分别绑定`mouseup`事件和`mousedown`事件，设置此`flag`的值，这样在`mousemove`事件的回调函数中先判断此`flag`的值，若为真是才继续触发事件。
2. `mousemove`的回调函数本应如下:
```javascript
｛
    if(filledflag){
        handlefilled(e);
    }
｝
```
但这样不够简洁，我们改进此代码如下：
```
filledflag && handlefilled(e)
```
使用`&&`判断左右两变量，只有两个都为真的时候整体表达式才为真，且在判断时从左向右依次判断，若左变量就为假，就不会再去执行右边的表达式。

ok，第十一天的任务完成了！

> 最后推荐一个讲解HTML5的Video标签的[参考文档](https://www.w3.org/2010/05/video/mediaevents.html)。