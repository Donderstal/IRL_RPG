const myNeighbourhood   = require( './mapResources/myNeighbourhood/my-neighbourhood' );
const downtown          = require( './mapResources/downtown/downtown' );
const battle            = require( './mapResources/battle/battleMaps' );
const test              = require( './mapResources/test/test' );
const northside         = require('./mapResources/northside/northside');
const lennartMaps       = require('./mapResources/lennart-maps/lennart-maps');

const mapResources = {
    "my-neighbourhood" :    myNeighbourhood,
    "downtown":             downtown,
    "battle":               battle,
    "northside":            northside,
    "test":                 test,
    "lennart-neighbourhood":lennartMaps
}

const getMapData = ( fullMapName ) => {
    const mapNameArray = fullMapName.split('/');

    const neighbourhoodName = mapNameArray[0]
    const mapName = mapNameArray[1]

    const mapData = mapResources[neighbourhoodName][mapName]
    if ( mapNameArray[2] ) {
        return JSON.parse( JSON.stringify( mapData.subMaps[mapNameArray[2]] ) );
    } else {
        return JSON.parse( JSON.stringify(mapData) )
    }
}

module.exports = {
    getMapData
}