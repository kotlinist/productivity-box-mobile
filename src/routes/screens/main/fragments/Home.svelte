<script>
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/index.js';
import { homeScreenFragment } from './../../../../stores.js';
import { onMount } from 'svelte';

import ToDo from './ToDo/ToDo.svelte';
import Timer from './Timer/index.svelte';
import Habits from './Habits/Habits.svelte';

let sleepTime = [21, 22];

let greeting = (name) => {
	let hour = new Date().getHours();
	switch (true) {
		case sleepTime.includes(hour):
			return `Спокойной ночи, ${name}!`;

		case hour >= 3 && hour < 12:
			return `Доброе утро, ${name}!`;
		case hour >= 12 && hour < 16:
			return `Добрый день, ${name}!`;
		case hour >= 16 && hour < 23:
			return `Добрый вечер, ${name}!`;
		case [23, 24, 0, 1, 2].includes(hour):
			return `Доброй ночи, ${name}!`;
	}
};

let now = new Date();

let response = 'test';

onMount(async () => {
	setInterval(() => {
		now = new Date();
	}, 1000);
});

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<div class="wrapper" style="height: calc( 100vh - 55px);">
	<div class="greeting-card">
		<div class="glassmorphism-50 px-6 py-3 mb-6 rounded-lg shadow outline-none">
			<div class="flex items-center justify-center text-4xl bold">
				<b>{format(now, 'HH:mm:ss')}</b>
			</div>
			<div class="date flex items-center justify-center text-xl">
				{capitalizeFirstLetter(format(now, 'EEEE, dd.MM.yyyy', { locale: ru }))}
			</div>
			<hr
				class="mt-1 mb-3 bg-gradient-to-r from-blue-400 to-indigo-600 border-none h-px rounded-full" />
			<div class="greeting flex items-center justify-center">
				<img src="/kotlinist.jpeg" class="rounded-full" style="height: 60px;" />
				<b class="ml-4 text-xl bold">{greeting('Kotlinist')}</b>
			</div>
		</div>
	</div>

	<div class="container">
		<div
			class="todo card glassmorphism-50 px-6 py-3 rounded-lg shadow outline-none"
			on:click="{() => {
				$homeScreenFragment = ToDo;
			}}">
			<div class="card_icon bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 shadow">
				<i class="icon-check" style="padding-left: 2px;"></i>
			</div>
			<b class="ml-4 text-lg">Задачи</b>
			<i
				class="icon-right-big text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full w-8 h-8 flex justify-center items-center"
			></i>
		</div>

		<div
			class="habits card glassmorphism-50 px-6 py-3 rounded-lg shadow outline-none"
			on:click="{() => {
				$homeScreenFragment = Habits;
			}}">
			<div class="card_icon bg-gradient-to-r from-yellow-400 to-orange-400 shadow">
				<i class="icon-star"></i>
			</div>
			<b class="ml-4 text-lg">Привычки</b>
			<i
				class="icon-right-big text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full w-8 h-8 flex justify-center items-center"
			></i>
		</div>

		<div
			class="timer card glassmorphism-50 px-6 py-3 rounded-lg shadow outline-none"
			on:click="{() => {
				$homeScreenFragment = Timer;
			}}">
			<div class="card_icon bg-gradient-to-r from-green-400 to-emerald-500 shadow">
				<i class="icon-clock-4"></i>
			</div>
			<b class="ml-4 text-lg">Таймер</b>
			<i
				class="icon-right-big text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full w-8 h-8 flex justify-center items-center"
			></i>
		</div>
	</div>
</div>

<!-- ---------- -->
<style>
.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.greeting-card {
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 12px;
	width: 90%;
	margin: 0 auto;
}

.container {
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 12px;
	width: 90%;
	margin: 0 auto;
}

.greeting b {
}

.card {
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
}

.card_icon {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	width: 60px;
	/* display: table-cell; */
	/* text-align: center; */
	/* vertical-align: middle; */
	border-radius: 50%; /* may require vendor prefixes */
	color: #fff;
	font-size: 32px;
}

@media (min-width: 600px) {
	.container {
		grid-template-columns: 1fr 1fr;
	}

	.greeting-card {
		width: auto;
		padding: 100px;
	}
}
</style>
