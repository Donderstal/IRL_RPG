import globals, { GRID_BLOCK_PX } from '../game-data/globals';
import { handleActionButton, dismissActiveAction } from './controllers/actionController';
import { CinematicTrigger } from './../enumerables/CinematicTriggerEnum';
import { DirectionEnum } from './../enumerables/DirectionEnum';
import { clearActiveBubbles, handleBubbleButtonPress, handleSelectionKeys, hasActiveBubbles } from './controllers/bubbleController';
import { InteractionType } from '../enumerables/InteractionType';
import type { Sprite } from './core/Sprite';
import { moveSpriteInDirection } from './modules/spriteMovementModule';

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
            moveSpriteInDirection( PLAYER, DirectionEnum.up );
        }
        else if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
            moveSpriteInDirection( PLAYER, DirectionEnum.left );
        }
        else if ( pressedKeys.s || pressedKeys.ArrowDown ) {
            moveSpriteInDirection( PLAYER, DirectionEnum.down );
        }
        else if ( pressedKeys.d || pressedKeys.ArrowRight ) {
            moveSpriteInDirection( PLAYER, DirectionEnum.right );
        }
        const eventTrigger = GAME.story.checkForEventTrigger( CinematicTrigger.position );
        if ( eventTrigger ) return;
        checkForNeighbours( PLAYER );
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
const checkForNeighbours = ( sprite: Sprite ): void => {
    const activeMap = globals.GAME.activeMap;
    const activeGrid = globals.GAME.back.class.grid

    if ( activeMap.outdoors ) {
        if ( activeGrid.x > sprite.centerX && activeMap.neighbours.left ) {
            globals.GAME.switchMap( activeMap.neighbours.left, InteractionType.neighbour )
        }
        if ( activeGrid.x + ( activeGrid.columns * GRID_BLOCK_PX ) < sprite.centerX && activeMap.neighbours.right ) {
            globals.GAME.switchMap( activeMap.neighbours.right, InteractionType.neighbour )
        }
        if ( activeGrid.y > sprite.baseY && activeMap.neighbours.up ) {
            globals.GAME.switchMap( activeMap.neighbours.up, InteractionType.neighbour )
        }
        if ( activeGrid.y + ( activeGrid.rows * GRID_BLOCK_PX ) < sprite.baseY && activeMap.neighbours.down ) {
            globals.GAME.switchMap( activeMap.neighbours.down, InteractionType.neighbour )
        }
    }
};