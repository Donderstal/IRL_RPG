const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { FOREGROUND_CANVAS, GRID_BLOCK_PX, STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT } = require('../game-data/globals')

class ForegroundCanvas extends I_CanvasWithGrid {
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
                        tile.x, ( tile.y + GRID_BLOCK_PX ) - (document.getElementById(currentSprite).height / 2),
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
                        tile.x, tile.y - ( GRID_BLOCK_PX * 0.75 ),
                        STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT
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

module.exports = { 
    ForegroundCanvas
}