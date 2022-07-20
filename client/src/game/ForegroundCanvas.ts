import { CanvasWithGrid } from './core/CanvasWithGrid';
import { getUniqueId } from '../helpers/utilFunctions';
import { getEffect, GraphicalEffect } from '../helpers/effectHelpers';
import globals from '../game-data/globals';
import { RoadNetwork } from './map/RoadNetwork';
import { determineShortestPath } from '../helpers/pathfindingHelpers';
import { getDataModelByKey } from '../resources/spriteDataResources';
import { PLAYER_ID, PLAYER_NAME } from '../game-data/interactionGlobals';
import { conditionIsTrue } from '../helpers/conditionalHelper';
import { Sprite } from './core/Sprite';
import type { Grid } from './core/Grid';
import type { CanvasObjectModel } from '../models/CanvasObjectModel';
import type { CellPosition } from '../models/CellPositionModel';
import type { Tile } from './core/Tile';
import type { MapModel } from '../models/MapModel';
import type { SpawnPointModel } from '../models/SpawnPointModel';
import { initCanvasObjectModel } from '../helpers/modelFactory';
import type { GridCellModel } from '../models/GridCellModel';
import type { OutOfMapEnum } from '../enumerables/OutOfMapEnum';
import { DirectionEnum } from '../enumerables/DirectionEnum';
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base CanvasWithGrid class and contain an Grid instance with an array of Tile instances
 * The BackgroundCanvas contains all non-static elements of the current map.
 * For example, the NPCs, mapObjects and cars
 */
export class ForegroundCanvas extends CanvasWithGrid {
    spriteDictionary: { [key: string]: Sprite };
    activeEffects: GraphicalEffect[];
    grid: Grid;
    roadNetwork: RoadNetwork;
    tilesBlockedBySprites: number[];
    constructor( x: number, y: number, ctx: CanvasRenderingContext2D ) {
        super( x, y, ctx );
        this.allSprites = [ ];
        this.spriteDictionary = { };
        this.playerSprite = null;
        this.activeEffects = [];
        this.roadNetwork;
    };

    addEffect( name: string, x: number, y: number, endX: number = null, endY: number = null ): void {
        this.activeEffects.push( getEffect( name, x, y, endX, endY ) );
    }

    setForegroundData( mapModel: MapModel, sprites: Sprite[] = null ) {
        this.model = mapModel;
        if ( this.model.roads ) 
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
                globals.GAME.cameraFocus.centerOnXY( this.playerSprite.centerX, this.playerSprite.baseY )      
            }            
        }
    }

    initPlayerCharacter( start: CellPosition, className: string ) {
        const startingTile = this.grid.array.filter( tile => { return tile.row == start.row && tile.column == start.column } )[0];
        const spriteModel = getDataModelByKey( className );
        this.playerSprite = new Sprite( startingTile, spriteModel, DirectionEnum.down, PLAYER_ID, true );
        this.playerSprite.name = PLAYER_NAME;
        this.allSprites.push( this.playerSprite );
        this.spriteDictionary[PLAYER_ID] = this.playerSprite;
    }

    setSprites( sprites: CanvasObjectModel[] ): void {
        sprites = sprites.filter((e)=>{
            return e.hasCondition ? conditionIsTrue( e.condition.type, e.condition.value ) : true;
        })
        sprites.forEach( ( sprite ) => {
            const tile = this.getTileAtCell( sprite.column, sprite.row );
            if ( !this.spriteIsInRegistry( tile, sprite ) )
                this.setSprite( tile, sprite );
        })
    };

    setSprite( tile: Tile, canvasObjectModel: CanvasObjectModel ): string {
        const newId = getUniqueId( Object.keys( this.spriteDictionary ) );
        const spriteModel = getDataModelByKey( canvasObjectModel.type );
        const newNPC = new Sprite( tile, spriteModel, canvasObjectModel.direction, newId );
        this.allSprites.push( newNPC )
        this.spriteDictionary[newId] = newNPC
        if ( canvasObjectModel.name ) {
            newNPC.name = canvasObjectModel.name;
        }
        return newId;
    }

    setVehicleToTile( canvasObjectModel: CanvasObjectModel ): void {
        const tile = super.getTileAtCell( canvasObjectModel.column, canvasObjectModel.row );
        this.setSprite( tile, canvasObjectModel )   
    }

    clearMap( ): void {
        this.grid = null;
        this.allSprites = [ ];
        this.roadNetwork = null;
        this.spriteDictionary = { };
    }

    deleteSprite( spriteId: string ): void {
        if ( this.spriteDictionary[spriteId].model.isCar ) {
            (this.spriteDictionary[spriteId] as any).movementSoundEffect.reset( );
        };
        if ( this.spriteDictionary[spriteId].isCar ) {
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

    tileHasBlockingSprite( index: number|OutOfMapEnum ): boolean {
        return this.tilesBlockedBySprites.indexOf( index as any ) > -1;
    }

    generateWalkingNPC( ): void {
        let start = this.getValidSpawnStart( );
        let end = this.getValidSpawnDestination( start )
        this.generateRandomWalkingSprite( start, end )
    }

    getValidSpawnStart(): SpawnPointModel {
        let validLocations = this.filterSpawnPoints( )
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    getValidSpawnDestination( startLocation: SpawnPointModel = null, oldDestination: SpawnPointModel = null ): SpawnPointModel {
        let validLocations = this.filterSpawnPoints( startLocation );
        if ( oldDestination ) {
            let tile = globals.GAME.getTileOnCanvasAtCell( "BACK", oldDestination.column, oldDestination.row )
            if (!( tile.isBlocked || this.tileHasBlockingSprite( tile.index )))
                return oldDestination
        }
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    filterSpawnPoints( startLocation: SpawnPointModel = null ): SpawnPointModel[] {
        return this.model.spawnPoints.filter( ( e) => {
            let tile = globals.GAME.getTileOnCanvasAtCell( "BACK", e.column, e.row )
            return !( tile.isBlocked || this.tileHasBlockingSprite( tile.index )) && startLocation != null ? e.direction != startLocation.direction : true
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
            action: globals.GAME.activeNeighbourhood.getRandomAction()
        }
        let model: CanvasObjectModel = initCanvasObjectModel( characterDto );
        const grid = { 
            rows: this.grid.rows, columns: this.grid.columns,
            tiles: globals.GAME.BACK.grid.array.filter((tile) => {
                return !globals.GAME.BACK.getTileAtIndex(tile.index).isBlocked && !this.tileHasBlockingSprite(tile.index);
            })
        };
        if ( tile.offScreen ) {
            grid.tiles.unshift(tile);
        }
        const destinationTile = this.getTileAtCell( destination.column,  destination.row);
        if ( destinationTile.offScreen ) {
            grid.tiles.push( destinationTile );
        }
        const indexList = determineShortestPath(tile, destinationTile, grid);
        if ( indexList ) {
            let spriteId = this.setSprite( tile, model );
            let sprite = this.spriteDictionary[spriteId];
            sprite.name = "Random person"
            sprite.setDestination( destination as GridCellModel, true );
        };
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
}