const myNeigbourhood    = require( './mapResources/myNeighbourhood' )
const downtown          = require( './mapResources/downtown' )

const mapResources = {
    "my-neighbourhood" : myNeigbourhood,
    "downtown": downtown
}

const getMapData = ( mapName ) => {
    const world = mapName.split('/')[0]
    const subWorld = mapName.split('/')[1]
    const map = mapName.split('/')[2]
    if ( mapName.split('/')[3] ) {
        const subMap = mapName.split('/')[3]

        return mapResources[world][subWorld][map][subMap]        
    }
    else {
        return mapResources[world][subWorld][map]   
    }
}

module.exports = {
    getMapData
}