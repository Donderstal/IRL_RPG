const globals = require('../../../game-data/globals')
const { FRAME_LIMIT, GRID_BLOCK_PX } = require('../../../game-data/globals');
const anim = require('../../../resources/animationResources')
const getSpeechBubble = require('../map-ui/displayText').getSpeechBubble
const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const I_Hitbox = require('../../interfaces/I_Hitbox').I_Hitbox
const checkForCollision = require('../map-ui/movementChecker').checkForCollision
/**
 * The MapSprite is the base class for all standard size sprites in the game.
 * It contains functionalities to play a scriptedanimation and log the current position of the sprite in the map grid.
 * It also contains a I_Hitbox instance which is used for collision detection.
 */
class MapSprite extends I_Sprite {
    constructor ( tile, spriteSize, src ) {       
        super( tile, spriteSize, src, globals[tile.spriteData.direction] )   
        this.cell = {}
        this.animationScript = {};
        this.hitbox = new I_Hitbox( this.centerX( ), this.baseY( ), this.width / 2 );
        
        this.spriteId;
        this.activeTileIndex;
        this.nextTileIndex;
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
        else if ( globals.GAME.cinematicMode && ( this.inScriptedAnimation || this.inMovementAnimation ) ) {
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
    /**
     * If this.inScriptedAnimation, call this.doScriptedAnimation.
     * If this.inMovementAnimation, call this.goToDestination.
     */
    handleAnimation(  ) {
        if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
        }
        else if ( this.inMovementAnimation ) {
            this.goToDestination( );
        }
    }
    /**
     * ( INCOMPLETE )
     * Old method that was used in scripted gameplay events.
     * Should be refactored when the scripted gameplay code is refactored.
     * @param {Scene} scene 
     */
    setAnimation( scene ) {
        if ( scene.type == "SPEAK" ) {
            this.speak( scene.text, ( scene.sfx ) ? scene.sfx : false )
        }
        if ( scene.type == "MOVE" ) {
            this.setDestination( scene.destination, (scene.endDirection) ? scene.endDirection : false );
        }
        if ( scene.type == "ANIM" ) {
            this.setScriptedAnimation( scene, FRAME_LIMIT )
        }
    }
    /**
     * Call getSpeechBubble from the diplayText.js file with parameters as arguments.
     * @param {String} text text to be displayed
     * @param {String} sfx name of the sound effect to play
     */
    speak( text, sfx ) {    
        getSpeechBubble( {
            'x'     : this.x,
            'y'     : this.y,
            'text'  : text,
            'name'  : this.name,
            'sfx'   : ( sfx ) ? sfx : false
        } );
    }
    /**
     * Initialize animation by setting this.inScriptedAnimation to true and storing this.direction.
     * Assign values to the properties of the this.animationScript object, which will be used to run the animation.
     * @param {Object} scene contains the animation name and a loop boolean
     * @param {Number} frameRate frameRate to use during animation
     * @param {Number|Boolean} numberOfLoops optional parameter indicating if a loop is permanent
     */
    setScriptedAnimation( scene, frameRate, numberOfLoops = false ) {
        this.inScriptedAnimation    = true;     
        this.originalDirection      = this.direction;

        this.animationScript.loop           = scene.loop;
        this.animationScript.frames         = anim[scene.animName];   
        this.animationScript.index          = 0;           
        this.animationScript.numberOfFrames = this.animationScript.frames.length;      
        this.animationScript.frameRate      = frameRate;
        this.animationScript.numberOfLoops  = numberOfLoops;
        this.animationScript.currentLoop    = 0;
    }
    /**
     * Increment this.frameCount.
     * If it is over this.animationScript.frameRate, update the AnimationIndex indicating the current frame.
     * Then, assign the currentFrames' positions in the spriteSheet to this.sheetPosition and this.direction.
     */
    doScriptedAnimation( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= this.animationScript.frameRate ) {
            this.frameCount = 0;
            this.updateAnimationIndex( );

            if ( this.inScriptedAnimation ) {
                let currentScene = this.animationScript.frames[this.animationScript.index];

                this.sheetPosition  = currentScene.position;
                this.direction      = currentScene.direction    
            }
        }
    }
    /**
     * Check for loop or increment this.animationScriptIndex, depending on what frame from this.animationScript.frames we are in.
     */
    updateAnimationIndex( ) {
        ( this.animationScript.index + 1 == this.animationScript.numberOfFrames )
            ? this.checkForLoop()
            : this.animationScript.index++                       
    }
    /**
     * If the current animation should be looped, reset the animationScript.index to 0.
     * Else, call this.unsetScriptedAnimation.
     */
    checkForLoop( ) {
        const currentLoopIsLast = this.animationScript.numberOfLoops == this.animationScript.currentLoop

        if ( this.animationScript.loop && ( !this.animationScript.numberOfLoops || !currentLoopIsLast ) ) {
            this.animationScript.currentLoop++
            this.animationScript.index = 0;
        }
        else {
            this.unsetScriptedAnimation( );
        }
    }
    /**
     * Set this.inScriptedAnimation to false and empty this.animationScript.
     * Then, reset this.drection to this.originalDirection and set this.sheetPosition to 0 for a neutral spritesheet frame.
     */
    unsetScriptedAnimation( ) {
        this.inScriptedAnimation    = false;  
        this.animationScript        = { };
        this.direction              = this.originalDirection;
        this.sheetPosition          = 0;
    }
} 

module.exports = {
    MapSprite
} 