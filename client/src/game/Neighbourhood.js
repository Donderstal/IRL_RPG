const globals = require("../game-data/globals");
const { Counter } = require("../helpers/Counter");
const { getNeighbourhood } = require("../resources/mapResources")

class Neighbourhood {
    constructor( key ) {
        const data = getNeighbourhood( key.split('/')[0] );
        Object.keys( data ).forEach( ( key ) => {
            this[key] = data[key];
        })
        this.activeMapKey = false;
        this.activateMap( key );
        this.setNPCCounter( );
    }

    get key( ) { return this.activeMapKey.split('/')[0]; }
    get activeMap( ) { return this.mapDictionary[this.activeMapName]; }
    get activeMapName( ) { return this.activeMapKey.split('/')[1]; }

    getRandomAction( ) {
        let actions = this["spawnable_actions"];
        return actions[Math.floor(Math.random()*actions.length)];
    }

    activateMap( key ) {
        this.previousMapKey = this.activeMapKey
        this.activeMapKey = key;
        if ( this.activeMap.outdoors ) {
            this.setMapNeighbours( );            
        }
    }

    setMapNeighbours( ) {
        const horizontalSlot = this.activeMapName[0];
        const verticalSlot = this.activeMapName[1];
        const horiIndex = this.horizontal_slots.indexOf(horizontalSlot);
        const vertIndex = this.vertical_slots.indexOf(verticalSlot)
        let neighbours = {'left': false, 'up': false, 'right': false, 'down': false};

        if ( horiIndex + 1 != this.horizontal_slots.length ) {
            const slotKey = this.horizontal_slots[horiIndex + 1] + verticalSlot;
            if ( this[slotKey] != undefined ) {
                neighbours['right'] = this[slotKey].mapName
            }
        }
        if ( vertIndex + 1 != this.vertical_slots.length ) {
            const slotKey = horizontalSlot + this.vertical_slots[vertIndex + 1];
            if ( this[slotKey] != undefined ) {
                neighbours['down'] = this[slotKey].mapName
            }
        }
        if ( horiIndex - 1 != -1 ) {
            const slotKey = this.horizontal_slots[horiIndex - 1] + verticalSlot;
            if ( this[slotKey] != undefined ) {
                neighbours['left'] = this[slotKey].mapName
            }
        }
        if ( vertIndex + 1 != -1 ) {
            const slotKey = horizontalSlot + this.vertical_slots[vertIndex - 1];
            if ( this[slotKey] != undefined ) {
                neighbours['up'] = this[slotKey].mapName
            }
        }
        this[this.activeMapName].neighbours = neighbours;
    }

    setPlayerStart( name, className ) {
        this[this.activeMapName].playerStart = {
            "name": name,
            "className": className
        };
    }

    setNPCCounter( ) {
        this.NPCCounter = new Counter( this.characters_spawn_rate, true )
    }

    handleNPCCounter( ) {
        if ( this.activeMap.spawnPoints != undefined ) {
            if ( this.NPCCounter.countAndCheckLimit( ) && this.activeMap.spawnPoints.length > 0) {
                globals.GAME.FRONT.generateWalkingNPC( this.activeMap.spawnPoints );
            }
        }
        else {
            this.NPCCounter.resetCounter( );
        }
    }
}

module.exports = {
    Neighbourhood
}