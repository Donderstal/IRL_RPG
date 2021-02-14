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
    { 'direction': 6,'position': 0 },
    { 'direction': 6,'position': 0 },
    { 'direction': 6,'position': 0 },
    { 'direction': 6,'position': 0 }
]

const PUNCH_R = [
    { 'direction': 6,'position': 1 },
    { 'direction': 6,'position': 1 },
    { 'direction': 6,'position': 1 },
    { 'direction': 6,'position': 1 }
]

const CHAD_RAGE_L = [
    { 'direction': 1,'position': 1 },
    { 'direction': 1,'position': 3 },
    { 'direction': 1,'position': 1 },
    { 'direction': 1,'position': 3 },
    { 'direction': 6,'position': 0 },
    { 'direction': 6,'position': 0 },
    { 'direction': 4,'position': 0 },
    { 'direction': 6,'position': 0 },
];

const CHAD_RAGE_R = [
    { 'direction': 2,'position': 1 },
    { 'direction': 2,'position': 3 },
    { 'direction': 2,'position': 1 },
    { 'direction': 2,'position': 3 },
    { 'direction': 6,'position': 1 },
    { 'direction': 6,'position': 1 },
    { 'direction': 5,'position': 0 },
    { 'direction': 6,'position': 1 },
]

const NECKBEARD_HACK_L = [
    { 'direction': 9,'position': 0 },
    { 'direction': 9,'position': 1 },
    { 'direction': 9,'position': 2 },
    { 'direction': 9,'position': 3 },
    { 'direction': 10,'position': 0 },
    { 'direction': 10,'position': 1 },
    { 'direction': 10,'position': 2 },
    { 'direction': 10,'position': 3 },
    { 'direction': 10,'position': 2 },
    { 'direction': 10,'position': 3 },
    { 'direction': 10,'position': 2 },
    { 'direction': 10,'position': 3 }
]

const NECKBEARD_HACK_R = [
    { 'direction': 7,'position': 0 },
    { 'direction': 7,'position': 1 },
    { 'direction': 7,'position': 2 },
    { 'direction': 7,'position': 3 },
    { 'direction': 8,'position': 0 },
    { 'direction': 8,'position': 1 },
    { 'direction': 8,'position': 2 },
    { 'direction': 8,'position': 3 },
    { 'direction': 8,'position': 2 },
    { 'direction': 8,'position': 3 },
    { 'direction': 8,'position': 2 },
    { 'direction': 8,'position': 3 }
]

const HIT_L = [
    { 'direction': 5,'position': -1 },
    { 'direction': 5,'position': 0 },
    { 'direction': 5,'position': -1 },
    { 'direction': 5,'position': 0 },
    { 'direction': 5,'position': -1 },
    { 'direction': 5,'position': 0 }
]

const HIT_R = [
    { 'direction': 4,'position': -1 },
    { 'direction': 4,'position': 0 },
    { 'direction': 4,'position': -1 },
    { 'direction': 4,'position': 0 },
    { 'direction': 4,'position': -1 },
    { 'direction': 4,'position': 0 }
]

const FADE_L = [
    { 'direction': 5,'position': -1 },
    { 'direction': 5,'position': 0 },
    { 'direction': 5,'position': -1 },
    { 'direction': 5,'position': 0 },
    { 'direction': 5,'position': -1 }
]

const FADE_R = [
    { 'direction': 4,'position': -1 },
    { 'direction': 4,'position': 0 },
    { 'direction': 4,'position': -1 },
    { 'direction': 4,'position': 0 },
    { 'direction': 4,'position': -1 }
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