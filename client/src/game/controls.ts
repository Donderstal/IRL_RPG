import globals from '../game-data/globals';
import { handleActionButton, registerActionSelection } from './controllers/actionController';
import { DirectionEnum } from './../enumerables/DirectionEnum';
import { clearActiveEmotes, displayFullText, getMainTextBubble, handleSelectionKeys, hasActiveBubbles, isWriting, selectionBubble } from './controllers/bubbleController';
import { moveSpriteInDirection } from './modules/destinations/destinationHandler';
import { PLAYER_ID } from '../game-data/interactionGlobals';
import { registerPlayerAnswer } from './controllers/cinematicController';
import { checkForNewTilesToDraw } from "../helpers/dynamicTileDrawer";
import { getPlayer } from "./modules/sprites/spriteGetter";;
import { resetIdleAnimationCounter } from './modules/idleAnimCounters/idleAnimHandler';
import { destroySpriteAnimation } from './modules/animations/animationSetter';
import { spriteHasAnimation } from './modules/animations/animationGetter';
import { spriteNextPositionIsBlocked } from './map/collision';
import { cameraFocus } from './cameraFocus';
import { clearSpeakingEffect } from './sound/sound';
import { getMenuGrid } from './canvas/canvasGetter';
import { checkForEventTrigger } from './storyEvents/storyEventHandler';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';

let pressedKeys: { [key in string]: boolean } = {};

export const addKeyToPressed = ( event: KeyboardEvent ): void => {
    pressedKeys[event.key] = true;

    if ( 'preventDefault' in event ) {
        event.preventDefault();
    }

    if ( event.key === "Tab" ) {
        const menu = getMenuGrid();
        menu.isActive ? menu.hide() : menu.show();
    }

    if ( event.key === " " && !hasActiveBubbles() ) {
        handleActionButton()
    }
    else if ( event.key === " " && hasActiveBubbles() ) {
        if ( isWriting() ) {
            displayFullText()
        }
        else {
            const textBubble = getMainTextBubble();
            if ( selectionBubble() ) {
                registerActionSelection( textBubble.activeButton )
                registerPlayerAnswer( textBubble.activeButton );
            }
            clearActiveEmotes();
            textBubble.markAsRead();
        }
        clearSpeakingEffect();
    }

    if ( event.key === "a" || event.key === "ArrowLeft" || event.key === "d" || event.key === "ArrowRight" ) {
        handleSelectionKeys();
    }
};
export const handleMovementKeys = () => {
    const player = getPlayer();

    if ( player !== undefined ) {
        let direction = null;
        if ( pressedKeys.w || pressedKeys.ArrowUp ) {
            direction = DirectionEnum.up;
        }
        else if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
            direction = DirectionEnum.left;
        }
        else if ( pressedKeys.s || pressedKeys.ArrowDown ) {
            direction = DirectionEnum.down;
        }
        else if ( pressedKeys.d || pressedKeys.ArrowRight ) {
            direction = DirectionEnum.right;
        }

        if ( direction !== null ) {
            preparePlayerForMovement();
            player.setDirection( direction );
            if ( !spriteNextPositionIsBlocked( player ) ) {
                moveSpriteInDirection( player, direction );
            }
            if ( cameraFocus.focusSpriteId == player.spriteId && !cameraFocus.movingToNewFocus ) {
                checkForNewTilesToDraw( cameraFocus );
            }
        }
        checkForEventTrigger( CinematicTrigger.position );
    }
};
export const preparePlayerForMovement = (): void => {
    resetIdleAnimationCounter( PLAYER_ID );
    if ( spriteHasAnimation( PLAYER_ID ) ) {
        const player = getPlayer();
        destroySpriteAnimation( player );
    }
} 
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