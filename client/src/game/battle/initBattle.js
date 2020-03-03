const state = require('../../game-data/state')
const canvasHelpers = require('../../helpers/canvasHelpers')
const utility = require('../../helpers/utilFunctions')
const animation = require('../animationFrameController')
const drawGrid      = require('../map-init/drawGrid')

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    animation.startBattleAnimation( )
    canvasHelpers.clearBothCanvases( )
    utility.fetchJSONWithCallback( '/static/maps/battle-maps/battle_map1.json', getBattleMap )
}

const getBattleMap = ( battleMapJson ) => {
    let battleMap = {};
    battleMap.mapData = battleMapJson;
    drawGrid.generateMap( battleMap )
}

const stopBattle = ( ) => {
    canvasHelpers.clearBothCanvases( )
    drawGrid.generateMap( state.currentMap )

    animation.startOverworldAnimation( )
}

module.exports = {
    startBattle
}