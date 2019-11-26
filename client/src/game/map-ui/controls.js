let pressedKeys

/**
 * EXPORT @function listenForKeyPress
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const listenForKeyPress = () => {
    window.addEventListener('keydown', addKeyToPressed)
    window.addEventListener('keyup', removeKeyFromPressed)
}

/**
 * EXPORT @function stopListenForKeyPress
 * Listen for keypresses
 * and pass them to pressedKeys variable
 */
const stopListenForKeyPress = () => {
    window.removeEventListener('keydown', addKeyToPressed)
    window.removeEventListener('keyup', removeKeyFromPressed)
}

const addKeyToPressed = () => {
    pressedKeys[event.key] = true
}

const removeKeyFromPressed = () => {
    pressedKeys[event.key] = false
}

module.exports = {
    pressedKeys,
    listenForKeyPress,
    stopListenForKeyPress
}