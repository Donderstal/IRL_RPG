const movementController = require('./map-ui/movementController')
const animationFrameController = require('./animationFrameController')
const globals = require('../game-data/globals')

const firstMap = ;

const startGame = ( savedGame = null ) => {
    preparePageForGame()

    ( savedGame == null ) ? startNewGame() : loadGameFromSave(savedGame)

    setTimeout( () => {
        movementController.startPlayerMovement()      
        animationFrameController.startRequestingFrame()
    }, 100 )
}

const stopGame = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none'
    document.getElementsByTagName('canvas')[1].style.display = 'none'
    document.getElementsByTagName('canvas')[2].style.display = 'none'

    document.getElementById('intro-screen').style.display = 'block'
    
    document.getElementById('stopGameButton').style.display = 'none'

    movementController.stopPlayerMovement()
}

/**
 * 
 */
const preparePageForGame = () => {
    document.getElementById('intro-screen').style.display = 'none'
    const gameCanvases = Array.from(document.getElementsByTagName('canvas'))

    gameCanvases.forEach( ( canvas ) => {
        initCanvas( canvas )
    } )
}

/**
 * @param {string} url 
 */
const startNewGame = ( ) => {

}

/**
 * @param {object} savedGameState saved game state object from a previous session
 * 
 * Run drawgrid function based on saved mapdata.
 */

const loadGameFromSave = ( savedGameState ) => {
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

module.exports = {
    startGame, stopGame
}