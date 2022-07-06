const canvasHelpers = require('../../helpers/canvasHelpers')
const globals = require('../../game-data/globals')
const { getEffect } = require('../../helpers/effectHelpers')
const { getAnimationFrames } = require('../../resources/animationResources')
const { 
    STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT,
    GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT, 
    STATE_IDLE, STATE_MOVING, STATE_BLOCKED, STATE_PATHFINDING
} = require( '../../game-data/globals' )
const { checkForCollision } = require('../map/map-ui/movementChecker')
const { SPEAK_YES_NO, SPEAK, MOVE, ANIM, EMOTE } = require('../../game-data/conditionGlobals')
const { Destination } = require('../map/map-classes/Destination')
const { SpriteState } = require('../../helpers/SpriteState')
const { faceTowardsTarget } = require('../../helpers/utilFunctions')
const { PLAYER_ID } = require('../../game-data/interactionGlobals')
/**
 * The Sprite serves as a interface for sprites in the game. All sprite classes are extended from it.
 * The Class contains base functionalities concerning drawing a sprite, looping through a spritesheet,
 *  and movement to a destination.
 */
class Sprite {
    constructor ( tile, spriteSize, image, direction, isPlayer ) {   
        if ( spriteSize == "STRD" ) {
            this.width   = STRD_SPRITE_WIDTH;
            this.height  = STRD_SPRITE_HEIGHT;            
        }
        else {
            this.width  = spriteSize.width;
            this.height = spriteSize.height;
        }

        this.State          = new SpriteState( );
        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.direction      = direction != null ? direction : 0
        this.sheet          = image;
        this.destination    = false;
        this.animationScript = {};
        this.activeEffect   = { active: false };
        this.isPlayer       = isPlayer;
        this.speed          = this.isPlayer ? MOVEMENT_SPEED : MOVEMENT_SPEED * (Math.random() * (.75 - .5) + .5);
        this.type           = "sprite"

        this.setSpriteToGrid( tile )
    }
    get isInCameraFocus() { 
        return globals.GAME.cameraFocus.focusSpriteId == this.spriteId;
    }
    get activeAnimationFrame() {
        return this.animationScript.frames[this.animationScript.index];
    }

    get centerX() { return this.x + ( this.width / 2 ); };
    get baseY() { return this.bottom - ( GRID_BLOCK_PX / 2 ); };
    get topY() { return this.top + ( GRID_BLOCK_PX / 2 ); };
    get left() { return this.x; };
    get top() { return this.y; };
    get right() { return this.x + this.width; };
    get bottom() { return this.y + this.height; };

    get noCollision ( ) { return this.onBackground || this.notGrounded || (this.movementType == globals.NPC_MOVE_TYPE_FLYING && this.State.is( STATE_MOVING )) }
    get standing() { return this.groundedAtBase || (this.type != "object" && this.type != 'car') };
    get dynamicTop( ) { return this.standing ? this.baseY - this.speed : this.topY };

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

    updateCell( ) {
        let cell = globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX, this.baseY )
        this.row = cell.row;
        this.col = cell.col;
    }

    nextPosition( direction = this.direction ) {
        switch(direction) {
            case globals.FACING_LEFT:
                return this.left - this.speed;
            case globals.FACING_UP:
                return this.dynamicTop - this.speed;
            case globals.FACING_RIGHT:
                return this.right + this.speed;
            case globals.FACING_DOWN:
                return this.bottom + this.speed;
            default:
                console.log( "Error! Direction " + direction + " was not recognized.");
                break;
        }
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
        this.checkForMoveToDestination( );
        this.checkForAnimation( );

        this.updateCell( )
    }

    updateState( ) {
        if ( (this.State.is(STATE_IDLE) && this.destination && this.destination.path) && !this.State.inCinematic ) {
            this.State.set(STATE_MOVING);
        }
        else if ( this.State.is(STATE_MOVING) && (!this.destination || !this.destination.path) ) {
            this.State.set(STATE_IDLE);
        }
        else if ( this.State.is(STATE_MOVING) && this.checkForCollision( ) ) {
            this.State.set(STATE_BLOCKED);
            this.sheetPosition = 0;
        }
        else if ( this.State.is(STATE_BLOCKED) && !this.checkForCollision( ) ) {
            this.State.set(STATE_MOVING);
        }
    }

    checkForAnimation( ) {
        if ( this.State.inAnimation ) {
            this.doScriptedAnimation( );
        }
    }

    checkForMoveToDestination( ) {
        if ( this.State.is(STATE_MOVING) && !this.State.inAnimation && this.destination != false ) {
            this.destination.goTo( );   
            this.countFrame( ); 
        }
    }

    setDestination( destination, deleteWhenDestinationReached = false ) {
        if ( !this.isCar ) {
            this.State.set( STATE_PATHFINDING );
        }
        else {
            this.State.set( STATE_MOVING );
        }

        this.updateCell( );
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

    setAnimation( animation ) {
        if ( (animation.is( SPEAK_YES_NO ) || animation.is( SPEAK ) || animation.is( EMOTE )) && animation.speakWith ) {
            const otherSprite = animation.getSpriteByName( animation.speakWith );
            this.direction = this.spriteId == otherSprite.spriteId ? this.direction : faceTowardsTarget( this, otherSprite );
        }
        if ( animation.is( SPEAK_YES_NO ) ) {
            this.speak( animation.text, (animation.sfx ? animation.sfx : (this.sprite == PLAYER_ID ? "medium-text-blip.ogg" : false)), SPEAK_YES_NO )
        }
        if ( animation.is( SPEAK ) ) {
            this.speak( animation.text, (animation.sfx ? animation.sfx : (this.sprite == PLAYER_ID ? "medium-text-blip.ogg" : false)), SPEAK )
        }
        if ( animation.is( EMOTE ) ) {
            globals.GAME.speechBubbleController.setNewEmote( { x: this.x, y: this.y }, animation.src );
        }
        if ( animation.is( MOVE ) ) {
            this.setDestination( animation.destination );
        }
        if ( animation.is( ANIM ) ) {
            this.setScriptedAnimation( animation, FRAME_LIMIT )
        }
    }

    speak( text, sfx, type ) {
        globals.GAME.speechBubbleController.setNewBubble( 
            {'x': this.x, 'y': this.y}, 
            {'text': text, 'name': this.name, 'sfx': sfx ? sfx : this.sfx},
            type
        );   
        if ( this.animationType != globals.NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            this.setScriptedAnimation( { animName: "TALK", loop: true }, FRAME_LIMIT )            
        }
    }

    setScriptedAnimation( animation, frameRate, numberOfLoops = false ) {
        if ( this.State.inAnimation ) {
            this.unsetScriptedAnimation( );
        } 
        const startingPositon = {
            'direction': this.direction,
            'sheetPosition': this.sheetPosition
        }
        this.animationScript.loop           = animation.loop;
        this.animationScript.frames         = getAnimationFrames( animation.animName, this.direction ); 
        this.animationScript.index          = 0;           
        this.sheetPosition  = this.activeAnimationFrame.column;
        this.direction      = this.activeAnimationFrame.row;

        this.animationScript.numberOfFrames = this.animationScript.frames.length;      
        this.animationScript.frameRate      = frameRate;
        this.animationScript.numberOfLoops  = numberOfLoops;
        this.animationScript.currentLoop    = 0;
        this.State.animationOn( startingPositon );
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
            let currentAnimation = this.animationScript.frames[this.animationScript.index];

            this.sheetPosition  = currentAnimation.column;
            this.direction      = currentAnimation.row;   
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
        this.animationScript        = { };
        this.State.animationOff( this );  
    }

    moveSprite( direction, movementSpeed = this.speed ) {
        this.direction = direction;
        if ( direction == globals.FACING_LEFT ) {
            this.x -= movementSpeed;
        }
        if ( direction == globals.FACING_UP ) {
            this.y -= movementSpeed;
        }
        if ( direction == globals.FACING_RIGHT ) {
            this.x += movementSpeed;
        }
        if ( direction == globals.FACING_DOWN ) {
            this.y += movementSpeed;
        }
        if ( this.isInCameraFocus && !globals.GAME.cameraFocus.movingToNewFocus ) {
            globals.GAME.cameraFocus.centerOnXY( this.centerX, this.baseY );
        }
    }

    checkForCollision( ) {
        return checkForCollision( this, false ) ;
    }

    getBlockedTiles( ) {
        let x = this.x;
        let y = this.dynamicTop;
        let tileIndexes = [];

        while( y <= this.bottom ) {
            while( x <= this.right ) {
                const tile = globals.GAME.FRONT.getTileAtXY( x, y );
                x = (x + GRID_BLOCK_PX) > this.right && x != this.right ? this.right : x + GRID_BLOCK_PX;
                if ( tileIndexes.indexOf( tile.index ) == -1 ) {
                    tileIndexes.push( tile.index )
                }
            }
            y = (y + GRID_BLOCK_PX) > this.bottom && y != this.bottom ? this.bottom : y + GRID_BLOCK_PX;
        }
        return tileIndexes;
    }
}

module.exports = {
    Sprite
}