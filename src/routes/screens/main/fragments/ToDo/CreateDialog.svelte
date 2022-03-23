<script>
import {
	Dialog,
	DialogOverlay,
	DialogTitle,
	Transition,
	TransitionChild,
	Listbox,
	ListboxButton,
	ListboxLabel,
	ListboxOption,
	ListboxOptions
} from '@rgossiaux/svelte-headlessui';
import { addCalendarTask } from '../../../../../api/todo';
import { getHabits, addHabit, updateHabit } from '../../../../../api/habits';
import { format, parse, startOfWeek } from 'date-fns';
import { createEventDispatcher, onMount } from 'svelte';
const dispatch = createEventDispatcher();

const habit_time = [
	{ id: 1, value: 'anytime', title: 'В любое время' },
	{ id: 2, value: 'morning', title: 'Утром' },
	{ id: 3, value: 'noon', title: 'Днём' },
	{ id: 4, value: 'evening', title: 'Вечером' },
	{ id: 5, value: 'night', title: 'Ночью' }
];

const habit_type = [
	{ id: 1, value: 'check', title: 'Отметить выполнение' },
	{ id: 2, value: 'count', title: 'Достигнуть количества' }
];

let selected_time = habit_time[0];
let selected_type = habit_type[0];

let name;
let target;
let unit;

export let date;

let createTask = () => {
	if (!name) {
		alert('Введите название задачи');
		return;
	}

	showDialog = false;

	let task = {
		name,
		completed: false
	};
	addCalendarTask(date, task);
	// alert(new Date(new Date('2022-01-01').toISOString()).toISOString());
	// let test = new Date();
	// test = new Date(dateFormat(test, 'yyyy-mm-dd'));
	// alert(test.toISOString());
	// alert(format(new Date(), 'dd-MM-yyyy'));
	// alert(format(parse('08-03-2022', 'dd-MM-yyyy', new Date()), 'dd-MM-yyyy'));
	// alert(startOfWeek(new Date(), { weekStartsOn: 1 }));
	// updHabitsList();

	name = '';
	dispatch('updateList');
};

export let showDialog = false;
</script>

<Transition appear show="{showDialog}">
	<Dialog class="fixed z-10 bottom-8 w-full" on:close="{() => (showDialog = false)}">
		<div class="min-h-screen px-4 text-center">
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<DialogOverlay class="fixed inset-0" />
			</TransitionChild>

			<span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95">
				<div
					class="glassmorphism-50 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
					<DialogTitle class="text-lg font-medium leading-6 text-gray-900">
						<b>Новая задача</b>
					</DialogTitle>

					<div class="relative flex flex-wrap items-stretch mt-3">
						<span
							class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
							<i class="icon-feather"></i>
						</span>
						<input
							bind:value="{name}"
							tabindex="-1"
							type="text"
							placeholder="Название"
							class="px-3 py-3 placeholder-slate-900/75 text-blueGray-600 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
					</div>

					<div class="mt-2 flex row justify-end">
						<button
							type="button"
							class="flex column justify-center px-4 py-2 text-lg text-white border-none rounded-lg bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500"
							on:click="{createTask}">
							<i class="icon-plus"></i> Добавить
						</button>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
