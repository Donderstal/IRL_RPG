const state = require('../../game-data/state')
const canvasHelpers = require('../../helpers/canvasHelpers')
const animation = require('../animationFrameController')
const initMap = require('../map-init/initMap')

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    alert('battle!!!!')

    canvasHelpers.getFrontCanvasContext().save( );
    canvasHelpers.getBackCanvasContext().save( );

    animation.startBattleAnimation( )

    canvasHelpers.clearBothCanvases( )

    alert('omg!!!!')

    setTimeout( restore, 1000)
}

const restore = ( ) => {
    canvasHelpers.getFrontCanvasContext().restore( );
    canvasHelpers.getBackCanvasContext().restore( );
    console.log(initMap)
    initMap.initializeMap(state.currentMap.mapData, "SAVE_GAME", state)
    animation.startOverworldAnimation( )
}

module.exports = {
    startBattle
}