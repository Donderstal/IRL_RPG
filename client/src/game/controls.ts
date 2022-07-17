import globals from '../game-data/globals';
import { handleMapKeyPress } from './map/mapControls';
import { handleMenuKeyPress } from './menuCanvas/menuCanvasControls';

export const addKeyToPressed = ( event: KeyboardEvent ): void => {
    if ( 'preventDefault' in event ) {
        event.preventDefault( );        
    }

    const GAME = globals.GAME

    if ( event.key === "m" ) {
        console.log(globals.AUDIO_DICTIONARY)
    }
    
    if ( event.key === "Tab" ) {
        GAME.MENU.isActive ? GAME.MENU.hide( ) : GAME.MENU.show( );
    }

    if ( !GAME.MENU.isActive && !GAME.inCinematic ) {
        handleMapKeyPress( event )
    }
    else if ( GAME.inCinematic ) {
        if ( event.key === " " ) {
            GAME.speechBubbleController.handleButtonPress();
        }
        else if (event.key === "a" || event.key === "ArrowLeft"||event.key === "d" || event.key === "ArrowRight") {
            GAME.speechBubbleController.handleSelectionKeys( );
        }
    }
    else if ( GAME.MENU.isActive ) {
        handleMenuKeyPress( event );
    }
}

export const removeKeyFromPressed = ( event: KeyboardEvent ): void => {
    globals.GAME.pressedKeys[event.key] = false
}

export const clearPressedKeys = ( pressedKeys: { [key in string]: boolean } ): void => {
    Object.keys( pressedKeys ).forEach( (key) => {
        pressedKeys[key] = null;
    })
}

export const stopListenForKeyPress = (): void => {
    window.removeEventListener( 'keydown', addKeyToPressed )
    window.removeEventListener( 'keyup', removeKeyFromPressed )
    globals.GAME.listeningForPress = false;
}


export const listenForKeyPress = (): void => {
    window.addEventListener( 'keydown', addKeyToPressed )
    window.addEventListener( 'keyup', removeKeyFromPressed )
    window.addEventListener( 'mousedown', ( event ) => {
        if ( event.which === 3 ) {
            // clear pressed keys on right click
            clearPressedKeys( globals.GAME.pressedKeys );
        }
    } )
    globals.GAME.listeningForPress = true;
}