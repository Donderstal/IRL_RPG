let pressedKeys = {

}

function handleInput ( event ) {
    const booley = ( event.type == 'keyup' )

    console.log(event.type)
    console.log(booley)

    switch (event.key) {
        // fallthrough for movement
        // this switch statement and associated functionalities
        // are still in an experimental phase
        case 'w' : 
        case 'ArrowUp' :
            pressedKeys.up = booley
        case 'ArrowDown' :
        case 's' :        
            pressedKeys.down = booley
        case 'ArrowRight' :
        case 'd' :     
            pressedKeys.right = booley
        case 'a' :
        case 'ArrowLeft' :
            pressedKeys.left = booley
    }
}

function handleMovement(key) {
    if (key === 'up') {

    }
    if (key === 'up') {
        
    }
    if (key === 'up') {
        
    }
    if (key === 'up') {
        
    }
}


module.exports = {
    handleInput
}