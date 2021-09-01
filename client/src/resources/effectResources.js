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
        "widthInBlocks": 2.875,
        "heightInBlocks": 2.3125,
        "frameWidth": 184,
        "frameHeight": 148,
        "frames": [
            { 'x': 0, 'y': 0 },
            { 'x': 184, 'y': 0 },
            { 'x': 0, 'y': 148 },
            { 'x': 184, 'y': 148 },
            { 'x': 0, 'y': 296 },
            { 'x': 184, 'y': 296 },
            { 'x': 0, 'y': 444 },
            { 'x': 184, 'y': 444 },
            { 'x': 0, 'y': 592 },
            { 'x': 184, 'y': 592 },
        ]
    },
}
/**
 * Get the object at given key in the inner effectsResources object
 * If key cannot be found, throw an error
 * @param {String} name 
 */
const getEffectData = ( name ) => {
    try {
        name in effectsResources;
    } catch (error) {
        throw(error)
    }
    return effectsResources[name]
}

module.exports = {
    getEffectData
}