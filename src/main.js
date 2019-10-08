import App from './App.svelte';

const app = new App({
	target: document.body,

	// I should probably write a function here to check screen size
	// And then pass the dynamically generated cell-size down as a prop
	// to use that in GfxContainer to draw the canvas and char sprites

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