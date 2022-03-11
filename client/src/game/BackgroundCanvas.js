const { EVENT_DOOR } = require('../game-data/conditionGlobals');
const { tryCatch } = require('../helpers/errorHelpers');
const { CanvasWithGrid } = require('./core/CanvasWithGrid');
const { Savepoint } = require('./map/map-classes/SavePoint');
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base CanvasWithGrid class and contain an Grid instance with an array of Tile instances
 * The BackgroundCanvas will contain all static elements of the current map and draw them if necessary.
 * For example, the background tiles, the doors and static actions
 */
class BackgroundCanvas extends CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.backgroundActions = [];
        this.activeDoors = [];
        this.savepoint = false;
    };
    /**
     * Assign given string as value for the this.mapName prop
     * @param {String} mapName 
     */
    setMapName( mapName ) {
        this.mapName = mapName;
    }
    /**
     * Assign given string as value for the this.neighbourhood prop
     * @param {String} neighbourhood 
     */
    setNeighbourhood( neighbourhood ) {
        this.neighbourhood = neighbourhood
    }
    /**
     * Assign given array of actions to the this.actions prop. Set this.hasActions to true
     * @param {Object[]} actions - array of actions to set
     */
    setActions( actions ) {
        this.actions = actions;
        this.hasActions = true;
    }
    /**
     * Assign given array of doors to the this.doors prop. Set this.hasDoors to true
     * @param {Object[]} doors - array of doors to set
     */
    setDoors( doors ) {
        this.doors = doors;
        this.hasDoors = true;
    }
    /**
     * Assign given array of  blocked tiles to the this.blockedTiles prop.
     * @param {Number[]} blockedTiles - blocked Tiles in sheet represented by their index
     */
    setBlockedTiles( blockedTiles ) {
        this.blockedTiles = blockedTiles
    }
    /**
     * Set tile grid and various data for a new map as class properties
     * @param {Object} mapData - data object from mapResources
     * @param {Object} sheetData - data object from tilesheetResources
     */
    setBackgroundData( mapData, sheetData ) {
        if ( mapData.doors )
            this.setDoors( mapData.doors );
        if ( mapData.actions )
            this.setActions( mapData.actions );
        if ( mapData.savepoint ) 
            this.setSavepoint( mapData.savepoint );
        if ( sheetData.blocked ) 
            this.setBlockedTiles( sheetData.blocked );
        let oneDimensionalMapGrid = mapData.grid.flat(1);
        this.setTileGrid( oneDimensionalMapGrid );
    }
    /**
     * Loop through the inner Grid array.
     * For each tile, check if a corresponding door, action or blocked tile is set in the BackgroundCanvas props
     */
    setEventsDoorsAndBlockedToTilesInGrid( ) {
        this.grid.array.forEach( ( tile ) => {
            tryCatch(((tile)=>{
                if ( this.hasDoors ) {
                    this.doors.forEach( ( door ) => {
                        if ( tile.row == door.row && tile.col == door.col && !door.isSet ) {
                            tile.setEventData( EVENT_DOOR, door );
                            this.backgroundActions.push( tile.event );
                            this.activeDoors.push( tile.event );
                        }
                    })                
                }              
                if ( this.hasActions ) {
                this.actions.forEach( ( action ) => {
                    if ( tile.row == action[0].row && tile.col == action[0].col && !action.isSet ) {
                        tile.setEventData( "ACTION", action );
                        this.backgroundActions.push( tile.event )
                    }
                })                
                }
                this.blockedTiles.forEach( blockedId => {
                    if (tile.ID == blockedId) {
                        tile.blocked = true;
                    }
                })
            }).bind(this), [tile])
        } );
    }
    /**
     * Call the drawMap function of the inner Grid Class with this.sheetImage as parameter
     */
    setSavepoint( savepointData ) {
        const tile = this.getTileAtCell( savepointData.col, savepointData.row )
        tile.hasEvent = true;
        tile.eventType = "SAVE"
        tile.event = new Savepoint( tile );
        this.savepoint = tile;
    }
    /**
     * Clear all data associated with the current map and the inner Grid
     */
    clearMap( ) {
        this.doors = [ ];
        this.hasDoors = false;
        this.activeDoors = [];
        this.actions = { };
        this.hasActions = false;
        this.blockedTiles = [ ];
        this.backgroundActions = [];
        this.savepoint = false;
        this.transparentTileGroups = [];
    }
};

module.exports = { 
    BackgroundCanvas
}