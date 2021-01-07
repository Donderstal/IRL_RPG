const { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES } = require('../../game-data/globals')
const { MapAction } = require('../map/map-classes/MapAction')
const { Door } = require('../map/map-classes/Door')
const globals = require('../../game-data/globals')

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

        this.hasSprite = false;
        this.spriteType;
        this.spriteData = {};

        this.hasEvent = false;
        this.eventType;
        this.event;

        this.clearTileID( );
    };

    drawTileInMap( sheetImage ) {
        if ( this.ID === "E" || this.ID === null) {
            return;
        }

        const tilesheetXy = SHEET_XY_VALUES[this.ID]
        this.flipTileBeforeDrawing( sheetImage, tilesheetXy );
    
        this.ctx.drawImage(
            globals.GAME.util.canvas, 
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.x, this.y,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        )
    }

    flipTileBeforeDrawing( sheetImage, tilesheetXy ) {
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

    setEventData( type, eventData ) {
        this.hasEvent = true;
        this.eventType = type;
        switch ( type ) {
            case 'DOOR' :
                this.setDoor( eventData )
                break;
            case 'ACTION' :
                this.setAction( eventData )
                break;
        }
    }

    setDoor( doorData ) {
        const directionIn = doorData.directionIn
        let xy = { };
        switch ( directionIn ) {
            case 'FACING_UP' :
                xy.x = this.x + ( GRID_BLOCK_PX / 2 )
                xy.y = this.y
                break;
            case 'FACING_RIGHT' :
                xy.x = this.x + GRID_BLOCK_PX
                xy.y = this.y + ( GRID_BLOCK_PX / 2 )
                break;
            case 'FACING_DOWN' :
                xy.x = this.x + ( GRID_BLOCK_PX / 2 )
                xy.y = this.y + GRID_BLOCK_PX
                break;
            case 'FACING_LEFT' :
                xy.x = this.x
                xy.y = this.y + ( GRID_BLOCK_PX / 2 )
                break;
        }
        this.event = new Door( xy.x, xy.y, doorData );
        //setTimeout( ( ) => { this.event.draw( xy.x, xy.y ); }, 1000)
    }

    setAction( actionData ) {
        this.event = new MapAction( this.x + ( GRID_BLOCK_PX / 2 ), this.y + ( GRID_BLOCK_PX / 2 ), actionData );
        //setTimeout( ( ) => { this.event.draw( this.x + ( GRID_BLOCK_PX / 2 ), this.y + ( GRID_BLOCK_PX / 2 ) ); }, 1000)
    }

    clearEventData( ) {
        this.hasEvent = false;
        this.event = null;
    }

    setSpriteData( type, data ) {
        this.hasSprite = true;
        this.spriteType = type;
        this.spriteData = data;
    }

    clearSpriteData( ) {
        this.hasSprite = false;
        this.spriteType = null;
        this.spriteData = null;
    }

    setSettings( settings ) {
        this.mirrored = settings['mirrored'];
        this.angle = settings['angle'];
    }

    setTileID( ID ) {
        this.ID = ID;
    };

    clearTileID( ) {
        this.ID = "E"
    };
};

module.exports = {
    I_Tile
}