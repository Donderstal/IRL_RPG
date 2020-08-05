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
        console.log(" Logging battlestate... ")
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

    if ( ( state.pressedKeys.w || state.pressedKeys.ArrowUp ) && opponentParty.isMemberAtPreviousIndex ) {
        let newTargetIndex = opponentParty.targetIndex - 1;
        if ( newTargetIndex < 0 ) {
            newTargetIndex = opponentParty.members.length - 1;
        }        

        if ( !opponentParty.members[newTargetIndex].isDefeated ) {
            opponentParty.activateTarget( newTargetIndex );
        }
    }
    else if ( (state.pressedKeys.s || state.pressedKeys.ArrowDown) && opponentParty.isMemberAtNextIndex ) {

        let newTargetIndex = opponentParty.targetIndex + 1;
        if ( newTargetIndex > ( opponentParty.members.length - 1 ) ) {
            newTargetIndex = 0;
        }

        if ( !opponentParty.members[newTargetIndex].isDefeated ) {
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
 
const handleActionButton = ( playerCanChooseMove, battleState, battleText ) => {
    let isAttackPhase = ( battleState.battlePhase == globals['PHASE_DO_MOVE'] )

    const battleMenu = battleState.battleUI.battleMenu;
    const activeButton = battleMenu.activeButton.text

    const battleIsOver = ( battleState.playerParty.isDefeated || battleState.opponentParty.isDefeated );

    if ( isAttackPhase && battleState.currentMoveIndex !== battleState.charactersInField.length && !battleIsOver ) {
        doMove( battleState, battleText );
    }
    else if ( playerCanChooseMove && ( battleMenu.inMoveMenu || activeButton == "ATTACK") && activeButton != "RETURN" ) {
        if ( battleState.selectingTarget ) {
            let targetCharacter = battleState.targetedCharacter;

            selectMove( battleState, battleText, targetCharacter );
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
        passPhase( battleState, battleText, battleIsOver );
    }
}

const initTargetSelection = ( battleState ) => {
    const activePartyMember = battleState.playerParty.activeMember;
    const activeButtonMove = battleState.battleUI.battleMenu.activeButton.move;
    const standardAttack = activePartyMember.standardAttack;

    activePartyMember.nextMove = ( activeButtonMove != undefined ) ? activeButtonMove : standardAttack
    let firstCharacterIndex = battleState.opponentParty.getFirstUndefeatedCharacterIndex( );
    battleState.opponentParty.activateTarget( firstCharacterIndex );
}

const selectMove = ( battleState, battleText, targetCharacter ) => {
    const activePartyMember = battleState.playerParty.activeMember
    activePartyMember.nextMove.targetIndex = targetCharacter.index;
    targetCharacter.deTarget( );
    battleState.playerParty.getNextPartyMember( )

    if ( !battleState.playerParty.inMoveSelection ) {
        passPhase( battleState, battleText ) 
    }
}

const doMove = ( battleState, battleText ) => {

    let currentCharacter = battleState.charactersInField[battleState.currentMoveIndex]
    let targetParty = ( currentCharacter.isPlayer ? battleState.opponentParty : battleState.playerParty )    
    let targetCharacter =  targetParty.members[currentCharacter.nextMove.targetIndex]; 

    if ( currentCharacter.isDefeated || targetCharacter.isDefeated ) {
        battleState.currentMoveIndex += 1
    }
    else {
        actionButtonAllowed = false
        battleText.setText( currentCharacter.name + " uses " + currentCharacter.nextMove.name + " on " + targetCharacter.name )

        setTimeout( ( ) => {
            currentCharacter.doMove( targetCharacter );
            battleState.currentMoveIndex += 1
            actionButtonAllowed = true
        }, 500 );        
    }

}

const passPhase = ( battleState, battleText, battleIsOver ) => {
    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_BATTLE'] :
            beginNewTurn( battleState );
            break;
        case globals['PHASE_SELECT_MOVE'] :
            battleState.battlePhase = globals['PHASE_DO_MOVE'];
            battleText.setHeader( " " )
            prepareMovesForExecution( battleState, battleText );
            break;
        case globals['PHASE_DO_MOVE'] :
            battleIsOver ? endBattle( battleState, battleText ) : beginNewTurn( battleState );
            break;
        case globals['PHASE_STAT_CHECK'] : 
            battleState.battlePhase = globals['PHASE_END_BATTLE'];
            break;
        case globals['PHASE_END_BATTLE']:
            battleState.battleMusic.stop( )
            changeMode.requestModeChange( 'OVERWORLD' )
            break;
        default : 
            console.log("Phase " + battleState.battlePhase + " is not a valid battle phase")
    }
}

const endBattle = ( battleState, battleText ) => {
    battleState.battlePhase = globals['PHASE_STAT_CHECK']
    if ( battleState.playerParty.isDefeated ) {
        battleText.setText( "Your party has been defeated..." )
    }
    else {
        battleText.setText( "Your party has defeated their enemies!" )
    }
}

const beginNewTurn = ( battleState ) => {
    battleState.battlePhase = globals['PHASE_SELECT_MOVE'];
    battleState.playerParty.prepareMoveSelection( );
    battleState.opponentParty.selectMoves( );
}

const prepareMovesForExecution = ( battleState, battleText ) => {
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
        doMove( battleState, battleText )
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


module.exports = {
    handleBattleKeyPress
}