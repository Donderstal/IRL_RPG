const globals = require('../game-data/globals');

const TURN_SINGLE_CIRCLE = [
    { "direction": globals.FACING_DOWN , "position": globals.STATIC1 },
    { "direction": globals.FACING_LEFT , "position": globals.STATIC1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STATIC1 },
    { "direction": globals.FACING_BOTTOM , "position": globals.STATIC1 }
]

module.exports = {
    TURN_SINGLE_CIRCLE
}