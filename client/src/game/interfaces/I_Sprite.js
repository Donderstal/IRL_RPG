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
        this.direction      = direction;
        this.sheetSrc       = src
        this.sheet          = new Image();
        this.moving         = false;
        this.deleted        = false;
        this.animationScript = {};
        this.activeEffect = { active: false };

        this.setSpriteToGrid( tile )

        this.loaded = false
        this.getSpriteAndDrawWhenLoaded( )
    }

    get destinationIsLeft( ) { 
        return this.destinationTile.x <= this.left && this.destinationTile.direction == "FACING_LEFT";
    }
    get destinationIsRight( ) { 
        return this.destinationTile.x + GRID_BLOCK_PX > this.right && this.destinationTile.direction == "FACING_RIGHT";
    }
    get destinationIsUp( ) { 
        return this.destinationTile.y - ( this.height - GRID_BLOCK_PX ) <= this.top && this.destinationTile.direction == "FACING_UP";
    }    
    get destinationIsDown( ) { 
        return this.destinationTile.y + GRID_BLOCK_PX > this.bottom && this.destinationTile.direction == "FACING_DOWN";
    }

    get destinationIsBlocked( ) {
        return ( 
            globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row ).isBlocked 
            || globals.GAME.getTileOnCanvasAtCell( "BACK", this.destination.col, this.destination.row ).isBlocked 
        )     
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
        this.direction = globals[direction] != undefined ? globals[direction] : this.direction;
        newTile.setSpriteData( 'character', null )
        newTile.spriteId = "PLAYER"
        this.setSpriteToGrid( newTile );
    }
     /**
     * If the this.sheet Image is not loaded, set its src.
     * Then, draw it when loaded.
     */
    getSpriteAndDrawWhenLoaded( ) {
        if ( !this.loaded ) {
            this.sheet.onload = () => {
                this.loaded = true
                this.drawSprite()
            }

            this.sheet.src = this.sheetSrc            
        }
    }
     /**
     * Set the left, right, top, bottom properties based on current x, y, width and height props.
     */
    updateSpriteBorders( ) {
        this.left   = this.x,
        this.right  = this.x + this.width,
        this.top    = this.y,
        this.bottom = this.y + this.height
    }
    /**
     * Draw the sprite to the front canvas at its current x and y with current width and height.
     * What frame of the spritesheet is drawn is dependent on the sheetPosition and direction props.
     */
    drawSprite( ) {
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.sheet,
            this.sheetPosition * this.spriteWidthInSheet, this.direction * this.spriteHeightInSheet, 
            this.spriteWidthInSheet, this.spriteHeightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }
        this.updateSpriteBorders( )
    }
    /**
     * Move closer to the middle of I_Tile instance currently assigned to this.destination.
     * Alter this.x and/or this.y depending on the relative position of the destination.
     * If no move is possible, call the checkForNextDestination method.
     */
    goToDestination( ) {
        this.moving = false;

        if ( this.destinationIsLeft  ) {
            this.x -= MOVEMENT_SPEED;
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_LEFT_FLYING : FACING_LEFT;
        }
        else if ( this.destinationIsRight ) {
            this.x += MOVEMENT_SPEED;
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_RIGHT_FLYING : FACING_RIGHT;
        }
        else if ( this.destinationIsUp ) {
            this.y -= MOVEMENT_SPEED;
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_UP_FLYING : FACING_UP;
        }
        else if ( this.destinationIsDown ) {
            this.y += MOVEMENT_SPEED;  
            this.moving = true;
            this.direction = this.movementType == NPC_MOVE_TYPE_FLYING ? FACING_DOWN_FLYING : FACING_DOWN;
        } 

        if ( !this.moving ) {
            this.checkForNextDestination( );
        }
    }
    /**
     * Set the next I_Tile in this.destinationTile as this.destinationTile if possible.
     * If not possible but moving in a loop, reset this.destinationTile to the first tile in the list.
     * Else, stop moving by calling stopMovement, unsetDestination and unsetScriptedAnimation methods
     */
    checkForNextDestination( ) {
        if ( this.activeDestinationIndex + 1 < this.destinationTiles.length ) {
            this.activeDestinationIndex += 1; 
            this.destinationTile = this.destinationTiles[this.activeDestinationIndex].tile;    
        }
        else if ( this.animationType == NPC_ANIM_TYPE_MOVING_IN_LOOP ) {
            this.activeDestinationIndex = 0;
            this.destinationTile = this.destinationTiles[this.activeDestinationIndex].tile;   
        }
        else {
            this.stopMovement( );
            this.unsetDestination( );    
            this.unsetScriptedAnimation( );
        }        
    }
    /**
     * Set this.movingToDestination to true. 
     * If given speed is not null, set it to this.movementSpeed.
     * Else, set MOVEMENT_SPEED.
     * @param {Number} speed optional. movement speed of the sprite in pixels
     */
    initMovement( speed = null ) {
        this.movingToDestination = true;
        this.movementSpeed = speed != null ? speed : MOVEMENT_SPEED;
    }
    /**
     * Set this.sheetPosition to 0 to reset the sprite to a neutral pose.
     * Set this.movingToDestination to false.
     */
    stopMovement( ) {
        this.sheetPosition = 0;
        this.movingToDestination = false;
    }
    /**
     * Initialize a destination properties.
     * If destination is blocked, call unsetDestination
     * Else if car, set a tile to this.destination
     * Else if not a car, call setDestinationList to set this.destinationList
     * @param {Object} destination Properties: row: Number, col: Number
     * @param {Boolean} isLoop boolean indicated if movement should be looped
     */
    setDestination( destination, isLoop = false ) {
        this.originalDirection  = this.direction;
        this.destinationTiles   = [];
        this.destination        = destination;
        this.activeDestinationIndex;

        if ( !this.destinationIsBlocked || this.movementType == NPC_MOVE_TYPE_FLYING ) {
            this.setDestinationList( isLoop );
        }
        else {
            this.unsetDestination( );
        }
    }
    /**
     * First, fetch the I_Tile instances at current row/col and this.destination row/col.
     * Then, get a list of pathIndexes representing the tiles in the most efficient path from this.getPathIndexes.
     * If pathIndexes is false or undefined, call unsetDestination.
     * Else, call the return value of getTileListFromIndexes to this.destinationTiles.
     * @param {Boolean} isLoop 
     */
    setDestinationList( isLoop ) {
        const startingTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.col, this.row );
        const destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row )
        let pathIndexes = [ ]
        if ( isLoop ) {
            let goToIndexes = this.getPathIndexes( startingTile, destinationTile )
            let loopIndexes = this.getPathIndexes( destinationTile, startingTile )
            pathIndexes = [ ...goToIndexes, ...loopIndexes ]
        } else {
            pathIndexes = this.getPathIndexes( startingTile, destinationTile )
        }
        if ( pathIndexes != undefined && pathIndexes != false ) {
            this.destinationTiles = this.getTileListFromIndexes( pathIndexes, startingTile )
            this.activeDestinationIndex = 0;
            this.destinationTile = this.destinationTiles[this.activeDestinationIndex].tile;              
        }
        else {
            this.unsetDestination( )
        }
    }
    /**
     * Call determineShortestPath from the pathfindingHelpersFile and return its return value
     * @param {I_Tile} startingTile I_Tile to start the pathfinding from
     * @param {I_Tile} destinationTile destination I_Tile
     */
    getPathIndexes( startingTile, destinationTile ) {
        return pathFinder.determineShortestPath( startingTile, destinationTile, globals.GAME.BACK.grid, this.movementType == NPC_MOVE_TYPE_FLYING );  
    }
    /**
     * For each index in the list, get the I_Tile instance at its index and push it to an array.
     * Return the array of Tiles.
     * @param {Number[]} pathIndexes 
     * @param {I_Tile} startingTile 
     */
    getTileListFromIndexes( pathIndexes, startingTile ) {
        let lastIndex = startingTile.index;
        let tileList = []

        pathIndexes.forEach( ( pathIndex ) => {
            let tile = globals.GAME.getTileOnCanvasAtIndex( "BACK", pathIndex )
            tile.direction = pathIndex < lastIndex 
            ? pathIndex == lastIndex - 1 ? "FACING_LEFT" : "FACING_UP" 
            : pathIndex == lastIndex + 1 ? "FACING_RIGHT" : "FACING_DOWN" ;
            tileList.push( { 
                tile,
            } )
            lastIndex = pathIndex;
        })

        return tileList;
    }

    /**
     * Empty all destination props or set them to false
     */
    unsetDestination( ) {
        this.destination = false;
        this.destinationTile = false;
        this.destinationTiles = [];
        this.activeDestinationIndex = 0;
        if ( globals.GAME.activeCinematic && this.name == globals.GAME.activeCinematic.activeScene.spriteName )
        {
            globals.GAME.activeCinematic.activeScene.walkingToDestination = false;
        }
    }

    /**
     * Unset destination, set movingToDestination to false and restore pre-movement direction of sprite
     */
    endGoToAnimation( ) {
        this.direction = (this.destination.endDirection) ? this.destination.endDirection : this.direction;
        this.movingToDestination = false;
        this.destination = {}
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
        if ( scene.type == "SPEAK" ) {
            this.speak( scene.text, ( scene.sfx ) ? scene.sfx : false )
        }
        if ( scene.type == "MOVE" ) {
            this.setDestination( scene.destination );
            this.initMovement( );
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
        this.animationScript.frames         = getAnimationFrames( scene.animName, this.direction );   
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