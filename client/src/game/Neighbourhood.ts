import globals, { CANVAS_COLUMNS, CANVAS_ROWS } from "../game-data/globals";
import { Counter } from "../helpers/Counter";
import { getNeighbourhood } from "../resources/mapResources";
import type { InteractionModel } from "../models/InteractionModel";
import type { MapModel } from "../models/MapModel";
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import type { CanvasGrid } from "./core/CanvasGrid";
import { each } from "svelte/internal";
import { initMapModel } from "../helpers/modelFactory";

export class Neighbourhood {
    model: NeighbourhoodModel;
    mapModel: MapModel;
    activeMapKey: string;
    previousMapKey: string;
    playerData: { name: string, className: string };
    NPCCounter: Counter;
    neighbourhoodSlots: string[]
    constructor( mapKey: string ) {
        this.model = getNeighbourhood( mapKey.split( '/' )[0] );
        this.activateMap( mapKey );
        this.setMapGrid();
        this.setNPCCounter( );
    }

    get key( ): string { return this.activeMapKey.split('/')[0]; }
    get activeMap(): MapModel { return this.model.mapDictionary[this.activeMapName].outdoors ? this.mapModel : this.model.mapDictionary[this.activeMapName]; }
    get activeMapName(): string { return this.activeMapKey.split('/')[1]; }

    setMapGrid() {
        const emptyRow = [];
        let tileSet;
        for ( var i = 1; i <= CANVAS_COLUMNS; i++ ) {
            emptyRow.push( { id: null, angle: 0, mirrored: false } );
        }
        const columns = this.model.horizontalSlots.length * CANVAS_COLUMNS;
        const rows = this.model.verticalSlots.length * CANVAS_ROWS;
        console.log( columns );
        console.log( rows );
        let grid = [];
        let frontGrid = [];

        let verticalKeyIndex = 0
        let activeVerticalKey = this.model.verticalSlots[verticalKeyIndex];

        let row = 1;
        let rowLimit = 1;

        let mapRowsAccumulator = 0;
        let mapColumnsAccumulator = 0;

        let doors = [];
        let actions = [];
        let sprites = [];
        let frontSprites = [];

        while ( row <= rows ) {
            let tiles = [];
            let frontTiles = [];

            mapColumnsAccumulator = -24;

            for ( var key in this.model.horizontalSlots ) {
                mapColumnsAccumulator += 24;
                const activeKey = ( this.model.horizontalSlots[key] ).toString() + activeVerticalKey;
                const map = this.model.mapDictionary[activeKey];
                if ( map !== undefined ) {
                    const sliceStart = CANVAS_COLUMNS * ( ( row - 1 ) - (verticalKeyIndex * CANVAS_ROWS) );
                    tileSet = map.tileSet;
                    tiles = [...tiles, ...map.grid.slice( sliceStart, sliceStart + CANVAS_COLUMNS )];
                    frontTiles = [...frontTiles, ...map.frontGrid.slice( sliceStart, sliceStart + CANVAS_COLUMNS )];
                    if ( rowLimit === 1 ) {
                        doors = [...doors, ...map.doors.map( ( e ) => {
                            e.column += mapColumnsAccumulator;
                            e.row += mapRowsAccumulator;
                            return e;
                        } )]
                        actions = [...actions, ...map.actions.map( ( e ) => {
                            e.column += mapColumnsAccumulator;
                            e.row += mapRowsAccumulator;
                            return e;
                        } )]
                        sprites = [...sprites, ...map.sprites.map( ( e ) => {
                            e.column += mapColumnsAccumulator;
                            e.row += mapRowsAccumulator;
                            return e;
                        } )]
                        frontSprites = [...frontSprites, ...map.frontSprites.map( ( e ) => {
                            e.column += mapColumnsAccumulator;
                            e.row += mapRowsAccumulator;
                            return e;
                        } )]
                    }
                }
                else {
                    tiles = [...tiles, ...emptyRow];
                    frontTiles = [...frontTiles, ...emptyRow];
                }

            }
            grid = [...grid, ...tiles];
            frontGrid = [...frontGrid, ...frontTiles];
            row++
            rowLimit++
            if ( rowLimit > 16 ) {
                rowLimit = 1;
                verticalKeyIndex++
                activeVerticalKey = this.model.verticalSlots[verticalKeyIndex];
                mapRowsAccumulator += 16;
            }
        }

        const mapModel: MapModel = {
            name: this.key,
            tileSet: tileSet,
            outdoors: true,
            columns: columns,
            rows: rows,
            grid: grid,
            frontGrid: frontGrid,
            sprites: sprites,
            frontSprites: frontSprites,
            doors: doors,
            actions: actions,
            spawnPoints: [],
            roads: this.model.roads
        }

        console.log( mapModel );
        this.mapModel = mapModel;
    }

    getRandomAction(): InteractionModel[] {
        let interactions = this.model.spawnableActions;
        return interactions[Math.floor( Math.random() * interactions.length)];
    }

    activateMap( key: string ): void {
        this.previousMapKey = this.activeMapKey
        this.activeMapKey = key;
        if ( this.activeMap.outdoors ) {
            this.setMapNeighbours( );            
        }
    }

    setMapNeighbours(): void {
        const horizontalSlot = this.activeMapName[0];
        const verticalSlot = this.activeMapName[1];
        const horiIndex = this.model.horizontalSlots.indexOf(horizontalSlot);
        const vertIndex = this.model.verticalSlots.indexOf( verticalSlot )
        const mapsBySlot = this.model.mapDictionary;
        let neighbours = {left: null, up: null, right: null, down: null};

        if ( horiIndex + 1 != this.model.horizontalSlots.length ) {
            const slotKey = this.model.horizontalSlots[horiIndex + 1] + verticalSlot;
            if ( mapsBySlot[slotKey] != undefined ) {
                neighbours.right = this.model.mapDictionary[slotKey].name
            }
        }
        if ( vertIndex + 1 != this.model.verticalSlots.length ) {
            const slotKey = horizontalSlot + this.model.verticalSlots[vertIndex + 1];
            if ( mapsBySlot[slotKey] != undefined ) {
                neighbours.down = this.model.mapDictionary[slotKey].name
            }
        }
        if ( horiIndex - 1 != -1 ) {
            const slotKey = this.model.horizontalSlots[horiIndex - 1] + verticalSlot;
            if ( mapsBySlot[slotKey] != undefined ) {
                neighbours.left = this.model.mapDictionary[slotKey].name
            }
        }
        if ( vertIndex + 1 != -1 ) {
            const slotKey = horizontalSlot + this.model.verticalSlots[vertIndex - 1];
            if ( mapsBySlot[slotKey] != undefined ) {
                neighbours.up = this.model.mapDictionary[slotKey].name
            }
        }
        mapsBySlot[this.activeMapName].neighbours = neighbours;
    }

    setPlayerStart( name: string, className: string ): void {
        this.playerData = {
            name: name,
            className: className
        };
    }

    setNPCCounter(): void {
        this.NPCCounter = new Counter( this.model.characterSpawnRate, true )
    }

    handleNPCCounter(): void {
        if ( this.activeMap.spawnPoints != undefined ) {
            if ( this.NPCCounter.countAndCheckLimit( ) && this.activeMap.spawnPoints.length > 0) {
                globals.GAME.FRONT.generateWalkingNPC( );
            }
        }
        else {
            this.NPCCounter.resetCounter( );
        }
    }
}