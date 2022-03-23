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
import { getHabits, addHabit, updateHabit } from '../../../../../api/habits';
import { createEventDispatcher } from 'svelte';
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

let createHabit = () => {
	if (!name) {
		alert('Введите название привычки');
		return;
	}
	if (selected_type.value == 'count' && (!target || target <= 0)) {
		alert('Введите цель (больше 0)');
		return;
	}

	showDialog = false;
	let habit = {
		name,
		type: selected_type.value,
		time: selected_time.value
	};
	if (selected_type.value == 'count') habit = { ...habit, target, unit, count: 0 };
	else habit = { ...habit, checked: false };
	addHabit(habit);
	dispatch('updateList');

	name = target = unit = '';
	selected_time = habit_time[0];
	selected_type = habit_type[0];
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
						<b>Добавить привычку</b>
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

					<div class="mt-2">
						<!-- <div class="w-72 fixed top-16"> -->
						<Listbox
							value="{selected_time}"
							on:change="{(e) => {
								selected_time = e.detail;
							}}">
							<ListboxButton
								class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
								<span class="block truncate">{selected_time?.title}</span>
								<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<i class="icon-down-open-1 w-5 h-5 text-gray-400"></i>
								</span>
							</ListboxButton>
							<Transition
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0">
								<ListboxOptions
									class="w-full py-1 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{#each habit_time as time_option}
										<!-- if active else unactive -->
										<ListboxOption
											key="{time_option.id}"
											class="{selected_time == time_option
												? 'text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500'
												: 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4 mx-2 mt-1 rounded-md"
											value="{time_option}">
											<span
												class="{selected_time == time_option
													? 'font-medium'
													: 'font-normal'} block truncate">
												{time_option.title}
											</span>
											<!-- {selected ? (
									  <span
										class={`${
										  active ? 'text-amber-600' : 'text-amber-600'
										}
											  absolute inset-y-0 left-0 flex items-center pl-3`}
									  >
										<CheckIcon class="w-5 h-5" aria-hidden="true" />
									  </span>
									) : null} -->
											<span
												class="{selected_time == time_option
													? 'text-white'
													: 'hidden'} absolute inset-y-0 left-0 flex items-center pl-3">
												<i class="icon-ok"></i>
											</span>
										</ListboxOption>
									{/each}
								</ListboxOptions>
							</Transition>
						</Listbox>
					</div>

					<div class="mt-2">
						<!-- <div class="w-72 fixed top-16"> -->
						<Listbox
							value="{selected_type}"
							on:change="{(e) => {
								selected_type = e.detail;
							}}">
							<ListboxButton
								class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
								<span class="block truncate">{selected_type?.title}</span>
								<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<i class="icon-down-open-1 w-5 h-5 text-gray-400"></i>
								</span>
							</ListboxButton>
							<Transition
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0">
								<ListboxOptions
									class="w-full py-1 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{#each habit_type as type_option}
										<!-- if active else unactive -->
										<ListboxOption
											key="{type_option.id}"
											class="{selected_type == type_option
												? 'text-white bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500'
												: 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4 mx-2 mt-1 rounded-md"
											value="{type_option}">
											<span
												class="{selected_type == type_option
													? 'font-medium'
													: 'font-normal'} block truncate">
												{type_option.title}
											</span>
											<!-- {selected ? (
										  <span
											class={`${
											  active ? 'text-amber-600' : 'text-amber-600'
											}
												  absolute inset-y-0 left-0 flex items-center pl-3`}
										  >
											<CheckIcon class="w-5 h-5" aria-hidden="true" />
										  </span>
										) : null} -->
											<span
												class="{selected_type == type_option
													? 'text-white'
													: 'hidden'} absolute inset-y-0 left-0 flex items-center pl-3">
												<i class="icon-ok"></i>
											</span>
										</ListboxOption>
									{/each}
								</ListboxOptions>
							</Transition>
						</Listbox>
					</div>

					{#if selected_type.value == 'count'}
						<div class="relative flex flex-wrap items-stretch mt-3">
							<span
								class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
								<i class="icon-sort-numeric"></i>
							</span>
							<input
								bind:value="{target}"
								tabindex="-1"
								type="number"
								placeholder="Цель"
								class="px-3 py-3 placeholder-slate-900/75 text-blueGray-600 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
						</div>

						<div class="relative flex flex-wrap items-stretch mt-3">
							<span
								class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
								<i class="icon-balance-scale"></i>
							</span>
							<input
								bind:value="{unit}"
								tabindex="-1"
								type="text"
								placeholder="Единица измерения"
								class="px-3 py-3 placeholder-slate-900/75 text-blueGray-600 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
						</div>
					{/if}

					<div class="mt-2 flex row justify-end">
						<button
							type="button"
							class="flex column justify-center px-4 py-2 text-lg text-white border-none rounded-lg bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 active:from-blue-500 active:via-indigo-500 active:to-violet-500"
							on:click="{createHabit}">
							<i class="icon-plus"></i> Добавить
						</button>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
