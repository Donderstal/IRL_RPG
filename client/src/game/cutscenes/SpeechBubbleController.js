const globals = require("../../game-data/globals");
const { getUniqueId } = require("../../helpers/utilFunctions");
const { SpeechBubble } = require("./SpeechBubble");
const { SPEAK_YES_NO, SPEAK } = require("../../game-data/conditionGlobals");
const { Emote } = require("./Emote");

class SpeechBubbleController {
    constructor( ) {
        this.emoteIds = [];
        this.activeBubbles = {};
        this.activeBubbleIds = [];
        this.subtitleBubbleId = false;
        this.subtitleBubble = false;
    }

    get nonEmoteIds( ) { return this.activeBubbleIds.filter((e) => { return this.emoteIds.indexOf(e) == -1 })}
    get isActive() { return this.activeBubbleIds.length > 0 || this.subtitleBubble != false; }
    get selectionBubble( ) { return Object.values(this.activeBubbles).find(x => x.type === SPEAK_YES_NO); }
    get isWriting() { 
        return this.activeBubbleIds.filter(
            (e) => { return this.emoteIds.indexOf(e) == -1 && this.activeBubbles[e].typeWriter.isWriting }
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
            {'x': 0, 'y': globals.CANVAS_HEIGHT - globals.BATTLE_FONT_LINE_HEIGHT}, 
            contents, this.subtitleBubbleId, SPEAK, true
        );
    }

    clearSubtitleBubble( ) {
        this.subtitleBubble.setMoveToY( globals.SCREEN.MOBILE ? screen.height : globals.CANVAS_HEIGHT );
        setTimeout(()=>{
            this.subtitleBubble = false;       
            this.subtitleBubbleId = false;
        }, 1000);
    }

    bubbleIsActive( id ) {
        return this.activeBubbleIds.indexOf(id) > -1;
    }

    unsetActiveBubble( id ) {
        this.activeBubbleIds = this.activeBubbleIds.filter((e)=>{return e != id})
        if ( this.emoteIds.indexOf(id) != -1 ) {
            this.emoteIds = this.emoteIds.filter((e)=>{return e != id})
        }
        else if ( this.nonEmoteIds.indexOf(id) != -1 ) {
            this.nonEmoteIds = this.nonEmoteIds.filter((e)=>{return e != id})
        }
        delete this.activeBubbles[id];
    }

    handleButtonPress( ) {
        if ( this.isActive ) {
            if ( this.isWriting ) {
                this.nonEmoteIds.forEach((id) =>{
                    this.activeBubbles[id].typeWriter.displayFullText( );
                });
                globals.GAME.sound.playEffect( "misc/menu-scroll-a.mp3");
            }
            else if( this.selectionBubble ){
                globals.GAME.activeAction.registerSelection( this.selectionBubble.activeButton );
                let animation = globals.GAME.activeCinematic.activeScene.getAnimationByType(SPEAK_YES_NO);
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
        this.activeBubbles = { };
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

module.exports = {
    SpeechBubbleController
}