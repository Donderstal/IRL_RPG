const { I_CanvasWithGrid } = require('./interfaces/I_CanvasWithGrid');
const { NPC } = require('./map/map-classes/NPC')
const { MapObject } = require('./map/map-classes/MapObject')
const { MapSprite } = require('./map/map-classes/MapSprite')
const { Car } = require('./map/roads/Car')
const { getUniqueId } = require('../helpers/utilFunctions');
const { getEffect } = require('../helpers/effectHelpers');
const globals = require('../game-data/globals');
const { DEFAULT, EVENT_TALK, SPEAK } = require('../game-data/conditionGlobals');
const { RoadNetwork } = require('./map/RoadNetwork');
const pathFinder = require('../helpers/pathfindingHelpers')
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base I_CanvasWithGrid class and contain an I_Grid instance with an array of I_Tile instances
 * The BackgroundCanvas contains all non-static elements of the current map.
 * For example, the NPCs, mapObjects and cars
 */
class ForegroundCanvas extends I_CanvasWithGrid {
    constructor( x, y, ctx ) {
        super( x, y, ctx );
        this.allSprites = [ ];
        this.spriteDictionary = { };
        this.playerSprite = { };
        this.activeEffects = [];
        this.roadNetwork;
    };
    /**
     * Return a effect Instance and push it to this.activeEffects
     */
    addEffect( name, x, y, endX = null, endY = null ) {
        this.activeEffects.push( getEffect( name, x, y, endX, endY ) );
    }
    /**
     * Set characters, mapObjects, roads and the playerstart as properties
     * @param {Object} mapData - data object from mapResources
     */
    setForegroundData( mapData, isNewGame ) {
        if ( mapData.characters )
            this.setCharacters( mapData.characters );
        if ( mapData.mapObjects )
            this.setObjects( mapData.mapObjects );
        if ( mapData.playerStart && isNewGame )
            this.initPlayerCharacter( mapData.playerStart );
        if ( mapData.roads ) 
            this.roadNetwork = new RoadNetwork( mapData.roads );
    }

    /**
     * Instantiate a mapSprite to start location and mark it as the player sprite
     * @param {Object} start row - column location to set Player sprite to 
     */
    initPlayerCharacter( start ) {
        const startingTile = this.grid.array.filter( tile => {
            return tile.row == start.row && tile.col == start.col
          })
        let mapSpritesFolder = '/static/sprites/';
        let spriteSrc = mapSpritesFolder + start.playerClass.toLowerCase() + '.png'
        this.playerSprite = new MapSprite( startingTile[0], 0, 'STRD', spriteSrc )
        this.playerSprite.spriteId = "PLAYER"
        this.playerSprite.name = "Player";
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
                    this.setCharacterSprite( tile, character );
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
                    this.setObjectSprite( tile, object, false )
                }
            })
        })
    };
    /**
     * Instantiate a NPC instance at the given tile. Give it an unique ID and add it to the allSprites & spriteDictionary props
     * @param {I_Tile} tile 
     */
    setCharacterSprite( tile, characterData ) {
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        const newNPC = new NPC( tile, characterData, newId );
        this.allSprites.push( newNPC )
        this.spriteDictionary[newId] = newNPC
        tile.spriteId = newId;
    }
    /**
     * Instantiate a MapObject instance at the given tile. Give it an unique ID and add it to the allSprites & spriteDictionary props
     * @param {I_Tile} tile 
     */
    setObjectSprite( tile, objectData, isCar ) {
        const newId = getUniqueId( Object.keys(this.spriteDictionary) );
        const newObject = isCar ? new Car( tile, objectData, newId ) : new MapObject( tile, objectData, newId )
        this.allSprites.push( newObject )
        this.spriteDictionary[newId] = newObject
        tile.spriteId = newId;
        if ( isCar ) {
            newObject.setDestination( objectData.destination, true );
        }
    }
    setVehicleToTile( carData ) {
        const tile = super.getTileAtCell( carData.col, carData.row );
        this.setObjectSprite( tile, carData, true )   
    }
    /**
     * Clear all props containing information on the currently active map
     * Then clear the inner tile grid
     */
    clearMap( ) {
        this.allSprites = [ ];
        this.roadNetwork = null;
        this.spriteDictionary = { };
    }

    deleteSprite( spriteId ) {
        if ( this.spriteDictionary[spriteId].movementSoundEffect ) {
            this.spriteDictionary[spriteId].movementSoundEffect.reset( );
        };
        if ( this.spriteDictionary[spriteId].isCar ) {
            this.roadNetwork.roads.forEach( ( e ) => {
                if ( e.activeCarIds.indexOf( spriteId ) > - 1 ) {
                    e.activeCarIds.splice( e.activeCarIds.indexOf( spriteId ), 1 )
                }
            });
        }
        delete this.spriteDictionary[spriteId];
        this.allSprites = [];
        Object.keys( this.spriteDictionary ).forEach ( ( e ) => {
            this.allSprites.push( this.spriteDictionary[e] )
        })
    }

    tileHasBlockingSprite( tileIndex ) {
        if ( tileIndex == globals.OUT_LEFT || tileIndex == globals.OUT_LEFT || tileIndex == globals.OUT_RIGHT || tileIndex == globals.OUT_DOWN ) {
            return false;
        }
        const tile = this.getTileAtIndex( tileIndex );
        let colliding = false;
        if ( tile == undefined ) {
            return false;
        }
        let allHitboxes = [];
        this.allSprites.forEach( ( sprite ) => {
            if ( sprite.hitbox != undefined && sprite.hitbox && !sprite.hasDoor ) {
                allHitboxes.push( sprite.hitbox );
            }
            else if ( sprite.hitboxGroups != undefined ) {
                sprite.hitboxGroups.forEach( ( group ) => {
                    group.hitboxes.forEach( ( hitbox ) => {
                        allHitboxes.push( hitbox )
                    })
                })
            }
        })

        let spriteIndex = 0;
        while( colliding == false && allHitboxes[spriteIndex] != undefined ) {
            let hitbox = allHitboxes[spriteIndex];
            colliding = hitbox.x > tile.x && hitbox.y > tile.y 
            && hitbox.x < tile.x + globals.GRID_BLOCK_PX && hitbox.y < tile.y + globals.GRID_BLOCK_PX 
            spriteIndex++
        }
        return colliding;
    }

    generateWalkingNPC( ) {
        let start = this.getValidSpawnStart( );
        let end = this.getValidSpawnDestination( start )
        this.generateRandomWalkingSprite( start, end )
    }

    getValidSpawnStart( ) {
        let validLocations = this.filterSpawnPoints( )
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    getValidSpawnDestination( startLocation = null, oldDestination = null ) {
        let validLocations = this.filterSpawnPoints( startLocation );
        if ( oldDestination ) {
            let tile = globals.GAME.getTileOnCanvasAtCell( "BACK", oldDestination.col, oldDestination.row )
            if (!( tile.isBlocked || this.tileHasBlockingSprite( tile.index )))
                return oldDestination
        }
        return validLocations[ Math.floor( Math.random( ) * validLocations.length ) ];
    }

    filterSpawnPoints( startLocation = null ) {
        return globals.GAME.activeMap.spawnPoints.filter( ( e) => {
            let tile = globals.GAME.getTileOnCanvasAtCell( "BACK", e.col, e.row )
            return !( tile.isBlocked || this.tileHasBlockingSprite( tile.index )) && startLocation != null ? e.direction != startLocation.direction : true
        })
    }

    generateRandomWalkingSprite( start, destination ) {
        let tile = this.getTileAtCell( start.col, start.row );
        let characters = globals.GAME.activeNeighbourhood.characters
        let characterData = {
            "sprite": characters[ Math.floor( Math.random( ) * characters.length ) ], 
            "direction": globals.FACING_RIGHT, "hasAction": true,
            "action": [
                {
                    "condition": {
                        "type": DEFAULT
                    },
                    "action": { 
                        "type": EVENT_TALK,
                        "sfx": "voice-1.mp3",
                        "scenes": [
                            { "type": SPEAK, "text": "This is a random text!" },
                            { "type": SPEAK, "text": "Omg so random..." }
                        ]
                    } 
                }                
            ]
        }
        const grid = { 
            'rows': this.grid.rows, 'cols': this.grid.cols,
            'tiles': globals.GAME.BACK.grid.array.filter((tile) => {
                return !globals.GAME.BACK.getTileAtIndex(tile.index).isBlocked && !this.tileHasBlockingSprite(tile.index);
            })
        };
        if ( tile.offScreen ) {
            grid.tiles.unshift(tile);
        }
        const destinationTile = this.getTileAtCell( destination.col,  destination.row);
        if ( destinationTile.offScreen ) {
            grid.tiles.push( destinationTile );
        }
        const indexList = pathFinder.determineShortestPath(tile, destinationTile, grid, false);
        if ( indexList ) {
            this.setCharacterSprite( tile, characterData )
            let sprite = this.spriteDictionary[tile.spriteId];
            sprite.setDestination( destination, true )
        }
    }
}

module.exports = { 
    ForegroundCanvas
}