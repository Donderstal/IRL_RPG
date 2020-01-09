const mapHelpers    = require('../../helpers/mapHelpers')
const canvasHelpers = require('../../helpers/canvasHelpers')
const setMapAttributes = require('./setMapAttributes')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const getNPCs       = require('./getNPCs')

/** 
 * @function generateMap
 * MAIN FUNCTION
 * 
 * Call @function getStartingPositionOfGridInCanvas to get the xy to start drawing in the canvas
 * Call @function drawGrid when tilesheet has been loaded based on the image path in the json file
 * 
 * @param {Object} currentMap - JSON containing data on the Map
 * @param {string} previousMap - Name of previous map if applicable
 */

const generateMap = ( currentMap, previousMap ) => {
    let startingPosition = getStartingPositionOfGridInCanvas( currentMap.mapData.columns, currentMap.mapData.rows )
    currentMap.topLeftCell = mapHelpers.getTopLeftCellOfGridInCanvas( startingPosition.x, startingPosition.y )
    setMapAttributes.setDoorsAndDetectEntryPoint( previousMap )
    currentMap.blockedXyValues = []

    setMapBorders( startingPosition, currentMap.mapData.rows, currentMap.mapData.columns)
    getNPCs.generateCharacters( currentMap )

    currentMap.tileSheet = new Image();    
    currentMap.tileSheet.src = '/static/tilesets/' + currentMap.mapData.src
    currentMap.tileSheet.onload = ( ) => {    
        drawGrid(  startingPosition, currentMap, previousMap )

    }

}

/** 
 * @function getStartingPositionOfGridInCanvas
 * Calculate starting position of grid relative to canvas based on data from JSON
 * 
 * @param {object} mapColumns - columns of map ( in grid blocks )
 * @param {object} mapRows - rows of map  ( in grid blocks )
 * @return {object} - top and left position in Canvas to start drawing grid ( in pixels ) 
 */

const getStartingPositionOfGridInCanvas = ( mapColumns, mapRows ) => {

    const gridStartingPosition = {}

    if ( mapColumns > globals.CANVAS_COLUMNS ) {
        gridStartingPosition.x = ( ( mapColumns - globals.CANVAS_COLUMNS ) / 2 ) * -globals.GRID_BLOCK_PX
    }

    if ( mapColumns <= globals.CANVAS_COLUMNS ) {
        gridStartingPosition.x = ( ( globals.CANVAS_COLUMNS - mapColumns ) / 2 ) * globals.GRID_BLOCK_PX
    }

    if ( mapRows > globals.CANVAS_ROWS ) {
        gridStartingPosition.y = ( ( mapRows - globals.CANVAS_ROWS ) / 2 )  * -globals.GRID_BLOCK_PX
    }

    if ( mapRows <= globals.CANVAS_ROWS ) {
        gridStartingPosition.y = ( ( globals.CANVAS_ROWS - mapRows ) / 2 )  * globals.GRID_BLOCK_PX
    }

    return gridStartingPosition 
}

/** 
 * @function drawGrid
 * Get map borders
 * Get number of columns and rows from JSON
 * Get top left cell of map in grid
 * Call @function drawRow for each row
 * Initaliase character
 * 
 * @param {object} startingPosition - starting x and y for drawing
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 */

const drawGrid = ( startingPosition, currentMap ) => {

    const position = startingPosition

    for ( var i = 0; i <= currentMap.mapData.rows; i++ ) {
        const currentRow = currentMap.mapData.grid[i]

        drawRow( currentMap, currentRow, position, i )

        position.y += globals.GRID_BLOCK_PX
        position.x = ( ( globals.CANVAS_COLUMNS - currentMap.mapData.columns ) / 2 ) * globals.GRID_BLOCK_PX
    }
}

/**
 * @function setMapBorders
 * 
 * set borders in currentMap
 * these will be used in movement.js to determine where characters can't pass through
 * this needs to be adapted to a few different types of map
 * for example: indoors, outdoors and non-square maps
 */

const setMapBorders = (gridStartingPosition, mapRows, mapColumns) => {
    let borderObject = { 
        top     : gridStartingPosition.y + ( globals.GRID_BLOCK_PX * .5 ),
        left    : gridStartingPosition.x,
        bottom  : gridStartingPosition.y + ( mapRows * globals.GRID_BLOCK_PX ) - globals.GRID_BLOCK_PX * .5 ,
        right   : gridStartingPosition.x + ( mapColumns * globals.GRID_BLOCK_PX )
    };

    state.currentMap.borders = borderObject 

    if ( state.currentMap.mapData.inaccessible != null ) {

        state.currentMap.mapData.inaccessible.forEach( (e) => {
            const topLeftXy = mapHelpers.getXYOfCell( e.topLeft.row, e.topLeft.col )
            
            let bottomRightXy = mapHelpers.getXYOfCell( e.bottomRight.row, e.bottomRight.col );

            bottomRightXy.x += globals.GRID_BLOCK_PX
            bottomRightXy.y += globals.GRID_BLOCK_PX
            
            const blockedXy = { 
                "BOTTOM": bottomRightXy.y,
                "LEFT": topLeftXy.x,
                "RIGHT": bottomRightXy.x,
                "TOP": topLeftXy.y
            }

            state.currentMap.blockedXyValues.push( blockedXy )
        })
    }

}

/** 
 * @function drawRow
 * Call @function drawTileInGridBlock for each column in this row
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {object} position - Starting x and y Canvas in pixels
 * @param {array} currentRow - Array with numbers representing a row
 */

const drawRow = ( currentMap, currentRow, position, i ) => {
    for ( var j = 0; j <= currentMap.mapData.columns; j++) {
        const currentTile = currentRow[j]

        drawTileInGridBlock( currentMap, currentTile, position, j, i )

        position.x += globals.GRID_BLOCK_PX
    }

}

/** 
 * @function drawTileInGridBlock
 * 
 * Handle non-numeric tile if necessary
 * Get blocksize and current tile xy in sheet from globals
 * Then draw the tile in block
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {integer} tile - number representing position of the tile in a tilesheet
 * @param {columns} startPositionInCanvas - Starting x and y Canvas in pixels
 */
const drawTileInGridBlock = ( currentMap, tile, startPositionInCanvas, j, currentRow ) => {

    currentMap.mapData.blocked.forEach( ( e ) => {
        if ( tile === e || tile === "F" || tile === "E" ) {
            currentMap.blockedXyValues.push( { 
                "BOTTOM": startPositionInCanvas.y + globals.GRID_BLOCK_PX,
                "LEFT": startPositionInCanvas.x,
                "RIGHT": startPositionInCanvas.x + globals.GRID_BLOCK_PX,
                "TOP": startPositionInCanvas.y
            } )
        }        
    })

    //}   
    
    // if tile is E - empty...
    if ( tile === "E" || tile === null) {
        return 
    }

    // if tile is F - filler...
    if ( tile === "F" ) {
        tile = currentMap.mapData.fillerTile
    }

    const blockSize = globals.GRID_BLOCK_PX

/*     const rectCtx = canvasHelpers.getFrontCanvasContext()
    rectCtx.rect( startPositionInCanvas.x, startPositionInCanvas.y, blockSize, blockSize )
    rectCtx.stroke()
    if ( j !== 0 ) {
        rectCtx.fillStyle = "white"
        rectCtx.font = "20px Times New Roman";
        rectCtx.fillText(
            j,
            startPositionInCanvas.x + 17.5, startPositionInCanvas.y + 17.5
        )        
    }
    else {
        rectCtx.fillStyle = "gold"
        rectCtx.font = "20px Times New Roman";
        rectCtx.fillText(
            currentRow,
            startPositionInCanvas.x + 17.5, startPositionInCanvas.y + 17.5
        ) 
    } */


    const tilePositionInSheet = globals.TILESHEET_GRID_XY_VALUES[ tile ]

    canvasHelpers.drawFromImageToCanvas( 
        "BACK",
        currentMap.tileSheet, 
        tilePositionInSheet.x, tilePositionInSheet.y,
        blockSize, blockSize,
        startPositionInCanvas.x, startPositionInCanvas.y,
        blockSize, blockSize
    )          
}

module.exports = {
    generateMap
}