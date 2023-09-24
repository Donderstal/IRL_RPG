import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { initCanvasObjectModel, initGridCellModel } from "../../factories/modelFactory";
import type {
    AnimateSpriteScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene,
    DeleteSpriteScene, EmoteScene, FadeScene, LoadMapScene, MoveScene, AnimationScene,
    SpeakScene, SpeakYesNoScene, WaitScene, ScreenTextScene
} from "../../models/cutscenes/SceneAnimationModel";
import { Counter } from '../../helpers/Counter';
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import type { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { PLAYER_ID, PLAYER_NAME } from '../../game-data/interactionGlobals';
import { getClosestCell, getSpriteFacingTowardsTargetDirection } from '../../helpers/utilFunctions';
import type { CellPosition } from "../../models/CellPositionModel";
import { MAIN_CHARACTER } from "../../resources/spriteTypeResources";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
import { setNewBubble, setNewEmote } from "../controllers/bubbleController";
import { destroySpriteAnimation, initializeSpriteAnimation } from "../modules/animations/animationSetter";
import { spriteHasAnimation } from "../modules/animations/animationGetter";
import { cameraFocus } from "../cameraFocus";
import { DestinationType } from "../../enumerables/DestinationType";
import { scheduleSpriteForDeletion } from "../modules/sprites/spriteSetter";
import { getSpriteById, getSpriteByName } from "../modules/sprites/spriteGetter";
import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { setSpriteAndSpriteModules, initializeSpriteMovement } from "../modules/moduleSetter";
import { ANIM_TALK } from "../../game-data/animationGlobals";
import { startFadeFromBlack, startFadeToBlack } from "../../helpers/faderModule";
import { pauseMusic, playEffect } from "../sound/sound";
import { getBackSpritesGrid, getBackTilesGrid, getTileOnCanvasByCell } from "../canvas/canvasGetter";
import { switchMap } from '../../helpers/loadMapHelpers';
import { getActiveMapKey } from "../neighbourhoodModule";
import { setPlayerStartForCinematic } from "../map/playerLocationOnMapLoad";
import { PlayerMapEntry } from "../../enumerables/PlayerMapEntryEnum";
import { getAssociatedHitbox } from "../modules/hitboxes/hitboxGetter";
import { setScreenTextToCanvas } from "../../helpers/screenTextModule";
import { MAX_BUBBLE_TEXT_WIDTH } from "../../game-data/globals";
import { tryFindPath } from "../map/pathfinder";
import { tileIsValidDestination } from "../map/blockedTilesRegistry";

export class Animation {
    id: string;
    model: AnimationScene;
    spriteId: string;
    spriteName: string;
    counter: Counter;
    tileIndex: number;
    destination: GridCellModel;
    selection: InteractionAnswer;
    constructor( animationModel: AnimationScene, id: string ) {
        this.id = id;
        this.model = animationModel;
    }

    get speakScene(): SpeakScene { return this.model as SpeakScene; }
    get speakYesNoScene(): SpeakYesNoScene { return this.model as SpeakYesNoScene; }
    get emoteScene(): EmoteScene { return this.model as EmoteScene; }
    get moveScene(): MoveScene { return this.model as MoveScene; }
    get animationScene(): AnimateSpriteScene { return this.model as AnimateSpriteScene; }
    get createCarScene(): CreateCarScene { return this.model as CreateCarScene; }
    get createSpriteScene(): CreateSpriteScene { return this.model as CreateSpriteScene; }
    get deleteSpriteScene(): DeleteSpriteScene { return this.model as DeleteSpriteScene; }
    get fadeScene(): FadeScene { return this.model as FadeScene; }
    get waitScene(): WaitScene { return this.model as WaitScene; }
    get cameraMoveToSpriteScene(): CameraMoveToSpriteScene { return this.model as CameraMoveToSpriteScene; }
    get cameraMoveToTileScene(): CameraMoveToTileScene { return this.model as CameraMoveToTileScene; }
    get loadMapScene(): LoadMapScene { return this.model as LoadMapScene; }
    get screenTextScene(): ScreenTextScene { return this.model as ScreenTextScene; }

    get sprite(): Sprite { return getSpriteById(this.spriteId); }

    is( value: SceneAnimationType ): boolean {
        return this.model.type == value
    }

    hasSpriteSet() {
        return this.spriteId !== null && this.spriteId !== undefined;
    }

    setSpriteKeys(id: string, name: string) {
        this.spriteId = id;
        this.spriteName = name;
    }

    setAction( ): void {
        switch( this.model.type ) {
            case SceneAnimationType.speak:
            case SceneAnimationType.speakYesNo:
                this.initSpeakAnimation( this.model.type );
                break;
            case SceneAnimationType.emote:
                this.initEmoteAnimation();
                break;
            case SceneAnimationType.move:
                this.initMoveAnimation( this.moveScene );
                break;
            case SceneAnimationType.animation: 
                this.initAnimationAnimation( this.animationScene );
                break;
            case SceneAnimationType.createCar:
                this.initCreateCarAnimation( this.createCarScene );
                break;
            case SceneAnimationType.createSprite:
                this.initCreateSpriteAnimation( this.createSpriteScene );
                break;
            case SceneAnimationType.deleteSprite:
                setTimeout( ( ) => { 
                    if ( this.deleteSpriteScene.sfx ) {
                        playEffect( this.deleteSpriteScene.sfx )                        
                    }
                    scheduleSpriteForDeletion( this.spriteId, true );
                }, 250 )
                break;
            case SceneAnimationType.fadeOut:
                startFadeToBlack( this.fadeScene.targetOpacity ?? 1 );
                if ( this.fadeScene.sfx ) {
                    pauseMusic( );
                    playEffect( this.fadeScene.sfx )
                }
                break;
            case SceneAnimationType.fadeIn:
                startFadeFromBlack( this.fadeScene.targetOpacity ?? 0 );
                break;
            case SceneAnimationType.fadeOutIn:
                startFadeToBlack( this.fadeScene.targetOpacity ?? 1, true );
                if ( this.fadeScene.sfx ) {
                    pauseMusic( );
                    playEffect( this.fadeScene.sfx )
                }
                break;
            case SceneAnimationType.wait:
                this.counter = new Counter( this.waitScene.milliseconds )
                break;
            case SceneAnimationType.cameraMoveToSprite:
                cameraFocus.setSpriteFocus( this.sprite, this.cameraMoveToSpriteScene.snapToSprite );
                break;
            case SceneAnimationType.cameraMoveToTile:
                let tile = getTileOnCanvasByCell( this.cameraMoveToTileScene, CanvasTypeEnum.backSprites );
                this.tileIndex = tile.index;
                cameraFocus.setTileFocus( tile, this.cameraMoveToTileScene.snapToTile );
                break;
            case SceneAnimationType.loadMap:
                if ( this.loadMapScene.setPlayerSprite ) {
                    setPlayerStartForCinematic( getActiveMapKey() , this.loadMapScene.playerStart);
                }
                switchMap( this.loadMapScene.mapName, PlayerMapEntry.cinematic, null, this.loadMapScene.setPlayerSprite, this.loadMapScene.focusTile );
                break;
            case SceneAnimationType.screenText:
                setScreenTextToCanvas( this.screenTextScene.text, this.screenTextScene.title, this.screenTextScene.maxWidth == null ? MAX_BUBBLE_TEXT_WIDTH : this.screenTextScene.maxWidth );
                break;
        }
    }

    initSpeakAnimation( type: SceneAnimationType ): void {
        const model = type === SceneAnimationType.speak ? this.model as SpeakScene : this.model as SpeakYesNoScene;
        setNewBubble( model.text, type, model.sfx ?? this.sprite.sfx ?? "medium-text-blip.ogg", this.spriteName, this.sprite.model );
        if ( model.speakWith !== null && model.speakWith !== undefined ) {
            const targetSprite = getSpriteByName( model.speakWith );

            const speakerHitbox = getAssociatedHitbox( this.spriteId );
            const targetHitbox = getAssociatedHitbox( targetSprite.spriteId );

            this.sprite.setDirection( getSpriteFacingTowardsTargetDirection( speakerHitbox, targetHitbox ) );
            targetSprite.setDirection( getSpriteFacingTowardsTargetDirection( targetHitbox, speakerHitbox ) );
        }
        initializeSpriteAnimation( this.sprite, ANIM_TALK, { looped: true, loops: 0 } );
    }

    initEmoteAnimation(): void {
        this.counter = new Counter( 1000 );
        setNewEmote( { x: this.sprite.x, y: this.sprite.y }, this.emoteScene.src )
    }

    initMoveAnimation( sceneModel: MoveScene ): void {
        const backTiles = getBackTilesGrid();
        if ( typeof sceneModel.destination === 'string' || sceneModel.destination instanceof String ) {
            const targetSprite = getSpriteByName( sceneModel.destination as string );             
            const cells = [
                initGridCellModel( targetSprite.column, targetSprite.row - 1 ),
                initGridCellModel( targetSprite.column - 1, targetSprite.row ),
                initGridCellModel( targetSprite.column + 1, targetSprite.row ),
                initGridCellModel( targetSprite.column, targetSprite.row + 1 ),
            ].filter( tileIsValidDestination );
            sceneModel.destination = getClosestCell( this.sprite, cells );
        }


        const start = backTiles.getTileAtCell( this.sprite.column, this.sprite.row );
        const destination = backTiles.getTileAtCell( sceneModel.destination.column, sceneModel.destination.row );

        const path = tryFindPath( start , destination );
        initializeSpriteMovement( path, DestinationType.cinematic, this.sprite, sceneModel.destination )
    }

    initAnimationAnimation( sceneModel: AnimateSpriteScene ): void {
        initializeSpriteAnimation( this.sprite, sceneModel.animationName, { looped: sceneModel.loop, loops: 0 } );
    }

    initCreateCarAnimation( sceneModel: CreateCarScene ): void {
        let road = getBackSpritesGrid().roadNetwork.roads.filter( ( e ) => { return e.model.name == sceneModel.roadName } )[0];
        let startCell = road.getRoadStartPosition();
        let model = initCanvasObjectModel( {
            column: startCell.column, row: startCell.row,
            type: sceneModel.sprite, name: sceneModel.spriteName,
            direction: road.model.direction
        } );
        this.spriteId = setSpriteAndSpriteModules( model, CanvasTypeEnum.backSprites );
    }

    initCreateSpriteAnimation( sceneModel: CreateSpriteScene ): void {
        if ( sceneModel.spriteName == PLAYER_NAME ) {
            let position: CellPosition = {
                column: sceneModel.column,
                row: sceneModel.row,
                direction: sceneModel.direction
            };
            getBackSpritesGrid().initPlayerCharacter( position, MAIN_CHARACTER );
            this.spriteId = PLAYER_ID;
        }
        else {
            const model: CanvasObjectModel = initCanvasObjectModel( {
                type: sceneModel.sprite, direction: sceneModel.direction,
                row: sceneModel.row, column: sceneModel.column, name: sceneModel.spriteName
            } );
            this.spriteId = setSpriteAndSpriteModules( model, CanvasTypeEnum.backSprites );
        }
    }

    unsetSpriteAnimation(): void {
        if ( spriteHasAnimation( this.sprite.spriteId ) && !this.animationScene.isPermanent ) {
            destroySpriteAnimation( this.sprite );
        }
        if ( this.sprite.animationType === AnimationTypeEnum.animationLoop ) {
            initializeSpriteAnimation( this.sprite, this.sprite.animationName, { looped: true, loops: null } );
        }
    }
    
    setSelection( selection: InteractionAnswer ): void {
        this.selection = selection;
    }
} 