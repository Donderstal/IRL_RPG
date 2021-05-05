const globals = require('../../game-data/globals');
const { 
    BATTLE_PHASE_BEGIN_TURN, BATTLE_PHASE_SELECT_MOVE, BATTLE_PHASE_DO_MOVES,
    BATTLE_PHASE_END_TURN, BATTLE_PHASE_END_BATTLE
} = require('../../game-data/battleGlobals');
const { ATT_SPEED } = require('../../game-data/globals');
const { BattleText } = require('./BattleText');

class Battle {
    constructor( opponentParty ) {
        this.phase          = BATTLE_PHASE_BEGIN_TURN; 
        this.opponentParty  = opponentParty;
        this.currentTurn    = 0;

        globals.GAME.activeText     = this.opponentParty.members[0].Name + "'s party challenges you to a fight!" 
        this.textContainer  = new BattleText( );

        this.handleCurrentBattlePhase( );
    }

    get playerParty( ) { return globals.GAME.party; };
    get allCharactersInField( ) { return [ ...this.battleSlots.filter( ( e ) => { return e.character.isLiving }) ]; };
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
                ( slot ) => { slot.character.StatusEffects.handleNextTurn(  ); 
            } );            
        };

        this.currentTurn++;
        this.setBattleSlotsInOrder( )
    }

    endBeginTurnPhase( ) {
        this.phase = BATTLE_PHASE_SELECT_MOVE;
    }

    startSelectMovePhase( ) {
        // test setup for move pathfinding and animation
        this.battleSlots[0].selectMove( this.battleSlots[0].character.Moves[1], this.battleSlots[5] )
        this.battleSlots[1].selectMove( this.battleSlots[1].character.Moves[1], this.battleSlots[3] )
        this.battleSlots[2].selectMove( this.battleSlots[2].character.Moves[1], this.battleSlots[4] )
        this.battleSlots[3].selectMove( this.battleSlots[3].character.Moves[1], this.battleSlots[2] )
        this.battleSlots[4].selectMove( this.battleSlots[4].character.Moves[1], this.battleSlots[0] )
        this.battleSlots[5].selectMove( this.battleSlots[5].character.Moves[1], this.battleSlots[1] )
    }

    endSelectMovePhase( ) {
        this.sortBattleSlotsByCharacterSpeed( );
        this.phase = BATTLE_PHASE_DO_MOVES;
    }

    startDoMovesPhase( ) {
        this.activeSlotIndex    = -1
        this.getNextSlotForDoMove( );
    }

    endDoMovesPhase( ) {
        this.phase = this.battleIsOver ? BATTLE_PHASE_END_BATTLE : BATTLE_PHASE_END_TURN;
    }

    startEndTurnPhase( ) {
        this.allCharactersInField.forEach( ( slot ) => { slot.character.StatusEffects.doTurnBasedEffects(  ); } );
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

    getNextSlotForDoMove( ) {
        this.activeSlotIndex++;
        if ( this.activeSlotIndex == this.battleSlots.length ) {
            this.goToNextBattlePhase( );
            return;
        }

        this.activeSlot = this.battleSlots[this.activeSlotIndex];
        if ( this.activeSlot.canDoMove && this.activeSlot.targetSlot.canBeTargeted ) {
            this.activeSlot.doSelectedMove( );
        }
        else {
            this.getNextSlotForDoMove( )
        }
    }
}

module.exports = {
    Battle
}