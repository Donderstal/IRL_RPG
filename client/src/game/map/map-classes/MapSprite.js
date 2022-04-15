const globals = require('../../../game-data/globals')
const { GRID_BLOCK_PX, MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals');
const { Sprite } = require('../../core/Sprite')
const { Hitbox } = require('../../core/Hitbox');
const { VisionBox } = require('./VisionBox');
/**
 * The MapSprite represents a 1-tile wide sprite on the Front grid
 * Logs its position on the grid and has a sound effect for movement
 */
class MapSprite extends Sprite {
    constructor ( tile, direction, spriteSize, classProfile, isPlayer = false ) {       
        super( tile, spriteSize, classProfile.png, direction )   
        this.cell = {}
        this.hitbox = new Hitbox( this.centerX( ), this.baseY( ), this.width / 2 );
        
        this.spriteId;
        this.sfx = classProfile.sfx
        this.spriteWidthInSheet = MAP_SPRITE_WIDTH_IN_SHEET;
        this.spriteHeightInSheet = MAP_SPRITE_HEIGHT_IN_SHEET;
        this.movementSoundEffect = globals.GAME.sound.getSpatialEffect( "footsteps.wav", true );
        this.movementSoundEffect.mute( );
        if ( isPlayer ) {
            this.visionbox = new VisionBox( this.centerX( ), this.baseY( ) )
        }
    }

    get currentTileBack( ) { return globals.GAME.getTileOnCanvasAtXY( "BACK", this.centerX(), this.baseY() ) };
    get nextTileBack( ) { 
        switch(this.direction) {
            case FACING_LEFT:
                return globals.GAME.getTileOnCanvasAtXY( "BACK", this.centerX() - GRID_BLOCK_PX, this.baseY());
            case FACING_UP:
                return globals.GAME.getTileOnCanvasAtXY( "BACK", this.centerX(), this.baseY() - GRID_BLOCK_PX);
            case FACING_RIGHT:
                return globals.GAME.getTileOnCanvasAtXY( "BACK", this.centerX() + GRID_BLOCK_PX, this.baseY());
            case FACING_DOWN:
                return globals.GAME.getTileOnCanvasAtXY( "BACK", this.centerX(), this.baseY() + GRID_BLOCK_PX);
        }
     };

    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX(), this.baseY()) };
    get nextTileFront( ) { 
        switch(this.direction) {
            case FACING_LEFT:
                return globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX() - GRID_BLOCK_PX, this.baseY());
            case FACING_UP:
                return globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX(), this.baseY() - GRID_BLOCK_PX);
            case FACING_RIGHT:
                return globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX() + GRID_BLOCK_PX, this.baseY());
            case FACING_DOWN:
                return globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX(), this.baseY() + GRID_BLOCK_PX);
        }
    };

    get isInCenterFacingLeft( ) {
        return this.centerX( ) < ( this.currentTileBack.x + ( GRID_BLOCK_PX * .45 ) );
    }

    get isInCenterFacingRight( ) {
        return this.centerX( ) > ( this.currentTileBack.x + ( GRID_BLOCK_PX * .55 ) ); 
    }

    get isInCenterFacingUp( ) {
        return this.baseY( ) < ( this.currentTileBack.y + ( GRID_BLOCK_PX * .45 ) );
    }

    get isInCenterFacingDown( ) {
        return this.baseY( ) > ( this.currentTileBack.y + ( GRID_BLOCK_PX * .55 ) ); 
    }

    drawSprite( ) {
        super.drawSprite( )
        if ( this.hitbox != undefined ) {
            this.hitbox.updateXy( this.centerX( ), this.baseY( ) );             
        }
        if ( this.visionbox != undefined ) {
            this.visionbox.updateXy( this.centerX( ), this.baseY( ) );             
        }
        this.handleSoundEffects( );
    }

    handleSoundEffects( ) {
        if ( this.State.is(globals.STATE_MOVING) && this.movementSoundEffect != undefined ) {
            this.movementSoundEffect.setVolumeAndPan( this )
        }
        else {
            this.movementSoundEffect.reset( );
        }        
    }
} 

module.exports = {
    MapSprite
} 