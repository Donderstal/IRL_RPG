const canvasHelpers = require('../../helpers/canvasHelpers')
const globals = require('../../game-data/globals')
const { getEffect } = require('../../helpers/effectHelpers')
const { getAnimationFrames } = require('../../resources/animationResources')
const { getSpeechBubble } = require('../map/map-ui/displayText')
const { 
    STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT,
    GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT, 
    STATE_IDLE, STATE_MOVING, STATE_WAITING, STATE_BLOCKED
} = require( '../../game-data/globals' )
const { checkForCollision } = require('../map/map-ui/movementChecker')
const { SPEAK_YES_NO, SPEAK, MOVE, ANIM } = require('../../game-data/conditionGlobals')
const { Destination } = require('../map/map-classes/Destination')
const { SpriteState } = require('../../helpers/SpriteState')
/**
 * The Sprite serves as a interface for sprites in the game. All sprite classes are extended from it.
 * The Class contains base functionalities concerning drawing a sprite, looping through a spritesheet,
 *  and movement to a destination.
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
        this.State          = new SpriteState( );
        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.direction      = direction != null ? direction : 0
        this.sheetSrc       = src
        this.sheet          = globals.PNG_DICTIONARY[src]
        this.destination    = false;
        this.animationScript = {};
        this.activeEffect = { active: false };
        this.speed      = MOVEMENT_SPEED

        this.setSpriteToGrid( tile )
    }

    setSpriteToGrid( tile ) {
        this.row = tile.row;
        this.col = tile.col;
        
        this.x = tile.x;
        this.y = tile.y - ( this.height - GRID_BLOCK_PX )
    }

    setGraphicalEffect( name ) {
        this.hasActiveEffect= true;
        this.activeEffect   = getEffect( name, this.x, this.y );
    }

    unsetGraphicalEffect( ) {
        this.hasActiveEffect= false;
        this.activeEffect   = null;
    }

    setNewLocationInGrid( cell, direction ) {
        let newTile = globals.GAME.getTileOnCanvasAtCell( 'FRONT', cell.col, cell.row )
        this.direction = direction;
        this.setSpriteToGrid( newTile );
    }

    updateSpriteBorders( ) {
        this.left   = this.x
        this.right  = this.x + this.width
        this.top    = this.y
        this.bottom = this.y + this.height

        let cell = globals.GAME.getTileOnCanvasAtXY("FRONT", this.centerX(), this.baseY())
        this.row = cell.row;
        this.col = cell.col;
    }

    drawSprite( ) {
        this.updateState( );
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
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
        this.checkForBlockedPath( );
        this.checkForMoveToDestination( );
        this.checkForAnimation( );

        this.updateSpriteBorders( )
    }

    updateState( ) {
        if ( this.State.is(STATE_IDLE) && this.destination && this.destination.path ) {
            this.State.set(STATE_MOVING);
        }
        else if ( this.State.is(STATE_MOVING) && (!this.destination || !this.destination.path) ) {
            this.State.set(STATE_IDLE);
        }
        else if ( this.State.is(STATE_MOVING) && this.pathIsBlocked ) {
            this.State.set(STATE_BLOCKED);
            this.sheetPosition = 0;
        }
        else if ( this.State.is(STATE_BLOCKED) ) {
            this.State.set(STATE_MOVING);
        }
    }

    checkForAnimation( ) {
        if ( this.State.inAnimation ) {
            this.doScriptedAnimation( );
        }
    }

    checkForMoveToDestination( ) {
        if ( this.State.is(STATE_MOVING) ) {
            this.destination.goTo( );   
            this.countFrame( ); 
        }
    }

    checkForBlockedPath( ) {
        this.pathIsBlocked = false;
        if ( this.State.is(STATE_MOVING) ) {
            this.pathIsBlocked = checkForCollision( this, this == globals.GAME.PLAYER );
        }
    }

    setDestination( destination, deleteWhenDestinationReached = false ) {
        this.updateSpriteBorders( );
        this.destination = new Destination( destination.col, destination.row, this.spriteId, deleteWhenDestinationReached );
    }

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

    speak( text, sfx, options = null ) {    
        getSpeechBubble( {
            'x' : this.x, 'y' : this.y,
            'text' : text, 'name' : this.name,
            'sfx' : sfx ? sfx : false, 'options' : options
        } );
        if ( this.animationType != globals.NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            this.setScriptedAnimation( { animName: "TALK", loop: true }, FRAME_LIMIT )            
        }
    }

    setScriptedAnimation( scene, frameRate, numberOfLoops = false ) {
        if ( this.State.inAnimation ) {
            this.unsetScriptedAnimation( );
        } 
        this.originalDirection      = this.direction;

        this.animationScript.loop           = scene.loop;
        this.animationScript.frames         = getAnimationFrames( scene.animName, this.direction );   
        this.animationScript.index          = 0;           

        this.animationScript.numberOfFrames = this.animationScript.frames.length;      
        this.animationScript.frameRate      = frameRate;
        this.animationScript.numberOfLoops  = numberOfLoops;
        this.animationScript.currentLoop    = 0;
        this.State.animationOn( );
    }

    doScriptedAnimation( ) {
        this.frameCount++;  
    
        if ( this.animationScript.frames != undefined &&this.frameCount >= this.animationScript.frameRate ) {
            this.frameCount = 0;
            this.updateAnimationIndex( );
        }
    }

    updateAnimationIndex( ) {
        if ( this.animationScript.index + 1 == this.animationScript.numberOfFrames ) {
            this.checkForLoop()
        }
        else {
            let currentScene = this.animationScript.frames[this.animationScript.index];

            this.sheetPosition  = currentScene.column;
            this.direction      = currentScene.row;   
            this.animationScript.index++ 
        }               
    }

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

    unsetScriptedAnimation( ) {
        if ( this.hasActiveEffect ) {
            this.unsetGraphicalEffect( );
        }
        this.State.animationOff( );  
        this.animationScript        = { };
        this.direction              = this.originalDirection;
        this.sheetPosition          = 0;
    }
}

module.exports = {
    Sprite
}