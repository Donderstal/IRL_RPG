import { Scene } from './Scene';
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
    ended: boolean;

    model: InteractionModel;
    constructor( model: InteractionModel, trigger: CinematicTrigger, args: string[] ) {
        this.model = model;
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.model.cinematic.scenes.length;
        this.registeredSelection = null;
        this.iterator = 0;
        this.activeScene = new Scene( this.model.cinematic.scenes[this.iterator], ( this.trigger === CinematicTrigger.interaction ? args[0] : null ) );
        this.ended = false;
    }

    checkForScenePass( ): void {
        if ( this.activeScene.checkForScenePass( ) ) {
            this.activateNextScene( );
        }
    }

    activateNextScene(): void {
        if ( this.activeScene.containsAnimationType( SceneAnimationType.speakYesNo ) ) {
            this.registerYesOrNoSelection( )
        }
        
        this.iterator++
        this.activeScene.unsetSceneAnimations();
        if ( this.model.cinematic.scenes[this.iterator] ) {
            this.activeScene = new Scene( 
                this.model.cinematic.scenes[this.iterator], 
                ( this.trigger == CinematicTrigger.interaction ? this.args[0] : null )
            );            
        }
        else {
            this.ended = true;
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