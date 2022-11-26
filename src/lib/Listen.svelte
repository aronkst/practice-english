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

<div class="mb-5">
	<button class="btn btn-block mb-2" on:click={listenText} disabled={disableButtons}>Listen</button>
</div>

<textarea class="textarea textarea-secondary w-full" rows="5" bind:value={text} />
