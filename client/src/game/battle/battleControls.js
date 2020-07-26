const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const changeMode    = require('../../game-data/changeMode')

let actionButtonAllowed = true;

const handleBattleKeyPress = ( event ) => {
    state.pressedKeys[event.key] = true;
    const battleState   = state.battleState
    const battleText    = battleState.textContainer
    const playerCanChooseMove = battleState.battlePhase == globals['PHASE_SELECT_MOVE'];

    if ( event.key == "Escape" || event.key == "Esc" ) {
        state.battleState.battleMusic.stop()
        changeMode.requestModeChange( 'OVERWORLD' )
    }
    if ( playerCanChooseMove && !state.battleState.selectingTarget ) {
        handleDirectionKey( )
    }
    else if ( playerCanChooseMove && state.battleState.selectingTarget ) {
        scrollBattleTargets( )
    }
    if ( event.key == " " && actionButtonAllowed ) {
        handleActionButton( playerCanChooseMove, battleState, battleText )
    }
}

const scrollBattleTargets = ( ) => {
    const opponentParty = state.battleState.opponentParty;

    if ( state.pressedKeys.w || state.pressedKeys.ArrowUp ) {
        let newTargetIndex = opponentParty.targetIndex - 1;
        if ( newTargetIndex < 0 ) {
            newTargetIndex = opponentParty.members.length - 1;
        }

        opponentParty.activateTarget( newTargetIndex );
    }
    else if ( state.pressedKeys.s || state.pressedKeys.ArrowDown ) {
        let newTargetIndex = opponentParty.targetIndex + 1;

        if ( newTargetIndex > ( opponentParty.members.length - 1 ) ) {
            newTargetIndex = 0;
        }

        opponentParty.activateTarget( newTargetIndex );
    }
}

const handleDirectionKey = ( ) => {
    const battleMenu = state.battleState.battleMenu; 

    if ( state.pressedKeys.w || state.pressedKeys.ArrowUp ) {
        let newButtonIndex = battleMenu.activeButton.index - 1;
        if ( newButtonIndex < 0 ) {
            newButtonIndex = battleMenu.buttons.length - 1;
        }

        battleMenu.activateButtonAtIndex( newButtonIndex );
    }
    else if ( state.pressedKeys.a || state.pressedKeys.ArrowLeft ) {
        if  ( battleMenu.inMoveMenu ) {
            battleMenu.getStandardMenu( );            
        }
    }
    else if ( state.pressedKeys.s || state.pressedKeys.ArrowDown ) {
        let newButtonIndex = battleMenu.activeButton.index + 1;

        if ( newButtonIndex > ( battleMenu.buttons.length - 1 ) ) {
            newButtonIndex = 0;
        }

        battleMenu.activateButtonAtIndex( newButtonIndex );
    }
    else if ( state.pressedKeys.d || state.pressedKeys.ArrowRight ) {
        if ( battleMenu.activeButton.text == "MOVES" ) {
            battleMenu.getMoveMenu( );            
        }
    }    
}
 
const handleActionButton = ( playerCanChooseMove, battleState, battleText ) => {
    let isAttackPhase = ( battleState.battlePhase == globals['PHASE_DO_MOVE'] )

    const battleMenu = battleState.battleMenu;

    if ( isAttackPhase && battleState.currentMoveIndex !== battleState.charactersInField.length ) {
        doMove( battleState, battleText );
    }
    else if ( playerCanChooseMove && battleMenu.inMoveMenu && !state.battleState.selectingTarget ) {
        
        initTargetSelection( );
        state.battleState.selectingTarget = true;
    }
    else if ( playerCanChooseMove && battleMenu.inMoveMenu && state.battleState.selectingTarget ) {
        let targetCharacter = state.battleState.targetedCharacter;

        selectMove( battleState, battleText, targetCharacter );
        state.battleState.selectingTarget = false;
        battleMenu.getStandardMenu( );
    }
    else if ( battleState.menuIsActive ) {
        console.log(battleState.battleMenu.activateButton)
    }
    else {
        passPhase( battleState, battleText );
    }
}

const initTargetSelection = ( ) => {
    const activePartyMember = state.battleState.playerParty.activeMember
    activePartyMember.nextMove = state.battleState.battleMenu.activeButton.move;
    state.battleState.opponentParty.activateTarget( 0 );
}

const selectMove = ( battleState, battleText, targetCharacter ) => {
    const activePartyMember = battleState.playerParty.activeMember
    activePartyMember.nextMove.targetIndex = targetCharacter.index;
    battleState.battleMenu.resetMenu( );
    targetCharacter.deTarget( );
    battleState.menuIsActive = false;
    battleState.playerParty.getNextPartyMember( )

    if ( !battleState.playerParty.inMoveSelection ) {
        passPhase( battleState, battleText ) 
    }
}

const doMove = ( battleState, battleText ) => {
    battleState.currentMoveIndex += 1
    let currentCharacter = battleState.charactersInField[battleState.currentMoveIndex]
    console.log(currentCharacter)    
    currentCharacter.animateAttack( currentCharacter.nextMove.animation )
    actionButtonAllowed = false
    setTimeout(() => {
        let targetParty = ( currentCharacter.isPlayer ? battleState.opponentParty : battleState.playerParty )
        let targetCharacter =  targetParty.members[currentCharacter.nextMove.targetIndex]
        targetCharacter.animateHit( );
        battleText.setText( currentCharacter.name + " uses " + currentCharacter.nextMove.name + " on " + targetCharacter.name )
        actionButtonAllowed = true
    }, 500 );
}

const passPhase = ( battleState, battleText ) => {
    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_BATTLE'] :
            beginNewTurn( battleState );
            break;
        case globals['PHASE_SELECT_MOVE'] :
            battleState.battlePhase = globals['PHASE_DO_MOVE'];
            battleState.menuIsActive = true;
            prepareMovesForExecution( battleState, battleText );
            break;
        case globals['PHASE_DO_MOVE'] :
            beginNewTurn( battleState )
            break;
        case "END":
            battleState.battleMusic.stop( )
            changeMode.requestModeChange( 'OVERWORLD' )
    }
}

const beginNewTurn = ( battleState ) => {
    battleState.battlePhase = globals['PHASE_SELECT_MOVE'];
    battleState.playerParty.prepareMoveSelection( );
    battleState.opponentParty.selectMoves( );
}

const prepareMovesForExecution = ( battleState, battleText ) => {
    battleState.charactersInField = [ ...battleState.playerParty.members, ...battleState.opponentParty.members ]
    battleState.currentMoveIndex = 0;

    battleState.charactersInField.sort( ( a, b ) => {
        let aATH = a.character.attributes.ATH
        let bATH = b.character.attributes.ATH
        if ( aATH > bATH ) {
            return -1 
        }
        else if ( bATH > aATH ) {
            return 1
        }
        else {
            return 0
        }          
    } )
    
    actionButtonAllowed = false;
    let firstCharacter = battleState.charactersInField[0]
    setTimeout(() => {
        firstCharacter.animateAttack( firstCharacter.nextMove.animation )
    }, 500 );
    setTimeout(() => {
        battleText.setText( firstCharacter.name + " uses " + firstCharacter.nextMove.name )
        actionButtonAllowed = true;
    }, 1000);
}


module.exports = {
    handleBattleKeyPress
}