
const getBasePixelBlockSize = ( ) => {
    let blockSize = Math.floor(window.innerHeight / CANVAS_ROWS)
    if ( blockSize > GRID_BLOCK_IN_SHEET_PX ) {
        blockSize = GRID_BLOCK_IN_SHEET_PX;
    } 
    return blockSize;
}

// for use in movement animation
// first row of a spritesheet will always face down
// second row is always left etc...
const FACING_DOWN                   = 0
const FACING_LEFT                   = 1
const FACING_RIGHT                  = 2
const FACING_UP                     = 3

const FACING_DOWN_FLYING            = 7
const FACING_LEFT_FLYING            = 4
const FACING_RIGHT_FLYING           = 5
const FACING_UP_FLYING              = 6

//
const STATIC1                       = 0
const STEP1                         = 1
const STATIC2                       = 2
const STEP2                         = 3

// 'enum' values for NPC sprite animation availability
const NPC_ANIM_TYPE_IDLE            = "IDLE";
const NPC_ANIM_TYPE_SEMI_IDLE       = "SEMI-IDLE";
const NPC_ANIM_TYPE_MOVING          = "MOVING";
const NPC_ANIM_TYPE_MOVING_IN_LOOP  = "MOVING_IN_LOOP";
const NPC_ANIM_TYPE_ANIMATION_LOOP  = "ANIMATION_LOOP";

// 'enum' to handle different movement anims in I_Sprite.drawSprite();
const NPC_MOVE_TYPE_WALKING         = "WALKING";
const NPC_MOVE_TYPE_FLYING          = "FLYING";

// animation frame limit
const FRAME_LIMIT                   = 8
const FRAMES_PER_SECOND             = 60

// dynamic measurements for canvas
const GRID_BLOCK_IN_SHEET_PX        = 64
const CANVAS_COLUMNS                = 24
const CANVAS_ROWS                   = 16
const GRID_BLOCK_PX                 = getBasePixelBlockSize()
const MOVEMENT_SPEED                = GRID_BLOCK_PX / ( 60 / 8 )
const CANVAS_WIDTH                  = GRID_BLOCK_PX * (CANVAS_COLUMNS)
const CANVAS_HEIGHT                 = GRID_BLOCK_PX * (CANVAS_ROWS) 

// sheet dimensions
const MAP_SPRITE_WIDTH_IN_SHEET     = 64
const MAP_SPRITE_HEIGHT_IN_SHEET    = 112
// sprite dimensions
const STRD_SPRITE_WIDTH             = GRID_BLOCK_PX
const STRD_SPRITE_HEIGHT            = STRD_SPRITE_WIDTH * 1.75

// speech bubbles 
const MIN_BUBBLE_WIDTH              = GRID_BLOCK_PX * 5
const MAX_BUBBLE_WIDTH              = GRID_BLOCK_PX * 8

// canvas font sizes
const SMALL_FONT_SIZE               = GRID_BLOCK_PX / 4.5
const LARGE_FONT_SIZE               = GRID_BLOCK_PX / 3.375
const BATTLE_FONT_SIZE              = GRID_BLOCK_PX / 2

// in-game textbox color and opacity
const INNER_TEXTBOX_RGBA            = "rgb(0, 56, 77)";
const OUTER_TEXTBOX_RGBA            = "rgba(216, 44, 188, 0.66)";

// apparently this is the golden ratio
const GOLDEN_FONT_RATIO             = 1.618;
const SMALL_FONT_LINE_HEIGHT        = SMALL_FONT_SIZE * GOLDEN_FONT_RATIO
const LARGE_FONT_LINE_HEIGHT        = LARGE_FONT_SIZE * GOLDEN_FONT_RATIO
const BATTLE_FONT_LINE_HEIGHT       = BATTLE_FONT_SIZE * GOLDEN_FONT_RATIO

// game Class holder and mode strings
let GAME = {};
const BATTLE_MODE = "BATTLE";
const MAP_MODE = "MAP";

const setSheetXyValues = ( tilesInSheet ) => {
    let tileX = 0; let tileY = 0;
    let tilesheetXyValues = []

    for ( var i = 0; i <= tilesInSheet; i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        tileX += GRID_BLOCK_IN_SHEET_PX
        if ( i % 4 == 3 ) {
            tileX = 0
            tileY += GRID_BLOCK_IN_SHEET_PX
        }
    }

    return tilesheetXyValues;
}

const SHEET_XY_VALUES = setSheetXyValues( 10000 );


module.exports = {
    MOVEMENT_SPEED,

    FACING_DOWN,
    FACING_LEFT,
    FACING_RIGHT,
    FACING_UP,

    FACING_DOWN_FLYING,
    FACING_LEFT_FLYING,
    FACING_RIGHT_FLYING,
    FACING_UP_FLYING,

    STATIC1,
    STEP1,
    STATIC2,
    STEP2,

    NPC_ANIM_TYPE_IDLE,
    NPC_ANIM_TYPE_SEMI_IDLE,
    NPC_ANIM_TYPE_MOVING,
    NPC_ANIM_TYPE_MOVING_IN_LOOP,
    NPC_ANIM_TYPE_ANIMATION_LOOP,

    NPC_MOVE_TYPE_WALKING,
    NPC_MOVE_TYPE_FLYING,


    FRAME_LIMIT,
    FRAMES_PER_SECOND,

    GRID_BLOCK_PX,
    GRID_BLOCK_IN_SHEET_PX,

    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    CANVAS_COLUMNS,
    CANVAS_ROWS,

    MAP_SPRITE_WIDTH_IN_SHEET,
    MAP_SPRITE_HEIGHT_IN_SHEET,
    SHEET_XY_VALUES,

    STRD_SPRITE_WIDTH,
    STRD_SPRITE_HEIGHT,

    MIN_BUBBLE_WIDTH,
    MAX_BUBBLE_WIDTH,

    SMALL_FONT_SIZE,
    LARGE_FONT_SIZE,
    BATTLE_FONT_SIZE,

    INNER_TEXTBOX_RGBA,
    OUTER_TEXTBOX_RGBA,

    SMALL_FONT_LINE_HEIGHT,
    LARGE_FONT_LINE_HEIGHT,
    BATTLE_FONT_LINE_HEIGHT,

    BATTLE_MODE,
    MAP_MODE,
    GAME    
}