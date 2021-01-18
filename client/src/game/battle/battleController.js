const battleGlobals = require('./battleGlobals')

const Battle        = require('./battle').Battle;
const Sound         = require('../interfaces/I_Sound').Sound

const grid          = require('../map/map-init/drawGrid')
const tilesheets    = require('../../resources/tilesheetResources').sheets
const maps          = require('../../resources/mapResources')

const nameGen       = require('./../../helpers/randomNameGen')
const charGlobals   = require('../character/characterGlobals')


const startBattle = (  ) => {
    globals.GAME.requestingBattle = false
    globals.GAME.BATTLE = new Battle( prepareStagingDataForBattle( globals.GAME.battleStaging, globals.GAME.PLAYER ) );
    initializeBattleMap( );
    let sfx = new Sound( 'boxing-bell.wav', true );
    sfx.play( );
    globals.GAME.BATTLE.initUI( );
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

const prepareStagingDataForBattle = ( staging, player ) => {
    staging.playerChars = [ 
        [ true, nameGen.getRandomName(), charGlobals["INFLUENCER"], battleGlobals.MAP_SLOT_PLA_1 ],
        [ true, player.stats.name, player.stats.className, battleGlobals.MAP_SLOT_PLA_2 ],
        [ true, nameGen.getRandomName(), charGlobals["NECKBEARD"], battleGlobals.MAP_SLOT_PLA_3 ]
    ]

    staging.oppoChars = [ 
        [ false, nameGen.getRandomName(), charGlobals["TUMBLR_GIRL"], battleGlobals.MAP_SLOT_OPP_1 ],
        [ false, staging.action.name, staging.action.character.class, battleGlobals.MAP_SLOT_OPP_2 ],
        [ false, nameGen.getRandomName(), charGlobals["CHAD"], battleGlobals.MAP_SLOT_OPP_3 ]
    ]

    return staging;
}

const stopBattle = ( ) => {
    globals.GAME.BATTLE = { };
}

module.exports = {
    startBattle,
    stopBattle
}