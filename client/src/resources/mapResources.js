const myNeighbourhood    = require( './mapResources/myNeighbourhood/my-neighbourhood' );
const downtown          = require( './mapResources/downtown/downtown' );
const battle            = require( './mapResources/battle/battleMaps' );

const mapResources = {
    "my-neighbourhood" :    myNeighbourhood,
    "downtown":             downtown,
    "battle":               battle,
}

const getMapData = ( fullMapName ) => {
    const mapNameArray = fullMapName.split('/');

    const neighbourhoodName = mapNameArray[0]
    const mapName = mapNameArray[1]

    const mapData = mapResources[neighbourhoodName][mapName]
    if ( mapNameArray[2] ) {
        return mapData.subMaps[mapNameArray[2]];
    } else {
        return mapData
    }
}

module.exports = {
    getMapData
}