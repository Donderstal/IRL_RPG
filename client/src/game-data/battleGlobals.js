const { STRD_SPRITE_HEIGHT, STRD_SPRITE_WIDTH } = require('./globals') 

const BATTLE_SPRITE_WIDTH   = STRD_SPRITE_WIDTH * 3
const BATTLE_SPRITE_HEIGHT  = STRD_SPRITE_HEIGHT * 3

const LEFT_BATTLE_POSITION_1    = { 'column': 4, 'row': 7 };
const LEFT_BATTLE_POSITION_2    = { 'column': 6, 'row': 9 };
const LEFT_BATTLE_POSITION_3    = { 'column': 4, 'row': 11 };

const RIGHT_BATTLE_POSITION_1   = { 'column': 20, 'row': 7 };
const RIGHT_BATTLE_POSITION_2    = { 'column': 18, 'row': 9 };
const RIGHT_BATTLE_POSITION_3    = { 'column': 20, 'row': 11 };

const SHEET_ROW_BATTLE_LEFT         = 4
const SHEET_ROW_BATTLE_RIGHT        = 5

module.exports = {
    BATTLE_SPRITE_WIDTH,
    BATTLE_SPRITE_HEIGHT,

    LEFT_BATTLE_POSITION_1,
    LEFT_BATTLE_POSITION_2,
    LEFT_BATTLE_POSITION_3,

    RIGHT_BATTLE_POSITION_1,
    RIGHT_BATTLE_POSITION_2,
    RIGHT_BATTLE_POSITION_3,
    
    SHEET_ROW_BATTLE_LEFT,
    SHEET_ROW_BATTLE_RIGHT
}