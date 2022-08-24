import { CanvasWithGrid } from '../core/CanvasWithGrid';
import { getUniqueId } from '../../helpers/utilFunctions';
//import { getEffect, GraphicalEffect } from '../../helpers/effectHelpers';
import globals from '../../game-data/globals';
import { RoadNetwork } from '../map/RoadNetwork';
import { getDataModelByKey } from '../../resources/spriteDataResources';
import { PLAYER_ID, PLAYER_NAME } from '../../game-data/interactionGlobals';
import { conditionIsTrue } from '../../helpers/conditionalHelper';
import { Sprite } from '../core/Sprite';
import type { Grid } from '../core/Grid';
import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
import type { CellPosition } from '../../models/CellPositionModel';
import type { Tile } from '../core/Tile';
import type { MapModel } from '../../models/MapModel';
import type { SpawnPointModel } from '../../models/SpawnPointModel';
import { initCanvasObjectModel } from '../../helpers/modelFactory';
import type { GridCellModel } from '../../models/GridCellModel';
import type { OutOfMapEnum } from '../../enumerables/OutOfMapEnum';
import { initializeSpriteMovement } from '../modules/spriteMovementModule';
import { AnimationTypeEnum } from '../../enumerables/AnimationTypeEnum';
import { determineShortestPath } from '../../helpers/pathfindingHelpers';
import { cameraFocus } from '../cameraFocus';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

export class BackSpritesCanvas extends CanvasWithGrid {
    spriteDictionary: { [key: string]: Sprite };
    //activeEffects: GraphicalEffect[];
    grid: Grid;
    roadNetwork: RoadNetwork;
    tilesBlockedBySprites: number[];
    constructor( x: number, y: number, canvas: HTMLCanvasElement, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
        this.allSprites = [ ];
        this.spriteDictionary = { };
        this.playerSprite = null;
        //this.activeEffects = [];
        this.roadNetwork;
    };

    addEffect( name: string, x: number, y: number, endX: number = null, endY: number = null ): void {
        //this.activeEffects.push( getEffect( name, x, y, endX, endY ) );
    }

    setForegroundData( mapModel: MapModel, sprites: Sprite[] = null ) {
        this.model = mapModel;
        if ( this.model.roads.length > 0 ) 
            this.roadNetwork = new RoadNetwork( this.model.roads );

        if ( sprites ) {
            sprites.forEach( ( sprite: Sprite ): void => {
                this.spriteDictionary[sprite.spriteId] = sprite;
                this.allSprites.push(sprite);
            });
        }
        else {
            if ( this.model.sprites )
                this.setSprites( this.model.sprites );
            if ( this.model.playerStart ) {
                this.initPlayerCharacter( this.model.playerStart, globals.GAME.party.characterActiveOnMap.ClassName );
                cameraFocus.centerOnXY( this.playerSprite.centerX, this.playerSprite.baseY )      
            }            
        }
    }

    initPlayerCharacter( start: CellPosition, className: string ) {
        const tile = super.getTileAtCell( start.column, start.row );
        const spriteModel = getDataModelByKey( className );
        const canvasObjectModel = initCanvasObjectModel( { type: className, direction: start.direction ?? 0, column: start.column, row: start.row, spriteDataModel: spriteModel, anim_type: AnimationTypeEnum.idle } );
        this.playerSprite = new Sprite( tile, canvasObjectModel, PLAYER_ID, true );
        this.playerSprite.name = PLAYER_NAME;
        this.allSprites.push( this.playerSprite );
        this.spriteDictionary[PLAYER_ID] = this.playerSprite;
    }

    setSprites( sprites: CanvasObjectModel[] ): void {
        sprites = sprites.filter((e)=>{
            return e.hasCondition ? conditionIsTrue( e.condition.type, e.condition.value ) : true;
        })
        sprites.forEach( this.getTileAndSetSprite.bind( this ) );
    };

    getTileAndSetSprite( canvasObjectModel: CanvasObjectModel ): string {
        const tile = super.getTileAtCell( canvasObjectModel.column, canvasObjectModel.row );
        let id = "";
        if ( !this.spriteIsInRegistry( tile, canvasObjectModel ) ) {
            id = this.setSprite( tile, canvasObjectModel )   
        }
        return id;
    }

    setSprite( tile: Tile, canvasObjectModel: CanvasObjectModel ): string {
        const newId = getUniqueId( Object.keys( this.spriteDictionary ) );
        const newNPC = new Sprite( tile, canvasObjectModel, newId );
        this.allSprites.push( newNPC )
        this.spriteDictionary[newId] = newNPC
        if ( canvasObjectModel.name ) {
            newNPC.name = canvasObjectModel.name;
        }
        return newId;
    }


    clearMap( ): void {
        this.grid = null;
        this.allSprites = [ ];
        this.roadNetwork = null;
        this.spriteDictionary = { };
    }

    deleteSprite( spriteId: string ): void {
        if ( this.spriteDictionary[spriteId].model.isCar ) {
            this.roadNetwork.roads.forEach( ( e ) => {
                if ( e.activeCarIds.indexOf( spriteId ) > - 1 ) {
                    e.activeCarIds.splice( e.activeCarIds.indexOf( spriteId ), 1 )
                }
            });
        }
        delete this.spriteDictionary[spriteId];
        this.allSprites = [];
        Object.keys( this.spriteDictionary ).forEach ( ( e ) => {
            this.allSprites.push( this.spriteDictionary[e] )
        })
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
            action: globals.GAME.activeNeighbourhood.getRandomAction()
        }
        let model: CanvasObjectModel = initCanvasObjectModel( characterDto );
        const id = this.setSprite( tile, model );
        const sprite = this.spriteDictionary[id];
        initializeSpriteMovement( sprite, destination as GridCellModel, true );
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