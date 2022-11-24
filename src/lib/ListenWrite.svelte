<script>
	import sentences from '../helper/sentences';
	import stringSimilarity from 'string-similarity';

	export let speech;
	speech.onend = () => {
		disableButtons = false;
	};

	let sentence = '';
	let typed = '';
	let similarity = -1;
	let disableButtons = false;

	function randomNumber() {
		return Math.floor(Math.random() * sentences.length);
	}

	function randomSentence() {
		let number = randomNumber();

		while (sentence == sentences[number]) {
			number = randomNumber();
		}

		sentence = sentences[number];
		typed = '';
		similarity = -1;
	}

	function listenSentence() {
		disableButtons = true;

		speech.text = sentence;
		window.speechSynthesis.speak(speech);
	}

	function checkTyped() {
		similarity = Math.ceil(
			stringSimilarity.compareTwoStrings(sentence.toUpperCase(), typed.toUpperCase()) * 100
		);
	}

	randomSentence();
</script>

<div>
	<button on:click={randomSentence} disabled={disableButtons}>New Sentence</button>
	<button on:click={listenSentence} disabled={disableButtons}>Listen</button>
	<button on:click={checkTyped} disabled={disableButtons}>Check</button>
</div>

<textarea rows="10" cols="40" bind:value={typed} />

{#if similarity >= 0}
	<h2>{sentence}</h2>
	<code>{similarity}%</code>
{/if}
