import { Scene } from './Scene';
import type { CinematicSceneModel } from "../../models/CinematicSceneModel";
import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import type { InteractionModel } from '../../models/InteractionModel';
export class Interaction {
    trigger: CinematicTrigger;
    scenes: CinematicSceneModel[];
    args: any[];
    registeredSelection: InteractionAnswer;
    iterator: number;
    activeScene: Scene;
    ended: boolean;

    model: InteractionModel;
    constructor( model: InteractionModel, trigger: CinematicTrigger, args: string[] ) {
        this.model = model;
        this.scenes = [...model.cinematic];
        this.trigger = trigger;
        this.args   = args;
        this.registeredSelection = null;
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator], ( this.trigger === CinematicTrigger.interaction ? args[0] : null ) );
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
        if ( this.scenes[this.iterator] ) {
            this.activeScene = new Scene( 
                this.scenes[this.iterator], 
                ( this.trigger == CinematicTrigger.interaction ? this.args[0] : null )
            );            
        }
        else {
            this.ended = true;
        }
    }

    registerYesOrNoSelection(): void {
        let scenesToAdd = null;
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

        if ( scenesToAdd != null) {
            for ( var i = 0; i < scenesToAdd.length; i++ ) {
                this.scenes.splice( this.iterator + 1 + i, 0, scenesToAdd[i] )
            }            
        }
    }
}