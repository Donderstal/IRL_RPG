const { getRegistry } = require("../helpers/interactionRegistry");

class SaveGameDto {
    constructor( ) {
        this.playerData;
        this.activeMap;
        this.keyLists;
    }

    saveGameToDto( GAME ) {
        const save = {
            'playerData': this.getPlayerDataFromGame( GAME ),
            'activeMap': this.getMapDataFromGame( GAME ),
            'keyLists': this.getKeyListsFromGame( GAME )
        }
        console.log(save)
        this.exportSaveGameToJSON( save, "save_game")
    }

    getMapDataFromGame( GAME ) {
        const frontCanvasSprites = GAME.FRONT.allSprites;
        const playerSprite = GAME.PLAYER;
        return { 
            'mapName': GAME.activeMapName,
            'characters': frontCanvasSprites.filter(e => e.type == 'character').map(e => e.spriteData),
            'mapObjects': frontCanvasSprites.filter(e => e.type == 'object').map(e => e.spriteData), 
            'playerStart': {
                'col': playerSprite.col,
                'row': playerSprite.row,
                'playerClass': playerSprite.class
            }
        }
    }

    getKeyListsFromGame( GAME ) {
        return { 
            'storyEvents': GAME.story.triggeredEvents,
            'interactionRegistry': getRegistry( ),
            'collectableRegistry': GAME.collectableRegistry.exportRegistry( )
        }
    }

    getPlayerDataFromGame( GAME ) {
        return { }
    }
    
    exportSaveGameToJSON( object, name ) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", name + Date.now().toString() + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    loadJSONToDto( JSON ) {

    }
}

module.exports = {
    SaveGameDto
}