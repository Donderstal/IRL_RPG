const GRID_BLOCK_IN_SHEET_PX        = 64
const CANVAS_COLUMNS                = 24
const CANVAS_ROWS                   = 16

const detectMobilePhone = ( ) => {
    if ("maxTouchPoints" in navigator) {
        return navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        return navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            return !!mQ.matches;
        } else if ('orientation' in window) {
            return true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            return (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
}

const DISPLAY_MODE_MOBILE = detectMobilePhone( )

const DISPLAY_MODE_PORTRAIT = window.innerWidth < window.innerHeight;
const DISPLAY_MODE_LANDSCAPE = !DISPLAY_MODE_PORTRAIT;

const getBasePixelBlockSize = ( ) => {
    let blockSize = Math.floor(
        DISPLAY_MODE_MOBILE 
        ? (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) / 8
        : window.innerWidth / CANVAS_COLUMNS      
    );
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
const SHEET_COLUMN_ONE          = 0
const SHEET_COLUMN_TWO          = 1
const SHEET_COLUMN_THREE        = 2
const SHEET_COLUMN_FOUR         = 3

const SHEET_BATTLE_FACING_LEFT         = 4;
const SHEET_BATTLE_FACING_RIGHT        = 5;
const SHEET_BATTLE_PUNCH                    = 6;

// 'enum' values for NPC sprite animation availability
const NPC_ANIM_TYPE_IDLE            = "IDLE";
const NPC_ANIM_TYPE_SEMI_IDLE       = "SEMI-IDLE";
const NPC_ANIM_TYPE_MOVING          = "MOVING";
const NPC_ANIM_TYPE_MOVING_IN_LOOP  = "MOVING_IN_LOOP";
const NPC_ANIM_TYPE_ANIMATION_LOOP  = "ANIMATION_LOOP";

// 'enum' to handle different movement anims in Sprite.drawSprite();
const NPC_MOVE_TYPE_WALKING         = "WALKING";
const NPC_MOVE_TYPE_FLYING          = "FLYING";

const STATE_IDLE                    = "IDLE";
const STATE_WAITING                 = "WAITING";
const STATE_BLOCKED                 = "BLOCKED";
const STATE_MOVING                  = "MOVING";
const STATE_PATHFINDING             = "PATHFINDING"
// animation frame limit
const FRAME_LIMIT                   = 8
const FRAMES_PER_SECOND             = 60

// dynamic measurements for canvas
const GRID_BLOCK_PX                 = getBasePixelBlockSize()
const MOVEMENT_SPEED                = GRID_BLOCK_PX / ( 60 / 8 )

const CANVAS_WIDTH                  = GRID_BLOCK_PX * (CANVAS_COLUMNS);
const CANVAS_HEIGHT                 = GRID_BLOCK_PX * (CANVAS_ROWS);

// sheet dimensions
const MAP_SPRITE_WIDTH_IN_SHEET     = 64
const MAP_SPRITE_HEIGHT_IN_SHEET    = 112
// sprite dimensions
const STRD_SPRITE_WIDTH             = GRID_BLOCK_PX
const STRD_SPRITE_HEIGHT            = STRD_SPRITE_WIDTH * 1.75

// speech bubbles 
const MAX_BUBBLE_WIDTH              = GRID_BLOCK_PX * ( DISPLAY_MODE_PORTRAIT ? 8 : 6 )
const BUBBLE_INNER_PADDING          = GRID_BLOCK_PX * ( DISPLAY_MODE_PORTRAIT ? .33 : .66 )
const MAX_BUBBLE_TEXT_WIDTH         = MAX_BUBBLE_WIDTH - ( BUBBLE_INNER_PADDING * 4 );

// canvas font sizes
const SMALL_FONT_SIZE               = DISPLAY_MODE_PORTRAIT ? GRID_BLOCK_PX / 3 : GRID_BLOCK_PX / 4.5;
const LARGE_FONT_SIZE               = DISPLAY_MODE_PORTRAIT ? GRID_BLOCK_PX / 2.5 : GRID_BLOCK_PX / 3.5;
const BATTLE_FONT_SIZE              = DISPLAY_MODE_PORTRAIT ? GRID_BLOCK_PX / 2 : GRID_BLOCK_PX / 2.5;

// in-game textbox color and opacity
const INNER_TEXTBOX_RGBA            = "rgb(0, 56, 77)";
const OUTER_TEXTBOX_RGBA            = "rgba(216, 44, 188, 0.66)";

// apparently this is the golden ratio
const GOLDEN_FONT_RATIO             = 1.618;
const SMALL_FONT_LINE_HEIGHT        = SMALL_FONT_SIZE * GOLDEN_FONT_RATIO
const LARGE_FONT_LINE_HEIGHT        = LARGE_FONT_SIZE * GOLDEN_FONT_RATIO
const BATTLE_FONT_LINE_HEIGHT       = BATTLE_FONT_SIZE * GOLDEN_FONT_RATIO

// Item categories
const ITEM_CATEGORY_WEARABLE = "W";
const ITEM_CATEGORY_KEY = "K";
const ITEM_CATEGORY_MISC = "M";

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

const PNG_DICTIONARY = {};
const AUDIO_DICTIONARY = {};

const OUT_LEFT = "O-L";
const OUT_UP   = "O-T";
const OUT_RIGHT= "O-R";
const OUT_DOWN = "O-D";

let GAME = {};

module.exports = {
    DISPLAY_MODE_PORTRAIT,
    DISPLAY_MODE_LANDSCAPE,
    
    OUT_LEFT,
    OUT_UP,
    OUT_RIGHT,
    OUT_DOWN,
    MOVEMENT_SPEED,

    FACING_DOWN,
    FACING_LEFT,
    FACING_RIGHT,
    FACING_UP,

    FACING_DOWN_FLYING,
    FACING_LEFT_FLYING,
    FACING_RIGHT_FLYING,
    FACING_UP_FLYING,

    SHEET_COLUMN_ONE,
    SHEET_COLUMN_TWO,
    SHEET_COLUMN_THREE,
    SHEET_COLUMN_FOUR,

    NPC_ANIM_TYPE_IDLE,
    NPC_ANIM_TYPE_SEMI_IDLE,
    NPC_ANIM_TYPE_MOVING,
    NPC_ANIM_TYPE_MOVING_IN_LOOP,
    NPC_ANIM_TYPE_ANIMATION_LOOP,

    NPC_MOVE_TYPE_WALKING,
    NPC_MOVE_TYPE_FLYING,

    STATE_IDLE,
    STATE_BLOCKED,
    STATE_WAITING,
    STATE_MOVING,
    STATE_PATHFINDING,

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

    MAX_BUBBLE_WIDTH,
    BUBBLE_INNER_PADDING,
    MAX_BUBBLE_TEXT_WIDTH,

    SMALL_FONT_SIZE,
    LARGE_FONT_SIZE,
    BATTLE_FONT_SIZE,

    INNER_TEXTBOX_RGBA,
    OUTER_TEXTBOX_RGBA,

    SMALL_FONT_LINE_HEIGHT,
    LARGE_FONT_LINE_HEIGHT,
    BATTLE_FONT_LINE_HEIGHT,

    SHEET_BATTLE_FACING_LEFT,
    SHEET_BATTLE_FACING_RIGHT,
    SHEET_BATTLE_PUNCH,

    ITEM_CATEGORY_WEARABLE,
    ITEM_CATEGORY_KEY,
    ITEM_CATEGORY_MISC,

    PNG_DICTIONARY,
    AUDIO_DICTIONARY,

    GAME,
    DISPLAY_MODE_MOBILE
}