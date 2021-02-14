const MapSprite     = require('./MapSprite').MapSprite
const MapAction     = require('./MapAction').MapAction
const globals       = require('../../../game-data/globals')

class NPC extends MapSprite {
    constructor( tile ) {
        const hasAction = ( tile.spriteData.action !== undefined );
        let src = '/static/sprites/'+ tile.spriteData.sprite;
        super( tile, "STRD", src )   
        
        this.type = tile.spriteData.type
        this.name = tile.spriteData.name

        if ( hasAction ) {
            this.hitbox = new MapAction( this.centerX( ), this.y, tile.spriteData.action, tile.spriteData.name );
            this.action = tile.spriteData.action
            this.action.name = this.name
        }

        if ( tile.spriteData.type == "walking" || tile.spriteData.type == "flying" ) {
            this.path = tile.spriteData.path
            this.lastPosition = tile.spriteData.lastPosition
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
                console.log('animate NPC!')               
            }
        }
        else {
            if ( !this.pathIsBlocked ) {
                this.goToDestination( );     
            }
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
}

module.exports = {
    NPC
}