import { DirectionEnum } from "../enumerables/DirectionEnum";
import globals from "../game-data/globals";
import type { Hitbox } from "../game/core/Hitbox";
import type { Sprite } from "../game/core/Sprite";
import type { GridCellModel } from "../models/GridCellModel";

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

const idChars   = "abcdefghijklmnopqrstuvwxyz1234567890";
const idLength  = 10;

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

export const getNextIndexInArray = ( currentIndex: number, array: any[] ): number => {
    return ( currentIndex + 1 === array.length ) ? 0 : currentIndex += 1 ;
};

export const getPreviousIndexInArray = ( currentIndex: number, array: any[] ): number => {
    return ( currentIndex - 1 < 0 ) ? array.length - 1 : currentIndex - 1
};

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

export const cellDistanceSquared = ( cellA: GridCellModel, cellB: GridCellModel ): number => {
    const rowDiff = cellA.row - cellB.row;
    const colDiff = cellA.column - cellB.column;
    return (rowDiff*rowDiff) + (colDiff*colDiff);
}

export const xyDistanceSquared = ( positionA: { x: number, y: number }, positionB: { x: number, y: number } ) => {
    const xDiff = positionA.x - positionB.x;
    const yDiff = positionA.y - positionB.y
    return ( xDiff * xDiff ) + ( yDiff * yDiff );
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

export const faceTowardsTarget = ( subject: Sprite, target: Sprite ) => {
    const colDiff = Math.abs( subject.column - target.column );
    const rowDiff = Math.abs( subject.row - target.row );

    if ( rowDiff > colDiff ) {
        return ( subject.row > target.row ) ? DirectionEnum.up : DirectionEnum.down;
    }
    else {
        return ( subject.column > target.column ) ? DirectionEnum.left : DirectionEnum.right;
    }
}

export const getRandomDestinationInRadius = ( sprite: Sprite, radius: number ): GridCellModel => {
    const back = globals.GAME.BACK;
    const front = globals.GAME.FRONT;
    const leftBorderColumn = sprite.column - radius;
    const rightBorderColumn = sprite.column + radius;
    const topBorderRow = sprite.row - radius;
    const bottomBorderRow = sprite.row + radius;

    const tiles = back.grid.array.filter( ( e ) => {
        return ( e.column > leftBorderColumn && e.column < rightBorderColumn )
            && ( e.row > topBorderRow && e.row < bottomBorderRow )
            && !( e.row === sprite.row && e.column === sprite.column );
    } );

    const availableTiles = tiles.filter( ( e ) => {
        return !e.isBlocked && !front.tileHasBlockingSprite( e.index );
    } );

    if ( availableTiles.length > 0 ) {
        let randomTile = availableTiles[Math.floor( Math.random() * availableTiles.length )];
        return { column: randomTile.column, row: randomTile.row };
    }
    else {
        return null;
    }
}

export const isHorizontal = ( direction: DirectionEnum ): boolean => {
    return direction === DirectionEnum.left || direction === DirectionEnum.right;
}