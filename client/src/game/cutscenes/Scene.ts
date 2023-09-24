import { getUniqueId } from '../../helpers/utilFunctions';
import { Animation } from './Animation';
import type { CutsceneSceneModel } from '../../models/cutscenes/CutsceneSceneModel';
import type { AnimationScene } from '../../models/cutscenes/SceneAnimationModel';
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
import { getMainTextBubble } from '../controllers/bubbleController';
import { spriteHasDestination } from '../modules/destinations/destinationGetter'
import { spriteHasAnimation } from '../modules/animations/animationGetter';
import { cameraFocus } from '../cameraFocus';
import { getSpriteById, getSpriteByName } from "../modules/sprites/spriteGetter";
import { fadedOut, inFadingAnimation } from '../../helpers/faderModule';
import { getActiveMapKey } from '../neighbourhoodModule';
import { screenTextIsActive } from '../../helpers/screenTextModule';

export class Scene {
    animations: Animation[];
    animationIds: string[];
    finishedAnimations: string[];
    constructor( sceneModel: CutsceneSceneModel, spriteId: string ) {
        this.animations = [];
        this.animationIds = [];
        this.finishedAnimations = [];
        sceneModel.forEach( ( animationModel: AnimationScene ): void => {
            const id = getUniqueId( this.animationIds );
            const animation = new Animation( animationModel, id );
            if ( animation.model.spriteName !== null ) {
                const sprite = getSpriteByName( animation.model.spriteName );
                animation.setSpriteKeys( sprite.spriteId, sprite.name );
            }
            else if ( spriteId !== null ) {
                const sprite = getSpriteById( spriteId );
                animation.setSpriteKeys( spriteId, sprite.name );
            }

            animation.setAction();
            this.animations.push( animation );
            this.animationIds.push( id );
        })
    }

    get scenePassAnimations(): Animation[] { return this.animations.filter( ( e ) => { return e.model.waitForAnimationEnd; } ) }

    containsAnimationType( animationType: SceneAnimationType ): boolean {
        let hasType = false;
        this.animations.forEach( ( e: Animation ): void => {
            if( e.is(animationType) ) {
                hasType = true;
            }
        } )
        return hasType;
    }

    getAnimationByType( animationType: SceneAnimationType ): Animation {
        let animation: Animation = null;
        this.animations.forEach( ( e: Animation ): void => {
            if ( e.is( animationType ) ) {
                animation = e;
            }
        } );
        return animation;
    }

    unsetSceneAnimations() {
        this.animations.forEach( ( e ): void => {
            if ( e.hasSpriteSet() && e.model.type !== SceneAnimationType.deleteSprite) {
                e.unsetSpriteAnimation();
            }
        } );
    }

    checkForScenePass( ): boolean {
        let activeAnimations = this.scenePassAnimations.filter((e) => { return this.finishedAnimations.indexOf(e.id) === -1; });
        activeAnimations.forEach( ( e ): void => {
            let animationHasFinished = false;
            switch( e.model.type ) {
                case SceneAnimationType.speak:
                case SceneAnimationType.speakYesNo:
                    animationHasFinished = getMainTextBubble().read;
                    break;    
                case SceneAnimationType.emote:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case SceneAnimationType.move:
                    animationHasFinished = !spriteHasDestination( e.spriteId );
                    break;
                case SceneAnimationType.animation:
                    animationHasFinished = !spriteHasAnimation( e.spriteId );
                    break;
                case SceneAnimationType.createCar:
                case SceneAnimationType.createSprite:
                    animationHasFinished = e.hasSpriteSet();
                    break;
                case SceneAnimationType.deleteSprite:
                    animationHasFinished = getSpriteById( e.spriteId ) === null;
                    break;
                case SceneAnimationType.fadeOut:
                    animationHasFinished = fadedOut();
                    break;
                case SceneAnimationType.fadeIn:
                case SceneAnimationType.fadeOutIn:
                    animationHasFinished = !inFadingAnimation();
                    break;
                case SceneAnimationType.wait:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case SceneAnimationType.cameraMoveToSprite:
                    animationHasFinished = cameraFocus.isFocusedOnSprite( e.spriteId );
                    break;
                case SceneAnimationType.cameraMoveToTile:
                    animationHasFinished = cameraFocus.isFocusedOnTile( e.tileIndex );
                    break;
                case SceneAnimationType.loadMap:
                    animationHasFinished = getActiveMapKey() === e.loadMapScene.mapName;
                    break;
                case SceneAnimationType.screenText:
                    animationHasFinished = !screenTextIsActive();
                    break;
            }
            if ( animationHasFinished ) {
                this.finishedAnimations.push( e.id )
            }
        })
        return this.finishedAnimations.length === this.scenePassAnimations.length;
    }
} 