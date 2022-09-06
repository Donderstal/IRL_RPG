import globals from '../../game-data/globals';
import { getUniqueId } from '../../helpers/utilFunctions';
import { Animation } from './Animation';
import type { CinematicSceneModel } from '../../models/CinematicSceneModel';
import type { SceneAnimationModel } from '../../models/SceneAnimationModel';
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
import { hasActiveBubbles } from '../controllers/bubbleController';
import { spriteHasMovement } from '../modules/spriteMovementModule';
import { spriteHasAnimation } from '../modules/animationModule';
import { cameraFocus } from '../cameraFocus';
import { getSpriteById, getSpriteByName } from '../controllers/spriteController';

export class Scene {
    animations: Animation[];
    animationIds: string[];
    finishedAnimations: string[];
    constructor( sceneModel: CinematicSceneModel, spriteId: string ) {
        this.animations = [];
        this.animationIds = [];
        this.finishedAnimations = [];
        console.log(`new scene with ${sceneModel.length} animation`)
        sceneModel.forEach((animationModel: SceneAnimationModel): void => {
            const id = getUniqueId( this.animationIds );
            if ( animationModel.spriteName !== null && animationModel.spriteName !== undefined
                && animationModel.type !== SceneAnimationType.createCar && animationModel.type !== SceneAnimationType.createSprite ) {
                const sprite = getSpriteByName( animationModel.spriteName );
                animationModel.spriteId = sprite.spriteId;
            }
            else if ( spriteId !== null ) {
                animationModel.spriteId = spriteId
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
                    animationHasFinished = !hasActiveBubbles();
                    break;    
                case SceneAnimationType.emote:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case SceneAnimationType.move:
                    animationHasFinished = !spriteHasMovement( e.spriteId );
                    break;
                case SceneAnimationType.animation:
                    animationHasFinished = !spriteHasAnimation( e.spriteId );
                    break;
                case SceneAnimationType.createCar:
                case SceneAnimationType.createSprite:
                    animationHasFinished = e.hasSpriteSet();
                    break;
                case SceneAnimationType.deleteSprite:
                    animationHasFinished = getSpriteById( e.spriteId ) === undefined;
                    break;
                case SceneAnimationType.fadeOut:
                    animationHasFinished = !globals.GAME.fader.fadingToBlack && globals.GAME.fader.holdBlackScreen;
                    break;
                case SceneAnimationType.fadeIn:
                case SceneAnimationType.fadeOutIn:
                    animationHasFinished = !globals.GAME.fader.inFadingAnimation
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
                    animationHasFinished = globals.GAME.activeMapName === e.loadMapScene.mapName;
                    break;
            }
            if ( animationHasFinished ) {
                this.finishedAnimations.push( e.id )
            }
        })
        return this.finishedAnimations.length === this.scenePassAnimations.length;
    }
} 