const globals = require('../game-data/globals');

const TURN_SINGLE_CIRCLE = [
    { "direction": globals.FACING_DOWN , "position": globals.STATIC1 },
    { "direction": globals.FACING_LEFT , "position": globals.STATIC1 },
    { "direction": globals.FACING_UP , "position": globals.STATIC1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STATIC1 },
]

const BACK_AND_FORTH_HOR = [
    { "direction": globals.FACING_DOWN , "position": globals.STATIC1 },
    { "direction": globals.FACING_UP , "position": globals.STATIC1 }
]

const BACK_AND_FORTH_VER = [
    { "direction": globals.FACING_LEFT , "position": globals.STATIC1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STATIC1 }
]

const getAnimation = ( animationName ) => {
    
}

module.exports = {
    TURN_SINGLE_CIRCLE
}