const FAT_FEDORA_GUY = "FAT FEDORA GUY";
const TOUGH_GUY = "TOUGH GUY";
const SUNGLASSES_LADY = "SUNGLASSES LADY";
const GRANNY = "GRANNY";
const TOUGH_GUY_WITH_COOL_HAIR = "TOUGH GUY WITH COOL HAIR";
const PIGEON = "PIGEON";
const BUSINESS_MAN = "BUSINESS MAN";
const STRONG_GUY = "STRONG GUY";
const BURLY_GUY = "BURLY GUY";
const GREEN_SHIRTED_STRONG_GUY = "GREEN SHIRTED STRONG GUY";
const DORKY_GUY = "DORKY GUY";
const TOUGH_GUY_WITH_DARK_HAIR = "TOUGH GUY WITH DARK HAIR";
const TOUGH_GUY_WITH_COOL_SHIRT = "TOUGH GUY WITH COOL SHIRT";
const FAT_BUFF_GUY = "FAT BUFF GUY";
const BALD_BEER_BELLY_GUY = "BALD BEER BELLY GUY";
const BLONDE_BEER_BELLY_GUY = "BLONDE BEER BELLY GUY";
const PINK_HAIRED_FAT_GUY = "PINK HAIRED FAT GUY";
const YELLOW_SHIRT_LADY = "YELLOW SHIRT LADY";
const GREEN_HAIR_LADY = "GREEN HAIR LADY";
const SUPERMARKET_MANAGER = "SUPERMARKET MANAGER";
const MONKEY_CEO = "MONKEY CEO";
const WHITE_PONY_TAIL_LADY = "WHITE PONY TAIL LADY";
const BLACK_PONY_TAIL_LADY = "BLACK PONY TAIL LADY";
const ROBOT = "ROBOT";
const PINK_HAIR_NERD_LADY = "PINK HAIR NERD LADY";
const BLONDE_NERD_LADY = "BLONDE NERD LADY";
const DARK_HAIR_NERD_LADY = "DARK HAIR NERD LADY";

const getClassProfile = ( className ) => {
    return "HACKER"
};
const getClassSprite = ( className, getBattleSprite = false ) => {
    const spriteFolder = '/static/sprites/';
    let spriteSrc = "";

    switch ( className ) {
        case FAT_FEDORA_GUY:
            spriteSrc = 'neckbeard';
            break;
        case TOUGH_GUY: 
            spriteSrc = 'chad';
            break;
        case SUNGLASSES_LADY: 
            spriteSrc = 'woman';
            break;
        case GRANNY: 
            spriteSrc = 'characterx3';
            break;
        case TOUGH_GUY_WITH_COOL_SHIRT: 
            spriteSrc = 'characterx5';
            break;
        case PIGEON: 
            spriteSrc = 'pigeon';
            break;
        case BUSINESS_MAN:
            spriteSrc = 'business_man';
            break;
        case STRONG_GUY:
            spriteSrc = 'chad_recolour01';
            break;
        case BURLY_GUY:
            spriteSrc = 'chad_recolour02';
            break;
        case GREEN_SHIRTED_STRONG_GUY:
            spriteSrc = 'chad_recolour03';
            break;
        case DORKY_GUY:
            spriteSrc = 'character_x1_recolour01';
            break;
        case TOUGH_GUY_WITH_DARK_HAIR:
            spriteSrc = 'character_x4';
            break;
        case TOUGH_GUY_WITH_COOL_SHIRT:
            spriteSrc = 'character_x5_recolour';
            break;
        case FAT_BUFF_GUY:
            spriteSrc = 'fats';
            break;
        case BALD_BEER_BELLY_GUY:
            spriteSrc = 'generic_balding_guy';
            break;
        case BLONDE_BEER_BELLY_GUY:
            spriteSrc = 'generic_blonde_guy';
            break;
        case PINK_HAIRED_FAT_GUY:
            spriteSrc = 'fats_recolour';
            break;
        case YELLOW_SHIRT_LADY:
            spriteSrc = 'new_girl';
            break;
        case GREEN_HAIR_LADY:
            spriteSrc = 'new_girl_recolour';
            break;
        case SUPERMARKET_MANAGER:
            spriteSrc = 'manager';
            break;
        case MONKEY_CEO:
            spriteSrc = 'monkey_ceo';
            break;
        case WHITE_PONY_TAIL_LADY:
            spriteSrc = 'pony_tail';
            break;
        case BLACK_PONY_TAIL_LADY:
            spriteSrc = 'pony_tail_recolour';
            break;
        case ROBOT:
            spriteSrc = 'robot';
            break;
        case PINK_HAIR_NERD_LADY:
            spriteSrc = 'tumbler_girl';
            break;
        case BLONDE_NERD_LADY:
            spriteSrc = 'tumbler_girl_recolour01';
            break;
        case DARK_HAIR_NERD_LADY:
            spriteSrc = 'tumbler_girl_recolour02';
            break;
    }

    return spriteFolder + spriteSrc + ( getBattleSprite ? "_fight" : "") + '.png'; 
};
module.exports = {
    getClassProfile,
    getClassSprite,

    // classes
    FAT_FEDORA_GUY,
    TOUGH_GUY,
    SUNGLASSES_LADY,
    GRANNY,
    TOUGH_GUY_WITH_COOL_SHIRT,
    PIGEON,
    BUSINESS_MAN,
    STRONG_GUY,
    BURLY_GUY,
    GREEN_SHIRTED_STRONG_GUY,
    DORKY_GUY,
    TOUGH_GUY_WITH_DARK_HAIR, 
    TOUGH_GUY_WITH_COOL_SHIRT,
    FAT_BUFF_GUY,
    BALD_BEER_BELLY_GUY,
    BLONDE_BEER_BELLY_GUY,
    PINK_HAIRED_FAT_GUY,
    YELLOW_SHIRT_LADY, 
    GREEN_HAIR_LADY,
    SUPERMARKET_MANAGER,
    MONKEY_CEO,
    WHITE_PONY_TAIL_LADY,
    BLACK_PONY_TAIL_LADY,
    ROBOT,
    PINK_HAIR_NERD_LADY,
    BLONDE_NERD_LADY,
    DARK_HAIR_NERD_LADY
}

