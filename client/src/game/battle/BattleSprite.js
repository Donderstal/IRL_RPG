const { Sprite } = require("../interfaces/I_Sprite");
const { 
    SHEET_ROW_BATTLE_FACING_LEFT, BATTLE_SPRITE_WIDTH, BATTLE_SPRITE_HEIGHT, 
    BATTLE_SPRITE_HEIGHT_IN_SHEET, BATTLE_SPRITE_WIDTH_IN_SHEET 
} = require("../../game-data/battleGlobals");
const { 
    GRID_BLOCK_PX, NPC_MOVE_TYPE_FLYING, MOVEMENT_SPEED, 
    FACING_RIGHT, FACING_LEFT, FACING_RIGHT_FLYING, FACING_LEFT_FLYING
} = require("../../game-data/globals");

const pathFinder = require('../../helpers/pathfindingHelpers')
const globals = require('../../game-data/globals')

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

        this.setSpriteToGrid( tile );
    }
    get destinationIsLeft( ) { 
        return this.destinationTile.x <= this.left && this.destinationTile.direction == "FACING_LEFT";
    }
    get destinationIsRight( ) { 
        return this.destinationTile.x + this.width > this.right && this.destinationTile.direction == "FACING_RIGHT";
    }
    get destinationIsUp( ) { 
        return this.destinationTile.y - ( this.height - GRID_BLOCK_PX ) <= this.top && this.destinationTile.direction == "FACING_UP";
    }    
    get destinationIsDown( ) { 
        return this.destinationTile.y + GRID_BLOCK_PX > this.bottom && this.destinationTile.direction == "FACING_DOWN";
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
        this.destination        = { };
        this.destination        = Object.assign(this.destination, destination);
        this.destinationTiles   = [];        
        this.activeDestinationIndex;

        if ( location == "TARGET" ) {
            this.destination.col = (this.startingDirection == SHEET_ROW_BATTLE_FACING_LEFT)
                ? this.destination.col + 1 
                : this.destination.col - 1;         
        }

        this.setDestinationList( false );
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
        }
        else if ( this.destinationIsRight ) {
            this.x += MOVEMENT_SPEED * 2;
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_RIGHT_FLYING : FACING_RIGHT;
        }

        if ( this.destinationIsUp ) {
            this.moving = true;
            this.y -= MOVEMENT_SPEED * 2;
        }
        else if ( this.destinationIsDown ) {
            this.moving = true;
            this.y += MOVEMENT_SPEED * 2;
        }

        if ( !this.moving ) {
            this.checkForNextDestination( );
        }
    }
    /**
     * Override of base method
     * Call determineShortestPath from the pathfindingHelpersFile and return its return value
     * @param {I_Tile} startingTile I_Tile to start the pathfinding from
     * @param {I_Tile} destinationTile destination I_Tile
     */
    getPathIndexes( startingTile, destinationTile ) {
        return pathFinder.determineShortestPath( 
            startingTile, destinationTile, 
            globals.GAME.BACK.battleGrid, this.movementType == NPC_MOVE_TYPE_FLYING 
        );  
    }
}

module.exports = {
    BattleSprite
}