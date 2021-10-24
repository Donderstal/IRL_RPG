const canvasHelpers = require('../../helpers/canvasHelpers')
const pathFinder = require('../../helpers/pathfindingHelpers')
const globals = require('../../game-data/globals')
const { getEffect } = require('../../helpers/effectHelpers')
const { getAnimationFrames } = require('../../resources/animationResources')
const { getSpeechBubble } = require('../map/map-ui/displayText')
const { 
    STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT,
    GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT, 
    NPC_MOVE_TYPE_FLYING,  NPC_ANIM_TYPE_MOVING_IN_LOOP,
    FACING_LEFT, FACING_LEFT_FLYING, FACING_RIGHT, FACING_RIGHT_FLYING,
    FACING_UP, FACING_UP_FLYING, FACING_DOWN, FACING_DOWN_FLYING
} = require( '../../game-data/globals' )
const { SPEAK_YES_NO, SPEAK, MOVE, ANIM } = require('../../game-data/conditionGlobals')
const { Destination } = require('../map/map-classes/Destination')
/**
 * The Sprite serves as a interface for sprites in the game. All sprite classes are extended from it.
 * The Class contains base functionalities concerning drawing a sprite, looping through a spritesheet,
 *  and movement towards a pre-defined destination.
 */
class Sprite {
    constructor ( tile, spriteSize, src, direction ) {   
        if ( spriteSize == "STRD" ) {
            this.width   = STRD_SPRITE_WIDTH;
            this.height  = STRD_SPRITE_HEIGHT;            
        }
        else {
            this.width  = spriteSize.width;
            this.height = spriteSize.height;
        }

        this.left, this.right, this.top, this.bottom;
        this.centerX = () => { return this.x + ( this.width / 2 ) };
        this.baseY = () => { return ( this.y + this.height ) - ( globals.GRID_BLOCK_PX / 2 ) };

        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.direction      = direction != null ? direction : 0 //tile.direction != null ? tile.direction : direction != null ? direction : 0;
        this.sheetSrc       = src
        this.sheet          = globals.PNG_DICTIONARY[src]
        this.moving         = false;
        this.destination    = false;
        this.deleted        = false;
        this.animationScript = {};
        this.activeEffect = { active: false };
        this.speed      = MOVEMENT_SPEED
        this.isPasserby = false;

        this.setSpriteToGrid( tile )
    }
    get isOffScreen( ) {
        return ( this.left + this.width ) < 0 || ( this.top + this.height ) < 0 
        || this.right - this.width > globals.GAME.FRONT.grid.width || this.bottom - this.height > globals.GAME.FRONT.grid.height;
    }
     /**
     * Set the Sprites' location on the grid and xy axis depending on given I_Tile
     * @param {I_TIle} tile instance of I_Tile Class
     */
    setSpriteToGrid( tile ) {
        this.row = tile.row;
        this.col = tile.col;
        
        this.x = tile.x;
        this.y = tile.y - ( this.height - GRID_BLOCK_PX )
    }
    /** 
     * Instantiate a sprite-bound graphical effect and assign it to this.activeEffect
     * @param {String} name name of the effect to instantiate
     */
    setGraphicalEffect( name ) {
        this.hasActiveEffect= true;
        this.activeEffect   = getEffect( name, this.x, this.y );
    }
    /**
     * Set hasActiveEffect to false and clear this.activeEffect
     */
    unsetGraphicalEffect( ) {
        this.hasActiveEffect= false;
        this.activeEffect   = null;
    }
     /**
     * Get the I_Tile instance at given cell. Assign direction to this.direction if not undefined.
     * Then, mark this Sprite as the player and call this.SetSpriteToGrid
     * @param {Object} cell object with row and col as properties
     * @param {String} direction the direction the sprite should face
     */
    setNewLocationInGrid( cell, direction ) {
        let newTile = globals.GAME.getTileOnCanvasAtCell( 'FRONT', cell.col, cell.row )
        this.direction = direction;
        this.setSpriteToGrid( newTile );
    }
     /**
     * Set the left, right, top, bottom properties based on current x, y, width and height props.
     */
    updateSpriteBorders( ) {
        this.left   = this.x
        this.right  = this.x + this.width
        this.top    = this.y
        this.bottom = this.y + this.height

        let cell = globals.GAME.getTileOnCanvasAtXY("FRONT", this.centerX(), this.baseY())
        this.row = cell.row;
        this.col = cell.col;
    }
    /**
     * Draw the sprite to the front canvas at its current x and y with current width and height.
     * What frame of the spritesheet is drawn is dependent on the sheetPosition and direction props.
     */
    drawSprite( ) {
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }
        if ( this.sheet == undefined ) {
            console.log(this.sheetSrc)
            console.log(globals.PNG_DICTIONARY)
        }
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.sheet,
            this.sheetPosition * this.spriteWidthInSheet, this.direction * this.spriteHeightInSheet, 
            this.spriteWidthInSheet, this.spriteHeightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }

        if ( this.destination && this.destination.path ) {
            if( !this.pathIsBlocked ) {
                this.destination.goTo( );   
                this.countFrame( );  
            }        
            else {
                this.sheetPosition = 0;
            }    
        }
        else if ( this.inScriptedAnimation && this == globals.GAME.PLAYER ) {
            this.doScriptedAnimation( );
        }
        this.updateSpriteBorders( )
    }
    /**
     * Initialize a destination properties.
     * If destination is blocked, call unsetDestination
     * Else if car, set a tile to this.destination
     * Else if not a car, call setDestinationList to set this.destinationList
     * @param {Object} destination Properties: row: Number, col: Number
     * @param {Boolean} isLoop boolean indicated if movement should be looped
     */
    setDestination( destination, deleteWhenDestinationReached = false ) {
        this.updateSpriteBorders( );
        this.destination = new Destination( destination.col, destination.row, this.spriteId, deleteWhenDestinationReached );
    }
    /**
     * Increment the value of this.frameCount.
     * If it is over FRAME_LIMIT, reset it to 0 and increment this.sheetPosition to show a new frame of the spriteSheet on the current row.
     * If sheetPosition is over the sheetFrameLimit, reset it to 0 to to show the first frame of the spriteSheet on the current row.
     */
    countFrame ( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;
    
            if (this.sheetPosition >= this.sheetFrameLimit) {
                this.sheetPosition = 0;
            }
        }
    }
    /**
     * If this.inScriptedAnimation, call this.doScriptedAnimation.
     * If this.movingToDestination, call this.goToDestination.
     */
    handleAnimation(  ) {
        if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
        }
        else if ( this.movingToDestination ) {
            this.goToDestination( );
            this.countFrame( );
            let tile = globals.GAME.getTileOnCanvasAtXY( "BACK", this.x, this.y );
            this.row = tile.row;
            this.col = tile.col;
        }
    }
    /**
     * ( INCOMPLETE )
     * Old method that was used in scripted gameplay events.
     * Should be refactored when the scripted gameplay code is refactored.
     * @param {Scene} scene 
     */
    setAnimation( scene ) {
        if ( scene.is( SPEAK_YES_NO ) ) {
            this.speak( scene.text, ( scene.sfx ) ? scene.sfx : false, [ "( Space ) YES", "( Z ) NO" ] )
        }
        if ( scene.is( SPEAK ) ) {
            this.speak( scene.text, ( scene.sfx ) ? scene.sfx : false )
        }
        if ( scene.is( MOVE ) ) {
            this.setDestination( scene.destination );
        }
        if ( scene.is( ANIM ) ) {
            this.setScriptedAnimation( scene, FRAME_LIMIT )
        }
    }
    /**
     * Call getSpeechBubble from the diplayText.js file with parameters as arguments.
     * @param {String} text text to be displayed
     * @param {String} sfx name of the sound effect to play
     */
    speak( text, sfx, options = null ) {    
        getSpeechBubble( {
            'x'         : this.x,
            'y'         : this.y,
            'text'      : text,
            'name'      : this.name,
            'sfx'       : ( sfx ) ? sfx : false,
            'options'   : options
        } );
        if ( this.animationType != globals.NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            this.setScriptedAnimation( { animName: "TALK", loop: true }, FRAME_LIMIT )            
        }
    }
    /**
     * Initialize animation by setting this.inScriptedAnimation to true and storing this.direction.
     * Assign values to the properties of the this.animationScript object, which will be used to run the animation.
     * @param {Object} scene contains the animation name and a loop boolean
     * @param {Number} frameRate frameRate to use during animation
     * @param {Number|Boolean} numberOfLoops optional parameter indicating if a loop is permanent
     */
    setScriptedAnimation( scene, frameRate, numberOfLoops = false ) {
        if ( this.inScriptedAnimation ) {
            this.unsetScriptedAnimation( );
        }
        this.inScriptedAnimation    = true;     
        this.originalDirection      = this.direction;

        this.animationScript.loop           = scene.loop;
        this.animationScript.frames         = getAnimationFrames( scene.animName, this.direction );   
        this.animationScript.index          = 0;           

        if ( this.animationScript.frames == undefined ) {
            console.log(this.animationScript)
            console.log(scene)
            console.log(this.direction)
            alert('Error in animitionScript setter!')
        }

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

                this.sheetPosition  = currentScene.column;
                this.direction      = currentScene.row;    
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
        if ( this.hasActiveEffect ) {
            this.unsetGraphicalEffect( );
        }
        this.inScriptedAnimation    = false;  
        this.animationScript        = { };
        this.direction              = this.originalDirection;
        this.sheetPosition          = 0;
    }
}

module.exports = {
    Sprite
}