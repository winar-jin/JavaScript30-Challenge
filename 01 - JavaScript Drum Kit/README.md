
> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day01 - JavaScript Drum Kit

第一天的练习是用Js制作一个爵士鼓的页面，通过敲击键盘上不同的字母，会发出不同的声音，并且页面上会伴随着敲击的动画。

_[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/01%20-%20JavaScript%20Drum%20Kit/index.html)_

想要实现以上效果，大致思路和解决方案如下：
* 检测到键盘上什么键被按下--监听`keydown`事件
* 在按键被按下的时候，播放音效--`audio.play()`
* 在按键被按下的同时，播放动画--`Element.classList.add('className')`
* 在动画结束后，移除动画，不然之后再点击不会有任何效果--`Element.classList.remove('className')`

## 页面基础布局
页面的Html布局大致如下：
```html
<div class="keys">
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
    <div data-key="83" class="key">
      <kbd>S</kbd>
      <span class="sound">hihat</span>
    </div>
    <div data-key="68" class="key">
      <kbd>D</kbd>
      <span class="sound">kick</span>
    </div>
    <div data-key="70" class="key">
      <kbd>F</kbd>
      <span class="sound">openhat</span>
    </div>
    <div data-key="71" class="key">
      <kbd>G</kbd>
      <span class="sound">boom</span>
    </div>
    <div data-key="72" class="key">
      <kbd>H</kbd>
      <span class="sound">ride</span>
    </div>
    <div data-key="74" class="key">
      <kbd>J</kbd>
      <span class="sound">snare</span>
    </div>
    <div data-key="75" class="key">
      <kbd>K</kbd>
      <span class="sound">tom</span>
    </div>
    <div data-key="76" class="key">
      <kbd>L</kbd>
      <span class="sound">tink</span>
    </div>
  </div>
  <audio data-key="65" src="sounds/clap.wav"></audio>
  <audio data-key="83" src="sounds/hihat.wav"></audio>
  <audio data-key="68" src="sounds/kick.wav"></audio>
  <audio data-key="70" src="sounds/openhat.wav"></audio>
  <audio data-key="71" src="sounds/boom.wav"></audio>
  <audio data-key="72" src="sounds/ride.wav"></audio>
  <audio data-key="74" src="sounds/snare.wav"></audio>
  <audio data-key="75" src="sounds/tom.wav"></audio>
  <audio data-key="76" src="sounds/tink.wav"></audio>
```
页面里通过`data-key`将页面展示的内容和audio关联起来。
> `data-key`属性是无法在网上搜索到的，这是一个自定义属性，如果没有合适的属性可以定义该数据，就可以通过`data-*`的方式自定义页面的数据。_[参考文档](https://developers.whatwg.org/content-models.html#embedding-custom-non-visible-data-with-the-data-*-attributes)_

页面主要CSS设置

```CSS
.keys {
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.key {
  border: .4rem solid black;
  border-radius: .5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem .5rem;
  transition: all .07s ease;
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(0,0,0,0.4);
  text-shadow: 0 0 .5rem black;
}

.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}
```
主要属性有以下几个：
* `transform: scale(1.1);`--该属性在键盘被点击时将该元素缩放至原来的1.1倍。
* `.key{border: .4rem solid black;} .playing{border-color: #ffc600;}`--这两条属性在按键点击的时候改变边框颜色。
* `.key{text-shadow: 0 0 .5rem black;} .playing{box-shadow: 0 0 1rem #ffc600;}`--这两条属性在按键点击的时候改变阴影的效果
* `transition: all .07s ease;`--定义以上动画在0.07秒内完成。

我们注意到我们定义了`.palying`类，在按键按下的时侯为该元素添加`playing`类，在结束后移除`playing`类。

## 按键监听&音效播放&添加动画

关键js代码如下：
```JavaScript
function playAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!key) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}
window.addEventListener('keydown',playAudio);
```
* 监听页面的`keydown`事件，触发`playAudio`函数。

* 那么怎样检测我们按了哪个按键呢？每一个按键都有自己的KeyCode，可以通过按键的keyCode来判断。如果不清楚每一个按键的keyCode是多少，[这个网站](http://keycode.info/)可以帮到你。

* 在这里我们用到了*ES6*的模板字符串，`${e.keyCode}`,可以动态的将按键的Keycode传过去，以使audio动态的获取每一个按键绑定的audio。需要注意的是模板字符串一定要使用"`"(Esc下面那个键)包裹，而不是双引号。

* 我们注意到`audio.play();`前面一行是`audio.currentTime = 0;`，这是因为，如果没有在播放音效前将该音乐重置，会发生以下情况，当我连续点击某一按键的时候，只有第一次点击会响，第二次第三次连续的点击可能没声音。所以在每一次点击之前重置音效是很有必要的。

* `key.classList.add('playing');`可以在按键点击的同时为该元素添加`playing`类，展示小动画。

* `if(!audio) return; if(!key) return;`因为并不是每一个按键都有音效，当用户点击了非绑定音效按键，及时退出函数是很好的习惯。

## 动画结束后移除动画

关键js代码如下：
```JavaScript
function stopTransition(e){
    if(e.propertyName !== 'transform') return;
    console.log(this === e.target); //true
    e.target.classList.remove('playing');
  }
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend',stopTransition));
```
* 监听每一个按键元素的`transitionend`事件，当按键元素的动画结束后会触发`stopTransition`函数。

* 首先在`stopTransition`函数中可以输出事件`e`的内容，会输出该动画每一步具体的变化，发现其中会有`propertyName`属性，可以通过判断propertyName等于其中的一个值（例如`'transform'`），等于该值就移除`playing`类，也即移除动画。

* 在定位元素的时候，可以使用`this`也可以使用`e.target`,可以简单这么理解，this值的是谁出发了这次事件，也就是key，就等同于事件的目标（`e.target`）.

## 总结

至此为止就可以实现该效果了，查看[效果](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/01%20-%20JavaScript%20Drum%20Kit/index-START.html)。

整体的代码如下：
```JavaScript
function playAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!key) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }
function stopTransition(e){
    if(e.propertyName !== 'transform') return;
    console.log(this === e.target); //true
    e.target.classList.remove('playing');
}
window.addEventListener('keydown',playAudio);
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend',stopTransition));
```
当然要实现该效果绝对不止这一种方法，还比如这样：
```JavaScript
function stopTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }
function playAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //注意：这里的querySelector里面是`号，不是单引号
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!key) return;
    if (!audio) return;
    key.addEventListener('transitionend', stopTransition);
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}
window.addEventListener('keydown', playAudio);
```
如果您有新的方法，也欢迎您和我一起交流。