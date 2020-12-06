const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { NPC } = require('./map/map-init/NPCController')
const { MapObject } = require('./map/map-init/setMapAttributes')
const { globals } = require('svelte/internal');

class ForegroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.characters = false;
        this.objects = false;
        this.allSprites = [ ];
        console.log("initializing foreground!")
    };

    setForegroundData( mapData ) {
        if ( mapData.characters )
            this.setCharacters( mapData.characters );
        if ( mapData.mapObjects )
            this.setObjects( mapData.mapObjects );
    }

    setCharacters( characters ) {
        characters.forEach( ( character ) => {
            const col = character.type == 'walking' ? character.lastPosition.col : character.col; 
            const row = character.type == 'walking' ? character.lastPosition.row : character.row; 
            this.grid.array.forEach( ( tile ) => {
                if ( tile.row == row && tile.col == col ) {
                    tile.setSpriteData( "character", character )
                }
            })
        })
    };

    setObjects( objects ) {
        objects.forEach( ( object ) => {
            this.grid.array.forEach( ( tile ) => {
                if ( tile.row == object.row && tile.col == object.col ) {
                    tile.setSpriteData( "object", object )
                }
            })
        })
    };

    clearForegroundData( ) {
        this.grid = [ ];
        this.allSprites = [ ];
    }

    setSpritesToGrid( ) {
        this.grid.array.forEach( ( tile ) => {
            if ( tile.hasSprite ) {
                if ( tile.spriteType == 'object' ) {
                    this.setObjectSprite( tile )
                }
                else if ( tile.spriteType == 'character' ) {
                    this.setCharacterSprite( tile )
                }
            }
        })
    };
    
    setCharacterSprite( tile ) {
        this.allSprites.push( new NPC( 
            tile, "STRD"
        ) )
    }

    setObjectSprite( tile ) {
        this.allSprites.push( new MapObject( tile.spriteData ) )
    }

    clearSpriteFromTile(x, y) {
        const tile = super.getTileAtXY(x,y);
        tile.clearSpriteData( );
        this.drawSpritesInGrid( );
    };
}

module.exports = { 
    ForegroundCanvas
}