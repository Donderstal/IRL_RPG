const {     
    LEFT_BATTLE_POSITION_1, LEFT_BATTLE_POSITION_2, LEFT_BATTLE_POSITION_3,
    RIGHT_BATTLE_POSITION_1, RIGHT_BATTLE_POSITION_2, RIGHT_BATTLE_POSITION_3,
    SHEET_ROW_BATTLE_FACING_LEFT, SHEET_ROW_BATTLE_FACING_RIGHT,
    BATTLE_STEP_GO_TO, BATTLE_STEP_GO_BACK, BATTLE_STEP_MOVE_FORWARD,
    BATTLE_STEP_ANIMATION, BATTLE_STEP_HIT, CONTROL_LEFT, CONTROL_RIGHT
} = require('../../game-data/battleGlobals');
const globals = require('../../game-data/globals');
const { BattleSprite } = require('./BattleSprite');
const { FRAME_LIMIT, GRID_BLOCK_PX } = require('../../game-data/globals');
const { StatBar } = require('../interfaces/I_StatBar');
const { handleMoveExecution } = require('../../helpers/moveHelpers');
const { MOVE_PROP_KEY_NAME } = require('../../game-data/moveGlobals');
const { getClassSprite } = require('../../resources/classProfileResources');
const { drawFromImageToCanvas } = require('../../helpers/canvasHelpers');
const { StackedItem } = require('../party/StackedItem');
/**
 * A BattleSlot represents one of 6 available slots for a character in a Battle.
 * The player characters are on the left, the opponent characters are on the right.
 * A BattleSlot contains a Sprite and a Character instance.
 */
class BattleSlot {
    constructor( index, side ) {
        this.index  = index;
        this.side   = side;
        this.sprite     = null;
        this.HPStatBars = null;
        this.PPStatBars = null;

        this.tilePosition   = this.setTilePosition( );
        this.tile = globals.GAME.FRONT.battleGrid.getTileAtCell( this.tilePosition.column, this.tilePosition.row );
        this.slotX = this.tile.x;
        this.slotY = this.tile.y

        this.performingBattleMove = false;
        this.selectedMove = null;
        this.targetSlot = null;

        this.inMoveSelection = false;
        this.isTargeted    = false;

        this.greenArrowPNG      = globals.PNG_DICTIONARY["/static/ui/green_arrow.png"];
        this.redArrowPNG        = globals.PNG_DICTIONARY["/static/ui/red_arrow.png"];
    }

    get inBattleMoveAnimation( ) { return this.sprite.inScriptedAnimation || this.sprite.movingToDestination };
    get inFadeOutAnimation( ) { return !this.character.isLiving && this.sprite.inScriptedAnimation };
    get canBeTargeted( ) { return this.character.isLiving };
    get canDoMove( ) { return this.character.isLiving };
    get isAlive( ) { return this.character.isLiving }
    get activeHP( ) { return this.character.CurrentHitpoints };
    get activePP( ) { return this.character.CurrentPowerpoints };
    get maxHP( ) { return this.character.maxHP };
    get maxPP( ) { return this.character.maxPP }; 

    drawInMoveSelectionArrow( ) {
        drawFromImageToCanvas(
            "FRONT", this.greenArrowPNG,
            0, 0,
            860, 900,
            this.sprite.x, this.sprite.y - GRID_BLOCK_PX, 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        )
    }

    drawIsTargetedArrow( ) {
        drawFromImageToCanvas(
            "FRONT", this.redArrowPNG,
            0, 0,
            1200, 1200,
            this.sprite.x + this.sprite.width, this.sprite.y + (this.sprite.height / 2) - (GRID_BLOCK_PX / 2), 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        )
    }

    setCheeringAnimation( ) {
        this.sprite.setScriptedAnimation( { 
            animName: "SELECTION_ANIMATION",
            loop: true
        }, FRAME_LIMIT );
    }

    activateSelectionMode( ) {
        this.setCheeringAnimation( );
        this.inMoveSelection = true;
    }

    deactivateSelectionMode( ) {
        this.sprite.unsetScriptedAnimation( );
        this.inMoveSelection = false;
    }

    /**
     * Return the cell position of this slot based on this.index and this.side
     * This decides where to draw a sprite if one is loaded to the slot.
     */
    setTilePosition( ) {
        if ( this.side == CONTROL_LEFT ) {
            this.startingDirection = SHEET_ROW_BATTLE_FACING_RIGHT;
            switch( this.index ) {
                case 0:
                    return LEFT_BATTLE_POSITION_1;
                case 1:
                    return LEFT_BATTLE_POSITION_2;
                case 2:
                    return LEFT_BATTLE_POSITION_3;
            }
        }
        else if ( this.side == CONTROL_RIGHT ) {
            this.startingDirection = SHEET_ROW_BATTLE_FACING_LEFT;
            switch( this.index ) {
                case 0:
                    return RIGHT_BATTLE_POSITION_1;
                case 1:
                    return RIGHT_BATTLE_POSITION_2;
                case 2:
                    return RIGHT_BATTLE_POSITION_3;
            }
        }
    }
    /**
     * Initialize a battlesprite based on the given character.
     * Assign the sprite to this.sprite, the given character to this.character
     * @param {Character} character - Character instance that will do battle
     */
    initializeSpriteInSlot( character ) {
        let src = getClassSprite( character.ClassName, true );
        this.sprite = new BattleSprite( this.tile, 'LARG', src , this.startingDirection );
        this.character = character;
        this.initStatBars( );
    }
    /**
     * Instantiate a StatBar for HP and PP
     */
    initStatBars( ) {
        this.HPBarX = this.sprite.x + ( GRID_BLOCK_PX * .5 );
        this.HPBarY = this.sprite.y - ( GRID_BLOCK_PX * .5 );
        if ( this.side == CONTROL_LEFT ) {
            this.HPStatBars = new StatBar( "HP-PLAYER", this.activeHP, this.maxHP );
            this.PPStatBars = new StatBar( "PP", this.activePP, this.maxPP );
        }
        else {
            this.HPStatBars = new StatBar( "HP-ENEMY", this.activeHP, this.maxHP );
        }        
    }
    /**
     * If there is a sprite in the slot, draw it
     */
    drawSpriteInSlot( ) {
        if ( this.sprite != null ) {
            this.sprite.drawSprite( );       
            if ( this.inBattleMoveAnimation ) {
                this.sprite.handleAnimation( );
            }   
            else if ( this.performingBattleMove ) {
                this.checkForNextAnimationStep( this.selectedMove.animation );
            }
        }
        if ( this.HPStatBars != null ) {
            this.drawStatBars( )
        }
        if ( this.inMoveSelection ) {
            this.drawInMoveSelectionArrow( );
        }
        if ( this.isTargeted ) {
            this.drawIsTargetedArrow( );
        }
    }
    /**
     * Calc the x and y of stat bars based on this.sprite position.
     * Call the draw method of this.HPStatBars.
     * Do so for this.PPStatBars if it is not null.
     */
    drawStatBars( ) {
        this.HPStatBars.draw( this.HPBarX, this.HPBarY, this.activeHP )

        if ( this.PPStatBars != null ) {
            this.PPStatBars.draw( this.HPBarX, this.HPBarY + this.PPStatBars.height, this.activePP )
        }
    }
    /**
     * Set given input to this.selectedMove and this.selectedTarget
     * @param {Object} move data on
     * @param {BattleSlot} target BattleSlot containing target
     */
    selectMove( move, target ) {
        this.selectedMove = move;
        this.targetSlot = target;
    }
    /**
     * Depending on the animation object in this.selectedMove, set this.animationStep
     * Then, call doMoveAnimationStep
     */
    doSelectedMove( ) {
        if ( this.selectedMove instanceof StackedItem ) {
            globals.GAME.setActiveText( this.character.Name + " uses a " + this.selectedMove.Name + " on " + this.targetSlot.character.Name + "!")      
        }
        else {
            globals.GAME.setActiveText( this.character.Name + " uses " + this.selectedMove[MOVE_PROP_KEY_NAME] + " on " + this.targetSlot.character.Name + "!")            
        }


        const animation = this.selectedMove.animation;
        this.performingBattleMove = true;

        if ( animation.moveToTarget ) {
            this.animationStep = BATTLE_STEP_GO_TO;
        }
        else if ( animation.moveForward ) {
            this.animationStep = BATTLE_STEP_MOVE_FORWARD
        }
        else {
            this.animationStep = BATTLE_STEP_ANIMATION
        }
        this.doMoveAnimationStep( animation );
    }
    /**
     * Depending on the current value of this.animationStep,
     * assign a new value to this.animationStep and call doMoveanimationStep.
     * If the animation is done, call unsetSelectedMove and unsetMoveAnimationData
     * @param {Object} animation object from moveAnimationScripts
     */
    checkForNextAnimationStep( animation ) {
        if ( this.animationStep == BATTLE_STEP_GO_TO || this.animationStep == BATTLE_STEP_MOVE_FORWARD ) {
            this.animationStep = BATTLE_STEP_ANIMATION
            this.doMoveAnimationStep( animation );
        }
        else if ( this.animationStep == BATTLE_STEP_ANIMATION ) {
            this.animationStep = BATTLE_STEP_HIT
            this.doMoveAnimationStep( animation );
        }
        else if ( this.animationStep == BATTLE_STEP_HIT && ( animation.moveToTarget || animation.moveForward ) && !this.sprite.inScriptedAnimation ) {
            this.animationStep = BATTLE_STEP_GO_BACK
            this.doMoveAnimationStep( animation );
        }
        else if ( !this.sprite.movingToDestination && !this.sprite.inScriptedAnimation && !this.targetSlot.sprite.inScriptedAnimation ) {
            this.sprite.unsetGraphicalEffect( );
            this.unsetSelectedMove( );
            this.unsetMoveAnimationData( );
        }
    }
    /**
     * Call functions depending on the value of this.animationStep
     * @param {Object} animation object from moveAnimationScripts
     */
    doMoveAnimationStep( animation ) {
        switch( this.animationStep ) {
            case BATTLE_STEP_GO_TO: 
                this.sprite.setDestination( { x: this.targetSlot.slotX, y:this.targetSlot.slotY }, "TARGET" );
                this.sprite.initMovement( );
                break;
            case BATTLE_STEP_MOVE_FORWARD: 
                this.sprite.setDestination( { x: this.side == CONTROL_LEFT ? this.slotX + (this.sprite.width * 2) : this.slotX - (this.sprite.width * 2), y: this.slotY }, "FORWARD" );
                this.sprite.initMovement( );
                break;
            case BATTLE_STEP_ANIMATION: 
                this.doMoveAnimation( animation );
                break;
            case BATTLE_STEP_HIT: 
                this.doHitAnimation( animation );
                this.calculateSelectedMoveResult( );
            case BATTLE_STEP_GO_BACK: 
                this.sprite.setDestination( { x: this.slotX, y: this.slotY }, "RETURN" );
                this.sprite.initMovement( );
                break;
        }
    }
    /**
     * Set the animations and effects associated with given 
     * animation object to performer sprite
     * @param {Object} animation object from moveAnimationScripts
     */
    doMoveAnimation( animation ) {
        this.sprite.setScriptedAnimation( {
            animName: animation.perfomerAnimation,
            loop: false,
            numberOfLoops: false
        }, FRAME_LIMIT );
        if ( animation.performerEffect ) {
            this.sprite.setGraphicalEffect( animation.performerEffect );
        }
        if ( animation.effectToTarget ) {
            globals.GAME.FRONT.addEffect( 
                animation.effectToTarget, 
                this.sprite.x, this.sprite.y, 
                this.targetSlot.sprite.x, this.targetSlot.sprite.y
            )
        }
    }
    /**
     * Set the animations and effects associated with given 
     * animation object to target sprite
     * @param {Object} animation object from moveAnimationScripts
     */
    doHitAnimation( animation ) {
        this.targetSlot.sprite.setScriptedAnimation( {
            animName: animation.targetAnimationOnHit,
            loop: false,
            numberOfLoops: false
        }, FRAME_LIMIT );   
        if ( animation.targetEffectOnHit ) {
            this.targetSlot.sprite.setGraphicalEffect( animation.targetEffectOnHit );
        }   
    }
    /**
     * Call handleMoveExecution with inner properties as arguments.
     * Then, fade out the target character if it is dead
     */
    calculateSelectedMoveResult( ) {
        if ( this.selectedMove instanceof StackedItem ) {
            this.selectedMove.subtractPendingForUsage( );
            let resultText = globals.GAME.PLAYER_INVENTORY.useItem( this.targetSlot.character, this.selectedMove.ItemTypeId );
            globals.GAME.setActiveText( resultText );   
        }
        else {
            handleMoveExecution( this.selectedMove, this.targetSlot.character, this.character );            
        }

        if ( this.targetSlot.character.isDead ) {
            this.targetSlot.character.handleDeath( )
            this.targetSlot.sprite.fadeOut( );
        }
    }
    /**
     * Clear this.selectedMove and this.targetSlot
     */
    unsetSelectedMove( ) {
        this.selectedMove = null;
        this.targetSlot = null;

    }
    /**
     * Clear this.animationStep and this.performingBattleMove
     */
    unsetMoveAnimationData( ) {
        this.animationStep = null;
        this.performingBattleMove = false;        
    }

    target( ) {
        this.isTargeted = true;
    }

    deTarget( ) {
        this.isTargeted = false;
    }
} 

module.exports = {
    BattleSlot
}