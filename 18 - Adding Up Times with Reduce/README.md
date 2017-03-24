> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day18 - Adding Up Times with Reduce

第十八天也是一组数组操作，目的是将一个元素是时长的数组，算出其中的总时长，为多少小时，分钟，秒。
[代码参考](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/18%20-%20Adding%20Up%20Times%20with%20Reduce/index.html)。
## 主要思路
### js代码
```javascript
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    return (mins * 60) + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```

这次的练习也不算难，记下几个需要注意的点。
* `document.querySelectorAll()`: 返回的元素是`nodeList`类型的。并不是真正的数组类型，因此要想使用数组类型的`.map()`或`.reduce()`等方法，需将其转换为数组类型，常见有以下两种转换方法：
  1.  `Array.from(document.querySelectorAll());`:运用数组类型的方法，将可迭代的元素转换为数组。
  2.  `[...document.querySelectorAll()]`:运用ES6中的拓展语法，将nodeList中的每一项展开到数组中。

* `const [mins, secs] = timeCode.split(':').map(parseFloat);`:这段代码的作用是将时间戳（“5:40”）先以：分开，得到['5','40']这个数组，但是使用`.split(':')`分开的两项分别都是字符串，然后使用`.map(parseFloat)`将这两个字符串转换为float类型。

`.map(parseFloat)`等同于以下写法：
```javascript
.map(function(data,i){
  return parseFloat(data);
});
```
将数组的类型map为float数字类型。

最后再分别将这数组的两项赋值给[mins, secs]，这里使用的是ES6的解构的方法。

[结构赋值参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)


* 在将所有的时间都分别转化为秒数，并累加到seconds后，将其对3600取整后就可以得到小时数，取余得到除了小时后剩下的秒数。

再用剩下的秒数，对60取整后就得到分钟数，取余就得到最后剩下的秒数。

这样就可以得到最后得到的小时，分钟，秒数了。

OK，这样就可以啦！😀