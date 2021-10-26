const { STATE_IDLE } = require("../game-data/globals");

class SpriteState {
    constructor( value = STATE_IDLE ) {
        this.innerValue = value;
        this.inAnimation = false;
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
}

module.exports = {
    SpriteState
}