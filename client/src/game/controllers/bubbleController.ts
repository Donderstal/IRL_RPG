import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { TextBubbleType } from "../../enumerables/TextBubbleType";
import { getUniqueId } from "../../helpers/utilFunctions";
import type { SpeakScene, SpeakYesNoScene } from "../../models/SceneAnimationModel";
import { getSpeechBubbleGrid } from "../canvas/canvasGetter";
import { Emote } from "../cutscenes/Emote";
import { SpeechBubble } from "../cutscenes/SpeechBubble";
import { playEffect, playSpeakingEffect } from "../sound/sound";

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
    }
    else {
        mainBubble = new SpeechBubble( contents, type === SceneAnimationType.speak ? TextBubbleType.Speak : TextBubbleType.SpeakYesNo );
    }

    playSpeakingEffect( sfx );
};
export const setNewEmote = ( location, imageSrc ): void => {
    const id = getUniqueId( emoteIds );
    emotes[id] = new Emote( location, imageSrc );
    emoteIds.push( id );
    setTimeout( () => { unsetEmote( id ) }, 1000 )
};
export const setNewSubtitleBubble = ( contents ): void => {
    subtitleBubble = new SpeechBubble( contents, TextBubbleType.Subtitle );
    subtitleBubble.setMoveToY( subtitleBubble.y - subtitleBubble.height );
};
export const setNewCenterBubble = ( text: string ) => {
    titleBubble = new SpeechBubble( { text: text } as SpeakScene, TextBubbleType.Center );
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
    playEffect( "misc/menu-scroll-a.mp3" );
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
    const canvas = getSpeechBubbleGrid().canvas;
    const context = canvas.getContext( "2d" );

    context.clearRect( 0, 0, canvas.width, canvas.height );
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