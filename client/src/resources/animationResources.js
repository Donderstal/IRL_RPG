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

const PUNCH_L = [
    { 'rowInSheet': 6,'columnInSheet': 0 },
    { 'rowInSheet': 6,'columnInSheet': 0 },
    { 'rowInSheet': 6,'columnInSheet': 0 },
    { 'rowInSheet': 6,'columnInSheet': 0 }
]

const PUNCH_R = [
    { 'rowInSheet': 6,'columnInSheet': 1 },
    { 'rowInSheet': 6,'columnInSheet': 1 },
    { 'rowInSheet': 6,'columnInSheet': 1 },
    { 'rowInSheet': 6,'columnInSheet': 1 }
]

const CHAD_RAGE_L = [
    { 'rowInSheet': 1,'columnInSheet': 1 },
    { 'rowInSheet': 1,'columnInSheet': 3 },
    { 'rowInSheet': 1,'columnInSheet': 1 },
    { 'rowInSheet': 1,'columnInSheet': 3 },
    { 'rowInSheet': 6,'columnInSheet': 0 },
    { 'rowInSheet': 6,'columnInSheet': 0 },
    { 'rowInSheet': 4,'columnInSheet': 0 },
    { 'rowInSheet': 6,'columnInSheet': 0 },
];

const CHAD_RAGE_R = [
    { 'rowInSheet': 2,'columnInSheet': 1 },
    { 'rowInSheet': 2,'columnInSheet': 3 },
    { 'rowInSheet': 2,'columnInSheet': 1 },
    { 'rowInSheet': 2,'columnInSheet': 3 },
    { 'rowInSheet': 6,'columnInSheet': 1 },
    { 'rowInSheet': 6,'columnInSheet': 1 },
    { 'rowInSheet': 5,'columnInSheet': 0 },
    { 'rowInSheet': 6,'columnInSheet': 1 },
]

const NECKBEARD_HACK_L = [
    { 'rowInSheet': 9,'columnInSheet': 0 },
    { 'rowInSheet': 9,'columnInSheet': 1 },
    { 'rowInSheet': 9,'columnInSheet': 2 },
    { 'rowInSheet': 9,'columnInSheet': 3 },
    { 'rowInSheet': 10,'columnInSheet': 0 },
    { 'rowInSheet': 10,'columnInSheet': 1 },
    { 'rowInSheet': 10,'columnInSheet': 2 },
    { 'rowInSheet': 10,'columnInSheet': 3 },
    { 'rowInSheet': 10,'columnInSheet': 2 },
    { 'rowInSheet': 10,'columnInSheet': 3 },
    { 'rowInSheet': 10,'columnInSheet': 2 },
    { 'rowInSheet': 10,'columnInSheet': 3 }
]

const NECKBEARD_HACK_R = [
    { 'rowInSheet': 7,'columnInSheet': 0 },
    { 'rowInSheet': 7,'columnInSheet': 1 },
    { 'rowInSheet': 7,'columnInSheet': 2 },
    { 'rowInSheet': 7,'columnInSheet': 3 },
    { 'rowInSheet': 8,'columnInSheet': 0 },
    { 'rowInSheet': 8,'columnInSheet': 1 },
    { 'rowInSheet': 8,'columnInSheet': 2 },
    { 'rowInSheet': 8,'columnInSheet': 3 },
    { 'rowInSheet': 8,'columnInSheet': 2 },
    { 'rowInSheet': 8,'columnInSheet': 3 },
    { 'rowInSheet': 8,'columnInSheet': 2 },
    { 'rowInSheet': 8,'columnInSheet': 3 }
]

const HIT_L = [
    { 'rowInSheet': 5,'columnInSheet': -1 },
    { 'rowInSheet': 5,'columnInSheet': 0 },
    { 'rowInSheet': 5,'columnInSheet': -1 },
    { 'rowInSheet': 5,'columnInSheet': 0 },
    { 'rowInSheet': 5,'columnInSheet': -1 },
    { 'rowInSheet': 5,'columnInSheet': 0 }
]

const HIT_R = [
    { 'rowInSheet': 4,'columnInSheet': -1 },
    { 'rowInSheet': 4,'columnInSheet': 0 },
    { 'rowInSheet': 4,'columnInSheet': -1 },
    { 'rowInSheet': 4,'columnInSheet': 0 },
    { 'rowInSheet': 4,'columnInSheet': -1 },
    { 'rowInSheet': 4,'columnInSheet': 0 }
]

const FADE_L = [
    { 'rowInSheet': 5,'columnInSheet': -1 },
    { 'rowInSheet': 5,'columnInSheet': 0 },
    { 'rowInSheet': 5,'columnInSheet': -1 },
    { 'rowInSheet': 5,'columnInSheet': 0 },
    { 'rowInSheet': 5,'columnInSheet': -1 }
]

const FADE_R = [
    { 'rowInSheet': 4,'columnInSheet': -1 },
    { 'rowInSheet': 4,'columnInSheet': 0 },
    { 'rowInSheet': 4,'columnInSheet': -1 },
    { 'rowInSheet': 4,'columnInSheet': 0 },
    { 'rowInSheet': 4,'columnInSheet': -1 }
]

module.exports = {
    TURN_SINGLE_CIRCLE,
    BACK_AND_FORTH,
    LEFT_AND_RIGHT,
    BACK_AND_FORTH_STEP,
    LEFT_AND_RIGHT_STEP,

    CHAD_RAGE_L,
    CHAD_RAGE_R,
    PUNCH_L,
    PUNCH_R,
    NECKBEARD_HACK_L,
    NECKBEARD_HACK_R,

    HIT_L,
    HIT_R,

    FADE_L,
    FADE_R
}