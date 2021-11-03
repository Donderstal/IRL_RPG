const { getMapData } = require("../resources/mapResources")

class Neighbourhood {
    constructor( key ) {
        const data = getMapData( key.split('/')[0] );
        Object.keys( data ).forEach( ( key ) => {
            this[key] = data[key];
        })
        this.activateMap( key );
        console.log( this );
    }

    get key( ) { return this.activeMapKey.split('/')[0]; }
    get activeMap( ) { return this[this.activeMapName]; }
    get activeMapName( ) { return this.activeMapKey.split('/')[1]; }

    activateMap( key ) {
        this.activeMapKey = key;
    }

    setPlayerStart( name, className ) {
        this[this.activeMapName].playerStart = {
            "name": name,
            "className": className
        };
    }
}

module.exports = {
    Neighbourhood
}