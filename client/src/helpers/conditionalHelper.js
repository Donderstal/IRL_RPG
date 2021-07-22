const { 
    LEVEL_OVER, LEVEL_UNDER, CHAPTER_BEFORE, CHAPTER_IN, CHAPTER_AFTER, 
    ITEM_OWNED, ITEM_NOT_OWNED, EVENT_HAS_FIRED, EVENT_RESPONSE_YES, EVENT_RESPONSE_NO, DEFAULT
} = require('../game-data/conditionGlobals')

const globals = require('../game-data/globals')

const conditionIsTrue = ( conditionType, valueToCheck ) => {
    let returnBoolean = false; 

    switch ( conditionType ) {
      case LEVEL_UNDER:
        returnBoolean = globals.GAME.party.Level < valueToCheck;
        break;
      case LEVEL_OVER:
        returnBoolean = globals.GAME.party.Level > valueToCheck;
        break;
      case CHAPTER_BEFORE:
        break;
      case CHAPTER_IN:
        returnBoolean = valueToCheck == globals.GAME.currentChapter.id;
        break;
      case CHAPTER_AFTER:
        break;
      case ITEM_OWNED:
        returnBoolean = globals.GAME.PLAYER_INVENTORY.getItemStackById( valueToCheck ) != undefined;
        break;
      case ITEM_NOT_OWNED:
        returnBoolean = !globals.GAME.PLAYER_INVENTORY.getItemStackById( valueToCheck ) == undefined;
        break;
      case EVENT_HAS_FIRED:
        break;
      case EVENT_RESPONSE_YES:
        break;
      case EVENT_RESPONSE_NO:
        break;
      case DEFAULT:
        returnBoolean = true;
        break;
    }

    return returnBoolean;
}

module.exports = {
    conditionIsTrue
}