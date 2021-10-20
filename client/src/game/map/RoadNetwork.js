const globals = require('../../game-data/globals')
const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require('../../game-data/globals')
const { TileSquare } = require('../../helpers/TileSquare');
const { getUniqueId } = require('../../helpers/utilFunctions');
const { Crossing } = require('./roads/Crossing');
const { Intersection } = require('./roads/Intersection');
const { Road } = require('./roads/Road');

class RoadNetwork {
    constructor( roads ) {
        this.roads = [];
        this.roadIds = [];
        this.initRoads( roads );

        this.pendingIntersections = [];
        this.intersections = [];
        this.intersectionIds = [];
        this.setIntersections( );

        this.pendingCrossings = [];
        this.crossings = [];
        this.setCrossings( );
    }

    getRoadById( id ) {
        return this.roads.filter((e) => {return e.id==id;})[0];
    }

    getVehiclePath( startingRoadId ) {
        let activeRoadID = startingRoadId;
        let path = [ startingRoadId ];
        let visitedIntersections = [];
        let availableIntersections = this.getIntersectionsOnRoadWithId( activeRoadID, visitedIntersections );
        let nextIntersection = availableIntersections.shift();
        while ( nextIntersection != undefined ) {
            const activeRoad = this.getRoadById( activeRoadID );
            const roadEndsAtIntersection = nextIntersection.directionEnds(activeRoad.direction);
            const intersectingRoadIds = nextIntersection.getIntersectingRoadIds( activeRoadID );
            const turnAtIntersection = intersectingRoadIds.length > 0 && Math.random( ) > 0.5;

            visitedIntersections.push(nextIntersection.id);
            
            if ( roadEndsAtIntersection || turnAtIntersection ) {
                if (intersectingRoadIds.length == 2 ){
                    activeRoadID = Math.random > 0.5 ? intersectingRoadIds[0] : intersectingRoadIds[1];
                }
                else if (intersectingRoadIds.length == 1) {
                    activeRoadID = intersectingRoadIds.shift();
                }
                path.push(activeRoadID);
                availableIntersections = this.getIntersectionsOnRoadWithId( activeRoadID, visitedIntersections );
            }

            nextIntersection = availableIntersections.shift();
        }
        
        return path;
    }

    getIntersectionsOnRoadWithId( roadId, visitedIntersections ) {
        const activeRoad = this.getRoadById( roadId );
        let intersections = this.intersections.filter( (e) => {return e.roadIds.indexOf(roadId) != -1 && visitedIntersections.indexOf(e.id) == -1} );
        switch( activeRoad.direction ) {
            case FACING_LEFT:
                return intersections.sort((a, b) => { return b.core.leftColumn - a.core.leftColumn });
            case FACING_UP:
                return intersections.sort((a, b) => { return b.core.topRow - a.core.topRow });
            case FACING_RIGHT:
                return intersections.sort((a, b) => { return a.core.leftColumn - b.core.leftColumn });
            case FACING_DOWN:
                return intersections.sort((a, b) => { return a.core.topRow - b.core.topRow });
            default:
                console.log('direction ' + direction + ' not recognized' )
        };
    }

    areItemsInList( list, item1, item2 ) {
        return list.indexOf( item1 ) > -1 && list.indexOf( item2 ) > -1
    }

    initRoads( roads ) {
        roads.forEach( ( road ) => {
            const id = getUniqueId(this.roadIds);
            this.roads.push( new Road( road, id ) )
            this.roadIds.push( id );
        });
    }

    handleRoadIntersections( ) {
        this.intersections.forEach( ( intersection ) => { intersection.updateIntersectionStatus( ); })
    }

    handleRoadCrossings( ) {
        this.crossings.forEach( ( intersection ) => { intersection.updateCrossingStatus( ); })
    }

    handleCarCounter( ) {
        this.roads.forEach( ( e ) => { e.handleCarCounter( ); })
    }

    roadsIntersect( horizontalRoad, verticalRoad ) {
        return ( Math.min(horizontalRoad.startCol, horizontalRoad.endCol) <= verticalRoad.leftCol )
        && ( Math.max(horizontalRoad.startCol, horizontalRoad.endCol) >= verticalRoad.rightCol )
        && ( Math.min(verticalRoad.startRow, verticalRoad.endRow) <= horizontalRoad.topRow )
        && ( Math.max(verticalRoad.startRow, verticalRoad.endRow) >= horizontalRoad.bottomRow );
    }

    setIntersections( ) {
        this.roads.forEach( ( e ) => { 
            let currentRoad = e;
            let otherRoads = this.roads.filter( ( e ) => { return e.alignment != currentRoad.alignment; })
            otherRoads.forEach( ( otherRoad ) => {
                if (this.roadsIntersect(currentRoad.alignment == 'HORI' ? currentRoad : otherRoad, currentRoad.alignment == 'HORI' ? otherRoad : currentRoad ) ) {
                    this.addPendingIntersection(currentRoad.alignment == 'HORI' ? currentRoad : otherRoad, currentRoad.alignment == 'HORI' ? otherRoad : currentRoad );
                }
            })
        })
        this.checkPendingIntersections( );
    }

    addPendingIntersection( horizontalRoad, verticalRoad ) {
        let FRONT = globals.GAME.FRONT
        let skip = false;
        this.pendingIntersections.forEach( ( e ) => {
            if ( this.areItemsInList( e.roadIds, horizontalRoad.id, verticalRoad.id )) {
                skip = true;
            }
        })
        if ( !skip ) {
            this.pendingIntersections.push( {
                'roads': [ verticalRoad, horizontalRoad ],
                'roadIds': [ verticalRoad.id, horizontalRoad.id ],
                'directions' : [ verticalRoad.direction, horizontalRoad.direction ],
                'square': new TileSquare( [
                    FRONT.getTileAtCell( verticalRoad.leftCol, horizontalRoad.topRow ),
                    FRONT.getTileAtCell( verticalRoad.rightCol, horizontalRoad.topRow ),
                    FRONT.getTileAtCell( verticalRoad.leftCol, horizontalRoad.bottomRow ),
                    FRONT.getTileAtCell( verticalRoad.rightCol, horizontalRoad.bottomRow )
                ] )
            } )                            
        }
    }

    checkPendingIntersections( ) {
        while ( this.pendingIntersections.length > 0 ) {
            const pendingIntersection = this.pendingIntersections.shift( );
            const currentDirections = pendingIntersection.directions;
            const pendingSquare = pendingIntersection.square;
            let filteredIntersections = [];

            if ( this.areItemsInList(currentDirections, FACING_DOWN, FACING_LEFT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areItemsInList(e.directions, FACING_UP, FACING_LEFT) && e.square.leftColumn == pendingSquare.rightColumn + 1 && e.square.bottomRow == pendingSquare.bottomRow )
                        || ( this.areItemsInList(e.directions, FACING_DOWN, FACING_RIGHT) && e.square.topRow == pendingSquare.bottomRow + 1 && e.square.rightColumn == pendingSquare.rightColumn ) 
                        || ( this.areItemsInList(e.directions, FACING_UP, FACING_RIGHT) && e.square.top == pendingSquare.bottom + 1 && e.square.leftColumn == pendingSquare.rightColumn + 1 )
                    )
                } );
            }
            else if ( this.areItemsInList(currentDirections, FACING_DOWN, FACING_RIGHT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areItemsInList(e.directions, FACING_UP, FACING_LEFT) && e.square.bottomRow == pendingSquare.topRow - 1 && e.square.leftColumn == pendingSquare.rightColumn + 1 )
                        || ( this.areItemsInList(e.directions, FACING_DOWN, FACING_LEFT) && e.square.bottomRow == pendingSquare.topRow + 1 && e.square.rightColumn == pendingSquare.rightColumn )
                        || ( this.areItemsInList(e.directions, FACING_UP, FACING_RIGHT) && e.square.leftColumn == pendingSquare.rightColumn + 1 && e.square.bottomRow == pendingSquare.bottomRow )
                    )
                } );
            } 
            else if ( this.areItemsInList(currentDirections, FACING_UP, FACING_LEFT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areItemsInList(e.directions, FACING_DOWN, FACING_LEFT) && e.square.rightColumn == pendingSquare.leftColumn - 1 && e.square.bottomRow == pendingSquare.bottomRow )
                        || ( this.areItemsInList(e.directions, FACING_DOWN, FACING_RIGHT) && e.square.topRow == pendingSquare.bottomRow + 1 && e.square.rightColumn == pendingSquare.leftColumn - 1 )
                        || ( this.areItemsInList(e.directions, FACING_UP, FACING_RIGHT) && e.square.topRow == pendingSquare.bottomRow + 1 && e.square.rightColumn == pendingSquare.rightColumn )
                    )
                } );
            }
            else if ( this.areItemsInList(currentDirections, FACING_UP, FACING_RIGHT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areItemsInList(e.directions, FACING_UP, FACING_LEFT) && e.square.bottomRow == pendingSquare.topRow - 1 && e.square.rightColumn == pendingSquare.rightColumn )
                        || ( this.areItemsInList(e.directions, FACING_DOWN, FACING_LEFT) && e.square.bottomRow == pendingSquare.topRow - 1 && e.square.rightColumn == pendingSquare.leftColumn - 1 )
                        || ( this.areItemsInList(e.directions, FACING_DOWN, FACING_RIGHT) && e.square.rightColumn == pendingSquare.leftColumn - 1 && e.square.bottomRow == pendingSquare.bottomRow )
                    )
                } );
            } 

            filteredIntersections.forEach( ( e ) => {
                let index =  this.pendingIntersections.indexOf( e );
                this.pendingIntersections.splice( index, 1 )
            })
            const id = getUniqueId(this.intersectionIds);
            this.intersections.push( new Intersection([ ...filteredIntersections, pendingIntersection], id))
            this.intersectionIds.push(id);
        }
    }

    setCrossings( ) {
        const FRONT = globals.GAME.FRONT;
        this.roads.forEach( ( e ) => { 
            if ( e.crossings ) {
                let road = e
                road.crossings.forEach( ( crossing ) => {
                    console.log(crossing);
                    console.log(road);
                    let horizontal = road.alignment == 'HORI';
                    this.pendingCrossings.push( {
                        'road': road,
                        'location' : crossing,
                        'square': new TileSquare( [
                            FRONT.getTileAtCell( horizontal ? crossing[0] : road.leftCol, !horizontal ? crossing[0] : road.topRow ),
                            FRONT.getTileAtCell( horizontal ? crossing[0] : road.rightCol, !horizontal ? crossing[0] : road.bottomRow ),
                            FRONT.getTileAtCell( horizontal ? crossing[1] : road.leftCol, !horizontal ? crossing[1] : road.topRow ),
                            FRONT.getTileAtCell( horizontal ? crossing[1] : road.rightCol, !horizontal ? crossing[1] : road.bottomRow )
                        ] )
                    } )                     
                });
            };
        });

        this.checkPendingCrossings( );
    }

    checkPendingCrossings( ) {
        while ( this.pendingCrossings.length > 0 ) {
            const pendingCrossing = this.pendingCrossings.shift( );
            const pendingRoad = pendingCrossing.road;
            let filteredCrossings = this.pendingCrossings.filter( ( e ) => { 
                return e.road !== pendingRoad && e.road.alignment == pendingRoad.alignment && JSON.stringify(e.location) == JSON.stringify(pendingCrossing.location)
                && ( e.road.alignment == 'HORI' 
                    ? (e.road.topRow == pendingRoad.bottomRow + 1 || e.road.bottomRow == pendingRoad.topRow - 1)
                    : (e.road.leftCol == pendingRoad.rightCol + 1 || e.road.rightCol == pendingRoad.leftCol - 1)
                );
            })

            filteredCrossings.forEach( ( e ) => {
                let index =  this.pendingCrossings.indexOf( e );
                this.pendingCrossings.splice( index, 1 )
            })
            this.crossings.push( new Crossing([ ...filteredCrossings, pendingCrossing]))
        }
    }
}

module.exports = { 
    RoadNetwork
}