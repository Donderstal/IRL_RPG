import { DirectionEnum } from "../enumerables/DirectionEnum";
import { ANIM_BACK_AND_FORTH, ANIM_BACK_AND_FORTH_POSITIONAL, ANIM_BACK_AND_FORTH_STEP, ANIM_BACK_AND_FORTH_STEP_POSITIONAL, ANIM_BLINK, ANIM_BOP, ANIM_BREATHE, ANIM_CAST, ANIM_COLLECTABLE_IDLE, ANIM_COLLECTABLE_IDLE_LONG, ANIM_FLAP_WINGS_POSITIONAL, ANIM_HACK, ANIM_LEFT_AND_RIGHT, ANIM_LEFT_AND_RIGHT_STEP, ANIM_LIFT, ANIM_POWER_UP, ANIM_PUNCH, ANIM_SELECTION, ANIM_SIGN_IDLE_HORI, ANIM_SIGN_IDLE_HORI_LONG, ANIM_SIGN_IDLE_VERT, ANIM_SIGN_IDLE_VERT_LONG, ANIM_SPEECH_BUBBLE_TALKING_HEAD_1, ANIM_SPRITE_HIT, ANIM_TALK, ANIM_TURN_CIRCLE, ANIM_TURN_CIRCLE_POSITIONAL, DIRECTIONAL_ANIMS, POSITIONAL_ANIMS } from "../game-data/animationGlobals";
import { getOppositeDirection } from "../helpers/utilFunctions";
import type { SpriteAnimationModel } from "../models/SpriteAnimationModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel";

type SheetFrame = {
    row: number,
    column: number
}

const getAnimationFrames = ( animationKey: string, direction: DirectionEnum ): SheetFrame[] => {
    let isDirectional = DIRECTIONAL_ANIMS.filter( ( e ) => {
        return e === animationKey
    } ).length > 0;
    let isPositional = POSITIONAL_ANIMS.filter( ( e ) => {
        return e === animationKey
    } ).length > 0;
    if ( isDirectional ) {
        return getDirectionalAnimation( animationKey, direction );
    }
    if ( isPositional ) {
        return getPositionalAnimation( animationKey, direction );
    }
    return animationResources[animationKey];
}

const getDirectionalAnimation = ( animationKey: string, direction: DirectionEnum ): SheetFrame[] => {
    switch ( animationKey ) {
        case ANIM_PUNCH:
        case ANIM_SPRITE_HIT:
        case ANIM_BREATHE:
            return getBattleAnimation( animationKey, direction );
        case ANIM_SELECTION:
        case ANIM_CAST:
            return getCheeringAnimation( animationKey, direction );
        case ANIM_POWER_UP:
            return getPowerUpAnimation( direction )
        case ANIM_BOP:
        case ANIM_BLINK:
            return getIdleAnimation( animationKey, direction );
        case ANIM_TALK:
            return getTalkingAnimation(direction);
        case ANIM_HACK:
            return getHackAnimation( direction );
    }
}

const getPositionalAnimation = ( animationKey: string, direction: DirectionEnum ): { row: number, column: number }[] => {
    switch ( animationKey ) {
        case ANIM_TURN_CIRCLE_POSITIONAL:
            return getTurnCircleAnimation( direction );
        case ANIM_BACK_AND_FORTH_POSITIONAL:
            return getTurnAnimation( direction );
        case ANIM_BACK_AND_FORTH_STEP_POSITIONAL:
            return getTurnStepAnimation( direction );
        case ANIM_FLAP_WINGS_POSITIONAL:
            return getFlapWingsAnimation( direction );
    }
}

const getTurnCircleAnimation = ( direction: DirectionEnum ): { row: number, column: number }[] => {
    const standardOrder = [0, 1, 3, 2];
    const length = standardOrder.length
    const startIndex = standardOrder.indexOf( direction );
    const order = [standardOrder[startIndex], ...standardOrder.slice( startIndex, length ), ...standardOrder.slice( 0, startIndex )]
    return order.map( ( e ) => { return {row: e, column: 0} })
}

const getTurnAnimation = ( direction: DirectionEnum ): { row: number, column: number }[] => {
    const opposite = getOppositeDirection( direction );
    return [
        { row: opposite, column: 0 },
        { row: direction, column: 0 }
    ]
}

const getTurnStepAnimation = ( direction: DirectionEnum ): { row: number, column: number }[] => {
    const opposite = getOppositeDirection( direction );
    return [
        { row: opposite, column: 0 },
        { row: opposite, column: 1 },
        { row: direction, column: 0 },
        { row: direction, column: 1 }
    ]
}

const getFlapWingsAnimation = ( direction: DirectionEnum ): { row: number, column: number }[] => {
    const frameRow = direction === 0 ? 7 : direction === 1 ? 4 : direction === 2 ? 5 : 6;
    return [
        { row: frameRow, column: 0 },
        { row: frameRow, column: 1 },
        { row: frameRow, column: 0 },
        { row: frameRow, column: 1 }
    ]
}

const getBattleAnimation = ( animationKey: string, direction: DirectionEnum ): { row: number, column: number }[] => {
    const frameRow = direction === DirectionEnum.left ? 4 : 5;
    const frameColumn = direction === DirectionEnum.left ? 0 : 1;
    if ( animationKey === ANIM_PUNCH ) {
        return [
            { row: 6, column: frameColumn },
            { row: 6, column: frameColumn },
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 0 },
            { row: 6, column: frameColumn },
            { row: 6, column: frameColumn },
            { row: 6, column: frameColumn },
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 }
        ];
    }
    if ( animationKey === ANIM_SPRITE_HIT ) {
        return [
            { row: frameRow, column: -1 },
            { row: frameRow, column: 0 },
            { row: frameRow, column: -1 },
            { row: frameRow, column: 0 },
            { row: frameRow, column: -1 },
            { row: frameRow, column: 0 },
            { row: frameRow, column: -1 },
            { row: frameRow, column: 0 }
        ]
    }
    if ( animationKey === ANIM_BREATHE ) {
        return [
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 3 },
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 3 }
        ]
    }
}

const getCheeringAnimation = ( animationKey: string, direction: DirectionEnum ): { row: number, column: number }[] => {
    const frameRow = direction === DirectionEnum.left ? 14 : 15;
    if ( animationKey === ANIM_CAST ) {
        return [
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 0 }
        ];
    }
    if ( animationKey === ANIM_SELECTION ) {
        return [
            { row: frameRow, column: 0 },
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 2 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 1 },
        ]
    }
}

const getPowerUpAnimation = ( direction: DirectionEnum ): { row: number, column: number }[] => {
    const frameRow = direction === DirectionEnum.left ? 8 : 9;
    return [
        { row: frameRow, column: 0 },
        { row: frameRow, column: 1 },
        { row: frameRow, column: 2 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 2 },
        { row: frameRow, column: 1 },
        { row: frameRow, column: 0 }
    ]
}

const getTalkingAnimation = ( direction: DirectionEnum ): { row: number, column: number }[] => {
    let frameRow = direction === DirectionEnum.left ? 8 : 9;
    let frameCol = direction === DirectionEnum.left ? 1 : 2;
    if ( direction === DirectionEnum.up ) {
        return [
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
        ];
    }
    if ( direction === DirectionEnum.down ) {
        return [
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
        ];
    }
    return [
        { row: 11, column: frameCol },
        { row: 11, column: frameCol },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: 11, column: frameCol },
        { row: 11, column: frameCol },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 3 },
        { row: 11, column: frameCol },
        { row: frameRow, column: 0 },
        { row: 11, column: frameCol },
        { row: frameRow, column: 0 }
    ];
}

const getIdleAnimation = ( animationKey: string, direction: DirectionEnum ): { row: number, column: number }[] => {
    const frameRow = direction === DirectionEnum.down
        ? 7 : direction === DirectionEnum.left
            ? 8 : direction === DirectionEnum.right ? 9 : 10;
    if ( animationKey === ANIM_BOP ) {
        return [
            { row: frameRow, column: 0 },
            { row: frameRow, column: 1 },
            { row: frameRow, column: 2 }
        ];
    }
    if ( animationKey === ANIM_BLINK ) {
        return [
            { row: frameRow, column: direction === DirectionEnum.up ? 2 : 3 },
            { row: frameRow, column: direction === DirectionEnum.up ? 2 : 3 }
        ];
    }
}

const getHackAnimation = (direction: DirectionEnum ): { row: number, column: number }[] => {
    const frameRow = direction === DirectionEnum.left ? 17 : 15;
    return [
        { row: frameRow, column: 2 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 2 },
        { row: frameRow, column: 3 },
        { row: frameRow, column: 2 },
        { row: frameRow, column: 3 }
    ];
}

const animationResources = { 
    [ANIM_TURN_CIRCLE]: [
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 3, column: 0 },
        { row: 2, column: 0 }
    ],
    [ANIM_BACK_AND_FORTH]: [
        { row: 0, column: 0 },
        { row: 3, column: 0 }
    ],
    [ANIM_LEFT_AND_RIGHT]: [
        { row: 1, column: 0 },
        { row: 2, column: 0 }
    ],
    [ANIM_BACK_AND_FORTH_STEP]: [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 3, column: 0 },
        { row: 3, column: 1 }
    ],
    [ANIM_LEFT_AND_RIGHT_STEP]: [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 0 },
        { row: 2, column: 1 }
    ],
    [ANIM_LIFT]: [
        { row: 14, column: 0 },
        { row: 14, column: 1 },
        { row: 14, column: 2 },
        { row: 14, column: 1 }
    ],
    [ANIM_SIGN_IDLE_HORI]: [
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 0 },
        { row: 0, column: 1 }
    ],
    [ANIM_SIGN_IDLE_HORI_LONG]: [
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 1 }
    ],
    [ANIM_SIGN_IDLE_VERT]: [
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 0, column: 0 },
        { row: 1, column: 0 }
    ],
    [ANIM_SIGN_IDLE_VERT_LONG]: [
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 0 }
    ],
    [ANIM_COLLECTABLE_IDLE]: [
        { row: 0, column: 1 },
        { row: 0, column: 2 },
        { row: 0, column: 3 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
        { row: 0, column: 3 }
    ],
    [ANIM_COLLECTABLE_IDLE_LONG]: [
        { row: 0, column: 1 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
        { row: 0, column: 2 },
        { row: 0, column: 3 },
        { row: 0, column: 3 }
    ],
    [ANIM_SPEECH_BUBBLE_TALKING_HEAD_1]: [
        { row: 12, column: 0 },
        { row: 12, column: 1 },
        { row: 13, column: 0 },
        { row: 12, column: 1 },
        { row: 13, column: 0 },
        { row: 12, column: 1 },
        { row: 13, column: 1 },
        { row: 13, column: 1 },
        { row: 12, column: 1 },
        { row: 13, column: 0 },
        { row: 12, column: 1 },
        { row: 13, column: 0 },
        { row: 12, column: 1 },
        { row: 12, column: 1 },
    ]
}

export const getAnimationByName = ( animationName: string, width: number, height: number, direction: number, options: { looped: boolean, loops: number } = null ): SpriteAnimationModel => {
    const sheetframeDto = getAnimationFrames( animationName, direction );
    return getAnimationModel( animationName, sheetframeDto, width, height, options );
}

const getAnimationModel = ( key: string, dto: SheetFrame[], width: number, height: number, options: { looped: boolean, loops: number } = null ): SpriteAnimationModel => {
    const model: SpriteAnimationModel = {
        name: key,
        frames: dto.map( ( e ) => {
            const model: SpriteFrameModel = {
                x: e.column * width,
                y: e.row * height,
                width: width,
                height: height
            }
            return model;
        } ),
        looped: options !== null ? options.looped : false,
        loops: options !== null ? options.loops : null,
    }
    return model;
}