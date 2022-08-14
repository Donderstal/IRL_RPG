import globals from '../game-data/globals';
import { handleMovementOfSprite } from './map/map-ui/movement';
import { handleActionButton, dismissActiveAction } from './controllers/actionController';
import { CinematicTrigger } from './../enumerables/CinematicTriggerEnum';
import { DirectionEnum } from './../enumerables/DirectionEnum';
import { clearActiveBubbles, handleBubbleButtonPress, handleSelectionKeys, hasActiveBubbles } from './controllers/bubbleController';

let pressedKeys: { [key in string]: boolean } = {};

export const addKeyToPressed = ( event: KeyboardEvent ): void => {
    pressedKeys[event.key] = true;

    if ( 'preventDefault' in event ) {
        event.preventDefault();
    }

    const GAME = globals.GAME

    if ( event.key === "Tab" ) {
        GAME.MENU.isActive ? GAME.MENU.hide() : GAME.MENU.show();
    }

    if ( event.key === " " && !hasActiveBubbles() ) {
        handleActionButton()
    }
    else if ( event.key === " " && hasActiveBubbles() ) {
        handleBubbleButtonPress();
    }

    if ( event.key === "e" && hasActiveBubbles() ) {
        clearActiveBubbles();
        dismissActiveAction();
    }

    if ( event.key === "1" ) {
        console.log( GAME.PLAYER );
        console.log( GAME.FRONT )
    }

    if ( event.key === "a" || event.key === "ArrowLeft" || event.key === "d" || event.key === "ArrowRight" ) {
        handleSelectionKeys();
    }
};
export const handleMovementKeys = () => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

    if ( PLAYER !== undefined ) {
        if ( pressedKeys.w || pressedKeys.ArrowUp ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.up );
        }
        else if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.left );
        }
        else if ( pressedKeys.s || pressedKeys.ArrowDown ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.down );
        }
        else if ( pressedKeys.d || pressedKeys.ArrowRight ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.right );
        }
        GAME.story.checkForEventTrigger( CinematicTrigger.position );
    }
};
export const removeKeyFromPressed = ( event: KeyboardEvent ): void => {
    pressedKeys[event.key] = false
};
export const clearPressedKeys = (): void => {
    Object.keys( pressedKeys ).forEach( ( key ) => {
        pressedKeys[key] = null;
    } )
};
export const stopListenForKeyPress = (): void => {
    window.removeEventListener( 'keydown', addKeyToPressed )
    window.removeEventListener( 'keyup', removeKeyFromPressed )
    globals.GAME.listeningForPress = false;
};
export const listenForKeyPress = (): void => {
    window.addEventListener( 'keydown', addKeyToPressed )
    window.addEventListener( 'keyup', removeKeyFromPressed )
    window.addEventListener( 'mousedown', ( event ) => {
        if ( event.which === 3 ) {
            // clear pressed keys on right click
            clearPressedKeys();
        }
    } )
    globals.GAME.listeningForPress = true;
};