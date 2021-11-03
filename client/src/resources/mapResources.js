const northside         = require('./mapResources/northside/northside');
const lennartMaps       = require('./mapResources/lennart-maps/lennart-maps');

const mapResources = {
    "northside":            northside,
    "lennart-neighbourhood":lennartMaps
}

const getMapData = ( fullMapName ) => {
    const mapNameArray = fullMapName.split('/');

    const neighbourhoodName = mapNameArray[0]
    const mapName = mapNameArray[1]

    if ( mapNameArray[2] ) {
        let mapData = mapResources[neighbourhoodName][mapName]
        return JSON.parse( JSON.stringify( mapData.subMaps[mapNameArray[2]] ) );
    } 
    else if ( mapNameArray[1] ) {
        let mapData = mapResources[neighbourhoodName][mapName]
        return JSON.parse( JSON.stringify(mapData) )
    }
    else {
        return JSON.parse( JSON.stringify(mapResources[neighbourhoodName]) )
    }
}

module.exports = {
    getMapData
}