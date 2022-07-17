import { I_Junction } from "./I_Junction";
import globals from "../../../game-data/globals";
import { TileSquare } from "../../../helpers/TileSquare";
import type { Sprite } from "../../core/Sprite";
import type { Road } from "./Road";

export class Crossing extends I_Junction {
    crossingSprites: Sprite[];
    constructor( pendingCrossings ) {
        super( )
        this.crossingSprites = [];
        this.laneDepth = 1;

        this.initCrossingFromPendingList( pendingCrossings );
        this.setLanes( );
        globals.GAME.BACK.ctx.fillStyle = 'white';
        globals.GAME.BACK.ctx.fillRect( this.core.left, this.core.top, this.core.width, this.core.height );
    }

    initCrossingFromPendingList( pendingCrossings: { road: Road, square: TileSquare }[] ): void {
        let tileList = [];

        pendingCrossings.forEach( ( pending ) => { 
            this.roads.push( pending.road );
            this.directions.push( pending.road.model.direction );
            tileList = [ ...pending.square.tileList, ...tileList ]
        })

        this.core = new TileSquare(  tileList );
        this.core.tileList.forEach( ( tile ) => { 
            let gridTile = globals.GAME.BACK.getTileAtCell( tile.column, tile.row );
            gridTile.setMovementCost( 0.1 ); 
        })
    }

    updateCrossingStatus( ): void {
        this.openCrossing( );
        this.checkForSpritesOnCrossing( );
        this.checkForCarsNearCrossing( );
        this.setCarsToWaitIfLaneIsClosed( );
    }

    openCrossing( ): void {
        this.directions.forEach((direction) => {
            this.openLanes[direction] = true;
        })
    }

    closeCrossing( ): void {
        this.directions.forEach((direction) => {
            this.openLanes[direction] = false;
        })
    }

    checkForSpritesOnCrossing( ): void {
        this.crossingSprites = [];
        this.intersectionCars = [];
        let sprites = globals.GAME.FRONT.allSprites;
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

    checkForCarsNearCrossing( ): void {
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

    checkForCarsOnSquare( cars: Sprite[], square: TileSquare ): boolean {
        this.intersectionCars.push( ...cars );
        return super.checkForCarsOnSquare( cars, square );
    }
}