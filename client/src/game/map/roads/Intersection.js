const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require("../../../game-data/globals");
const { TileSquare } = require("../../../helpers/TileSquare");
const globals = require("../../../game-data/globals");
class Intersection {
    constructor( pendingIntersections ) {
        this.directions = [];
        this.roads      = [];

        this.core;
        this.openLanes = { }
        this.intersectionCars = [];

        this.leftFacingLane = false;
        this.upFacingLane = false;
        this.rightFacingLane = false;
        this.downFacingLane = false;

        this.initIntersectionFromPendingList( pendingIntersections );
        this.setLanes( );
        console.log(this);
    }

    get leftFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_LEFT; })[0]; };
    get upFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_UP; })[0]; };
    get rightFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_RIGHT; })[0]; };
    get downFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_DOWN; })[0]; };

    setLanes( ) {
        const FRONT = globals.GAME.FRONT
        this.directions.forEach( ( e ) => {
            switch( e ) {
                case FACING_LEFT:
                    this.leftFacingLane = new TileSquare( [ 
                        FRONT.getTileAtCell( this.core.rightColumn + 1, this.leftFacingRoad.topRow ),
                        FRONT.getTileAtCell( this.core.rightColumn + 1, this.leftFacingRoad.topRow ),
                        FRONT.getTileAtCell( this.core.rightColumn + 2, this.leftFacingRoad.bottomRow ),
                        FRONT.getTileAtCell( this.core.rightColumn + 2, this.leftFacingRoad.bottomRow )
                    ] );
                    break;
                case FACING_UP:
                    this.upFacingLane = new TileSquare( [ 
                        FRONT.getTileAtCell( this.upFacingRoad.leftCol, this.core.bottomRow + 1 ),
                        FRONT.getTileAtCell( this.upFacingRoad.rightCol, this.core.bottomRow + 1 ),
                        FRONT.getTileAtCell( this.upFacingRoad.leftCol, this.core.bottomRow + 2),
                        FRONT.getTileAtCell( this.upFacingRoad.rightCol, this.core.bottomRow + 2 )
                    ] );
                    break;                
                case FACING_RIGHT:
                    this.rightFacingLane = new TileSquare( [ 
                        FRONT.getTileAtCell( this.core.leftColumn - 1, this.rightFacingRoad.topRow ),
                        FRONT.getTileAtCell( this.core.leftColumn - 1, this.rightFacingRoad.topRow ),
                        FRONT.getTileAtCell( this.core.leftColumn - 2, this.rightFacingRoad.bottomRow ),
                        FRONT.getTileAtCell( this.core.leftColumn - 2, this.rightFacingRoad.bottomRow )
                    ] );
                    break; 
                case FACING_DOWN:
                    this.downFacingLane = new TileSquare( [ 
                        FRONT.getTileAtCell( this.downFacingRoad.leftCol, this.core.topRow - 1 ),
                        FRONT.getTileAtCell( this.downFacingRoad.rightCol, this.core.topRow - 1 ),
                        FRONT.getTileAtCell( this.downFacingRoad.leftCol, this.core.topRow - 2 ),
                        FRONT.getTileAtCell( this.downFacingRoad.rightCol, this.core.topRow - 2 )
                    ] );
                    break;       
                default:
                    console.log('direction ' + e + ' is not recognized')      
            }
        });
        this.directions.forEach((direction) => {
            this.openLanes[direction] = true;
        })
    }

    initIntersectionFromPendingList( pendingList ) {
        let tileList = [];

        pendingList.forEach( ( pending ) => {
            pending.directions.forEach( ( e ) => {
                if ( !(this.directions.indexOf( e ) > -1) ) {
                    this.directions.push(e);
                }
            }); 
            pending.roads.forEach( ( road ) => {
                if ( !(this.roads.indexOf( road ) > -1) ) {
                    this.roads.push(road);
                }
            });
            tileList = [ ...pending.square.tileList, ...tileList ]
        });

        this.core = new TileSquare( tileList );
    }

    updateIntersectionStatus( ) {
        this.intersectionCars = [];
        Object.keys(this.openLanes).forEach( (key) => { 
            this.openLanes[key] = true;
        })

        this.checkForCarsOnIntersection( );
        this.handleIntersectionCars( );
    }

    checkForCarsOnIntersection( ) {
        let horizontalCars = [];
        let verticalCars = [];

        if ( this.leftFacingLane && this.checkForCarsOnSquare( this.leftFacingRoad.carsOnRoad, this.leftFacingLane )) {
            this.closeLane( FACING_DOWN );
            horizontalCars = [...this.leftFacingRoad.carsOnRoad];
        }
        if ( this.upFacingLane && this.checkForCarsOnSquare( this.upFacingRoad.carsOnRoad, this.upFacingLane)) {
            this.closeLane( FACING_RIGHT );
            verticalCars = [...this.upFacingRoad.carsOnRoad]
        }
        if ( this.rightFacingLane && this.checkForCarsOnSquare(this.rightFacingRoad.carsOnRoad, this.rightFacingLane)) {
            this.closeLane( FACING_UP );
            horizontalCars = [...horizontalCars, ...this.rightFacingRoad.carsOnRoad];
        }
        if ( this.downFacingLane && this.checkForCarsOnSquare(this.downFacingRoad.carsOnRoad, this.downFacingLane)) {
            this.closeLane( FACING_LEFT );        
            verticalCars = [...verticalCars, ...this.downFacingRoad.carsOnRoad]        
        }

        if ( this.checkForCarsOnSquare( horizontalCars, this.core ) ) {
            this.closeLane( FACING_UP );
            this.closeLane( FACING_DOWN );
            this.openLane( FACING_LEFT );
            this.openLane( FACING_RIGHT );
        } 
        else if ( this.checkForCarsOnSquare( verticalCars, this.core ) ) {
            this.closeLane( FACING_LEFT );
            this.closeLane( FACING_RIGHT );
            this.openLane( FACING_UP );
            this.openLane( FACING_DOWN );
        }
    }

    handleIntersectionCars( ) {
        this.intersectionCars.forEach( ( car ) => {
            if ( this.leftFacingLane && car.direction == FACING_LEFT
                && this.leftFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_LEFT]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.upFacingLane && car.direction == FACING_UP
                && this.upFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_UP]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.rightFacingLane && car.direction == FACING_RIGHT
                && this.rightFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_RIGHT]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.downFacingLane && car.direction == FACING_DOWN
                && this.downFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_DOWN]) {
                car.setWaitAtIntersection( ); 
            }
            else {
                car.unsetWaitAtIntersection( );
            }
        });
    }

    checkForCarsOnSquare( cars, square ) {
        let carOnLane = false;
        cars.forEach( (car) => {
            if ( square.spriteIsInTileSquare(car) ) {
                carOnLane = true;
                this.intersectionCars.push(car)
            }
        })
        return carOnLane;
    }

    closeLane( direction ) {
        this.openLanes[direction] = false;
    }

    openLane( direction ) {
        this.openLanes[direction] = true;
    }
}

module.exports = {
    Intersection
}