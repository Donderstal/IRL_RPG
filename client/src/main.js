import App from './App.svelte';

const app = new App({
	target: document.body,

	// I should probably write a function here to check screen size
	// And then pass the dynamically generated cell-size down as a prop
	// to use that in GfxContainer to draw the canvas and char sprites

	// Op deze manier wordt het globale ding genaamd gameState telkens op allerlei plekken aangepast, als je dat in een aparte file doet met een private gameState die je alleen via methodes mag accessen dan wordt het overzichtelijker en makkelijker debuggen ook lijkt me
	// Zou je ook bv een aparte functie voor kunnen maken, een soort updateGameState(newGameState) wat dan in een aparte file staat waar je de gamestate weer uit exporteerd, dan heb je geen risico's. 
	//Die gamestate zou dan soort prop in die file zijn die je erbuiten niet mag gebruiken en alleen dmv update, get, etc achtige methodes. Beetje database idee
	// Of zelfs een speciaal state js bestand maken om je algemene state in bij te houden

	props: {
		name: 'world',
		gameState : {
			cinematicState : {
				cinematic 		: false
			},

			mapState : {
				map		: true,
				activemap	: 'map1',
				mapData : {

				}

			},

			battleState 	: {
				battle			: false
			},

			playerCharacter : {
				characterState : {

				},

				characterPiece : {
					x				: '',
					y				: ''
				}				
			}


		}
	}
});

export default app;