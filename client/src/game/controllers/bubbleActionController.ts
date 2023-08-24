import type { DirectionEnum } from "../../enumerables/DirectionEnum";
import { PlayerMapEntry } from "../../enumerables/PlayerMapEntryEnum";
import { switchMap } from "../../helpers/loadMapHelpers";
import { clearSpeakingEffect, playEffect } from "../sound/sound";
import { clearActiveEmotes, destroyElevatorBubble, displayFullText, getElevatorBubble, getMainTextBubble, isWriting, selectionBubble } from "./bubbleController";
import { registerPlayerAnswer } from "./cinematicController";

export const handleMenuBubbleActionButton = (): void => {
    const bubble = getElevatorBubble();
    const elevatorId = bubble.id;
    const result = bubble.handleSelectionButton();
    destroyElevatorBubble();
    if ( result !== undefined ) {
        switchMap( result, PlayerMapEntry.elevator, elevatorId );
        playEffect( "misc/menu-select.mp3" );
    }
}
export const handleMenuBubbleSelectionButton = ( direction: DirectionEnum ): void => {
    const bubble = getElevatorBubble();
    if ( bubble !== undefined ) bubble.handleArrowButtons( direction );
}
export const handleTextBubbleActionButton = (): void => {
    if ( isWriting() ) {
        displayFullText()
    }
    else {
        const textBubble = getMainTextBubble();
        if ( selectionBubble() ) {
            alert( textBubble.activeButton )
            registerPlayerAnswer( textBubble.activeButton );
        }
        clearActiveEmotes();
        textBubble.markAsRead();
    }
    clearSpeakingEffect();
}
export const handleSelectionKeys = (): void => {
    if ( selectionBubble() ) {
        getMainTextBubble().moveCursor();
    }
};