<script>
	export let speech;
	speech.onend = () => {
		disableButtons = false;
	};

	let text = '';
	let disableButtons = false;

	function listenText() {
		disableButtons = true;

		speech.text = text;
		window.speechSynthesis.speak(speech);
	}
</script>

<div>
	<button on:click={listenText} disabled={disableButtons}>Listen</button>
</div>

<textarea rows="10" cols="40" bind:value={text} />
