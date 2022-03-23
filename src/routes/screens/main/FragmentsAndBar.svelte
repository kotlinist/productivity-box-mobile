<script>
import { homeScreenFragment } from './../../../stores.js';
import Transition from './../../../lib/Transition.svelte';
import Home from './fragments/Home.svelte';
import ToDo from './fragments/ToDo/ToDo.svelte';
import Timer from './fragments/Timer/index.svelte';
import Habits from './fragments/Habits/Habits.svelte';
import Settings from './fragments/Settings.svelte';

let activeTab = 'bg-white shadow rounded-full';
let unactiveTab = 'text-blue-100 hover:bg-white/[0.5] hover:text-grey-500 hover:rounded-full';

let tabs = [
	{
		icon: 'icon-home',
		fragment: Home
	},
	{
		icon: 'icon-check',
		fragment: ToDo
	},
	{
		icon: 'icon-habit-1',
		fragment: Habits
	},
	{
		icon: 'icon-stopwatch',
		fragment: Timer
	},
	{
		icon: 'icon-cog',
		fragment: Settings
	}
];
</script>

<!-- <div class="ma-0 pa-0" style="width: 100vw; height: 100vh; background: orange">

</div> -->
<div class="background"></div>

<div class="fragment">
	<!-- {#each tabs as tab} -->
	<!-- <div style="display: {currentFragment == tab.fragment ? 'block' : 'none'};"> -->
	{#key $homeScreenFragment}
		<Transition>
			<svelte:component this="{$homeScreenFragment}" />
		</Transition>
	{/key}
	<!-- </div> -->
	<!-- {/each} -->
	<!-- {#if currentFragment==Forum}<Forum/>{/if}
  {#if currentFragment==Search}<Search/>{/if}
  {#if currentFragment==Profile}<Profile/>{/if} -->

	<!-- <div display={currentFragment==Forum}><Forum/></div>
  <div hidden={currentFragment==Search}><Search/></div>
  <div hidden={currentFragment==Profile}><Profile/></div> -->
</div>

<div class="bar flex p-1 space-x-1 glassmorphism-50 px-2 rounded-t-lg shadow">
	{#each tabs as tab}
		<p
			class="{$homeScreenFragment == tab.fragment
				? activeTab
				: unactiveTab} text-center px-2 w-full py-2.5 text-xl leading-5 font-medium text-blue-700"
			on:click="{() => {
				$homeScreenFragment = tab.fragment;
			}}">
			<i
				class="{tab.icon} font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"
			></i>
		</p>
	{/each}
</div>

<style>
.background {
	background-image: url('/backgrounds/plant.jpg');
	background-position: center 40%;
	background-size: auto 100%;
	/* background-attachment: fixed; */
	pointer-events: none;
	position: fixed;
	z-index: -1;
	height: 100vh;
	width: 100vw;

	/* display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 50px;
	gap: 0px 0px;
	grid-template-areas:
		'.'
		'.'; */
}

.fragment {
	/* flex: 99; */
	height: 100%;
	/* width: 100vw; */
	overflow-y: scroll;
	/* flex-basis: 100%; */
	/* background-image: url('/backgrounds/plant.jpg');
	background-position: 35% center;
	background-size: auto 100%; */
	/* background-attachment: fixed; */
	padding-bottom: 55px;
	/* background-color: antiquewhite; */
}

.bar {
	/* flex: 1; */
	width: 100%;
	position: fixed;
	bottom: 0px;
	left: 0px;
	/* overflow: hidden; */
	/* height: 50px; */
	/* border-top-left-radius: 10px; */
}
</style>
