const getMovesByClass = require('../character-resources/moves').getMovesByClass 

const initMoves = ( className ) => {
    return getMovesByClass(className)
    /* switch( className ) {
        case "Chad":
            return 
        case "Influencer":
            break;
        case "Neckbeard":
            break;
        case "Tumblr_Girl":
            break;
        default:
            throw console.error("Classname " + className + " not found");
    }   */      
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