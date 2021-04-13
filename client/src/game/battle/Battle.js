const globals = require('../../game-data/globals');
const { 
    BATTLE_PHASE_BEGIN_TURN, BATTLE_PHASE_SELECT_MOVE, BATTLE_PHASE_DO_MOVES,
    BATTLE_PHASE_END_TURN, BATTLE_PHASE_END_BATTLE
} = require('../../game-data/battleGlobals');

class Battle {
    constructor( opponentParty ) {
        this.phase          = BATTLE_PHASE_BEGIN_TURN; 
        this.opponentParty  = opponentParty;
        this.currentTurn    = 1;
    }

    get playerParty( ) { return globals.GAME.party; };
    get allCharactersInField( ) { 
        return [ ...this.playerParty.members.filter( ( e ) => { return e.isLiving }), ...this.opponentParty.members.filter( ( e ) => { return e.isLiving }) ]; 
    };
    get battleIsOver( ) { return this.opponentParty.isDefeated || this.playerParty.isDefeated; };
    get battleSlots( ) { return globals.GAME.FRONT.battleSlots }
    /** 
     * Depending on the value of this.phase, decide what phase is next and set it to this.phase
     */
    goToNextBattlePhase( ) {
        switch( this.phase ) {
            case BATTLE_PHASE_BEGIN_TURN:
                this.phase = BATTLE_PHASE_SELECT_MOVE;
                break;
            case BATTLE_PHASE_SELECT_MOVE:
                this.phase = BATTLE_PHASE_DO_MOVES;
                break;
            case BATTLE_PHASE_DO_MOVES:
                this.phase = this.battleIsOver ? BATTLE_PHASE_END_BATTLE : BATTLE_PHASE_END_TURN;
                break;
            case BATTLE_PHASE_END_TURN:
                this.phase = BATTLE_PHASE_BEGIN_TURN;
                break;
            case BATTLE_PHASE_END_BATTLE:
                globals.GAME.clearBattleData( );
                return;
        }
        this.handleNextBattlePhase( )
    }
    /**
     * Call a method depending on the current value of this.phase
     */
    handleNextBattlePhase( ) {
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
        this.currentTurn++;
        this.allCharactersInField.forEach( ( character ) => { character.StatusEffects.handleNextTurn(  ); } );
        console.log('begin turn')
    }

    startSelectMovePhase( ) {
        console.log( 'select move' )
    }

    startDoMovesPhase( ) {
        console.log( 'do move' )
    }

    startEndTurnPhase( ) {
        this.allCharactersInField.forEach( ( character ) => { character.StatusEffects.doTurnBasedEffects(  ); } );
        console.log( 'end turn ' + this.currentTurn );
    }
}

module.exports = {
    Battle
}