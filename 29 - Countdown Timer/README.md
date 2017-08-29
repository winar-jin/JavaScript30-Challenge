> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。


第29天的练习是一个倒计时的效果。

> [线上DEMO](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/29%20-%20Countdown%20Timer/index.html)

## 源码
```Javascript
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	// before start new timer, clear all exist timers
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secondLeft = Math.round((then - Date.now()) / 1000);
		// if the secondLeft is less than 0,wo shoule stop it
		if (secondLeft < 0) {
			clearInterval(countdown);
			return;
		}
		// display the time
		displayTimeLeft(secondLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds<10?'0':''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hours = end.getHours();
	const minutes = end.getMinutes();
	const adjustHours = hours > 12 ? hours - 12 : hours;
	endTime.textContent = `Be back At ${adjustHours}:${minutes<10?'0':''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time, 10);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer, false));

document.customForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const seconds = parseInt(this.minutes.value, 10);
	timer(seconds);
	this.reset();
}, false);
```

## 思路提示
要实现一个类似的倒计时的效果，首先需要一个能够根据终点时间的计时函数，也就是代码中的`timer`函数，该函数中有一个计时器，每秒触发一次倒计时的页面的更新。

需要根据剩余的时间对界面进行更新，需要一个`displayTimeLeft`函数，该函数将剩余的秒数，转化为`时:秒`的形式，并展示在html页面中。

同时需要在页面中告知倒计时将在何时结束，再添加一个`displayEndTime`函数，该函数接受一个结束时间的时间戳，通过该该时间戳，可以获得倒计时结束的时、分信息，并将其展示在页面中。

由于在页面中添加了几个方便用户操作的按钮，所以需要对按钮分别进行监听，由于在每个按钮的html中加了自定义`data-time`属性，因此可以通过`button.dataset.time`获得点击该按钮的所需倒计时时间，在将该时间（秒）传给`timer`函数即可。

页面的右上角还有一个使用户输入需要多少时间的倒计时的输入框，因此也需要对该输入框进行事件监听，监听其`submit`事件，由于submit事件默认会使页面刷新，并将该值加在链接后面，因此我们需要阻止默认事件的触发（`e.preventDefault()`），再将获取到的分钟的值乘60转换为秒后传给`timer`函数即可。

## 部分代码解析

* `document.customForm`：假如html文档中的form表单或者`input`元素有`name`属性，我们可以通过`document.[name]`来获取该DOM元素，此例中可以通过`document.customForm.minutes`获取`name`属性值为`minutes`的`input`元素。

* 这次在写代码时又犯了老错误，再次提醒：ES6的箭头函数会默认绑定父级作用域，因此在事件监听中的事件监听器中，若要用到`this`的值，切记要注意，使用`function() {}`形式的匿名函数，以防止发生错误。

* ``Be back At ${adjustHours}:${minutes<10?'0':''}${minutes}`;`：由于当秒数小于10时，会显示9，8，7...，但是我们想让它显示为双位数，如09，08，07...这样，因此而进行一个判断，若秒数小于10，在秒数前面加上0。

* `Date.now();`：显示当前时间的时间戳，等同于`(new Date()).getTime()`。

* 在`timer`函数中，将定时器的标识存储在了`countdown`变量中，因为我们只是在当秒数小于0时才清楚计数器，因此，会造成这样的一个bug，当我们点击页面顶部的按钮时，倒计时剩余时间会来回的跳动，因为没点一次，就会创建一个计时器，只要它没有小于0，就不会被清除，因此会来回闪。因此，我们在`timer`函数的开始就先清除所有的计时器，`clearInterval(countdown);`。

* `const buttons = document.querySelectorAll('[data-time]');`：`[]`是属性选择器，会选择所有的具有`data-time`属性的元素。

*  在`timer`函数中，我们调用了两次`displayTimeLeft(seconds);`，是因为想让界面从倒计时开始显示，而不是直接就显示少一秒。例如：10，9，8，7...，而不是9,8,7...。

END! 💯