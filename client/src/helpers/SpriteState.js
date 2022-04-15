const { STATE_IDLE, STATE_BLOCKED, STATE_WAITING, STATE_MOVING } = require("../game-data/globals");

class SpriteState {
    constructor( value = STATE_IDLE ) {
        this.innerValue = value;
        this.inAnimation = false;
        this.storedState = false;
        this.storedDestination = false;
        this.storedAnimationPosition = false;
        this.pendingStateChanges = [];
    }

    is( value ) {
        return this.innerValue === value;
    }

    set( newValue ) {
        this.innerValue = newValue
    }

    animationOn( sprite ) {
        this.storedAnimationPosition = { 
            'position': sprite.sheetPosition,
            'direction': sprite.direction
        }
        this.inAnimation = true;
    }

    animationOff( sprite ) {
        this.inAnimation = false;
        sprite.sheetPosition = this.storedAnimationPosition['position'] != undefined 
            ? this.storedAnimationPosition['position'] 
            : sprite.sheetPosition;
        sprite.direction = this.storedAnimationPosition['direction'] != undefined 
            ? this.storedAnimationPosition['direction'] 
            : sprite.direction;
        this.storedAnimationPosition = false;
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

    clearPendingStateChanges( ) {
        this.pendingStateChanges = [];
    }

    addToPendingStateChanges( state ) {
        this.pendingStateChanges.push( state );
    }

    decideStateFromPendingStateChanges( ) {
        if ( this.pendingStateChanges.indexOf(STATE_BLOCKED) > -1 ) {
            this.set(STATE_BLOCKED);
        }
        else if ( this.pendingStateChanges.indexOf(STATE_WAITING) > -1 ) {
            this.set(STATE_WAITING);
        }
        else if ( this.pendingStateChanges.indexOf(STATE_MOVING) > -1 ) {
            this.set(STATE_MOVING);
        }
        else if ( this.pendingStateChanges.indexOf(STATE_IDLE) > -1 ) {
            this.set(STATE_IDLE);
        }
        this.clearPendingStateChanges( );
    }
}

module.exports = {
    SpriteState
}