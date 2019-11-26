const movement = require('./map-ui/movement')
const initMap = require('./map-init/initMap')
const util = require('../helpers/utilFunctions')
const state = require('../game-data/state')

const startGame = () => {

    const charName      =  util.getInputVal('name')
    const map           =  util.getInputVal('map')
    const charClass     =  util.getInputVal('class')

    // The setTimeouts setup is not definitive and might change later
    setTimeout( () => {
        document.getElementById('intro-screen').style.display = 'none'
    }, 25 )

    setTimeout( () => {
        initCanvas(0, map)      
        initCanvas(1)
        document.getElementById('stopGameButton').style.display = 'block'
    }, 50 )

    setTimeout( () => {
        movement.initPlayerMovement( state.playerCharacter.characterPiece )      
        movement.listenForKeyPress()      
    }, 100 )
}

const stopGame = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none'
    document.getElementsByTagName('canvas')[1].style.display = 'none'

    document.getElementById('intro-screen').style.display = 'block'
    
    document.getElementById('stopGameButton').style.display = 'none'

    movement.stopPlayerMovement()
}

const initCanvas = (canvasNum, map = null) => {
    // canvasNum === 0 generates background Canvas
    // 1 generates the front canvas
    const canvas    = document.getElementsByTagName('canvas')[canvasNum]
    canvas.style.display = 'block'
    let ctx         = canvas.getContext('2d');
    ctx.canvas.height   = 592
    ctx.canvas.width    = 888

    if (canvasNum === 0) {

        canvas.id           = 'game-background-canvas'

        initMap.fetchMapJsonWithCallback( map, "NO" )
    } 
    else { 
        canvas.id           = 'game-front-canvas'
    }

    return ctx
}

module.exports = {
    startGame, stopGame
}