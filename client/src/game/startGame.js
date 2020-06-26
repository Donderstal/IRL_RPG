const animationFrameController = require('./animationFrameController')
const globals = require('../game-data/globals')
const state = require('../game-data/state')
const controls = require('./controls')
const controller = require('./gameController')
const storyProgression  = require('../game-data/storyProgression')

const utility = require('../helpers/utilFunctions')
const fetchJson = utility.fetchJSONWithCallback
const getMapData = require('../resources/mapResources').getMapData

const firstMapUrl = 'my-neighbourhood/A1/my-house';

const stopGame = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none'
    document.getElementsByTagName('canvas')[1].style.display = 'none'

    controls.stopListenForKeyPress();
}

/**
 * @param {object} savedGameState saved game state object from a previous session
 * 
 * Run drawgrid function based on saved mapdata.
 */

const saveGame = ( ) => {
    state.playerCharacter.sprite.calcCellFromXy( );
    utility.downloadObjectAsJson( state, 'Neckbeard_save_game' + Date.now().toString() )
}

const initMapFromSave = ( savedGame ) => {
    for ( const key in Object.keys(savedGame) ) {
        state[key] = savedGame[key]
    }

    const mapData = savedGame.currentMap.mapData
    controller.startMap( "SAVE_GAME", mapData, savedGame )

    setTimeout( initControlsAndAnimation, 500 );
}

const loadGame = ( ) => {
    [...document.getElementsByTagName('canvas')].forEach( ( canvas ) => {
        initCanvas( canvas );
    } );

    const inputElement = document.getElementById('JSON_input')
    inputElement.click();
    inputElement.onchange = ( ) => {
        const jsonSrc = URL.createObjectURL(inputElement.files[0]);
        fetchJson( jsonSrc, initMapFromSave );
    } 
}

const startNewGame = ( json ) => {
    storyProgression.startNewStory( );
    controller.startMap( "NEW_GAME", json )
    setTimeout( initControlsAndAnimation, 1000 );
}

const initControlsAndAnimation = ( ) => {
    controls.initTouchControls( );
    controls.listenForKeyPress();  
    animationFrameController.startRequestingFrame( );
}

/**
 * @param {HTMLElement} canvas
 * 
 * Prepare canvas for game
 */
const initCanvas = ( canvas ) => {
    canvas.height = globals.CANVAS_HEIGHT 
    canvas.width = globals.CANVAS_WIDTH   
}

const startGame = ( name, className ) => {
    [...document.getElementsByTagName('canvas')].forEach( ( canvas ) => {
        initCanvas( canvas );
    } );

    document.documentElement.requestFullscreen();
    state.playerCharacter.name      = name;
    state.playerCharacter.className = className;

    const mapData = getMapData(firstMapUrl)
    startNewGame( mapData )
}

module.exports = {
    startGame, 
    loadGame,
    saveGame,
    stopGame
}