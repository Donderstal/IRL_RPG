import { DirectionEnum } from "../enumerables/DirectionEnum";
import globals from "../game-data/globals";
import type { Intersection } from "../game/map/roads/Intersection";
import type { Road } from "../game/map/roads/Road";
import type { CellPosition } from "../models/CellPositionModel";
import type { GridLocation } from "../models/GridLocation";

export const getRoadPathGridLocationList = ( start: CellPosition, startingDirection: DirectionEnum, destination: CellPosition ): GridLocation[] => {
    const roadNetwork = globals.GAME.FRONT.roadNetwork;
    const startingRoad = roadNetwork.roads.filter( ( e ) => { return e.cellIsInRoad( start ) && e.model.direction === startingDirection; } )[0];
    const roadIdPath = findRoadPathToDestination( start, startingRoad, destination );
    return convertRoadIdPathToGridLocationList( start, destination, roadIdPath, roadNetwork.roads );
}

export const getValidCarDestination = ( start: CellPosition, road: Road ): CellPosition => {
    const validDestinations = [];

    const roadStack = [road];
    const roadIds = [];

    while ( roadStack.length !== 0 ) {
        const road = roadStack.shift();
        const intersections: Intersection[] = [];
        let visitedIntersectionIds = [];
        let position = start;
        let closestIntersection = findClosestIntersection( road.id, position, road.model.direction );

        while ( closestIntersection !== null && visitedIntersectionIds.indexOf( closestIntersection.id ) === -1 ) {
            position = {
                column: closestIntersection.core.leftColumn, row: closestIntersection.core.topRow
            };
            intersections.push( closestIntersection );
            visitedIntersectionIds.push( closestIntersection.id );
            closestIntersection = findClosestIntersection( road.id, position, road.model.direction );
        }

        intersections.forEach( ( e ) => {
            let validDirectionsOut = null;
            if ( road.isHorizontal ) {
                validDirectionsOut = e.directionsOut.filter( ( d ) => { return d !== DirectionEnum.left && d !== DirectionEnum.right; } );
            }
            else {
                validDirectionsOut = e.directionsOut.filter( ( d ) => { return d !== DirectionEnum.up && d !== DirectionEnum.down; } );
            }
            validDirectionsOut.forEach( ( d ) => {
                const newRoad = e.getRoadByDirection( d );
                if ( roadIds.indexOf( newRoad.id ) === -1 ) {
                    roadIds.push( ( newRoad.id ) );
                    roadStack.push( newRoad );
                }
            } )
        } )

        if ( roadEndsOutOfMap( road ) ) {
            validDestinations.push( road.getRoadEndPosition() );
        }
    }

    const randomIndex = Math.floor( Math.random() * validDestinations.length );
    const destination = validDestinations[randomIndex];
    return destination;
}

const findRoadPathToDestination = ( start: CellPosition, startRoad: Road, destination: CellPosition ): string[] => {
    let validPath = null;
    const roadStack = [startRoad];
    const positionStack = [start]
    const pathStack = [[startRoad.id]];

    const visitedPaths = [];

    while ( validPath === null ) {
        const road = roadStack.shift();
        const path = pathStack.shift();
        const position = positionStack.shift();

        const intersections: Intersection[] = [];
        let visitedIntersectionFromIds = [];
        let closestIntersection = findClosestIntersection( road.id, position, road.model.direction );

        while ( closestIntersection !== null && visitedIntersectionFromIds.indexOf( road.id + closestIntersection.id ) === -1 ) {
            let intersectionPosition = {
                column: road.isHorizontal ? closestIntersection.core.leftColumn : road.model.primaryColumn,
                row: road.isHorizontal ? road.model.primaryRow : closestIntersection.core.bottomRow
            };
            intersections.push( closestIntersection );
            visitedIntersectionFromIds.push( road.id + closestIntersection.id );
            closestIntersection = findClosestIntersection( road.id, intersectionPosition, road.model.direction );
        }

        intersections.forEach( ( e ) => {
            let validDirectionsOut = null;
            if ( road.isHorizontal ) {
                validDirectionsOut = e.directionsOut.filter( ( d ) => { return d !== DirectionEnum.left && d !== DirectionEnum.right; } );
            }
            else {
                validDirectionsOut = e.directionsOut.filter( ( d ) => { return d !== DirectionEnum.up && d !== DirectionEnum.down; } );
            }
            validDirectionsOut.forEach( ( d ) => {
                const newRoad = e.getRoadByDirection( d );
                const newPath = [...path, newRoad.id];
                const newPathId = newPath.join();
                if ( visitedPaths.indexOf( newPathId ) === - 1 ) {
                    visitedPaths.push( newPathId );
                    roadStack.push( newRoad );
                    pathStack.push( newPath );
                    positionStack.push( getIntersectingTile( road.id, newRoad.id ) );
                }

            } )
        } )

        if ( road.cellIsInRoad( destination ) ) {
            validPath = path;
        }
    }

    return validPath;
}

const convertRoadIdPathToGridLocationList = ( start: CellPosition, destination: CellPosition, roadIdPath: string[], roads: Road[] ): GridLocation[] => {
    const gridLocationList = [];
    let foundPath = false;
    let activeRoadId = null;
    let lastLocation = start;
    let currentLocation = null;
    while ( !foundPath ) {
        activeRoadId = roadIdPath.shift();
        const activeRoad = roads.filter( ( e ) => { return e.id === activeRoadId; } )[0];
        const nextRoad = roads.filter( ( e ) => { return e.id === roadIdPath[0]; } )[0];
        let reachedCrossingWithNextRoad = false;
        while ( !reachedCrossingWithNextRoad && !foundPath) {
            currentLocation = { direction: activeRoad.model.direction }
            switch ( currentLocation.direction ) {
                case DirectionEnum.left:
                    currentLocation.column = lastLocation.column - 1;
                    currentLocation.row = lastLocation.row;
                    reachedCrossingWithNextRoad = nextRoad !== undefined && currentLocation.column === nextRoad.model.primaryColumn;
                    break;
                case DirectionEnum.up:
                    currentLocation.column = lastLocation.column;
                    currentLocation.row = lastLocation.row - 1;
                    reachedCrossingWithNextRoad = nextRoad !== undefined && currentLocation.row === nextRoad.model.primaryRow;
                    break;
                case DirectionEnum.right:
                    currentLocation.column = lastLocation.column + 1;
                    currentLocation.row = lastLocation.row;
                    reachedCrossingWithNextRoad = nextRoad !== undefined && currentLocation.column === nextRoad.model.secondaryColumn;
                    break;
                case DirectionEnum.down:
                    currentLocation.column = lastLocation.column;
                    currentLocation.row = lastLocation.row + 1;
                    reachedCrossingWithNextRoad = nextRoad !== undefined && currentLocation.row === nextRoad.model.secondaryRow;
                    break;
            }
            gridLocationList.push(currentLocation)
            lastLocation = {
                column: ( reachedCrossingWithNextRoad && !nextRoad.isHorizontal ) ? nextRoad.model.primaryColumn : currentLocation.column,
                row: ( reachedCrossingWithNextRoad && nextRoad.isHorizontal ) ? nextRoad.model.primaryRow : currentLocation.row
            }
            currentLocation;
            foundPath = currentLocation.column === destination.column && currentLocation.row === destination.row;
        }
    }
    return gridLocationList;
}

const getIntersectingTile = ( roadId: string, road2Id: string ): CellPosition => {
    const cell: CellPosition = { column: null, row: null };
    const road1 = globals.GAME.FRONT.roadNetwork.getRoadById( roadId );
    const road2 = globals.GAME.FRONT.roadNetwork.getRoadById( road2Id );
    if ( road1.isHorizontal ) {
        cell.column = road1.model.direction === DirectionEnum.left ? road2.model.primaryColumn : road2.model.secondaryColumn;
        cell.row = road1.model.primaryRow;
    }
    else {
        cell.column = road1.model.primaryColumn;
        cell.row = road1.model.direction === DirectionEnum.left ? road2.model.primaryRow : road2.model.secondaryRow;
    }
    return cell;
}

const roadEndsOutOfMap = ( road: Road ): boolean => {
    const columnOutOfMap = globals.GAME.activeMap.columns + 1;
    const rowOutOfMap = globals.GAME.activeMap.rows + 1;
    return ( DirectionEnum.left && road.model.secondaryColumn === 0 )
        || ( DirectionEnum.up && road.model.secondaryRow === 0 )
        || ( DirectionEnum.right && road.model.secondaryColumn === columnOutOfMap )
        || ( DirectionEnum.right && road.model.secondaryRow === rowOutOfMap );
}

const findClosestIntersection = ( roadId: string, cellPosition: CellPosition, direction: DirectionEnum ): Intersection => {
    let closestIntersection = null;
    let intersectingIntersections = globals.GAME.FRONT.roadNetwork.intersections.filter( ( e ) => {
        let hasNotBeenCrossed = direction === DirectionEnum.left
            ? e.core.rightColumn < cellPosition.column : direction === DirectionEnum.up
                ? e.core.bottomRow < cellPosition.row : direction === DirectionEnum.right
                    ? e.core.leftColumn > cellPosition.column : e.core.topRow > cellPosition.row;
        return hasNotBeenCrossed && e.roadIds.indexOf( roadId ) > - 1 && e.directionsIn.indexOf( direction ) > -1;
    } );
    if ( intersectingIntersections.length > 1 ) {
        switch ( direction ) {
            case DirectionEnum.left:
                closestIntersection = intersectingIntersections.reduce( ( closest, current ) => {
                    return cellPosition.column - closest.core.rightColumn < cellPosition.column - current.core.rightColumn ? closest : current;
                } );
                break;
            case DirectionEnum.up:
                closestIntersection = intersectingIntersections.reduce( ( closest, current ) => {
                    return cellPosition.row - closest.core.bottomRow < cellPosition.row - current.core.bottomRow ? closest : current;
                } );
                break;
            case DirectionEnum.right:
                closestIntersection = intersectingIntersections.reduce( ( closest, current ) => {
                    return closest.core.leftColumn - cellPosition.column < current.core.leftColumn - cellPosition.column ? closest : current;
                } );
                break;
            case DirectionEnum.down:
                closestIntersection = intersectingIntersections.reduce( ( closest, current ) => {
                    return closest.core.topRow - cellPosition.row < current.core.topRow - cellPosition.row ? closest : current;
                } );
                break;
        }
    }
    else if ( intersectingIntersections.length === 1 ) {
        closestIntersection = intersectingIntersections[0];
    }

    return closestIntersection;
}