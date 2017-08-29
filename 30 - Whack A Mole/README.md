> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。


第30天，最后一天的任务是完成一个打地鼠游戏。

> [线上DEMO](https://github.com/winar-jin/JavaScript30-Challenge/blob/master/30%20-%20Whack%20A%20Mole/index.html)

## 源码
```Javascript
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    let lastHole;
    let timeUp = false;
    let score = 0;
    function randomTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
      const index = Math.floor(Math.random() * holes.length);
      const hole = holes[index];
      if (lastHole === hole) {
        return randomHole(holes);
      }
      lastHole = hole;
      return hole;
    }

    function peep() {
      const hole = randomHole(holes);
      const time = randomTime(200, 2000);
      hole.classList.add('up');
      setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
          peep();
        }
      }, time);
    }

    function startGame() {
      timeUp = false;
      scoreBoard.textContent = 0;
      score = 0;
      peep();
      setTimeout(() => {
        timeUp = true;
      }, 10000)
    }

    function bonk(e) {
      if (!e.isTrusted) {
        return;
      }
      score ++;
      this.parentNode.classList.remove('up');
      scoreBoard.textContent = score;
    }

    moles.forEach(mole => {
      mole.addEventListener('click', bonk, false);
    });
```

## 思路提示
要完成打地鼠的游戏，首先肯定需要一个随机的地鼠从洞中出现随机的一段时间，因此就是`randomTime`和`randomHole`两个函数。

地鼠的出现是由CSS控制的，拥有一个属性`transition:all 0.4s;`，刚开始地鼠的`top`的值是`100%`，当随机到某一个地鼠出现的时候，将其`top`的值变为`0`，再加上`transition`属性的作用，就会有一个动画的效果，然后再随机的时间内取消这个类`up`，即可使地鼠消失。

然后，就可以设置开始游戏了，在开始游戏`startGame`函数中，我们首先初始化各个参数，包括是否到时间`timeUp`，成绩版上的成绩设置为`0`，计分变量初始化为`0`。然后，就开始使地鼠出现，最后设置一个计时器，我们定义游戏十秒后结束，即在10秒后，将`timeUp`变量设置为`true`。

最后，要对各个地鼠进行点击事件监听，当点击地鼠时，分数加一，并即时显示在页面顶部的计分板中，并且若我们点击了某一个地鼠，要立即使该地鼠消失，不必等到随机的时间到了再取消。

## 部分代码解析
* `e.isTrusted`：返回一个布尔值,表明当前事件是否是由用户点击触发(比如说真实的鼠标点击触发一个click事件), 还是由一个脚本生成的，防止用户作弊。

* `Math.round(Math.random() * (max - min) + min);`：记得之前也用到过，想要生成某个范围里的随机数，用大值减小值，再加上小值即可。

* `if (lastHole === hole) { return randomHole(holes); }`：这段代码的意思是，防止两次随机产生的洞穴相同，我们在第一次产生洞穴时将其存储起来，第二次再次产出一个洞穴的时候，若和上次的洞穴相同，则再次执行随机产生洞穴函数，保证前后两次产生的洞穴不同。

END! 💯