<script>
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js');
	}

	import Pronunciation from './lib/Pronunciation.svelte';
	import Speech from './lib/Speech.svelte';
	import Listen from './lib/Listen.svelte';
	import ListenSpeech from './lib/ListenSpeech.svelte';
	import ListenWrite from './lib/ListenWrite.svelte';

	const speech = new SpeechSynthesisUtterance();
	speech.lang = 'en-US';

	const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new speechRecognition();
	recognition.lang = 'en-US';
	recognition.continuous = true;

	let show = 0;

	function setShow(value) {
		show = value;
	}
</script>

<div class="mt-5">
	<div class="tabs tabs-boxed">
		<button class="tab text-lg" class:tab-active={show === 0} on:click={() => setShow(0)}>Pronunciation</button>
		<button class="tab text-lg" class:tab-active={show === 1} on:click={() => setShow(1)}>Listen and Write</button>
		<button class="tab text-lg" class:tab-active={show === 2} on:click={() => setShow(2)}>Listen</button>
		<button class="tab text-lg" class:tab-active={show === 3} on:click={() => setShow(3)}>Speech</button>
		<button class="tab text-lg" class:tab-active={show === 4} on:click={() => setShow(4)}>Listen and Speech</button>
	</div>
</div>

<div class="p-2">
	{#if show === 0}
		<Pronunciation {speech} {recognition} />
	{/if}
	
	{#if show === 1}
		<ListenWrite {speech} />
	{/if}
	
	{#if show === 2}
		<Listen {speech} />
	{/if}
	
	{#if show === 3}
		<Speech {recognition} />
	{/if}
	
	{#if show === 4}
		<ListenSpeech {speech} {recognition} />
	{/if}
</div>
