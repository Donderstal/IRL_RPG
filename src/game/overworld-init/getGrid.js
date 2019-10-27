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

// Overworld grid pseudo-code

// Json brainstorm

// We need a way to decide / determine what overworld is active
// Overworld logic will be stored in /game-data/overworlds.json 

// Sample json entry:

/**
 * 'overworld-name' : {
 *      src: /bg-image-path,
 *      dims: {
 *          // dimensions need to be stored here in blocks
 *          // so the program knows how to scale the background
 *          hori-blocks: INT,
 *          vert-blocks: INT
 *      },
 *      border-blocks: {
 *          //store coordinates to define the borders of the overworld
 *          //not yet sure if this is the right place to do so
 *          //or how I would organise this
 *      },
 *      doors: {
 *          // Doors should lead to other overworlds or to houses
 *          // Their coordinates are stored here
 *          'D10' : house-1,
 *          'H12' : overworld-2
 *      },
 *      inaccessible: {
 *          // This should store which tiles in the background are inaccessible
 *          // Like walls an water and stuff like that
 *          // Since the background will be a static image, I must define inaccessible tiles somewhay
 *          possibly: [ A4, A12, D4, D12 ]
 *          or: 'id' : {
 *              type: square,
 *              dims: [ A4, A12, D4, D12 ]
 *          }
 *      },
 *      triggers; {
 *      // overworlds will contain events
 *      // they should be stored within the overworld object
 *      // not sure how to do this yet
 *      },
 *      NPCs: {
 *      // I probably want to store information on NPCs here
 *      // Possibly something like:
 *          NPC-one : {
 *              id: 'Overworld1-NPC1'
 *              text: 'Hey!',
 *              sprite: '/path/to/sprite',
 *              // if this NPC can be battled, we need to store info on his battle character
 *              className: influencer,
 *              level: 20
 *          }
 *      },
 *      subWorlds: {
 *          1: {
 *              src: /subworld-bg-image-path
 *          }
 *      }
 * }
 */

console.log('bruh')