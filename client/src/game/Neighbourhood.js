const { getMapData } = require("../resources/mapResources")

class Neighbourhood {
    constructor( key ) {
        const data = getMapData( key );
        Object.keys( data ).forEach( ( key ) => {
            this[key] = data[key];
        })
        console.log( this );
    }
}

module.exports = {
    Neighbourhood
}