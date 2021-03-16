const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { NPC } = require('./map/map-classes/NPC')
const { MapObject } = require('./map/map-classes/MapObject')
const { MapSprite } = require('./map/map-classes/MapSprite')
const { getUniqueId } = require('../helpers/utilFunctions');
const { Road } = require('./map/map-classes/Road');
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base I_CanvasWithGrid class and contain an I_Grid instance with an array of I_Tile instances
 * The BackgroundCanvas contains all non-static elements of the current map.
 * For example, the NPCs, mapObjects and cars
 */
class ForegroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.roads = [ ];
        this.allSprites = [ ];
        this.spriteDictionary = { };
        this.playerSprite = { };
    };
    /**
     * Set characters, mapObjects, roads and the playerstart as properties
     * @param {Object} mapData - data object from mapResources
     */
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

    /**
     * Instantiate a mapSprite to start location and mark it as the player sprite
     * @param {Object} start row - column location to set Player sprite to 
     */
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
    /**
     * Loop through the array of character objects. 
     * If character object row-column location corresponds with that of an I_Tile in the grid, set the character object as prop to the I_Tile
     * @param {Object[]} characters - array of characters
     */
    setCharacters( characters ) {
        characters.forEach( ( character ) => {
            this.grid.array.forEach( ( tile ) => {
                if ( tile.row == character.row && tile.col == character.col ) {
                    tile.setSpriteData( "character", character )
                }
            })
        })
    };
    /**
     * Loop through the array of mapObject objects. 
     * If mapObject object row-column location corresponds with that of an I_Tile in the grid, set the mapObject object as prop to the I_Tile
     * @param {Object[]} mapObjects - array of objects
     */
    setObjects( mapObjects ) {
        mapObjects.forEach( ( object ) => {
            this.grid.array.forEach( ( tile ) => {
                if ( tile.row == object.row && tile.col == object.col ) {
                    tile.setSpriteData( "object", object )
                }
            })
        })
    };
    /**
     * Loop through all I_Tiles in this.grid.array.
     * If I_Tile.hasSprite, call setObjectSprite or setCharacterSprite depending on the spriteType
     */
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
    /**
     * Instantiate a NPC instance at the given tile. Give it an unique ID and add it to the allSprites & spriteDictionary props
     * @param {I_Tile} tile 
     */
    setCharacterSprite( tile ) {
        const newNPC = new NPC( tile, "STRD" );
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        newNPC.spriteId = newId;
        this.allSprites.push( newNPC )
        this.spriteDictionary[newId] = newNPC
        tile.spriteId = newId;
    }
    /**
     * Instantiate a MapObject instance at the given tile. Give it an unique ID and add it to the allSprites & spriteDictionary props
     * @param {I_Tile} tile 
     */
    setObjectSprite( tile ) {
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        const newObject = new MapObject( tile, newId )
        this.allSprites.push( newObject )
        this.spriteDictionary[newId] = newObject
        tile.spriteId = newId;
    }
    /**
     * Loop through given roads array. For each, instantiate a Road class and add it to the this.roads prop. Afterwards, check for intersecting roads.
     * @param {Object[]} roads - array of road data objects
     */
    setCarGenerator( roads ) {
        roads.forEach( ( roadData, index ) => {
            this.roads.push( new Road( roadData, index ) )
        } )

        if ( roads.length > 1 ) {
            this.roads.forEach( ( road ) => {
                road.checkForIntersections( this.roads )
            })
        }
    }
    /**
     * Semi-randomly select a road to spawn a car on. 
     * If a car can be spawned, get carData for a car from the selected road
     * Then set the data to at the roads' I_Tile and instantiate a class with setObjectSprite
     */
    generateCar( ) {
        const spawnableRoads = this.roads.filter( ( road ) => { return road.hasStart })
        const activeRoad = spawnableRoads[ Math.floor(Math.random() * spawnableRoads.length) ];
        if ( activeRoad.startCellIsBlocked ) {
            return;
        }
        const carData = activeRoad.getCarDataForTile( )
        const tile = super.getTileAtCell( carData.col, carData.row );
        tile.setSpriteData( "object", carData )
        this.setObjectSprite( tile )   
        tile.clearSpriteData( );   
    }
    /**
     * Clear all props containing information on the currently active map
     * Then clear the inner tile grid
     */
    clearMap( ) {
        this.allSprites = [ ];
        this.roads = [ ];
        this.spriteDictionary = { };
        this.playerSprite.clearTileIndexes( );
    }
}

module.exports = { 
    ForegroundCanvas
}