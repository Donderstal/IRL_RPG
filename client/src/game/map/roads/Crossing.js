const { I_Junction } = require("./I_Junction");
const globals = require("../../../game-data/globals");
const { TileSquare } = require("../../../helpers/TileSquare");
const { NPC } = require('../map-classes/NPC')

class Crossing extends I_Junction {
    constructor( pendingCrossings ) {
        super( )
        this.crossingSprites = [];
        this.laneDepth = 1;

        this.initCrossingFromPendingList( pendingCrossings );
        this.setLanes( );
        globals.GAME.BACK.ctx.fillStyle = 'white';
        globals.GAME.BACK.ctx.fillRect( this.core.left, this.core.top, this.core.width, this.core.height );
    }

    initCrossingFromPendingList( pendingCrossings ) {
        let tileList = [];

        pendingCrossings.forEach( ( pending ) => { 
            this.roads.push( pending.road );
            this.directions.push( pending.road.direction );
            tileList = [ ...pending.square.tileList, ...tileList ]
        })

        this.core = new TileSquare(  tileList );
        this.core.tileList.forEach( ( tile ) => { 
            let gridTile = globals.GAME.BACK.getTileAtCell( tile.col, tile.row );
            gridTile.setMovementCost( 0.1 ); 
        })
    }

    updateCrossingStatus( ) {
        this.openCrossing( );
        this.checkForSpritesOnCrossing( );
        this.checkForCarsNearCrossing( );
        this.setCarsToWaitIfLaneIsClosed( );
    }

    openCrossing( ) {
        this.directions.forEach((direction) => {
            this.openLanes[direction] = true;
        })
    }

    closeCrossing( ) {
        this.directions.forEach((direction) => {
            this.openLanes[direction] = false;
        })
    }

    checkForSpritesOnCrossing( ) {
        this.crossingSprites = [];
        this.intersectionCars = [];
        let sprites = globals.GAME.FRONT.allSprites.filter( ( e ) => { return e instanceof NPC || e.spriteId == 'PLAYER'; })
        sprites.forEach( (sprite) => {
            if ( this.core.spriteIsInTileSquare(sprite) ) {
                this.crossingSprites.push(sprite)
            }
        })
        if ( this.crossingSprites.length > 0 ) {
            this.closeCrossing( );
        }
        else {
            this.openCrossing( );
        };
    }

    checkForCarsNearCrossing( ) {
        if ( this.leftFacingInLane ) {
            this.checkForCarsOnSquare( this.leftFacingRoad.carsOnRoad, this.leftFacingInLane )
        }
        if ( this.upFacingInLane ) {
            this.checkForCarsOnSquare( this.upFacingRoad.carsOnRoad, this.upFacingInLane)
        }
        if ( this.rightFacingInLane ) {
            this.checkForCarsOnSquare(this.rightFacingRoad.carsOnRoad, this.rightFacingInLane)
        }
        if ( this.downFacingInLane ) {
            this.checkForCarsOnSquare(this.downFacingRoad.carsOnRoad, this.downFacingInLane)   
        }
    }

    checkForCarsOnSquare( cars, square ) {
        super.checkForCarsOnSquare( cars, square);
        this.intersectionCars.push(cars);
    }
}

module.exports = {
    Crossing
}