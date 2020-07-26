const myNeigbourhood    = require( './mapResources/myNeighbourhood' )
const downtown          = require( './mapResources/downtown' )
const battle            = require( './mapResources/battleMaps' )

const mapResources = {
    "my-neighbourhood" :    myNeigbourhood,
    "downtown":             downtown,
    "battle":               battle,
}

const getMapData = ( mapName ) => {
    const world = mapName.split('/')[0]
    const subWorld = mapName.split('/')[1]

    if ( world != "battle" ) {
        const map = mapName.split('/')[2]
        if ( mapName.split('/')[3] ) {
            const subMap = mapName.split('/')[3]

            return mapResources[world][subWorld][map][subMap]        
        }
        else {
            return mapResources[world][subWorld][map]   
        }
    }
    
    return mapResources[world][subWorld]
}

module.exports = {
    getMapData
}