import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		gameState : {
			overWorldState : {
				overworld		: true,
				curOverworld	: 'overWorld1'

			},
			battleState : {
				battle: false
			},
			characterState : {
				cool:	false
			},
			characterPos : {
				x: '',
				y: ''
			}
		}
	}
});

export default app;