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
        switch( direction ) {
            case FACING_LEFT:
                this.leftFacingLane = new TileSquare(
                    this.pushTilesToList(this.core.rightColumn, this.leftFacingRoad.topRow, this.core.rightColumn, this.leftFacingRoad.bottomRow, direction)
                );
                break;
            case FACING_UP:
                this.upFacingLane = new TileSquare(
                    this.pushTilesToList(this.upFacingRoad.leftCol, this.core.bottomRow, this.upFacingRoad.rightCol, this.core.bottomRow, direction)
                );
                break;                
            case FACING_RIGHT:
                this.rightFacingLane = new TileSquare(
                    this.pushTilesToList(this.core.leftColumn, this.rightFacingRoad.topRow, this.core.leftColumn, this.rightFacingRoad.bottomRow, direction)
                );
                break; 
            case FACING_DOWN:
                this.downFacingLane = new TileSquare(
                    this.pushTilesToList(this.downFacingRoad.leftCol, this.core.topRow, this.downFacingRoad.rightCol, this.core.topRow, direction)
                );
                break;       
            default:
                console.log('direction ' + e + ' is not recognized')      
        }
    }

    pushTilesToList( col1, row1, col2, row2, direction ) {
        const FRONT = globals.GAME.FRONT
        let tileList = [];
        for( var i = 1; i <= this.laneDepth; i++ ) {
            tileList.push( FRONT.getTileAtCell( 
                direction == FACING_LEFT ? col1 + i : direction == FACING_RIGHT ? col1 + i : col1, 
                direction == FACING_UP ? row1 + i : direction == FACING_DOWN ? row1 + i : row1, 
            ), FRONT.getTileAtCell( 
                direction == FACING_LEFT ? col2 + i : direction == FACING_RIGHT ? col2 + i : col2, 
                direction == FACING_UP ? row2 + i : direction == FACING_DOWN ? row2 + i : row2, 
            ) )
        }
        return tileList;
    }

    handleIntersectionCars( ) {
        this.intersectionCars.forEach( ( car ) => {
            if ( this.leftFacingLane && car.direction == FACING_LEFT && !this.core.spriteIsInTileSquare(car)
                && this.leftFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_LEFT]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.upFacingLane && car.direction == FACING_UP && !this.core.spriteIsInTileSquare(car)
                && this.upFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_UP]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.rightFacingLane && car.direction == FACING_RIGHT && !this.core.spriteIsInTileSquare(car)
                && this.rightFacingLane.spriteIsInTileSquare(car) && !this.openLanes[FACING_RIGHT]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.downFacingLane && car.direction == FACING_DOWN && !this.core.spriteIsInTileSquare(car)
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