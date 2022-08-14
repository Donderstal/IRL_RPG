import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import globals, { BATTLE_FONT_LINE_HEIGHT, CANVAS_HEIGHT } from "../../game-data/globals";
import { getUniqueId } from "../../helpers/utilFunctions";
import { Emote } from "../cutscenes/Emote";
import { SpeechBubble } from "../cutscenes/SpeechBubble";
import { registerActionSelection } from "./actionController";
import { registerPlayerAnswer } from "./cinematicController";

let activeBubbleIds: string[] = [];
let subtitleBubbleId: string = null;

let activeBubbles: { [key: string]: SpeechBubble | Emote } = {}; 
let subtitleBubble: SpeechBubble = null;

const nonEmoteIds = (): string[] => { return activeBubbleIds.filter( ( e ) => { return !(activeBubbles[e] instanceof Emote); } ) };
const selectionBubble = (): SpeechBubble => {
    for ( const key in activeBubbles ) {
        if ( activeBubbles[key].type === SceneAnimationType.speakYesNo )
            return activeBubbles[key] as SpeechBubble;
    }
};
const isWriting = (): boolean => {
    return nonEmoteIds().filter(
        ( e ) => { ( activeBubbles[e] as SpeechBubble ).typeWriter.isWriting }
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
    activeBubbles = {};
    activeBubbleIds = [];
};
export const drawBubbles = (): void => {
    Object.values(activeBubbles).forEach( ( e ) => { e.draw(); } );
    if ( subtitleBubbleId !== null ) {
        subtitleBubble.draw();
    }
};

//const getSpeechBubbleXy = ( spawnLocation, dimensions ) => {
//    const bubbleLocation = {
//        'x': globals.SCREEN.MOBILE ? ( 0 + ( MAX_BUBBLE_WIDTH - dimensions.width ) / 2 ) : spawnLocation.x,
//        'y': globals.SCREEN.MOBILE ? 0 : spawnLocation.y - dimensions.height,
//        'position': "UP-RIGHT"
//    };
//    if ( bubbleLocation.x + dimensions.width > 24 * GRID_BLOCK_PX ) {
//        bubbleLocation.x = ( spawnLocation.x - dimensions.width ) + GRID_BLOCK_PX;
//        bubbleLocation.position = "UP-LEFT";
//    }
//    if ( bubbleLocation.y < 0 ) {
//        bubbleLocation.y = spawnLocation.y + ( GRID_BLOCK_PX * 1.75 );
//        bubbleLocation.position = bubbleLocation.position === "UP-RIGHT" ? "DOWN-RIGHT" : "DOWN-LEFT";
//    }
//    return bubbleLocation;
//}

//const getSpeechBubbleDimensions = ( contentModel: SceneAnimationModel, type: SceneAnimationType ) => {
//    let content = type === SceneAnimationType.speak ? contentModel as SpeakScene : contentModel as SpeakYesNoScene;
//    const text = breakTextIntoLines( content.text, LARGE_FONT_SIZE )
//    const ctx = globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext()
//    const textHeightAcc = text.length * LARGE_FONT_LINE_HEIGHT + ( content.spriteName !== undefined ? SMALL_FONT_LINE_HEIGHT : 0 );
//    const firstLineWidth = ctx.measureText( text[0] ).width + ( BUBBLE_INNER_PADDING * 2 );
//    return {
//        'textLines': text.length,
//        'width': text.length > 1 ? MAX_BUBBLE_WIDTH : Math.ceil( firstLineWidth / GRID_BLOCK_PX ) * GRID_BLOCK_PX,
//        'height': ( Math.ceil( textHeightAcc / GRID_BLOCK_PX ) * GRID_BLOCK_PX < GRID_BLOCK_PX * 2 ) ? GRID_BLOCK_PX * 2 : Math.ceil( textHeightAcc / GRID_BLOCK_PX ) * GRID_BLOCK_PX
//    }
//}