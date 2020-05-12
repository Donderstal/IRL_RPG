const mapHelpers    = require('../../../helpers/mapHelpers')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const state         = require('../../../game-data/state')
const globals       = require('../../../game-data/globals')

let tilesheetXyValues = [ ]

/** 
 * Call @function getStartingPositionOfGridInCanvas to get the xy to start drawing in the canvas
 * Call @function drawGrid when tilesheet has been loaded based on the image path in the json file
 * 
 * @param {Object} currentMap - JSON containing data on the Map
 */

const generateMap = ( currentMap ) => {
    currentMap.tileSheet = new Image();    
    currentMap.tileSheet.src = '/static/tilesets/' + currentMap.mapData.src
    currentMap.tileSheet.onload = ( ) => {    
        drawGrid( startingPosition, currentMap )
    }

    let startingPosition = getStartingPositionOfGridInCanvas( currentMap.mapData.columns, currentMap.mapData.rows )
    currentMap.topLeftCell = mapHelpers.getTopLeftCellOfGridInCanvas( startingPosition.x, startingPosition.y )
    if ( currentMap.battleMap != true ) {
        setMapBorders( startingPosition, currentMap.mapData.rows, currentMap.mapData.columns)
    }
    
    calcTilesheetXyPositions( currentMap.mapData.uniqueTiles )
}

const calcTilesheetXyPositions = ( tilesInSheet ) => {
    let tileX = 0
    let tileY = 0
    tilesheetXyValues = []

    for ( var i = 0; i <= tilesInSheet; i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        tileX += globals.GRID_BLOCK_IN_SHEET_PX
        if ( i % 4 == 3 ) {
            tileX = 0
            tileY += globals.GRID_BLOCK_IN_SHEET_PX
        }
    }
}

/** 
 * Calculate starting position of grid relative to canvas based on data from JSON
 * 
 * @param {object} mapColumns - columns of map ( in grid blocks )
 * @param {object} mapRows - rows of map  ( in grid blocks )
 * @return {object} - top and left position in Canvas to start drawing grid ( in pixels ) 
 */

const getStartingPositionOfGridInCanvas = ( mapColumns, mapRows ) => {
    const gridStartingPosition = {}

    gridStartingPosition.x = Math.ceil( ( globals.CANVAS_COLUMNS - mapColumns ) / 2 ) * globals.GRID_BLOCK_PX
    gridStartingPosition.y = Math.ceil( ( globals.CANVAS_ROWS - mapRows ) / 2 )  * globals.GRID_BLOCK_PX

    return gridStartingPosition 
}

/** 
 * Get starting position of grid in canvas
 * Call @function drawRow for each row
 * 
 * @param {object} startingPosition - starting x and y for drawing
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 */

const drawGrid = ( startingPosition, currentMap ) => {
    const position = startingPosition

    for ( var i = 0; i <= currentMap.mapData.rows; i++ ) {
        const currentRow = currentMap.mapData.grid[i]
        drawRow( currentMap, currentRow, position )

        position.y += globals.GRID_BLOCK_PX
        position.x = Math.ceil( ( globals.CANVAS_COLUMNS - currentMap.mapData.columns ) / 2 ) * globals.GRID_BLOCK_PX

    }
}

const setMapBorders = (gridStartingPosition, mapRows, mapColumns) => {
    let borderObject = { 
        top     : gridStartingPosition.y,
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
        } )
    }
}

/** 
 * Call @function drawTileInGridBlock for each column in this row
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {object} position - Starting x and y Canvas in pixels
 * @param {array} currentRow - Array with numbers representing a row
 */

const drawRow = ( currentMap, currentRow, position ) => {
    for ( var j = 0; j <= currentMap.mapData.columns; j++ ) {
        const currentTile = currentRow[j]

        setBlockedXyIfNeeded( currentMap, currentTile, position )
        drawTileInGridBlock( currentMap, currentTile, position )

        position.x += globals.GRID_BLOCK_PX
    }
}


// The blocked tiles system is shitty and needs to change
const setBlockedXyIfNeeded = ( currentMap, tile, startPositionInCanvas ) => {
    if ( currentMap.mapData.blocked ) {
        let blockedTile = {
            "BOTTOM": startPositionInCanvas.y + globals.GRID_BLOCK_PX,
            "LEFT": startPositionInCanvas.x,
            "RIGHT": startPositionInCanvas.x + globals.GRID_BLOCK_PX,
            "TOP": startPositionInCanvas.y
        }    

        currentMap.mapData.blocked.forEach( ( e ) => {
            if ( !e.id ) {
                if ( tile === e ) {
                    currentMap.blockedXyValues.push( blockedTile )
                }                   
            }
            else {
                if ( tile === e.id ) {
                    if ( e.top ) {
                        blockedTile["TOP"] += ( globals.GRID_BLOCK_PX * e.top.factor )
                    }
                    if ( e.bottom ) {
                        blockedTile["BOTTOM"] -= ( globals.GRID_BLOCK_PX * e.bottom.factor )
                    }
                    if ( e.left ) {
                        blockedTile["LEFT"] += ( globals.GRID_BLOCK_PX * e.left.factor )
                    }
                    if ( e.right ) {
                        blockedTile["RIGHT"] -= ( globals.GRID_BLOCK_PX * e.right.factor )
                    }
                    currentMap.blockedXyValues.push( blockedTile )

                    if ( state.debug.map == true ) {
                        const rectCtx = canvasHelpers.getBackCanvasContext( );
                        rectCtx.rect( blockedTile["LEFT"], blockedTile["TOP"], 
                        blockedTile["RIGHT"] - blockedTile["LEFT"], blockedTile["BOTTOM"] - blockedTile["TOP"] )
                        rectCtx.strokeStyle = "red";
                        rectCtx.stroke( );
                    }
                }    
            }
        } )        
    } 
}

/** 
 * Add block to BlockedXyValues if necessary
 * Handle non-numeric tile if necessary
 * Get blocksize and current tile xy in sheet from globals
 * Then draw the tile in block
 * 
 * @param {object} currentMap - Object containing all the data needed to draw Grid
 * @param {integer} tile - number representing position of the tile in a tilesheet
 * @param {columns} startPositionInCanvas - Starting x and y Canvas in pixels
 */
const drawTileInGridBlock = ( currentMap, tile, startPositionInCanvas ) => {
    // if tile is E - empty...
    if ( tile === "E" || tile === null) {
        return 
    }

    // if tile is F - filler...
    if ( tile === "F" ) {
        tile = currentMap.mapData.fillerTile
    }

    const blockSize = globals.GRID_BLOCK_PX  
    const tilePositionInSheet = tilesheetXyValues[tile]
    canvasHelpers.drawFromImageToCanvas( 
        "BACK",
        currentMap.tileSheet, 
        tilePositionInSheet.x, tilePositionInSheet.y,
        globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX,
        startPositionInCanvas.x, startPositionInCanvas.y,
        blockSize, blockSize
    )        

    if ( state.debug.map == 'pie' ) {
        const rectCtx = canvasHelpers.getBackCanvasContext()
        rectCtx.rect( startPositionInCanvas.x, startPositionInCanvas.y, blockSize, blockSize ) 
        rectCtx.strokeStyle = "black";        
        rectCtx.stroke()

        rectCtx.font = "20px Times New Roman";
        rectCtx.fillText(
            tile,
            startPositionInCanvas.x, startPositionInCanvas.y + 17.5
        )
    }
    
}

module.exports = {
    generateMap
}