<script>
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js');
	}

	import Pronunciation from './lib/Pronunciation.svelte';
</script>

<Pronunciation />
