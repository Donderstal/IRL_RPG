const globals = require('../../game-data/globals');
const { 
    BATTLE_PHASE_BEGIN_TURN, BATTLE_PHASE_SELECT_MOVE, BATTLE_PHASE_DO_MOVES,
    BATTLE_PHASE_END_TURN, BATTLE_PHASE_END_BATTLE
} = require('../../game-data/battleGlobals');
const { ATT_SPEED, ITEM_CATEGORY_CONSUMABLE } = require('../../game-data/globals');
const { BattleMenu } = require('./BattleMenu');
const { getPreviousIndexInArray, getNextIndexInArray } = require('../../helpers/utilFunctions');
const { MOVE_PROP_KEY_TYPE, MOVE_TYPE_HEAL,MOVE_TYPE_STAT_UP } = require('../../game-data/moveGlobals');
const { STANDARD_ATTACK, STANDARD_DEFEND } = require('../../resources/battleMoveResources');
const { getMoveAnimationData } = require('../../resources/moveAnimationScripts');
const { getRandomItemOfType } = require('../../resources/itemResources');

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

        this.basicAttackAnimation = getMoveAnimationData( "PHYISCAL_ATTACK_TEST" );
        this.basicConsumableAnimation = getMoveAnimationData( "HEAL_TEST" );
        this.basicUsableAnimation = getMoveAnimationData( "SPECIAL_ATTACK_TEST" );

        this.handleCurrentBattlePhase( );
    }

    get playerParty( ) { return globals.GAME.party; };
    get allCharactersInField( ) { return [ ...this.battleSlots.filter( ( e ) => { return e.character.isLiving }) ]; };
    get battleIsOver( ) { return this.opponentParty.isDefeated || this.playerParty.isDefeated; };
    get activeSelectionBattleSlot( ) { return this.playerSlots[this.activeCharacterIndex]; }

    get battleSlots( ) { return globals.GAME.FRONT.battleSlots; };
    set battleSlots( slots ) { globals.GAME.FRONT.battleSlots = slots; };

    get playerSlots( ) { return this.allPlayerSlots.filter( ( e ) => { return e.isAlive; } ); }
    set playerSlots( slots ) { this.allPlayerSlots = slots; }

    get opponentSlots( ) { return this.allOpponentSlots.filter( ( e ) => { return e.isAlive; } ); }
    set opponentSlots( slots ) { this.allOpponentSlots = slots; }

    get targetedSlot( ) { 
        let selectedActionType = MOVE_PROP_KEY_TYPE in this.currentlySelectedAction ? this.currentlySelectedAction[MOVE_PROP_KEY_TYPE] : this.currentlySelectedAction.Item.Type
        if ( selectedActionType == MOVE_TYPE_HEAL || selectedActionType ==  MOVE_TYPE_STAT_UP ) {
            return this.playerSlots[this.targetIndex]
        }
        else {
            return this.opponentSlots[this.targetIndex]             
        }
    }
    get currentlySelectedAction( ) { 
        if ( this.selectingTarget ) {
            if ( this.menu.inMainMenu && this.menu.activeButtonName == "Standard Attack" ) {
                STANDARD_ATTACK.animation = this.basicAttackAnimation;
                return STANDARD_ATTACK;
            }
            else if ( this.menu.inMovesMenu ) {
                let selectedMove = this.activeSelectionBattleSlot.character.Moves.filter( ( e ) => { return e["NAME"] == this.menu.activeButtonName } ); 
                return selectedMove[0];                
            }
            else if ( this.menu.inItemsMenu ) {
                let filteredItem = globals.GAME.PLAYER_INVENTORY.ItemList.filter( ( e ) => { return e.Name == this.menu.activeButtonName } ); 
                let selectedItem = filteredItem[0];
                selectedItem.animation = this.basicConsumableAnimation;
                return selectedItem;
            }
        }
        else if ( this.menu.inMainMenu && this.menu.activeButtonName == "Defend" ) {
            STANDARD_DEFEND.animation = this.basicConsumableAnimation;
            return STANDARD_DEFEND;
        }
        else {
            return null;
        }

    }

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
                this.endEndBattlePhase( );
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
            case BATTLE_PHASE_END_BATTLE:
                this.startEndBattlePhase( );
                break
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
        this.selectOpponentMoves( );
    }

    selectOpponentMoves( ) {
        this.opponentSlots.forEach( ( slot ) => {
            let standardAttack = STANDARD_ATTACK
            standardAttack.animation = this.basicAttackAnimation;
            let moves = [ ...slot.character.Moves, standardAttack ]
            let move = moves[ Math.floor( Math.random() * moves.length )];
            let targetSlot;

            if ( move[MOVE_PROP_KEY_TYPE] == MOVE_TYPE_HEAL || move[MOVE_PROP_KEY_TYPE] == MOVE_TYPE_STAT_UP ) {
                targetSlot = this.opponentSlots[ Math.floor( Math.random() * this.opponentSlots.length ) ] 
            }
            else {
                targetSlot = this.playerSlots[ Math.floor( Math.random() * this.playerSlots.length ) ] 
            }

            slot.selectMove( move, targetSlot );
        } );
    }

    moveButtonCursor( direction ) {
        if ( this.selectingTarget ) {
            let targetSlots = this.targetedSlot.side == "RIGHT" ? this.opponentSlots : this.playerSlots;
            if ( direction == "UP" && targetSlots.length > 1 ) {
                this.targetedSlot.deTarget( );
                this.targetIndex = getPreviousIndexInArray( this.targetIndex, targetSlots );
                this.targetedSlot.target( );
                this.activeText = "Use " + this.menu.activeButton.Name + " on " + this.targetedSlot.character.Name + "?";
            }
            else if ( direction == "DOWN" && targetSlots.length > 1 ) {
                this.targetedSlot.deTarget( );
                this.targetIndex = getNextIndexInArray( this.targetIndex, targetSlots );
                this.targetedSlot.target( );
                this.activeText = "Use " + this.menu.activeButton.Name + " on " + this.targetedSlot.character.Name + "?";
            }
        }
        else {
            this.menu.moveButtonCursor( direction );            
        }
    }

    initializeSelectionMenuForNextCharacter( ) {
        this.activeCharacterIndex++;
        this.activeSelectionBattleSlot.activateSelectionMode( );
        this.menu.activateSelectionMenu( );
        this.activeText = "Select a move for " + this.activeSelectionBattleSlot.character.Name + ".";
    }

    unsetSelectionMenuForActiveCharacter( ) {
        this.menu.deActivateSelectionMenu( );
        this.activeSelectionBattleSlot.deactivateSelectionMode( );
    }

    getNextCharacterForMoveSelection( ) {
        this.deactivateChooseTargetMode( );
        this.unsetSelectionMenuForActiveCharacter( );
        if ( this.activeCharacterIndex + 1 >= this.playerSlots.length ) {
            this.goToNextBattlePhase( );
        }
        else {
            this.initializeSelectionMenuForNextCharacter( )
        }
    }

    handleActionKeyInSelectMovePhase( ) {
        if ( this.selectingTarget ) {
            this.activeSelectionBattleSlot.selectMove( this.currentlySelectedAction, this.targetedSlot );
            if ( this.menu.inItemsMenu ) {
                this.currentlySelectedAction.addPendingForUsage( );
            }
            this.getNextCharacterForMoveSelection( );
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
            else if ( this.menu.inMainMenu && this.menu.activeButtonName == "Defend" ) {
                STANDARD_DEFEND.animation = this.basicConsumableAnimation;
                this.activeSelectionBattleSlot.selectMove( STANDARD_DEFEND, this.activeSelectionBattleSlot );
                this.getNextCharacterForMoveSelection( );
            }
            else {
                this.activateChooseTargetMode( );
            }
        }
    };

    handleReturnKeyInSelectMovePhase( ) {
        if ( this.selectingTarget ) {
            this.deactivateChooseTargetMode( );
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

    activateChooseTargetMode( ) {
        this.selectingTarget = true;
        this.targetIndex = 0;
        this.targetedSlot.target( );
        this.activeText = "Use " + this.menu.activeButton.Name + " on " + this.targetedSlot.character.Name + "?";
    };

    deactivateChooseTargetMode( ) {
        this.targetedSlot.deTarget( );
        this.selectingTarget = false;
        this.activeText = this.menu.activeButton.Description;
    }

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

    startEndBattlePhase( ) {
        if ( this.playerParty.isDefeated ) {
            this.activeText = "Your party has been defeated in battle!";
            this.opponentSlots.forEach( ( slot ) => {
                slot.setCheeringAnimation( );
            } )
            this.resultText = [
                this.opponentParty.members[0].Name + "'s party celebrates their victory!",
                "You lose " + Math.floor( Math.random( ) * 100 ) + " Euros."
            ];
        }
        else {
            this.activeText = "Your party has won the battle!";
            this.playerSlots.forEach( ( slot ) => {
                slot.setCheeringAnimation( );
            } )
            this.handleBattleEnd( );
        }
    }

    handleBattleEnd( ) {
        this.resultTextIndex = -1;
        let moneyFromBattle = Math.floor( Math.random( ) * 100 )
        this.resultText = [
            "You get " + moneyFromBattle + " Euros."
        ]
        this.playerParty.inventory.addMoney( moneyFromBattle );

        if ( Math.floor( Math.random( ) * 100 ) > 49 ) {
            let item = getRandomItemOfType( ITEM_CATEGORY_CONSUMABLE );
            this.resultText.push( "You got a" + item.name + "!");
            this.playerParty.inventory.addItemsToInnerListByID( [ item.key ] );
        }

        let experienceGained = this.opponentParty.getExperienceValue( );
        this.resultText.push( "The party gets " + experienceGained + " experience points." )
        this.playerSlots.forEach( ( slot ) => { 
            if ( slot.character.addExperience( experienceGained ) ) {
                this.resultText.push( slot.character.Name + " has leveled up to level " + slot.character.Level + "!" );
            }
        })
    }

    getNextBattleEndText( ) {
        if ( this.resultTextIndex + 1 < this.resultText.length ) {
            this.resultTextIndex++
            this.activeText = this.resultText[this.resultTextIndex]
        }
        else {
            this.endEndBattlePhase( );
        }
    }

    endEndBattlePhase( ) {
        this.endBattle( );
    }

    endBattle( ) {
        globals.GAME.clearBattleData( this.playerParty.isDefeated );
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