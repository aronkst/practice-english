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

<div class="mb-5">
	<button class="btn btn-block mb-2" on:click={randomSentence} disabled={disableButtons}
		>New Sentence</button
	>
	<button class="btn btn-block mb-2" on:click={listenSentence} disabled={disableButtons}
		>Listen</button
	>
	<button class="btn btn-block mb-2" on:click={checkTyped} disabled={disableButtons}>Check</button>
</div>

<textarea class="textarea textarea-secondary w-full mb-2" rows="5" bind:value={typed} />

{#if similarity >= 0}
	<h2 class="text-xl mb-2">{sentence}</h2>
	<progress class="mt-2 progress progress-primary" value={similarity} max="100" />
	<p class="text-base text-primary font-bold text-center">{similarity}%</p>
{/if}
