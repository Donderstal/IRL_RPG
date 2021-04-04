const { 
    MOVE_PROP_KEY_TYPE, MOVE_TYPE_HEAL, MOVE_TYPE_STAT_UP, MOVE_TYPE_STAT_DOW ,
    MOVE_TYPE_STAT_EFF, MOVE_TYPE_PH_ATTACK, MOVE_TYPE_SP_ATTACK
} = require("../game-data/moveGlobals")

const handleMoveExecution = ( move, moveTarget, performer ) => {
    switch( move[MOVE_PROP_KEY_TYPE] ) {
        case MOVE_TYPE_HEAL:
            break;
        case MOVE_TYPE_STAT_UP:
            break;
        case MOVE_TYPE_STAT_DOW:
            break;
        case MOVE_TYPE_STAT_EFF:
            break;
        case MOVE_TYPE_PH_ATTACK:
            break;
        case MOVE_TYPE_SP_ATTACK:
            break
    }
}

module.exports = { 
    handleMoveExecution
}