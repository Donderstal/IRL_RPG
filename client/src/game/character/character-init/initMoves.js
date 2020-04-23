const getMovesByClass = require('../character-resources/moves').getMovesByClass 

const initMoves = ( className ) => {
    return getMovesByClass(className)   
}


class Move {
    constructor( ) {
        // Name

        // Description

        // Type ??

        // DamageType

        // BaseDamage

        // DoMove()

    }
}

module.exports = {
    initMoves
}