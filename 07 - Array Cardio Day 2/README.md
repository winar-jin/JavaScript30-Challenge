> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day07 - Array Cardio Day 2

第七天的练习是接着之前day04的练习，继续熟练数组的方法，依旧没有页面显示效果，所以请打开浏览器的Console面板进行调试运行。

[效果如下(请打开Console面板查看)](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/07%20-%20Array%20Cardio%20Day%202/index.html)

## TaskList
网站给了两个数组，分别为people数组和comments数组，如下：
```JavaScript
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
```
在此两数组的基础上实现一下几个操作：
1. 是否至少有一人年满19周岁？
2. 是否每一个人都年满19周岁？
3. 是否存在id=823423的评论？
4. 找到id=823423的评论的序列号(下标)。
5. 删除id=823423的评论。


## Answers

1. `Array.prototype.some()`

```JavaScript
const isAdult = people.some(function(person){
  const currentYear = new Date().getFullYear();
  if(currentYear - person.year >= 19){
    return true;
  }
});
console.log({isAdult});
```

`.some(callback)`函数测试数组中的每一项是否满足传入函数，只要有一项满足就返回true，否则返回false。
回调函数有三个参数，分别为`currentValue`，`index`，`array`,分别代表待传入的值，当前元素在数组中的下标，传入的数组。
在这里可以使用ES6的箭头函数对结果进行简化，如下：
```JavaScript
const isAdult = people.some(person => (new Date().getFullYear() - person.year) >= 19 );
console.log({isAdult});
```
> [参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

2. `Array.prototype.every()`

```JavaScript
const everyAdult = people.every(person => (new Date().getFullYear() - person.year) >= 19);
console.log({everyAdult});
```
`.every(callback)`函数测试数组中的每一项是否满足传入函数，只有所有的项都满足才返回true，否则返回false。
回调函数有三个参数，分别为`currentValue`，`index`，`array`,分别代表待传入的值，当前元素在数组中的下标，传入的数组。

> [参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

3. `Array.prototype.find(callback)`

```JavaScript
const findComment = comments.find(comment => comment.id === 823423);
console.log(findComment);
}
```
`.find(callback)`函数测试数组中的每一项是否满足传入函数，如果找到满足传入函数的值，就传回该值，否则返回undefined。
回调函数有三个参数，分别为`currentValue`，`index`，`array`,分别代表待传入的值，当前元素在数组中的下标，传入的数组。

> [参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

4. `Array.prototype.findIndex()`

```JavaScript
const findCommentIndex = comments.findIndex(comment => comment.id === 823423);
console.log(findCommentIndex);
```

`.findIndex(callback)`函数测试数组中的每一项是否满足传入函数，如果找到满足传入函数的值，就传回该值所在的下标，否则返回-1。
回调函数有三个参数，分别为`currentValue`，`index`，`array`,分别代表待传入的值，当前元素在数组中的下标，传入的数组。

> [参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

5. `Array.prototype.splice()`

```JavaScript
comments.splice(findCommentIndex,1);
```
`.splice()`方法，是一个十分强大的方法，既可以删除一个数组中的若干项，也可以向数组中某个位置添加若干项，语法如下`array.splice(start, [deleteCount], [item1, item2, ...])`,start代表从什么位置开始改变这个数组，从0开始索引；deleteCount代表要删除的个数，可选的；[item1, item2, ...]代表向数组中添加的元素；若deleteCount=0,又有[item1, item2, ...]存在，就可以实现在指定位置添加元素的效果；如果deleteCount=(some number)，且无[item1, item2, ...]，就可以从数组中删除若干个元素。但是此方法是对原数组进行改变，经过`.splice()`方法处理后，原数组回丢失，因此再采用以下方法实现删除操作，而不损坏原数组。
```JavaScript
const newComments = [
    ...comments.slice(0,findCommentIndex),
    ...comments.slice(findCommentIndex+1)
]; 
```
新建一个数组，从`comments`中剪切走需删除元素的前和后面的所有元素即可。在此新建的数组汇总加入两个数组，再用ES6的`...`扩展语法打开。

> [.splice()参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
> [.slice()参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

至此就完成了。关于数组的操作，建议多看看数组相关的[参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)，多多使用，就没有问题的。