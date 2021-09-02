const globals = require('../game-data/globals');
const { MapObject } = require('../game/map/map-classes/MapObject');
const { NPC } = require('../game/map/map-classes/NPC');
const { getRegistry } = require('./interactionRegistry');

class SaveGameModel {
    constructor( ) {
        this.activeStorySceneIndex;
        this.characterSprites   = [];
        this.objectSprites      = [];

        this.playerParty        = {};
        this.interactionRegistry= {};
        this.playerSprite       = {};

        this.activeMapName      = ""
        this.savepoint          = false;
    }

    setSaveGameToModel( savegame ) {
        this.playerSprite           = savegame.playerSprite;
        this.playerParty            = savegame.playerParty;
        this.interactionRegistry    = savegame.interactionRegistry;
        this.activeStorySceneIndex  = savegame.activeStorySceneIndex;

        this.characterSprites   = savegame.characterSprites;
        this.objectSprites      = savegame.objectSprites;
        this.activeMapName      = savegame.activeMapName
    }
    
    setGameInstanceToModel( ) {
        const GAME = globals.GAME

        this.playerSprite           = this.getCharacterObjectFromSprite( GAME.PLAYER );
        this.playerParty            = this.getPartyData(GAME);
        this.interactionRegistry    = getRegistry( );
        this.activeStorySceneIndex  = GAME.story.activeSceneIndex;

        this.setMapCharactersToModel( GAME );
        this.setMapObjectsToModel( GAME );
        this.activeMapName      = GAME.activeMapName
    }

    setMapCharactersToModel(GAME) {
        let sprites = GAME.FRONT.allSprites.filter( ( e ) => { return e instanceof NPC });
        sprites.forEach( ( e ) => {
            this.characterSprites.push( this.getCharacterObjectFromSprite( e ) );               
        });
    }

    getCharacterObjectFromSprite( sprite ) {
        return {
            "anim_type": sprite.animationType,
            "sprite": sprite.sheetSrc.split('/')[sprite.sheetSrc.split('/').length - 1],
            "direction": sprite.direction,
            "name": sprite.name,
            "x": sprite.x,
            "y": sprite.y,
            "action": sprite.action
        }
    }

    setMapObjectsToModel(GAME) {
        let objects = GAME.FRONT.allSprites.filter( ( e ) => { return e instanceof MapObject });
        objects.forEach( ( e ) => {
            this.objectSprites.push( {
                "sprite": e.sheetSrc.split('/')[e.sheetSrc.split('/').length - 1],
                "x": e.x,
                "y": e.y,
                "hasAction": e.hasAction,
                "action": e.action
            } );               
        });
    }

    getPartyData(GAME) {
        const party = GAME.party
        return {
            "activeMemberIndex":party.memberActiveOnMapIndex,
            "itemStackList":    party.inventory.ItemList.reduce( ( acc, cur ) => {
                return [ 
                    ...acc, 
                    { 
                        "itemTypeId": cur.ItemTypeId,
                        "baseQuantity": cur.BaseQuantity,
                        "equippedQuantity": cur.EquippedQuantity,
                    }
                ]
            }, [ ]),
            "money":            party.inventory.Money,
            "members":          party.members.reduce( ( acc, cur ) => {
                return [ 
                    ...acc, {
                        "name": cur.Name,
                        "className": cur.ClassName,
                        "level": cur.Level,
                        "attributes": cur.Attributes.list,
                        "statusEffects": cur.StatusEffects,
                        "moves": cur.Moves,
                        "equipment": cur.Equipment                 
                    }
                ]
            }, [ ])
        }
    }
}

const saveGame = ( ) => { 
    const SaveGame = new SaveGameModel( );
    SaveGame.setGameInstanceToModel( );
    console.log(SaveGame);
    console.log(JSON.stringify(SaveGame))
    makeSaveFile( SaveGame ) 
}

const makeSaveFile = ( SaveGame ) => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SaveGame));

    var dlAnchorElem = document.createElement("a")
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "save_game.json");
    dlAnchorElem.click();
}

const loadGame = ( ) => {

}

module.exports = {
    saveGame,
    loadGame
}