import globals, { CANVAS_COLUMNS, CANVAS_ROWS } from "../game-data/globals";
import { Counter } from "../helpers/Counter";
import { getNeighbourhood } from "../resources/mapResources";
import type { InteractionModel } from "../models/InteractionModel";
import type { MapModel } from "../models/MapModel";
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import { setNewCenterBubble } from "./controllers/bubbleController";

export class Neighbourhood {
    model: NeighbourhoodModel;
    mapModel: MapModel;
    activeMapKey: string;
    activeMapLocation: string;
    previousMapKey: string;
    previousMapLocation: string;
    playerData: { name: string, className: string };
    NPCCounter: Counter;
    neighbourhoodSlots: string[]
    constructor( mapKey: string ) {
        this.model = getNeighbourhood( mapKey.split( '/' )[0] );
        this.activateMap( mapKey );
        this.setMapGrid();
        this.setNPCCounter();
    }

    get key( ): string { return this.activeMapKey.split('/')[0]; }
    get activeMap(): MapModel {
        return this.model.mapDictionary[this.activeMapName].outdoors ? this.mapModel : this.model.mapDictionary[this.activeMapName];
    }
    get activeMapName(): string { return this.activeMapKey.split('/')[1]; }

    setMapGrid() {
        const emptyRow = [];
        let tileSet;
        for ( var i = 1; i <= CANVAS_COLUMNS; i++ ) {
            emptyRow.push( { id: null, angle: 0, mirrored: false } );
        }
        const columns = this.model.horizontalSlots.length * CANVAS_COLUMNS;
        const rows = this.model.verticalSlots.length * CANVAS_ROWS;
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
            key: this.model.key,
            location: this.model.location,
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
            spawnPoints: this.model.spawnPoints,
            roads: this.model.roads
        }

        this.mapModel = mapModel;
        this.model.mapDictionary[this.model.key] = mapModel;
    }

    getRandomAction(): InteractionModel[] {
        let interactions = this.model.spawnableActions;
        return interactions[Math.floor( Math.random() * interactions.length)];
    }

    activateMap( key: string ): void {
        this.previousMapKey = this.activeMapKey
        this.previousMapLocation = this.activeMapLocation;
        this.activeMapKey = key;
        this.activeMapLocation = this.activeMap.location;
        if ( this.previousMapLocation !== this.activeMapLocation ) {
            setNewCenterBubble(this.activeMapLocation)
        }
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