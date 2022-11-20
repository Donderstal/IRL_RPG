import { getUniqueId } from '../../helpers/utilFunctions';
import { Animation } from './Animation';
import type { CinematicSceneModel } from '../../models/CinematicSceneModel';
import type { SceneAnimationModel } from '../../models/SceneAnimationModel';
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
import { getMainTextBubble } from '../controllers/bubbleController';
import { spriteHasDestination } from '../modules/destinations/destinationGetter'
import { spriteHasAnimation } from '../modules/animations/animationGetter';
import { cameraFocus } from '../cameraFocus';
import { getSpriteById, getSpriteByName } from "../modules/sprites/spriteGetter";
import { fadedOut, inFadingAnimation } from '../../helpers/faderModule';
import { getActiveMapKey } from '../neighbourhoodModule';

export class Scene {
    animations: Animation[];
    animationIds: string[];
    finishedAnimations: string[];
    constructor( sceneModel: CinematicSceneModel, spriteId: string ) {
        this.animations = [];
        this.animationIds = [];
        this.finishedAnimations = [];
        console.log(`new scene with ${sceneModel.length} animations`)
        sceneModel.forEach( ( animationModel: SceneAnimationModel ): void => {
            console.log( `new animation with type ${animationModel.type}` )
            const id = getUniqueId( this.animationIds );
            if ( animationModel.spriteName !== null && animationModel.spriteName !== undefined
                && animationModel.type !== SceneAnimationType.createCar && animationModel.type !== SceneAnimationType.createSprite ) {
                const sprite = getSpriteByName( animationModel.spriteName );
                animationModel.spriteId = sprite.spriteId !== spriteId ? sprite.spriteId : spriteId;
            }
            else if ( spriteId !== null ) {
                const sprite = getSpriteById( spriteId );
                animationModel.spriteId = spriteId;
                animationModel.spriteName = sprite.name;
            }
            this.animations.push(new Animation(animationModel, id));
            this.animationIds.push(id);
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
            }
            if ( animationHasFinished ) {
                this.finishedAnimations.push( e.id )
            }
        })
        return this.finishedAnimations.length === this.scenePassAnimations.length;
    }
} 