import { DirectionEnum } from "../enumerables/DirectionEnum";
import globals from "../game-data/globals";
import type { Intersection } from "../game/map/roads/Intersection";
import type { Road } from "../game/map/roads/Road";
import type { CellPosition } from "../models/CellPositionModel";

export const getValidCarDestination = ( start: CellPosition, road: Road ): CellPosition => {
    const validDestinations = [];
    const roadStack = [road];
    const roadToRoadIds = [];

    while ( roadStack.length !== 0 ) {
        const road = roadStack.shift();
        const intersections: Intersection[] = [];
        let visitedIntersectionIds = [];
        let position = start;
        let closestIntersection = findClosestIntersection( road.id, position, road.model.direction );

        while ( closestIntersection !== null && visitedIntersectionIds.indexOf( closestIntersection.id ) === -1 ) {
            position = {
                column: closestIntersection.core.left, row: closestIntersection.core.top
            };
            intersections.push( closestIntersection );
            visitedIntersectionIds.push( closestIntersection.id );
            closestIntersection = findClosestIntersection( road.id, start, road.model.direction );
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
                if ( roadToRoadIds.indexOf( road.id + newRoad.id ) === -1 ) {
                    roadToRoadIds.push( ( road.id + newRoad.id ) );
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

export const findRoadPathToDestination = ( start: CellPosition, road: Road, destination: CellPosition ): string[] => {
    let validPath = null;
    const roadStack = [road];
    const pathStack = [[road.id]];

    const roadToRoadIds = [];

    while ( validPath === null ) {
        const road = roadStack.shift();
        const path = pathStack.shift();
        const intersections: Intersection[] = [];
        let visitedIntersectionIds = [];
        let position = start;
        let closestIntersection = findClosestIntersection( road.id, position, road.model.direction );

        while ( closestIntersection !== null && visitedIntersectionIds.indexOf( closestIntersection.id ) === -1 ) {
            position = {
                column: closestIntersection.core.left, row: closestIntersection.core.top
            };
            intersections.push( closestIntersection );
            visitedIntersectionIds.push( closestIntersection.id );
            closestIntersection = findClosestIntersection( road.id, start, road.model.direction );
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
                if ( roadToRoadIds.indexOf( road.id + newRoad.id ) === -1 ) {
                    roadToRoadIds.push( ( road.id + newRoad.id ) );
                    roadStack.push( newRoad );
                    pathStack.push( [...path, newRoad.id] )
                }
            } )
        } )

        if ( road.cellIsInRoad( destination ) ) {
            validPath = path;
        }
    }

    return validPath;
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