import { initGraphicEffectModel } from "../factories/modelFactory";
import type { GraphicEffectModel } from "../models/GraphicEffectModel";

const folder = "/static/effects/";

export const FX_STAR = "STAR";
export const FX_FIRE_CIRCLE_BACK = "FIRE_CIRCLE_BACK";
export const FX_FIRE_CIRCLE_FRONT = "FIRE_CIRCLE_FRONT";
export const FX_BLUE_SQUARE = "BLUE_SQUARE";
export const FX_PURPLE_CROSS = "PURPLE_CROSS";

const effectsResources = {
    [FX_STAR] : {
        "src": folder + "star_fx.png",
        "widthInBlocks": 2,
        "heightInBlocks": 2,
        "frameWidth": 192,
        "frameHeight": 192,
        "frames": [
            { 'x': 0, 'y': 0 },
            { 'x': 192, 'y': 0 }
        ]
    },
    [FX_FIRE_CIRCLE_BACK]: {
        "src": folder + "fire_circle.png",
        "widthInBlocks": 2,
        "heightInBlocks": 2,
        "frameWidth": 128,
        "frameHeight": 128,
        "frames": [
            { 'x': 0, 'y': 0 },
            { 'x': 128, 'y': 0 },
            { 'x': 0, 'y': 128 },
            { 'x': 128, 'y': 128 },
            { 'x': 0, 'y': 256 },
            { 'x': 128, 'y': 256 },
            { 'x': 0, 'y': 384 },
            { 'x': 128, 'y': 384 }
        ]
    },
    [FX_FIRE_CIRCLE_FRONT] : {
        "src": folder + "fire_circle.png",
        "widthInBlocks": 2,
        "heightInBlocks": 2,
        "frameWidth": 128,
        "frameHeight": 128,
        "frames": [
            { 'x': 0, 'y': 512 },
            { 'x': 128, 'y': 512 },
            { 'x': 0, 'y': 640 },
            { 'x': 128, 'y': 640 },
            { 'x': 0, 'y': 768 },
            { 'x': 128, 'y': 768 },
            { 'x': 0, 'y': 896 },
            { 'x': 128, 'y': 896 }
        ]
    },
    [FX_BLUE_SQUARE] : {
        "src": folder + "Square_fx.png",
        "widthInBlocks": 4.3125 / 2,
        "heightInBlocks": 3.46875 / 2,
        "frameWidth": 276,
        "frameHeight": 222,
        "frames": [
            { 'x': 0, 'y': 0 },
            { 'x': 276, 'y': 0 },
            { 'x': 0, 'y': 222 },
            { 'x': 276, 'y': 222 },
            { 'x': 0, 'y': 444 },
            { 'x': 276, 'y': 444 },
            { 'x': 0, 'y': 666 },
            { 'x': 276, 'y': 666 },
            { 'x': 0, 'y': 888 },
            { 'x': 276, 'y': 888 },
        ]
    },
    [FX_PURPLE_CROSS] : {
        "src": folder + "cross_fx.png",
        "widthInBlocks": 4.3125 / 2,
        "heightInBlocks": 3.46875 / 2,
        "frameWidth": 276,
        "frameHeight": 222,
        "frames": [
            { 'x': 0, 'y': 0 },
            { 'x': 276, 'y': 0 },
            { 'x': 0, 'y': 222 },
            { 'x': 276, 'y': 222 },
            { 'x': 0, 'y': 444 },
            { 'x': 276, 'y': 444 },
            { 'x': 0, 'y': 666 },
            { 'x': 276, 'y': 666 },
            { 'x': 0, 'y': 888 },
            { 'x': 276, 'y': 888 },
            { 'x': 0, 'y': 1110 },
            { 'x': 276, 'y': 1110 },
        ]
    }
}

export const getEffectData = ( name ): GraphicEffectModel => {
    if ( name in effectsResources ) {
        return initGraphicEffectModel( effectsResources[name] );
    }
}