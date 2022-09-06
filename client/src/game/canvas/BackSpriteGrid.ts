import { CanvasGrid } from '../core/CanvasGrid';
//import { getEffect, GraphicalEffect } from '../../helpers/effectHelpers';
import globals from '../../game-data/globals';
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
import { initCanvasObjectModel } from '../../helpers/modelFactory';
import type { OutOfMapEnum } from '../../enumerables/OutOfMapEnum';
import { AnimationTypeEnum } from '../../enumerables/AnimationTypeEnum';
import { determineShortestPath } from '../../helpers/pathfindingHelpers';
import { cameraFocus } from '../cameraFocus';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import type { DestinationCellModel } from '../../models/DestinationCellModel';
import { DestinationType } from '../../enumerables/DestinationType';
import { createSpriteFromCanvasObjectModel, getPlayer, setSpritesList } from '../controllers/spriteController';
import type { Sprite } from '../core/Sprite';

export class BackSpriteGrid extends CanvasGrid {
    //activeEffects: GraphicalEffect[];
    grid: Grid;
    roadNetwork: RoadNetwork;
    tilesBlockedBySprites: number[];
    constructor( x: number, y: number, canvas: HTMLCanvasElement, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
        //this.activeEffects = [];
        this.roadNetwork;
    };

    addEffect( name: string, x: number, y: number, endX: number = null, endY: number = null ): void {
        //this.activeEffects.push( getEffect( name, x, y, endX, endY ) );
    }

    setForegroundData( mapModel: MapModel, sprites: Sprite[] = null ) {
        this.model = mapModel;
        if ( this.model.roads !== undefined ) 
            this.roadNetwork = new RoadNetwork( this.model.roads, this.canvas );

        if ( sprites ) {
            setSpritesList( sprites );
        }
        else {
            if ( this.model.sprites )
                this.setSprites( this.model.sprites );
            if ( this.model.playerStart ) {
                this.initPlayerCharacter( this.model.playerStart, globals.GAME.party.characterActiveOnMap.ClassName );
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
        createSpriteFromCanvasObjectModel( canvasObjectModel, this.type, PLAYER_ID );
    }

    setSprites( sprites: CanvasObjectModel[] ): void {
        let models = sprites.filter((e)=>{
            return e.hasCondition ? conditionIsTrue( e.condition.type, e.condition.value ) : true;
        })
        models.forEach( e => createSpriteFromCanvasObjectModel( e, this.type ) );
    };

    clearMap( ): void {
        this.grid = null;
        this.roadNetwork = null;
    }

    tileHasBlockingSprite( index: number | OutOfMapEnum ): boolean {
        return this.tilesBlockedBySprites.indexOf( index ) > -1;
    }

    generateWalkingNPC( ): void {
        let start: SpawnPointModel;
        let end: SpawnPointModel;

        const grid = {
            'rows': this.grid.rows, 'columns': this.grid.columns,
            'tiles': globals.GAME.BACK.grid.array.filter( ( tile ) => {
                return !tile.isBlocked && !this.tileHasBlockingSprite( tile.index );
            } )
        };

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
                validPath = determineShortestPath( tileStart, tileEnd, grid ) !== null;

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
        let unblockedSpawnPoints = availableSpawnPoints.filter( ( e ) => {
            let tile = globals.GAME.getTileOnCanvasAtCell( "BACK", e.column, e.row );
            return !( tile.isBlocked || this.tileHasBlockingSprite( tile.index ) )
        } );
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
            let tile = globals.GAME.getTileOnCanvasAtCell( "BACK", e.column, e.row );
            return !( tile.isBlocked || this.tileHasBlockingSprite( tile.index ) )
                && (startLocation != null ? e.column != startLocation.column && e.row !== startLocation.row : true);
        })
    }

    generateRandomWalkingSprite( start: SpawnPointModel, destination: SpawnPointModel ) {
        let tile = this.getTileAtCell( start.column, start.row );
        let sprites = globals.GAME.activeNeighbourhood.model.characterTypes
        let characterDto = {
            type: sprites[Math.floor( Math.random() * sprites.length )],
            column: tile.column,
            row: tile.row,
            direction: start.direction,
            name: "Random person",
            action: globals.GAME.activeNeighbourhood.getRandomAction(),
            destination: {
                column: destination.column,
                row: destination.row,
                direction: destination.direction,
                type: DestinationType.randomGeneratedSprite
            }
        }
        let model: CanvasObjectModel = initCanvasObjectModel( characterDto );

        createSpriteFromCanvasObjectModel( model, this.type )
    }

    spriteIsInRegistry( tile: Tile, dataModel: CanvasObjectModel ): boolean {
        if ( dataModel.spriteDataModel.isCollectable ) {
            let mapName = globals.GAME.activeMapName
            let objectResource = getDataModelByKey( dataModel.type );
            let id = globals.GAME.collectableRegistry.getCollectableId(tile.column, tile.row, objectResource.collectableType, mapName)
            return globals.GAME.collectableRegistry.isInRegistry( id, objectResource.collectableType );
        }
        return false;
    }

    getTilesBlockedBySprite( sprite: Sprite ): void {
        let blockedTileIndexes = sprite.getBlockedTiles( );
        blockedTileIndexes.forEach( ( e )=> {
            if ( this.tilesBlockedBySprites.indexOf( e ) == -1 ) {
                this.tilesBlockedBySprites.push( e );
            }
        })
    }

    resetTilesBlockedBySprites() {
        this.tilesBlockedBySprites = [];
    }
}