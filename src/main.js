import './index.css';
import App from './App.svelte';

function replaceContents(node) {
	node.innerHTML = '';
	return node;
}

const app = new App({
	target: replaceContents(document.getElementById('app'))
});

export default app;
