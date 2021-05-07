const { Sprite } = require("../interfaces/I_Sprite");
const { 
    SHEET_ROW_BATTLE_FACING_LEFT, BATTLE_SPRITE_WIDTH, BATTLE_SPRITE_HEIGHT, 
    BATTLE_SPRITE_HEIGHT_IN_SHEET, BATTLE_SPRITE_WIDTH_IN_SHEET, BATTLE_PHASE_DO_MOVES 
} = require("../../game-data/battleGlobals");
const { 
    GRID_BLOCK_PX, NPC_MOVE_TYPE_FLYING, MOVEMENT_SPEED, 
    FACING_RIGHT, FACING_LEFT, FACING_RIGHT_FLYING, FACING_LEFT_FLYING, FRAME_LIMIT
} = require("../../game-data/globals");
const globals = require("../../game-data/globals");
const { Counter } = require("../../helpers/Counter");

class BattleSprite extends Sprite {
    constructor( tile, spriteSize, src, direction ) {
        if ( spriteSize == "LARG" ) {
            spriteSize = {
                width: BATTLE_SPRITE_WIDTH,
                height: BATTLE_SPRITE_HEIGHT
            }
        }
        super( tile, spriteSize, src, direction, false );
        this.startingDirection  = direction;
        this.spriteWidthInSheet = BATTLE_SPRITE_WIDTH_IN_SHEET;
        this.spriteHeightInSheet = BATTLE_SPRITE_HEIGHT_IN_SHEET;

        this.idleAnimationCounter = new Counter( 10000, true )

        this.setSpriteToGrid( tile );
    }
    get destinationIsLeft( ) { 
        return this.destination.x < this.left;
    }
    get destinationIsRight( ) { 
        return this.destination.x + this.width > this.right;
    }
    get destinationIsUp( ) { 
        return this.destination.y - ( this.height - GRID_BLOCK_PX ) < this.top;
    }    
    get destinationIsDown( ) { 
        return this.destination.y + GRID_BLOCK_PX > this.bottom;
    } 
    drawSprite( ) {
        this.handleIdleAnimationCounter( );
        super.drawSprite( );
    }
    /**
     * If character is not animated, moving or in PHASE_DO_MOVES, call the counter
     * If the counter is over limit, set a idle animation with setScriptedAnimation
     */
    handleIdleAnimationCounter( ) {
        if ( !this.inScriptedAnimation && !this.movingToDestination && globals.GAME.battle.phase != BATTLE_PHASE_DO_MOVES ) {
            if ( this.idleAnimationCounter.countAndCheckLimit( ) ) {
                this.setScriptedAnimation( {
                    animName: "BATTLE_BREATHE",
                    loop: false,
                    numberOfLoops: false
                }, FRAME_LIMIT );
            }
        }
        else {
            this.idleAnimationCounter.resetCounter( );
        }        
    }
    /**
     * Override of base method
     * Set the Sprites' location on the grid and xy axis depending on given I_Tile
     * @param {I_TIle} tile instance of I_Tile Class
     * @param {Boolean} isCar true if this is a car sprite
     */
    setSpriteToGrid( tile ) {
        this.row = tile.row;
        this.col = tile.col;
        
        this.x = tile.x;
        this.y = tile.y - ( this.height - GRID_BLOCK_PX );
    }
    /**
     * Override of base method
     * Initialize a destination properties.
     * Then, call setDestinationList
     * @param {Object} destination Properties: row: Number, col: Number
     */
    setDestination( destination, location ) {
        this.originalDirection  = this.direction;
        this.destination        = destination;
        if ( location == "TARGET" ) {
            this.direction == SHEET_ROW_BATTLE_FACING_LEFT ? this.destination.x += this.width: this.destination.x -= this.width 
        }
    }
    /**
     * Override of base method
     * Move closer to the middle of I_Tile instance currently assigned to this.destination.
     * Alter this.x and/or this.y depending on the relative position of the destination.
     * If no move is possible, call the checkForNextDestination method.
     */
    goToDestination( ) {
        this.moving = false;

        if ( this.destinationIsLeft  ) {
            this.x -= MOVEMENT_SPEED * 2;
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_LEFT_FLYING : FACING_LEFT;
            if ( this.x - 10 < this.destination.x && this.x + 10 > this.destination.x ) {
                this.x = this.destination.x;
                this.moving = false;
            }
        }
        else if ( this.destinationIsRight ) {
            this.x += MOVEMENT_SPEED * 2;
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_RIGHT_FLYING : FACING_RIGHT;
            if ( (this.x + this.width) - 10 < this.destination.x + this.width && (this.x + this.width) + 10 > this.destination.x + this.width ) {
                this.x = this.destination.x;
                this.moving = false;
            }
        }

        if ( this.destinationIsUp ) {
            this.y -= MOVEMENT_SPEED
            if ( this.y - 10 < this.destination.y - ( this.height - GRID_BLOCK_PX ) && this.y + 10 > this.destination.y - ( this.height - GRID_BLOCK_PX ) ) {
                this.y = this.destination.y - ( this.height - GRID_BLOCK_PX );
            }
        }
        else if ( this.destinationIsDown ) {
            this.y += MOVEMENT_SPEED;
        }

        if ( !this.moving ) {
            this.stopMovement( );
            this.unsetDestination( );    
            this.unsetScriptedAnimation( );
        }
    }
    /**
     * Fade out animation to play on character death
     */
    fadeOut( ) {
        const scene = {
            animName: "FADE",
            loop: false,
            numberOfLoops: false
        };
        this.setScriptedAnimation( scene, FRAME_LIMIT );
    }
}

module.exports = {
    BattleSprite
}