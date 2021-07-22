const myNeighbourhood   = require( './mapResources/myNeighbourhood/my-neighbourhood' );
const downtown          = require( './mapResources/downtown/downtown' );
const battle            = require( './mapResources/battle/battleMaps' );
const test              = require( './mapResources/test/test' );

const mapResources = {
    "my-neighbourhood" :    myNeighbourhood,
    "downtown":             downtown,
    "battle":               battle,
    "test":                 test
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