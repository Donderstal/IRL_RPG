const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { NPC } = require('./map/map-classes/NPC')
const { MapObject } = require('./map/map-classes/MapObject')
const { MapSprite } = require('./map/map-classes/MapSprite')
const { getUniqueId } = require('../helpers/utilFunctions')

class ForegroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.roads = [ ];
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
        if ( mapData.roads ) 
            this.setCarGenerator( mapData.roads );
    }

    setPlayerCharacter( start ) {
        const startingTile = this.grid.array.filter( tile => {
            return tile.row == start.row && tile.col == start.col
          })
        let mapSpritesFolder = '/static/sprites/';
        let spriteSrc = mapSpritesFolder + start.playerClass.toLowerCase() + '.png'
        this.playerSprite = new MapSprite( startingTile[0], 'STRD', spriteSrc )
        startingTile[0].setSpriteData( 'character', null )
        startingTile[0].spriteId = "PLAYER"
        this.playerSprite.spriteId = "PLAYER"
        this.allSprites.push( this.playerSprite )
    }

    setCharacters( characters ) {
        characters.forEach( ( character ) => {
            const col = character.type == 'walking' || character.type == 'flying' ? character.lastPosition.col : character.col; 
            const row = character.type == 'walking' || character.type == 'flying' ? character.lastPosition.row : character.row; 
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

    setSpritesToGrid( ) {
        this.grid.array.forEach( ( tile ) => {
            if ( tile.hasSprite ) {
                if ( tile.spriteType == 'object' ) {
                    this.setObjectSprite( tile )
                }
                else if ( tile.spriteType == 'character' && tile.spriteId != "PLAYER" ) {
                    this.setCharacterSprite( tile )
                }
            }
        })
    };
    
    setCharacterSprite( tile ) {
        const newNPC = new NPC( tile, "STRD" );
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        newNPC.spriteId = newId;
        this.allSprites.push( newNPC )
        this.spriteDictionary[newId] = newNPC
        tile.spriteId = newId;
    }

    setObjectSprite( tile ) {
        const newObject = new MapObject( tile )
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        newObject.spriteId = newId;
        this.allSprites.push( newObject )
        this.spriteDictionary[newId] = newObject
        tile.spriteId = newId;
    }

    clearSpriteFromTile(x, y) {
        const tile = super.getTileAtXY(x,y);
        tile.clearSpriteData( );
        this.drawSpritesInGrid( );
    };

    setCarGenerator( roads ) {
        roads.forEach( ( roadData ) => {
            this.roads.push( roadData )
        } )
    }

    generateCar( ) {
        const activeRoad = this.roads[ Math.floor(Math.random() * this.roads.length) ];
        const carData = { "direction": activeRoad.direction, "moving": true, "type": "Car_A" };
        switch( activeRoad.direction ) {
            case "FACING_LEFT" :
                carData["row"]  = activeRoad.row;
                carData["col"]  = this.grid.cols
                carData.destination = { "row": activeRoad.row, "col": 1 }
                break;
            case "FACING_UP" :
                carData["row"]  = this.grid.rows
                carData["col"]  = activeRoad.col;
                carData.destination = { "row": 1, "col": activeRoad.col }
                break;
            case "FACING_RIGHT" :
                carData["row"]  = activeRoad.row;
                carData["col"]  = 1
                carData.destination = { "row": activeRoad.row, "col": this.grid.cols }
                break;
            case "FACING_DOWN" :
                carData["row"]  = 1
                carData["col"]  = activeRoad.col;
                carData.destination = { "row": this.grid.rows, "col": activeRoad.col }
                break;
            default:
                console.log("error! Direction " + activeRoad.direction + " not recognized")
        }

        const tile = this.grid.getTileAtCell( carData.row, carData.col );
        tile.setSpriteData( "object", carData )
        this.setObjectSprite( tile )
    }

    clearMap( ) {
        this.allSprites = [ ];
        this.roads = [ ];
        this.spriteDictionary = { };
        this.playerSprite.clearTileIndexes( );
        super.clearGrid( );
    }
}

module.exports = { 
    ForegroundCanvas
}