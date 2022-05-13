const { Sprite }     = require('../../core/Sprite')
const { drawFromImageToCanvas } = require('../../../helpers/canvasHelpers')
const globals = require('../../../game-data/globals')
const { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals')
const { Counter } = require('../../../helpers/Counter')
const { ActionSelector } = require('./ActionSelector')
const mapObjectResources = require('../../../resources/mapObjectResources')
const { BlockedArea } = require('./BlockedArea')
const { PLAYER_NAME } = require('../../../game-data/interactionGlobals')
const { initDoorWithId } = require('../../../helpers/doorController')
const { Hitbox } = require('../../core/Hitbox')

/**
 * A MapObject is a sprite extension instantiated from an object in a mapResources.js mapObjects array.
 * Their sizes can vary from the standard sprite sizes.
 * They can also contain a MapAction instance.
 */
class MapObject extends Sprite {
    constructor ( tile, spriteData, spriteId ){
        const objectResource = mapObjectResources[spriteData.sprite == undefined ? spriteData.type : spriteData.sprite]
        const spriteDimensionsInBlocks = getSpriteDimensions( objectResource, spriteData.hasDoor ? null : spriteData.direction );
        const dimensionsInMap = {
            "width": spriteDimensionsInBlocks.hori * GRID_BLOCK_PX,
            "height": spriteDimensionsInBlocks.vert * GRID_BLOCK_PX 
        }
        const hasAction = ( spriteData.action !== undefined );

        super( tile, dimensionsInMap, globals.PNG_DICTIONARY["/static/sprite-assets/"+objectResource.src], spriteData.hasDoor ? null : spriteData.direction )
        this.spriteData = spriteData;
        this.objectResource = objectResource;
        if( "movement_frames" in this.objectResource) {
            this.frames = this.objectResource["movement_frames"];            
        }
        else {
            this.frames = false;
        }

        this.onBackground   = objectResource.on_background;
        this.groundedAtBase = objectResource.grounded_at_bottom;
        this.notGrounded    = objectResource.not_grounded;
        this.doorOrWindow   = objectResource.door_or_window
        this.collectableType=  objectResource.collectable_type
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;
        this.hitbox = false;
        this.hasDoor = spriteData.hasDoor;
        this.spriteId = spriteId;
        this.name = spriteData.name;
        this.type = "object"

        if ( hasAction ) {
            if ( !this.groundedAtBase ) {
                this.actionSelector = new ActionSelector( this.x + ( this.width * .5 ), this.y + ( this.height * .5 ), spriteData.action, spriteId )
            }
            else {
                this.actionSelector = new ActionSelector( this.x + ( this.width * .5 ), ( this.y + this.height ) - (GRID_BLOCK_PX / 2), spriteData.action, spriteId )
            }            
            this.hitbox = this.actionSelector.activeAction;
            this.action = spriteData.action
            this.action.name = PLAYER_NAME;
        }  
        else if ( spriteData.hasDoor ) {
            this.hitbox = initDoorWithId( this.x + ( ( GRID_BLOCK_PX * .75 ) / 2 ), this.y, spriteData )
            for ( var i = 1; i == Math.floor( this.width  / GRID_BLOCK_PX); i++ ) {
                let tileBack = globals.GAME.BACK.getTileAtXY( this.x + ( i * GRID_BLOCK_PX ) , this.y + this.height );
                tileBack.blockedException = true;                
            }
        }
        else {
            this.initHitbox( );
        }
        
        if ( objectResource.hasOwnProperty("blockedArea") ) {
            this.blockedArea = new BlockedArea(this, objectResource.blockedArea)
        }

        if ( objectResource.idle_animation ) {
            this.hasIdleAnimation = true;
            this.idle_animation_frames = objectResource.idle_animation_frames == undefined ? 2 : objectResource.idle_animation_frames;
            this.idleAnimationCounter = new Counter( 5000, true );
        }
    }
    /**
     * Call this.setActiveFrames to determine which frames to draw.
     * Then, draw the sprite to canvas and update its' borders.
     * If sprite is moving, call updateHitbox, checkForCollision, checkForIntersection and goToDestination.
     * Finally, countFrame if still sprite is still moving.
     */
    drawSprite( ) {
        if ( this.frames ) {
            this.setActiveFrames( );            
        }

        if ( this.hitbox != false ) {
            this.updateHitbox( );            
        }

        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }
        if ( this.sheet == undefined ) {
            console.log(this)
            console.log(this.objectResource)
        }
        drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.frames ? this.activeFrames[this.sheetPosition].x : this.sheetPosition * this.widthInSheet, 
            this.frames ? this.activeFrames[this.sheetPosition].y : this.direction * this.heightInSheet, 
            this.widthInSheet, this.heightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasDoor ) {
            this.hitbox.updateXy( this.centerX, this.baseY );  
            this.hitbox.checkForBlockedRange( globals.GAME.PLAYER.hitbox, globals.GAME.PLAYER.direction );
        }
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }

        if ( this.inIdleAnimation ) {
            this.countIdleAnimationFrame( )            
        }
        else if ( this.hasIdleAnimation ) {
            if ( this.idleAnimationCounter.countAndCheckLimit( ) ) {
                this.setIdleObjectAnimation( );
            }
        }

        this.updateCell( )
    }
    //
    setActiveFrames( ) {
        switch ( this.direction ) {
            case FACING_LEFT :
                this.activeFrames = this.frames[FACING_LEFT];
                break;
            case FACING_UP :
                this.activeFrames = this.frames[FACING_UP];
                break;
            case FACING_RIGHT :
                this.activeFrames = this.frames[ FACING_RIGHT];
                break;
            case FACING_DOWN : 
                this.activeFrames = this.frames[ FACING_DOWN];
                break;
            default :
                break;
        }                  
        
        this.sheetFrameLimit = this.activeFrames.length
    }   

    initHitbox( ) {
        if ( this.groundedAtBase ) {
            this.hitbox = new Hitbox( this.x + (this.width / 2), (this.y + this.height) - ( GRID_BLOCK_PX / 2 ), GRID_BLOCK_PX / 2 )
        }
        else {
            this.hitbox = new Hitbox( this.x + (this.width / 2), this.y + (this.height / 2), (this.width > this.height ? this.width : this.height) /2 )     
        }

    }

    updateHitbox( ) {      
        if ( this.groundedAtBase ) {
            this.hitbox.updateXy( this.x + (this.width / 2), (this.y + this.height) - ( GRID_BLOCK_PX / 2 ) )
        }
        else {
            this.hitbox.updateXy( this.x + (this.width / 2), this.y + (this.height / 2) )    
        }  
    }
    /**
     * Increment idleAnimationFrame and check if it is over limit
     * If over limit, restore sheetposition and set inIdleAnimation to false
     */
    countIdleAnimationFrame( ) {
        this.idleAnimationFrame++
        if ( this.idleAnimationFrame > this.idleAnimationFrameLimit ) {
            if ( this.idle_animation_frames == this.idleAnimationFramePosition ) {
                this.inIdleAnimation = false;
                this.sheetPosition = 0;
            }
            else {
                this.sheetPosition += 1;
                this.idleAnimationFramePosition += 1;
            }

        }
    }
    /**
     * Set inIdleAnimation to true. Increment sheetposition.
     * Inititalise animationFrame and animationFrameLimit
     */
    setIdleObjectAnimation( ) {
        this.inIdleAnimation = true;
        this.sheetPosition += 1;
        this.idleAnimationFrame = 0;
        this.idleAnimationFrameLimit = 20;
        this.idleAnimationFramePosition = 1;
    }
    /**
     * Set the width and height of this sprite in sheet and canvas when facing given direction.
     * @param {String} direction String representing a direction
     */
    setObjectDimensionsBasedOnDirection( direction ) {
        const spriteDimensionsInBlocks = getSpriteDimensions( this.objectResource, direction );     
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;  
        this.width = spriteDimensionsInBlocks.hori * GRID_BLOCK_PX;
        this.height = spriteDimensionsInBlocks.vert * GRID_BLOCK_PX; 
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;
    }
}
/**
 * Return the sprites' dimensions expressed as GRID_BLOCKs as an object.
 * @param {Object} objectResource object with information about the sprites dimensions
 * @param {String} spriteDirection direction the sprite is facing
 */
const getSpriteDimensions = ( objectResource, spriteDirection ) => {
    const spriteDimensionsInBlocks = { "hori": 0, "vert": 0 };

    if ( objectResource.dimensional_alignment == "STANDARD" ) {
        spriteDimensionsInBlocks.hori = objectResource.width_blocks;
        spriteDimensionsInBlocks.vert = objectResource.height_blocks
    } 
    else if ( objectResource.dimensional_alignment == "HORI_VERT" ) {
        if ( spriteDirection == FACING_LEFT || spriteDirection == FACING_RIGHT ) {
            spriteDimensionsInBlocks.hori = objectResource.hori_width_blocks;
            spriteDimensionsInBlocks.vert = objectResource.hori_height_blocks
        }
        else if ( spriteDirection == FACING_UP || spriteDirection == FACING_DOWN ) {
            spriteDimensionsInBlocks.hori = objectResource.vert_width_blocks;
            spriteDimensionsInBlocks.vert = objectResource.vert_height_blocks
        }
    } 

    return spriteDimensionsInBlocks;
}

module.exports = {
    MapObject
}