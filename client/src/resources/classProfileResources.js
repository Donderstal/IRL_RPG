const globals = require('../game-data/globals');

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

const spriteFolder = '/static/sprites/';

class ClassProfile {
    constructor( className, spritePng, speakingSound, skill = false ) {
        this.className  = className;
        this.png        = globals.PNG_DICTIONARY[spriteFolder + spritePng];
        this.sfx        = speakingSound;
        this.skill      = skill
    }
}

const getProfileName = ( pngName ) => {
    switch( pngName ) {
        case "neckbeard.png":
            return FAT_FEDORA_GUY;
        case 'chad.png': 
            return TOUGH_GUY;
        case 'woman.png': 
            return SUNGLASSES_LADY;
        case 'characterx3.png': 
            return GRANNY;
        case 'characterx5.png': 
            return TOUGH_GUY_WITH_COOL_HAIR;
        case 'pigeon.png': 
            return PIGEON;
        case 'business_man.png':
            return BUSINESS_MAN;
        case 'chad_recolour01.png':
            return STRONG_GUY;
        case 'chad_recolour02.png':
            return BURLY_GUY;
        case 'chad_recolour03.png':
            return GREEN_SHIRTED_STRONG_GUY;
        case 'character_x1_recolour01.png':
            return DORKY_GUY;
        case 'character_x4.png':
            return TOUGH_GUY_WITH_DARK_HAIR;
        case 'character_x5_recolour.png':
            return TOUGH_GUY_WITH_COOL_SHIRT;
        case 'fats.png':
            return FAT_BUFF_GUY;
        case 'generic_balding_guy.png':
            return BALD_BEER_BELLY_GUY;
        case 'generic_blonde_guy.png':
            return BLONDE_BEER_BELLY_GUY;
        case 'fats_recolour.png':
            return PINK_HAIRED_FAT_GUY;
        case 'new_girl.png':
            return YELLOW_SHIRT_LADY;
        case 'new_girl_recolour.png':
            return GREEN_HAIR_LADY;
        case 'manager.png':
            return SUPERMARKET_MANAGER;
        case 'monkey_ceo.png':
            return MONKEY_CEO;
        case 'pony_tail.png':
            return WHITE_PONY_TAIL_LADY;
        case 'pony_tail_recolour.png':
            return BLACK_PONY_TAIL_LADY;
        case 'robot.png':
            return ROBOT;
        case 'tumbler_girl.png':
            return PINK_HAIR_NERD_LADY;
        case 'tumbler_girl_recolour01.png':
            return BLONDE_NERD_LADY;
        case 'tumbler_girl_recolour02.png':
            return DARK_HAIR_NERD_LADY;
    }
}

const getClassProfile = ( className ) => {
    switch ( className ) {
        case FAT_FEDORA_GUY:
            return new ClassProfile( className, 'neckbeard.png', 'voice-1.mp3');
        case TOUGH_GUY: 
            return new ClassProfile( className, 'chad.png', 'voice-1.mp3');
        case SUNGLASSES_LADY: 
            return new ClassProfile( className, 'woman.png', 'voice-2.mp3');
        case GRANNY: 
            return new ClassProfile( className, 'characterx3.png', 'voice-2.mp3');
        case TOUGH_GUY_WITH_COOL_HAIR: 
            return new ClassProfile( className, 'characterx5.png', 'voice-1.mp3');
        case PIGEON: 
            return new ClassProfile( className, 'pigeon.png', 'poo-poo.mp3');
        case BUSINESS_MAN:
            return new ClassProfile( className, 'business_man.png', 'voice-1.mp3');
        case STRONG_GUY:
            return new ClassProfile( className, 'chad_recolour01.png', 'voice-1.mp3');
        case BURLY_GUY:
            return new ClassProfile( className, 'chad_recolour02.png', 'voice-1.mp3');
        case GREEN_SHIRTED_STRONG_GUY:
            return new ClassProfile( className, 'chad_recolour03.png', 'voice-1.mp3');
        case DORKY_GUY:
            return new ClassProfile( className, 'character_x1_recolour01.png', 'voice-1.mp3');
        case TOUGH_GUY_WITH_DARK_HAIR:
            return new ClassProfile( className, 'character_x4.png', 'voice-1.mp3');
        case TOUGH_GUY_WITH_COOL_SHIRT:
            return new ClassProfile( className, 'character_x5_recolour.png', 'voice-1.mp3');
        case FAT_BUFF_GUY:
            return new ClassProfile( className, 'fats.png', 'voice-1.mp3');
        case BALD_BEER_BELLY_GUY:
            return new ClassProfile( className, 'generic_balding_guy.png', 'voice-1.mp3');
        case BLONDE_BEER_BELLY_GUY:
            return new ClassProfile( className, 'generic_blonde_guy.png', 'voice-1.mp3');
        case PINK_HAIRED_FAT_GUY:
            return new ClassProfile( className, 'fats_recolour.png', 'voice-1.mp3');
        case YELLOW_SHIRT_LADY:
            return new ClassProfile( className, 'new_girl.png', 'voice-2.mp3');
        case GREEN_HAIR_LADY:
            return new ClassProfile( className, 'new_girl_recolour.png', 'voice-2.mp3');
        case SUPERMARKET_MANAGER:
            return new ClassProfile( className, 'manager.png', 'voice-4.mp3');
        case MONKEY_CEO:
            return new ClassProfile( className, 'monkey_ceo.png', 'poo-poo.mp3');
        case WHITE_PONY_TAIL_LADY:
            return new ClassProfile( className, 'pony_tail.png', 'voice-2.mp3');
        case BLACK_PONY_TAIL_LADY:
            return new ClassProfile( className, 'pony_tail_recolour.png', 'voice-2.mp3');
        case ROBOT:
            return new ClassProfile( className, 'robot.png', 'typing.mp3');
        case PINK_HAIR_NERD_LADY:
            return new ClassProfile( className, 'tumbler_girl.png', 'voice-2.mp3');
        case BLONDE_NERD_LADY:
            return new ClassProfile( className, 'tumbler_girl_recolour01.png', 'voice-2.mp3');
        case DARK_HAIR_NERD_LADY:
            return new ClassProfile( className, 'tumbler_girl_recolour02.png', 'voice-2.mp3');
    }
};
module.exports = {
    getProfileName,
    getClassProfile,

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

