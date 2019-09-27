import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		gameState : {
			overWorldState : {
				overworld: true
			},
			battleState : {
				battle: false
			}
		}
	}
});

export default app;