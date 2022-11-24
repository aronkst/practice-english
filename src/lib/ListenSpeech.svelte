<script>
	import stringSimilarity from 'string-similarity';

	export let speech;
	speech.onend = () => {
		disableButtons = false;
	};

	export let recognition;
	recognition.onresult = (event) => {
		talked = event.results[0][0].transcript.toLowerCase();
		checkSpeak();
	};

	let text = '';
	let talked = '';
	let similarity = -1;
	let disableButtons = false;
	let showStopSpeak = false;

	function listenText() {
		disableButtons = true;

		speech.text = text;
		window.speechSynthesis.speak(speech);
	}

	function speakText() {
		disableButtons = true;
		showStopSpeak = true;

		talked = '';
		similarity = -1;

		recognition.start();
	}

	function stopSpeakText() {
		disableButtons = false;
		showStopSpeak = false;

		recognition.stop();
	}

	function checkSpeak() {
		similarity = Math.ceil(
			stringSimilarity.compareTwoStrings(text.toUpperCase(), talked.toUpperCase()) * 100
		);
	}
</script>

<div>
	<button on:click={listenText} disabled={disableButtons}>Listen</button>
	{#if showStopSpeak}
		<button on:click={stopSpeakText}>Stop</button>
	{:else}
		<button on:click={speakText} disabled={disableButtons}>Speak</button>
	{/if}
</div>

<textarea rows="10" cols="40" bind:value={text} />

{#if talked !== ''}
	<h2>{talked}</h2>
{/if}

{#if similarity >= 0}
	<code>{similarity}%</code>
{/if}

<style>
	code {
		display: inline-block;
		margin-top: 12px;
	}
</style>
