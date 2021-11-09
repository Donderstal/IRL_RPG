const { 
    SPEAK, SPEAK_YES_NO, MOVE, MOVE_CAR, ANIM, CREATE_CAR, CREATE_SPRITE, DELETE_SPRITE, FADE_OUT, FADE_IN, FADE_IN_OUT, WAIT, EMOTE
} = require('../../game-data/conditionGlobals');
const globals               = require('../../game-data/globals')
const { 
    ON_NPC_INTERACTION, ON_LEAVE
}  = require('../../game-data/conditionGlobals')
const { Scene }     = require('./Scene')
/**
 * The Cinematic and Scene classes are no longer implemented and need to be reworked to the new Grid system
 */
class Cinematic {
    constructor( data, trigger, args ) {
        this.data = data;
        this.scenes = data.scenes.slice();
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.scenes.length
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator] );

        globals.GAME.activateCinematic( this );
    }

    checkForScenePass( ) {
        let goToNextScene = false;
        switch( this.activeScene.type ) {
            case SPEAK:
            case SPEAK_YES_NO:
            case EMOTE:
                goToNextScene = !globals.GAME.speechBubbleController.isActive
                break;
            case MOVE :
            case MOVE_CAR:
                goToNextScene = !this.activeScene.walkingToDestination
                break;
            case ANIM: 
                const sprite = this.activeScene.getSpriteByName( );
                goToNextScene = !sprite.State.inAnimation
                break;
            case CREATE_CAR:
            case CREATE_SPRITE:
                goToNextScene = this.activeScene.getSpriteByName( ) != undefined;
                break;
            case DELETE_SPRITE:
                goToNextScene = this.activeScene.getSpriteByName( ) == undefined;
                break;
            case FADE_OUT:
            case FADE_IN :
                let fader = globals.GAME.fader
                goToNextScene = ( fader.fadingFromBlack && fader.A <= 0 ) || ( fader.fadingToBlack && fader.A >= 1 ) || fader.holdBlackScreen
                break;
            case FADE_IN_OUT:
                goToNextScene = !globals.GAME.fader.inFadingAnimation
                break;
            case WAIT:
                goToNextScene = this.activeScene.counter.countAndCheckLimit( )
                break;
            default :
                console.log( "Scene type " + this.activeScene.type + " is not recognized")
                console.log(this.activeScene)
        }

        if ( goToNextScene ) {
            this.activateNextScene( );
        }
    }

    activateNextScene( ) {
        if ( this.activeScene.is( SPEAK_YES_NO ) ) {
            this.registerYesOrNoSelection( )
        }
        
        this.iterator++
        if ( this.scenes[this.iterator] ) {
            if ( this.activeScene.is( SPEAK ) || this.activeScene.is( SPEAK_YES_NO )|| this.activeScene.is( EMOTE ) ) {
                this.activeScene.unsetSpriteAnimation( )
            }
            this.activeScene = new Scene( this.scenes[this.iterator] );            
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
                let sprite = globals.GAME.FRONT.spriteDictionary[this.args[0]]
                globals.GAME.activeAction.dismiss( );
                break;
        }
    }

    registerYesOrNoSelection( ) {
        let scenesToAdd;
        switch( this.activeScene.selection ) {
            case "YES" :
                scenesToAdd = this.activeScene.pathYes;
                break;
            case "NO" :
                scenesToAdd = this.activeScene.pathNo;
                break;
            default:
                console.log("Selection has invalid value: " + this.activeScene.selection)
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