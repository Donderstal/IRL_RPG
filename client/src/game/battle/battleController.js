const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const Sound         = require('./../interfaces/I_Sound').Sound
const changeMode    = require('../../game-data/changeMode');
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
    state.battleStaging.requestingBattle = false
    state.battleState = new Battle( prepareStagingDataForBattle( state.battleStaging ) );
    state.battleState.initUI( );
    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()
}

const prepareStagingDataForBattle = ( staging ) => {
    staging.playerChars = [ 
        [ true, nameGen.getRandomName(), charGlobals["CHAD"], playerTopXy ],
        [ true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, playerMiddleXy ],
        [ true, nameGen.getRandomName(), charGlobals["NECKBEARD"], playerBottomXy ]
    ]

    staging.oppoChars = [ 
        [ false, nameGen.getRandomName(), charGlobals["NECKBEARD"], opponentTopXy ],
        [ false, staging.action.name, staging.action.character.class, opponentMiddleXy ],
        [ false, nameGen.getRandomName(), charGlobals["CHAD"], opponentBottomXy ]
    ]

    return staging;
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

class Battle {
    constructor( staging ) {
        this.battlePhase        = globals['PHASE_BEGIN_TURN'];
        this.actionButtonAllowed= true;

        this.playerParty        = new Party( staging.playerChars, "PLAYER" );
        this.playerMembers      = this.playerParty.members;  

        this.opponentParty      = new Party( staging.oppoChars );
        this.opponentMembers    = this.opponentParty.members;  

        this.charactersInField  = [ ];
        this.map                = { };
        
        this.UI                 = new BattleUI( this.playerMembers, this.opponentMembers ); 
        this.selectingTarget    = false;
        this.currentMoveIndex   = 0;

        this.initializeBattleMap( );
    }

    get inSelectMovePhase( ) { return this.battlePhase == globals['PHASE_SELECT_MOVE']; };
    get inDoMovePhase( ) { return this.battlePhase == globals['PHASE_DO_MOVE']; };
    get battleIsOver( ) { return ( this.playerParty.isDefeated || this.opponentParty.isDefeated ); };

    get selectedCharacter( ) { return this.playerParty.activeMember };
    get currentButtonText( ) { return this.UI.activeButtonText; }
    get currentSelectedMove( ) { return this.UI.activeButtonMove };
    get currentStandardAttack( ) { return this.playerParty.activeMember.standardAttack };

    get currentAttacker( ) { return this.charactersInField[this.currentMoveIndex] };
    get currentDefender( ) { 
        let attacker = this.currentAttacker;
        let targetPartyMembers = ( attacker.isPlayer ? this.opponentMembers : this.playerMembers );
        return targetPartyMembers[attacker.nextMove.targetIndex];
    };
    
    initializeBattleMap( ) {
        this.map.mapData = maps.getMapData( "battle/downtown" );
        this.map.tileSheet = new Image();
        this.map.sheetData = tilesheets[this.map.mapData.tileSet];
        this.map.tileSheet.src = '/static/tilesets/' + this.map.sheetData.src;
        this.map.tileSheet.onload = ( ) => {
            grid.drawGrid( {"x": 0, "y": 0}, this.map, this.map.sheetData, true );        
        }
    }

    initUI( ) {
        this.UI.activateButtonAtIndex( 1 );
        this.playerParty.getNextPartyMember( );  
        this.UI.activateMenu( );
    }

    handleActionButton( ) {
        switch( this.battlePhase ) {
            case globals['PHASE_SELECT_MOVE']:
                this.handleActionButtonInSelectionPhase( );
                break;
            case globals['PHASE_DO_MOVE']:
                this.handleActionButtonInExecutionPhase( );
                break;            
            case globals['PHASE_BEGIN_TURN']:
            case globals['PHASE_STAT_CHECK']:
            case globals['PHASE_END_BATTLE']:
                this.passPhase( );
                break;
            default:
                console.log('Invalid battlephase with id: ' + this.battlePhase );    
        }
    }

    passPhase( ) {
        switch ( this.battlePhase ) {
            case globals['PHASE_BEGIN_TURN'] :
                this.beginNewTurn( );
                break;
            case globals['PHASE_SELECT_MOVE'] :
                this.battlePhase = globals['PHASE_DO_MOVE'];
                this.UI.setHeader( " " );
                this.UI.resetSlots( );
                this.prepareMovesForExecution( );
                break;
            case globals['PHASE_DO_MOVE'] :
                this.battleIsOver ? this.endBattle( ) : this.beginNewTurn( );
                break;
            case globals['PHASE_STAT_CHECK'] : 
                this.battlePhase = globals['PHASE_END_BATTLE'];
                break;
            case globals['PHASE_END_BATTLE']:
                if ( this.battleMusic ) {
                    this.battleMusic.stop( )                
                } 
                changeMode.requestModeChange( 'OVERWORLD' ) 
                break;
            default : 
                console.log("Phase " + this.battlePhase + " is not a valid battle phase")
        }
    }

    endBattle( ) {
        this.battlePhase = globals['PHASE_STAT_CHECK']
        const endText = this.playerParty.isDefeated ? "Your party has been defeated..." : "Your party has defeated their enemies!";
        this.UI.setText( endText )
    }

    beginNewTurn( ) {
        this.battlePhase = globals['PHASE_SELECT_MOVE'];
        this.playerParty.prepareMoveSelection( );
        this.opponentParty.selectMoves( );
    }

    prepareMovesForExecution( ) {
        this.setActiveCharactersInField(  );
        this.currentMoveIndex = 0;
    
        this.charactersInField.sort( ( a, b ) => {
            let aAGI = a.character.attributes["AGILITY"]
            let bAGI = b.character.attributes["AGILITY"]
            if ( aAGI > bAGI ) {
                return -1; 
            }
            else if ( bAGI > aAGI ) {
                return 1;
            }
            return 0;     
        } )
        
        this.actionButtonAllowed = false;
        setTimeout(() => {
            this.doCurrentMove( )
        }, 1000 );
        setTimeout(() => {
            this.actionButtonAllowed = true;
        }, 1500);
    }
    
    setActiveCharactersInField( ) {
        this.charactersInField = [ ]
        this.playerMembers.forEach(member => {
            if ( !member.isDefeated ) {
                this.charactersInField.push(member)
            }
        });
        this.opponentMembers.forEach(member => {
            if ( !member.isDefeated ) {
                this.charactersInField.push(member)
            }
        });    
    }

    handleActionButtonInSelectionPhase( ) {
        if ( this.UI.activeButtonText == "RETURN" ) {
            this.UI.inMoveMenu ? this.UI.getStandardMenu( ) : this.playerParty.getPreviousPartyMember( );
        }
        else if ( this.UI.inMoveMenu || this.UI.activeButtonText == "ATTACK" ) {
            if ( this.selectingTarget ) {  
                this.selectMove( );
                this.selectingTarget = false;
                this.UI.getStandardMenu( );
            }
            else {
                this.initTargetSelection( );
                this.selectingTarget = true;
            }
        }
        else if ( this.UI.inItemMenu ) {
            //
        }
    }

    initTargetSelection( ) {
        this.selectedCharacter.nextMove = this.currentButtonText == "ATTACK" ? this.currentStandardAttack : this.currentSelectedMove;
        const targetIndex = this.opponentParty.findNextActiveMemberIndex( "NEXT", false, -1 );
        this.opponentParty.activateTarget( targetIndex );
    }

    selectMove( ) {
        this.selectedCharacter.nextMove.targetIndex = this.targetedCharacter.index;
        this.targetedCharacter.deTarget( );
        this.playerParty.getNextPartyMember( );

        if ( !this.playerParty.inMoveSelection ) {
            this.passPhase( ) 
        }
    }

    handleActionButtonInExecutionPhase( ) {
        if ( this.currentMoveIndex !== this.charactersInField.length && !this.battleIsOver ) {
            this.doCurrentMove( );
        }
        else {
            this.passPhase( );
        }
    }

    doCurrentMove( ) {
        const attacker = this.currentAttacker;
        const defender = this.currentDefender;

        if ( defender.isDefeated || attacker.isDefeated ) {
            this.currentMoveIndex += 1
        }
        else {
            this.actionButtonAllowed = false
            this.UI.setText( attacker.name + " uses " + attacker.nextMove.name + " on " + defender.name )
    
            setTimeout( ( ) => {
                attacker.doMove( defender );
                this.currentMoveIndex += 1
                this.actionButtonAllowed = true
            }, 500 );
        }
    }
}

module.exports = {
    startBattle,
    stopBattle
}