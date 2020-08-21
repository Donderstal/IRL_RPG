const BattleUI      = require('./battle-ui/battleUIWrapper').BattleUIWrapper
const changeMode    = require('../../game-data/changeMode');
const battleGlobals = require('./battleGlobals')
const Move          = require('./battle-moves/Move').Move
const Party         = require('./Party').Party

class Battle {
    constructor( staging ) {
        this.battlePhase        = battleGlobals['PHASE_BEGIN_TURN'];
        this.actionButtonAllowed= true;

        this.playerParty        = new Party( staging.playerChars, "PLAYER" );
        this.playerMembers      = this.playerParty.members;  

        this.opponentParty      = new Party( staging.oppoChars );
        this.opponentMembers    = this.opponentParty.members;  

        this.charactersInField  = [ ];
        
        this.UI                 = new BattleUI( this.playerMembers, this.opponentMembers ); 
        this.selectingTarget    = false;
        this.currentMoveIndex   = 0;
    }

    get inSelectMovePhase( ) { return this.battlePhase == battleGlobals['PHASE_SELECT_MOVE']; };
    get inDoMovePhase( ) { return this.battlePhase == battleGlobals['PHASE_DO_MOVE']; };
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

    initUI( ) {
        this.UI.activateButtonAtIndex( 1 );
        this.playerParty.getNextPartyMember( );  
        this.UI.activateMenu( );
    }

    handleActionButton( ) {
        switch( this.battlePhase ) {
            case battleGlobals['PHASE_SELECT_MOVE']:
                this.handleActionButtonInSelectionPhase( );
                break;
            case battleGlobals['PHASE_DO_MOVE']:
                this.handleActionButtonInExecutionPhase( );
                break;            
            case battleGlobals['PHASE_BEGIN_TURN']:
            case battleGlobals['PHASE_STAT_CHECK']:
            case battleGlobals['PHASE_END_BATTLE']:
                this.passPhase( );
                break;
            default:
                console.log('Invalid battlephase with id: ' + this.battlePhase );    
        }
    }

    passPhase( ) {
        switch ( this.battlePhase ) {
            case battleGlobals['PHASE_BEGIN_TURN'] :
                this.beginNewTurn( );
                break;
            case battleGlobals['PHASE_SELECT_MOVE'] :
                this.battlePhase = battleGlobals['PHASE_DO_MOVE'];
                this.UI.setHeader( " " );
                this.UI.resetSlots( );
                this.prepareMovesForExecution( );
                break;
            case battleGlobals['PHASE_DO_MOVE'] :
                this.battleIsOver ? this.endBattle( ) : this.beginNewTurn( );
                break;
            case battleGlobals['PHASE_STAT_CHECK'] : 
                this.battlePhase = battleGlobals['PHASE_END_BATTLE'];
                break;
            case battleGlobals['PHASE_END_BATTLE']:
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
        this.battlePhase = battleGlobals['PHASE_STAT_CHECK']
        const endText = this.playerParty.isDefeated ? "Your party has been defeated..." : "Your party has defeated their enemies!";
        this.UI.setText( endText )
    }

    beginNewTurn( ) {
        this.battlePhase = battleGlobals['PHASE_SELECT_MOVE'];
        this.playerParty.prepareMoveSelection( );
        this.opponentParty.selectMoves( );
    }

    prepareMovesForExecution( ) {
        this.setActiveCharactersInField(  );
        this.currentMoveIndex = 0;
    
        this.charactersInField.sort( ( a, b ) => {
            if ( a.character.attributes["AGILITY"] > b.character.attributes["AGILITY"] ) {
                return -1; 
            }
            else if ( b.character.attributes["AGILITY"] > a.character.attributes["AGILITY"] ) {
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
        let allCharacters = [ ...this.playerMembers, ...this.opponentMembers]
        allCharacters.forEach(member => {
            if ( !member.isDefeated ) {
                this.charactersInField.push( member )
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
        this.selectedCharacter.nextMove = new Move( this.currentButtonText == "ATTACK" ? this.currentStandardAttack : this.currentSelectedMove );
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
    Battle
}