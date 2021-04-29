const folder = "/static/effects/";

const effectsResources = {
    "FIRE_CIRCLE_BACK" : {
        "src": folder + "fire_circle.png",
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
    }
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