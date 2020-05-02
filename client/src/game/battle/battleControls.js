const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const changeMode    = require('../../game-data/changeMode')

let actionButtonAllowed = true;

const handleBattleKeyPress = ( event ) => {
    const battleState   = state.battleState
    const battleText    = battleState.textContainer

    const keyIsNumberInMenu = event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5"
    const playerCanChooseMove = battleState.playerParty.inMoveSelection && battleState.battlePhase == globals['PHASE_SELECT_MOVE']

    if ( event.key == "Escape" || event.key == "Esc" ) {
        state.battleState.battleMusic.stop()
        changeMode.requestModeChange( 'OVERWORLD' )
    }
    if ( keyIsNumberInMenu && playerCanChooseMove ) {
        battleState.playerParty.activeMember.sprite.setButtonAsActive( event.key )
    }
    if ( event.key == "q" && actionButtonAllowed ) {
        handleActionButton( playerCanChooseMove, battleState, battleText )
    }
    if ( event.key == "e" && battleState.menuIsActive ) {
        battleState.playerParty.activeMember.unsetMoveMenu( );
    }
    else {
        state.pressedKeys[event.key] = true;        
    }
}

const handleActionButton = ( playerCanChooseMove, battleState, battleText ) => {
    let isSelectionPhase = ( battleState.battlePhase == globals['PHASE_SELECT_MOVE'] )
    let isAttackPhase = ( battleState.battlePhase == globals['PHASE_DO_MOVE'] )

    if ( isAttackPhase && battleState.currentMoveIndex !== battleState.charactersInField.length ) {
        doMove( battleState, battleText );
    }
    else if ( playerCanChooseMove && !battleState.menuIsActive && isSelectionPhase ) {
        handleBattleMenuClick( battleState, battleText );
    }
    else if ( battleState.menuIsActive && isSelectionPhase ) {
        selectMove( battleState, battleText );
    }
    else {
        passPhase( battleState, battleText );
    }
}

const handleBattleMenuClick = ( battleState, battleText ) => {
    const playerUiButtons = battleState.playerParty.activeMember.sprite.buttonSprites

    playerUiButtons.forEach( (button) => {
        if ( button.active ) {
            if ( button.text.includes("1") ) {
                handlePunch( battleState, battleText )
            }
            if ( button.text.includes("2") ) {
                battleState.playerParty.activeMember.setMoveMenu( );
                button.setActive( false );
            }
            if ( button.text.includes("3") ) {
          
            }
            if ( button.text.includes("4") ) {
        
            }
            if ( button.text.includes("5") ) {
            
            }
        }
    } )
}

const selectMove = ( battleState, battleText ) => {
    const activeUiButtons = battleState.playerParty.activeMember.sprite.buttonSprites
    const activePartyMember = battleState.playerParty.activeMember

    activeUiButtons.forEach( (button, index) => {
        if ( button.active ) {
            activePartyMember.nextMove = activePartyMember.moves[index];
        }
    } )

    battleState.menuIsActive = false;
    battleState.playerParty.getNextPartyMember( )

    if ( !battleState.playerParty.inMoveSelection ) {
        passPhase( battleState, battleText ) 
    }
}

const doMove = ( battleState, battleText ) => {
    battleState.currentMoveIndex += 1
    let currentCharacter = battleState.charactersInField[battleState.currentMoveIndex]
    currentCharacter.animateAttack( currentCharacter.nextMove.animation )
    actionButtonAllowed = false
    setTimeout(() => {
        battleText.setText( currentCharacter.name + " uses " + currentCharacter.nextMove.name )
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