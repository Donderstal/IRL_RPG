import { Scene } from './Scene';
import type { CinematicSceneModel } from "../../models/CinematicSceneModel";
import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import type { InteractionModel } from '../../models/InteractionModel';
import type { Sprite } from '../core/Sprite';
import { getSpriteById, getSpriteByName } from '../modules/sprites/spriteGetter';
import { lockSpriteForCutscene, unlockSpriteAfterCutscene } from '../modules/moduleSetter';
import { resetSpriteModuleCounters } from '../modules/moduleHandler';
export class Interaction {
    trigger: CinematicTrigger;
    scenes: CinematicSceneModel[];
    args: any[];
    registeredSelection: InteractionAnswer;
    iterator: number;
    activeScene: Scene;
    ended: boolean;

    model: InteractionModel;
    interactingSprites: Sprite[];
    constructor( model: InteractionModel, trigger: CinematicTrigger, args: string[] ) {
        this.model = model;
        this.scenes = [...model.cinematic];
        this.trigger = trigger;
        this.args   = args;
        this.registeredSelection = null;
        this.iterator = 0;

        this.setInteractingSprites( args )
        this.lockSprites();

        this.activeScene = new Scene( this.scenes[this.iterator], ( this.trigger === CinematicTrigger.interaction ? args[0] : null ) );
        this.ended = false;
    }

    setInteractingSprites( args: string[] ): void {
        this.interactingSprites = []
        const allNameProps = [];

        this.scenes.forEach( ( e ) => { e.forEach( ( a ) => { allNameProps.push( a.spriteName ) } ) } );
        const filteredNames = allNameProps.filter( ( e ) => { return e !== null } );
        filteredNames.forEach( ( e ) => {
            const sprite = getSpriteByName( e );
            if ( sprite !== null && sprite !== undefined ) {
                this.interactingSprites.push( sprite );
            }
        } )
        if ( this.trigger === CinematicTrigger.interaction ) {
            this.interactingSprites.push( getSpriteById(args[0]) )
        }
    }

    lockSprites(): void {
        this.interactingSprites.forEach( ( sprite ) => {
            if ( sprite !== null && sprite !== undefined ) {
                resetSpriteModuleCounters( sprite.spriteId );
                lockSpriteForCutscene( sprite );
            }
        } )
    }

    unlockSprites(): void {
        this.interactingSprites.forEach( ( sprite ) => {
            if ( sprite !== null && sprite !== undefined ) {
                unlockSpriteAfterCutscene( sprite );
            }
        } )
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
            this.unlockSprites();
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