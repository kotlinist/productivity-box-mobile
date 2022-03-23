<script>
import { onMount } from 'svelte';

let ticker;
let timer = 25 * 60;

let pretty;

onMount(async () => {
	//Check if timer is set (getFromData)
	//Then show timer in pretty format
	//else show timerUI for set timer

	// let secs = timer;
	// let mins = Math.floor(timer / 60);
	// secs %= 60;
	// pretty = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
	pretty = '25:00';
});

function startTimer(secs) {
	if (ticker) clearTimeout(ticker);
	timer = parseInt(secs);
	tick();
	ticker = setInterval(() => {
		tick();
	}, 1000);
}

function tick() {
	var secs = timer;
	if (secs > 0) {
		timer--;
	} else {
		clearInterval(ticker);
	}

	let mins = Math.floor(secs / 60);
	secs %= 60;
	pretty = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
}
</script>

<div class="task-selection-card">
	<div class="card glassmorphism-50 px-10 py-7 mb-6 rounded-lg shadow outline-none text-center">
		<b class="bold text-xl">Выберите задачу</b>
		<i
			class="icon-right-big text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full w-8 h-8 flex justify-center items-center"
		></i>
	</div>
</div>
<div class="countdown-card">
	<div class="glassmorphism-50 px-10 py-7 mb-6 rounded-lg shadow outline-none text-center">
		<b class="bold text-6xl">{pretty}</b>
	</div>
</div>
<div class="flex items-center justify-center">
	<button
		class="glassmorphism-50 text-blueGray-500 active:bg-blue-50/75 font-bold text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-250"
		type="button"
		on:click="{() => {
			startTimer(timer);
		}}">
		<i class="icon-stopwatch"></i> <b class="bold">Начать помодоро сессию</b>
	</button>
</div>

<style>
.card {
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
}
</style>
