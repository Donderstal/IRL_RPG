const { 
    SPEAK, SPEAK_YES_NO, EMOTE
} = require('../../game-data/conditionGlobals');
const globals               = require('../../game-data/globals')
const controls             = require('../controls')
const { 
    ON_NPC_INTERACTION, ON_LEAVE
}  = require('../../game-data/conditionGlobals')
const { Scene }     = require('./Scene');
const { INTERACTION_YES, INTERACTION_NO } = require('../../game-data/interactionGlobals');
/**
 * The Cinematic and Scene classes are no longer implemented and need to be reworked to the new Grid system
 */
class Cinematic {
    constructor( scenes, trigger, args ) {
        controls.clearPressedKeys( globals.GAME.pressedKeys );
        this.scenes = scenes.slice();
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.scenes.length;
        this.registeredSelection = false;
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator], trigger == ON_NPC_INTERACTION ? args[0] : false );

        globals.GAME.activateCinematic( this );
    }

    checkForScenePass( ) {
        if ( this.activeScene.checkForScenePass( ) ) {
            this.activateNextScene( );
        }
    }

    activateNextScene( ) {
        if ( this.activeScene.containsAnimationType( SPEAK_YES_NO ) ) {
            this.registerYesOrNoSelection( )
        }
        
        this.iterator++
        if ( this.scenes[this.iterator] ) {
            if ( this.activeScene.containsAnimationType( SPEAK ) || this.activeScene.containsAnimationType( SPEAK_YES_NO )|| this.activeScene.containsAnimationType( EMOTE ) ) {
                this.activeScene.unsetSpriteAnimation( )
            }
            this.activeScene = new Scene( this.scenes[this.iterator], this.trigger == ON_NPC_INTERACTION ? this.args[0] : false );            
        }
        else {
            this.activeScene.unsetSpriteAnimation( )
            globals.GAME.deActivateCinematic( this );
            globals.GAME.activeCinematic = null;
            this.handleEndOfCinematicTrigger( );
        }
    }

    handleEndOfCinematicTrigger( ) {
        switch( this.trigger ) {
            case ON_LEAVE: 
                globals.GAME.switchMap( this.args[0], this.args[1] )
                break;
            case ON_NPC_INTERACTION: 
                let sprite = globals.GAME.FRONT.spriteDictionary[this.args[0]];
                sprite.State.cinematicOff( sprite );
                globals.GAME.activeAction.dismiss( );
                break;
        }
    }

    registerYesOrNoSelection( ) {
        let scenesToAdd;
        let animation = this.activeScene.getAnimationByType( SPEAK_YES_NO );
        this.registeredSelection = animation.selection;
        switch( animation.selection ) {
            case INTERACTION_YES :
                scenesToAdd = animation.pathYes;
                break;
            case INTERACTION_NO :
                scenesToAdd = animation.pathNo;
                break;
            default:
                console.log("Selection has invalid value: " + animation.selection)
        }

        if ( scenesToAdd ) {
            for ( var i = 0; i < scenesToAdd.length; i++ ) {
                this.scenes.splice( this.iterator + 1 + i, 0 , scenesToAdd[i] )
            }            
        }
    }
}

module.exports = {
    Cinematic
}