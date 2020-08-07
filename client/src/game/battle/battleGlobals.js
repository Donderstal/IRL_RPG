const globals   = require('../../game-data/globals');

// battle phases
const PHASE_BEGIN_TURN              = 0
const PHASE_SELECT_MOVE             = 1
const PHASE_DO_MOVE                 = 2
const PHASE_STAT_CHECK              = 3
const PHASE_END_BATTLE              = 4

// Length of some animations in milliseconds
const BATTLE_INTRO_ANIM_MS          = 2100

// battle spritesheet positions
const B_SHEETPOS_NONE               = -1
const B_SHEETPOS_IDLE               = 0
const B_SHEETPOS_IDLE2              = 1
const B_SHEETPOS_ATTACK             = 2

const SHEET_ROW_BATTLE_LEFT         = 4
const SHEET_ROW_BATTLE_RIGHT        = 5

const BATTLE_UI_CHAR_WIDTH          = globals.CANVAS_WIDTH * .10
const BATTLE_UI_CHAR_HEIGHT         = BATTLE_UI_CHAR_WIDTH * 1.33

const UI_SLOT_Y           = globals.CANVAS_HEIGHT - BATTLE_UI_CHAR_HEIGHT;
const UI_SLOT_X_ARRAY     = [
    globals.CANVAS_WIDTH - ( BATTLE_UI_CHAR_WIDTH * 4 ),
    globals.CANVAS_WIDTH - ( BATTLE_UI_CHAR_WIDTH * 3 ),
    globals.CANVAS_WIDTH - ( BATTLE_UI_CHAR_WIDTH * 2 ),
    globals.CANVAS_WIDTH - ( BATTLE_UI_CHAR_WIDTH * 1 ) 
];

const MAP_SLOT_PLA_1 = {
    'x': (globals.CANVAS_WIDTH * .65) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .35) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const MAP_SLOT_PLA_2 = {
    'x': (globals.CANVAS_WIDTH * .70) - ( globals.STRD_SPRITE_WIDTH * .5 ),
    'y': (globals.CANVAS_HEIGHT * .5) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const MAP_SLOT_PLA_3 = {
    'x': (globals.CANVAS_WIDTH * .60) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .65) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}

const MAP_SLOT_OPP_1 = {
    'x': (globals.CANVAS_WIDTH * .40 - ( globals.STRD_SPRITE_WIDTH  * .5 ) ),
    'y': (globals.CANVAS_HEIGHT * .35) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const MAP_SLOT_OPP_2 = {
    'x': (globals.CANVAS_WIDTH * .30) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .5) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}
const MAP_SLOT_OPP_3 = {
    'x': (globals.CANVAS_WIDTH * .35) - ( globals.STRD_SPRITE_WIDTH  * .5 ),
    'y': (globals.CANVAS_HEIGHT * .65) - ( globals.STRD_SPRITE_HEIGHT * .5 )
}

module.exports = {
    BATTLE_INTRO_ANIM_MS,

    B_SHEETPOS_NONE,
    B_SHEETPOS_IDLE,
    B_SHEETPOS_IDLE2,
    B_SHEETPOS_ATTACK,

    PHASE_BEGIN_TURN,
    PHASE_SELECT_MOVE,
    PHASE_DO_MOVE,
    PHASE_STAT_CHECK,
    PHASE_END_BATTLE,

    SHEET_ROW_BATTLE_LEFT,
    SHEET_ROW_BATTLE_RIGHT,

    BATTLE_UI_CHAR_WIDTH,
    BATTLE_UI_CHAR_HEIGHT,

    UI_SLOT_Y,
    UI_SLOT_X_ARRAY,

    MAP_SLOT_PLA_1,
    MAP_SLOT_PLA_2,
    MAP_SLOT_PLA_3,
    MAP_SLOT_OPP_1,
    MAP_SLOT_OPP_2,
    MAP_SLOT_OPP_3
}