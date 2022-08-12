import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import globals, { BATTLE_FONT_LINE_HEIGHT, CANVAS_HEIGHT } from "../../game-data/globals";
import { getUniqueId } from "../../helpers/utilFunctions";
import { Emote } from "../cutscenes/Emote";
import { SpeechBubble } from "../cutscenes/SpeechBubble";
import { registerActionSelection } from "./actionController";
import { registerPlayerAnswer } from "./cinematicController";

let emoteIds: string[] = [];
let activeBubbleIds: string[] = [];
let subtitleBubbleId: string = null;

let activeBubbles: { [key: string]: SpeechBubble | Emote } = {}; 
let subtitleBubble: SpeechBubble = null;

const nonEmoteIds = (): string[] => { return activeBubbleIds.filter( ( e ) => { return emoteIds.indexOf( e ) === -1 } ) };
const selectionBubble = (): SpeechBubble => {
    for ( const key in activeBubbles ) {
        if ( activeBubbles[key].type === SceneAnimationType.speakYesNo )
            return activeBubbles[key] as SpeechBubble;
    }
};
const isWriting = (): boolean => {
    return activeBubbleIds.filter(
        ( e ) => { return emoteIds.indexOf( e ) === -1 && ( activeBubbles[e] as SpeechBubble ).typeWriter.isWriting }
    ).length > 0;
};
export const hasActiveBubbles = (): boolean => { return activeBubbleIds.length > 0 || subtitleBubble !== null; };
export const setNewBubble = ( location, contents, type ): void => {
    const id = getUniqueId( activeBubbleIds );
    activeBubbles[id] = new SpeechBubble( location, contents, id, type );
    activeBubbleIds.push( id );
    globals.GAME.sound.playSpeakingEffect( contents.sfx );
};
export const setNewEmote = ( location, imageSrc ): void => {
    const id = getUniqueId( activeBubbleIds );
    activeBubbles[id] = new Emote( location, imageSrc );
    activeBubbleIds.push( id );
    emoteIds.push( id );
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
    subtitleBubble.setMoveToY( globals.SCREEN.MOBILE ? screen.height : CANVAS_HEIGHT );
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
    emoteIds = emoteIds.filter( ( e ) => { return e !== id; } );
};
export const handleBubbleButtonPress = (): void => {
    if ( hasActiveBubbles() ) {
        if ( isWriting() ) {
            nonEmoteIds().forEach( ( id ) => {
                ( activeBubbles[id] as SpeechBubble ).typeWriter.displayFullText();
            } );
            globals.GAME.sound.playEffect( "misc/menu-scroll-a.mp3" );
        }
        else if ( selectionBubble() ) {
            registerActionSelection( selectionBubble().activeButton )
            registerPlayerAnswer( selectionBubble().activeButton );
            clearActiveBubbles();
        }
        else {
            clearActiveBubbles();
        }
        globals.GAME.sound.clearSpeakingEffect();
    }
};
export const handleSelectionKeys = (): void => {
    if ( selectionBubble() ) {
        selectionBubble().moveCursor();
    }
};
export const clearActiveBubbles = (): void => {
    activeBubbles = null;
    activeBubbleIds = [];
    emoteIds = [];
};
export const drawBubbles = (): void => {
    if ( hasActiveBubbles() ) {
        if ( emoteIds.length >= 1 ) {
            emoteIds.forEach( e => activeBubbles[e].draw() );
        }
        if ( nonEmoteIds.length >= 1 ) {
            nonEmoteIds().forEach( e => activeBubbles[e].draw() );
        }
        if ( subtitleBubbleId ) {
            subtitleBubble.draw();
        }
    }
};