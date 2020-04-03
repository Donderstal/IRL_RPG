// This file should store all global constants

module.exports = {

    // speed for characters
    MOVEMENT_SPEED : 3.7,

    // for use in movement animation
    // first row of a spritesheet will always face down
    // second row is always left etc...
    FACING_DOWN    : 0,
    FACING_LEFT    : 1,
    FACING_RIGHT   : 2,
    FACING_UP      : 3,

    // animation frame limit
    FRAME_LIMIT    : 12,
    
    GRID_BLOCK_PX  : 54,
    CANVAS_WIDTH   : 1296,
    CANVAS_HEIGHT  : 864,
    CANVAS_COLUMNS : 23,
    CANVAS_ROWS    : 15,

    // sprite dimensions
    STRD_SPRITE_WIDTH : 54,
    STRD_SPRITE_HEIGHT : 81,

    //
    BATTLE_SPRITE_WIDTH : 180,
    BATTLE_SPRITE_HEIGHT : 270,

    // speech bubbles 
    MIN_BUBBLE_WIDTH: 250,
    MAX_BUBBLE_WIDTH: 500,

    // canvas font sizes
    SMALL_FONT_SIZE : 12,
    LARGE_FONT_SIZE : 16,
    FONT_STYLE : 'Times New Roman ',

    // Length of some animations in milliseconds
    BATTLE_INTRO_ANIM_MS : 2100,

    //battle phases
    PHASE_BEGIN_BATTLE  : 0,
    PHASE_SELECT_MOVE   : 1,
    PHASE_DO_MOVE       : 2,
    PHASE_STAT_CHECK    : 3,
    PHASE_CHANGE_TURN   : 4,
    PHASE_END_BATTLE    : 5
}