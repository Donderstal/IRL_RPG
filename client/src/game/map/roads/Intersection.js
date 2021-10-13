const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require("../../../game-data/globals");
const { I_Junction } = require("./I_Junction");

class Intersection extends I_Junction {
    constructor( pendingIntersections ) {
        super( pendingIntersections );
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