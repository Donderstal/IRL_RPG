 const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN, STATE_WAITING } = require("../../../game-data/globals");
const { TileSquare } = require("../../../helpers/TileSquare");
const globals = require("../../../game-data/globals");

class I_Junction {
    constructor( ) {
        this.directions = [];
        this.roads      = [];

        this.core;
        this.openLanes = { }
        this.intersectionCars = [];

        this.directionsIn = [];
        this.directionsOut = [];

        this.leftFacingInLane = false;
        this.leftFacingOutLane = false;

        this.upFacingInLane = false;
        this.upFacingOutLane = false;
        
        this.rightFacingInLane = false;
        this.rightFacingOutLane = false;

        this.downFacingInLane = false;
        this.downFacingOutLane = false;
    }

    get leftFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_LEFT; })[0]; };
    get upFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_UP; })[0]; };
    get rightFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_RIGHT; })[0]; };
    get downFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_DOWN; })[0]; };

    hasDirection( direction ) {
        return this.directions.indexOf(direction) > -1;
    }

    directionEnds( direction ) {
        return this.directionsIn.indexOf(direction) > -1 && this.directionsOut.indexOf(direction) == -1;
    }

    directionStarts( direction ) {
        return this.directionsOut.indexOf(direction) > -1 && this.directionsIn.indexOf(direction) == -1;
    }

    checkIfRoadsEndOrStartAtIntersection( ) {
        this.roads.forEach( ( road ) => {
            switch( road.direction ) {
                case FACING_LEFT:
                    if ( this.core.leftColumn != road.endCol )
                        this.directionsOut.push( FACING_LEFT );
                    if ( this.core.rightColumn != road.startCol )
                        this.directionsIn.push( FACING_LEFT );
                    break;
                case FACING_UP:
                    if ( this.core.topRow != road.endRow )
                        this.directionsOut.push( FACING_UP );
                    if ( this.core.bottomRow != road.startRow )
                        this.directionsIn.push( FACING_UP );
                    break;                
                case FACING_RIGHT:
                    if ( this.core.rightColumn != road.endCol )
                        this.directionsOut.push( FACING_RIGHT );
                    if ( this.core.lefttColumn != road.startCol )
                        this.directionsIn.push( FACING_RIGHT );
                    break; 
                case FACING_DOWN:
                    if ( this.core.bottomRow != road.endRow )
                        this.directionsOut.push( FACING_DOWN );
                    if ( this.core.topRow != road.startRow )
                        this.directionsIn.push( FACING_DOWN );
                    break;       
                default:
                    console.log('direction ' + e + ' is not recognized')      
            }
        })
    }

    setLanes( ) {
        this.directions.forEach( ( e ) => {
            this.setLane( e )
        });
        this.directions.forEach((direction) => {
            this.openLanes[direction] = true;
        })
    }

    setLane( direction ) {
        if ( direction == FACING_LEFT ) {
            if (!this.directionStarts(FACING_LEFT) ) {
                this.leftFacingInLane = new TileSquare(
                    this.pushTilesToList(this.core.rightColumn, this.leftFacingRoad.topRow, this.core.rightColumn, this.leftFacingRoad.bottomRow, direction)
                );         
                this.leftFacingInLane.draw('yellow')
            }
            if (!this.directionEnds(FACING_LEFT) ) {
                this.leftFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.core.leftColumn - 3, this.leftFacingRoad.topRow, this.core.leftColumn - 3, this.leftFacingRoad.bottomRow, direction)
                );
                this.leftFacingOutLane.draw('orange')
            }
        }
        if ( direction == FACING_UP) {
            if ( !this.directionStarts(FACING_UP) ) {
                this.upFacingInLane = new TileSquare(
                    this.pushTilesToList(this.upFacingRoad.leftCol, this.core.bottomRow, this.upFacingRoad.rightCol, this.core.bottomRow, direction)
                );
                this.upFacingInLane.draw('purple')
            }
            if (!this.directionEnds(FACING_UP)) {
                this.upFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.upFacingRoad.leftCol, this.core.topRow - 3, this.upFacingRoad.rightCol, this.core.topRow - 3, direction)
                );
                this.upFacingOutLane.draw('pink')
            }
        }
        if ( direction == FACING_RIGHT ) {
            if (!this.directionStarts(FACING_RIGHT)) {
                this.rightFacingInLane = new TileSquare(
                    this.pushTilesToList(this.core.leftColumn - 3, this.rightFacingRoad.topRow, this.core.leftColumn - 3, this.rightFacingRoad.bottomRow, direction)
                );
                this.rightFacingInLane.draw('grey')
            }
            if (!this.directionEnds(FACING_RIGHT)) {
                this.rightFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.core.rightColumn, this.rightFacingRoad.topRow, this.core.rightColumn, this.rightFacingRoad.bottomRow, direction)
                );
                this.rightFacingOutLane.draw('black')
            }         
        }
        if ( direction == FACING_DOWN ) {
            if ( !this.directionStarts(FACING_DOWN) ) {
                this.downFacingInLane = new TileSquare(
                    this.pushTilesToList(this.downFacingRoad.leftCol, this.core.topRow - 3, this.downFacingRoad.rightCol, this.core.topRow - 3, direction)
                );
                this.downFacingInLane.draw('lightblue')
            }
            if ( !this.directionEnds(FACING_DOWN)) {
                this.downFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.downFacingRoad.leftCol, this.core.bottomRow, this.downFacingRoad.rightCol, this.core.bottomRow, direction)
                );
                this.downFacingOutLane.draw('blue')
            }
        }
    }

    pushTilesToList( col1, row1, col2, row2, direction ) {
        const FRONT = globals.GAME.FRONT
        let tileList = [];
        for( var i = 1; i <= this.laneDepth; i++ ) {
            tileList.push( FRONT.getTileAtCell( 
                direction == FACING_LEFT || direction == FACING_RIGHT ? col1 + i : col1, 
                direction == FACING_UP || direction == FACING_DOWN ? row1 + i : row1, 
            ), FRONT.getTileAtCell( 
                direction == FACING_LEFT || direction == FACING_RIGHT ? col2 + i : col2, 
                direction == FACING_UP || direction == FACING_DOWN ? row2 + i : row2, 
            ) )
        }
        return tileList;
    }

    setCarsToWaitIfLaneIsClosed( ) {
        this.intersectionCars.forEach( ( car ) => {
            if ( this.leftFacingInLane && car.direction == FACING_LEFT && !this.core.spriteIsInTileSquare(car)
                && this.leftFacingInLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_LEFT] ) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else if ( this.upFacingInLane && car.direction == FACING_UP && !this.core.spriteIsInTileSquare(car)
                && this.upFacingInLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_UP]) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else if ( this.rightFacingInLane && car.direction == FACING_RIGHT && !this.core.spriteIsInTileSquare(car)
                && this.rightFacingInLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_RIGHT]) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else if ( this.downFacingInLane && car.direction == FACING_DOWN && !this.core.spriteIsInTileSquare(car)
                && this.downFacingInLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_DOWN]) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else {
                car.State.addToPendingStateChanges(STATE_MOVING);
            }
        });
    }

    checkForCarsOnSquare( cars, square ) {
        let carOnLane = false;
        cars.forEach( (car) => {
            if ( square.spriteIsInTileSquare(car) ) {
                carOnLane = true;
            }
        })
        return carOnLane;
    }
}

module.exports = {
    I_Junction
}