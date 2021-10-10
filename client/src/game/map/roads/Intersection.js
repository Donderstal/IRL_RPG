const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require("../../../game-data/globals");
const { TileSquare } = require("../../../helpers/TileSquare");
const globals = require("../../../game-data/globals");
class Intersection {
    constructor( pendingIntersections ) {
        this.directions = [];
        this.roads      = [];

        this.core;

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
}

module.exports = {
    Intersection
}