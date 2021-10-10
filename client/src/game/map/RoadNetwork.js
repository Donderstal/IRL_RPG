const globals = require('../../game-data/globals')
const { Counter } = require('../../helpers/Counter');
const { Road } = require('./roads/Road');

const carCounter = new Counter( 5000, true );

class RoadNetwork {
    constructor( roads ) {
        this.roads = [];
        this.initRoads( roads )
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
        this.roads.forEach( ( road ) => { road.checkIfCarsAreNearingIntersection( ) ;});
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
}

module.exports = { 
    RoadNetwork
}