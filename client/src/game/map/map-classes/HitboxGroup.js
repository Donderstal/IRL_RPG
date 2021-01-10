const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox;
const globals       = require('../../../game-data/globals');
const { GRID_BLOCK_PX } = require('../../../game-data/globals');

const radius = globals.GRID_BLOCK_PX / 2;

class HitboxGroup {
    constructor ( x, y, direction, spriteDimensionsInBlocks ) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks

        this.activeTileIndexes = [ ];
        this.previousTileIndex;
        this.nextTileIndex;

        this.initHitboxes( );
    }
    
    get previousTileFront( ) { return globals.GAME.front.class.grid.array[this.previousTileIndex] };
    get currentTileFront( ) { return globals.GAME.front.class.grid.array[this.activeTileIndexes[0]] };
    get nextTileFront( ) { return globals.GAME.front.class.grid.array[this.nextTileIndex] };

    get isAtIntersection( ) { return this.currentTileFront && this.currentTileFront.hasIntersection }

    initHitboxes( ) {
        this.hitboxes = [];
        let xyValues = this.getHitboxXYValues( );

        xyValues.forEach( ( xy ) => {
            this.hitboxes.push( new I_Hitbox( xy.x, xy.y, radius ) );
        })
    }

    updateHitboxes( x, y ) {
        this.x = x;
        this.y = y;

        let xyValues = this.getHitboxXYValues( );
    
        this.hitboxes.forEach( ( hitbox, index ) => {
            hitbox.draw( xyValues[index].x, xyValues[index].y, radius )
        } )

        this.updateTileIndexes( xyValues );
    }

    getHitboxXYValues( ) {
        const spriteIsAlignedVertically = this.direction == globals["FACING_UP"] || this.direction == globals["FACING_DOWN"]

        let startingX = this.x + ( globals.GRID_BLOCK_PX * .5 );
        let startingY = this.y + ( globals.GRID_BLOCK_PX * .5 );
        let xyCounter = { 'x': startingX, 'y': startingY };

        if ( !spriteIsAlignedVertically ) {
            xyCounter.y += globals.GRID_BLOCK_PX;
        }

        let xyValues = spriteIsAlignedVertically ? this.getVerticalXYValues( xyCounter, startingY ) : this.getHorizontalXYValues( xyCounter, startingX );
        
        if ( this.direction == globals["FACING_DOWN"] || this.direction == globals["FACING_RIGHT"] ) {
            xyValues = xyValues.reverse( );
        }

        return xyValues;
    }

    getHorizontalXYValues( xyCounter, startingX ) {
        let xyValues = [];

        for ( var j = 0; j < this.spriteDimensionsInBlocks.hori; j++) {
            xyValues.push( { 'x' : xyCounter.x, 'y': xyCounter.y } );
            xyCounter.x += globals.GRID_BLOCK_PX;
        }
        
        return xyValues;
    }

    getVerticalXYValues( xyCounter, startingY ) {
        let xyValues = []

        for ( var j = 0; j < this.spriteDimensionsInBlocks.vert; j++) {
            xyValues.push( { 'x' : xyCounter.x, 'y': xyCounter.y } );
            xyCounter.y += globals.GRID_BLOCK_PX;
        }

        return xyValues;
    }

    updateTileIndexes( hitboxesXY ) {
        const frontClass = globals.GAME.front.class
        const previousTile = this.getPreviousTile( hitboxesXY, frontClass )
        if ( previousTile != undefined ) {
            this.previousTileIndex = previousTile.index;
            this.previousTileFront.clearSpriteData( )
            this.previousTileFront.spriteId = null;            
        }

        let activeTiles = [];
        hitboxesXY.forEach( ( hitboxXY ) => {
            let tileAtHitbox = frontClass.getTileAtXY( hitboxXY.x, hitboxXY.y )
            if ( tileAtHitbox != undefined ) {
                activeTiles.push( tileAtHitbox )                
            }
            if ( activeTiles.length < 1 && previousTile != undefined ) {
                activeTiles.push( previousTile )    
            }
        })

        this.activeTileIndexes = [ ]
        activeTiles.forEach( ( activeTile ) => {
            this.activeTileIndexes.push( activeTile.index )
            activeTile.setSpriteData( 'object', null )
            activeTile.spriteId = this.spriteId;
        })

        const nextTile = this.getNextTile( hitboxesXY, frontClass )

        this.nextTileIndex = nextTile == undefined ? undefined : nextTile.index;
    }

    getPreviousTile( hitboxesXY, frontClass  ) {
        let previousTile;
        switch ( this.direction ) {
            case globals["FACING_LEFT"]:
                previousTile = frontClass.getTileAtXY( hitboxesXY[hitboxesXY.length - 1].x + GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_UP"]:
                previousTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[hitboxesXY.length - 1].y + GRID_BLOCK_PX );
                break;
            case globals["FACING_RIGHT"]: 
            previousTile = frontClass.getTileAtXY( hitboxesXY[hitboxesXY.length - 1].x - GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_DOWN"]:
                previousTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[hitboxesXY.length - 1].y - GRID_BLOCK_PX );
                break;
        }
        return previousTile
    }

    getNextTile( hitboxesXY, frontClass  ) {
        let nextTile;
        switch ( this.direction ) {
            case globals["FACING_LEFT"]:
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x - GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_UP"]:
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[0].y - GRID_BLOCK_PX );
                break;
            case globals["FACING_RIGHT"]: 
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x + GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_DOWN"]:
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[0].y + GRID_BLOCK_PX );
                break;
        }
        return nextTile;
    }
}

module.exports = {
    HitboxGroup
}