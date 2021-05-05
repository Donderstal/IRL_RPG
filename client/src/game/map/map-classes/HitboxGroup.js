const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox;
const globals       = require('../../../game-data/globals');
const { GRID_BLOCK_PX } = require('../../../game-data/globals');

const radius = GRID_BLOCK_PX / 2;
/**
 * A HitboxGroup is a grouping of I_Hitbox instances arranged to be attached to a I_Sprite extension.
 * It allows for collision detection for sprites larger than one GRID_BLOCK_PX.
 */
class HitboxGroup {
    constructor ( x, y, direction, spriteDimensionsInBlocks, spriteId ) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.spriteId = spriteId;
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks

        this.activeTileIndexes = [ ];
        this.nextTileIndex;

        this.initHitboxes( );
    }
    
    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.activeTileIndexes[0]) };
    get middleTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.activeTileIndexes[1]) };
    get nextTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.nextTileIndex ) };

    get isAtIntersection( ) { return this.currentTileFront && this.currentTileFront.hasIntersection }
    get middleIsOnIntersection( ) { return this.middleTileFront && this.middleTileFront.hasIntersection; }
    /**
     * Initialize an empty array in this.hitboxes.
     * Get the desired xyvalues of the hitboxes from this.getHitboxXYValues.
     * Loop through the array of xyvalues. For each XY pair, instantiate a I_Hitbox and push it to this.hitboxes.
     */
    initHitboxes( ) {
        this.hitboxes = [];
        let xyValues = this.getHitboxXYValues( );

        xyValues.forEach( ( xy ) => {
            this.hitboxes.push( new I_Hitbox( xy.x, xy.y, radius ) );
        })
    }
    /**
     * Set given x and y props as this.x and this.y.
     * Then, get a xyValues array from this.getHitboxXYValues.
     * Loop through this.hitboxes and set the corresponding xy from the xyValues array.
     * Then, call this.updateTileIndexes with the xyValues array as argument.
     * @param {Number} x 
     * @param {Number} y 
     */
    updateHitboxes( x, y ) {
        this.x = x;
        this.y = y;

        let xyValues = this.getHitboxXYValues( );
    
        this.hitboxes.forEach( ( hitbox, index ) => {
            hitbox.updateXy( xyValues[index].x, xyValues[index].y )
        } )

        this.updateTileIndexes( xyValues );
    }
    /**
     * Initialize an xyCounter object with x and y as props.
     * Depending on the sprites' alignment call getVerticalXYValues or getHorizontalXYvalues and pass the xyCounter as argument.
     * The return value of these methods is stored in the xyValues array and returned.
     */
    getHitboxXYValues( ) {
        const spriteIsAlignedVertically = this.direction == globals["FACING_UP"] || this.direction == globals["FACING_DOWN"]
        ;
        let xyCounter = { 'x': this.x + ( GRID_BLOCK_PX * .5 ) , 'y': this.y + ( GRID_BLOCK_PX * .5 ) + ( spriteIsAlignedVertically ? 0 : GRID_BLOCK_PX ) };
        let xyValues = spriteIsAlignedVertically ? this.getVerticalXYValues( xyCounter ) : this.getHorizontalXYValues( xyCounter );
        
        if ( this.direction == globals["FACING_DOWN"] || this.direction == globals["FACING_RIGHT"] ) {
            // reverse the xyvalues array for down or right facing sprite. This is because the xyCounter starts counting from the top-left
            xyValues = xyValues.reverse( );
        }

        return xyValues;
    }
    /**
     * Initiale xyValues as an empty array.
     * For this.spriteDimensionsInBlocks.hori, push xyCounter x y value to xyValues.
     * Increment xyCounter.x by one block each loop.
     * Then return xyValues.
     * @param {Object} xyCounter contains a x and y keys with Number values
     */
    getHorizontalXYValues( xyCounter ) {
        let xyValues = [];

        for ( var j = 0; j < this.spriteDimensionsInBlocks.hori; j++) {
            xyValues.push( { 'x' : xyCounter.x, 'y': xyCounter.y } );
            xyCounter.x += GRID_BLOCK_PX;
        }
        
        return xyValues;
    }
    /**
     * Initial xyValues as an empty array.
     * For this.spriteDimensionsInBlocks.vert, push xyCounter x y value to xyValues.
     * Increment xyCounter.y by one block each loop.
     * Then return xyValues.
     * @param {Object} xyCounter contains a x and y keys with Number values
     */
    getVerticalXYValues( xyCounter ) {
        let xyValues = []

        for ( var j = 0; j < this.spriteDimensionsInBlocks.vert; j++) {
            xyValues.push( { 'x' : xyCounter.x, 'y': xyCounter.y } );
            xyCounter.y += GRID_BLOCK_PX;
        }

        return xyValues;
    }
    /**
     * Get the active hitbox positions from this.getHitboxXYValues.
     * Loop through the hitbox position, and for each I_Tile instance at the positions, call clearSpriteData and set spriteId to null.
     */
    clearTileIndexes( ) {
        let hitboxesXY = this.getHitboxXYValues( );
        hitboxesXY.forEach( ( hitboxXY ) => {
            let tileAtHitbox = globals.GAME.getTileOnCanvasAtXY( 'FRONT', hitboxXY.x, hitboxXY.y )
            if ( tileAtHitbox != undefined ) {
                tileAtHitbox.clearSpriteData( )
                tileAtHitbox.spriteId = null;                   
            }
        })
    }
    /**
     * First, loop through activeTileIndexes and clear sprite data in each I_Tile associated with an index.
     * Then, empty the activeTileIndexes array. Loop through the hitboxesXY array. 
     * For each hitboxXy, get the I_Tile at that xy, push it to activeTileIndexes and set the spriteId to it.
     * Finally, set nextTileIndex by calling getNextTile
     * @param {Object[]} hitboxesXY list of xy pairs from getHitboxXYValues
     */
    updateTileIndexes( hitboxesXY ) {
        this.activeTileIndexes.forEach( ( tileIndex ) => {
            let tile = globals.GAME.getTileOnCanvasAtIndex( "FRONT", tileIndex );
            tile.clearSpriteData( );
            tile.spriteId = null;
        } )

        this.activeTileIndexes = [ ]
        hitboxesXY.forEach( ( hitboxXY ) => {
            let tileAtHitbox = globals.GAME.getTileOnCanvasAtXY( 'FRONT', hitboxXY.x, hitboxXY.y )
            if ( tileAtHitbox != undefined ) {
                this.activeTileIndexes.push( tileAtHitbox.index )  
                tileAtHitbox.setSpriteData( 'object', null )
                tileAtHitbox.spriteId = this.spriteId;              
            }
        })
        const nextTile = this.getNextTile( hitboxesXY[0] )

        this.nextTileIndex = nextTile == undefined ? undefined : nextTile.index;
    }
    /**
     * Get the I_Tile instance that the HitboxGroup is facing and return it.
     * @param {Object} nextTileXY x y value pair representing a position on the fron canvas
     */
    getNextTile( nextTileXY ) {
        let nextTile;
        switch ( this.direction ) {
            case globals["FACING_LEFT"]:
                nextTile = globals.GAME.getTileOnCanvasAtXY( 'FRONT', nextTileXY.x - GRID_BLOCK_PX, nextTileXY.y );
                break;
            case globals["FACING_UP"]:
                nextTile = globals.GAME.getTileOnCanvasAtXY( 'FRONT', nextTileXY.x, nextTileXY.y - GRID_BLOCK_PX );
                break;
            case globals["FACING_RIGHT"]: 
                nextTile = globals.GAME.getTileOnCanvasAtXY( 'FRONT', nextTileXY.x + GRID_BLOCK_PX, nextTileXY.y );
                break;
            case globals["FACING_DOWN"]:
                nextTile = globals.GAME.getTileOnCanvasAtXY( 'FRONT', nextTileXY.x, nextTileXY.y + GRID_BLOCK_PX );
                break;
        }
        return nextTile;
    }
}

module.exports = {
    HitboxGroup
}