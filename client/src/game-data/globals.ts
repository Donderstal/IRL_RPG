import type { Game } from "../game/Game";
import { mobileAgent } from "../helpers/screenOrientation";

export const GRID_BLOCK_IN_SHEET_PX        = 64
export const CANVAS_COLUMNS                = 24
export const CANVAS_ROWS                   = 16

const getBasePixelBlockSize = ( ) => {
    let blockSize = Math.ceil(
        mobileAgent
        ? (screen.width > screen.height ? screen.height : screen.width) / 8
        : screen.width / CANVAS_COLUMNS      
    );
    if ( blockSize > GRID_BLOCK_IN_SHEET_PX ) {
        blockSize = GRID_BLOCK_IN_SHEET_PX;
    }
    return blockSize;
}

// animation frame limit
export const FRAME_LIMIT                   = 8
export const FRAMES_PER_SECOND             = 60

// dynamic measurements for canvas
export const GRID_BLOCK_PX                 = getBasePixelBlockSize()
export const MOVEMENT_SPEED                = GRID_BLOCK_PX / ( 60 / 8 )

export const CANVAS_WIDTH                  = GRID_BLOCK_PX * (CANVAS_COLUMNS);
export const CANVAS_HEIGHT                 = GRID_BLOCK_PX * (CANVAS_ROWS);

// sheet dimensions
export const MAP_SPRITE_WIDTH_IN_SHEET     = 64
export const MAP_SPRITE_HEIGHT_IN_SHEET    = 112
// speech bubbles 
export const MAX_BUBBLE_WIDTH              = GRID_BLOCK_PX * ( mobileAgent ? 12 : 6 )
export const BUBBLE_INNER_PADDING          = GRID_BLOCK_PX * ( mobileAgent ? .33 : .66 )
export const MAX_BUBBLE_TEXT_WIDTH         = MAX_BUBBLE_WIDTH - ( BUBBLE_INNER_PADDING * 4 );

// canvas font sizes
export const SMALL_FONT_SIZE               = mobileAgent ? GRID_BLOCK_PX / 3 : GRID_BLOCK_PX / 4.5;
export const LARGE_FONT_SIZE               = mobileAgent ? GRID_BLOCK_PX / 2.5 : GRID_BLOCK_PX / 3.5;
export const BATTLE_FONT_SIZE              = mobileAgent ? GRID_BLOCK_PX / 2 : GRID_BLOCK_PX / 2.5;

// in-game textbox color and opacity
export const INNER_TEXTBOX_RGBA            = "rgb(0, 56, 77)";
export const OUTER_TEXTBOX_RGBA            = "rgba(216, 44, 188, 0.66)";

// apparently this is the golden ratio
export const GOLDEN_FONT_RATIO             = 1.618;
export const SMALL_FONT_LINE_HEIGHT        = SMALL_FONT_SIZE * GOLDEN_FONT_RATIO
export const LARGE_FONT_LINE_HEIGHT        = LARGE_FONT_SIZE * GOLDEN_FONT_RATIO
export const BATTLE_FONT_LINE_HEIGHT       = BATTLE_FONT_SIZE * GOLDEN_FONT_RATIO

const setSheetXyValues = ( tilesInSheet ) => {
    let tileX = 0; let tileY = 0;
    let tilesheetXyValues = []

    for ( let i = 0; i <= tilesInSheet; i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        tileX += GRID_BLOCK_IN_SHEET_PX
        if ( i % 4 == 3 ) {
            tileX = 0
            tileY += GRID_BLOCK_IN_SHEET_PX
        }
    }

    return tilesheetXyValues;
}

export const SHEET_XY_VALUES = setSheetXyValues( 10000 );

const PNG_DICTIONARY = {};
const AUDIO_DICTIONARY = {};
let GAME: Game = null;

export default {
    GAME,
    PNG_DICTIONARY,
    AUDIO_DICTIONARY
}