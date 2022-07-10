import { initGraphicEffectModel } from "../helpers/modelFactory";
import type { GraphicEffectModel } from "../models/GraphicEffectModel";

const folder = "/static/effects/";

const effectsResources = {
    "STAR" : {
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
    "FIRE_CIRCLE_BACK" : {
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
    "FIRE_CIRCLE_FRONT" : {
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
    "BLUE_SQUARE" : {
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
    "PURPLE_CROSS" : {
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
/**
 * Get the object at given key in the inner effectsResources object
 * If key cannot be found, throw an error
 * @param {String} name 
 */
export const getEffectData = ( name ): GraphicEffectModel => {
    if ( name in effectsResources ) {
        return initGraphicEffectModel( effectsResources[name] );
    }
}