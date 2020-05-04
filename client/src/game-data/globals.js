// This file should store all global constants


const getBasePixelBlockSize = ( ) => {
    const screenWidth = window.screen.width
    if ( screenWidth < 1920 ) {
        return (Math.floor(window.screen.height / 16));
    }
    else if ( screenWidth >= 1920 ) {
        return 54;
    }
}

// for use in movement animation
// first row of a spritesheet will always face down
// second row is always left etc...
const FACING_DOWN                   = 0
const FACING_LEFT                   = 1
const FACING_RIGHT                  = 2
const FACING_UP                     = 3

// animation frame limit
const FRAME_LIMIT                   = 12
const GRID_BLOCK_PX                 = getBasePixelBlockSize()
const MOVEMENT_SPEED                = GRID_BLOCK_PX  / 15
const CANVAS_COLUMNS                = 23
const CANVAS_ROWS                   = 15
const CANVAS_WIDTH                  = GRID_BLOCK_PX * (CANVAS_COLUMNS + 1)
const CANVAS_HEIGHT                 = GRID_BLOCK_PX * (CANVAS_ROWS + 1)

// sheet dimensions
const MAP_SPRITE_WIDTH_IN_SHEET     = 30
const MAP_SPRITE_HEIGHT_IN_SHEET    = 54

// sprite dimensions
const STRD_SPRITE_WIDTH             = GRID_BLOCK_PX
const STRD_SPRITE_HEIGHT            = GRID_BLOCK_PX * 1.5

//
const BATTLE_SPRITE_WIDTH           = 285
const BATTLE_SPRITE_HEIGHT          = 285

// speech bubbles 
const MIN_BUBBLE_WIDTH              = GRID_BLOCK_PX * 4
const MAX_BUBBLE_WIDTH              = GRID_BLOCK_PX * 8

// canvas font sizes
const SMALL_FONT_SIZE               = GRID_BLOCK_PX / 4.5
const LARGE_FONT_SIZE               = GRID_BLOCK_PX / 3.375
const FONT_STYLE                    = 'Times New Roman '

// Length of some animations in milliseconds
const BATTLE_INTRO_ANIM_MS          = 2100

// battle spritesheet positions
const B_SHEETPOS_NONE               = -1
const B_SHEETPOS_IDLE               = 0
const B_SHEETPOS_IDLE2              = 1
const B_SHEETPOS_ATTACK             = 2

// battle phases
const PHASE_BEGIN_TURN              = 0
const PHASE_SELECT_MOVE             = 1
const PHASE_DO_MOVE                 = 2
const PHASE_STAT_CHECK              = 3

module.exports = {
    MOVEMENT_SPEED,

    // for use in movement animation
    // first row of a spritesheet will always face down
    // second row is always left etc...
    FACING_DOWN,
    FACING_LEFT,
    FACING_RIGHT,
    FACING_UP,
    // animation frame limit
    FRAME_LIMIT,
    
    GRID_BLOCK_PX,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    CANVAS_COLUMNS,
    CANVAS_ROWS,

    // sheet dimensions
    MAP_SPRITE_WIDTH_IN_SHEET,
    MAP_SPRITE_HEIGHT_IN_SHEET,

    // sprite dimensions
    STRD_SPRITE_WIDTH,
    STRD_SPRITE_HEIGHT,

    //
    BATTLE_SPRITE_WIDTH,
    BATTLE_SPRITE_HEIGHT,

    // speech bubbles 
    MIN_BUBBLE_WIDTH,
    MAX_BUBBLE_WIDTH,

    // canvas font sizes
    SMALL_FONT_SIZE,
    LARGE_FONT_SIZE,
    FONT_STYLE,

    // Length of some animations in milliseconds
    BATTLE_INTRO_ANIM_MS,

    // battle spritesheet positions
    B_SHEETPOS_NONE,
    B_SHEETPOS_IDLE,
    B_SHEETPOS_IDLE2,
    B_SHEETPOS_ATTACK,

    // battle phases
    PHASE_BEGIN_TURN,
    PHASE_SELECT_MOVE,
    PHASE_DO_MOVE,
    PHASE_STAT_CHECK
}