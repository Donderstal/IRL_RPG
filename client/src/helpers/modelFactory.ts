import type { CharacterModel } from "../models/CharacterModel";
import type { MapObjectModel } from "../models/MapObjectModel";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import type { SpawnPointModel } from "../models/SpawnPointModel";
import type { RoadModel } from "../models/RoadModel";
import type { DoorModel } from "../models/DoorModel";
import type { TileModel } from "../models/TileModel";
import type { MapModel } from "../models/MapModel";
import { RoadAlignmentEnum } from "../enumerables/RoadAlignmentEnum";
import type { CinematicModel } from "../models/CinematicModel";
import type { ConditionModel } from "../models/ConditionModel";
import type { ConditionType } from "../enumerables/ConditionTypeEnum";
import type { CinematicSceneModel } from "../models/CinematicSceneModel";
import type { AnimateSpriteScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene, DeleteSpriteScene, EmoteScene, FadeScene, LoadMapScene, MoveCarScene, MoveScene, SceneAnimationModel, SpeakScene, SpeakYesNoScene, WaitScene } from "../models/SceneAnimationModel";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";
import type { InteractionModel } from "../models/InteractionModel";

export const initMapModel = ( mapData ): MapModel => {
    const mapModel: MapModel = {
        name: mapData.name == undefined ? mapData.mapName : mapData.name,
        columns: mapData.columns == undefined ? mapData.cols : mapData.columns,
        rows: mapData.rows,

        tileSet: mapData.tileSet,
        outdoors: mapData.outdoors,
        music: mapData.music,

        grid: mapData.grid.map( ( tile ): TileModel => { return initTileModel( tile ) } ),
        frontGrid: mapData.frontGrid != undefined
            ? mapData.frontGrid.map( ( tile ): TileModel => { return initTileModel( tile ) } )
            : mapData.grid.map( (): TileModel => { return initTileModel( "E" ) } ),

        characters: mapData.characters != undefined
            ? mapData.characters.map( ( character ): CharacterModel => { return initCharacterModel( character ) } )
            : [],
        mapObjects: mapData.mapObjects != undefined
            ? mapData.mapObjects.map( ( mapObject ): MapObjectModel => { return initMapObjectModel( mapObject ) } )
            : [],
        frontCharacters: mapData.frontCharacters != undefined
            ? mapData.frontCharacters.map( ( character ): CharacterModel => { return initCharacterModel( character ) } )
            : [],
        frontMapObjects: mapData.frontMapObjects != undefined
            ? mapData.frontMapObjects.map( ( mapObject ): MapObjectModel => { return initMapObjectModel( mapObject ) } )
            : [],

        spawnPoints: mapData.spawnPoints != undefined
            ? mapData.spawnPoints.map( ( spawnPoint ): SpawnPointModel => { return initSpawnPointModel( spawnPoint ) } )
            : [],
        roads: mapData.roads != undefined
            ? mapData.roads.map( ( road ): RoadModel => { return initRoadModel( road ) } )
            : [],
        doors: mapData.doors != undefined
            ? mapData.doors.map( ( door ): DoorModel => { return initDoorModel( door ) } )
            : []
    };
    return mapModel;
}

export const initNeighbourhoodModel = ( neighbourhoodData ): NeighbourhoodModel => {
    let mapDictionary = {};
    Object.keys(neighbourhoodData.mapDictionary).forEach( ( key ) => {
        mapDictionary[key] = initMapModel( neighbourhoodData.mapDictionary [key] );
    } )
    const neighbourhoodModel: NeighbourhoodModel = {
        name: neighbourhoodData.name,

        horizontalSlots: neighbourhoodData.horizontal_slots,
        verticalSlots: neighbourhoodData.vertical_slots,

        mapDictionary: mapDictionary
    };
    return neighbourhoodModel;
}

export const initTileModel = ( tileData ): TileModel => {
    const isDataObject = typeof tileData !== "string" && typeof tileData !== "number"
    const tileModel: TileModel = {
        id: isDataObject ? tileData.id : tileData,
        angle: isDataObject ? tileData.angle : 0,
        mirrored: isDataObject ? tileData.mirrored : false,

    };
    return tileModel;
}

export const initRoadModel = ( roadData ): RoadModel => {
    const roadModel: RoadModel = {
        direction: roadData.direction,
        alignment: roadData.alignment,
        hasStart: roadData.hasStart,

        primaryColumn: roadData.primaryColumn == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.startCol
                : roadData.leftCol
            : roadData.primaryColumn,
        secondaryColumn: roadData.secondaryColumn == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.endCol
                : roadData.rightCol
            : roadData.secondaryColumn,

        primaryRow: roadData.primaryRow == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.startRow
                : roadData.topRow
            : roadData.primaryRow,
        secondaryRow: roadData.secondaryRow == undefined ?
            roadData.alignment == RoadAlignmentEnum.horizontal
                ? roadData.endRow
                : roadData.bottomRow
            : roadData.secondaryRow,
    };
    return roadModel;
}

export const initSpawnPointModel = ( spawnPointData ): SpawnPointModel => {
    const spawnPointModel: SpawnPointModel = {
        row: spawnPointData.row,
        column: spawnPointData.column == undefined ? spawnPointData.col : spawnPointData.column,
        direction: spawnPointData.direction
    };
    return spawnPointModel;
}

export const initCharacterModel = ( characterData ): CharacterModel => {
    const characterModel: CharacterModel = {
        animation_type: characterData.anim_type,
        sprite: characterData.sprite,
        row: characterData.row,
        column: characterData.column == undefined ? characterData.col : characterData.column,
        direction: directionStringHelper( characterData.direction )
    };
    return characterModel;
}

export const initMapObjectModel = ( mapObjectData ): MapObjectModel => {
    const mapObjectModel: MapObjectModel = {
        type: mapObjectData.type,
        row: mapObjectData.row,
        column: mapObjectData.column == undefined ? mapObjectData.col : mapObjectData.column,
        direction: mapObjectData.direction == undefined ? DirectionEnum.down : directionStringHelper( mapObjectData.direction )
    };
    return mapObjectModel;
}

export const initDoorModel = ( doorData ): DoorModel => {
    const doorModel: DoorModel = {
        row: doorData.row,
        column: doorData.column == undefined ? doorData.col : doorData.column,
        destination: doorData.destination,
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
        cinematic: initCinematicModel( interactionData[5] )
    }
    return model
}

export const initCinematicModel = ( cinematicData ): CinematicModel => {
    const model: CinematicModel = {
        condition: initConditionModel( cinematicData.condition ),
        scenes: cinematicData.scenes.map( initCinematicSceneModel )
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
    const model: CinematicSceneModel = sceneData.map( ( e ): SceneAnimationModel[] => { return e.map( initSceneAnimationModel ) }  );
    return model;
}

export const initSceneAnimationModel = ( animationData ): SceneAnimationModel => {
    const type = animationData[0] as SceneAnimationType;
    switch ( type ) {
        case SceneAnimationType.speak:
            var speak: SpeakScene = {
                type: type,
                text: animationData[1],
                spriteName: animationData[2],
                speakWith: animationData[3],
                sfx: animationData[4]
            }
            return speak;
        case SceneAnimationType.speakYesNo:
            var speakYesNo: SpeakYesNoScene = {
                type: type,
                text: animationData[1],
                pathYes: animationData[2],
                pathNo: animationData[3],
                spriteName: animationData[4],
                speakWith: animationData[5],
                sfx: animationData[6]
            }
            return speakYesNo;
        case SceneAnimationType.emote:
            var emote: EmoteScene = {
                type: type,
                src: animationData[1],
                spriteName: animationData[2],
                speakWith: animationData[3],
                sfx: animationData[4]
            }
            return emote;
        case SceneAnimationType.move:
            var move: MoveScene = {
                type: type,
                spriteName: animationData[1],
                destination: animationData[2]
            }
            return move;
        case SceneAnimationType.moveCar:
            var moveCar: MoveCarScene = {
                type: type,
                column: animationData[1],
                row: animationData[2],
                spriteName: animationData[3],
                direction: animationData[4]
            }
            return moveCar;
        case SceneAnimationType.animation:
            var animation: AnimateSpriteScene = {
                type: type,
                animationName: animationData[1],
                spriteName: animationData[2],
                loop: animationData[3]
            }
            return animation;
        case SceneAnimationType.createCar:
            var createCar: CreateCarScene = {
                type: type,
                sprite: animationData[1],
                spriteName: animationData[2],
                roadName: animationData[3]
            }
            return createCar;
        case SceneAnimationType.createCharacter:
        case SceneAnimationType.createObjectSprite:
            var createSprite: CreateSpriteScene = {
                type: type,
                direction: animationData[1],
                sprite: animationData[2],
                spriteName: animationData[3],
                column: animationData[4],
                row: animationData[5]
            }
            return createSprite;
        case SceneAnimationType.deleteSprite:
            var deleteSprite: DeleteSpriteScene = {
                type: type,
                spriteName: animationData[1],
                sfx: animationData[2]
            }
            return deleteSprite;
        case SceneAnimationType.fadeOut:
        case SceneAnimationType.fadeIn:
        case SceneAnimationType.fadeOutIn:
            var fade: FadeScene = {
                type: type,
                sfx: animationData[1]
            }
            return fade;
        case SceneAnimationType.wait:
            var wait: WaitScene = {
                type: type,
                milliseconds: animationData[1]
            }
            return wait;
        case SceneAnimationType.cameraMoveToSprite:
            var cameraMoveToSprite: CameraMoveToSpriteScene = {
                type: type,
                spriteName: animationData[1],
                snapToSprite: animationData[2]
            }
            return cameraMoveToSprite;
        case SceneAnimationType.cameraMoveToTile:
            var cameraMoveToTile: CameraMoveToTileScene = {
                type: type,
                column: animationData[1],
                row: animationData[2],
                snapToTile: animationData[3]
            }
            return cameraMoveToTile;
        case SceneAnimationType.loadMap:
            var loadMap: LoadMapScene = {
                type: type,
                mapName: animationData[1],
                setPlayerSprite: animationData[2]
            }
            return loadMap;
    }
}

const directionStringHelper = ( direction: string | number ) => {
    if ( typeof direction === "number" ) {
        return direction as DirectionEnum;
    }
    if ( direction === "FACING_LEFT" ) {
        return DirectionEnum.left;
    }
    if ( direction === "FACING_UP" ) {
        return DirectionEnum.up;
    }
    if ( direction === "FACING_RIGHT" ) {
        return DirectionEnum.right;
    }
    if ( direction === "FACING_DOWN" ) {
        return DirectionEnum.down;
    }
}