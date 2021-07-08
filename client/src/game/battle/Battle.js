const globals = require('../../game-data/globals');
const { 
    BATTLE_PHASE_BEGIN_TURN, BATTLE_PHASE_SELECT_MOVE, BATTLE_PHASE_DO_MOVES,
    BATTLE_PHASE_END_TURN, BATTLE_PHASE_END_BATTLE
} = require('../../game-data/battleGlobals');
const { ATT_SPEED } = require('../../game-data/globals');
const { BattleMenu } = require('./BattleMenu');

class Battle {
    constructor( opponentParty, opponentName ) {
        this.opponentName   = opponentName;
        this.phase          = BATTLE_PHASE_BEGIN_TURN; 
        this.opponentParty  = opponentParty;
        this.currentTurn    = 0;

        this.selectingTarget = false;
        this.activeCharacterIndex = -1
        globals.GAME.activeText     = this.opponentParty.members[0].Name + "'s party challenges you to a fight!" 
        this.menu     = new BattleMenu( );

        this.handleCurrentBattlePhase( );
    }

    get playerParty( ) { return globals.GAME.party; };
    get allCharactersInField( ) { return [ ...this.battleSlots.filter( ( e ) => { return e.character.isLiving }) ]; };
    get battleIsOver( ) { return this.opponentParty.isDefeated || this.playerParty.isDefeated; };
    get activeSelectionBattleSlot( ) { return this.playerSlots[this.activeCharacterIndex]; }

    get battleSlots( ) { return globals.GAME.FRONT.battleSlots; };
    set battleSlots( slots ) { globals.GAME.FRONT.battleSlots = slots; };

    get activeText( ) {
        return globals.GAME.activeText;
    }
    set activeText( text ) {
        globals.GAME.activeText = text;
    }

    get inBeginTurnPhase( ) { return this.phase == BATTLE_PHASE_BEGIN_TURN; }
    get inSelectMovePhase( ) { return this.phase == BATTLE_PHASE_SELECT_MOVE; }
    get inDoMovesPhase( ) { return this.phase == BATTLE_PHASE_DO_MOVES; }
    get inEndTurnPhase( ) { return this.phase == BATTLE_PHASE_END_TURN; }
    get inEndBattlePhase( ) { return this.phase == BATTLE_PHASE_END_BATTLE; }
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
        this.setBattleSlotsInOrder( );
        this.activeText = "Turn " + this.currentTurn + " begins!"
    }

    endBeginTurnPhase( ) {
        this.phase = BATTLE_PHASE_SELECT_MOVE;
    }

    startSelectMovePhase( ) {
        this.initializeSelectionMenuForNextCharacter( );
    }

    selectOpponentMoves( ) {
        this.opponentSlots.forEach( ( slot ) => {
            const moves = slot.character.Moves;
            slot.selectMove( 
                moves[ Math.floor( Math.random() * moves.length )], 
                this.opponentSlots[ Math.floor( Math.random() * this.opponentSlots.length ) ] 
            );
        } );
    }

    moveButtonCursor( direction ) {
        this.menu.moveButtonCursor( direction )
    }

    initializeSelectionMenuForNextCharacter( ) {
        this.activeCharacterIndex++;
        this.menu.activateSelectionMenu( );
        this.activeText = "Select a move for " + this.activeSelectionBattleSlot.character.Name + ".";
    }

    getNextCharacterForMoveSelection( ) {
        if ( this.activeCharacterIndex + 1 >= this.playerSlots.length ) {
            this.goToNextBattlePhase( );
        }
        else {
            this.menu.deActivateSelectionMenu( );
            this.initializeSelectionMenuForNextCharacter( )
        }
    }

    handleActionKeyInSelectMovePhase( ) {
        if ( this.selectingTarget ) {
            // this.confirmTarget( );
        }
        else {
            if ( this.menu.inMainMenu && this.menu.activeButtonName == "Select Move" ) {
                this.menu.deActivateMainSelectionMenu( );
                this.menu.activateMovesSubMenu( );
            }
            else if ( this.menu.inMainMenu && this.menu.activeButtonName == "Use Item" ) {
                this.menu.deActivateMainSelectionMenu( );
                this.menu.activateItemsSubMenu( );
            }
        }
    };

    handleReturnKeyInSelectMovePhase( ) {
        if ( this.selectingTarget ) {
            // this.stopTargeting( );
        }
        else {
            if ( this.menu.inItemsMenu ) {
                this.menu.deActivateItemsSubMenu( );
                this.menu.activateMainSelectionMenu( );
            }
            else if ( this.menu.inMovesMenu ) {
                this.menu.deActivateMovesSubMenu( );
                this.menu.activateMainSelectionMenu( );
            }
        }
    };

    endSelectMovePhase( ) {
        this.sortBattleSlotsByCharacterSpeed( );
        this.activeCharacterIndex = -1;
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
        this.activeText = "End of turn " + this.currentTurn + "."
    }

    endEndTurnPhase( ) {
        this.phase = BATTLE_PHASE_BEGIN_TURN;
    }

    endBattle( ) {
        globals.GAME.clearBattleData( );
    }

    setBattleSlotsInOrder( ) {
        const leftSlots = this.battleSlots.filter( ( e ) => { return e.side == "LEFT" } )
        const rightSlots = this.battleSlots.filter( ( e ) => { return e.side == "RIGHT" } )
        leftSlots.sort( ( a, b) => { return a.index - b.index; });
        rightSlots.sort( ( a, b) => { return a.index - b.index; });
        this.playerSlots = [ ...leftSlots];
        this.opponentSlots = [ ...rightSlots];
        this.battleSlots = [ ...leftSlots, ...rightSlots ];
    }

    sortBattleSlotsByCharacterSpeed( ) {
        this.battleSlots.sort( ( thisSlot, nextSlot) => {
            return nextSlot.character.activeAttributeValues[ATT_SPEED] - thisSlot.character.activeAttributeValues[ATT_SPEED];
        });
        this.battleSlots.forEach( ( e ) => { console.log(e.character.Name + " " + e.index)})
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