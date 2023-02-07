import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { GRID_BLOCK_PX } from "../../game-data/globals";
import { determineShortestPath } from "../../helpers/pathfindingHelpers";
import type { DirectionXy } from "../../models/DirectionXyModel";
import type { GridLocation } from "../../models/GridLocation";
import { getBackSpritesGrid, getBackTilesGrid } from "../canvas/canvasGetter";
import type { Tile } from "../core/Tile";
import { getBlockedCellList } from "./blockedTilesRegistry";

export const tryFindPath = ( start: Tile, destination: Tile ): DirectionXy[] => {
    const backClass = getBackTilesGrid();
    const path = determineShortestPath( start, destination, backClass.grid.columns, backClass.grid.rows, getBlockedCellList() );
    if ( path === null ) return null;
    return reduceGridLocationList( start, path );
}

const reduceGridLocationList = ( startingTile: Tile, gridLocationList: GridLocation[] ): DirectionXy[] => {
    let previousDirection = null;
    const frontClass = getBackSpritesGrid();
    const list: DirectionXy[] = gridLocationList.reduce( ( acc, cur, index ) => {
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
    return list.map( ( e ) => {
        if ( e.direction === DirectionEnum.right ) {
            e.x += GRID_BLOCK_PX;
        }
        if ( e.direction === DirectionEnum.down ) {
            e.y += GRID_BLOCK_PX;
        }
        return e
    } )
}