import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { initCanvasObjectModel, initGridCellModel } from "../../helpers/modelFactory";
import type {
    AnimateSpriteScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene,
    DeleteSpriteScene, EmoteScene, FadeScene, LoadMapScene, MoveCarScene, MoveScene, SceneAnimationModel,
    SpeakScene, SpeakYesNoScene, WaitScene
} from "../../models/SceneAnimationModel";
import { Counter } from '../../helpers/Counter';
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import type { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import globals from '../../game-data/globals';
import { PLAYER_NAME } from '../../game-data/interactionGlobals';
import { loadCinematicMap } from '../../helpers/loadMapHelpers';
import { getClosestCell } from '../../helpers/utilFunctions';
import { initializeSpriteMovement } from '../modules/spriteMovementModule';
import type { CellPosition } from "../../models/CellPositionModel";
import { MAIN_CHARACTER } from "../../resources/spriteTypeResources";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";

export class Animation {
    id: string;
    model: SceneAnimationModel;
    spriteId: string;
    counter: Counter;
    tileIndex: number;
    walkingToDestination: boolean;
    destination: GridCellModel;
    selection: InteractionAnswer;
    constructor( animationModel: SceneAnimationModel, id: string ) {
        this.id = id;
        this.model = animationModel;
        this.spriteId = this.hasSprite() ? this.getSpriteByName().spriteId : null;

        this.setAction();
    }

    get speakScene(): SpeakScene { return this.model as SpeakScene; }
    get speakYesNoScene(): SpeakYesNoScene { return this.model as SpeakYesNoScene; }
    get emoteScene(): EmoteScene { return this.model as EmoteScene; }
    get moveScene(): MoveScene { return this.model as MoveScene; }
    get moveCarScene(): MoveCarScene { return this.model as MoveCarScene; }
    get animationScene(): AnimateSpriteScene { return this.model as AnimateSpriteScene; }
    get createCarScene(): CreateCarScene { return this.model as CreateCarScene; }
    get createSpriteScene(): CreateSpriteScene { return this.model as CreateSpriteScene; }
    get deleteSpriteScene(): DeleteSpriteScene { return this.model as DeleteSpriteScene; }
    get fadeScene(): FadeScene { return this.model as FadeScene; }
    get waitScene(): WaitScene { return this.model as WaitScene; }
    get cameraMoveToSpriteScene(): CameraMoveToSpriteScene { return this.model as CameraMoveToSpriteScene; }
    get cameraMoveToTileScene(): CameraMoveToTileScene { return this.model as CameraMoveToTileScene; }
    get loadMapScene(): LoadMapScene { return this.model as LoadMapScene; }

    is( value: SceneAnimationType ): boolean {
        return this.model.type == value
    }

    hasSprite(): boolean {
        return this.is( SceneAnimationType.speak ) || this.is( SceneAnimationType.speakYesNo ) || this.is( SceneAnimationType.emote ) 
            || this.is( SceneAnimationType.move ) || this.is( SceneAnimationType.moveCar ) || this.is( SceneAnimationType.animation ) 
            || this.is( SceneAnimationType.deleteSprite ) || this.is( SceneAnimationType.cameraMoveToSprite );
    }

    setAction( ): void {
        let setToSprite = false;
        switch( this.model.type ) {
            case SceneAnimationType.speak:
                setToSprite = true;
                break;
            case SceneAnimationType.speakYesNo:
                setToSprite = true;
                break;
            case SceneAnimationType.emote:
                this.counter = new Counter( 1000 )
                setToSprite = true;
                break;
            case SceneAnimationType.move:
                this.initMoveAnimation( this.moveScene );
                setToSprite = true;
                break;
            case SceneAnimationType.moveCar:
                this.initMoveCarAnimation( this.moveCarScene );
                break;
            case SceneAnimationType.animation: 
                setToSprite = true;
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
                        globals.GAME.sound.playEffect( this.deleteSpriteScene.sfx )                        
                    }
                    globals.GAME.FRONT.deleteSprite( this.spriteId ) 
                }, 250 )
                break;
            case SceneAnimationType.fadeOut:
                globals.GAME.fader.startFadeToBlack(  );
                if ( this.fadeScene.sfx ) {
                    globals.GAME.sound.pauseMusic( );
                    globals.GAME.sound.playEffect( this.fadeScene.sfx )
                }
                break;
            case SceneAnimationType.fadeIn:
                globals.GAME.fader.startFadeFromBlack( );
                break;
            case SceneAnimationType.fadeOutIn:
                globals.GAME.fader.startFadeToBlack( true );
                if ( this.fadeScene.sfx ) {
                    globals.GAME.sound.pauseMusic( );
                    globals.GAME.sound.playEffect( this.fadeScene.sfx )
                }
                break;
            case SceneAnimationType.wait:
                this.counter = new Counter( this.waitScene.milliseconds )
                break;
            case SceneAnimationType.cameraMoveToSprite:
                let sprite = this.getSpriteByName( );
                globals.GAME.cameraFocus.setSpriteFocus( sprite, this.cameraMoveToSpriteScene.snapToSprite );
                break;
            case SceneAnimationType.cameraMoveToTile:
                this.model = this.model as CameraMoveToTileScene
                let tile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.cameraMoveToTileScene.column, this.cameraMoveToTileScene.row );
                this.tileIndex = tile.index;
                globals.GAME.cameraFocus.setTileFocus( tile, this.cameraMoveToTileScene.snapToTile );
                break;
            case SceneAnimationType.loadMap:
                this.model = this.model as LoadMapScene;
                loadCinematicMap( this.loadMapScene.mapName, this.loadMapScene.setPlayerSprite );   
                break;
        }
        if( setToSprite ) {
            this.setAnimToSprite( );            
        }
    }

    initMoveAnimation( sceneModel: MoveScene ): void {
        if ( typeof sceneModel.destination === 'string' || sceneModel.destination instanceof String ) {
            const sprite: Sprite = this.getSpriteById( this.getSpriteByName( sceneModel.spriteName ).spriteId );             
            const cells = [
                initGridCellModel( sprite.column, sprite.row - 1 ),
                initGridCellModel( sprite.column - 1, sprite.row ),
                initGridCellModel( sprite.column + 1, sprite.row ),
                initGridCellModel( sprite.column, sprite.row + 1 ),
            ].filter((cell): boolean =>{ 
                const tileB = globals.GAME.BACK.getTileAtCell( cell.column, cell.row )
                const tileF = globals.GAME.FRONT.getTileAtCell( cell.column, cell.row )
                return !tileB.isBlocked && !globals.GAME.FRONT.tileHasBlockingSprite(tileF.index);
            });

            sceneModel.destination = getClosestCell( this.getSpriteById(), cells );
        }
        this.walkingToDestination = true;    
    }

    initMoveCarAnimation( sceneModel: MoveCarScene ): void {
        let roads = globals.GAME.FRONT.roadNetwork.roads.filter( ( e ) => { return e.model.name == sceneModel.roadName; })
        let road    = roads[0];

        this.destination = road.isHorizontal
            ? { "row": road.model.primaryRow, "column": sceneModel.column }
            : { "row": sceneModel.row, "column": road.model.primaryColumn };
        this.walkingToDestination = true;   
        let car = this.getSpriteByName();
        initializeSpriteMovement( car, this.destination )
    }

    initCreateCarAnimation( sceneModel: CreateCarScene ): void {
        let roads = globals.GAME.FRONT.roadNetwork.roads.filter( ( e ) => { return e.model.name == sceneModel.roadName })
        let roadData = roads[0].getCarDataForTile( true );
        roadData.name = sceneModel.spriteName;
        globals.GAME.FRONT.setVehicleToTile( roadData );
    }

    initCreateSpriteAnimation( sceneModel: CreateSpriteScene ): void {
        if ( sceneModel.spriteName == PLAYER_NAME ) {
            let position: CellPosition = {
                column: sceneModel.column,
                row: sceneModel.row
            };
            globals.GAME.FRONT.initPlayerCharacter( position, MAIN_CHARACTER );
            return;
        }

        const tile = globals.GAME.FRONT.getTileAtCell( sceneModel.column, sceneModel.row );
        const model: CanvasObjectModel = initCanvasObjectModel( {
            type: sceneModel.sprite, direction: sceneModel.direction,
            row: sceneModel.row, column: sceneModel.column, name: sceneModel.spriteName
        } );
        globals.GAME.FRONT.setSprite( tile, model );
    }

    getSpriteCell( ): GridCellModel {
        const sprite: Sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( );
        return { 'row': sprite.row, 'column': sprite.column }
    }

    setAnimToSprite( ): void {
        const sprite: Sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( );
        sprite.setAnimation(this)      
    }

    unsetSpriteAnimation( ): void {
        if ( this.is( SceneAnimationType.deleteSprite ) || this.is( SceneAnimationType.moveCar ) || this.is( SceneAnimationType.loadMap ) 
            || this.is( SceneAnimationType.fadeIn ) || this.is( SceneAnimationType.fadeOut ) || this.is( SceneAnimationType.fadeOutIn )
            || this.is( SceneAnimationType.wait ) ) {
            return;
        }
        
        const sprite: Sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( );
        if ( sprite.animationType !== AnimationTypeEnum.animationLoop ) {
            //sprite.unsetScriptedAnimation( )            
        }
    }

    getSpriteByName( name: string = this.speakScene.spriteName ): Sprite {
        const spriteArray = globals.GAME.FRONT.allSprites.filter( ( e ) => { return e.name == name;} );
        return spriteArray[0];
    }

    getSpriteById( id: string = this.spriteId ): Sprite {
        return this.spriteId == undefined ? globals.GAME.FRONT.spriteDictionary[this.getSpriteByName().spriteId]: globals.GAME.FRONT.spriteDictionary[id];
    }
    
    setSelection( selection: InteractionAnswer ): void {
        this.selection = selection;
    }
} 