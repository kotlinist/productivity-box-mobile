<script>
import { updateHabit } from '../../../../../api/habits';
import { press } from 'svelte-gestures';
import { createEventDispatcher, onMount } from 'svelte';
const dispatch = createEventDispatcher();

let completeSound;

onMount(async () => {
	completeSound = new Audio('/static/sounds/done/chime-notification-alert_C_major.wav');
});

let checkHabit = (habit) => {
	if (!habit.checked) {
		completeSound.play();
		habit.checked = true;
		updateHabit(habit);
		dispatch('updateList');
	} else {
		habit.checked = false;
		updateHabit(habit);
		dispatch('updateList');
	}
	dispatch('updateList');
};

export let title = '';
export let habits = false;
</script>

{#if habits}
	<div class="container">
		<div class="glassmorphism-50 px-6 py-3 rounded-lg shadow outline-none">
			<b class="text-lg bold">{title}</b>
			<hr
				class="mt-1 mb-3 bg-gradient-to-r from-blue-400 to-indigo-600 border-none h-px rounded-full" />
			{#each habits as habit}
				<div class="habit">
					<i
						on:click="{() => {
							checkHabit(habit);
						}}"
						use:press="{{ timeframe: 300, triggerBeforeFinished: true }}"
						on:press="{() => {
							alert('options');
						}}"
						class="{!habit.checked
							? 'icon-circle-2 text-white text-sm bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-9 h-9 flex justify-center items-center'
							: 'icon-ok-1 text-white text-2xl bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-9 h-9 flex justify-center items-center'}"
					></i>
					<b class="pl-3 text-lg">{habit.name}</b>
					{#if habit.type == 'count'}
						{habit.count}/{habit.target} {habit.unit}
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

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
