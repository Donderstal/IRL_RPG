import { CANVAS_COLUMNS, CANVAS_ROWS } from "../game-data/globals";
import { Counter } from "../helpers/Counter";
import { getNeighbourhood } from "../resources/mapResources";
import type { MapModel } from "../models/MapModel";
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import { getBackSpritesGrid } from "./canvas/canvasGetter";
import { getShowCenterTextBubbleContract } from "../factories/contractFactory";
import { registerNewContract } from "../contracts/contractRegistry";

let model: NeighbourhoodModel;
let mapModel: MapModel;
let activeMapKey: string;
let activeMapLocation: string;
let previousMapKey: string;
let previousMapLocation: string;
let NPCCounter: Counter;
let activeNeighbourhoodId: string;

export const getActiveMapKey = (): string => {
    return activeMapKey;
}
export const getActiveMap = (): MapModel => {
    return activeMapKey === `${model.key}/${model.key}` ? mapModel : model.mapDictionary[activeMapKey];
}
export const getPreviousMapKey = (): string => {
    return previousMapKey;
}
export const getNeighbourhoodModel = (): NeighbourhoodModel => {
    return model;
}
export const initializeNeighbourhood = ( neighbourhoodKey: string ) => {
    if ( isCurrentNeighbourhoodId( neighbourhoodKey ) ) {
        return;
    }
    model = getNeighbourhood( neighbourhoodKey );
    activeNeighbourhoodId = neighbourhoodKey;
    if( model.horizontalSlots.length > 0 )
        setMapGrid();
    if ( model.characterSpawnRate !== null )
        setNeighbourhoodNPCCounter();
}
export const markMapAsActive = ( mapKey: string ): void => {
    previousMapKey = activeMapKey;
    previousMapLocation = activeMapLocation;
    activeMapKey = mapKey;
    activeMapLocation = getActiveMap().location;
}
export const setCenterBubbleForNewLocation = (): void => {
    if ( previousMapLocation !== activeMapLocation ) {
        const centerTextContract = getShowCenterTextBubbleContract( activeMapLocation );
        registerNewContract( centerTextContract );
    }
}
export const setNeighbourhoodNPCCounter = (): void => {
    NPCCounter = new Counter( model.characterSpawnRate, true )
}

export const handleNeighbourhoodNPCCounter = (): void => {
    if( getActiveMap().spawnPoints != undefined ) {
        if ( NPCCounter.countAndCheckLimit() && getActiveMap().spawnPoints.length > 0 ) {
            getBackSpritesGrid().generateWalkingNPC();
        }
    }
    else {
        NPCCounter.resetCounter();
    }
}

const isCurrentNeighbourhoodId = ( neighbourhoodKey: string ): boolean => {
    return activeNeighbourhoodId == neighbourhoodKey;
}
const setMapGrid = (): void => {
    const emptyRow = [];
    let tileSet;
    for ( var i = 1; i <= CANVAS_COLUMNS; i++ ) {
        emptyRow.push( { id: null, angle: 0, mirrored: false } );
    }
    const columns = model.horizontalSlots.length * CANVAS_COLUMNS;
    const rows = model.verticalSlots.length * CANVAS_ROWS;
    let grid = [];
    let frontGrid = [];

    let verticalKeyIndex = 0
    let activeVerticalKey = model.verticalSlots[verticalKeyIndex];

    let row = 1;
    let rowLimit = 1;

    let mapRowsAccumulator = 0;
    let mapColumnsAccumulator = 0;

    let triggers = [];
    let sprites = [];
    let frontSprites = [];

    while ( row <= rows ) {
        let tiles = [];
        let frontTiles = [];

        mapColumnsAccumulator = -24;

        for ( var key in model.horizontalSlots ) {
            mapColumnsAccumulator += 24;
            const activeKey = ( model.horizontalSlots[key] ).toString() + activeVerticalKey;
            const map = model.mapDictionary[activeKey];
            if ( map !== undefined ) {
                const sliceStart = CANVAS_COLUMNS * ( ( row - 1 ) - ( verticalKeyIndex * CANVAS_ROWS ) );
                tileSet = map.tileSet;
                tiles = [...tiles, ...map.grid.slice( sliceStart, sliceStart + CANVAS_COLUMNS )];
                frontTiles = [...frontTiles, ...map.frontGrid.slice( sliceStart, sliceStart + CANVAS_COLUMNS )];
                if ( rowLimit === 1 ) {
                    triggers = [...triggers, ...map.triggers.map( ( e ) => {
                        e.column += mapColumnsAccumulator;
                        e.row += mapRowsAccumulator;
                        return e;
                    } )]
                    sprites = [...sprites, ...map.sprites.map( ( e ) => {
                        e.column += mapColumnsAccumulator;
                        e.row += mapRowsAccumulator;
                        return e;
                    } )]
                    frontSprites = [...frontSprites, ...map.frontSprites.map( ( e ) => {
                        e.column += mapColumnsAccumulator;
                        e.row += mapRowsAccumulator;
                        return e;
                    } )]
                }
            }
            else {
                tiles = [...tiles, ...emptyRow];
                frontTiles = [...frontTiles, ...emptyRow];
            }

        }
        grid = [...grid, ...tiles];
        frontGrid = [...frontGrid, ...frontTiles];
        row++
        rowLimit++
        if ( rowLimit > 16 ) {
            rowLimit = 1;
            verticalKeyIndex++
            activeVerticalKey = model.verticalSlots[verticalKeyIndex];
            mapRowsAccumulator += 16;
        }
    }

    const constructedMapModel: MapModel = {
        key: model.key,
        location: model.location,
        tileSet: tileSet,
        outdoors: true,
        columns: columns,
        rows: rows,
        grid: grid,
        frontGrid: frontGrid,
        sprites: sprites,
        frontSprites: frontSprites,
        triggers: triggers,
        spawnPoints: model.spawnPoints,
        roads: model.roads
    }

    mapModel = constructedMapModel;
    model.mapDictionary[model.key] = mapModel;
}
