<script>
import { onMount } from 'svelte';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { appData } from '../../../../../stores';
import { getHabits } from '../../../../../api/habits';
import HabitBlock from './HabitBlock.svelte';
import CreateDialog from './CreateDialog.svelte';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';

let habits;

let showDialog = false;

const habit_time = [
	{ id: 1, value: 'anytime', title: 'В любое время' },
	{ id: 2, value: 'morning', title: 'Утром' },
	{ id: 3, value: 'noon', title: 'Днём' },
	{ id: 4, value: 'evening', title: 'Вечером' },
	{ id: 5, value: 'night', title: 'Ночью' }
];

onMount(async () => {
	updateList();
});

let updateList = (e) => {
	habits = groupBy(getHabits(), 'time');
};

const groupBy = (arr, fn) =>
	arr.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, val, i) => {
		acc[val] = (acc[val] || []).concat(arr[i]);
		return acc;
	}, {});
</script>

{#if habits}
	{#each Object.entries(habits) as [time_block, habits_in_block]}
		<div class="container pt-4">
			<HabitBlock
				title="{habit_time[habit_time.findIndex((obj) => obj.value == time_block)].title}"
				habits="{habits_in_block}"
				on:updateList="{updateList}" />
		</div>
	{/each}
{:else}
	<div class="wrapper" style="height: calc( 100vh - 55px);">
		<div class="container">
			<div class="glassmorphism-50 px-6 py-3 rounded-lg shadow outline-none text-center">
				<b class="bold">Вы еще не добавили не одной привычки.</b>
			</div>
		</div>
	</div>
{/if}

<!-- <div class="container pt-8">
	{#if habits?.anytime}
		<div class="glassmorphism-50 px-6 py-3 rounded-lg shadow outline-none">
			<b class="text-lg bold">В любое время</b>
			<hr
				class="mt-1 mb-3 bg-gradient-to-r from-blue-400 to-indigo-600 border-none h-px rounded-full" />
			{#each habits.anytime as habit}
				<div class="habit">
					{#if !habit.checked}
						<i
							on:click="{() => {
								completeSound.play();
								habit.checked = true;
								editHabit(habit);
							}}"
							class="icon-circle-2 text-white text-sm bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-9 h-9 flex justify-center items-center"
						></i>
					{:else}
						<i
							class="icon-ok-1 text-white text-2xl bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-9 h-9 flex justify-center items-center"
							on:click="{() => {
								habit.checked = false;
								editHabit(habit);
							}}"></i>
					{/if}
					<b class="pl-3 text-lg">{habit.name}</b>
					{#if habit.type == 'count'}
						{habit.count}/{habit.target} {habit.unit}
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div> -->

<div class="flex tasks-center justify-center mx-4 mt-2">
	<div class="w-full">
		<div class="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
			<Disclosure>
				<DisclosureButton
					class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-200/40 rounded-lg">
					<span><i class="icon-info"></i> DebugData</span>
					<i class="icon-down-open"></i>
				</DisclosureButton>
				<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800 whitespace-pre">
					{JSON.stringify($appData, null, 4)}
				</DisclosurePanel>
			</Disclosure>
		</div>
	</div>
</div>

<div class="fab_btn">
	<button
		class="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500 h-16 w-16 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250"
		type="button"
		on:click="{async () => {
			// await addHabit(123)
			showDialog = true;
		}}">
		<i class="icon-plus-2 text-white text-3xl"></i>
	</button>
</div>

<CreateDialog on:updateList="{updateList}" bind:showDialog />

<!-- <Dialog open={showDialog} onClose={() => showDialog=false}>
	<DialogOverlay />

	<DialogTitle>Deactivate account</DialogTitle>
	<DialogDescription>
	  This will permanently deactivate your account
	</DialogDescription>

	<p>
	  Are you sure you want to deactivate your account? All of your data will
	  be permanently removed. This action cannot be undone.
	</p>

	<button onClick={() => showDialog=false}>Deactivate</button>
	<button onClick={() => showDialog=false}>Cancel</button>
  </Dialog> -->
<style>
.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.container {
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 12px;
	width: 90%;
	margin: 0 auto;
}

.fab_btn {
	position: fixed;
	bottom: 70px;
	right: 25px;
}
</style>
