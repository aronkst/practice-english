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

<div>
	{#if showStopSpeak}
		<button on:click={stopSpeakFree}>Stop</button>
	{:else}
		<button on:click={speakFree} disabled={disableButtons}>Speak</button>
	{/if}
</div>

{#if talked !== ''}
	<h2>{talked}</h2>
{/if}
