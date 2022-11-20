import type { InteractionAnswer } from "../enumerables/InteractionAnswer";
import type { Sprite } from "../game/core/Sprite";
import { getActiveMap } from "../game/neighbourhoodModule";
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

    saveGameToDto( GAME ): void {
        const save: SaveDto = {
            playerData: this.getPlayerDataFromGame( GAME ),
            activeMap: this.getMapDataFromGame( GAME ),
            keyLists: this.getKeyListsFromGame( GAME )
        }
        console.log(save)
        this.exportSaveGameToJSON( save, "save_game")
    }

    getMapDataFromGame( GAME ): MapDataModel {
        const playerSprite: Sprite = GAME.PLAYER;
        return { 
            mapName: getActiveMap().key,
            sprites: [],//GAME.FRONT.allSprites.filter(e => e.type == 'character').map(e => e.spriteData),
            playerStart: {
                column: playerSprite.column,
                row: playerSprite.row,
                type: playerSprite.model.key
            }
        }
    }

    getKeyListsFromGame( GAME ): KeyLists {
        return { 
            storyEvents: GAME.story.triggeredEvents,
            interactionRegistry: getRegistry( ),
            collectableRegistry: GAME.collectableRegistry.exportRegistry( ),
            unlockedDoors: getUnlockedDoorsRegistry( )
        }
    }

    getPlayerDataFromGame( GAME ): {} {
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