const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require("../../../game-data/globals");
const { TileSquare } = require("../../../helpers/TileSquare");
const globals = require("../../../game-data/globals");

class I_Junction {
    constructor( ) {
        this.directions = [];
        this.roads      = [];

        this.core;
        this.openLanes = { }
        this.intersectionCars = [];

        this.leftFacingLane = false;
        this.upFacingLane = false;
        this.rightFacingLane = false;
        this.downFacingLane = false;

        console.log(this);
    }

    get leftFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_LEFT; })[0]; };
    get upFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_UP; })[0]; };
    get rightFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_RIGHT; })[0]; };
    get downFacingRoad( ) { return this.roads.filter( ( e ) => { return e.direction == FACING_DOWN; })[0]; };

    setLanes( ) {
        this.directions.forEach( ( e ) => {
            this.setLane( e )
        });
        this.directions.forEach((direction) => {
            this.openLanes[direction] = true;
        })
    }

    setLane( direction ) {
        const FRONT = globals.GAME.FRONT
        let tileList = [];
        switch( direction ) {
            case FACING_LEFT:
                for( var i = 1; i <= this.laneDepth; i++ ) {
                    tileList.push( FRONT.getTileAtCell( this.core.rightColumn + i, this.leftFacingRoad.topRow ) );
                    tileList.push( FRONT.getTileAtCell( this.core.rightColumn + i, this.leftFacingRoad.bottomRow ) );
                }
                this.leftFacingLane = new TileSquare(tileList);
                break;
            case FACING_UP:
                for( var i = 1; i <= this.laneDepth; i++ ) {
                    tileList.push( FRONT.getTileAtCell( this.upFacingRoad.leftCol, this.core.bottomRow + i ) );
                    tileList.push( FRONT.getTileAtCell( this.upFacingRoad.rightCol, this.core.bottomRow + i ) );
                }
                this.upFacingLane = new TileSquare(tileList);
                break;                
            case FACING_RIGHT:
                for( var i = 1; i <= this.laneDepth; i++ ) {
                    tileList.push( FRONT.getTileAtCell( this.core.leftColumn - i, this.rightFacingRoad.topRow ) );
                    tileList.push( FRONT.getTileAtCell( this.core.leftColumn - i, this.rightFacingRoad.bottomRow ) );
                }
                this.rightFacingLane = new TileSquare(tileList);
                break; 
            case FACING_DOWN:
                for( var i = 1; i <= this.laneDepth; i++ ) {
                    tileList.push( FRONT.getTileAtCell( this.downFacingRoad.leftCol, this.core.topRow - i ) );
                    tileList.push( FRONT.getTileAtCell( this.downFacingRoad.rightCol, this.core.topRow - i ) );
                }
                this.downFacingLane = new TileSquare(tileList);
                break;       
            default:
                console.log('direction ' + e + ' is not recognized')      
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
}

module.exports = {
    I_Junction
}