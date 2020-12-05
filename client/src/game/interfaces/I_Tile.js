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
        this.hasSprite = false;
        this.spriteType;
        this.spriteData = {};

        this.clearTileID( );
        this.drawTileBorders( );
    };

    drawTileBorders( ) {
        this.ctx.beginPath();
        this.ctx.lineWidth = .5
        this.ctx.moveTo( this.x, this.y );
        this.ctx.lineTo( this.x, this.y + GRID_BLOCK_PX );
        this.ctx.moveTo( this.x, this.y );
        this.ctx.lineTo( this.x + GRID_BLOCK_PX, this.y );
        this.ctx.stroke( );
    }

    drawTileInMap( sheetImage ) {
        if ( this.ID === "E" || this.ID === null) {
            return;
        }

        const tilesheetXy = SHEET_XY_VALUES[this.ID]

        this.flipTileBeforeDrawing( sheetImage, tilesheetXy );
    
        this.ctx.drawImage(
            UTILITY_CANVAS, 
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.x, this.y,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        )
    }

    flipTileBeforeDrawing( sheetImage, tilesheetXy ) {
        const ctx = UTILITY_CTX;
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