import { handleActionButton, registerActionSelection } from './controllers/actionController';
import { DirectionEnum } from './../enumerables/DirectionEnum';
import { clearActiveEmotes, destroyElevatorBubble, displayFullText, getElevatorBubble, getMainTextBubble, handleSelectionKeys, hasActiveSpeechBubbles, hasActiveSelectionBubble, isWriting, selectionBubble } from './controllers/bubbleController';
import { moveSpriteInDirection } from './modules/destinations/destinationHandler';
import { PLAYER_ID } from '../game-data/interactionGlobals';
import { registerPlayerAnswer } from './controllers/cinematicController';
import { getPlayer } from "./modules/sprites/spriteGetter";;
import { resetIdleAnimationCounter } from './modules/idleAnimCounters/idleAnimHandler';
import { destroySpriteAnimation } from './modules/animations/animationSetter';
import { spriteHasAnimation } from './modules/animations/animationGetter';
import { spriteNextPositionIsBlocked } from './map/collision';
import { clearSpeakingEffect, playEffect } from './sound/sound';
import { getMenuGrid } from './canvas/canvasGetter';
import { checkForEventTrigger } from './storyEvents/storyEventHandler';
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { setListeningForKeysGameState } from './gameState/gameState';
import { switchMap } from '../helpers/loadMapHelpers';
import { PlayerMapEntry } from '../enumerables/PlayerMapEntryEnum';
import { screenTextIsActive, handleScreenTextActionButton } from '../helpers/screenTextModule';

let pressedKeys: { [key in string]: boolean } = {};

export const addKeyToPressed = ( event: KeyboardEvent ): void => {
    pressedKeys[event.key] = true;

    if ( 'preventDefault' in event ) {
        event.preventDefault();
    }

    if ( hasActiveSelectionBubble() ) {
        handleSelectionBubbleControls( event.key );
        return;
    }

    if ( event.key === "Tab" ) {
        const menu = getMenuGrid();
        menu.isActive ? menu.hide() : menu.show();
    }

    if ( event.key === " " && !hasActiveSpeechBubbles() ) {
        handleActionButton()
    }
    else if ( event.key === " " && hasActiveSpeechBubbles() ) {
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

    if ( event.key === " " && screenTextIsActive() ) {
        handleScreenTextActionButton()
    }

    if ( event.key === "a" || event.key === "ArrowLeft" || event.key === "d" || event.key === "ArrowRight" ) {
        handleSelectionKeys();
    }
};
const handleSelectionBubbleControls = ( eventKey: string ): void => {
    const bubble = getElevatorBubble();
    if ( eventKey === "w" || eventKey === "ArrowUp" || eventKey === "s" || eventKey === "ArrowDown" ) {
        bubble.handleArrowButtons( ( eventKey === "w" || eventKey === "ArrowUp" ) ? DirectionEnum.up : DirectionEnum.down )
    }
    if ( eventKey === " " ) {
        const elevatorId = bubble.id;
        const result = bubble.handleSelectionButton();
        destroyElevatorBubble();
        if ( result !== undefined ) {
            switchMap( result, PlayerMapEntry.elevator, elevatorId );
            playEffect( "misc/menu-select.mp3" );
        }
    }
}
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
            if ( !spriteNextPositionIsBlocked( player, null, direction ) ) {
                moveSpriteInDirection( player, direction );
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
    setListeningForKeysGameState( false );
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
    setListeningForKeysGameState( true );
};