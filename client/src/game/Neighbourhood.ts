import globals from "../game-data/globals";
import { Counter } from "../helpers/Counter";
import { getNeighbourhood } from "../resources/mapResources";
import type { InteractionModel } from "../models/InteractionModel";
import type { MapModel } from "../models/MapModel";
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";

export class Neighbourhood {
    model: NeighbourhoodModel;
    activeMapKey: string;
    previousMapKey: string;
    playerData: { name: string, className: string };
    NPCCounter: Counter;
    constructor( mapKey: string ) {
        this.model = getNeighbourhood( mapKey.split('/')[0] );
        this.activateMap( mapKey );
        this.setNPCCounter( );
    }

    get key( ): string { return this.activeMapKey.split('/')[0]; }
    get activeMap(): MapModel { return this.model.mapDictionary[this.activeMapName]; }
    get activeMapName(): string { return this.activeMapKey.split('/')[1]; }

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
        const vertIndex = this.model.verticalSlots.indexOf(verticalSlot)
        let neighbours = {left: null, up: null, right: null, down: null};

        if ( horiIndex + 1 != this.model.horizontalSlots.length ) {
            const slotKey = this.model.horizontalSlots[horiIndex + 1] + verticalSlot;
            if ( this[slotKey] != undefined ) {
                neighbours.right = this.model.mapDictionary[slotKey].name
            }
        }
        if ( vertIndex + 1 != this.model.verticalSlots.length ) {
            const slotKey = horizontalSlot + this.model.verticalSlots[vertIndex + 1];
            if ( this[slotKey] != undefined ) {
                neighbours.down = this.model.mapDictionary[slotKey].name
            }
        }
        if ( horiIndex - 1 != -1 ) {
            const slotKey = this.model.horizontalSlots[horiIndex - 1] + verticalSlot;
            if ( this[slotKey] != undefined ) {
                neighbours.left = this.model.mapDictionary[slotKey].name
            }
        }
        if ( vertIndex + 1 != -1 ) {
            const slotKey = horizontalSlot + this.model.verticalSlots[vertIndex - 1];
            if ( this[slotKey] != undefined ) {
                neighbours.up = this.model.mapDictionary[slotKey].name
            }
        }
        this.model.mapDictionary[this.activeMapName].neighbours = neighbours;
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