// 获取所有的页面元素
let video = document.querySelector('.viewer');
let progress = document.querySelector('.progress');
let toggle = document.querySelector('.toggle');
let player__slider = document.querySelectorAll('.player__slider');
let skip = document.querySelectorAll('.data-skip');

// 实现函数
function videoplay(e){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handlePlayerSlider(e){
    console.log(e.target.name);
    console.log(e.target.value);
    video[e.target.name] = e.target.value;
}

// 事件监听
video.addEventListener('click',videoplay);
video.addEventListener('click',handleToggle);
toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);
let mouseflag = false;
player__slider.forEach(item => item.addEventListener('click',handlePlayerSlider));
player__slider.forEach(item => item.addEventListener('mousedown',() => mouseflag = true));
player__slider.forEach(item => item.addEventListener('mouseup',() => mouseflag = false));
player__slider.forEach(item => item.addEventListener('mousemove',(e) => {
    mouseflag && handlePlayerSlider(e)
}));