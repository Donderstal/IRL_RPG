const globals = require('../../game-data/globals');
const { 
    BATTLE_PHASE_BEGIN_TURN, BATTLE_PHASE_SELECT_MOVE, BATTLE_PHASE_DO_MOVES,
    BATTLE_PHASE_END_TURN, BATTLE_PHASE_END_BATTLE
} = require('../../game-data/battleGlobals');

class Battle {
    constructor( opponentParty ) {
        this.phase          = BATTLE_PHASE_BEGIN_TURN; 
        this.opponentParty  = opponentParty;
    }

    get playerParty( ) { return globals.GAME.party; };
    get battleIsOver( ) { return this.opponentParty.isDefeated || this.playerParty.isDefeated; };

    /**
     * Depending on the value of this.phase, decide what phase is next
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
                break;
        }
    }
}

module.exports = {
    Battle
}