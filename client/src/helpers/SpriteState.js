const { STATE_IDLE } = require("../game-data/globals");

class SpriteState {
    constructor( value = STATE_IDLE ) {
        this.innerValue = value;
        this.inAnimation = false;
        this.storedState = false;
        this.storedDestination = false;
    }

    is( value ) {
        return this.innerValue === value;
    }

    set( newValue ) {
        this.innerValue = newValue
    }

    animationOn( ) {
        this.inAnimation = true;
    }

    animationOff( ) {
        this.inAnimation = false;
    }

    cinematicOn( sprite ) {
        this.inCinematic = true;
        this.storeState( );
        if ( sprite.destination != false ) {
            this.storedDestination = { 
                'col': sprite.destination.column, 
                'row': sprite.destination.row,
                'delete': sprite.destination.deleteSprite
            }
        }
        this.set( STATE_IDLE );        
    }

    cinematicOff( sprite ) {
        this.inCinematic = false;
        this.restoreState( );
        if ( this.storedDestination != false ) {
            sprite.setDestination(this.storedDestination, this.storedDestination.delete)
            this.storedDestination = false;
        } 
    }

    storeState( ) {
        this.storedState = this.innerValue;
    }

    restoreState( ) {
        this.innerValue = this.storedState;
        this.storedState = false;
    }
}

module.exports = {
    SpriteState
}