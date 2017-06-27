> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## day20 - Speech Detection

第20天的练习是利用浏览器内部的`Web speech API`实时的将自己所说的话展现在页面上。`Web speech API`是关于浏览器语音识别服务的API。

[线上例子](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/20%20-%20Speech%20Detection/index.html)**同意麦克风权限才能正常体验该网页**
![give permission](/images/0627-use micophone.png)

* 当你自己在本地电脑上跑此网站的时候，一定要记得开一个本地服务器才能正常使用。

## 主要思路
* 新建一个语音识别的对象
* 开启该语音识别对象的识别服务
* 监听`result`事件，实时获取语音输入内容
* 监听`end`事件，当结束时再次开启语音识别，使其持续监听

## 程序源代码

```JavaScript
  // 根据浏览器之间的兼容性，需要同时添加浏览器前缀
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // 实例化SpeechRecognition对象
  const recognition = new SpeechRecognition();

  // 控制在语音识别期间的结果是否返回，如开启了该属性，则会一直返回，直到SpeechRecognitionResult.isFinal是true时。即：当前这一段话说完了
  recognition.interimResults = true;

  // 创建p便签，附加到DOM树中
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  // 监听recognition的result事件，获取到语音输入的文字
  recognition.addEventListener('result', (e) => {
    const results = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      // 可以动态的将其中的某一个词语换掉
      const poopScript = results.replace(/good/gi, '👍');
      p.textContent = poopScript;

      // 如果当前一段输入结束了，也就是有停顿，就会新建一个p便签
      if(e.results[0].isFinal){
        p =document.createElement('p');
        words.appendChild(p);
      }
  });

  // 监听recognition的end事件，当前输入结束后，再次开始，使其一直处于输入状态
  recognition.addEventListener('end',recognition.start);

  // 开启recognition
  recognition.start();
```

## 代码解释

```JavaScript
  // 监听recognition的result事件，获取到语音输入的文字
  recognition.addEventListener('result', (e) => {
    const results = Array.from(e.results) // e.results中保存的是识别的结果，本来并不是数组，需要将其转换为数组，方便使用其map、join等方法。
      .map(result => result[0]) 
      .map(result => result.transcript) // 获取到每一段话，是一个数组类型
      .join(''); // 将每一段话连接成字符串

      // 可以动态的将其中的某一个词语换掉
      const poopScript = results.replace(/good/gi, '👍');
      p.textContent = poopScript;

      // 如果当前一段输入结束了，也就是有停顿，就会新建一个p便签
      if(e.results[0].isFinal){
        p =document.createElement('p');
        words.appendChild(p);
      }
  });
```
* 其中监听result事件，根据事件返回值获取到语音输入的内容
![speech event](/images/0627-speechevent.png)

可以看到transcript中保存的是语音输入的内容。其中可以看到还有一个属性为`confidence`，代表这段话是别的精度，越大正确率越高。
![get transcript](/images/0627-getresults.png)

* `recognition.interimResults = true;`

    该属性控制在语音识别期间的结果是否返回，如开启了该属性，则会一直返回，直到SpeechRecognitionResult.isFinal是true时。即：当前这一段话说完了。

* `SpeechRecognition.lang = 'en-US';`

    该属性控制语音识别的语言，将其设置为英文，那么它就会以英文来识别出你所说的话。

* `e.results[0].isFinal`

    该值代表当前段的话有没有说完，当你在说话的时候，该值一直未false，但你停止时，该值变为true。可以用来判断是否为一段话，如本例中，当一段话结束时就会新建一个段。

    > 类似的配置属性还有很多，建议查看[MDN手册](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)学习。

以上就是第20天的全部内容。