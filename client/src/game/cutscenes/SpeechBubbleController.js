const globals = require("../../game-data/globals");
const { getUniqueId } = require("../../helpers/utilFunctions");
const { SpeechBubble } = require("./SpeechBubble");
const { SPEAK_YES_NO } = require("../../game-data/conditionGlobals");
const { INTERACTION_NO } = require("../../game-data/interactionGlobals");

class SpeechBubbleController {
    constructor( ) {
        this.activeBubbles = {};
        this.activeBubbleIds = [];
    }

    get isActive() { return this.activeBubbleIds.length > 0; }
    get isWriting() { 
        return this.activeBubbleIds.filter(
            (e) => { return this.activeBubbles[e].typeWriter.isWriting }
        ).length > 0;
    }

    setNewBubble( contents, location ) {
        const id = getUniqueId(this.activeBubbleIds);
        this.activeBubbles[id] = new SpeechBubble( location, contents, id );
        this.activeBubbleIds.push(id)
    }

    bubbleIsActive( id ) {
        return this.activeBubbleIds.indexOf(id) > -1;
    }

    unsetActiveBubble( id ) {
        const index = this.activeBubbleIds.indexOf(id);
        this.activeBubbleIds.slice(index);
        delete this.activeBubbles[id];
    }

    handleButtonPress( key ) {
        if ( this.isActive ) {
            if ( this.isWriting ) {
                this.activeBubbleIds.forEach((id) =>{
                    this.activeBubbles[id].typeWriter.displayFullText( );
                });
            }
            else {
                if ( globals.GAME.activeCinematic.activeScene.is(SPEAK_YES_NO) ){
                    globals.GAME.activeAction.registerSelection( key == " " ? INTERACTION_YES : INTERACTION_NO );
                    globals.GAME.activeCinematic.activeScene.setSelection( key == " " ? "YES" : "NO" );
                }
                this.clearActiveBubbles( );
            }
        }
    }

    clearActiveBubbles( ) {
        this.activeBubbles = {};
        this.activeBubbleIds = [];
    }

    drawBubbles( ) {
        if ( this.isActive ) {
            this.activeBubbleIds.forEach( e => this.activeBubbles[e].drawTextBox() );            
        }
    }
}

module.exports = {
    SpeechBubbleController
}