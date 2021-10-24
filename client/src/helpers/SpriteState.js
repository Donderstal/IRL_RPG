const { STATE_IDLE } = require("../game-data/globals");

class SpriteState {
    constructor( value = STATE_IDLE ) {
        this.innerValue = value;
    }

    is( value ) {
        return this.innerValue === value;
    }

    set( newValue ) {
        this.innerValue = newValue
    }
}

module.exports = {
    SpriteState
}