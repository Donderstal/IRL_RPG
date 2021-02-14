const MapSprite     = require('./MapSprite').MapSprite
const MapAction     = require('./MapAction').MapAction
const { 
    NPC_MOVE_TYPE_WALKING
}  = require('../../../game-data/globals');
const globals = require('../../../game-data/globals');

const cellRadius = 3;

class NPC extends MapSprite {
    constructor( tile ) {
        const hasAction = ( tile.spriteData.action !== undefined );
        let src = '/static/sprites/'+ tile.spriteData.sprite;
        super( tile, "STRD", src )   

        this.initialCol = this.col;
        this.initialRow = this.row;
        
        this.nonPlayerAnimation = tile.spriteData.anim_type
        this.movementAnimation = tile.spriteData.move_type == undefined ? NPC_MOVE_TYPE_WALKING : tile.spriteData.move_type
        this.name = tile.spriteData.name

        if ( hasAction ) {
            this.hitbox = new MapAction( this.centerX( ), this.y, tile.spriteData.action, tile.spriteData.name );
            this.action = tile.spriteData.action
            this.action.name = this.name
        }

        this.animationMillisecondsLimit = 10000;
        this.currentAnimationLimit = 0;
        this.milliSecondCounter = 0;
        this.lastTimeStamp = 0;
        this.newTimeStamp = 0;
    }

    drawSprite( ) {
        super.drawSprite( );

        if ( !this.movingToDestination && !this.isInAnimation ) {
            if ( this.handleRandomAnimation( ) ) {
                this.getRandomDestinationInRadius( )          
            }
        }
        else if ( this.movingToDestination && !this.pathIsBlocked ) {
            this.goToDestination( );     
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

    getRandomDestinationInRadius( ) {
        const colDistance = Math.floor( Math.random( ) * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
        const rowDistance = Math.floor( Math.random( ) * ( ( cellRadius * 2 ) + 1 ) ) - cellRadius;
        const newColumn = this.initialCol + colDistance;
        const newRow = this.initialRow + rowDistance;

        if ( newRow > 0 && newRow < globals.GAME.activeMap.rows + 1 && newColumn > 0 && newColumn < globals.GAME.activeMap.columns + 1 ) {
            this.setDestination( { "col": newColumn, "row": newRow }  )
            this.initMovement( " ", globals.MOVEMENT_SPEED * .5 );
        }
        else {
            this.getRandomDestinationInRadius( )
        }
    }
}

module.exports = {
    NPC
}