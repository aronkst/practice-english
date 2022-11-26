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

<div class="mb-5">
	<button class="btn btn-block mb-2" on:click={listenText} disabled={disableButtons}>Listen</button>
	{#if showStopSpeak}
		<button class="btn btn-block mb-2" on:click={stopSpeakText}>Stop</button>
	{:else}
		<button class="btn btn-block mb-2" on:click={speakText} disabled={disableButtons}>Speak</button>
	{/if}
</div>

<textarea class="textarea textarea-secondary w-full mb-2" rows="5" bind:value={text} />

{#if talked !== ''}
	<h2 class="text-lg">{talked}</h2>
{/if}

{#if similarity >= 0}
	<progress class="mt-2 progress progress-primary" value={similarity} max="100" />
	<p class="text-base text-primary font-bold text-center">{similarity}%</p>
{/if}
