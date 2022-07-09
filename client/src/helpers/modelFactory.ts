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