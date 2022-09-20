import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { TextBubbleType } from "../../enumerables/TextBubbleType";
import globals from "../../game-data/globals";
import { getCenterBubbleDimensions, getCenterBubbleXy, getStandardBubbleDimensions, getStandardBubbleXy, getSubtitleBubbleDimensions, getSubtitleBubbleXy } from "../../helpers/speechBubbleHelpers";
import { getUniqueId } from "../../helpers/utilFunctions";
import type { SpeakScene, SpeakYesNoScene } from "../../models/SceneAnimationModel";
import { Emote } from "../cutscenes/Emote";
import { SpeechBubble } from "../cutscenes/SpeechBubble";
import { getSpeechBubbleCanvas } from "./utilityCanvasController";

const getBubbleContext = () => { return getSpeechBubbleCanvas().ctx; }

let mainBubble: SpeechBubble = null;
let titleBubble: SpeechBubble = null;
let subtitleBubble: SpeechBubble = null;

let emoteIds: string[] = [];
let emotes: { [key: string]: Emote } = {};

export const selectionBubble = (): boolean => {
    return mainBubble !== null && mainBubble.type === TextBubbleType.SpeakYesNo;
};
export const isWriting = (): boolean => {
    return mainBubble.typeWriter.isWriting;
};
export const getMainTextBubble = (): SpeechBubble => {
    return mainBubble;
}
export const hasActiveBubbles = (): boolean => { return emoteIds.length > 0 || mainBubble !== null; };

export const setNewBubble = ( contents: SpeakScene | SpeakYesNoScene, type: SceneAnimationType, sfx: string ): void => {
    if ( mainBubble !== null ) {
        setBubbleContents( contents, type );
        return;
    }
    const dimensions = getStandardBubbleDimensions( contents, type );
    const xy = getStandardBubbleXy();
    mainBubble = new SpeechBubble( contents, type === SceneAnimationType.speak ? TextBubbleType.Speak : TextBubbleType.SpeakYesNo, dimensions, xy );
    globals.GAME.sound.playSpeakingEffect( sfx );
};
export const setNewEmote = ( location, imageSrc ): void => {
    const id = getUniqueId( emoteIds );
    emotes[id] = new Emote( location, imageSrc );
    emoteIds.push( id );
    setTimeout( () => { unsetEmote( id ) }, 1000 )
};
export const setNewSubtitleBubble = ( contents ): void => {
    const dimensions = getSubtitleBubbleDimensions( );
    const xy = getSubtitleBubbleXy()
    subtitleBubble = new SpeechBubble( contents, TextBubbleType.Subtitle, dimensions, xy );
    subtitleBubble.setMoveToY( subtitleBubble.y - subtitleBubble.height );
};
export const setNewCenterBubble = ( text: string ) => {
    const dimensions = getCenterBubbleDimensions( );
    const xy = getCenterBubbleXy( dimensions );
    titleBubble = new SpeechBubble( { text: text } as SpeakScene, TextBubbleType.Center, dimensions, xy );
    setTimeout( () => { titleBubble = null }, 5000 )
}

export const clearSubtitleBubble = (): void => {
    subtitleBubble.setMoveToY( screen.height );
    setTimeout( () => {
        subtitleBubble = null;
    }, 1000 );
};
export const unsetEmote = ( id: string ): void => {
    emoteIds = emoteIds.filter( ( e ) => { return e !== id; } )
    delete emotes[id];
};
export const displayFullText = (): void => {
    mainBubble.typeWriter.displayFullText();
    globals.GAME.sound.playEffect( "misc/menu-scroll-a.mp3" );
}
export const handleSelectionKeys = (): void => {
    if ( selectionBubble() ) {
        mainBubble.moveCursor();
    }
};
export const clearActiveBubbles = (): void => {
    clearActiveEmotes();
    mainBubble = null;
};
export const setBubbleContents = ( contents: SpeakScene | SpeakYesNoScene, type: SceneAnimationType ): void => {
    mainBubble.setContents( contents, type === SceneAnimationType.speak ? TextBubbleType.Speak : TextBubbleType.SpeakYesNo )
}

export const clearActiveText = (): void => {
    mainBubble.text = "";
}
export const clearActiveEmotes = (): void => {
    emotes = {};
    emoteIds = [];
}
export const drawBubbles = (): void => {
    const context = getBubbleContext();
    Object.values( emotes ).forEach( ( e ) => { e.draw( ); } );
    if ( subtitleBubble !== null ) {
        subtitleBubble.draw( context );
    }
    if ( titleBubble !== null ) {
        titleBubble.draw( context );
    }
    if ( mainBubble !== null ) {
        mainBubble.draw( context );
    }
};