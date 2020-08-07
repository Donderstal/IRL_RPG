const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const Sound         = require('./../interfaces/I_Sound').Sound
const text          = require('./battle-ui/battleText')
const grid          = require('../map/map-init/drawGrid')
const tilesheets    = require('../../resources/tilesheetResources').sheets
const maps          = require('../../resources/mapResources')
const Party         = require('./Party').Party
const nameGen       = require('./../../helpers/randomNameGen')
const BattleUI      = require('./battle-ui/battleUIWrapper').BattleUIWrapper
const charGlobals   = require('../character/characterGlobals')

const playerTopXy = {
    'x': (globals.CANVAS_WIDTH * .65) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .35) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const playerMiddleXy = {
    'x': (globals.CANVAS_WIDTH * .70) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .5) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const playerBottomXy = {
    'x': (globals.CANVAS_WIDTH * .60) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .65) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}

const opponentTopXy = {
    'x': (globals.CANVAS_WIDTH * .40 - ( globals.STRD_SPRITE_WIDTH  * .5 ) ),
    'y': (globals.CANVAS_HEIGHT * .35) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const opponentMiddleXy = {
    'x': (globals.CANVAS_WIDTH * .30) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .5) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const opponentBottomXy = {
    'x': (globals.CANVAS_WIDTH * .35) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .65) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}

const startBattle = (  ) => {
    const battleState = state.battleState
    state.battleStaging.requestingBattle = false
    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()

    if ( battleState.battleMusic ) {
        state.currentMap.mapMusic.pause()   
        battleState.battleMusic.play()  
    }

    initBattleMapAndSprites( battleState );
}

const initBattleMapAndSprites = ( battleState ) => {
    let battleMap = {};
    battleMap.mapData = maps.getMapData( "battle/downtown" );
    let tileSheetData = tilesheets[battleMap.mapData.tileSet];
    battleMap.tileSheet = new Image();
    battleMap.tileSheet.src = '/static/tilesets/' + tileSheetData.src;
    battleMap.tileSheet.onload = ( ) => {
        grid.drawGrid( {"x": 0, "y": 0}, battleMap, tileSheetData, true );        
    }

    battleState.battlePhase = globals['PHASE_BEGIN_BATTLE']        
    initializeBattleCharacter( )

    battleState.battleUI = new BattleUI( battleState );  
    battleState.battleUI.activateButtonAtIndex( 1 );
    battleState.playerParty.getNextPartyMember( );  
    battleState.battleUI.activateMenu( );
}

const initializeBattleCharacter = ( ) => {
    const mapBattleAction = state.battleStaging.action
    const playerParty = [ 
        [ true, nameGen.getRandomName(), charGlobals["CHAD"], playerTopXy ],
        [ true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, playerMiddleXy ],
        [ true, nameGen.getRandomName(), charGlobals["NECKBEARD"], playerBottomXy ]
    ]

    const opponentParty = [ 
        [ false, nameGen.getRandomName(), charGlobals["NECKBEARD"], opponentTopXy ],
        [ false, mapBattleAction.name, mapBattleAction.character.class, opponentMiddleXy ],
        [ false, nameGen.getRandomName(), charGlobals["CHAD"], opponentBottomXy ]
    ]

    state.battleState.playerParty   = new Party( playerParty, "PLAYER" )
    state.battleState.opponentParty = new Party( opponentParty )
}

const stopBattle = ( ) => {
    init.getBattleStopScreen()
    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()
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