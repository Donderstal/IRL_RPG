import type { Sprite } from "../game/core/Sprite";
import { getPlayer } from "../game/modules/sprites/spriteGetter";
import { getActiveMap } from "../game/neighbourhoodModule";
import { exportTriggerEventsRegistry } from "../game/storyEvents/storyEventGetter";
import type { SaveGame, SaveGameKeyLists, SaveGameMapData, SaveGamePlayerData } from "../models/SaveGameModel";
import { exportCollectableRegistry } from "../registries/collectableRegistry";
import { getUnlockedDoorsRegistry } from "../registries/doorRegistry";
import { getRegistry } from "../registries/interactionRegistry";

export const saveGameToServer = (): void => {
    const saveGame = getSaveGame();
    console.log( saveGame );
    postSaveGame(saveGame, "post-game")
}

const getSaveGame = (): SaveGame => {
    const saveGame: SaveGame = {
        time: new Date().toString(),
        playerData: getPlayerDataFromGame(),
        activeMap: getMapDataFromGame(),
        keyLists: getKeyListsFromGame()
    }
    return saveGame;
}

const getMapDataFromGame = (): SaveGameMapData => {
    const playerSprite: Sprite = getPlayer();
    return {
        mapName: getActiveMap().key,
        sprites: [],
        playerStart: {
            column: playerSprite.column,
            row: playerSprite.row,
            type: playerSprite.model.key
        }
    }
}

const getKeyListsFromGame = (): SaveGameKeyLists => {
    return {
        storyEvents: exportTriggerEventsRegistry(),
        interactionRegistry: getRegistry(),
        collectableRegistry: exportCollectableRegistry(),
        unlockedDoors: getUnlockedDoorsRegistry()
    }
}

const getPlayerDataFromGame = (): SaveGamePlayerData => {
    return {
        name: "Test"
    };
}

const postSaveGame = ( saveGame: SaveGame, name: string ): void => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify( saveGame ) );
    var downloadAnchorNode = document.createElement( 'a' );
    downloadAnchorNode.setAttribute( "href", dataStr );
    downloadAnchorNode.setAttribute( "download", name + Date.now().toString() + ".json" );
    document.body.appendChild( downloadAnchorNode );
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}