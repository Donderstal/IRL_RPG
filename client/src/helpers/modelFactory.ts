import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import type { SpawnPointModel } from "../models/SpawnPointModel";
import type { RoadModel } from "../models/RoadModel";
import type { DoorModel } from "../models/DoorModel";
import type { TileModel } from "../models/TileModel";
import type { MapModel } from "../models/MapModel";
import type { CinematicModel } from "../models/CinematicModel";
import type { ConditionModel } from "../models/ConditionModel";
import type { ConditionType } from "../enumerables/ConditionTypeEnum";
import type { CinematicSceneModel } from "../models/CinematicSceneModel";
import type {
    AnimateSpriteScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene, DeleteSpriteScene,
    EmoteScene, FadeScene, LoadMapScene, MoveScene, SceneAnimationModel, SpeakScene, SpeakYesNoScene, WaitScene
} from "../models/SceneAnimationModel";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import type { InteractionModel } from "../models/InteractionModel";
import type { GraphicEffectModel } from "../models/GraphicEffectModel";
import type { SpriteFrameModel } from "../models/SpriteFrameModel";
import type { ItemModel } from "../models/ItemModel";
import type { GridCellModel } from "../models/GridCellModel";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import { getDataModelByKey } from "../resources/spriteDataResources";

export const initMapModel = ( mapData ): MapModel => {
    const mapModel: MapModel = {
        name: mapData.mapName,
        columns: mapData.columns,
        rows: mapData.rows,

        tileSet: mapData.tileSet,
        outdoors: mapData.outdoors,
        music: mapData.music,

        grid: mapData.grid.map( ( tile ): TileModel => { return initTileModel( tile ) } ),
        frontGrid: mapData.frontGrid != undefined
            ? mapData.frontGrid.map( ( tile ): TileModel => { return initTileModel( tile ) } )
            : mapData.grid.map( (): TileModel => { return initTileModel( {id: null, angle: 0, mirrored: false} ) } ),

        sprites: mapData.sprites.map( ( spriteDto ): CanvasObjectModel => { return initCanvasObjectModel( spriteDto ) } ),
        frontSprites: mapData.sprites.map( ( spriteDto ): CanvasObjectModel => { return initCanvasObjectModel( spriteDto ) } ),

        doors: mapData.doors != undefined
            ? mapData.doors.map( ( door ): DoorModel => { return initDoorModel( door ) } )
            : [],
        actions: mapData.actions != undefined
            ? mapData.actions.map( ( actionList ): InteractionModel[] => { return actionList.map( initInteractionModel ); } )
            : [],

        playerStart: mapData.playerStart
    };
    return mapModel;
}

export const initNeighbourhoodModel = ( neighbourhoodData ): NeighbourhoodModel => {
    let mapDictionary = {};
    Object.keys(neighbourhoodData.mapDictionary).forEach( ( key ) => {
        mapDictionary[key] = initMapModel( neighbourhoodData.mapDictionary[key] );
    } )
    const neighbourhoodModel: NeighbourhoodModel = {
        name: neighbourhoodData.name,
        music: neighbourhoodData.music,
        horizontalSlots: neighbourhoodData.horizontal_slots,
        verticalSlots: neighbourhoodData.vertical_slots,

        characterTypes: neighbourhoodData.characters,
        characterSpawnRate: neighbourhoodData.characters_spawn_rate,
        carTypes: neighbourhoodData.cars,
        carSpawnRate: neighbourhoodData.cars_spawn_rate,

        spawnableActions: neighbourhoodData.spawnable_actions,

        mapDictionary: mapDictionary,
        roads: neighbourhoodData.roads != undefined
            ? neighbourhoodData.roads.map( ( road ): RoadModel => { return initRoadModel( road ) } )
            : [],
        spawnPoints: neighbourhoodData.spawnPoints != undefined
            ? neighbourhoodData.spawnPoints.map( ( spawnPoint ): SpawnPointModel => { return initSpawnPointModel( spawnPoint ) } )
            : []
    };
    return neighbourhoodModel;
}

export const initTileModel = ( tileData ): TileModel => {
    const tileModel: TileModel = {
        id: tileData !== "E" ? tileData.id : null,
        angle: tileData !== "E" ? tileData.angle : 0,
        mirrored: tileData !== "E" ? tileData.mirrored : false

    };
    return tileModel;
}

export const initRoadModel = ( roadData ): RoadModel => {
    const roadModel: RoadModel = {
        direction: roadData.direction,
        alignment: roadData.alignment,
        hasStart: roadData.hasStart,
        name: roadData.name,
        primaryColumn: roadData.primaryColumn,
        secondaryColumn: roadData.secondaryColumn,
        primaryRow: roadData.primaryRow,
        secondaryRow: roadData.secondaryRow,
    };
    return roadModel;
}

export const initSpawnPointModel = ( spawnPointData ): SpawnPointModel => {
    const spawnPointModel: SpawnPointModel = {
        row: spawnPointData.row,
        column: spawnPointData.column,
        direction: spawnPointData.direction
    };
    return spawnPointModel;
}

export const initCanvasObjectModel = ( objectData ): CanvasObjectModel => {
    const model: CanvasObjectModel = {
        type: objectData.type,
        row: objectData.row,
        column: objectData.column,

        hasCondition: objectData.condition !== undefined,
        hasAction: objectData.action !== undefined,
        hasDoor: objectData.destination !== undefined,
        spriteDataModel: getDataModelByKey( objectData.type ),

        name: objectData.name,
        direction: objectData.direction,
        animationType: objectData.anim_type,
        animationName: objectData.anim_name,
        movementType: objectData.move_type,
        sfx: objectData.sfx
    }

    if ( model.hasAction ) {
        model.action = objectData.action.map(initInteractionModel);
    }
    if ( model.hasCondition ) {
        model.condition = initConditionModel( objectData.condition );
    }
    if ( model.hasDoor ) {
        model.door = initDoorModel( { doorTo: objectData.doorTo, direction: objectData.directionIn } );
    }
    if ( objectData.destination !== undefined )
        model.destination = objectData.destination;
    return model;
}

export const initDoorModel = ( doorData ): DoorModel => {
    const doorModel: DoorModel = {
        row: doorData.row,
        column: doorData.column,
        doorTo: doorData.doorTo,
        direction: doorData.direction
    };
    return doorModel;
}

export const initInteractionModel = ( interactionData ): InteractionModel => {
    const model: InteractionModel = {
        type: interactionData[0],
        shouldBeRegistered: interactionData[1],
        registryKey: interactionData[2],
        sfx: interactionData[3],
        condition: initConditionModel( interactionData[4] ),
        cinematic: initCinematicModel( interactionData[5] )
    }
    return model
}

export const initCinematicModel = ( cinematicData ): CinematicModel => {
    const model: CinematicModel = {
        scenes: cinematicData.map( initCinematicSceneModel )
    }
    return model;
}

export const initConditionModel = ( conditionData ): ConditionModel => {
    const model: ConditionModel = {
        type: conditionData[0] as ConditionType,
        value: conditionData[1]
    }
    return model;
}

export const initCinematicSceneModel = ( sceneData ): CinematicSceneModel => {
    const model: CinematicSceneModel = sceneData.map( ( e ): SceneAnimationModel => {
        return initSceneAnimationModel( e );
    } );
    return model;
}

export const initSceneAnimationModel = ( animationData ): SceneAnimationModel => {
    const type = animationData[0] as SceneAnimationType;
    var model: SceneAnimationModel = {
        type: type,
        waitForAnimationEnd: animationData[1]
    };
    var typedModel = null;
    switch ( type ) {
        case SceneAnimationType.speak:
            typedModel = model as SpeakScene;
            typedModel.text = animationData[2];
            typedModel.spriteName = animationData[3];
            typedModel.speakWith = animationData[4];
            typedModel.sfx = animationData[5];
            break;
        case SceneAnimationType.speakYesNo:
            typedModel = model as SpeakYesNoScene;
            typedModel.text = animationData[2];
            typedModel.pathYes = animationData[3];
            typedModel.pathNo = animationData[4];
            typedModel.spriteName = animationData[5];
            typedModel.speakWith = animationData[6];
            typedModel.sfx = animationData[7];
            break;
        case SceneAnimationType.emote:
            typedModel = model as EmoteScene;
            typedModel.src = animationData[2];
            typedModel.spriteName = animationData[3];
            typedModel.speakWith = animationData[2];
            typedModel.sfx = animationData[3];
            break;
        case SceneAnimationType.move:
            typedModel = model as MoveScene;
            typedModel.spriteName = animationData[2];
            typedModel.destination = animationData[3];
            break;
        case SceneAnimationType.animation:
            typedModel = model as AnimateSpriteScene;
            typedModel.animationName = animationData[2];
            typedModel.spriteName = animationData[3];
            typedModel.loop = animationData[4];
            typedModel.isPermanent = animationData[5];
            break;
        case SceneAnimationType.createCar:
            typedModel = model as CreateCarScene;
            typedModel.sprite = animationData[2];
            typedModel.spriteName = animationData[3];
            typedModel.roadName = animationData[4];
            break;
        case SceneAnimationType.createSprite:
            typedModel = model as CreateSpriteScene;
            typedModel.direction = animationData[2];
            typedModel.sprite = animationData[3];
            typedModel.spriteName = animationData[4];
            typedModel.column = animationData[5];
            typedModel.row = animationData[6];
            break;
        case SceneAnimationType.deleteSprite:
            typedModel = model as DeleteSpriteScene;
            typedModel.spriteName = animationData[2];
            typedModel.sfx = animationData[3]
            break;
        case SceneAnimationType.fadeOut:
        case SceneAnimationType.fadeIn:
        case SceneAnimationType.fadeOutIn:
            typedModel = model as FadeScene;
            typedModel.sfx = animationData[2];
            break;
        case SceneAnimationType.wait:
            typedModel = model as WaitScene;
            typedModel.milliseconds = animationData[2];
            break;
        case SceneAnimationType.cameraMoveToSprite:
            typedModel = model as CameraMoveToSpriteScene;
            typedModel.spriteName = animationData[2];
            typedModel.snapToSprite = animationData[3];
            break;
        case SceneAnimationType.cameraMoveToTile:
            typedModel = model as CameraMoveToTileScene;
            typedModel.column = animationData[2];
            typedModel.row = animationData[3];
            typedModel.snapToTile = animationData[4];
            break;
        case SceneAnimationType.loadMap:
            typedModel = model as LoadMapScene;
            typedModel.mapName = animationData[2];
            typedModel.setPlayerSprite = animationData[3];
            typedModel.playerStart = animationData[4];
            break;
    }
    return typedModel;
}

export const initSpriteFrameModel = ( frameData ): SpriteFrameModel => {
    const model: SpriteFrameModel = {
        x: frameData.x,
        y: frameData.y,
        width: frameData.width,
        height: frameData.height,
        direction: frameData.direction
    }
    return model;
}

export const initGraphicEffectModel = ( effectData ): GraphicEffectModel => {
    const model: GraphicEffectModel = {
        src: effectData.src,
        widthInBlocks: effectData.widthInBlocks,
        heightInBlocks: effectData.heightInBlocks,
        frameWidth: effectData.frameWidth,
        frameHeight: effectData.frameHeight,
        frames: effectData.frames.map( ( e ) => {
            return initSpriteFrameModel( {
                ...e, width: effectData.frameWidth, height: effectData.frameHeight
            } )
        } )
    }
    return model;
}

export const initItemModel = ( itemData ): ItemModel => {
    const model: ItemModel = {
        name: itemData.name,
        key: itemData.key,
        category: itemData.category,
        png: itemData.png,
        description: itemData.description
    }
    return model;
}

export const initGridCellModel = ( column: number, row: number ): GridCellModel => {
    const model: GridCellModel = {
        row: row,
        column: column
    }
    return model;
}