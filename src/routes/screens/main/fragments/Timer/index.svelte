<script>
import { onMount } from 'svelte';

import Timer from './Timer.svelte';
import Stopwatch from './Stopwatch.svelte';

let timerTab = 'timer';

onMount(async () => {
	//Check if timer is set (getFromData)
	//Then show timer in pretty format
	//else show timerUI for set timer
});

let activeTab = 'bg-white shadow rounded-full';
let unactiveTab = 'text-blue-100 hover:bg-white/[0.5] hover:text-grey-500 hover:rounded-full';
</script>

<div class="wrapper" style="height: calc( 100vh - 55px); width: 90%; margin: 0 auto;">
	<div class="timer-tabs mb-4 flex p-1 space-x-1 glassmorphism-50 px-2 rounded-full">
		<p
			class="{timerTab == 'timer'
				? activeTab
				: unactiveTab} text-center px-2 w-full py-2.5 text-xl leading-5 font-medium text-blue-700"
			on:click="{() => {
				timerTab = 'timer';
			}}">
			<i
				class="icon-hourglass-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"
			></i> <b>Таймер</b>
		</p>
		<p
			class="{timerTab == 'stopwatch'
				? activeTab
				: unactiveTab} text-center px-2 w-full py-2.5 text-xl leading-5 font-medium text-blue-700"
			on:click="{() => {
				timerTab = 'stopwatch';
			}}">
			<i
				class="icon-stopwatch font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"
			></i> <b>Секундомер</b>
		</p>
	</div>

	{#if timerTab == 'timer'}
		<Timer />
	{:else}
		<Stopwatch />
	{/if}
</div>

<style>
.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.countdown-card {
	margin: 0 auto;
}

.card {
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
}
</style>
