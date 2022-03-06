const globals = require("../../game-data/globals");
const { getUniqueId } = require("../../helpers/utilFunctions");
const { SpeechBubble } = require("./SpeechBubble");
const { SPEAK_YES_NO } = require("../../game-data/conditionGlobals");
const { INTERACTION_YES } = require("../../game-data/interactionGlobals");
const { Emote } = require("./Emote");

class SpeechBubbleController {
    constructor( ) {
        this.emoteIds = [];
        this.activeBubbles = {};
        this.activeBubbleIds = [];
    }

    get nonEmoteIds( ) { return this.activeBubbleIds.filter((e) => { return this.emoteIds.indexOf(e) == -1 })}
    get isActive() { return this.activeBubbleIds.length > 0; }
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
        globals.GAME.sound.playEffect("voice-1.mp3");
    }

    setNewEmote( location, imageSrc ) {
        const id = getUniqueId(this.activeBubbleIds);
        this.activeBubbles[id] = new Emote( location, imageSrc );
        this.activeBubbleIds.push(id);
        this.emoteIds.push(id);
    }

    bubbleIsActive( id ) {
        return this.activeBubbleIds.indexOf(id) > -1;
    }

    unsetActiveBubble( id ) {
        const index = this.activeBubbleIds.indexOf(id);
        this.activeBubbleIds.slice(index);
        delete this.activeBubbles[id];
    }

    handleButtonPress( ) {
        if ( this.isActive ) {
            if ( this.isWriting ) {
                this.activeBubbleIds.forEach((id) =>{
                    this.activeBubbles[id].typeWriter.displayFullText( );
                });
            }
            else if(this.selectionBubble){
                globals.GAME.activeAction.registerSelection( this.selectionBubble.activeButton );
                let animation = globals.GAME.activeCinematic.activeScene.getAnimationByType(SPEAK_YES_NO);
                animation.setSelection( this.selectionBubble.activeButton );
                this.clearActiveBubbles( );
            }
            else {
                this.clearActiveBubbles( );
            }
        }
    }

    handleSelectionKeys( ) {
        if (this.selectionBubble) {
            this.selectionBubble.moveCursor( );
        }
    }

    clearActiveBubbles( ) {
        this.activeBubbles = {};
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
        }
    }
}

module.exports = {
    SpeechBubbleController
}