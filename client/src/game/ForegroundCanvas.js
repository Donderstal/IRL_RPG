class ForegroundCanvas extends CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.characters = false;
        this.objects = false;
        console.log("initializing foreground!")
    };
    drawSpritesInGrid( ) {
        this.ctx.clearRect(0, 0, FOREGROUND_CANVAS.width, FOREGROUND_CANVAS.height);
        this.grid.array.forEach( ( tile ) => {
            tile.drawTileBorders( )
            if ( tile.hasSprite ) {
                if ( tile.spriteType == 'object' ) {
                    const currentSprite = tile.spriteData.type + '.png'
                    this.ctx.drawImage(
                        document.getElementById(currentSprite).image,
                        0, 0,
                        document.getElementById(currentSprite).width, document.getElementById(currentSprite).height,
                        tile.x, ( tile.y + TILE_SIZE ) - (document.getElementById(currentSprite).height / 2),
                        document.getElementById(currentSprite).width / 2, document.getElementById(currentSprite).height / 2
                    )
                }
                else if ( tile.spriteType == 'character' ) {
                    const currentSprite = tile.spriteData.sprite
                    let sourceY;
                    switch( tile.spriteData.direction ) {
                        case 'FACING_DOWN':
                            sourceY = 0;
                            break;
                        case 'FACING_LEFT':
                            sourceY = STRD_SPRITE_HEIGHT
                            break;
                        case 'FACING_RIGHT':
                            sourceY = STRD_SPRITE_HEIGHT *  2
                            break;
                        case 'FACING_UP':
                            sourceY = STRD_SPRITE_HEIGHT * 3
                            break;
                    }
                    this.ctx.drawImage(
                        document.getElementById(currentSprite).image,
                        0, sourceY,
                        document.getElementById(currentSprite).width, document.getElementById(currentSprite).height,
                        tile.x, tile.y - ( TILE_SIZE * 0.75 ),
                        STRD_SPRITE_WIDTH / 2, STRD_SPRITE_HEIGHT / 2
                    )
                }
            }
        })
    }
    clearSpriteFromTile(x, y) {
        const tile = super.getTileAtXY(x,y);
        tile.clearSpriteData( );
        this.drawSpritesInGrid( );
    }
}