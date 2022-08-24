import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import globals, { BATTLE_FONT_LINE_HEIGHT, CANVAS_HEIGHT } from "../../game-data/globals";
import { mobileAgent } from "../../helpers/screenOrientation";
import { getUniqueId } from "../../helpers/utilFunctions";
import { Emote } from "../cutscenes/Emote";
import { SpeechBubble } from "../cutscenes/SpeechBubble";

let activeBubbleIds: string[] = [];
let subtitleBubbleId: string = null;

let activeBubbles: { [key: string]: SpeechBubble | Emote } = {}; 
let subtitleBubble: SpeechBubble = null;

const nonEmoteIds = (): string[] => { return activeBubbleIds.filter( ( e ) => { return !(activeBubbles[e] instanceof Emote); } ) };
export const selectionBubble = (): SpeechBubble => {
    for ( const key in activeBubbles ) {
        if ( activeBubbles[key].type === SceneAnimationType.speakYesNo )
            return activeBubbles[key] as SpeechBubble;
    }
};
export const isWriting = (): boolean => {
    return nonEmoteIds().filter(
        ( e ) => { return ( activeBubbles[e] as SpeechBubble ).typeWriter.isWriting }
    ).length > 0;
};
export const hasActiveBubbles = (): boolean => { return activeBubbleIds.length > 0 || subtitleBubble !== null; };
export const setNewBubble = ( location, contents, type, sfx ): void => {
    const id = getUniqueId( activeBubbleIds );
    activeBubbles[id] = new SpeechBubble( location, contents, id, type );
    activeBubbleIds.push( id );
    globals.GAME.sound.playSpeakingEffect( sfx );
};
export const setNewEmote = ( location, imageSrc ): void => {
    const id = getUniqueId( activeBubbleIds );
    activeBubbles[id] = new Emote( location, imageSrc );
    activeBubbleIds.push( id );

    setTimeout( () => { unsetActiveBubble( id ) }, 1000 )
};
export const setNewSubtitleBubble = ( contents ): void => {
    subtitleBubbleId = getUniqueId( activeBubbleIds );
    subtitleBubble = new SpeechBubble(
        { 'x': 0, 'y': CANVAS_HEIGHT - BATTLE_FONT_LINE_HEIGHT },
        contents, subtitleBubbleId, SceneAnimationType.speak, true
    );
};
export const clearSubtitleBubble = (): void => {
    subtitleBubble.setMoveToY( mobileAgent ? screen.height : CANVAS_HEIGHT );
    setTimeout( () => {
        subtitleBubble = null;
        subtitleBubbleId = null;
    }, 1000 );
};
export const bubbleIsActive = ( id ): boolean => {
    return activeBubbleIds.indexOf( id ) > -1;
};
export const unsetActiveBubble = ( id ): void => {
    activeBubbleIds = activeBubbleIds.filter( ( e ) => { return e !== id; } )
    delete activeBubbles[id];
};
export const displayFullText = (): void => {
    nonEmoteIds().forEach( ( id ) => {
        ( activeBubbles[id] as SpeechBubble ).typeWriter.displayFullText();
    } );
    globals.GAME.sound.playEffect( "misc/menu-scroll-a.mp3" );
}
export const handleSelectionKeys = (): void => {
    if ( selectionBubble() ) {
        selectionBubble().moveCursor();
    }
};
export const clearActiveBubbles = (): void => {
    activeBubbles = {};
    activeBubbleIds = [];
};
export const drawBubbles = (): void => {
    Object.values(activeBubbles).forEach( ( e ) => { e.draw(); } );
    if ( subtitleBubbleId !== null ) {
        subtitleBubble.draw();
    }
};