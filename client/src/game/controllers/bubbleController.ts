import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { TextBubbleType } from "../../enumerables/TextBubbleType";
import globals from "../../game-data/globals";
import { getCenterBubbleDimensions, getCenterBubbleXy, getStandardBubbleDimensions, getStandardBubbleXy, getSubtitleBubbleDimensions, getSubtitleBubbleXy } from "../../helpers/speechBubbleHelpers";
import { getUniqueId } from "../../helpers/utilFunctions";
import type { SpeakScene, SpeakYesNoScene } from "../../models/SceneAnimationModel";
import { Emote } from "../cutscenes/Emote";
import { SpeechBubble } from "../cutscenes/SpeechBubble";
import { getSpeechBubbleCanvas } from "./utilityCanvasController";

let activeBubbleIds: string[] = [];
let subtitleBubbleId: string = null;
let centerBubbleId: string = null;

let activeBubbles: { [key: string]: SpeechBubble | Emote } = {}; 
let subtitleBubble: SpeechBubble = null;
let centerBubble: SpeechBubble = null;

const getBubbleContext = () => { return getSpeechBubbleCanvas().ctx; }
const nonEmoteIds = (): string[] => { return activeBubbleIds.filter( ( e ) => { return !( activeBubbles[e] instanceof Emote ); } ) };

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

export const setNewBubble = ( contents: SpeakScene | SpeakYesNoScene, type: SceneAnimationType, sfx: string ): void => {
    const id = getUniqueId( activeBubbleIds );
    const dimensions = getStandardBubbleDimensions( contents, type );
    const xy = getStandardBubbleXy();
    activeBubbles[id] = new SpeechBubble( contents, id, type === SceneAnimationType.speak ? TextBubbleType.Speak : TextBubbleType.SpeakYesNo, dimensions, xy );
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
    const dimensions = getSubtitleBubbleDimensions( );
    const xy = getSubtitleBubbleXy()
    subtitleBubbleId = getUniqueId( [ ...activeBubbleIds, centerBubbleId] );
    subtitleBubble = new SpeechBubble( contents, subtitleBubbleId, TextBubbleType.Subtitle, dimensions, xy );
    subtitleBubble.setMoveToY( subtitleBubble.y - subtitleBubble.height );
};
export const setNewCenterBubble = ( text: string ) => {
    const dimensions = getCenterBubbleDimensions( );
    const xy = getCenterBubbleXy( dimensions );
    centerBubbleId = getUniqueId( [...activeBubbleIds, subtitleBubbleId] );
    centerBubble = new SpeechBubble( { text: text } as SpeakScene, centerBubbleId, TextBubbleType.Center, dimensions, xy );

    setTimeout( () => { centerBubbleId = null }, 5000 )
}

export const clearSubtitleBubble = (): void => {
    subtitleBubble.setMoveToY( screen.height );
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
    const context = getBubbleContext();
    Object.values( activeBubbles ).forEach( ( e ) => { e.draw( context ); } );
    if ( subtitleBubbleId !== null ) {
        subtitleBubble.draw( context );
    }
    if ( centerBubbleId !== null ) {
        centerBubble.draw( context );
    }
};