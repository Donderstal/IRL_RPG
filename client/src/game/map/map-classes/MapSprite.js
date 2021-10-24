const globals = require('../../../game-data/globals')
const { GRID_BLOCK_PX, MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals');
const { Sprite } = require('../../interfaces/I_Sprite')
const { I_Hitbox } = require('../../interfaces/I_Hitbox')
const { checkForCollision } = require('../map-ui/movementChecker')
/**
 * The MapSprite is the base class for all standard size sprites in the game.
 * It contains functionalities to play a scriptedanimation and log the current position of the sprite in the map grid.
 * It also contains a I_Hitbox instance which is used for collision detection.
 */
class MapSprite extends Sprite {
    constructor ( tile, direction, spriteSize, src ) {       
        super( tile, spriteSize, src, direction )   
        this.cell = {}
        this.hitbox = new I_Hitbox( this.centerX( ), this.baseY( ), this.width / 2 );
        
        this.spriteId;
        this.spriteWidthInSheet = MAP_SPRITE_WIDTH_IN_SHEET;
        this.spriteHeightInSheet = MAP_SPRITE_HEIGHT_IN_SHEET;
        this.movementSoundEffect = globals.GAME.sound.getSpatialEffect( "footsteps.wav", true );
        this.movementSoundEffect.mute( );
    }

    get currentTileBack( ) { return globals.GAME.getTileOnCanvasAtXY( "BACK", this.centerX(), this.baseY() ) };
    get nextTileBack( ) { 
        switch(this.direction) {
            case FACING_LEFT:
                return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.centerX() - GRID_BLOCK_PX, this.baseY());
            case FACING_UP:
                return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.centerX(), this.baseY() - GRID_BLOCK_PX);
            case FACING_RIGHT:
                return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.centerX() + GRID_BLOCK_PX, this.baseY());
            case FACING_DOWN:
                return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.centerX(), this.baseY() + GRID_BLOCK_PX);
        }
     };

    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.centerX(), this.baseY()) };
    get nextTileFront( ) { 
        switch(this.direction) {
            case FACING_LEFT:
                return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.centerX() - GRID_BLOCK_PX, this.baseY());
            case FACING_UP:
                return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.centerX(), this.baseY() - GRID_BLOCK_PX);
            case FACING_RIGHT:
                return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.centerX() + GRID_BLOCK_PX, this.baseY());
            case FACING_DOWN:
                return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.centerX(), this.baseY() + GRID_BLOCK_PX);
        }
    };

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
        if ( this.hitbox != undefined ) {
            this.hitbox.updateXy( this.centerX( ), this.baseY( ) );             
        }
        if ( !globals.GAME.inCinematic && ( this.movingToDestination || this == globals.GAME.PLAYER ) ) {  
            this.pathIsBlocked = checkForCollision( this, this == globals.GAME.PLAYER );  
        }
        if ( globals.GAME.cinematicMode && ( this.inScriptedAnimation || this.movingToDestination ) ) {
            this.handleAnimation( )
        }
        this.handleSoundEffects( );
    }

    handleSoundEffects( ) {
        if ( (this.movingToDestination || this.playerWalking ) && !this.pathIsBlocked && this.movementSoundEffect != undefined ) {
            this.movementSoundEffect.setVolumeAndPan( this )
        }
        else if (( this.movementSoundEffect.isPaused || this.movementSoundEffect.hasEnded ) || ( !this.movingToDestination || this.pathIsBlocked ) ) { 
            this.movementSoundEffect.reset( );
        }
        else if ( this === globals.GAME.PLAYER && !this.playerWalking ) {
            this.movementSoundEffect.reset( );
        }        
    }
} 

module.exports = {
    MapSprite
} 