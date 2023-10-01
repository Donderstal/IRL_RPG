import { DestinationType } from "../enumerables/DestinationType";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { PLAYER_ID } from "../game-data/interactionGlobals";
import { getBackTilesGrid } from "../game/canvas/canvasGetter";
import type { Hitbox } from "../game/core/Hitbox";
import type { Sprite } from "../game/core/Sprite";
import { tileIsValidDestination } from "../game/map/blockedTilesRegistry";
import type { GridCellModel } from "../models/GridCellModel";
import type { FrameModel } from "../models/SpriteFrameModel";

const idChars = "abcdefghijklmnopqrstuvwxyz1234567890";
const idLength = 10;

export const fetchJSONWithCallback = ( url: string, callback: Function, callbackParams: any[] = [] ): void => {
    fetch(url)
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status + " on url " + url);
            }
            return response.json()
        })
        .then( (json) => {
            callback(json, callbackParams) 
        }
    )
}
export const generateId = ( ): string => {
    let id = "";

    for( let i = 0; i < idLength; i++ ) {
        const randomPosition = Math.floor( Math.random( ) * idChars.length );
        id += idChars.slice( randomPosition, randomPosition + 1 )
    }
    return id
}
export const getUniqueId = ( idList: string[] ): string => {
    const newId         = generateId( )
    let isUniqueId    = true;

    if ( idList.length > 1 ) {
        for( let i = 0; i < idList.length; i++ ) {
            if ( idList[i] === newId ) {
                isUniqueId = false;
            }
        }
    }

    return ( isUniqueId ) ? newId : getUniqueId( idList );
}
export const cloneInstance = ( instance: any ): any => {
    return Object.assign(
        Object.create(
          Object.getPrototypeOf(instance),
        ),
        JSON.parse(JSON.stringify(instance)),
    );
}
export const getOppositeDirection = ( direction: DirectionEnum ): DirectionEnum => {
    switch ( direction ) {
        case DirectionEnum.left:
            return DirectionEnum.right;
        case DirectionEnum.up:
            return DirectionEnum.down;
        case DirectionEnum.right:
            return DirectionEnum.left;
        case DirectionEnum.down:
            return DirectionEnum.up;
    }
};
export const getSpriteFacingTowardsTargetDirection = ( spriteFrame: FrameModel, targetFrame: FrameModel ): DirectionEnum => {
    const targetIsLeftOfSprite = targetFrame.x < spriteFrame.x;
    const targetIsAboveSprite = targetFrame.y < spriteFrame.y;

    const xDifference = Math.abs( targetFrame.x - spriteFrame.x );
    const yDifference = Math.abs( targetFrame.y - spriteFrame.y );

    if ( xDifference > yDifference ) {
        return targetIsLeftOfSprite ? DirectionEnum.left : DirectionEnum.right;
    }
    else {
        return targetIsAboveSprite ? DirectionEnum.up : DirectionEnum.down;
    }
}
export const getClosestCell = ( start: GridCellModel, cellList: GridCellModel[] ): GridCellModel => {
    let closestCell = cellList[0];
    let shortestDistance = cellDistanceSquared(start, closestCell);
    
    for( var i = 0; i < cellList.length; i++ ) {
        const currentCell =  cellList[i]
        const currentDistance = cellDistanceSquared(start, currentCell);
        if ( currentDistance < shortestDistance ) {
            closestCell = currentCell;
            shortestDistance = currentDistance;
        }
    }

    return closestCell;
}
export const getClosestHitbox = ( start: Hitbox, hitboxList: Hitbox[] ): Hitbox => {
    let closestHitbox = hitboxList[0];
    let shortestDistance = xyDistanceSquared( start, closestHitbox );

    for ( var i = 0; i < hitboxList.length; i++ ) {
        const current = hitboxList[i]
        const currentDistance = xyDistanceSquared( start, current );
        if ( currentDistance < shortestDistance ) {
            closestHitbox = current;
            shortestDistance = currentDistance;
        }
    }

    return closestHitbox;
}
export const getRandomDestinationInRadius = ( sprite: Sprite, radius: number ): GridCellModel => {
    const back = getBackTilesGrid();
    const columnsInGrid = back.grid.columns;
    const rowsInGrid = back.grid.rows;
    const leftBorderColumn = ( sprite.initialColumn - radius ) < 1 ? 1 : ( sprite.initialColumn - radius );
    const rightBorderColumn = ( sprite.initialColumn + radius ) > columnsInGrid ? columnsInGrid : ( sprite.initialColumn + radius );
    const topBorderRow = ( sprite.initialRow - radius ) < 1 ? 1 : ( sprite.initialRow - radius );
    const bottomBorderRow = ( sprite.initialRow + radius ) > rowsInGrid ? rowsInGrid : ( sprite.initialRow + radius );

    const tiles = back.grid.array.filter( ( e ) => {
        return ( e.column >= leftBorderColumn && e.column <= rightBorderColumn )
            && ( e.row >= topBorderRow && e.row <= bottomBorderRow )
            && !( e.row === sprite.row && e.column === sprite.column );
    } );

    const availableTiles = tiles.filter( tileIsValidDestination );
    if ( availableTiles.length > 0 ) {
        let randomTile = availableTiles[Math.floor( Math.random() * availableTiles.length )];
        return { column: randomTile.column, row: randomTile.row, type: DestinationType.randomInRange };
    }
    else {
        return null;
    }
}
export const isHorizontal = ( direction: DirectionEnum ): boolean => {
    return direction === DirectionEnum.left || direction === DirectionEnum.right;
}
export const spriteIsPlayer = ( id: string ): boolean => {
    return id === PLAYER_ID;
}
export const isNullOrUndefined = ( value: any ): boolean => {
    return value === null || value === undefined;
}
export const isInArray = ( array: any[], value: any ): boolean => {
    return array.indexOf( value ) > -1
}

const cellDistanceSquared = ( cellA: GridCellModel, cellB: GridCellModel ): number => {
    const rowDiff = cellA.row - cellB.row;
    const colDiff = cellA.column - cellB.column;
    return ( rowDiff * rowDiff ) + ( colDiff * colDiff );
}
const xyDistanceSquared = ( positionA: { x: number, y: number }, positionB: { x: number, y: number } ) => {
    const xDiff = positionA.x - positionB.x;
    const yDiff = positionA.y - positionB.y
    return ( xDiff * xDiff ) + ( yDiff * yDiff );
}