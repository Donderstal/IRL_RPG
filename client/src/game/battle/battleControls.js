const state         = require('../../game-data/state')
const changeMode    = require('../../game-data/changeMode');

const handleBattleKeyPress = ( event ) => {
    const battle = state.battleState;
    state.pressedKeys[event.key] = true;

    if ( event.key == "Escape" || event.key == "Esc" ) {
        battle.battleMusic.stop()
        changeMode.requestModeChange( 'OVERWORLD' )
    }

    if ( event.key == "l" ) {
        logBattleState( battle );
    }

    if ( battle.inSelectMovePhase ) {
        if ( battle.selectingTarget ) {
            scrollBattleTargets( battle.opponentParty, state.pressedKeys )
        }
        else {
            handleDirectionKey( battle.UI, state.pressedKeys )
        }
    }

    if ( event.key == "z" && battle.selectingTarget ) {
        battle.deTarget( );
    } else if ( event.key == "z" && battle.UI.inMoveMenu ) {
        battle.UI.getStandardMenu( );     
        battle.UI.activateButtonAtIndex( battle.UI.activeButtonIndex );             
    }

    if ( event.key == " " && battle.actionButtonAllowed ) {
        battle.handleActionButton( );
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