import { I_Junction } from "./I_Junction";
import { TileSquare } from "../../../helpers/TileSquare";
import type { Sprite } from "../../core/Sprite";
import type { Road } from "./Road";
import { getBackTilesGrid, getTileOnCanvasByCell } from "../../canvas/canvasGetter";
import { CanvasTypeEnum } from "../../../enumerables/CanvasTypeEnum";

export class Crossing extends I_Junction {
    crossingSprites: Sprite[];
    constructor( pendingCrossings ) {
        super( )
        this.crossingSprites = [];
        this.laneDepth = 1;

        this.initCrossingFromPendingList( pendingCrossings );
        this.setLanes();
        const backTilesContext = getBackTilesGrid().ctx;
        backTilesContext.fillStyle = 'white';
        backTilesContext.fillRect( this.core.left, this.core.top, this.core.width, this.core.height );
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
            let gridTile = getTileOnCanvasByCell( tile, CanvasTypeEnum.background );
            gridTile.setMovementCost( 0.1 ); 
        })
    }

    updateCrossingStatus( ): void {
        this.openCrossing( );
        this.checkForSpritesOnCrossing( );
        this.checkForCarsNearCrossing( );
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
        let sprites = null;
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
        
    }

    checkForCarsOnSquare( cars: Sprite[], square: TileSquare ): boolean {
        this.intersectionCars.push( ...cars );
        return super.checkForCarsOnSquare( cars, square );
    }
}