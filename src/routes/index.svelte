<script>
import Main from './screens/main/main.svelte';
let screen = 'main';
</script>

{#if screen == 'main'}
	<Main />
{:else}
	123
{/if}
