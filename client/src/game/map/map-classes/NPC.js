const { 
    NPC_ANIM_TYPE_IDLE, NPC_ANIM_TYPE_SEMI_IDLE, NPC_ANIM_TYPE_MOVING,
    NPC_ANIM_TYPE_MOVING_IN_LOOP, NPC_ANIM_TYPE_ANIMATION_LOOP, NPC_MOVE_TYPE_WALKING,
    STATE_BLOCKED
}  = require('../../../game-data/globals');
const { MapSprite } = require('./MapSprite')
const { ActionSelector } = require('./ActionSelector')
const { Counter } = require('../../../helpers/Counter');
const globals = require('../../../game-data/globals');
const { getClassProfile, getProfileName } = require('../../../resources/classProfileResources');

const cellRadius = 2;
const animationList = [
    "BACK_AND_FORTH",
    "LEFT_AND_RIGHT",
    "BOP",
    "BLINK"
]
/**
 * The NPC class is assigned to each non-player character sprite on a map.
 * Each NPC has a animationType. This determines if and how the NPC should be semi-randomly animated.
 * NPCs can also have a associated MapAction which the player can interact with.
 */
class NPC extends MapSprite {
    constructor( tile, spriteData, spriteId ) {
        const hasAction = ( spriteData.action !== undefined );
        const classProfile = getClassProfile( spriteData.className == undefined ? getProfileName(spriteData.sprite) : spriteData.className )
        super( tile, spriteData.direction, "STRD", classProfile )   
        this.spriteData = spriteData
        this.initialCol = this.col;
        this.initialRow = this.row;
        
        this.animationType = spriteData.anim_type;
        this.movementType = spriteData.move_type == undefined ? NPC_MOVE_TYPE_WALKING : spriteData.move_type
        this.animationName = spriteData.anim_name == undefined ? false : spriteData.anim_name;
        this.name = spriteData.name
        this.spriteId = spriteId;
        this.type = 'character'

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
                this.actionSelector = new ActionSelector( this.centerX, this.y, spriteData.action, spriteId );
                this.hitbox = this.actionSelector.activeAction;
                this.action = spriteData.action
                this.action.name = this.name
            }
        }, 50 )

        this.blockedCounter = new Counter( 2000 * Math.random( ), false, false )
    }

    drawSprite( ) {
        super.drawSprite( );
        this.handleBlockedTimeCounter( );

        if ( this.State.is(globals.STATE_IDLE) ) {
            this.setRandomMovementOrAnimation( );
        }
    }

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
            this.doAnimationCounter.resetCounter( );
        }
    }

    handleBlockedTimeCounter( ) {
        if ( this.State.is(STATE_BLOCKED) ) {
            if ( this.blockedCounter.countAndCheckLimit( ) ) {
                this.destination.calculatePath( this.destination.currentStep );
            } 
        }
        else {
            this.blockedCounter.resetCounter( );
        }       
    }

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

    setLoopedAnimation( ) {
        this.setScriptedAnimation( 
            { "animName": this.animationName, "loop": true }, globals.FRAME_LIMIT
        )
    }
}

module.exports = {
    NPC
}