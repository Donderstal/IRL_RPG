import globals from '../../game-data/globals';
import controls from '../controls';
import { Scene } from './Scene';
import { switchMap } from '../../helpers/loadMapHelpers';
import type { CinematicSceneModel } from "../../models/CinematicSceneModel";

import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import type { InteractionModel } from '../../models/InteractionModel';
import { initCinematicSceneModel } from '../../helpers/modelFactory';

export class Interaction {
    trigger: CinematicTrigger;
    args: any[];
    numberOfScenes: number;
    registeredSelection: InteractionAnswer;
    iterator: number;
    activeScene: Scene;

    model: InteractionModel;
    constructor( model: InteractionModel, trigger: CinematicTrigger, args: string[] ) {
        controls.clearPressedKeys( globals.GAME.pressedKeys );
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.model.cinematic.scenes.length;
        this.registeredSelection = null;
        this.iterator = 0;
        this.activeScene = new Scene( this.model.cinematic.scenes[this.iterator], (this.trigger === CinematicTrigger.interaction ? args[0] : null) );

        globals.GAME.activateCinematic( this );
    }

    checkForScenePass( ): void {
        if ( this.activeScene.checkForScenePass( ) ) {
            this.activateNextScene( );
        }
    }

    activateNextScene(): void {
        if ( this.activeScene.containsAnimationType( SceneAnimationType.speak ) ) {
            this.registerYesOrNoSelection( )
        }
        
        this.iterator++
        if ( this.model.cinematic.scenes[this.iterator] ) {
            if ( this.activeScene.containsAnimationType( SceneAnimationType.speak )
                || this.activeScene.containsAnimationType( SceneAnimationType.speakYesNo )
                || this.activeScene.containsAnimationType( SceneAnimationType.emote ) ) {
                this.activeScene.unsetSpriteAnimation( )
            }
            this.activeScene = new Scene( 
                this.model.cinematic.scenes[this.iterator], 
                ( this.trigger == CinematicTrigger.interaction ? this.args[0] : false)
            );            
        }
        else {
            this.activeScene.unsetSpriteAnimation( )
            globals.GAME.deActivateCinematic( this );
            globals.GAME.activeCinematic = null;
            this.handleEndOfCinematicTrigger( );
        }
    }

    handleEndOfCinematicTrigger(): void {
        if ( this.trigger === CinematicTrigger.leave ) {
            switchMap( this.args[0], this.args[1] );
        }
        else if ( this.trigger === CinematicTrigger.interaction ) {
            let sprite = globals.GAME.FRONT.spriteDictionary[this.args[0]];
            if ( sprite != undefined ) {
                sprite.State.cinematicOff( sprite );
            }
            globals.GAME.activeAction.dismiss();
        }
    }

    registerYesOrNoSelection(): void {
        let scenesToAdd;
        let animation = this.activeScene.getAnimationByType( SceneAnimationType.speakYesNo );
        this.registeredSelection = animation.selection;
        switch( animation.selection ) {
            case InteractionAnswer.yes:
                scenesToAdd = animation.speakYesNoScene.pathYes;
                break;
            case InteractionAnswer.no:
                scenesToAdd = animation.speakYesNoScene.pathNo;
                break;
            default:
                console.log("Selection has invalid value: " + animation.selection)
        }

        if ( scenesToAdd ) {
            for ( var i = 0; i < scenesToAdd.length; i++ ) {
                let model: CinematicSceneModel = initCinematicSceneModel( scenesToAdd[i] );
                this.model.cinematic.scenes.splice( this.iterator + 1 + i, 0, model )
            }            
        }
    }
}