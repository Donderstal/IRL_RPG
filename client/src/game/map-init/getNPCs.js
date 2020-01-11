const state         = require('../../game-data/state');
const GamePiece     = require('./initGamePiece')
const globals       = require('../../game-data/globals');
const mapHelpers    = require('../../helpers/mapHelpers');
const canvasHelpers = require('../../helpers/canvasHelpers');

const generateCharacters = ( currentMap ) => {
    const characters = currentMap.mapData.characters
    if ( characters ) {
        characters.forEach( ( character ) => {
            pushCharacterActions( character, currentMap );
            const sprite = new GamePiece.gamePiece( character.row, character.col, '/static/sprites/'+ character.sprite )
            sprite.direction = globals[character.direction]

            sprite.drawSprite()
            character.sprite = sprite
            pushCharacterSpriteToMapState( character, currentMap )
            sprite.calcXyFromCell( )
            currentMap.blockedXyValues.push( { 
                "BOTTOM": sprite.y + (globals.GRID_BLOCK_PX * 1.25),
                "LEFT": sprite.x,
                "RIGHT": sprite.x + globals.GRID_BLOCK_PX,
                "TOP": sprite.y + (globals.GRID_BLOCK_PX * .5 )
            })                
        })
    }
}

const pushCharacterActions = ( character, currentMap ) => {
    if ( character.action ) {
        let action = { 
            "row": character.row, 
            "col": character.col,
            ...character.action
        }
        
        if ( currentMap.mapData.actions ) {
            currentMap.mapData.actions.push(action)
        }  
        else {
            currentMap.mapData.actions = [ action ]   
        }      
    }
}

const pushCharacterSpriteToMapState = ( character, currentMap ) => {
    if ( currentMap.mapData.NPCs ) {
        currentMap.mapData.NPCs.push( character  )        
    }
    else {
       currentMap.mapData.NPCs = [ character ]
    }
}

module.exports = {
    generateCharacters
}