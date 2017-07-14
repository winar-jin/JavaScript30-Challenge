> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## day21 - Geolocation

第21天的目的是练习`NavigatorGeolocation.geolocation`这一webAPI的使用，通过使用此API可以访问到设备的位置信息。这允许网站或应用根据用户的位置提供个性化结果。

[线上例子](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/21%20-%20Geolocation/index.html)
**建议打开电脑上移动端的模拟器或者直接用手机体验位置信息**
**该功能仅仅在https模式下才可正常使用**

![Demo](/images/0707-location.png)

## 主要代码
```Javascript
    const arrow = document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data) => {
      console.log(data);
      speed.textContent = data.coords.speed;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    }, (err) => {
      console.error(err);
    });
```
可以看到只要通过调用`navigator.geolocation`的`watchPosition`方法就可以获取到位置的信息。

在此获取到的信息为`data`，以回调函数的形式返回，当获取到位置信息之后，在动态的修改页面中`speed`显示的内容和指南针旋转的角度。


## `Navigator` API的使用与说明

> Geolocation.watchPosition() 用于注册监听器，在设备的地理位置发生改变的时候自动被调用。也可以选择特定的错误处理函数。

> 该方法会返回一个 ID，如要取消监听可以通过  Geolocation.clearWatch() 传入该 ID 实现取消的目的。

> --- [Geolocation API in MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition)

除了`watchPosition()`方法，还有一个`getCurrentPosition()`方法，不过`getCurrentPosition()`方法只可获取一次当前的位置。

这两个方法都可以接受三个参数，第一个参数为成功时得到位置信息时的回调函数，使用`Position`对象作为唯一的参数。；第二个参数为获取位置信息失败时的回调函数，是一个可选项；第三个参数是一个可选的`PositionOptions`对象。

![data](/images/0707-data.png)

返回的数据中`accuracy`代表位置的精确度；`heading`代表指南针应该所指的角度；`latitude`和`longitude`分别代表位置的经纬度；`speed`代表当前位置的高度。

这个练习就到这里结束了，主要还是要学会查看文档，不断的自我学习。💪

→ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)