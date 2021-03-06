const globals = require('../../../game-data/globals')
const { GRID_BLOCK_PX, MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET } = require('../../../game-data/globals');
const { Sprite } = require('../../interfaces/I_Sprite')
const { I_Hitbox } = require('../../interfaces/I_Hitbox')
const { checkForCollision } = require('../map-ui/movementChecker')
/**
 * The MapSprite is the base class for all standard size sprites in the game.
 * It contains functionalities to play a scriptedanimation and log the current position of the sprite in the map grid.
 * It also contains a I_Hitbox instance which is used for collision detection.
 */
class MapSprite extends Sprite {
    constructor ( tile, spriteSize, src ) {       
        super( tile, spriteSize, src, globals[tile.spriteData.direction] == undefined ? 0 : globals[tile.spriteData.direction] )   
        this.cell = {}
        this.hitbox = new I_Hitbox( this.centerX( ), this.baseY( ), this.width / 2 );
        
        this.spriteId;
        this.activeTileIndex;
        this.nextTileIndex;

        this.spriteWidthInSheet = MAP_SPRITE_WIDTH_IN_SHEET;
        this.spriteHeightInSheet = MAP_SPRITE_HEIGHT_IN_SHEET;
    }

    get currentTileBack( ) { return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.activeTileIndex )  };
    get nextTileBack( ) { return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.nextTileIndex ) };

    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.activeTileIndex )  };
    get nextTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.nextTileIndex ) };

    get isInCenterFacingLeft( ) {
        return this.centerX( ) < ( this.currentTileBack.x + ( GRID_BLOCK_PX * .55 ) );
    }

    get isInCenterFacingRight( ) {
        return this.centerX( ) > ( this.currentTileBack.x + ( GRID_BLOCK_PX * .45 ) ); 
    }

    get isInCenterFacingUp( ) {
        return this.baseY( ) < ( this.currentTileBack.y + ( GRID_BLOCK_PX * .55 ) );
    }

    get isInCenterFacingDown( ) {
        return this.baseY( ) > ( this.currentTileBack.y + ( GRID_BLOCK_PX * .45 ) ); 
    }
    /**
     * Call super.drawSprite( ). Then call this.updateTileIndexes( ).
     * If the game is not in a cinematic, update the xY of the I_Hitbox instance in this.hitbox and check for collision
     * Else, call this.handleAnimation.
     */
    drawSprite( ) {
        super.drawSprite( )
        this.updateTileIndexes( )
        if ( !globals.GAME.cinematicMode ) {
            this.hitbox.updateXy( this.centerX( ), this.baseY( ) );    
            this.pathIsBlocked = checkForCollision( this, this == globals.GAME.PLAYER );  
            if ( this.pathIsBlocked && this.destinationTile != undefined && this.destinationTile.index == this.activeTileIndex ) {
                this.pathIsBlocked = !this.pathIsBlocked;
            }  
        }
        else if ( globals.GAME.cinematicMode && ( this.inScriptedAnimation || this.movingToDestination ) ) {
            this.handleAnimation( )
        }
    }
    /**
     * Call the clearSpriteData( ) method of the I_Tile instance in this.currentTileFront
     */
    unsetActiveTile( ) {
        if ( this.currentTileFront ) {
            this.currentTileFront.clearSpriteData( );            
        }
    }
    /**
     * Call this.unsetActiveTile. Get the I_Tile instance at this.centerX and this.baseY.
     * Call this.setActivetileIndex with the I_Tile instance as argument. Then, call this.setNextTileIndex
     */
    updateTileIndexes( ) {
        this.unsetActiveTile( );

        const tile = globals.GAME.getTileOnCanvasAtXY( 'FRONT', this.centerX( ), this.baseY( ) );

        if ( tile == undefined ) {
            this.activeTileIndex = null;
            return;
        } 

        this.setActiveTileIndex( tile );
        this.setNextTileIndex( );
    }
    /**
     * Set this given I_Tile row, col and index to this.row, this.col and this.activeTileIndex.
     * Call the setSpriteData method of the I_Tile to indicate that the tile is occupied.
     * Set this.spriteId to the spriteId prop of I_Tile
     * @param {I_Tile} tile 
     */
    setActiveTileIndex( tile ) {
        this.activeTileIndex = tile.index;
        this.row = tile.row;
        this.col = tile.col;
        tile.setSpriteData( 'character', null )
        tile.spriteId = this.spriteId;
    }
    /**
     * Depending on the this.direction prop which indicates what side the MapSprite is facing, set this.nextTileIndex.
     */
    setNextTileIndex( ) {
        switch ( this.direction ) {
            case globals["FACING_UP"] :
                this.nextTileIndex = this.currentTileFront.row != 1 ? this.activeTileIndex - globals.GAME.back.class.grid.cols : undefined;
                break;
            case globals["FACING_RIGHT"] :
                this.nextTileIndex = this.currentTileFront.col != globals.GAME.activeMap.columns ? this.activeTileIndex + 1 : undefined;
                break;
            case globals["FACING_DOWN"] :
                this.nextTileIndex = this.currentTileFront.row != globals.GAME.activeMap.rows ? this.activeTileIndex + globals.GAME.back.class.grid.cols : undefined;
                break;
            case globals["FACING_LEFT"] :
                this.nextTileIndex = this.currentTileFront.col != 1 ? this.activeTileIndex - 1 : undefined;
                break;
        }
    }
    /**
     * Set this.activeTileIndex and this.nextTileIndex to null. Used on switching maps.
     */
    clearTileIndexes( ) {
        this.activeTileIndex = null;
        this.nextTileIndex = null;
    }
} 

module.exports = {
    MapSprite
} 