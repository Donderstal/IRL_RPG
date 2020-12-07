const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { NPC } = require('./map/map-init/NPCController')
const { MapObject } = require('./map/map-init/setMapAttributes')
const { MapSprite } = require('./map/map-init/mapSprite')
const { getUniqueId } = require('../helpers/utilFunctions')

class ForegroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.characters = false;
        this.objects = false;
        this.allSprites = [ ];
        this.spriteDictionary = { };
        this.playerSprite = { };
        console.log("initializing foreground!")
    };

    get activePlayerTile( ) { return this.grid.array[ this.playerSprite.activeTileIndex ] }
    get nextPlayerTile( ) { return this.grid.array[ this.playerSprite.nextTileIndex ] }

    setForegroundData( mapData ) {
        if ( mapData.characters )
            this.setCharacters( mapData.characters );
        if ( mapData.mapObjects )
            this.setObjects( mapData.mapObjects );
        if ( mapData.playerStart )
            this.setPlayerCharacter( mapData.playerStart );
    }

    setPlayerCharacter( start ) {
        const startingTile = this.grid.array.filter( tile => {
            return tile.row == start.row && tile.col == start.col
          })
        let mapSpritesFolder = '/static/sprites/';
        let spriteSrc = mapSpritesFolder + start.playerClass.toLowerCase() + '.png'
        this.playerSprite = new MapSprite( startingTile[0], 'STRD', spriteSrc )
        this.allSprites.push( this.playerSprite )
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
        const newNPC = new NPC( tile, "STRD" );
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        this.allSprites.push( newNPC )
        this.spriteDictionary[newId] = newNPC
        tile.spriteId = newId;
        console.log(this.NPC_Dictionary);
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