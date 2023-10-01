import { DirectionEnum } from "../enumerables/DirectionEnum";
import { PLAYER_ID } from "../game-data/interactionGlobals";
import { getMenuGrid } from "../game/canvas/canvasGetter";
import { hasActiveSelectionBubble, hasActiveSpeechBubbles } from "../game/controllers/bubbleController";
import { handleMenuBubbleActionButton, handleMenuBubbleSelectionButton, handleSelectionKeys, handleTextBubbleActionButton } from "../game/controllers/bubbleActionController";
import type { Sprite } from "../game/core/Sprite";
import { spriteNextPositionIsBlocked } from "../game/map/collision";
import { spriteHasAnimation } from "../game/modules/animations/animationGetter";
import { destroySpriteAnimation } from "../game/modules/animations/animationSetter";
import { moveSpriteInDirection } from "../game/modules/destinations/destinationHandler";
import { resetIdleAnimationCounter } from "../game/modules/idleAnimCounters/idleAnimHandler";
import { getPlayer } from "../game/modules/sprites/spriteGetter";
import { handleScreenTextActionButton, screenTextIsActive } from "../helpers/screenTextModule";
import { actionButtonKey, menuButtonKey, returnButtonKey } from "./controlConstants";
import { getActiveControls } from "./controlTranslator";
import { getAssociatedHitbox } from "../game/modules/hitboxes/hitboxGetter";
import { checkForEventTriggers } from "../event-triggers/triggerHandler";
import { TriggerType } from "../enumerables/TriggerType";
import { getGameControlState } from "../state/state";
import { ControlState } from "../enumerables/ControlState";

let actionButtonWasPressedLastFrame = false;
let menuButtonWasPressedLastFrame = false;
let returnButtonWasPressedLastFrame = false;

export const handleControls = (): void => {
    const activeControls = getActiveControls();
    const controlState = getGameControlState()
    switch ( controlState ) {
        case ControlState.cinematic:
            handleCinematicControls( activeControls );
            break;
        case ControlState.menu:
            handleMenuControls( activeControls );
            break;
        case ControlState.open_world:
            handleOpenWorldControls( activeControls );
            break;
        case ControlState.website:
            handleWebsiteControls( activeControls );
            break;
    }

    actionButtonWasPressedLastFrame = activeControls.includes( actionButtonKey );
    menuButtonWasPressedLastFrame = activeControls.includes( menuButtonKey );
    returnButtonWasPressedLastFrame = activeControls.includes( returnButtonKey );
}

export const handleWebsiteControls = ( activeControls: any[] ): void => {
    if ( activeControls.includes( actionButtonKey ) && !actionButtonWasPressedLastFrame ) {
        console.log( 'action/return in website' );
    }
    if ( activeControls.includes( returnButtonKey ) && !returnButtonWasPressedLastFrame ) {
        console.log( 'action/return in website' );
    }
    if ( activeControls.includes( DirectionEnum.left ) ) {
        console.log( 'left in website' )
    }
    if ( activeControls.includes( DirectionEnum.up ) ) {
        console.log( 'up in website' )
    }
    if ( activeControls.includes( DirectionEnum.right ) ) {
        console.log( 'right in website' )
    }
    if ( activeControls.includes( DirectionEnum.down ) ) {
        console.log( 'down in website' )
    }
}
export const handleOpenWorldControls = ( activeControls: any[] ): void => {
    if ( activeControls.includes( menuButtonKey ) && !menuButtonWasPressedLastFrame ) {
        getMenuGrid().show();
    }
    if ( activeControls.includes( actionButtonKey ) && !actionButtonWasPressedLastFrame ) {
        const playerHitbox = getAssociatedHitbox( PLAYER_ID );
        checkForEventTriggers( TriggerType.interaction, playerHitbox );
    }
    if ( activeControls.includes( DirectionEnum.left ) ) {
        movePlayer( DirectionEnum.left );
        return;
    }
    if ( activeControls.includes( DirectionEnum.up ) ) {
        movePlayer( DirectionEnum.up );
        return;
    }
    if ( activeControls.includes( DirectionEnum.right ) ) {
        movePlayer( DirectionEnum.right );
        return;
    }
    if ( activeControls.includes( DirectionEnum.down ) ) {
        movePlayer( DirectionEnum.down );
        return;
    }
}
export const handleCinematicControls = ( activeControls: any[] ): void => {
    const activeMenuBubble = hasActiveSelectionBubble();
    const activeTextBubble = hasActiveSpeechBubbles();
    const activeScreenText = screenTextIsActive()

    if ( activeControls.includes( actionButtonKey ) && !actionButtonWasPressedLastFrame ) {
        if ( activeMenuBubble ) {
            handleMenuBubbleActionButton();
        }
        if ( activeTextBubble ) {
            handleTextBubbleActionButton();
        }
        if ( activeScreenText ) {
            handleScreenTextActionButton();
        }
    }
    if ( activeControls.includes( DirectionEnum.left ) ) {
        handleSelectionKeys();
    }
    if ( activeControls.includes( DirectionEnum.up ) ) {
        handleMenuBubbleSelectionButton( DirectionEnum.up );
    }
    if ( activeControls.includes( DirectionEnum.right ) ) {
        handleSelectionKeys();
    }
    if ( activeControls.includes( DirectionEnum.down ) ) {
        handleMenuBubbleSelectionButton( DirectionEnum.down );
    }
}
export const handleMenuControls = ( activeControls: any[] ): void => {
    if ( activeControls.includes( menuButtonKey ) && !menuButtonWasPressedLastFrame ) {
        getMenuGrid().hide();
    }
    if ( activeControls.includes( actionButtonKey ) ) {
        console.log( 'action in menu' );
    }
    if ( activeControls.includes( DirectionEnum.left ) ) {
        console.log( 'left in menu' )
    }
    if ( activeControls.includes( DirectionEnum.up ) ) {
        console.log( 'up in menu' )
    }
    if ( activeControls.includes( DirectionEnum.right ) ) {
        console.log( 'right in menu' )
    }
    if ( activeControls.includes( DirectionEnum.down ) ) {
        console.log( 'down in menu' )
    }
}
const movePlayer = ( direction: DirectionEnum ): void => {
    const player = getPlayer();
    preparePlayerForMovement( player );
    player.setDirection( direction );
    if ( !spriteNextPositionIsBlocked( player, null, direction ) ) {
        moveSpriteInDirection( player, direction );
    }
}
const preparePlayerForMovement = ( player: Sprite ): void => {
    resetIdleAnimationCounter( PLAYER_ID );
    if ( spriteHasAnimation( PLAYER_ID ) ) {
        destroySpriteAnimation( player );
    }
} 