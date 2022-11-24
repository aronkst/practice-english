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

<div>
	<button on:click={randomSentence} disabled={disableButtons}>New Sentence</button>
	<button on:click={listenSentence} disabled={disableButtons}>Listen</button>
	{#if showStopSpeak}
		<button on:click={stopSpeakWord}>Stop</button>
	{:else}
		<button on:click={speakWord} disabled={disableButtons}>Speak</button>
	{/if}
</div>

<h2>{sentence}</h2>

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
