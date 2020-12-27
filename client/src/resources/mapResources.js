const myNeigbourhood    = require( './mapResources/myNeighbourhood' )
const downtown          = require( './mapResources/downtown' )
const battle            = require( './mapResources/battleMaps' )

const mapResources = {
    "my-neighbourhood" :    myNeigbourhood,
    "downtown":             downtown,
    "battle":               battle,
}

const getMapData = ( fullMapName ) => {
    const mapNameArray = fullMapName.split('/');

    const neighbourhoodName = mapNameArray[0]
    const mapName = mapNameArray[1]

    const mapData = mapResources[neighbourhoodName][mapName]
    if ( mapNameArray[2] ) {
        console.log(fullMapName)
        console.log(mapData.subMaps[mapNameArray[2]])
        console.log('_____')
        return mapData.subMaps[mapNameArray[2]];
    } else {
        return mapData
    }
}

module.exports = {
    getMapData
}