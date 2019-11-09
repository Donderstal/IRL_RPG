// This file should store all global constants

module.exports = {

    // speed for characters
    MOVEMENT_SPEED : 1.85,

    // for us in movement animation
    FACING_DOWN    : 0,
    FACING_UP      : 3,
    FACING_LEFT    : 1,
    FACING_RIGHT   : 2,

    // animation frame limit
    FRAME_LIMIT    : 12,

    // canvas dimensions
    GRID_BLOCK_PX  : 37,
    GRID_WIDTH     : 888,
    GRID_HEIGHT    : 592,
    CANVAS_COLUMNS : 24,
    CANVAS_ROWS    : 16,

    
    TILESHEET_GRID_XY_VALUES : [

    // We will use tilesheets to render our maps. Tilesheet are always 4 tiles wide.
    // TILESHEET_GRID_XY_VALUES is an array used to store the x and y position of
    // individual tiles in a sheet. 
    
    // This array must always be as long as the largest tilesheet included in the game.

    // The Json files that store maps, represent them as a an array of arrays, where
    // numbers in the array represent a tile in the map

    // When a map is rendered in /map-init/initMap.js, the drawRow function checks this global
    // using the tile number retrieved from the map Json to determine where in the 
    // tilesheet the requested tile is. The x y is then passed to ctx.drawImage

        { "y": 0, "x": 0 },
        { "y": 0, "x": 37 },
        { "y": 0, "x": 74 },
        { "y": 0, "x": 111 },
        { "y": 37, "x": 0 },
        { "y": 37, "x": 37 },
        { "y": 37, "x": 74 },
        { "y": 37, "x": 111 },
        { "y": 74, "x": 0 },
        { "y": 74, "x": 37 },
        { "y": 74, "x": 74 },
        { "y": 74, "x": 111 },
        { "y": 111, "x": 0 },
        { "y": 111, "x": 37 },
        { "y": 111, "x": 74 },
        { "y": 111, "x": 111 },
        { "y": 148, "x": 0 },
        { "y": 148, "x": 37 },
        { "y": 148, "x": 74 },
        { "y": 148, "x": 111 },
        { "y": 185, "x": 0 },
        { "y": 185, "x": 37 },
        { "y": 185, "x": 74 },
        { "y": 185, "x": 111 },
        { "y": 222, "x": 0 },
        { "y": 222, "x": 37 },
        { "y": 222, "x": 74 },
        { "y": 222, "x": 111 },
        { "y": 259, "x": 0 },
        { "y": 259, "x": 37 },
        { "y": 259, "x": 74 },
        { "y": 259, "x": 111 }
    ]
    
}