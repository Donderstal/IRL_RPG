const initMoves = ( className ) => {
    let moves = {
        _1_: null,
        _2_: null,
        _3_: null,
        _4_: null
    }
    if ( className ) {
        moves._1_ = "One"
        moves._2_ = "Two" 
        moves._3_ = "Three"
        moves._4_ = "Four"
    }               
}

module.exports = {
    initMoves
}