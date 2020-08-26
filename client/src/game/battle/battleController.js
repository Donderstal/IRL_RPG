const state         = require('../../game-data/state')
const battleGlobals = require('./battleGlobals')

const Battle        = require('./battle').Battle;
const Sound         = require('../interfaces/I_Sound').Sound

const grid          = require('../map/map-init/drawGrid')
const tilesheets    = require('../../resources/tilesheetResources').sheets
const maps          = require('../../resources/mapResources')

const nameGen       = require('./../../helpers/randomNameGen')
const charGlobals   = require('../character/characterGlobals')


const startBattle = (  ) => {
    state.battleStaging.requestingBattle = false
    state.battleState = new Battle( prepareStagingDataForBattle( state.battleStaging ) );
    initializeBattleMap( );
    let sfx = new Sound( 'boxing-bell.wav', true );
    sfx.play( );
    state.battleState.initUI( );
}

const initializeBattleMap = ( ) => {
    let map = { }
    map.mapData = maps.getMapData( "battle/downtown" );
    map.tileSheet = new Image();
    map.sheetData = tilesheets[map.mapData.tileSet];
    map.tileSheet.src = '/static/tilesets/' + map.sheetData.src;
    map.tileSheet.onload = ( ) => {
        grid.drawGrid( {"x": 0, "y": 0}, map, map.sheetData, true );        
    }
}

const prepareStagingDataForBattle = ( staging ) => {
    staging.playerChars = [ 
        [ true, nameGen.getRandomName(), charGlobals["CHAD"], battleGlobals.MAP_SLOT_PLA_1 ],
        [ true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, battleGlobals.MAP_SLOT_PLA_2 ],
        [ true, nameGen.getRandomName(), charGlobals["NECKBEARD"], battleGlobals.MAP_SLOT_PLA_3 ]
    ]

    staging.oppoChars = [ 
        [ false, nameGen.getRandomName(), charGlobals["NECKBEARD"], battleGlobals.MAP_SLOT_OPP_1 ],
        [ false, staging.action.name, staging.action.character.class, battleGlobals.MAP_SLOT_OPP_2 ],
        [ false, nameGen.getRandomName(), charGlobals["CHAD"], battleGlobals.MAP_SLOT_OPP_3 ]
    ]

    return staging;
}

const stopBattle = ( ) => {
    state.battleState = { };
    state.battleStaging = {
        player              : [],
        opponent            : [],
        requestingBattle    : false
    }
}

module.exports = {
    startBattle,
    stopBattle
}