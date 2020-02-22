const movementController = require('./map-ui/movementController')
const animationFrameController = require('./animationFrameController')
const globals = require('../game-data/globals')
const state = require('../game-data/state')
const initMap = require('./map-init/initMap')
const utility = require('../helpers/utilFunctions')

const firstMapUrl = '/static/maps/my-neighbourhood/my-house.json';

const stopGame = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none'
    document.getElementsByTagName('canvas')[1].style.display = 'none'

    document.getElementById('intro-screen').style.display = 'block'
    
    document.getElementById('stopGameButton').style.display = 'none'

    movementController.stopPlayerMovement()
}

/**
 * @param {string} url 
 */
const startNewGame = ( ) => {
    utility.fetchJSONWithCallback( firstMapUrl, initMap.initializeMap )
}

/**
 * @param {object} savedGameState saved game state object from a previous session
 * 
 * Run drawgrid function based on saved mapdata.
 */

const loadGameFromSave = ( ) => {
    utility.fetchJSONWithCallback( '~/save_game.json', loggg )
}

const loggg = ( json ) => {
    console.log(json)
}

/**
 * @param {object} savedGameState saved game state object from a previous session
 * 
 * Run drawgrid function based on saved mapdata.
 */

const saveGame = ( ) => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/save_game", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(state));
}



/**
 * @param {object} savedGameState saved game state object from a previous session
 * 
 * Run drawgrid function based on saved mapdata.
 */

const getSavedGame = ( savedGameState ) => {
    // 
}



/**
 * @param {HTMLElement} canvas
 * 
 * Prepare canvas for game
 */
const initCanvas = ( canvas ) => {
    canvas.style.display = 'block'
    canvas.height = ( canvas.id === 'game-text-canvas' ) ? (globals.CANVAS_HEIGHT / 6) : globals.CANVAS_HEIGHT 
    canvas.width = globals.CANVAS_WIDTH   
}

const startGame = ( savedGame = null ) => {
    console.log( 'jo' )
    document.getElementById('intro-screen').style.display = 'none';

    [...document.getElementsByTagName('canvas')].forEach( ( canvas ) => {
        initCanvas( canvas );
    } );

    ( savedGame != 'hoi' ) ? startNewGame() : loadGameFromSave( savedGame )

    setTimeout( () => {
        movementController.startPlayerMovement()      
        animationFrameController.startRequestingFrame()
    }, 100 )
}

module.exports = {
    startGame, 
    saveGame,
    loadGameFromSave,
    stopGame
}