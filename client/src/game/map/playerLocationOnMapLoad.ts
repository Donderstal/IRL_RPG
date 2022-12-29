import type { CellPosition } from "../../models/CellPositionModel";
import type { MapModel } from "../../models/MapModel";
import { PlayerMapEntry } from "../../enumerables/PlayerMapEntryEnum";
import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { getOppositeDirection } from "../../helpers/utilFunctions";

let previousMapName: string;
let playerStart: CellPosition = null;
let exitId: string = null;

export const getPlayerStart = (): CellPosition => {
    return playerStart;
}
export const mapHasPlayerStart = (): boolean => {
    return playerStart !== null && playerStart !== undefined;
}
export const registerMapExit = ( mapName: string, mapExitId: string = null ): void => {
    playerStart = null;
    exitId = mapExitId;
    previousMapName = mapName;
}

export const setPlayerStartForCinematic = ( mapName: string, playerStartLocation: CellPosition ): void => {
    registerMapExit( mapName );
    if ( playerStartLocation.direction === null || playerStartLocation.direction === undefined ) {
        playerStartLocation.direction = DirectionEnum.down;
    }
    playerStart = playerStartLocation;
}
export const setPlayerStartForCinematicEnd = ( mapName: string, playerStartLocation: CellPosition ): void => {
    registerMapExit( mapName );
    playerStart = playerStartLocation;
}

export const setPlayerLocationOnMapLoad = ( mapToLoad: MapModel, playerMapEntryType: PlayerMapEntry ): void => {
    switch ( playerMapEntryType ) {
        case PlayerMapEntry.newGame:
            setPlayerStartForNewGame( mapToLoad );
            break;
        case PlayerMapEntry.loadGame:
            setPlayerStartForLoadGame( mapToLoad );
            break;
        case PlayerMapEntry.door:
            setPlayerStartForDoor( mapToLoad );
            break;
        case PlayerMapEntry.elevator:
            setPlayerStartForElevator( mapToLoad );
            break;
        case PlayerMapEntry.bus:
            alert( 'Switching maps by bus is not yet supported.' );
            break;
    }
}

const setPlayerStartForNewGame = ( mapToLoad: MapModel ): void => {
    const model: CellPosition = {
        column: mapToLoad.playerStart.column,
        row: mapToLoad.playerStart.row,
        direction: DirectionEnum.down
    };
    playerStart = model;
}

const setPlayerStartForLoadGame = ( mapToLoad: MapModel ): void => {
    const model: CellPosition = {
        column: mapToLoad.savepoint.column,
        row: mapToLoad.savepoint.row,
        direction: DirectionEnum.down
    };
    playerStart = model;
}

const setPlayerStartForDoor = ( mapToLoad: MapModel ): void => {
    const door = mapToLoad.doors.filter( ( e ) => { return e.id === exitId } )[0];
    if ( door === undefined ) {
        console.error( `No door exists from ${previousMapName} to ${mapToLoad.key}` );
    }
    const model: CellPosition = {
        column: door.column,
        row: door.row,
        direction: getOppositeDirection(door.direction)
    };
    playerStart = model;
}

const setPlayerStartForElevator = ( mapToLoad: MapModel ): void => {
    const elevator = mapToLoad.elevators.filter( ( e ) => { return e.id === exitId } )[0];
    if ( elevator === undefined ) {
        console.error( `No elevator exists from ${previousMapName} to ${mapToLoad.key}` );
    }
    const model: CellPosition = {
        column: elevator.column,
        row: elevator.row,
        direction: getOppositeDirection( elevator.direction )
    };
    playerStart = model;
}