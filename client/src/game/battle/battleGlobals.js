const globals   = require('../../game-data/globals');

const UISlotY           = globals.CANVAS_HEIGHT - globals.BATTLE_UI_CHAR_HEIGHT;
const UISlotXValues     = [
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 4 ),
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 3 ),
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 2 ),
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 1 ) 
];

module.exports = {
    UISlotY,
    UISlotXValues
}