<script>
	import sentences from '../helper/sentences';
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

	let sentence = '';
	let talked = '';
	let similarity = -1;
	let disableButtons = false;
	let showStopSpeak = false;

	function randomNumber() {
		return Math.floor(Math.random() * sentences.length);
	}

	function randomSentence() {
		let number = randomNumber();

		while (sentence == sentences[number]) {
			number = randomNumber();
		}

		sentence = sentences[number];
		talked = '';
		similarity = -1;
	}

	function listenSentence() {
		disableButtons = true;

		speech.text = sentence;
		window.speechSynthesis.speak(speech);
	}

	function speakWord() {
		disableButtons = true;
		showStopSpeak = true;

		talked = '';
		similarity = -1;

		recognition.start();
	}

	function stopSpeakWord() {
		disableButtons = false;
		showStopSpeak = false;

		recognition.stop();
	}

	function checkSpeak() {
		similarity = Math.ceil(
			stringSimilarity.compareTwoStrings(sentence.toUpperCase(), talked.toUpperCase()) * 100
		);
	}

	randomSentence();
</script>

<div class="mb-5">
	<button class="btn btn-block mb-2" on:click={randomSentence} disabled={disableButtons}
		>New Sentence</button
	>
	<button class="btn btn-block mb-2" on:click={listenSentence} disabled={disableButtons}
		>Listen</button
	>
	{#if showStopSpeak}
		<button class="btn btn-block mb-2" on:click={stopSpeakWord}>Stop</button>
	{:else}
		<button class="btn btn-block mb-2" on:click={speakWord} disabled={disableButtons}>Speak</button>
	{/if}
</div>

<h2 class="text-xl mb-2">{sentence}</h2>

{#if talked !== ''}
	<h2 class="text-lg">{talked}</h2>
{/if}

{#if similarity >= 0}
	<progress class="mt-2 progress progress-primary" value={similarity} max="100" />
	<p class="text-base text-primary font-bold text-center">{similarity}%</p>
{/if}
