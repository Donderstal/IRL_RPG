const {     
    LEFT_BATTLE_POSITION_1, LEFT_BATTLE_POSITION_2, LEFT_BATTLE_POSITION_3,
    RIGHT_BATTLE_POSITION_1, RIGHT_BATTLE_POSITION_2, RIGHT_BATTLE_POSITION_3,
    SHEET_ROW_BATTLE_FACING_LEFT, SHEET_ROW_BATTLE_FACING_RIGHT
} = require('../../game-data/battleGlobals');
const globals = require('../../game-data/globals');
const { BattleSprite } = require('./BattleSprite');
const { FRAME_LIMIT } = require('../../game-data/globals');
/**
 * A BattleSlot represents one of 6 available slots for a character in a Battle.
 * The player characters are on the left, the opponent characters are on the right.
 * A BattleSlot contains a Sprite and a Character instance.
 */
class BattleSlot {
    constructor( index, side ) {
        this.index  = index;
        this.side   = side;
        this.tile   = [ ];
        this.sprite = null;
        this.tilePosition   = this.setTilePosition( );
        this.tile = globals.GAME.FRONT.battleGrid.getTileAtCell( this.tilePosition.column, this.tilePosition.row );

        this.performingBattleMove = false;
        this.selectedMove = null;
        this.targetSlot = null;
    }

    get inBattleMoveAnimation( ) { return this.sprite.inScriptedAnimation || this.sprite.movingToDestination }
    /**
     * Return the cell position of this slot based on this.index and this.side
     * This decides where to draw a sprite if one is loaded to the slot.
     */
    setTilePosition( ) {
        if ( this.side == "LEFT" ) {
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
        else if ( this.side == "RIGHT" ) {
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
        let src = "/static/sprites/" + ( Math.random() > .5 ? "fats_fight" : "chad_fight" ) + ".png";
        this.sprite = new BattleSprite( this.tile, 'LARG', src , this.startingDirection );
        this.character = character;
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
        const animation = this.selectedMove.animation;
        this.performingBattleMove = true;

        if ( animation.moveToTarget ) {
            this.animationStep = "GO_TO";
        }
        else {
            this.animationStep = "ANIMATION"
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
        if ( this.animationStep == "GO_TO" ) {
            this.animationStep = "ANIMATION"
            this.doMoveAnimationStep( animation );
        }
        else if ( this.animationStep == "ANIMATION" && animation.moveToTarget == true ) {
            this.animationStep = "GO_BACK"
            this.doMoveAnimationStep( animation );
        }
        else {
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
            case "GO_TO": 
                this.sprite.setDestination( this.targetSlot.tile, "TARGET" );
                this.sprite.initMovement( );
                break;
            case "ANIMATION": 
                this.doMoveAnimation( animation );
                break;
            case "GO_BACK": 
                this.sprite.setDestination( this.tile, "RETURN" );
                this.sprite.initMovement( );
                break;
        }
    }
    /**
     * Set the animations and effects associated with given 
     * animation object to performer and target sprites
     * @param {Object} animation object from moveAnimationScripts
     */
    doMoveAnimation( animation ) {
        const scene = {
            animName: animation.perfomerAnimation,
            loop: false,
            numberOfLoops: false
        };
        this.sprite.setScriptedAnimation( scene, FRAME_LIMIT );
        if ( animation.targetAnimationOnHit ) {
            const targetScene = {
                animName: animation.targetAnimationOnHit,
                loop: false,
                numberOfLoops: false
            };
            this.targetSlot.sprite.setScriptedAnimation( targetScene, FRAME_LIMIT );
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
}

module.exports = {
    BattleSlot
}