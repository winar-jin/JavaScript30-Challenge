> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day10 - Hold Shift and Check Checkboxes

第十天的练习是要做一个按住shift键对checkbox的多选功能，这部分语言技术上没有什么难点，主要在于思路，以下也仅仅是一种实现，可能会有更多或者更好地实现。

[效果如下](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index.html)

## 完整代码
```Javascript
const checkboxes = document.querySelectorAll('input[type=checkbox]');
  let lastone ;  //标识最近点击的那一个元素
  let inbetween = false; //判断是否在两个所点击元素的中间

  function sheckhandle(e){
	  // 只有当shift键按下，处于选中状态的时候，不是第一个页面元素，并且上一个点击的元素处于选中状态的时候，才触发多选事件
    if(e.shiftKey && this.checked && lastone && lastone.checked){
      checkboxes.forEach(checkbox => {
        if(checkbox === this || checkbox === lastone){
	        inbetween = !inbetween;
        }
       if(inbetween && this !== lastone){
          checkbox.checked = true;
        }
      });
	}
    if(this.checked){
      lastone = this;
    }
  }
	// 对每一个checkbox进行点击事件监听
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click',sheckhandle);
  });
```

## 思路介绍
* 首先应该获取到页面的checkbox元素，并对其中的每一个checkbox进行单击事件监听，并触发sheckhandle函数。
```Javascript
const checkboxes = document.querySelectorAll('input[type=checkbox]');
// 对每一个checkbox进行点击事件监听
checkboxes.forEach(checkbox => {
checkbox.addEventListener('click',sheckhandle);
});
```
* 由于要多选出两个checkbox之间的元素，因此必定要设置一个变量存储第一个checkbox，在此设为`lastone`，只有当`lastone`存在并处于选中状态，并且再次点击使该元素处于选中状态，并同时同时按下`shift`键时，才能继续执行，选中中间的元素。
* 若要想知道哪些元素在两个元素中间，可以通过是指一个flag标识，此例为`inbetween `，默认为false，表示不在两元素中间。遍历所有的checkbox，当遇到`lastone`和`this`时，将`inbetween `的值取反，这样就可标出哪些在两元素中间，哪些不在。
* 但仅仅这样的话有一个问题就是，当我直接按住`shift`键点击页面上的一个元素的时候，该元素以下的所有元素都会被选中，只是因为`this`和`lastone`相同，他只将`inbetween `的值取反一次，所以该元素以下的所有元素全部会被选中。所以在将中间元素都选中的时候，加上一个判断，`this !== lastone`即可。
* 已经筛选出了哪些元素在所选两元素中间，哪些元素不在，就可以设置选中状态了，当`inbetween `为`true`时，将checkbox设置为选中状态。
* 完整代码如上所示，查看效果可点击页面开始处的链接。

至此，练习十就完成了。✌️