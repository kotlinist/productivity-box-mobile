<script>
import { fly, fade } from 'svelte/transition';
export let key = '';
</script>

{#key key}
	<div in:fade="{{ duration: 150, delay: 100 }}" out:fade="{{ duration: 150 }}">
		<slot />
	</div>
{/key}
