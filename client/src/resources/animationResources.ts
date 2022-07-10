import type { SpriteAnimationModel } from "../models/SpriteAnimationModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel";

const { 
    FACING_DOWN, FACING_LEFT, FACING_UP, FACING_RIGHT, 
    SHEET_COLUMN_ONE, SHEET_COLUMN_TWO,
    SHEET_ROW_BATTLE_FACING_LEFT, SHEET_ROW_BATTLE_FACING_RIGHT,
    MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET
} = require('../game-data/globals');

const animationResources = { 
    "TURN_SINGLE_CIRCLE": [
        { row: FACING_DOWN , column: SHEET_COLUMN_ONE },
        { row: FACING_LEFT , column: SHEET_COLUMN_ONE },
        { row: FACING_UP , column: SHEET_COLUMN_ONE },
        { row: FACING_RIGHT , column: SHEET_COLUMN_ONE },
        { row: FACING_DOWN , column: SHEET_COLUMN_ONE },
        { row: FACING_LEFT , column: SHEET_COLUMN_ONE },
        { row: FACING_UP , column: SHEET_COLUMN_ONE },
        { row: FACING_RIGHT , column: SHEET_COLUMN_ONE }
    ],
    "BACK_AND_FORTH": [
        { row: FACING_DOWN , column: SHEET_COLUMN_ONE },
        { row: FACING_UP , column: SHEET_COLUMN_ONE }
    ],
    "LEFT_AND_RIGHT": [
        { row: FACING_LEFT , column: SHEET_COLUMN_ONE },
        { row: FACING_RIGHT , column: SHEET_COLUMN_ONE }
    ],
    "BACK_AND_FORTH_STEP": [
        { row: FACING_DOWN , column: SHEET_COLUMN_ONE },
        { row: FACING_DOWN , column: SHEET_COLUMN_TWO },
        { row: FACING_UP , column: SHEET_COLUMN_ONE },
        { row: FACING_UP , column: SHEET_COLUMN_TWO },
        { row: FACING_DOWN , column: SHEET_COLUMN_ONE },
        { row: FACING_DOWN , column: SHEET_COLUMN_TWO },
        { row: FACING_UP , column: SHEET_COLUMN_ONE },
        { row: FACING_UP , column: SHEET_COLUMN_TWO }
    ],
    "LEFT_AND_RIGHT_STEP": [
        { row: FACING_LEFT , column: SHEET_COLUMN_ONE },
        { row: FACING_LEFT , column: SHEET_COLUMN_TWO },
        { row: FACING_RIGHT , column: SHEET_COLUMN_ONE },
        { row: FACING_RIGHT , column: SHEET_COLUMN_TWO },
        { row: FACING_LEFT , column: SHEET_COLUMN_ONE },
        { row: FACING_LEFT , column: SHEET_COLUMN_TWO },
        { row: FACING_RIGHT , column: SHEET_COLUMN_ONE },
        { row: FACING_RIGHT , column: SHEET_COLUMN_TWO }
    ],
    "PUNCH_LEFT" : [
        { row: 6, column: 0 },
        { row: 6, column: 0 },
        { row: 4, column: 0 },
        { row: 4, column: 1 },
        { row: 4, column: 0 },
        { row: 6, column: 0 },
        { row: 6, column: 0 },
        { row: 6, column: 0 },
        { row: 4, column: 0 },
        { row: 4, column: 1 }
    ],
    "PUNCH_RIGHT" : [
        { row: 6, column: 1 },
        { row: 6, column: 1 },
        { row: 5, column: 0 },
        { row: 5, column: 1 },
        { row: 5, column: 0 },
        { row: 6, column: 1 },
        { row: 6, column: 1 },
        { row: 6, column: 1 },
        { row: 5, column: 0 },
        { row: 5, column: 1 }
    ],
    "NECKBEARD_HACK_LEFT": [
        { row: 15, column: 2 },
        { row: 15, column: 3 },
        { row: 15, column: 2 },
        { row: 15, column: 3 },
        { row: 15, column: 2 },
        { row: 15, column: 3 }
    ],
    "NECKBEARD_HACK_RIGHT": [
        { row: 13, column: 2 },
        { row: 13, column: 3 },
        { row: 13, column: 2 },
        { row: 13, column: 3 },
        { row: 13, column: 2 },
        { row: 13, column: 3 }
    ],
    "STANDARD_HIT_RIGHT": [
        { row: 5, column: -1 },
        { row: 5, column: 0 },
        { row: 5, column: -1 },
        { row: 5, column: 0 },
        { row: 5, column: -1 },
        { row: 5, column: 0 },
        { row: 5, column: -1 },
        { row: 5, column: 0 }
    ],
    "STANDARD_HIT_LEFT": [
        { row: 4, column: -1 },
        { row: 4, column: 0 },
        { row: 4, column: -1 },
        { row: 4, column: 0 },
        { row: 4, column: -1 },
        { row: 4, column: 0 },
        { row: 4, column: -1 },
        { row: 4, column: 0 },
        { row: 4, column: -1 }
    ],
    "FADE_RIGHT": [
        { row: 5, column: -1 },
        { row: 5, column: 0 },
        { row: 5, column: -1 },
        { row: 5, column: 0 },
        { row: 5, column: -1 },
        { row: 5, column: 0 },
        { row: 5, column: -1 }
    ],
    "FADE_LEFT": [
        { row: 4, column: -1 },
        { row: 4, column: 0 },
        { row: 4, column: -1 },
        { row: 4, column: 0 },
        { row: 4, column: -1 }
    ],
    "BOP_LEFT": [ 
        { row: 8, column: 0 },
        { row: 8, column: 1 },
        { row: 8, column: 2 }
    ],
    "BOP_RIGHT": [
        { row: 9, column: 0 },
        { row: 9, column: 1 },
        { row: 9, column: 2 }
    ],
    "BOP_UP": [
        { row: 10, column: 0 },
        { row: 10, column: 1 },
        { row: 10, column: 2 }
    ],
    "BOP_DOWN": [
        { row: 7, column: 0 },
        { row: 7, column: 1 },
        { row: 7, column: 2 }
    ],
    "BLINK_LEFT": [ 
        { row: 8, column: 3 },
        { row: 8, column: 3 }
    ],
    "BLINK_RIGHT": [
        { row: 9, column: 3 },
        { row: 9, column: 3 }
    ],
    "BLINK_UP": [
        { row: 10, column: 2 },
        { row: 10, column: 2 }
    ],
    "BLINK_DOWN": [
        { row: 7, column: 3 },
        { row: 7, column: 3 }
    ],
    "CAST_RIGHT": [
        { row: 13, column: 0 },
        { row: 13, column: 1 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 1 },
        { row: 13, column: 0 }
    ],
    "CAST_LEFT": [
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 1 },
        { row: 12, column: 0 }
    ],
    "SELECTION_ANIMATION_RIGHT": [
        { row: 13, column: 0 },
        { row: 13, column: 0 },
        { row: 13, column: 1 },
        { row: 13, column: 1 },
        { row: 13, column: 2 },
        { row: 13, column: 2 },
        { row: 13, column: 1 },
        { row: 13, column: 1 }
    ],
    "SELECTION_ANIMATION_LEFT": [
        { row: 12, column: 0 },
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 1 },
        { row: 12, column: 2 },
        { row: 12, column: 2 },
        { row: 12, column: 1 },
        { row: 12, column: 1 },
    ],
    "LIFT": [
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 2 },
        { row: 12, column: 1 },
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 2 },
        { row: 12, column: 1 },
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 2 },
        { row: 12, column: 1 },
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 2 },
        { row: 12, column: 1 }
    ],
    "TALK_LEFT": [
        { row: 11, column: 1 },
        { row: 11, column: 1 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 11, column: 1 },
        { row: 11, column: 1 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 11, column: 1 },
        { row: 8, column: 0 },
        { row: 11, column: 1 },
        { row: 8, column: 0 }
    ],
    "TALK_RIGHT": [
        { row: 11, column: 2 },
        { row: 11, column: 2 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 11, column: 2 },
        { row: 11, column: 2 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 11, column: 2 },
        { row: 9, column: 0 },
        { row: 11, column: 2 },
        { row: 9, column: 0 }
    ],
    "TALK_DOWN": [
        { row: 11, column: 0 },
        { row: 11, column: 0 },
        { row: 7, column: 0 },
        { row: 7, column: 0 },
        { row: 11, column: 0 },
        { row: 11, column: 0 },
        { row: 7, column: 3 },
        { row: 7, column: 3 },
        { row: 11, column: 0 },
        { row: 7, column: 0 },
        { row: 11, column: 0 },
        { row: 7, column: 0 }
    ],
    "TALK_UP": [
        { row: 10, column: 0 },
        { row: 10, column: 0 },
        { row: 10, column: 1 },
        { row: 10, column: 2 },
        { row: 10, column: 0 },
        { row: 10, column: 0 },
        { row: 10, column: 1 },
        { row: 10, column: 2 },
        { row: 10, column: 1 },
        { row: 10, column: 2 },
        { row: 10, column: 1 },
        { row: 10, column: 2 },
    ],
    "BATTLE_BREATHE_LEFT": [
        { row: 4, column: 0 },
        { row: 4, column: 1 },
        { row: 4, column: 2 },
        { row: 4, column: 3 },
        { row: 4, column: 0 },
        { row: 4, column: 1 },
        { row: 4, column: 2 },
        { row: 4, column: 3 }
    ],
    "BATTLE_BREATHE_RIGHT": [
        { row: 5, column: 0 },
        { row: 5, column: 1 },
        { row: 5, column: 2 },
        { row: 5, column: 3 },
        { row: 5, column: 0 },
        { row: 5, column: 1 },
        { row: 5, column: 2 },
        { row: 5, column: 3 }
    ],
    "POWER_UP_LEFT": [
        { row: 8, column: 0 },
        { row: 8, column: 1 },
        { row: 8, column: 2 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 8, column: 3 },
        { row: 8, column: 2 },
        { row: 8, column: 1 },
        { row: 8, column: 0 }
    ],
    "POWER_UP_RIGHT" : [
        { row: 9, column: 0 },
        { row: 9, column: 1 },
        { row: 9, column: 2 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 9, column: 3 },
        { row: 9, column: 2 },
        { row: 9, column: 1 },
        { row: 9, column: 0 }
    ]
}

export const getAnimationByName = ( animationName: string, direction: number = null ): SpriteAnimationModel => {
    if ( animationName in animationResources ) {
        return getAnimationModel( animationName );
    } 
    
    let suffix;
    switch( direction ) {
        case FACING_DOWN: 
            suffix = "_DOWN"
            break;
        case FACING_LEFT:
        case SHEET_ROW_BATTLE_FACING_LEFT:
            suffix = "_LEFT"
            break;
        case FACING_UP: 
            suffix = "_UP"
            break;
        case FACING_RIGHT:
        case SHEET_ROW_BATTLE_FACING_RIGHT:
            suffix = "_RIGHT"
            break;
        default:
            suffix = "_DOWN"
            break;
    }
    if ( animationName + suffix in animationResources ) {
        return getAnimationModel(animationName + suffix);        
    }
    else {
        console.log("Error! Animation not found in animationResources")
        console.log("Animation name: " + animationName + suffix )
        return getAnimationModel( "BOP" + suffix );
    }

}

const getAnimationModel = ( name: string ): SpriteAnimationModel => {
    const dto = animationResources[name];
    const model: SpriteAnimationModel = {
        name: name,
        frames: dto.map( ( e ) => {
            const model: SpriteFrameModel = {
                x: e.column * MAP_SPRITE_WIDTH_IN_SHEET,
                y: e.row * MAP_SPRITE_HEIGHT_IN_SHEET,
                width: MAP_SPRITE_WIDTH_IN_SHEET,
                height: MAP_SPRITE_HEIGHT_IN_SHEET
            }
            return model;
        } )
    }
    return model;
}