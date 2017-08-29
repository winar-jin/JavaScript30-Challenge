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
	const seconds = parseInt(this.minutes.value * 60, 10);
	timer(seconds);
	this.reset();
}, false);