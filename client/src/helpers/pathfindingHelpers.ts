import { TileStatus } from "../enumerables/TileStatusEnum";
import type { Tile } from "../game/core/Tile";
import type { GridCellModel } from "../models/GridCellModel";
import type { GridLocation } from "../models/GridLocation";

let colsInGrid: number, rowsInGrid: number, tiles: GridCellModel[];
let queue: PriorityQueue, visitedTilesList: string[], foundPath: GridLocation[], movementCost: number, targetLocationIndex: string;

enum PathfindingDirection {
    north,
    east,
    south,
    west
}

type ItemWithPriority = {
    item: GridLocation;
    priority: number;
}

class PriorityQueue {
    items: ItemWithPriority[];
    constructor() {
        this.items = [];
    }

    get isEmpty(): boolean { return this.items.length === 0; }

    addItemToQueue( item: GridLocation, priority: number ): void {
        const newItem: ItemWithPriority = { item: item, priority: priority };
        let highestPriorityInList = true;

        for ( let index = 0; index < this.items.length; index++ ) {
            if ( this.items[index].priority > newItem.priority ) {
                this.items.splice( index, 0, newItem )
                highestPriorityInList = false;
            }
        }

        if ( highestPriorityInList ) {
            this.items.push( newItem )
        }
    }

    getFirstItemFromQueue(): ItemWithPriority {
        return this.items.shift()
    }
}

const getLocationStatus = ( location: GridLocation ): TileStatus => {
    if ( location.row < 0 || location.column < 0 || location.row > rowsInGrid + 1 || location.column > colsInGrid + 1 ) {
        return TileStatus.invalid;
    } else if ( visitedTilesList.indexOf( location.index ) > -1 ) {
        return TileStatus.blocked;
    } else {
        return TileStatus.valid;
    }
}

const exploreInDirection = ( currentLocation: GridLocation, direction: PathfindingDirection ): GridLocation => {
    let row = currentLocation.row;
    let column = currentLocation.column;

    switch ( direction ) {
        case PathfindingDirection.north:
            row -= 1;
            break;
        case PathfindingDirection.east:
            column += 1;
            break;
        case PathfindingDirection.south:
            row += 1;
            break;
        case PathfindingDirection.west:
            column -= 1;
            break;
    }

    let tile = tiles[((row * colsInGrid) - (colsInGrid - column)) - 1];
    if ( tile !== undefined && tile !== null) {
        const newLocation: GridLocation = { row: row, column: column, movementCost: movementCost, index: tile.column + "_" + tile.row };
        newLocation.path = [...currentLocation.path.slice(), newLocation];
        newLocation.status = getLocationStatus( newLocation );
        if ( newLocation.status === TileStatus.valid )
            visitedTilesList.push( newLocation.index )

        return newLocation;
    }
    else {
        const location: GridLocation = { index: 'x', status: TileStatus.invalid };
        return location;
    }
}

const addTileInDirectionToQueueIfValid = ( currentLocation: ItemWithPriority, direction: PathfindingDirection ): void => {
    const newLocation = exploreInDirection( currentLocation.item, direction )
    const movementCost = currentLocation.priority + newLocation.movementCost;
    if ( newLocation.index === targetLocationIndex ) {
        foundPath = newLocation.path;
    }
    else if ( newLocation.status === TileStatus.valid || movementCost < currentLocation.priority ) {
        queue.addItemToQueue( newLocation, movementCost );
    }
}

export const determineShortestPath = ( startingTile: Tile, targetTile: Tile, columns: number, rows: number, gridTiles: GridCellModel[] ): GridLocation[] => {
    queue = new PriorityQueue( );
    visitedTilesList = [];
    colsInGrid = columns;
    rowsInGrid = rows;
    tiles = gridTiles;
    foundPath = null;
    targetLocationIndex = targetTile.column + "_" + targetTile.row; 

    const start: GridLocation = {
        column: startingTile.column,
        row: startingTile.row,
        index: startingTile.column + "_" + startingTile.row,
        movementCost: startingTile.movementCost,
        status: TileStatus.start,
        path: []
    };

    movementCost = start.movementCost;
    queue.addItemToQueue( start, movementCost );

    while ( !queue.isEmpty ) {
        const currentLocation = queue.getFirstItemFromQueue();
        if ( currentLocation.item.row !== 1 || targetTile.row === 0 ) {
            addTileInDirectionToQueueIfValid( currentLocation, PathfindingDirection.north )   
        }
        if ( currentLocation.item.column !== colsInGrid || targetTile.column === colsInGrid + 1 ) {
            addTileInDirectionToQueueIfValid( currentLocation, PathfindingDirection.east ) 
        }
        if ( currentLocation.item.row !== rowsInGrid || targetTile.row === rowsInGrid + 1 ) {
            addTileInDirectionToQueueIfValid( currentLocation, PathfindingDirection.south )   
        }
        if ( currentLocation.item.column !== 1 || targetTile.column === 0 ) {
            addTileInDirectionToQueueIfValid( currentLocation, PathfindingDirection.west )            
        }

        if ( foundPath !== null ) {
            return foundPath;
        }
    } 

    return null;    
}