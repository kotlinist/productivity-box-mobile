<script>
import { removeCalendarTask, updateCalendarTask } from './../../../../../api/todo.js';
import { press } from 'svelte-gestures';

import { createEventDispatcher, onMount } from 'svelte';
const dispatch = createEventDispatcher();

let completeSound;

onMount(async () => {
	completeSound = new Audio('/static/sounds/done/chime-notification-alert_C_major.wav');
});

export let task = {};
export let selectedDate;
</script>

<div
	class="glassmorphism-50 habit px-4 py-2 rounded-xl bg-white/80 border border-slate-200/80 shadow">
	<i
		on:click="{() => {
			if (task.completed == false) completeSound.play();
			task.completed = !task.completed;
			updateCalendarTask(selectedDate, task);
			dispatch('updateList');
		}}"
		use:press="{{ timeframe: 300, triggerBeforeFinished: true }}"
		on:press="{() => {
			removeCalendarTask(selectedDate, task.id);
			dispatch('updateList');
		}}"
		class="{!task.completed
			? 'icon-circle-2 text-white text-sm bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-9 h-9 flex justify-center items-center'
			: 'icon-ok-1 text-white text-2xl bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-9 h-9 flex justify-center items-center'}"
	></i>
	<b class="pl-3 text-lg">{task.name}</b>
	<b class="text-blue-600">{task.pomo || 0}/1 <i class="icon-clock-4 text-xl"></i></b>
</div>

<style>
.container {
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 12px;
	width: 100%;
	margin: 0 auto;
}

.habit {
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	margin-top: 6px;
	margin-bottom: 6px;
}
</style>
