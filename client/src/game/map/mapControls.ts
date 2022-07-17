import { handleMovementOfSprite } from './map-ui/movement';
import { handleActionButton } from './map-ui/actionController';
import globals from '../../game-data/globals';
import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import { DirectionEnum } from '../../enumerables/DirectionEnum';

export const handleMapKeyPress = ( event: KeyboardEvent ) => {
    const GAME = globals.GAME;

    if ( event.key === " " ) {
        handleActionButton( )        
    }
    else if ( event.key === "e" && GAME.bubbleIsActive ) {
        GAME.activeBubble = null;
        GAME.bubbleIsActive = false
        GAME.activeAction = null;
    }
    else if ( event.key === "1" ) {
        console.log(GAME.PLAYER);
        console.log(GAME.FRONT)
    }
    else if ( !GAME.cinematicMode ) {
        GAME.pressedKeys[event.key] = true        
    }
}

export const handleMovementKeys = () => {
    const GAME = globals.GAME;
    const PLAYER = GAME.PLAYER;

    if ( PLAYER !== undefined ) {
        if ( GAME.pressedKeys.w || GAME.pressedKeys.ArrowUp ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.up );
        }
        else if ( GAME.pressedKeys.a || GAME.pressedKeys.ArrowLeft ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.left );
        }
        else if ( GAME.pressedKeys.s || GAME.pressedKeys.ArrowDown ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.down );
        }
        else if ( GAME.pressedKeys.d || GAME.pressedKeys.ArrowRight ) {
            handleMovementOfSprite( PLAYER, DirectionEnum.right );
        }
        GAME.story.checkForEventTrigger( CinematicTrigger.position );
    }
}