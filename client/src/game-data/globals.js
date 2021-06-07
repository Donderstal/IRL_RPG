
const getBasePixelBlockSize = ( ) => {
    let blockSize = Math.floor(window.innerHeight / CANVAS_ROWS)
    if ( blockSize > GRID_BLOCK_IN_SHEET_PX ) {
        blockSize = GRID_BLOCK_IN_SHEET_PX;
    } 
    return blockSize;
}

// for use in movement animation
// first row of a spritesheet will always face down
// second row is always left etc...
const FACING_DOWN                   = 0
const FACING_LEFT                   = 1
const FACING_RIGHT                  = 2
const FACING_UP                     = 3

const FACING_DOWN_FLYING            = 7
const FACING_LEFT_FLYING            = 4
const FACING_RIGHT_FLYING           = 5
const FACING_UP_FLYING              = 6

//
const SHEET_COLUMN_ONE          = 0
const SHEET_COLUMN_TWO          = 1
const SHEET_COLUMN_THREE        = 2
const SHEET_COLUMN_FOUR         = 3

// 'enum' values for NPC sprite animation availability
const NPC_ANIM_TYPE_IDLE            = "IDLE";
const NPC_ANIM_TYPE_SEMI_IDLE       = "SEMI-IDLE";
const NPC_ANIM_TYPE_MOVING          = "MOVING";
const NPC_ANIM_TYPE_MOVING_IN_LOOP  = "MOVING_IN_LOOP";
const NPC_ANIM_TYPE_ANIMATION_LOOP  = "ANIMATION_LOOP";

// 'enum' to handle different movement anims in I_Sprite.drawSprite();
const NPC_MOVE_TYPE_WALKING         = "WALKING";
const NPC_MOVE_TYPE_FLYING          = "FLYING";

// animation frame limit
const FRAME_LIMIT                   = 8
const FRAMES_PER_SECOND             = 60

// dynamic measurements for canvas
const GRID_BLOCK_IN_SHEET_PX        = 64
const CANVAS_COLUMNS                = 24
const CANVAS_ROWS                   = 16
const GRID_BLOCK_PX                 = getBasePixelBlockSize()
const MOVEMENT_SPEED                = GRID_BLOCK_PX / ( 60 / 8 )
const CANVAS_WIDTH                  = GRID_BLOCK_PX * (CANVAS_COLUMNS)
const CANVAS_HEIGHT                 = GRID_BLOCK_PX * (CANVAS_ROWS) 

// sheet dimensions
const MAP_SPRITE_WIDTH_IN_SHEET     = 64
const MAP_SPRITE_HEIGHT_IN_SHEET    = 112
// sprite dimensions
const STRD_SPRITE_WIDTH             = GRID_BLOCK_PX
const STRD_SPRITE_HEIGHT            = STRD_SPRITE_WIDTH * 1.75

// speech bubbles 
const MIN_BUBBLE_WIDTH              = GRID_BLOCK_PX * 5
const MAX_BUBBLE_WIDTH              = GRID_BLOCK_PX * 8

// canvas font sizes
const SMALL_FONT_SIZE               = GRID_BLOCK_PX / 4.5
const LARGE_FONT_SIZE               = GRID_BLOCK_PX / 3.375
const BATTLE_FONT_SIZE              = GRID_BLOCK_PX / 2

// in-game textbox color and opacity
const INNER_TEXTBOX_RGBA            = "rgb(0, 56, 77)";
const OUTER_TEXTBOX_RGBA            = "rgba(216, 44, 188, 0.66)";

// apparently this is the golden ratio
const GOLDEN_FONT_RATIO             = 1.618;
const SMALL_FONT_LINE_HEIGHT        = SMALL_FONT_SIZE * GOLDEN_FONT_RATIO
const LARGE_FONT_LINE_HEIGHT        = LARGE_FONT_SIZE * GOLDEN_FONT_RATIO
const BATTLE_FONT_LINE_HEIGHT       = BATTLE_FONT_SIZE * GOLDEN_FONT_RATIO

// game Class holder and mode strings
let GAME = {};
const BATTLE_MODE = "BATTLE";
const MAP_MODE = "MAP";

// Item categories
const ITEM_CATEGORY_WEAPON = "W";
const ITEM_CATEGORY_CONSUMABLE = "C";
const ITEM_CATEGORY_ARMOR = "A";
const ITEM_CATEGORY_MISC = "M";

const ARMOR_TYPE_HEAD = "H";
const ARMOR_TYPE_UPPER_BODY = "U"; 
const ARMOR_TYPE_LOWER_BODY = "L"; 
const ARMOR_TYPE_ACCESSORY = "A";

// Attribute name constants
const ATT_HEALTH_POINTS = "HP";
const ATT_POWER_POINTS = "PP";
const ATT_PH_ATTACK = "PH_ATTACK";
const ATT_PH_DEFENSE = "PH_DEFENSE";
const ATT_SP_ATTACK = "SP_ATTACK";
const ATT_SP_DEFENSE = "SP_DEFENSE";
const ATT_SPEED = "SPEED";
const ATT_LUCK = "LUCK";

// Attribute modifier type names
const MODI_VERY_LOW = "VL";
const MODI_LOW = "L";
const MODI_STANDARD = "S";
const MODI_HIGH = "H";
const MODI_VERY_HIGH = "VH";

const EFFECT_TYPE_BUFF  = "BU"
const EFFECT_TYPE_DEBUFF= "DB"

const EQUIPMENT_KEY_WEAPON      = "Weapon";
const EQUIPMENT_KEY_HEAD        = "Head";
const EQUIPMENT_KEY_UPPERBODY   = "Upper Body";
const EQUIPMENT_KEY_LOWERBODY   = "Lower Body";
const EQUIPMENT_KEY_ACCESSORY   = "Accessory";

const ATTRIBUTE_MENU_TEXTS = {
    [ATT_HEALTH_POINTS]: "HP: ",
    [ATT_POWER_POINTS]: "PP: ",
    [ATT_PH_ATTACK]: "PHYSICAL ATTACK:",
    [ATT_PH_DEFENSE]: "PHYSICAL DEFENSE:",
    [ATT_SP_ATTACK]: "SPECIAL ATTACK:",
    [ATT_SP_DEFENSE]: "SPECIAL DEFENSE:",
    [ATT_SPEED]: "SPEED:",
    [ATT_LUCK]: "LUCK:"
}

const ATTRIBUTE_LIST = [
    ATT_HEALTH_POINTS, ATT_POWER_POINTS , ATT_PH_ATTACK, ATT_PH_DEFENSE, 
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK 
]

const EQUIPMENT_SLOTS_LIST = [
    EQUIPMENT_KEY_WEAPON, EQUIPMENT_KEY_HEAD, EQUIPMENT_KEY_ACCESSORY, 
    EQUIPMENT_KEY_UPPERBODY, EQUIPMENT_KEY_LOWERBODY 
]

///
const TEST_CLASSNAME_1 = "FAT FEDORA GUY";
const TEST_CLASSNAME_2 = "TOUGH GUY";
const TEST_CLASSNAME_3 = "SUNGLASSES LADY";
const TEST_CLASSNAME_4 = "GRANNY";
const TEST_CLASSNAME_5 = "TOUGH GUY WITH COOL HAIR";
const TEST_CLASSNAME_6 = "PIGEON";
const TEST_CLASSNAME_7 = "BUSINESS MAN";
const TEST_CLASSNAME_8 = "STRONG GUY";
const TEST_CLASSNAME_9 = "BURLY GUY";
const TEST_CLASSNAME_10 = "GREEN SHIRTED STRONG GUY";
const TEST_CLASSNAME_11 = "DORKY GUY";
const TEST_CLASSNAME_12 = "TOUGH GUY WITH DARK HAIR";
const TEST_CLASSNAME_13 = "TOUGH GUY WITH COOL SHIRT";
const TEST_CLASSNAME_14 = "FAT BUFF GUY";
const TEST_CLASSNAME_15 = "BALD BEER BELLY GUY";
const TEST_CLASSNAME_16 = "BLONDE BEER BELLY GUY";
///
const TEST_CLASSPROFILE_1 = "PHYSICAL_FOCUS";
const TEST_CLASSPROFILE_2 = "AVERAGE_SPEED_FOCUS";
const TEST_CLASSPROFILE_3 = "DEFENSE_FOCUS";
const TEST_CLASSPROFILE_4 = "SP_AND_LUCK_FOCUS";
///

const setSheetXyValues = ( tilesInSheet ) => {
    let tileX = 0; let tileY = 0;
    let tilesheetXyValues = []

    for ( var i = 0; i <= tilesInSheet; i++ ) {
        tilesheetXyValues.push( { 'x': tileX, 'y': tileY } )
        tileX += GRID_BLOCK_IN_SHEET_PX
        if ( i % 4 == 3 ) {
            tileX = 0
            tileY += GRID_BLOCK_IN_SHEET_PX
        }
    }

    return tilesheetXyValues;
}

const SHEET_XY_VALUES = setSheetXyValues( 10000 );


module.exports = {
    MOVEMENT_SPEED,

    FACING_DOWN,
    FACING_LEFT,
    FACING_RIGHT,
    FACING_UP,

    FACING_DOWN_FLYING,
    FACING_LEFT_FLYING,
    FACING_RIGHT_FLYING,
    FACING_UP_FLYING,

    SHEET_COLUMN_ONE,
    SHEET_COLUMN_TWO,
    SHEET_COLUMN_THREE,
    SHEET_COLUMN_FOUR,

    NPC_ANIM_TYPE_IDLE,
    NPC_ANIM_TYPE_SEMI_IDLE,
    NPC_ANIM_TYPE_MOVING,
    NPC_ANIM_TYPE_MOVING_IN_LOOP,
    NPC_ANIM_TYPE_ANIMATION_LOOP,

    NPC_MOVE_TYPE_WALKING,
    NPC_MOVE_TYPE_FLYING,


    FRAME_LIMIT,
    FRAMES_PER_SECOND,

    GRID_BLOCK_PX,
    GRID_BLOCK_IN_SHEET_PX,

    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    CANVAS_COLUMNS,
    CANVAS_ROWS,

    MAP_SPRITE_WIDTH_IN_SHEET,
    MAP_SPRITE_HEIGHT_IN_SHEET,
    SHEET_XY_VALUES,

    STRD_SPRITE_WIDTH,
    STRD_SPRITE_HEIGHT,

    MIN_BUBBLE_WIDTH,
    MAX_BUBBLE_WIDTH,

    SMALL_FONT_SIZE,
    LARGE_FONT_SIZE,
    BATTLE_FONT_SIZE,

    INNER_TEXTBOX_RGBA,
    OUTER_TEXTBOX_RGBA,

    SMALL_FONT_LINE_HEIGHT,
    LARGE_FONT_LINE_HEIGHT,
    BATTLE_FONT_LINE_HEIGHT,

    BATTLE_MODE,
    MAP_MODE,
    GAME,

    ITEM_CATEGORY_WEAPON,
    ITEM_CATEGORY_CONSUMABLE,
    ITEM_CATEGORY_ARMOR,
    ITEM_CATEGORY_MISC,

    ARMOR_TYPE_HEAD, 
    ARMOR_TYPE_UPPER_BODY, 
    ARMOR_TYPE_LOWER_BODY, 
    ARMOR_TYPE_ACCESSORY,

    ATT_HEALTH_POINTS,
    ATT_POWER_POINTS,
    ATT_PH_ATTACK,
    ATT_PH_DEFENSE,
    ATT_SP_ATTACK,
    ATT_SP_DEFENSE,
    ATT_SPEED,
    ATT_LUCK,

    MODI_VERY_LOW, 
    MODI_LOW, 
    MODI_STANDARD, 
    MODI_HIGH, 
    MODI_VERY_HIGH,

    EFFECT_TYPE_BUFF,
    EFFECT_TYPE_DEBUFF,

    EQUIPMENT_KEY_WEAPON,
    EQUIPMENT_KEY_HEAD,
    EQUIPMENT_KEY_UPPERBODY,
    EQUIPMENT_KEY_LOWERBODY,
    EQUIPMENT_KEY_ACCESSORY,

    ATTRIBUTE_MENU_TEXTS,
    ATTRIBUTE_LIST,
    EQUIPMENT_SLOTS_LIST,

    TEST_CLASSNAME_1,
    TEST_CLASSNAME_2,
    TEST_CLASSNAME_3,
    TEST_CLASSNAME_4,
    TEST_CLASSNAME_5,
    TEST_CLASSNAME_6,
    TEST_CLASSNAME_7,
    TEST_CLASSNAME_8,
    TEST_CLASSNAME_9,
    TEST_CLASSNAME_10,
    TEST_CLASSNAME_11,
    TEST_CLASSNAME_12, 
    TEST_CLASSNAME_13,
    TEST_CLASSNAME_14,
    TEST_CLASSNAME_15,
    TEST_CLASSNAME_16,

    TEST_CLASSPROFILE_1,
    TEST_CLASSPROFILE_2,
    TEST_CLASSPROFILE_3,
    TEST_CLASSPROFILE_4
}