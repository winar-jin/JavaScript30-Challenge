# > 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day15 - LocalStorage

第十五天主要是练习LocalStorage（本地存储）以及时间委托的使用，使用场景是一个简单的todo list的应用，实现基本的添加item，切换完成状态，将所有todo项存储在localstorage中，保证刷新浏览器后数据不丢失。线上 [代码参考](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/15%20-%20LocalStorage/index.html) ，且实现的样式如图所示。
![todolist](http://7xss68.com1.z0.glb.clouddn.com/blog/post/todolist.png)
## 主要思路
* 提前预定义好所有用到的变量；
```Javascript
const addItems = document.querySelector('.add-items'); // 添加item的按钮
const itemsList = document.querySelector('.plates'); // todolist列表
const items = JSON.parse(localStorage.getItem('items')) || []; // 本地缓存的所有todoitem
```
* 为addItems按钮添加事件函数，添加一个新的todo item并存储到本地缓存；
* 监听checkbox的点击事件，切换是否完成的状态，并更新本地存储，保证刷新本页面是数据不会丢失；
* 分别设置两个监听器，监听addItems的submit事件，和itemsList的点击事件；

## 添加item事件
* 添加item的主要代码如下

```Javascript
function addItem(e) {
  e.preventDefault(); // 阻止默认事件的触发，防止在提交后页面自己刷新
  const text = this.querySelector('[name=item]').value;
  const item = {
    text, // ES6的简写形式 => text = text;
    done: false
  };
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  this.reset(); // 添加完数据后，重置输入框      
}
addItems.addEventListener('submit', addItem);
```
* 监听addItems的submit事件，当用户点击`enter`或者点击右侧的submit按钮的时候触发；
* `text,`是ES6的缩写形式，即代表`text = text；`
* localStorage的常用API：
	* localStorage.setItem(‘key’,value); -> 设置本地缓存，以key-value的形式
	* localStorage.getItem(‘key’); -> 根据参数key取得本地缓存中对应的值
	* localStorage.clear();  -> 清空本地的缓存
	* localStorage.removeItem(‘key’); -> 删除key所对应的那一条本地缓存
* ‼ localStorage中只能存储字符串，所以我们经常会用到： `JSON.stringify(object)`将一个对象转换为字符串，再使用`JSON.parse(objSting)`将一个对象字符串转换为对象
* `this.reset();`代表将表单重置，清空表单中的值，在我们进行了一次submit之后，如果不重置表单的话，表单中的值将不会消失，这将大大影响用户体验

## 切换完成状态事件
```Javascript
function toggleDone(e) {
  // if(!e.target.nodeName.match('INPUT')) return;
  if (!e.target.matches('input')) return; // 跳过所有的input，只处理label
  const node = e.target;
  const index = node.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}
itemsList.addEventListener('click', toggleDone);
```
* 此处使用到了事件委托，所谓事件委托，我是这么理解的：
	* 假设我们队一个input列表进行了时间监听，但我们如法保证，此列表在接下来的状态下是否进行了更新，刷新等改变原来节点的操作，如果有这样的操作出现，那么我们之前的事件监听器就无法再起到监听的作用；
	* 但我们可以对input列表的父元素进行事件监听，让它们的父元素处于监听状态，当我们所点击的元素是其子元素的话，就告诉它的子元素，执行相应的事件；
	* 相当于委托父元素帮我们监听所有子元素，这样无论子元素列表进行怎么样的更新，改变，只要父元素节点不发生改变就可以持续起到监听的 作用。
	* 通过`e.target.matches('input')`可以判断所点击的元素是不是input元素，`e.target`返回所点击的宿主元素。
* 通过获取到所点击的列表的序号，更改其`done`属性，更新后进行存储，就可以实现完成状态的事件。

## 列表显示函数
```Javascript
function populateList(populates = [], place) { // 设置默认值，防止传参数出错的时候crash
  place.innerHTML = populates.map((populate, index) => {
    return `
      <li>
        <input type="checkbox" id=item${index} data-index=${index} ${populate.done ? 'checked' : ''}>
        <label for="item${index}">${(populate.text)}</label>
      </li>
    `; //之所以用‘’空字符是因为如果用null的话，会出现在html中
  }).join(''); // join()之后一定要加''，表示空字符，否则会加入逗号，造成错误  
}
```
* 将所有的列表项转化为li传入页面的html中
* 将此函数抽象出来，以方便以后实现同样类似的操作，将一个数组中的元素动态添加到页面的一个节点中

## 清除缓存
```Javascript
// 在关闭浏览器之后清除缓存
    window.onbeforeunload = function (e) {
      localStorage.removeItem('items');
      // let confirmationMessage = "\o/";
      e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      // return confirmationMessage; // 如果有返回值的话，就会弹出确认框。
    };
```
* 有些时候，我们仅仅是为了练习localStorage的使用，并不想在浏览器中留下过多的缓存，那么这个方法就派上了用场。
* 当页面重新刷新或者关闭之前，执行`localStorage.removeItem('items’);`清除页面的缓存。
* ！慎用，尤其在生产环境中。

## 整体代码架构
```Javascript
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) { ... }

function populateList(populates = [], place) { ... }

function toggleDone(e) { ... }

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
```
* 在页面加载的时候，先获取本地缓存的items，若存在就传给变量items，若第一次登录或者无item，初始化为空数组；
* 在页面加载的时候先加载页面的所有todolist，执行一遍`populateList(items, itemsList);`函数即可。

至此，这个练习就完成了！😀