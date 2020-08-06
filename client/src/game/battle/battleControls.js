const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const changeMode    = require('../../game-data/changeMode');
const battleStats = require('./battle-ui/battleStats');

let actionButtonAllowed = true;

const handleBattleKeyPress = ( event ) => {
    state.pressedKeys[event.key] = true;
    const battleState   = state.battleState
    const playerCanChooseMove = battleState.battlePhase == globals['PHASE_SELECT_MOVE'];

    if ( event.key == "Escape" || event.key == "Esc" ) {
        state.battleState.battleMusic.stop()
        changeMode.requestModeChange( 'OVERWORLD' )
    }

    if ( event.key == "l" ) {
        logBattleState( battleState );
    }

    if ( playerCanChooseMove && !state.battleState.selectingTarget ) {
        handleDirectionKey( )
    }
    else if ( playerCanChooseMove && state.battleState.selectingTarget ) {
        scrollBattleTargets( )
    }

    if ( event.key == " " && actionButtonAllowed ) {
        handleActionButton( playerCanChooseMove, battleState )
    }
}

const scrollBattleTargets = ( ) => {
    const opponentParty = state.battleState.opponentParty;

    if ( state.pressedKeys.w || state.pressedKeys.ArrowUp ) {
        console.log("to PREV; current target: " + opponentParty.targetIndex )
        let newTargetIndex = opponentParty.findNextActiveMemberIndex( "PREV", true, opponentParty.targetIndex );

        if ( newTargetIndex !== false ) {
            opponentParty.activateTarget( newTargetIndex );            
        } 
    }
    else if ( state.pressedKeys.s || state.pressedKeys.ArrowDown ) {
        console.log("to NEXT; current target: " + opponentParty.targetIndex )
        let newTargetIndex = opponentParty.findNextActiveMemberIndex( "NEXT", true, opponentParty.targetIndex ); 

        if ( newTargetIndex !== false ) {
            opponentParty.activateTarget( newTargetIndex );            
        } 
    }
}

const handleDirectionKey = ( ) => {
    const UI = state.battleState.battleUI; 

    if ( state.pressedKeys.w || state.pressedKeys.ArrowUp ) {
        UI.activateButtonAtIndex( UI.battleMenu.activeButton.index - 1 );
    }
    else if ( state.pressedKeys.a || state.pressedKeys.ArrowLeft ) {
        if  ( UI.battleMenu.inMoveMenu ) {
            UI.getStandardMenu( );     
            UI.activateButtonAtIndex( UI.battleMenu.activeButton.index );             
        }
    }
    else if ( state.pressedKeys.s || state.pressedKeys.ArrowDown ) {
        UI.activateButtonAtIndex( UI.battleMenu.activeButton.index + 1 );
    }
    else if ( state.pressedKeys.d || state.pressedKeys.ArrowRight ) {
        if ( UI.battleMenu.activeButton.text == "MOVES" ) {
            UI.getMoveMenu( );  
            UI.activateButtonAtIndex( UI.battleMenu.activeButton.index );          
        }
    }    
}
 
const handleActionButton = ( playerCanChooseMove, battleState ) => {
    let isAttackPhase = ( battleState.battlePhase == globals['PHASE_DO_MOVE'] )

    const UI = battleState.battleUI
    const battleMenu = UI.battleMenu;
    const activeButton = battleMenu.activeButton.text


    const battleIsOver = ( battleState.playerParty.isDefeated || battleState.opponentParty.isDefeated );

    if ( isAttackPhase && battleState.currentMoveIndex !== battleState.charactersInField.length && !battleIsOver ) {
        doMove( battleState, UI );
    }
    else if ( playerCanChooseMove && ( battleMenu.inMoveMenu || activeButton == "ATTACK") && activeButton != "RETURN" ) {
        if ( battleState.selectingTarget ) {
            let targetCharacter = battleState.targetedCharacter;

            selectMove( battleState, UI, targetCharacter );
            battleState.selectingTarget = false;
            battleMenu.getStandardMenu( );
        }
        else {
            initTargetSelection( battleState );
            battleState.selectingTarget = true;
        }
    }
    else if ( playerCanChooseMove && battleMenu.inItemMenu ) {
        //
    }
    else if ( playerCanChooseMove && activeButton == "RETURN" && battleMenu.inMoveMenu ) {
        battleMenu.getStandardMenu( );
    }
    else if ( playerCanChooseMove && activeButton == "RETURN" && battleState.playerParty.activeMemberIndex != 0 ) {
        battleState.playerParty.getPreviousPartyMember( ); 
    }
    else if ( battleState.battlePhase != globals['PHASE_SELECT_MOVE'] ) {
        passPhase( battleState, UI, battleIsOver );
    }
}

const initTargetSelection = ( battleState ) => {
    const activePartyMember = battleState.playerParty.activeMember;
    const activeButtonMove = battleState.battleUI.battleMenu.activeButton.move;
    const standardAttack = activePartyMember.standardAttack;

    activePartyMember.nextMove = ( activeButtonMove != undefined ) ? activeButtonMove : standardAttack
    let firstCharacterIndex = battleState.opponentParty.findNextActiveMemberIndex( "NEXT", false, -1 );
    battleState.opponentParty.activateTarget( firstCharacterIndex );
}

const selectMove = ( battleState, UI, targetCharacter ) => {
    const activePartyMember = battleState.playerParty.activeMember
    activePartyMember.nextMove.targetIndex = targetCharacter.index;
    targetCharacter.deTarget( );
    battleState.playerParty.getNextPartyMember( )

    if ( !battleState.playerParty.inMoveSelection ) {
        passPhase( battleState, UI ) 
    }
}

const doMove = ( battleState, UI ) => {

    let currentCharacter = battleState.charactersInField[battleState.currentMoveIndex]
    let targetParty = ( currentCharacter.isPlayer ? battleState.opponentParty : battleState.playerParty )    
    let targetCharacter =  targetParty.members[currentCharacter.nextMove.targetIndex]; 

    if ( currentCharacter.isDefeated || targetCharacter.isDefeated ) {
        battleState.currentMoveIndex += 1
    }
    else {
        actionButtonAllowed = false
        UI.setText( currentCharacter.name + " uses " + currentCharacter.nextMove.name + " on " + targetCharacter.name )

        setTimeout( ( ) => {
            currentCharacter.doMove( targetCharacter );
            battleState.currentMoveIndex += 1
            actionButtonAllowed = true
        }, 500 );        
    }

}

const passPhase = ( battleState, UI, battleIsOver ) => {
    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_BATTLE'] :
            beginNewTurn( battleState );
            break;
        case globals['PHASE_SELECT_MOVE'] :
            battleState.battlePhase = globals['PHASE_DO_MOVE'];
            UI.setHeader( " " );
            UI.resetSlots( );
            prepareMovesForExecution( battleState, UI );
            break;
        case globals['PHASE_DO_MOVE'] :
            battleIsOver ? endBattle( battleState, UI ) : beginNewTurn( battleState );
            break;
        case globals['PHASE_STAT_CHECK'] : 
            battleState.battlePhase = globals['PHASE_END_BATTLE'];
            break;
        case globals['PHASE_END_BATTLE']:
            if ( battleState.battleMusic ) {
                battleState.battleMusic.stop( )                
            } 
            changeMode.requestModeChange( 'OVERWORLD' ) 
            break;
        default : 
            console.log("Phase " + battleState.battlePhase + " is not a valid battle phase")
    }
}

const endBattle = ( battleState, UI ) => {
    battleState.battlePhase = globals['PHASE_STAT_CHECK']
    const endText = battleState.playerParty.isDefeated ? "Your party has been defeated..." : "Your party has defeated their enemies!";
    if ( battleState.playerParty.isDefeated ) {
        UI.setText( endText )
    }
    else {
        UI.setText( "Your party has defeated their enemies!" )
    }
}

const beginNewTurn = ( battleState ) => {
    battleState.battlePhase = globals['PHASE_SELECT_MOVE'];
    battleState.playerParty.prepareMoveSelection( );
    battleState.opponentParty.selectMoves( );
}

const prepareMovesForExecution = ( battleState, UI ) => {
    battleState.charactersInField = getActiveCharactersInField( battleState );

    battleState.currentMoveIndex = 0;

    battleState.charactersInField.sort( ( a, b ) => {
        let aAGI = a.character.attributes["AGILITY"]
        let bAGI = b.character.attributes["AGILITY"]
        if ( aAGI > bAGI ) {
            return -1 
        }
        else if ( bAGI > aAGI ) {
            return 1
        }
        else {
            return 0
        }          
    } )
    
    actionButtonAllowed = false;
    setTimeout(() => {
        doMove( battleState, UI )
    }, 1000 );
    setTimeout(() => {
        actionButtonAllowed = true;
    }, 1500);
}

const getActiveCharactersInField = ( battleState ) => {
    let returnArray = [ ]

    battleState.playerParty.members.forEach(member => {
        if ( !member.isDefeated ) {
            returnArray.push(member)
        }
    });
    
    battleState.opponentParty.members.forEach(member => {
        if ( !member.isDefeated ) {
            returnArray.push(member)
        }
    });    

    return returnArray
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
    console.log(battleState.battleUI)
    console.log(" End of battlestate log... ")
}


module.exports = {
    handleBattleKeyPress
}