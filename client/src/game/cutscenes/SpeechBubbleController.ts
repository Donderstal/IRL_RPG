import globals, { BATTLE_FONT_LINE_HEIGHT, CANVAS_HEIGHT } from "../../game-data/globals";
import { getUniqueId } from "../../helpers/utilFunctions";
import { SpeechBubble } from "./SpeechBubble";
import { Emote } from "./Emote";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";

export class SpeechBubbleController {
    emoteIds: string[];
    activeBubbles: { [key: string]: SpeechBubble | Emote };
    activeBubbleIds: string[];
    subtitleBubbleId: string;
    subtitleBubble: SpeechBubble;
    constructor( ) {
        this.emoteIds = [];
        this.activeBubbles = null;
        this.activeBubbleIds = [];
        this.subtitleBubbleId = null;
        this.subtitleBubble = null;
    }

    get nonEmoteIds( ): string[] { return this.activeBubbleIds.filter((e) => { return this.emoteIds.indexOf(e) === -1 })}
    get isActive(): boolean { return this.activeBubbleIds.length > 0 || this.subtitleBubble !== null; }
    get selectionBubble(): SpeechBubble {
        for ( const key in this.activeBubbles ) {
            if ( this.activeBubbles[key].type === SceneAnimationType.speakYesNo )
                return this.activeBubbles[key] as SpeechBubble;
        }
    }
    get isWriting(): boolean { 
        return this.activeBubbleIds.filter(
            ( e ) => { return this.emoteIds.indexOf( e ) === -1 && (this.activeBubbles[e] as SpeechBubble).typeWriter.isWriting }
        ).length > 0;
    }

    setNewBubble( location, contents, type ) {
        const id = getUniqueId(this.activeBubbleIds);
        this.activeBubbles[id] = new SpeechBubble( location, contents, id, type );
        this.activeBubbleIds.push(id);
        globals.GAME.sound.playSpeakingEffect(contents.sfx);
    }

    setNewEmote( location, imageSrc ) {
        const id = getUniqueId(this.activeBubbleIds);
        this.activeBubbles[id] = new Emote( location, imageSrc );
        this.activeBubbleIds.push(id);
        this.emoteIds.push(id);
        setTimeout(()=>{ this.unsetActiveBubble( id ) }, 1000)
    }

    setNewSubtitleBubble( contents ) {
        this.subtitleBubbleId = getUniqueId(this.activeBubbleIds);
        this.subtitleBubble = new SpeechBubble( 
            {'x': 0, 'y': CANVAS_HEIGHT - BATTLE_FONT_LINE_HEIGHT}, 
            contents, this.subtitleBubbleId, SceneAnimationType.speak, true
        );
    }

    clearSubtitleBubble( ) {
        this.subtitleBubble.setMoveToY( globals.SCREEN.MOBILE ? screen.height : CANVAS_HEIGHT );
        setTimeout(()=>{
            this.subtitleBubble = null;       
            this.subtitleBubbleId = null;     
        }, 1000);
    }

    bubbleIsActive( id ) {
        return this.activeBubbleIds.indexOf(id) > -1;
    }

    unsetActiveBubble( id ) {
        this.activeBubbleIds = this.activeBubbleIds.filter( ( e ) => { return e !== id; } )
        this.emoteIds = this.emoteIds.filter( ( e ) => { return e !== id; } );
        delete this.activeBubbles[id];
    }

    handleButtonPress( ) {
        if ( this.isActive ) {
            if ( this.isWriting ) {
                this.nonEmoteIds.forEach((id) =>{
                    ( this.activeBubbles[id] as SpeechBubble ).typeWriter.displayFullText( );
                });
                globals.GAME.sound.playEffect( "misc/menu-scroll-a.mp3");
            }
            else if( this.selectionBubble ){
                globals.GAME.activeAction.registerSelection( this.selectionBubble.activeButton );
                const animation = globals.GAME.activeCinematic.activeScene.getAnimationByType(SceneAnimationType.speakYesNo);
                animation.setSelection( this.selectionBubble.activeButton );
                this.clearActiveBubbles( );
            }
            else {
                this.clearActiveBubbles( );
            }
            globals.GAME.sound.clearSpeakingEffect( );
        }
    }

    handleSelectionKeys( ) {
        if (this.selectionBubble) {
            this.selectionBubble.moveCursor( );
        }
    }

    clearActiveBubbles( ) {
        this.activeBubbles = null;
        this.activeBubbleIds = [];
        this.emoteIds = [];
    }

    drawBubbles( ) {
        if ( this.isActive ) {
            if ( this.emoteIds.length >= 1 ) {
                this.emoteIds.forEach( e => this.activeBubbles[e].draw() );     
            }     
            if ( this.nonEmoteIds.length >= 1 ) {
                this.nonEmoteIds.forEach( e => this.activeBubbles[e].draw() );     
            }
            if ( this.subtitleBubbleId ) {
                this.subtitleBubble.draw();
            }
        }
    }
}