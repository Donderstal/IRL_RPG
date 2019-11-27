const movement = require('../game/map-ui/movement')
const controls = require('../game/map-ui/controls')

const docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Get value of input fiel with ID
const getInputVal = (id) => {
    return document.getElementById(id).value
}   

// Stop animation, movement and listening for pressedKeys
const stopMovementAndKeyListen = () => {
    controls.stopListenForKeyPress()
    movement.stopPlayerMovement()
}

// Start animation, movement and listening for pressedKeys
const startMovementAndKeyListen = () => {
    movement.startPlayerMovement()
    controls.listenForKeyPress()
}

module.exports = {
    docReady,
    getInputVal,
    stopMovementAndKeyListen,
    startMovementAndKeyListen
}
