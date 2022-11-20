import globals, { CANVAS_COLUMNS, CANVAS_ROWS } from "../game-data/globals";
import { Counter } from "../helpers/Counter";
import { getNeighbourhood } from "../resources/mapResources";
import type { InteractionModel } from "../models/InteractionModel";
import type { MapModel } from "../models/MapModel";
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import { setNewCenterBubble } from "./controllers/bubbleController";

let model: NeighbourhoodModel;
let mapModel: MapModel;
let activeMapKey: string;
let activeMapLocation: string;
let previousMapKey: string;
let previousMapLocation: string;
let playerData: { name: string, className: string };
let NPCCounter: Counter;
let neighbourhoodSlots: string[];

export const getNeighbourhoodKey = (): string => { return activeMapKey.split( '/' )[0]; }
export const getActiveMap = (): MapModel => {
    return model.mapDictionary[activeMapName()].outdoors ? mapModel : model.mapDictionary[activeMapName()];
}
export const getActiveMapKey = (): string => {
    return activeMapKey;
}
export const getPreviousMapKey = (): string => {
    return previousMapKey;
}
export const getNeighbourhoodModel = (): NeighbourhoodModel => {
    return model;
}
export const hasActiveNeighbourhood = (): boolean => {
    return model !== undefined && model !== null;
}
const activeMapName = (): string => { return activeMapKey.split( '/' )[1]; }

export const initializeNeighbourhood = ( mapKey: string ) => {
    model = getNeighbourhood( mapKey.split( '/' )[0] );
    activateMap( mapKey );
    setMapGrid();
    setNeighbourhoodNPCCounter();
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

    let doors = [];
    let actions = [];
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
                    doors = [...doors, ...map.doors.map( ( e ) => {
                        e.column += mapColumnsAccumulator;
                        e.row += mapRowsAccumulator;
                        return e;
                    } )]
                    actions = [...actions, ...map.actions.map( ( e ) => {
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
        doors: doors,
        actions: actions,
        spawnPoints: model.spawnPoints,
        roads: model.roads
    }

    mapModel = constructedMapModel;
    model.mapDictionary[model.key] = mapModel;
}

export const getRandomNeighbourhoodAction = (): InteractionModel[] => {
    let interactions = model.spawnableActions;
    return interactions[Math.floor( Math.random() * interactions.length )];
}

export const activateMap = ( key: string ): void => {
    previousMapKey = activeMapKey
    previousMapLocation = activeMapLocation;
    activeMapKey = key;
    activeMapLocation = getActiveMap().location;
    if( previousMapLocation !== activeMapLocation ) {
        setNewCenterBubble( activeMapLocation )
    }
    }

export const setPlayerStart = ( name: string, className: string ): void => {
    playerData = {
        name: name,
        className: className
    };
}

export const setNeighbourhoodNPCCounter = (): void => {
    NPCCounter = new Counter( model.characterSpawnRate, true )
}

export const handleNeighbourhoodNPCCounter = (): void => {
    if( getActiveMap().spawnPoints != undefined ) {
        if ( NPCCounter.countAndCheckLimit() && getActiveMap().spawnPoints.length > 0 ) {
            globals.GAME.FRONT.generateWalkingNPC();
        }
    }
    else {
        NPCCounter.resetCounter();
    }
}