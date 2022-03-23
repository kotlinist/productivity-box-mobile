<script>
import { appData } from '../../../stores';

import { onMount } from 'svelte';

import FragmentsAndBar from './FragmentsAndBar.svelte';

onMount(async () => {
	appData.init();
});
</script>

<div class="appBar">
	<FragmentsAndBar />
</div>

<style>
.appBar {
	width: 100vw;
	height: 100vh;
	/* background-color: brown; */
}
</style>
