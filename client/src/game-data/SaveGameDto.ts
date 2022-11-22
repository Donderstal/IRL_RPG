import type { InteractionAnswer } from "../enumerables/InteractionAnswer";
import type { Sprite } from "../game/core/Sprite";
import { getPlayer } from "../game/modules/sprites/spriteGetter";
import { getActiveMap } from "../game/neighbourhoodModule";
import { exportTriggerEventsRegistry } from "../game/storyEvents/storyEventGetter";
import { exportCollectableRegistry } from "../registries/collectableRegistry";
import { getUnlockedDoorsRegistry } from "../registries/doorRegistry";
import { getRegistry } from "../registries/interactionRegistry";

type MapDataModel = {
    mapName: string;
    sprites: any[];
    playerStart: { column: number; row: number; type: string };
}

type KeyLists = {
    storyEvents: string[];
    interactionRegistry: {[key: string]: InteractionAnswer};
    collectableRegistry: {coins: string[], juiceCans: string[]};
    unlockedDoors: string[]
}

export type SaveDto = {
    playerData: {};
    activeMap: MapDataModel;
    keyLists: KeyLists
}

export class SaveGameDto {
    playerData: {};
    activeMap: MapDataModel;
    keyLists: KeyLists;
    constructor( ) {
        this.playerData;
        this.activeMap;
        this.keyLists;
    }

    saveGameToDto( ): void {
        const save: SaveDto = {
            playerData: this.getPlayerDataFromGame( ),
            activeMap: this.getMapDataFromGame( ),
            keyLists: this.getKeyListsFromGame( )
        }
        console.log(save)
        this.exportSaveGameToJSON( save, "save_game")
    }

    getMapDataFromGame( ): MapDataModel {
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

    getKeyListsFromGame( ): KeyLists {
        return { 
            storyEvents: exportTriggerEventsRegistry(),
            interactionRegistry: getRegistry( ),
            collectableRegistry: exportCollectableRegistry(),
            unlockedDoors: getUnlockedDoorsRegistry( )
        }
    }

    getPlayerDataFromGame( ): {} {
        return { }
    }
    
    exportSaveGameToJSON( object, name ): void {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", name + Date.now().toString() + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}