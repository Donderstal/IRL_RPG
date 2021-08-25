const { 
    NPC_ANIM_TYPE_IDLE,
    NPC_ANIM_TYPE_SEMI_IDLE,
    NPC_ANIM_TYPE_MOVING,
    NPC_ANIM_TYPE_MOVING_IN_LOOP,
    NPC_ANIM_TYPE_ANIMATION_LOOP,
    NPC_MOVE_TYPE_WALKING
}  = require('../../../game-data/globals');
const { MapSprite } = require('./MapSprite')
const { ActionSelector } = require('./ActionSelector')
const { Counter } = require('../../../helpers/Counter');
const globals = require('../../../game-data/globals');

const cellRadius = 2;
const animationList = [
    "BACK_AND_FORTH",
    "LEFT_AND_RIGHT",
    "BOP",
    "BLINK"
]
/**
 * The NPC class is assigned to each non-player character in a map.
 * Each NPC has a animationType. This determines if and how the NPC should be semi-randomly animated.
 * NPCs can also have a associated MapAction. If this is the case, a MapAction instance overwrites the I_Hitbox instance in this.hitbox.
 */
class NPC extends MapSprite {
    constructor( tile, spriteData, spriteId ) {
        const hasAction = ( spriteData.action !== undefined );
        let src = '/static/sprites/'+ spriteData.sprite;
        super( tile, spriteData.direction, "STRD", src )   

        this.initialCol = this.col;
        this.initialRow = this.row;
        
        this.animationType = spriteData.anim_type;
        this.movementType = spriteData.move_type == undefined ? NPC_MOVE_TYPE_WALKING : spriteData.move_type
        this.animationName = spriteData.anim_name == undefined ? false : spriteData.anim_name;
        this.name = spriteData.name
        this.spriteId = spriteId;

        if ( this.animationType == NPC_ANIM_TYPE_MOVING_IN_LOOP ) {
            this.setDestination( spriteData.destination, true );
        }
        else if ( this.animationType == NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            this.setLoopedAnimation( )
        }
        else {
            this.doAnimationCounter = new Counter( 7500, true )    
        }

        // setting a timeout so the MapAction is instantiated after this sprite is added to FRONT.spritedictionary
        setTimeout( ( ) => { 
            if ( hasAction ) {
                this.actionSelector = new ActionSelector( this.centerX( ), this.y, spriteData.action, spriteId );
                this.hitbox = this.actionSelector.activeAction;
                this.action = spriteData.action
                this.action.name = this.name
            }
        }, 50 )

        this.blockedCounter = new Counter( 1000, false )
    }
    /**
     * Call super.drawSprite.
     * If not in movement or scriptedAnimation, call setRandomMovementOrAnimation
     * Else if moving and not blocked, call goToDestination
     * Else if inScriptedAnimation, call doScriptedAnimation
     * If still movingToDestination, call countFrame and handleBlockedTimeCounter
     */
    drawSprite( ) {
        super.drawSprite( );

        if ( !this.movingToDestination && !this.inScriptedAnimation ) {
            this.setRandomMovementOrAnimation( )
        }
        else if ( this.movingToDestination && !this.pathIsBlocked ) {
            this.goToDestination( );     
            this.countFrame( );
        }
        else if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
        }

        if ( this.movingToDestination ) {
            this.handleBlockedTimeCounter( );
        }
    }
    /**
     * Call doAnimationCounter.countAndCheckLimit, which return true if a animation or movement should be set.
     * If true, set a animation or movement depending on this.animationType.
     */
    setRandomMovementOrAnimation( ) {
        if (  this.doAnimationCounter != undefined && this.doAnimationCounter.countAndCheckLimit( ) && !globals.GAME.inCinematic ) {
            switch( this.animationType ) {
                case NPC_ANIM_TYPE_IDLE:
                    this.setRandomAnimation( );
                    break;
                case NPC_ANIM_TYPE_SEMI_IDLE:
                    Math.random( ) < .33 ? this.setRandomDestinationInRadius( ) : this.setRandomAnimation( )
                    break;
                case NPC_ANIM_TYPE_MOVING:
                    this.setRandomDestinationInRadius( ) 
                    break;
                case NPC_ANIM_TYPE_MOVING_IN_LOOP:
                case NPC_ANIM_TYPE_ANIMATION_LOOP:
                    break;
                default : 
                    console.log("Animation of type " + this.animationType + " is not recognized")
            }
        }
    }
    /**
     * If this.pathIsBlocked, call countAndcheckLimit in the Counter instance in this.blockedCounter
     * If this.blockedTimer is over its millisecond limit, reset the destination to calculate a new path.
     * If the NPCs path is not blocked, clear this.blockedCounter
     */
    handleBlockedTimeCounter( ) {
        if ( this.pathIsBlocked ) {
            if ( this.blockedCounter.countAndCheckLimit( ) ) {
                if ( this.destination ) {
                    this.setDestination( { 'col': this.destination.col, 'row': this.destination.row }, this.animationType == NPC_ANIM_TYPE_MOVING_IN_LOOP );
                }
                else {
                    this.stopMovement( );
                    this.unsetDestination( );
                }
            } 
        }
        else {
            this.blockedCounter.resetCounter( );
        }       
    }

    /**
     * TODO: Decide on a tile-radius and set it as a global
     * Get a random col/row pair in a radius around the sprites' initial location.
     * If the col/row pair is valid, pass it to this.setDestination and call this.initMovement.
     * If the pair is not valid, keep calling this method until a valid pair is reached.
     */
    setRandomDestinationInRadius( ) {
        const colDistance = Math.floor( Math.random( ) * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
        const rowDistance = Math.floor( Math.random( ) * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
        const newColumn = this.initialCol + colDistance;
        const newRow = this.initialRow + rowDistance;

        if ( newRow > 0 && newRow < globals.GAME.activeMap.rows + 1 && newColumn > 0 && newColumn < globals.GAME.activeMap.columns + 1 ) {
            this.setDestination( { "col": newColumn, "row": newRow }  )
        }
        else {
            this.setRandomDestinationInRadius( )
        }
    }
    /**
     * TODO: Find a better and clearer way to set the animationName.
     * Get a random String animation name from animationList.
     * If necessary, add a modifier to the string for the sprite current direction.
     * Then call this.setScriptedAnimation, passing the animationName as an argument.
     */
    setRandomAnimation( ) {
        const animation = animationList[ Math.floor( Math.random( ) * animationList.length )]
        let animationName;

        switch ( animation ) {
            case "BOP":
                animationName = this.direction == globals.FACING_UP ? "BOP_UP" : this.direction == globals.FACING_DOWN ? "BOP_DOWN" : this.direction == globals.FACING_LEFT ? "BOP_LEFT" : "BOP_RIGHT";
                break;
            case "BLINK":
                animationName = this.direction == globals.FACING_DOWN ? "BLINK_DOWN" : this.direction == globals.FACING_LEFT ? "BLINK_LEFT" : "BLINK_RIGHT";
                break;
            default: 
                animationName = animation
        }
  
        this.setScriptedAnimation( 
            { "animName": animationName, "loop": false }, globals.FRAME_LIMIT
        )
    }
    /**
     * Call this.setScriptedAnimation, passing this.animationName and loop set to true as arguments.
     */
    setLoopedAnimation( ) {
        this.setScriptedAnimation( 
            { "animName": this.animationName, "loop": true }, globals.FRAME_LIMIT
        )
    }
}

module.exports = {
    NPC
}