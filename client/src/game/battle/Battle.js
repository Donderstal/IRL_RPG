const globals = require('../../game-data/globals');
const { 
    BATTLE_PHASE_BEGIN_TURN, BATTLE_PHASE_SELECT_MOVE, BATTLE_PHASE_DO_MOVES,
    BATTLE_PHASE_END_TURN, BATTLE_PHASE_END_BATTLE
} = require('../../game-data/battleGlobals');
const { ATT_SPEED } = require('../../game-data/globals');

class Battle {
    constructor( opponentParty ) {
        this.phase          = BATTLE_PHASE_BEGIN_TURN; 
        this.opponentParty  = opponentParty;
        this.currentTurn    = 0;

        this.handleCurrentBattlePhase( );
    }

    get playerParty( ) { return globals.GAME.party; };
    get allCharactersInField( ) { 
        return [ ...this.playerParty.members.filter( ( e ) => { return e.isLiving }), ...this.opponentParty.members.filter( ( e ) => { return e.isLiving }) ]; 
    };
    get battleIsOver( ) { return this.opponentParty.isDefeated || this.playerParty.isDefeated; };
    get battleSlots( ) { return globals.GAME.FRONT.battleSlots; };
    set battleSlots( slots ) { globals.GAME.FRONT.battleSlots = slots; };
    /** 
     * Depending on the value of this.phase, decide what phase is next and set it to this.phase
     */
    goToNextBattlePhase( ) {
        switch( this.phase ) {
            case BATTLE_PHASE_BEGIN_TURN:
                this.endBeginTurnPhase( );
                break;
            case BATTLE_PHASE_SELECT_MOVE:
                this.endSelectMovePhase( );
                break;
            case BATTLE_PHASE_DO_MOVES:
                this.endDoMovesPhase( );
                break;
            case BATTLE_PHASE_END_TURN:
                this.endEndTurnPhase( );
                break;
            case BATTLE_PHASE_END_BATTLE:
                this.endBattle( );
                break;
        }
        this.handleCurrentBattlePhase( )
    }
    /**
     * Call a method depending on the current value of this.phase
     */
    handleCurrentBattlePhase( ) {
        switch( this.phase ) {
            case BATTLE_PHASE_BEGIN_TURN:
                this.startBeginTurnPhase( );
                break;
            case BATTLE_PHASE_SELECT_MOVE:
                this.startSelectMovePhase( );
                break;
            case BATTLE_PHASE_DO_MOVES:
                this.startDoMovesPhase( );
                break;
            case BATTLE_PHASE_END_TURN:
                this.startEndTurnPhase( );
                break;
        }
    }

    startBeginTurnPhase( ) {
        if( this.currentTurn != 0 ) {
            this.allCharactersInField.forEach( 
                ( character ) => { character.StatusEffects.handleNextTurn(  ); 
            } );            
        };


        this.currentTurn++;
        this.setBattleSlotsInOrder( )
    }

    endBeginTurnPhase( ) {
        this.phase = BATTLE_PHASE_SELECT_MOVE;
    }

    startSelectMovePhase( ) {
        
    }

    endSelectMovePhase( ) {
        this.sortBattleSlotsByCharacterSpeed( );
        this.phase = BATTLE_PHASE_DO_MOVES;
    }

    startDoMovesPhase( ) {

    }

    endDoMovesPhase( ) {
        this.phase = this.battleIsOver ? BATTLE_PHASE_END_BATTLE : BATTLE_PHASE_END_TURN;
    }

    startEndTurnPhase( ) {
        this.allCharactersInField.forEach( ( character ) => { character.StatusEffects.doTurnBasedEffects(  ); } );
    }

    endEndTurnPhase( ) {
        this.phase = BATTLE_PHASE_BEGIN_TURN;
    }

    endBattle( ) {
        globals.GAME.clearBattleData( );
    }

    setBattleSlotsInOrder( ) {
        const leftSlots = this.battleSlots.filter( ( e ) => e.side == "LEFT" )
        const rightSlots = this.battleSlots.filter( ( e ) => e.side == "RIGHT" )
        leftSlots.sort( ( a, b) => { return a.index - b.index; });
        rightSlots.sort( ( a, b) => { return a.index - b.index; });
        this.battleSlots = [ ...leftSlots, ...rightSlots ];
    }

    sortBattleSlotsByCharacterSpeed( ) {
        this.battleSlots.sort( ( thisSlot, nextSlot) => {
            return nextSlot.character.activeAttributeValues[ATT_SPEED] - thisSlot.character.activeAttributeValues[ATT_SPEED];
        });
    }
}

module.exports = {
    Battle
}