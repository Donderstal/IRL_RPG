const globals               = require('../../game-data/globals')
const { Sprite } = require('../interfaces/I_Sprite')
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
        if ( this.activeScene.type == "SPEAK" ) {
            if ( !globals.GAME.bubbleIsActive ) {
                this.activateNextScene( )
            }
            else {
                return
            }
        }
        if ( this.activeScene.type == "SPEAK_YES_OR_NO" ) {
            if ( !globals.GAME.bubbleIsActive ) {
                this.handleYesOrNoScene( );
            }
            else {
                return
            }
        }
        if ( this.activeScene.type == "MOVE" || this.activeScene.type == "MOVE_CAR" ) {
            if ( this.activeScene.walkingToDestination ) {
                return
            }
            else {
                this.activateNextScene( )
            }
        }
        if ( this.activeScene.type == "ANIM" ) {
            const sprite = this.activeScene.getSpriteByName( );
            if ( sprite.inScriptedAnimation ) {
                return 
            }          
            else {
                this.activateNextScene( )
            }      
        }
        if ( this.activeScene.type == "FADE_SCREEN_OUT_IN" ) {
            if ( globals.GAME.fader.inFadingAnimation ) {
                return
            }
            else {
                globals.GAME.sound.resumeMusic( );
                this.activateNextScene( )
            }
        }
        if ( this.activeScene.type == "FADE_SCREEN_IN" || this.activeScene.type == "FADE_SCREEN_OUT" ) {
            let fader = globals.GAME.fader
            if ( ( fader.fadingFromBlack && fader.A <= 0 ) || ( fader.fadingToBlack && fader.A >= 1 ) 
            || fader.holdBlackScreen ) {
                this.activateNextScene( )
            }
            else {
                return;
            }
        }
        if ( this.activeScene.type == "CREATE_SPRITE" || this.activeScene.type == "CREATE_CAR" ) {
            if ( this.activeScene.getSpriteByName( ) instanceof Sprite ) {
                this.activateNextScene( );
            }
            else {
                return
            }
        }
        if ( this.activeScene.type == "DELETE_SPRITE" ) {
            if ( !(this.activeScene.getSpriteByName( ) instanceof Sprite) ) {
                this.activateNextScene( );
            }
            else {
                return
            }
        }
        if ( this.activeScene.type == "WAIT" ) {
            if ( this.activeScene.counter.countAndCheckLimit( ) ) {
                this.activateNextScene( );
            }
            else {
                return
            }
        }
    }

    activateNextScene( ) {
        this.iterator++
        if ( this.scenes[this.iterator] ) {
            if ( this.activeScene.type == "SPEAK" || this.activeScene.type == "SPEAK_YES_OR_NO" ) {
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
            case "ON_LEAVE": 
                globals.GAME.switchMap( this.args[0], this.args[1] )
                break;
            case "ON_BATTLE_START": 
                globals.GAME.initializeBattle( this.args[0], this.args[1] );
                break;
            case "ON_NPC_INTERACTION": 
                globals.GAME.activeAction.dismiss( );
                break;
        }
    }

    handleYesOrNoScene( ) {
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
        
        this.activateNextScene( );
    }
}

module.exports = {
    Cinematic
}