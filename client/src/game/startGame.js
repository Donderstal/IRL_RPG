const movementController = require('./map-ui/movementController')
const animationFrameController = require('./animationFrameController')
const globals = require('../game-data/globals')
const state = require('../game-data/state')
const initMap = require('./map-init/initMap')
const utility = require('../helpers/utilFunctions')
const fetchJson = utility.fetchJSONWithCallback

const mapJSONFolder = '/static/maps/'
const firstMapUrl = mapJSONFolder + 'my-neighbourhood/my-house.json';
const savedGame = '/static/save_game.json';

const stopGame = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none'
    document.getElementsByTagName('canvas')[1].style.display = 'none'

    movementController.stopPlayerMovement()
}

/**
 * @param {object} savedGameState saved game state object from a previous session
 * 
 * Run drawgrid function based on saved mapdata.
 */

const saveGame = ( ) => {
    state.playerCharacter.sprite.calcCellFromXy( );
    state.currentMap.mapData.playerStart = {
        'row': state.playerCharacter.sprite.row,
        'col': state.playerCharacter.sprite.col
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/save_game", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(state));
}

const initMapFromSave = ( savedGame ) => {
    for ( const key in Object.keys(savedGame) ) {
        state[key] = savedGame[key]
    }

    const mapData = savedGame.currentMap.mapData
    initMap.initializeMap(mapData, "SAVE_GAME", savedGame)

    setTimeout( () => {
        movementController.startPlayerMovement( );      
        animationFrameController.startRequestingFrame( );
    }, 500 );
}

const loadGame = ( ) => {
    document.getElementById('intro-screen').style.display = 'none';

    [...document.getElementsByTagName('canvas')].forEach( ( canvas ) => {
        initCanvas( canvas );
    } );

    fetchJson( savedGame, initMapFromSave );
}

const startNewGame = ( ) => {
    fetchJson( firstMapUrl, initMap.initializeMap );

    setTimeout( () => {
        movementController.startPlayerMovement( );      
        animationFrameController.startRequestingFrame( );
    }, 500 );
}

/**
 * @param {HTMLElement} canvas
 * 
 * Prepare canvas for game
 */
const initCanvas = ( canvas ) => {
    canvas.style.display = 'block'
    canvas.height = globals.CANVAS_HEIGHT 
    canvas.width = globals.CANVAS_WIDTH   
}

const startGame = ( ) => {
    document.getElementById('intro-screen').style.display = 'none';

    [...document.getElementsByTagName('canvas')].forEach( ( canvas ) => {
        initCanvas( canvas );
    } );

    startNewGame();
}

module.exports = {
    startGame, 
    loadGame,
    saveGame,
    stopGame
}