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

const cellRadius = 3;
const animationList = [
    "TURN_SINGLE_CIRCLE",
    "BACK_AND_FORTH",
    "LEFT_AND_RIGHT",
    "BACK_AND_FORTH_STEP",
    "LEFT_AND_RIGHT_STEP"
]

class NPC extends MapSprite {
    constructor( tile ) {
        const hasAction = ( tile.spriteData.action !== undefined );
        let src = '/static/sprites/'+ tile.spriteData.sprite;
        super( tile, "STRD", src )   

        this.initialCol = this.col;
        this.initialRow = this.row;
        
        this.nonPlayerAnimation = tile.spriteData.anim_type;
        this.movementAnimation = tile.spriteData.move_type == undefined ? NPC_MOVE_TYPE_WALKING : tile.spriteData.move_type
        this.animationName = tile.spriteData.anim_name == undefined ? false : tile.spriteData.anim_name;
        this.name = tile.spriteData.name

        if ( hasAction ) {
            this.hitbox = new MapAction( this.centerX( ), this.y, tile.spriteData.action, tile.spriteData.name );
            this.action = tile.spriteData.action
            this.action.name = this.name
        }

        if ( this.nonPlayerAnimation == NPC_ANIM_TYPE_MOVING_IN_LOOP ) {
            this.setDestination( tile.spriteData.destination, true );
            this.initMovement( );
        }
        else if ( this.nonPlayerAnimation == NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            this.setLoopedAnimation( )
        }
        else {
            this.animationMillisecondsLimit = 10000;
            this.currentAnimationLimit = 0;
            this.milliSecondCounter = 0;
            this.lastTimeStamp = 0;
            this.newTimeStamp = 0;            
        }
    }

    drawSprite( ) {
        super.drawSprite( );

        if ( !this.movingToDestination && !this.inScriptedAnimation ) {
            if ( this.handleRandomAnimation( ) ) {
                switch( this.nonPlayerAnimation ) {
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
                        console.log("Animation of type " + this.nonPlayerAnimation + " is not recognized")
                }
            }
        }
        else if ( this.movingToDestination && !this.pathIsBlocked ) {
            this.goToDestination( );     
        }
        else if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
        }
    }

    handleRandomAnimation( ) {
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

    setRandomDestinationInRadius( ) {
        const colDistance = Math.floor( Math.random( ) * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
        const rowDistance = Math.floor( Math.random( ) * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
        const newColumn = this.initialCol + colDistance;
        const newRow = this.initialRow + rowDistance;

        if ( newRow > 0 && newRow < globals.GAME.activeMap.rows + 1 && newColumn > 0 && newColumn < globals.GAME.activeMap.columns + 1 ) {
            this.setDestination( { "col": newColumn, "row": newRow }  )
            this.initMovement( " ", globals.MOVEMENT_SPEED * .5 );
        }
        else {
            this.setRandomDestinationInRadius( )
        }
    }

    setRandomAnimation( ) {
        const animationName = animationList[ Math.floor( Math.random( ) * animationList.length )]
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