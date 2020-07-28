const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const Sound         = require('./../interfaces/I_Sound').Sound
const text          = require('./battle-ui/battleText')
const grid          = require('../map/map-init/drawGrid')
const tilesheets    = require('../../resources/tilesheetResources').sheets
const maps          = require('../../resources/mapResources')
const Party         = require('./Party').Party
const BattleMenu    = require('./battle-ui/battleMenu').BattleMenu
const nameGen       = require('./../../helpers/randomNameGen')
const BattleUI      = require('./battle-ui/battleUIWrapper').BattleUIWrapper

const playerTopXy = {
    'x': (globals.CANVAS_WIDTH * .40 - ( globals.STRD_SPRITE_WIDTH  * .5 ) ),
    'y': (globals.CANVAS_HEIGHT * .35) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const playerMiddleXy = {
    'x': (globals.CANVAS_WIDTH * .30) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .5) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const playerBottomXy = {
    'x': (globals.CANVAS_WIDTH * .35) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .65) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}

const opponentTopXy = {
    'x': (globals.CANVAS_WIDTH * .65) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .35) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const opponentMiddleXy = {
    'x': (globals.CANVAS_WIDTH * .70) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .5) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const opponentBottomXy = {
    'x': (globals.CANVAS_WIDTH * .60) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .65) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     

    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()

    if ( state.battleState.battleMusic ) {
        state.battleState.battleMusic.play()  
    }
    else {
        state.battleState.battleMusic = new Sound( "Rydeen.mp3", false, true )
        state.battleState.battleMusic.play()
    }


    initBattleMenu()
    initBattleMapAndSprites()

}

const initBattleMenu = ( ) => {
    state.battleState.battleUI = new BattleUI( );
    state.battleState.battleMenu = new BattleMenu( ); 
}

const initBattleMapAndSprites = ( ) => {
    let battleMap = {};
    battleMap.mapData = maps.getMapData( "battle/downtown" );
    let tileSheetData = tilesheets[battleMap.mapData.tileSet];
    battleMap.tileSheet = new Image();
    battleMap.tileSheet.src = '/static/tilesets/' + tileSheetData.src;
    battleMap.tileSheet.onload = ( ) => {
        grid.drawGrid( {"x": 0, "y": 0}, battleMap, tileSheetData, true );        
    }


    
    setTimeout( ( ) => {
        text.initTextContainer( ) // real text
        state.battleState.battlePhase = globals['PHASE_BEGIN_BATTLE']        
    }, 600) 

    setTimeout( ( ) => {
        initializeBattleCharacter( state.battleState.opponent )
        state.battleState.textContainer.setText( "A fight breaks out in the streets!" )
    }, 1200)
}

const initializeBattleCharacter = ( opponent ) => {
    const mapBattleAction = opponent.action
    const playerParty = [ 
        [ true, nameGen.getRandomName(), state.playerCharacter.stats.className, playerTopXy ],
        [ true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, playerMiddleXy ],
        [ true, nameGen.getRandomName(), state.playerCharacter.stats.className, playerBottomXy ]
    ]

    const opponentParty = [ 
        [ false, nameGen.getRandomName(), mapBattleAction.character.class, opponentTopXy ],
        [ false, mapBattleAction.name, mapBattleAction.character.class, opponentMiddleXy ],
        [ false, nameGen.getRandomName(), mapBattleAction.character.class, opponentBottomXy ]
    ]

    state.battleState.playerParty   = new Party( playerParty, "PLAYER" )
    state.battleState.opponentParty = new Party( opponentParty )
}

const stopBattle = ( ) => {
    init.getBattleStopScreen()
    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()
    state.battleState = {
        player  : { hasTurn : false },
        opponent   : { hasTurn : false },
        battlePhase : null
    }
}

module.exports = {
    startBattle,
    stopBattle
}