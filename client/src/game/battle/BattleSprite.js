const { Sprite } = require("../interfaces/I_Sprite");
const { 
    SHEET_ROW_BATTLE_FACING_LEFT, BATTLE_SPRITE_WIDTH, BATTLE_SPRITE_HEIGHT, 
    BATTLE_SPRITE_HEIGHT_IN_SHEET, BATTLE_SPRITE_WIDTH_IN_SHEET 
} = require("../../game-data/battleGlobals");
const { GRID_BLOCK_PX, NPC_MOVE_TYPE_FLYING } = require("../../game-data/globals");

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

        this.spriteWidthInSheet = BATTLE_SPRITE_WIDTH_IN_SHEET;
        this.spriteHeightInSheet = BATTLE_SPRITE_HEIGHT_IN_SHEET;

        this.setSpriteToGrid( tile );
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
        
        this.x = this.direction == SHEET_ROW_BATTLE_FACING_LEFT ? tile.x + ( this.width - GRID_BLOCK_PX ) : tile.x - ( this.width - GRID_BLOCK_PX ) ;
        this.y = tile.y - ( this.height - GRID_BLOCK_PX );
    }
    /**
     * Initialize a destination properties.
     * Then, call setDestinationList
     * @param {Object} destination Properties: row: Number, col: Number
     */
    setDestination( destination ) {
        this.originalDirection  = this.direction;
        this.destinationTiles   = [];
        this.destination        = destination;
        this.activeDestinationIndex;

        this.setDestinationList( false );
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