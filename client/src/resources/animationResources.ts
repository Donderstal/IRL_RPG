import { DirectionEnum } from "../enumerables/DirectionEnum";
import type { SpriteAnimationModel } from "../models/SpriteAnimationModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel";

const animationResources = { 
    "TURN_SINGLE_CIRCLE": [
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 3, column: 0 },
        { row: 2, column: 0 },
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 3, column: 0 },
        { row: 2, column: 0 }
    ],
    "BACK_AND_FORTH": [
        { row: 0, column: 0 },
        { row: 3, column: 0 }
    ],
    "LEFT_AND_RIGHT": [
        { row: 1, column: 0 },
        { row: 2, column: 0 }
    ],
    "BACK_AND_FORTH_STEP": [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 3, column: 0 },
        { row: 3, column: 1 },
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 3, column: 0 },
        { row: 3, column: 1 }
    ],
    "LEFT_AND_RIGHT_STEP": [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 0 },
        { row: 2, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 0 },
        { row: 2, column: 1 }
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

export const getAnimationByName = ( animationName: string, width: number, height: number, direction: number = null ): SpriteAnimationModel => {
    if ( animationName in animationResources ) {
        return getAnimationModel( animationName, width, height );
    } 
    
    let suffix;
    switch( direction ) {
        case DirectionEnum.down: 
            suffix = "_DOWN"
            break;
        case DirectionEnum.left:
            suffix = "_LEFT"
            break;
        case DirectionEnum.up: 
            suffix = "_UP"
            break;
        case DirectionEnum.right:
            suffix = "_RIGHT"
            break;
    }
    if ( animationName + suffix in animationResources ) {
        return getAnimationModel( animationName + suffix, width, height );        
    }
    else {
        console.log("Error! Animation not found in animationResources")
        console.log("Animation name: " + animationName + suffix )
        return getAnimationModel( "BOP" + suffix, width, height );
    }

}

const getAnimationModel = ( name: string, width: number, height: number ): SpriteAnimationModel => {
    const dto = animationResources[name];
    const model: SpriteAnimationModel = {
        name: name,
        frames: dto.map( ( e ) => {
            const model: SpriteFrameModel = {
                x: e.column * width,
                y: e.row * height,
                width: width,
                height: height
            }
            return model;
        } )
    }
    return model;
}