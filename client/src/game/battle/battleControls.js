const globals       = require('../../game-data/globals')
const battleGlobals = require('./battleGlobals')

const handleBattleKeyPress = ( event ) => {
    const battle = globals.GAME.BATTLE;
    globals.GAME.pressedKeys[event.key] = true;

    if ( event.key == "Escape" || event.key == "Esc" ) {
        battle.battleMusic.stop()
    }

    if ( event.key == "l" ) {
        logBattleState( battle );
    }

    if ( battle.inSelectMovePhase ) {
        if ( battle.selectingTarget ) {
            scrollBattleTargets( battle.opponentParty, globals.GAME.pressedKeys )
        }
        else {
            handleDirectionKey( battle.UI, globals.GAME.pressedKeys )
        }
    }

    if ( event.key == "z" ) {
        handleReturnButton( );         
    }

    if ( event.key == " " && battle.actionButtonAllowed ) {
        handleActionButton( );
    }
}

const scrollBattleTargets = ( opponentParty, keys ) => {
    if ( keys.w || keys.ArrowUp ) {
        let newTargetIndex = opponentParty.findNextActiveMemberIndex( "PREV", true, opponentParty.targetIndex );

        if ( newTargetIndex !== false ) {
            opponentParty.activateTarget( newTargetIndex );            
        } 
    }
    else if ( keys.s || keys.ArrowDown ) {
        let newTargetIndex = opponentParty.findNextActiveMemberIndex( "NEXT", true, opponentParty.targetIndex ); 

        if ( newTargetIndex !== false ) {
            opponentParty.activateTarget( newTargetIndex );            
        } 
    }
}

const handleDirectionKey = ( UI, keys ) => {
    if ( keys.w || keys.ArrowUp ) {
        UI.activateButtonAtIndex( UI.activeButtonIndex - 1 );
    }
    else if ( keys.s || keys.ArrowDown ) {
        UI.activateButtonAtIndex( UI.activeButtonIndex + 1 );
    }    
}

const handleActionButton = ( ) => {
    const battle = globals.GAME.BATTLE;    
    switch( battle.battlePhase ) {
        case battleGlobals['PHASE_SELECT_MOVE']:
            battle.handleActionButtonInSelectionPhase( );
            break;
        case battleGlobals['PHASE_DO_MOVE']:
            battle.handleActionButtonInExecutionPhase( );
            break;            
        case battleGlobals['PHASE_BEGIN_TURN']:
        case battleGlobals['PHASE_STAT_CHECK']:
        case battleGlobals['PHASE_END_BATTLE']:
            battle.passPhase( );
            break;
        default:
            console.log('Invalid battlephase with id: ' + battle.battlePhase );    
    }
}

const handleReturnButton = ( ) => {
    const battle = globals.GAME.BATTLE;    
    if ( battle.battlePhase == battleGlobals['PHASE_SELECT_MOVE'] ) {
        if ( battle.selectingTarget ) {
            battle.deTarget( );
        } 
        else if ( battle.UI.inMoveMenu ) {
            battle.UI.getStandardMenu( );     
            battle.UI.activateButtonAtIndex( battle.UI.activeButtonIndex );             
        }
        else if ( battle.UI.inItemMenu ) {

        }
        else {
            battle.playerParty.getPreviousPartyMember( );
        }
    }
}

const logBattleState = ( battleState ) => {
    console.log(" Beginning of battlestate log... ")
    console.log("Battlestate... ")
    console.log(battleState)
    console.log("Phase: ")
    console.log(battleState.battlePhase)
    console.log("Playerparty: ")
    console.log(battleState.playerParty)
    console.log("Opponentparty: ")
    console.log(battleState.opponentParty)
    console.log("UI: ")
    console.log(battleState.UI)
    console.log('________________________')
}


module.exports = {
    handleBattleKeyPress
}