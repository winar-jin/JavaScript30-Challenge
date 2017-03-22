> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day17 - Sort Without Articles

第十七天的主要操作是对数组进行排序。将乐队按照乐曲名称进行排序，曲名前面的a/an/the不参与排序。
[代码参考](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/17%20-%20Sort%20Without%20Articles/index.html)。
## 主要思路
### js代码
```javascript
const bandsele = document.querySelector('#bands');
// 取消每一个字符串的开头的a|an|the
function strip(str){
  return str.replace(/^(a |an |the )/ig,'').trim();
}

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// 获取到已经排过序的数组
const sortedBands = bands.sort((a,b) => strip(a) > strip(b) ? 1 : -1);
bandsele.innerHTML = 
  sortedBands
    .map(band => `<li>${band}</li>`)
    .join('');
```

本章的练习相对比较简单，记下几个重要的点。
* `Array.prototype.replace()`: 用在函数`strip`中，目的书先取出乐队名称前面的a/an/the后在进行排序。

[→参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

replace可以接受两个参数，第一个参数可以是一个__正则表达式__或者__带替换子串__，第二个参数为__新字符串__或者__函数（调用它能够产生新的子串）__。返回替换之后的新字符串。

* `Array.prototype.sort()`：对产生的新的乐队名称进行排序，可以自定义一个__排序函数__，规定该排序函数的比较规则。
[→参考文档](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

差不多就是这样了。