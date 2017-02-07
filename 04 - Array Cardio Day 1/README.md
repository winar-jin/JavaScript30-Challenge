> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行联系，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day04 - Array Cardio Day 1

第四天的练习是能够熟练使用Array数组的常用方法，并没有页面显示效果，所以请打开浏览器的Console面板进行调试运行。

[效果如下(请打开Console面板查看)](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/04%20-%20Array%20Cardio%20Day/index.html)

## TaskList

网站给出了一个inventors数组，包含了名、姓、出生日期和死亡日期；以及people数组，包含一组人名，名和姓中间以逗号分隔。在此基础上完成以下练习。

1. 筛选出出生在16世纪（1500-1599年）的发明家。

2. 列出发明家的名和姓的数组。

3. 根据发明家的出生日期，按照从大到小的顺序进行排序。

4. 所有的发明家一共活了多少岁。

5. 按照发明家的年龄大小排序

6. 列出巴黎所有名字中包含'de'的路名。在以下网站提供的信息来做。（https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris）

7. 按照字母表的顺序，将人们的姓氏进行排序。

8. 分别计算出包含每一个种类的个数。

## Answers

1. `Array.prototype.filter()`

```JavaScript
const bornInsixteen = inventors.filter(function(inventor,index,array){
      return (inventor.year >= 1500)&&(inventor.year <= 1599);
    }); 
console.table(bornInsixteen);
```

筛选操作，filter(callback),filter中有一回调函数，若数组中某一项满足回调函数的条件，返回true，否则返回false；最后由返回true的项组成新的数组。
在这里可以使用ES6的箭头函数对结果进行简化，如下：
```JavaScript
const bornInsixteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
console.table(bornInsixteen);
```

2. `Array.prototype.map()`

```JavaScript
const inventorName = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.log(inventorName);
```
映射操作，将数组中的每一个元素都经过callback函数处理后，返回新的元素，由这些新的元素组成新的数组。
__这个方法适用于创建包含的项与另一个数组一一对应的数组。__
在这里直接使用ES6的箭头函数来书写，并用了模板字符串，这两个知识点在之前篇章有提过，不再赘述。

3. `Array.prototype.sort()`

```JavaScript
function compare(value1,value2){
    if(value1.year > value2.year){
        return 1;
    }else{
        return -1;
    }
}
const sortByBirthdate = inventors.sort(compare);
console.table(sortByBirthdate);
```
比较操作，首先自定义比较函数，分别传入数组中前后两项，__如果期望排序后第一个参数的值出现在第二个参数之前，则应返回负数。__
据此可以写出此自定义排序函数，再根据ES6的箭头函数，以及三目运算符对上述代码进行简化如下：
```JavaScript
const sortByBirthdate = inventors.sort((value1,value2) => (value1.year > value2.year)?1:-1);
console.table(sortByBirthdate);
```

4. `Array.prototype.reduce()`

```JavaScript
var totalYears = 0;
totalYears = inventors.map(inventor => inventor.passed - inventor.year).reduce(function(prev,cur){
    return prev+cur;
},0);
console.log(totalYears);
```

这个思路是这样的：首先使用`.map()`方法映射一个新数组存储每一个发明家的岁数，再调用归并方法`.reduce()`，对所有发明家的年龄相加求总和。
但这个方法并不是最简洁的，首先需要先对`totalYears`进行初始化操作为0，并且需要两个数组方法进行操作，当遇到大数据量的时候显然效率会很低，因此对此方法进行改进。

```JavaScript
const totalYears = inventors.reduce((total,curr) => total += (curr.passed-curr.year),0);
console.log(totalYears);
```

首先该方法只采用归并方法`.reduce()`，但其中回调函数的第一个参数的使用是很绝妙的，表示总年龄`total`，并将其初始化为0，（_`.reduce()`方法的第二个参数为初始值_），回调函数的第二个参数为数组中当前元素，用`curr.passed-curr.year`即可算出当前的年龄，再与total相加即为最终总年龄。

5. `Array.prototype.sort()`

```JavaScript
const sortByLived = inventors.sort((value1,value2) => {
    const value1Age = value1.passed - value1.year;
    const value2Age = value2.passed - value2.year;
    return value1Age > value2Age ? -1 : 1;
});
console.table(sortByLived);
```

此题较为简单，只用自定义排序函数，分别算出每一个发明家的年龄，按照其大小进行排序即可。

6. `.forEach() & .filter()`

```JavaScript
var total = Array.from(document.querySelectorAll('.mw-category .mw-category-group ul li a'));
var allStreet = [];  //存放所有的街道名称
total.forEach(item => allStreet.push(item.innerText));
allStreet.filter(item => item.includes('de'));
//console.log(allStreet);
```
这道题只要找到网页中节点中所对应的元素值，将其转化为数组，就方便很多了，就是在一个元素为字符串的数组中筛选出字符串中包含`de`的即可，采用字符串的`.includes()`方法即可实现，包含返回true，不包含返回false。
这里提醒一点，`allStreet.filter()`返回筛选后的数组后，__会新建一个数组保存，此时如果我们`console.log(allStreet);`会仍然显示原数组，因为筛选出来的元素会被存在新数组中。__
需要提一点，由 querySelectorAll() 获取到的是一个 NodeList ，它并非是 Array 类型的数据，所以并不具有 map 和 filter 这样的方法，所以如果要进行筛选操作则需要把它转化成 Array 类型，使用示例之中的 Array.from() 来转化即可。
当然此题不只有一种方法，还有诸多方法，比如下述方法：
```JavaScript
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));
```

7. `Array.prototype.sort()`

```JavaScript
const sortByAlpha = people.sort((a,b) => {
    const [aFirst,aLast] = a.split(', ');
    const [bFirst,bLast] = b.split(', ');
    return (aLast > bLast) ? 1 : -1;
});
console.log(sortByAlpha);
```

这里通过`String.prototype.split()`方法，将每一个用`, `分开的姓名分开，分别保存，再通过自定义排序函数即可完成按照姓氏顺序排序的任务。

8. `Array.prototype.reduce()`

```JavaScript
const sumTransport = data.reduce((obj,item) => {
if(!obj[item]){
    obj[item] = 0;
}
obj[item]++;
return obj;
},{});
console.log(sumTransport);
```
这道题也是采用了`.reduce()`方法，回调函数的第一个参数也是精巧的地方，设置为一个对象，用来分别存储每一类的数量，第二个参数为当前的元素，如果`obj[item]`不存在，就将其值初始化为0，否则就将改值加1，最后返回该对象，即分别存储了各个类别的数量。

有一点需要注意的是，不要忘记给`.reduce()`方法的第二个参数设置初始值，因为改方法最终新建了一个自定义对象，因此，其初始值也应为一个空的对象。

## Tip

在Console面板下进行调试时，我们常用的是`consol.log()`，但`console`还有一个方法也十分好用，是`console.table()`，该方法会将待调试的内容以表格的形式打印出来，看上去十分明了。
但是，并不是什么时候都能用`console.table()`的，如果待显示内容不能够用表格的形式表示，就什么也不会输出，__此时千万不要以为是没有输出结果，很有可能只是调试的方法错了，换一下`console.log()`兴许就会得到结果了。__

到这里，这八道题都已经写完了，这几道题都非常的经典，有很多值得学习的点，比如：`.reduce()`的回调函数第一个参数的设置，我们可以自定义为我们所需要的，配合初始值，可以实现一遍循环的效果；

因此，这些题都值得日后再看几遍，反复琢磨。