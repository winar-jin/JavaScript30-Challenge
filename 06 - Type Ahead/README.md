> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行联系，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day06 - Type Ahead

第六天的练习是通过在输入框中输入一个词，能够迅速匹配出含有这个词的城市名称或者州名，城市的来源是通过加载页面时从网络中异步获得的JSON数据。

[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/06%20-%20Type%20Ahead/index.html)

## 数据请求
```JavaScript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
```
* [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

之前，在做数据请求的时候，XMLHttpRequest一直倍受Web开发者的青睐，无论是直接或者是间接，我们通常使用的Ajax技术就是基于XMLHttpRequest的，而Fetch API是一种新的致力于替代XMLHttpRequest的技术。

Fetch API 提供了获取资源（包括通过网络获取资源）的接口。Fetch API提供了一个fetch()方法，它被定义在BOM的window对象中，你可以用它来发起对远程资源的请求。

fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 promise 对象，resolve 对应请求的 Response。你也可以传一个可选的第二个参数—— init（参考[Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)）

Fetch API 的基本语法如下：
`fetch(input, init).then(function(response) { ... });`

更详细的Fetch API的相关内容，请参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)。

通过请求获取到数据后，将其存在`cities[]`数组中，以便后续使用。由于我们在`.then(dta)`中获取到的`data`已经是一个数组，我们想要把他存储在`cities[]`数组中,使用了ES6 中的数组扩展语法。

* [数组扩展语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)
扩展语法允许在需要多个参数（用于函数调用）或多个元素（用于数组文本）或多个变量（用于解构分配）的位置扩展表达式。
基本语法如下：`myfunc(...iterableObj)`,也可用于数组字面量，用法如下：`[...iterableObj,4,5,6]`。
更详细的关于扩展语句的相关内容，建议参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)。

## 数据处理 
```Javascript
function findCity(searchString,cities){
  const regx = new RegExp(searchString,'gi');
  //return cities.filter(item => item.city.includes(searchString) || item.state.includes(searchString));
  return cities.filter(item => (item.city.search(regx) !== -1) || (item.state.search(regx) !== -1));
}
```

当我们获取到了保存所有城市信息的数组`cities[]`之后，就可以根据输入的字符串，挑选出包含该字符串的城市名或州名。

此处使用了正则表达式进行匹配，`.search(RegExp)`，若查找不到则返回`-1`,否则返回字符串中第一次出现满足正则表达式的位置下标。

对于`cities[]`数组来说，则使用`.filter()`方法，返回满足条件的项。

## 数据展示
```Javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function displayCity(){
  const searchRusult = findCity(this.value,cities);
  const regx = new RegExp(this.value,'gi');
  const dom = searchRusult.map(item => {
    const city = item.city.replace(regx,`<span class="hl">${this.value}</span>`);
    const state = item.state.replace(regx,`<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${city},${state}</span>
        <span class="population">${numberWithCommas(item.population)}</span>
      </li>
      `;
      }).join('');
  suggestions.innerHTML = dom;
  if(this.value == ''){
    suggestions.innerHTML = `
    <li>Filter for a city</li>
      <li>or a state</li>`;
  }
}
```

通过`findCity(searchString,cities)`方法返回满足条件的城市字符串数组，并对查找字符串进行格式化，添加`.hl`类，此处使用正则表达式进行替换，`.replace(RegExp,newString)`,可以将满足正则表达式的字符串替换为新的字符串，此处也使用了ES6的模版字符串。

`findCity(searchString,cities)`返回的是一个数组，我们将数组中的每一项映射为可以插入文档中的HTML代码，也即`<li>
        <span class="name">${city},${state}</span>
        <span class="population">${numberWithCommas(item.population)}</span>
      </li>`，再使用数组的`.join('')`方法可以将数组的每一项连接为一个字符串，_`.join('')`需要一个连接符，默认是','(逗号),如果想要平滑连接的话，其参数不能省略不填，应填'',否则按默认处理。_

还有对右侧人口数字的格式化处理，三位数字用一个','(逗号)隔开，仍采用正则表达式的`.replace(RegExp,newString)`方法实现，具体见`numberWithCommas(x)`函数。

最后将其插入到DOM文档中即可。

## 事件监听
```Javacript
const searchContent = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchContent.addEventListener('change',displayCity);
searchContent.addEventListener('keyup',displayCity);
```
最后就是要对DOM节点进行监听，同时监听`input`框的`change`事件和`keyup`事件，就可以实时的输出最新的结果。

## Tip

在Console面板下进行调试时，我们常用的是`consol.log()`，但是假如我们需要不断的调试，就需要多次使用`console.log`，每次都输入难免有些繁琐。于是，我们可以使用一种简洁的方法来输入`console.log`，就是**`window.log = window.console.log;`**，这样我们在调试的时候，只用输入`log(*)`就可以进行调试了，方便了不少。

OK，至此为止，day06就算是完成了。👍