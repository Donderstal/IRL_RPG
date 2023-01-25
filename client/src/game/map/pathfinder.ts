import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { determineShortestPath } from "../../helpers/pathfindingHelpers";
import type { DirectionXy } from "../../models/DirectionXyModel";
import type { GridLocation } from "../../models/GridLocation";
import { getBackSpritesGrid, getBackTilesGrid } from "../canvas/canvasGetter";
import type { Tile } from "../core/Tile";

export const tryFindPath = ( start: Tile, destination: Tile ): DirectionXy[] => {
    const path = determineShortestPath( start, destination, getGrid() );
    if ( path === null ) return null;
    return reduceGridLocationList( start, path );
}

const getGrid = (): any => {
    const backClass = getBackTilesGrid();
    const frontClass = getBackSpritesGrid();
    return {
        'rows': backClass.grid.rows, 'columns': backClass.grid.columns,
        'tiles': backClass.grid.array,
        'blockedIndexes': backClass.grid.array.filter( ( tile ) => {
            return tile.isBlocked || frontClass.tileHasBlockingSprite( tile.index );
        } ).map( ( e: Tile ) => { return e.index } )
    };
}

const reduceGridLocationList = ( startingTile: Tile, gridLocationList: GridLocation[] ): DirectionXy[] => {
    let previousDirection = null;
    const frontClass = getBackSpritesGrid();
    return gridLocationList.reduce( ( acc, cur, index ) => {
        const currentLocation = frontClass.getTileAtCell( cur.column, cur.row );
        const step = {
            x: currentLocation.x,
            y: currentLocation.y,
            direction: null
        }
        const lastLocation = index == 0 ? startingTile : acc[index - 1];
        if ( currentLocation.x < lastLocation.x && ( previousDirection === null || previousDirection !== DirectionEnum.right ) ) {
            step.direction = DirectionEnum.left;
            previousDirection = DirectionEnum.left;
        }
        else if ( currentLocation.y < lastLocation.y && ( previousDirection === null || previousDirection !== DirectionEnum.down ) ) {
            step.direction = DirectionEnum.up;
            previousDirection = DirectionEnum.up;
        }
        else if ( currentLocation.x > lastLocation.x && ( previousDirection === null || previousDirection !== DirectionEnum.left ) ) {
            step.direction = DirectionEnum.right;
            previousDirection = DirectionEnum.right;
        }
        else if ( currentLocation.y > lastLocation.y && ( previousDirection === null || previousDirection !== DirectionEnum.up ) ) {
            step.direction = DirectionEnum.down;
            previousDirection = DirectionEnum.down;
        }
        return [...acc, step];
    }, [] );
}