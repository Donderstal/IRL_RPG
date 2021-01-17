const animationFrameController = require('./animationFrameController')
const globals = require('../game-data/globals')
const state = require('../game-data/state')
const controls = require('./controls')
const { Game } = require('./Game')
const utility = require('../helpers/utilFunctions')

const fetchJson = utility.fetchJSONWithCallback

const stopGame = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none'
    document.getElementsByTagName('canvas')[1].style.display = 'none'

    controls.stopListenForKeyPress();
}

const saveGame = ( ) => {
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

const initControlsAndAnimation = ( ) => {
    controls.initTouchControls( );
    controls.listenForKeyPress();  
    animationFrameController.startRequestingFrame( );
}

const startGame = ( name, className ) => {
    globals.GAME = new Game( );
    globals.GAME.startNewGame( name, className );
}

module.exports = {
    startGame, 
    loadGame,
    saveGame,
    stopGame
}