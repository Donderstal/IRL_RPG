const MapSprite     = require('./MapSprite').MapSprite
const MapAction     = require('./MapAction').MapAction
const { 
    NPC_ANIM_TYPE_IDLE,
    NPC_ANIM_TYPE_SEMI_IDLE,
    NPC_ANIM_TYPE_MOVING,
    NPC_ANIM_TYPE_MOVING_IN_LOOP,
    NPC_ANIM_TYPE_ANIMATION_LOOP,
    NPC_MOVE_TYPE_WALKING
}  = require('../../../game-data/globals');
const globals = require('../../../game-data/globals');

const cellRadius = 2;
const animationList = [
    "TURN_SINGLE_CIRCLE",
    "BACK_AND_FORTH",
    "LEFT_AND_RIGHT",
    "BACK_AND_FORTH_STEP",
    "LEFT_AND_RIGHT_STEP"
]
/**
 * The NPC class is assigned to each non-player character in a map.
 * Each NPC has a animationType. This determines if and how the NPC should be semi-randomly animated.
 * NPCs can also have a associated MapAction. If this is the case, a MapAction instance overwrites the I_Hitbox instance in this.hitbox.
 */
class NPC extends MapSprite {
    constructor( tile ) {
        const hasAction = ( tile.spriteData.action !== undefined );
        let src = '/static/sprites/'+ tile.spriteData.sprite;
        super( tile, "STRD", src )   

        this.initialCol = this.col;
        this.initialRow = this.row;
        
        this.animationType = tile.spriteData.anim_type;
        this.movementType = tile.spriteData.move_type == undefined ? NPC_MOVE_TYPE_WALKING : tile.spriteData.move_type
        this.animationName = tile.spriteData.anim_name == undefined ? false : tile.spriteData.anim_name;
        this.name = tile.spriteData.name

        if ( hasAction ) {
            this.hitbox = new MapAction( this.centerX( ), this.y, tile.spriteData.action, tile.spriteData.name );
            this.action = tile.spriteData.action
            this.action.name = this.name
        }

        if ( this.animationType == NPC_ANIM_TYPE_MOVING_IN_LOOP ) {
            this.setDestination( tile.spriteData.destination, true );
            this.initMovement( );
        }
        else if ( this.animationType == NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            this.setLoopedAnimation( )
        }
        else {
            this.animationMillisecondsLimit = 7500;
            this.currentAnimationLimit = 0;
            this.milliSecondCounter = 0;
            this.lastTimeStamp = 0;
            this.newTimeStamp = 0;            
        }

        this.blockedMilliSecondsLimit = 10000;
        this.blockedTimer = 0;

        this.oldBlockedTime = 0;
        this.newBlockedTime = 0;
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
        }
        else if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
            this.handleBlockedTimeCounter( );
        }
    }
    /**
     * Call handleRandomAnimationCounter, which return true if a animation or movement should be set.
     * If true, set a animation or movement depending on this.animationType.
     */
    setRandomMovementOrAnimation( ) {
        if ( this.handleRandomAnimationCounter( ) ) {
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
     * ( BROKEN )
     * If this.pathIsBlocked, increment the time since the last check to this.blockedTimer.
     * If this.blockedTimer is over this.blockedMilliSecondsLimit, reset this.blockedTimer and calculate a new path to this.destination.
     * If this.pathIsBlocked is false, reset this.blockedTimer to 0.
     */
    handleBlockedTimeCounter( ) {
        if ( this.pathIsBlocked ) {
            let addDifferenceToCounter = false;

            if ( this.newBlockedTime != 0 ) {
                this.oldBlockedTime = this.newBlockedTime
                addDifferenceToCounter = true
            }

            this.newBlockedTime = Date.now( );

            if ( addDifferenceToCounter ) {
                this.blockedTimer += ( this.newBlockedTime - this.oldBlockedTime );
            }
        
            if ( this.blockedTimer > this.blockedMilliSecondsLimit ) {
                this.blockedTimer = 0;
                this.setDestination( { 'col': this.destination.col, 'row': this.destination.row }, this.animationType == NPC_ANIM_TYPE_MOVING_IN_LOOP );
            }
        }
        else {
            this.blockedTimer = 0;
        }       
    }
    /**
     * ( BROKEN )
     * Increment the time since the last check to this.milliSecondCounter.
     * If milliSecondCounter is over this.currentAnimation limit, reset milliSecondCounter to zero and return true.
     * Else, return false.
     */
    handleRandomAnimationCounter( ) {
        let addDifferenceToCounter = false;

        if ( this.currentAnimationLimit == 0 ) {
            this.currentAnimationLimit = Math.ceil(Math.random( ) * this.animationMillisecondsLimit )
        }

        if ( this.newTimeStamp != 0 ) {
            this.lastTimeStamp = this.newTimeStamp
            addDifferenceToCounter = true
        }

        this.newTimeStamp = Date.now( );

        if ( addDifferenceToCounter ) {
            this.milliSecondCounter += ( this.newTimeStamp - this.lastTimeStamp );
        }
    
        if ( this.milliSecondCounter > this.currentAnimationLimit ) {
            this.milliSecondCounter = 0;
            this.currentAnimationLimit = 0;
            return true;
        }

        return false;
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
            this.initMovement( globals.MOVEMENT_SPEED * .5 );
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
        if ( animation == "BLINK" && this.direction == globals.FACING_UP ) {
            return;
        }
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