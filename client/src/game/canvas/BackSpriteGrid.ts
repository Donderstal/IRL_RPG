import { CanvasGrid } from '../core/CanvasGrid';
import { RoadNetwork } from '../map/RoadNetwork';
import { getDataModelByKey } from '../../resources/spriteDataResources';
import { PLAYER_ID, PLAYER_NAME } from '../../game-data/interactionGlobals';
import { conditionIsTrue } from '../../helpers/conditionalHelper';
import type { Grid } from '../core/Grid';
import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
import type { CellPosition } from '../../models/CellPositionModel';
import type { Tile } from '../core/Tile';
import type { MapModel } from '../../models/MapModel';
import type { SpawnPointModel } from '../../models/SpawnPointModel';
import { initCanvasObjectModel } from '../../factories/modelFactory';
import { AnimationTypeEnum } from '../../enumerables/AnimationTypeEnum';
import { determineShortestPath } from '../../helpers/pathfindingHelpers';
import { cameraFocus } from '../cameraFocus';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { DestinationType } from '../../enumerables/DestinationType';
import type { Sprite } from '../core/Sprite';
import { getCollectableId, isInCollectableRegistry } from '../../registries/collectableRegistry';
import { setSpriteList } from '../modules/sprites/spriteSetter';
import { getPlayer } from '../modules/sprites/spriteGetter';
import { getActiveMapKey, getNeighbourhoodModel } from '../neighbourhoodModule';
import { MAIN_CHARACTER } from '../../resources/spriteTypeResources';
import { setSpriteAndSpriteModules } from '../modules/moduleSetter';
import { getPlayerStart, mapHasPlayerStart } from '../map/playerLocationOnMapLoad';
import { getBlockedCellList, isTileBlocked, tileIsValidDestination } from '../map/blockedTilesRegistry';

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

    setForegroundData( mapModel: MapModel, carSpawnRate: number, sprites: Sprite[] = null, setPlayer = true ) {
        this.model = mapModel;
        if ( this.model.roads !== undefined ) 
            this.roadNetwork = new RoadNetwork( this.model.roads, this.canvas, carSpawnRate );

        if ( sprites ) {
            setSpriteList( sprites );
        }
        else {
            if ( this.model.sprites )
                this.setSprites( this.model.sprites );
            if ( setPlayer && mapHasPlayerStart() ) {
                this.initPlayerCharacter( getPlayerStart(), MAIN_CHARACTER );
                const player = getPlayer();
                cameraFocus.centerOnXY( player.centerX, player.baseY )      
            }            
        }
    }

    initPlayerCharacter( start: CellPosition, className: string ) {
        const canvasObjectModel = initCanvasObjectModel(
            {
                type: className,
                direction: start.direction ?? 0,
                column: start.column,
                row: start.row,
                anim_type: AnimationTypeEnum.idle,
                name: PLAYER_NAME
            }
        );
        setSpriteAndSpriteModules( canvasObjectModel, this.type, PLAYER_ID );
    }

    setSprites( sprites: CanvasObjectModel[] ): void {
        let models = sprites.filter((e)=>{
            return e.hasCondition ? conditionIsTrue( e.condition.type, e.condition.value ) : true;
        })
        models.forEach( e => setSpriteAndSpriteModules( e, this.type, e.id ) );
    };

    clearMap( ): void {
        this.grid = null;
        this.roadNetwork = null;
    }

    generateWalkingNPC( ): void {
        let start: SpawnPointModel;
        let end: SpawnPointModel;
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

    getValidSpawnPoint( spawnPointsToFilter: SpawnPointModel[] = [] ): SpawnPointModel {
        let availableSpawnPoints = this.model.spawnPoints.filter( ( e ) => {
            let point = e;
            return spawnPointsToFilter.length !== 0 ? spawnPointsToFilter.filter( ( x ) => {
                return point.column === x.column && point.row === x.row
            } ).length === 0 : true;
        } );
        let unblockedSpawnPoints = availableSpawnPoints.filter( tileIsValidDestination );
        return unblockedSpawnPoints[Math.floor( Math.random() * unblockedSpawnPoints.length )];
    }

    getValidSpawnStart(): SpawnPointModel {
        let validLocations = this.filterSpawnPoints( )
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    getValidSpawnDestination( startLocation: SpawnPointModel ): SpawnPointModel {
        let validLocations = this.filterSpawnPoints( startLocation );
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    filterSpawnPoints( startLocation: SpawnPointModel = null ): SpawnPointModel[] {
        return this.model.spawnPoints.filter( ( e) => {
            return !isTileBlocked( e ) && ( startLocation == null || (e.column != startLocation.column && e.row !== startLocation.row));
        })
    }

    generateRandomWalkingSprite( start: SpawnPointModel, destination: SpawnPointModel ) {
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
        setSpriteAndSpriteModules( model, this.type )
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