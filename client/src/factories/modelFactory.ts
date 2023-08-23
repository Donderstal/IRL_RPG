import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import type { SpawnPointModel } from "../models/SpawnPointModel";
import type { RoadModel } from "../models/RoadModel";
import type { TileModel } from "../models/TileModel";
import type { MapModel } from "../models/MapModel";
import type { GraphicEffectModel } from "../models/GraphicEffectModel";
import type { FrameModel } from "../models/SpriteFrameModel";
import type { ItemModel } from "../models/ItemModel";
import type { GridCellModel } from "../models/GridCellModel";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import { getDataModelByKey } from "../resources/spriteDataResources";

export const initMapModel = ( mapData ): MapModel => {
    const mapModel: MapModel = {
        key: mapData.key != undefined ? mapData.key : "",
        location: mapData.location != undefined ? mapData.location : "",
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

        triggers: mapData.triggers != undefined ? mapData.triggers : [],

        unblockedTileIds: mapData.unblockedTileIds != undefined ? mapData.unblockedTileIds : [],
        blockedTileIds: mapData.blockedTileIds != undefined ? mapData.blockedTileIds : [],

        playerStart: mapData.playerStart
    };
    return mapModel;
}

export const initNeighbourhoodModel = ( neighbourhoodData ): NeighbourhoodModel => {
    let mapDictionary = {};
    Object.keys( neighbourhoodData.mapDictionary ).forEach( ( key ) => {
        mapDictionary[key] = initMapModel( neighbourhoodData.mapDictionary[key] );
    } )
    const neighbourhoodModel: NeighbourhoodModel = {
        key: neighbourhoodData.key,
        location: neighbourhoodData.location,
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
        id: tileData !== "E" && tileData.id !== "E" ? tileData.id : null,
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
        spriteDataModel: getDataModelByKey( objectData.type ),

        id: objectData.id,
        name: objectData.name,
        direction: objectData.direction,
        animationType: objectData.anim_type,
        animationName: objectData.anim_name,
        movementType: objectData.move_type,
        sfx: objectData.sfx
    }

    if ( model.hasCondition ) {
        model.condition = objectData.condition;
    }
    if ( objectData.destination !== undefined )
        model.destination = objectData.destination;
    return model;
}

export const initSpriteFrameModel = ( frameData ): FrameModel => {
    const model: FrameModel = {
        x: frameData.x,
        y: frameData.y,
        width: frameData.width,
        height: frameData.height,
        direction: frameData.direction
    }
    return model;
}

export const initTileFrameModel = ( frameData ): FrameModel => {
    const model: FrameModel = {
        x: frameData.x,
        y: frameData.y,
        width: frameData.width,
        height: frameData.height
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