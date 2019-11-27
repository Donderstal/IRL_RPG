const controls = require('./controls')

let pressedKeys = controls.pressedKeys

const handleActionButton = () => {
    if ( pressedKeys.spaceBar ) {
        console.log('lol')
    }
}

module.exports = {
    handleActionButton
}