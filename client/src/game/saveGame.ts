import { getPlayer } from "../game/modules/sprites/spriteGetter";
import { getActiveMap } from "../game/neighbourhoodModule";
import type { MapModel } from "../models/MapModel";
import type { SaveGame, SaveGameKeyLists, SaveGameMapData, SaveGamePlayerData } from "../models/SaveGameModel";
import { exportCollectableRegistry } from "../registries/collectableRegistry";
import { getUnlockedDoorsRegistry } from "../registries/doorRegistry";
import { getRegistry } from "../registries/interactionRegistry";

export const saveGameToServer = ( index: number ): {[key in string]: any} => {
    const saveGame = getSaveGame();
    console.log( saveGame );
    return {
        'index': index,
        'body': JSON.stringify( saveGame )
    };
}

const getSaveGame = (): SaveGame => {
    const map = getActiveMap();
    const saveGame: SaveGame = {
        time: new Date().toLocaleString(),
        playerData: getPlayerDataFromGame(),
        activeMap: getMapDataFromGame( map ),
        keyLists: getKeyListsFromGame()
    }
    return saveGame;
}

const getMapDataFromGame = ( map: MapModel ): SaveGameMapData => {
    return {
        mapName: map.key,
        location: map.location
    }
}

const getKeyListsFromGame = (): SaveGameKeyLists => {
    return {
        interactionRegistry: getRegistry(),
        collectableRegistry: exportCollectableRegistry(),
        unlockedDoors: getUnlockedDoorsRegistry()
    }
}

const getPlayerDataFromGame = (): SaveGamePlayerData => {
    return {
        name: getPlayer().name
    };
}