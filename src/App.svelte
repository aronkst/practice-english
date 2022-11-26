<script>
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js');
	}

	import About from './lib/About.svelte';
	import Pronunciation from './lib/Pronunciation.svelte';
	import Speech from './lib/Speech.svelte';
	import Listen from './lib/Listen.svelte';
	import ListenSpeech from './lib/ListenSpeech.svelte';
	import ListenWrite from './lib/ListenWrite.svelte';

	const speech = new SpeechSynthesisUtterance();
	speech.lang = 'en-US';

	// @ts-ignore
	const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new speechRecognition();
	recognition.lang = 'en-US';
	recognition.continuous = true;

	let show = -1;

	function setShow(value) {
		show = value;
	}
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</button>
			<ul class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
				<li><button on:click={() => setShow(0)}>Pronunciation</button></li>
				<li><button on:click={() => setShow(1)}>Listen and Write</button></li>
				<li><button on:click={() => setShow(2)}>Listen</button></li>
				<li><button on:click={() => setShow(3)}>Speech</button></li>
				<li><button on:click={() => setShow(4)}>Listen and Speech</button></li>
				<li><button on:click={() => setShow(-1)}>About</button></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<span class="normal-case text-xl">Practice English </span>
	</div>
	<div class="navbar-end" />
</div>

<main class="container mx-auto">
	<div class="p-4">
		{#if [0, 1, 2, 3, 4].includes(show)}
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
		{:else}
			<About />
		{/if}
	</div>
</main>
