const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { BACKGROUND_CANVAS, UTILITY_CANVAS, GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } = require('../game-data/globals')
const globals = require('../game-data/globals')

class BackgroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        console.log("initializing map!")
        this.activeTile = { }
    };
    
    get activePlayerTile( ) { return this.grid.array[ globals.GAME.front.class.activePlayerTile.index ] }
    get nextPlayerTile( ) { return this.grid.array[ globals.GAME.front.class.nextPlayerTile.index ] }

    setMapName( mapName ) {
        this.mapName = mapName;
    }

    clearGrid( ) {
        super.clearGrid( );
        this.ctx.clearRect( 0, 0, BACKGROUND_CANVAS.width, BACKGROUND_CANVAS.height )
        this.grid.initializeGrid( );
    }

    setNeighbourhood( neighbourhood ) {
        this.neighbourhood = neighbourhood
    }

    drawTileAtXY( x, y ) {
        const tile = super.getTileAtXY( x, y );
        tile.setTileID( tile.index )
        tile.setSettings( tile.settings );
        this.ctx.drawImage( 
            UTILITY_CANVAS, 
            0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX, 
            tile.x, tile.y, GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    setActiveTile( x, y ) {
        this.activeTile = super.getTileAtXY( x, y )
    }

    setActions( actions ) {
        this.actions = actions;
    }

    setDoors( doors ) {
        this.doors = doors;
    }

    setBlockedTiles( sheetData ) {
        this.blockedTiles = sheetData.blocked
    }

    setBackgroundData( mapData, sheetData ) {
        if ( mapData.doors )
            this.setDoors( mapData.doors );
        if ( mapData.actions )
            this.setActions( mapData.actions );
        if ( sheetData.blocked ) 
            this.setBlockedTiles( sheetData )
        this.setTileGrid( mapData.grid.flat(1) )


        this.grid.array.forEach( ( tile ) => {
            if ( this.doors.length > 0 ) {
                this.doors.forEach( ( door ) => {
                    if ( tile.row == door.row && tile.col == door.col && !door.isSet ) {
                        tile.setEventData( "DOOR", door );
                    }
                })                
            }
            if ( Object.keys( this.actions ).length > 0 ) {
                this.actions.forEach( ( action ) => {
                    if ( tile.row == action.row && tile.col == action.col && !action.isSet ) {
                        tile.setEventData( "ACTION", action );
                    }
                })                
            }
            this.blockedTiles.forEach( blockedId => {
                if ( tile.ID == blockedId ) {
                    tile.blocked = true;
                }
            })
        } );
    }
    
    drawMapFromGridData( ) {
        this.grid.drawMap( this.sheetImage )
    }

    clearMap( ) {
        this.doors = [ ];
        this.actions = { };
        this.blockedTiles = [ ];
    }
};

module.exports = { 
    BackgroundCanvas
}