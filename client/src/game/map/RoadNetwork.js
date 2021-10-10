const globals = require('../../game-data/globals')
const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require('../../game-data/globals')
const { Counter } = require('../../helpers/Counter');
const { TileSquare } = require('../../helpers/TileSquare');
const { Intersection } = require('./roads/Intersection');
const { Road } = require('./roads/Road');

const carCounter = new Counter( 5000, true );

class RoadNetwork {
    constructor( roads ) {
        this.roads = [];
        this.initRoads( roads );

        this.pendingIntersections = [];
        this.intersections = [];
        this.setIntersections( );
    }

    areDirectionsInList( directions, direction1, direction2) {
        return directions.indexOf( direction1 ) > -1 && directions.indexOf( direction2 ) > -1
    }

    initRoads( roads ) {
        roads.forEach( ( road, index ) => {
            this.roads.push( new Road( road, index ) )
        });

        if ( roads.length > 1 ) {
            this.roads.forEach( ( road ) => {
                road.checkForIntersections( this.roads )
            })
        }
    }

    generateCar(  ) {
        const spawnableRoads = this.roads.filter( ( road ) => { return road.hasStart })
        const activeRoad = spawnableRoads[ Math.floor(Math.random() * spawnableRoads.length) ];
        if ( !activeRoad.startCellIsBlocked ) {
            const carData = activeRoad.getCarDataForTile( )
            globals.GAME.FRONT.setVehicleToTile( carData )
        }
    }

    handleRoadIntersections( ) {
        this.roads.forEach( ( road ) => { road.checkIfCarsAreNearingIntersection( ); });
        this.intersections.forEach( ( intersection ) => { intersection.updateIntersectionStatus( ); })
    }

    handleCarCounter( ) {
        if ( this.roads.length > 0 ) {
            if ( carCounter.countAndCheckLimit( ) ) {
                this.generateCar( );
            }
        }
        else {
            carCounter.resetCounter( );
        }
    }

    roadsIntersect( horizontalRoad, verticalRoad ) {
        return (horizontalRoad.startCol < verticalRoad.leftCol && horizontalRoad.endCol > verticalRoad.rightCol) 
        || (horizontalRoad.startCol > verticalRoad.leftCol && horizontalRoad.endCol < verticalRoad.rightCol)
    }

    setIntersections( ) {
        this.roads.forEach( ( e ) => { 
            let currentRoad = e;
            let otherRoads = this.roads.filter( ( e ) => { return e != currentRoad; })
            otherRoads.forEach( ( otherRoad ) => {
                if ( currentRoad.alignment == 'HORI' && otherRoad.alignment == 'VERT' && this.roadsIntersect( currentRoad, otherRoad )) {
                    this.addPendingIntersection(currentRoad, otherRoad); 
                }
                else if ( currentRoad.alignment == 'VERT' && otherRoad.alignment == 'HORI' && this.roadsIntersect( otherRoad, currentRoad )) {
                    this.addPendingIntersection(otherRoad, currentRoad); 
                }
            })
        })
        this.checkPendingIntersections( );
    }

    addPendingIntersection( horizontalRoad, verticalRoad ) {
        let FRONT = globals.GAME.FRONT
        let skip = false;
        this.pendingIntersections.forEach( ( e ) => {
            if ( this.areDirectionsInList( e.directions, horizontalRoad.direction, verticalRoad.direction )) {
                skip = true;
            }
        })
        if ( !skip ) {
            this.pendingIntersections.push( {
                'roads': [ verticalRoad, horizontalRoad ],
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

            if ( this.areDirectionsInList(currentDirections, FACING_DOWN, FACING_LEFT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areDirectionsInList(e.directions, FACING_UP, FACING_LEFT) && e.square.left == pendingSquare.right )
                        || ( this.areDirectionsInList(e.directions, FACING_DOWN, FACING_RIGHT) && e.square.top == pendingSquare.bottom ) 
                        || ( this.areDirectionsInList(e.directions, FACING_UP, FACING_RIGHT) && e.square.top == pendingSquare.bottom )
                    )
                } );
            }
            else if ( this.areDirectionsInList(currentDirections, FACING_DOWN, FACING_RIGHT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areDirectionsInList(e.directions, FACING_UP, FACING_LEFT) && e.square.bottom == pendingSquare.top )
                        || ( this.areDirectionsInList(e.directions, FACING_DOWN, FACING_LEFT) && e.square.bottom == pendingSquare.top )
                        || ( this.areDirectionsInList(e.directions, FACING_UP, FACING_RIGHT) && e.square.left == pendingSquare.right )
                    )
                } );
            } 
            else if ( this.areDirectionsInList(currentDirections, FACING_UP, FACING_LEFT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areDirectionsInList(e.directions, FACING_DOWN, FACING_LEFT) && e.square.right == pendingSquare.left )
                        || ( this.areDirectionsInList(e.directions, FACING_DOWN, FACING_RIGHT) && e.square.top == pendingSquare.bottom )
                        || ( this.areDirectionsInList(e.directions, FACING_UP, FACING_RIGHT) && e.square.top == pendingSquare.bottom )
                    )
                } );
            }
            else if ( this.areDirectionsInList(currentDirections, FACING_UP, FACING_RIGHT) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => { 
                    return (
                        ( this.areDirectionsInList(e.directions, FACING_UP, FACING_LEFT) && e.square.bottom == pendingSquare.top )
                        || ( this.areDirectionsInList(e.directions, FACING_DOWN, FACING_LEFT) && e.square.bottom == pendingSquare.top )
                        || ( this.areDirectionsInList(e.directions, FACING_DOWN, FACING_RIGHT) && e.square.right == pendingSquare.left )
                    )
                } );
            } 

            filteredIntersections.forEach( ( e ) => {
                let index =  this.pendingIntersections.indexOf( e );
                this.pendingIntersections.splice( index, 1 )
            })
            this.intersections.push( new Intersection([ ...filteredIntersections, pendingIntersection]))
        }
    }
}

module.exports = { 
    RoadNetwork
}