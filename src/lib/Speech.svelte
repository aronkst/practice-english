<script>
	export let recognition;
	recognition.onresult = (event) => {
		talked = event.results[0][0].transcript.toLowerCase();
	};

	let talked = '';
	let disableButtons = false;
	let showStopSpeak = false;

	function speakFree() {
		disableButtons = true;
		showStopSpeak = true;

		talked = '';

		recognition.start();
	}

	function stopSpeakFree() {
		disableButtons = false;
		showStopSpeak = false;

		recognition.stop();
	}
</script>

<div class="mb-5">
	{#if showStopSpeak}
		<button class="btn btn-block mb-2" on:click={stopSpeakFree}>Stop</button>
	{:else}
		<button class="btn btn-block mb-2" on:click={speakFree} disabled={disableButtons}>Speak</button>
	{/if}
</div>

{#if talked !== ''}
	<h2 class="text-lg">{talked}</h2>
{/if}
