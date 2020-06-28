const globals = require('../game-data/globals');

const TURN_SINGLE_CIRCLE = [
    { "direction": globals.FACING_DOWN , "position": globals.STATIC1 },
    { "direction": globals.FACING_LEFT , "position": globals.STATIC1 },
    { "direction": globals.FACING_UP , "position": globals.STATIC1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STATIC1 },
]

const BACK_AND_FORTH = [
    { "direction": globals.FACING_DOWN , "position": globals.STATIC1 },
    { "direction": globals.FACING_UP , "position": globals.STATIC1 }
]

const LEFT_AND_RIGHT = [
    { "direction": globals.FACING_LEFT , "position": globals.STATIC1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STATIC1 }
]

const BACK_AND_FORTH_STEP = [
    { "direction": globals.FACING_DOWN , "position": globals.STATIC1 },
    { "direction": globals.FACING_DOWN , "position": globals.STEP1 },
    { "direction": globals.FACING_UP , "position": globals.STATIC1 },
    { "direction": globals.FACING_UP , "position": globals.STEP1 }
]

const LEFT_AND_RIGHT_STEP = [
    { "direction": globals.FACING_LEFT , "position": globals.STATIC1 },
    { "direction": globals.FACING_LEFT , "position": globals.STEP1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STATIC1 },
    { "direction": globals.FACING_RIGHT , "position": globals.STEP1 }
]

module.exports = {
    TURN_SINGLE_CIRCLE,
    BACK_AND_FORTH,
    LEFT_AND_RIGHT,
    BACK_AND_FORTH_STEP,
    LEFT_AND_RIGHT_STEP
}