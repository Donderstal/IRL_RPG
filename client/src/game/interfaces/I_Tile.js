const { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../game-data/globals')
const { EVENT_DOOR } = require('../../game-data/conditionGlobals')
const { Door } = require('../map/map-classes/Door')
const globals = require('../../game-data/globals');
const { ActionSelector } = require('../map/map-classes/ActionSelector');
/**
 * The I_Tile class is the most basic building block of the game.
 * Each map is divided up in a grid of rows and columns with an I_Grid instance.
 * Each cell in that map is represented by a I_Tile instance with an array-index and xy position.
 * The I_Tile stores information about a tile's state and interactivity
 * This could be the presence of a door or sprite or wether a tile can be crossed by sprites
 */
class I_Tile {
    constructor( index, x, y, ctx, row, col ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.index = index;  
        this.angle = 0;
        this.mirrored = false;
        this.row = row;
        this.col = col;

        this.blocked = false;
        this.blockedException = false;
        this.direction = {};

        this.hasEvent = false;
        this.eventType;
        this.event;

        this.clearTileID( );
    };
    /**
     * Return true if the Tile has an event of the type DOOR
     */
    get hasDoor( ) { 
        return this.hasEvent && this.eventType == EVENT_DOOR; 
    };
    /**
     * Return true if the tile is blocked or has a sprite on it
     */
    get isBlocked( ) { 
        return !this.blockedException && (this.blocked || this.hasSprite)
    }
    /**
     * If this.ID is not null or empty, fetch the xy position of the this.ID property from SHEET_XY_VALUES.
     * Draw the tile from the sheetImage to the UTIL canvas with drawTileToUtilityCanvas().
     * Then draw the I_Tile at the position of this.x and this.y props
     * @param {Image} sheetImage JS Image instance containing the current tilesheet png
     */
    drawTileInMap( sheetImage ) {
        if ( this.ID === "E" || this.ID === null) {
            return;
        }

        const tilesheetXy = SHEET_XY_VALUES[this.ID]
        this.drawTileToUtilityCanvas( sheetImage, tilesheetXy );
    
        this.ctx.drawImage(
            globals.GAME.util.canvas, 
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.x, this.y,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        )
        if ( globals.GAME.debugMode ) {
            this.ctx.beginPath( )
            this.ctx.rect( this.x, this.y,GRID_BLOCK_PX, GRID_BLOCK_PX )
            this.ctx.stroke( )
            this.ctx.fillText( this.index, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .5, )
        }
    }
    /**
     * Draw the tile at given XY location in tilesheet to the Utility canvas.
     * Depending on this.mirrored and this.angle property, mirror or flip the utility canvas.
     * @param {Image} sheetImage JS Image instance containing the current tilesheet png
     * @param {Object} tilesheetXy object with x and y Number properties
     */
    drawTileToUtilityCanvas( sheetImage, tilesheetXy ) {
        const ctx = globals.GAME.util.ctx;
        this.mirrored ? ctx.setTransform( -1, 0, 0, 1, GRID_BLOCK_IN_SHEET_PX, 0 ) : ctx.setTransform(1,0,0,1,0,0);
        switch( this.angle ) {
            case 0: 
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                );
                break;
            case 90:
                ctx.translate( 0 + GRID_BLOCK_PX * 2, 0 );
                ctx.rotate( 90 * ( Math.PI / 180 ) );
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                );  
                ctx.rotate( -(90 * ( Math.PI / 180 ) ))
                ctx.setTransform(1,0,0,1,0,0);
                break;
            case 180:
                ctx.translate( 0 + GRID_BLOCK_PX * 2, 0 + GRID_BLOCK_PX * 2 );
                ctx.rotate( Math.PI );
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                ); 
                ctx.rotate( -Math.PI )
                ctx.setTransform(1,0,0,1,0,0);
                break;
            case 270:
                ctx.translate( 0, 0 + GRID_BLOCK_PX * 2 );
                ctx.rotate( 270 * ( Math.PI / 180 ) )
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                );     
                ctx.rotate( -(270 * ( Math.PI / 180 )) )
                ctx.setTransform(1,0,0,1,0,0);
                break;
            default:
                alert('Error in flipping tile. Call the police!')
        }
    }
    /**
     * Set this.hasEvent property to true and assign type to this.eventType.
     * Then, set the Event to the I_Tile with a method depending on the type argument
     * @param {String} type 'enumerable' that decided how to set the given eventData. DOOR || ACTION
     * @param {Object} eventData A door or action object from the doors or actions in the active map
     */
    setEventData( type, eventData ) {
        this.hasEvent = true;
        this.eventType = type;
        switch ( type ) {
            case EVENT_DOOR :
                this.setDoor( eventData )
                break;
            case 'ACTION' :
                this.setAction( eventData )
                break;
        }
    }
    /**
     * Calculate the new doors' XY depending on the direction prop of doorData
     * Then, instantiate a Door instance and assign it to the event property
     * @param {Object} doorData object from the doors array in the current map
     */
    setDoor( doorData ) {
        const direction = doorData.direction
        let xy = { };
        switch ( direction ) {
            case FACING_UP :
                xy.x = this.x + ( GRID_BLOCK_PX / 2 )
                xy.y = this.y
                break;
            case FACING_RIGHT :
                xy.x = this.x + GRID_BLOCK_PX
                xy.y = this.y + ( GRID_BLOCK_PX / 2 )
                break;
            case FACING_DOWN :
                xy.x = this.x + ( GRID_BLOCK_PX / 2 )
                xy.y = this.y + GRID_BLOCK_PX
                break;
            case FACING_LEFT :
                xy.x = this.x
                xy.y = this.y + ( GRID_BLOCK_PX / 2 )
                break;
        }
        this.event = new Door( xy.x, xy.y, doorData );
    }
    /**
     * Instantiate a Action instance and assign it to the event property
     * @param {Object} doorData object from the doors array in the current map
     */
    setAction( actionData ) {
        this.event = new ActionSelector( this.x + ( GRID_BLOCK_PX / 2 ), this.y + ( GRID_BLOCK_PX / 2 ), actionData );
    }
    /**
     * Set this.hasEvent to false and this.event to null 
     */
    clearEventData( ) {
        this.hasEvent = false;
        this.event = null;
    }
    /**
     * Set wether the tilesheet tile in the I_Tile instance should be drawn flipped or mirrored
     * @param {Object} settings with the properties mirrored and angle 
     */
    setSettings( settings ) {
        this.mirrored = settings['mirrored'];
        this.angle = settings['angle'];
    }
    /**
     * Set given as this.ID. The ID property decides which tile from the tilesheet will be drawn
     * @param {Number} ID 
     */
    setTileID( ID ) {
        this.ID = ID;
    };
    /**
     * Set this.ID to empty, meaning that no tilesheet tile will de drawn in this I_Tile instance
     */
    clearTileID( ) {
        this.ID = "E"
    };
};

module.exports = {
    I_Tile
}