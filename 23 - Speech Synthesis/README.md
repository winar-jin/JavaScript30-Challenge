
> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。


第23天要做一个语音的记事本类似的场景，输入一段内容，选择不同的语言可以进行朗读。还可以选择不同的语速和语调。

![Demo](/images/0722-demo.gif)

线上DEMO请[点击这里](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/23%20-%20Speech%20Synthesis/index.html)

## 源代码
```Javascript
  // 实例化一个语音对象，并获得页面上的各DOM元素
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  msg.text = document.querySelector('[name="text"]').value;

  // 设置各种语言的下拉选择框
  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // 设置当前语音的语言
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  // 切换语音的播放和暂停
  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  // 设置语音的语速和语调
  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
  }

  // 监听语音对象的语言改变的事件
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  // 当切换语言选择下拉菜单时被调用
  voicesDropdown.addEventListener('change', setVoice);
  // 为语速和语调设置改变的事件监听
  options.forEach(option => option.addEventListener('change', setOption));
  // 分别监听播放和暂停事件
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));
}
```

## 思路
 首先要明确实现这样的效果要怎么做。
 * 设置语言选择下拉框，并将所选择的语言设置为语音的语言；
 * 监听语调和语速的滑动条，将语调和语速的值设置为语音的语调和语速；
 * 提供一个可以输入语音的内容的输入框；
 * 监听开始和暂停按钮，切换语音的播放状态；

## 技术点
 * `SpeechSynthesis.getVoices()`：获取所有的语言列表，代表在当前语音对象上所有可用的语言；
 * `SpeechSynthesis.cancel()`：结束，结束当前的语音状态，并将当前语音内容清空；
 * `SpeechSynthesis.pause()`：暂停，暂停当前的语音状态，当不清空语音内容，可以继续播放；
 * `SpeechSynthesis.speak()`：播放，将文字内容加入到播放序列中并开始播放语音；
 * `SpeechSynthesis.resume()`：继续，当语音处于暂停状态的时候，继续播放该语音；
 * 当我们为事件监听绑定函数**需要参数**的时候的几种做法：
   1. 
      ```
      node.onclick = function(){
        callback(args);
      }
      ```
   2. `node.onclick = callback.bind(null,args);`
   3. `node.onclick = () => callback(args);`
   > 通常我们会想到会创建匿名函数，执行带参的回调函数（法一），但其实这样代码即冗长也不美观；其次用ES6箭头函数也可以创造匿名函数，执行带参的回调函数（法三）；我认为最优雅的方法是法二，通过为回调函数绑定参数的方式实现。
 * `toggle(startOver)`函数中，之所以要带上参数，是因为我们可以通过这个参数控制语音播放的两种状态，播放和暂停，只要传入不同的布尔标记即可；并且在播放新的语音前一定要将上一次的语音清除，因为假入我们切换了语言类型或者语素语调，一定要先停止再以新的设置开始播放语音。
 

END! 💯