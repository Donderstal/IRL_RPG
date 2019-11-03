const overworlds = require('../../game-data/overworlds.json')
const globals   = require('../../game-data/globals')

const gridGetter = (gridName) => {
    const newOverworld  = overworlds[gridName]
    const dimensions    = getDimensionsInPixels(newOverworld)

    console.log(dimensions)
}

const getDimensionsInPixels = (newOverworld) => {
    const overworldDimensions   = newOverworld.dimensions

    return {
        horizontalPX  : overworldDimensions["horizontal"] * globals.GRID_BLOCK_PX, 
        verticalPX    : overworldDimensions["vertical"] * globals.GRID_BLOCK_PX         
    }
}

gridGetter('overworld-a')

console.log('bruh')