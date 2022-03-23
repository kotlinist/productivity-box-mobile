<script>
import { startOfWeek, endOfWeek, eachDayOfInterval, format, parse, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale/index.js';
import CreateDialog from './CreateDialog.svelte';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
import { flip } from 'svelte/animate';
import { dndzone } from 'svelte-dnd-action';
import Task from './Task.svelte';
import { onMount } from 'svelte';
import { appData } from '../../../../../stores';
import { getCalendarTasks, updateCalendarTasks } from '../../../../../api/todo';

let tasks = false;

const flipDurationMs = 300;
function handleDndConsider(e) {
	tasks = e.detail.items;
}
function handleDndFinalize(e) {
	tasks = e.detail.items;
	updateCalendarTasks(selectedDate, tasks);
}

onMount(() => {
	// $appData.modules.todo.data.calendar = {};

	updateList();
});

let updateList = (e) => {
	tasks = getCalendarTasks(selectedDate);
};

let showDialog = false;
let selectedDate = format(new Date(), 'dd-MM-yyyy');

let selectDate = (day) => {
	selectedDate = format(day, 'dd-MM-yyyy');
	updateList();
};

const formatRelativeLocale = {
	lastWeek: 'EEEE, d MMMM yyyy',
	yesterday: 'Вчера, d MMMM yyyy',
	today: 'Сегодня, d MMMM yyyy',
	tomorrow: 'Завтра, d MMMM yyyy',
	nextWeek: 'EEEE, d MMMM yyyy',
	other: 'EEEE, d MMMM yyyy'
};

const dayOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<div class="glassmorphism-50 pt-1 pb-2 rounded-b-lg shadow">
	<div class="w-full mx-auto flex items-center justify-center">
		{#each eachDayOfInterval( { start: startOfWeek( parse(selectedDate, 'dd-MM-yyyy', new Date()), { weekStartsOn: 1 } ), end: endOfWeek( parse(selectedDate, 'dd-MM-yyyy', new Date()), { weekStartsOn: 1 } ) } ) as day, i}
			<div class="flex flex-col justify-center items-center">
				<span>{dayOfWeek[i]}</span>
				{#if selectedDate == format(day, 'dd-MM-yyyy')}
					<button
						class="bg-gradient-to-r from-yellow-300 to-orange-400 active:from-yellow-400 active:to-orange-500 mx-1 h-10 w-10 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250"
						type="button"
						on:click="{() => {
							selectDate(day);
						}}">
						<b class="bold text-white">{day.getDate()}</b>
					</button>
				{:else}
					<button
						class="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500 mx-1 h-10 w-10 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250"
						type="button"
						on:click="{() => {
							selectDate(day);
						}}">
						<b class="bold text-white">{day.getDate()}</b>
					</button>
				{/if}
			</div>
		{/each}

		<div class="flex flex-col justify-center items-center">
			<i class="w-2 h-6"></i>
			<button
				class="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500 mx-1 h-10 w-10 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250"
				type="button"
				on:click="{() => {
					let input = prompt('Enter date:', selectedDate);
					if (input) selectedDate = input;
				}}">
				<i class="icon-calendar text-white"></i>
			</button>
		</div>
	</div>
</div>

<div
	class="mt-4 text-grey font-bold text-sm px-3 py-3 rounded-lg shadow outline-none mx-4 bg-blue-500 glassmorphism-25">
	<p class="text-base bold text-center">
		{capitalizeFirstLetter(
			formatRelative(
				parse(selectedDate, 'dd-MM-yyyy', new Date()),
				parse(format(new Date(), 'dd-MM-yyyy'), 'dd-MM-yyyy', new Date()),
				{
					locale: { ...ru, formatRelative: (token) => formatRelativeLocale[token] },
					weekStartsOn: 1
				}
			)
		)}
	</p>
	{#if tasks && tasks.length > 0}
		<section
			use:dndzone="{{ items: tasks, flipDurationMs }}"
			on:consider="{handleDndConsider}"
			on:finalize="{handleDndFinalize}">
			{#each tasks as task (task.id)}
				<div animate:flip="{{ duration: flipDurationMs }}">
					<Task task="{task}" selectedDate="{selectedDate}" on:updateList="{updateList}" />
				</div>
			{/each}
		</section>
	{:else}
		<p class="text-base bold text-center">Вы не добавили еще ни одной задачи</p>
	{/if}

	<!-- <div class="flex tasks-center justify-center">
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
	</div> -->
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

<CreateDialog date="{selectedDate}" on:updateList="{updateList}" bind:showDialog />

<style>
.fab_btn {
	position: fixed;
	bottom: 70px;
	right: 25px;
}
</style>
