import { CanvasGrid } from '../core/CanvasGrid';
import { RoadNetwork } from '../map/RoadNetwork';
import { getDataModelByKey } from '../../resources/spriteDataResources';
import type { Grid } from '../core/Grid';
import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
import type { Tile } from '../core/Tile';
import type { MapModel } from '../../models/MapModel';
import { initCanvasObjectModel } from '../../factories/modelFactory';
import { determineShortestPath } from '../../helpers/pathfindingHelpers';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { DestinationType } from '../../enumerables/DestinationType';
import { getCollectableId, isInCollectableRegistry } from '../../registries/collectableRegistry';
import { getActiveMapKey, getNeighbourhoodModel } from '../neighbourhoodModule';
import { getBlockedCellList, isTileBlocked, tileIsValidDestination } from '../map/blockedTilesRegistry';
import { getCreateSpriteContract } from '../../factories/contractFactory';
import { registerNewContract } from '../../contracts/contractRegistry';
import type { GridCellModel } from '../../models/GridCellModel';

export class BackSpriteGrid extends CanvasGrid {
    //activeEffects: GraphicalEffect[];
    grid: Grid;
    roadNetwork: RoadNetwork;
    constructor( x: number, y: number, canvas: OffscreenCanvas, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
        //this.activeEffects = [];
        this.roadNetwork;
    };

    addEffect( name: string, x: number, y: number, endX: number = null, endY: number = null ): void {
        //this.activeEffects.push( getEffect( name, x, y, endX, endY ) );
    }

    setForegroundData( mapModel: MapModel, carSpawnRate: number ) {
        this.model = mapModel;
        if ( this.model.roads !== undefined ) 
            this.roadNetwork = new RoadNetwork( this.model.roads, this.canvas, carSpawnRate );
    }

    clearMap( ): void {
        this.grid = null;
        this.roadNetwork = null;
    }

    generateWalkingNPC( ): void {
        let start: GridCellModel;
        let end: GridCellModel;
        let visitedStarts = [];
        let visitedEnds = [];
        let validPath = false;

        while ( visitedStarts.length < this.model.spawnPoints.length && !validPath ) {
            start = this.getValidSpawnPoint( visitedStarts );
            while ( visitedEnds.length < this.model.spawnPoints.length - 1 && !validPath ) {
                end = this.getValidSpawnPoint( [start, ...visitedEnds] );
                if ( end === undefined ) return;
                let tileStart = this.getTileAtCell( start.column, start.row );
                let tileEnd = this.getTileAtCell( end.column, end.row );
                validPath = determineShortestPath( tileStart, tileEnd, this.grid.columns, this.grid.rows, getBlockedCellList() ) !== null;

                visitedEnds.push( end );
            }
            visitedEnds = [];
            visitedStarts.push( start );
        }
        if ( validPath ) {
            this.generateRandomWalkingSprite( start, end );
        }
    }

    getValidSpawnPoint( spawnPointsToFilter: GridCellModel[] = [] ): GridCellModel {
        let availableSpawnPoints = this.model.spawnPoints.filter( ( e ) => {
            let point = e;
            return spawnPointsToFilter.length !== 0 ? spawnPointsToFilter.filter( ( x ) => {
                return point.column === x.column && point.row === x.row
            } ).length === 0 : true;
        } );
        let unblockedSpawnPoints = availableSpawnPoints.filter( tileIsValidDestination );
        return unblockedSpawnPoints[Math.floor( Math.random() * unblockedSpawnPoints.length )];
    }

    getValidSpawnStart(): GridCellModel {
        let validLocations = this.filterSpawnPoints( )
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    getValidSpawnDestination( startLocation: GridCellModel ): GridCellModel {
        let validLocations = this.filterSpawnPoints( startLocation );
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    filterSpawnPoints( startLocation: GridCellModel = null ): GridCellModel[] {
        return this.model.spawnPoints.filter( ( e) => {
            return !isTileBlocked( e ) && ( startLocation == null || (e.column != startLocation.column && e.row !== startLocation.row));
        })
    }

    generateRandomWalkingSprite( start: GridCellModel, destination: GridCellModel ) {
        let tile = this.getTileAtCell( start.column, start.row );
        let sprites = getNeighbourhoodModel().characterTypes
        let characterDto = {
            type: sprites[Math.floor( Math.random() * sprites.length )],
            column: tile.column,
            row: tile.row,
            direction: start.direction,
            name: "Random person",
            destination: {
                column: destination.column,
                row: destination.row,
                direction: destination.direction,
                type: DestinationType.randomGeneratedSprite
            }
        }
        let model: CanvasObjectModel = initCanvasObjectModel( characterDto );

        const contract = getCreateSpriteContract( model );
        registerNewContract( contract );
    }

    spriteIsInRegistry( tile: Tile, dataModel: CanvasObjectModel ): boolean {
        if ( dataModel.spriteDataModel.isCollectable ) {
            let mapName = getActiveMapKey()
            let objectResource = getDataModelByKey( dataModel.type );
            let id = getCollectableId(tile.column, tile.row, objectResource.collectableType, mapName)
            return isInCollectableRegistry( id, objectResource.collectableType );
        }
        return false;
    }
}