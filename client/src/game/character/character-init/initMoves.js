const getMovesByClass = require('../character-resources/moves').getMovesByClass 

const initMoves = ( className ) => {
    const movesData = getMovesByClass( className ) 
    const moves = []
    movesData.forEach( ( e ) => {
        moves.push(e)
    } )  

    return moves
}


module.exports = {
    initMoves
}