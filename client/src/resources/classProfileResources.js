const { 
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK,
    MODI_VERY_LOW, MODI_LOW, MODI_STANDARD, MODI_HIGH, MODI_VERY_HIGH,

    TEST_CLASSNAME_1, TEST_CLASSNAME_2, TEST_CLASSNAME_3,
    TEST_CLASSNAME_4, TEST_CLASSNAME_5, TEST_CLASSNAME_6,
    TEST_CLASSNAME_7, TEST_CLASSNAME_8, TEST_CLASSNAME_9,
    TEST_CLASSNAME_10, TEST_CLASSNAME_11, TEST_CLASSNAME_12, 
    TEST_CLASSNAME_13, TEST_CLASSNAME_14, TEST_CLASSNAME_15,
    TEST_CLASSNAME_16, TEST_CLASSNAME_17, TEST_CLASSNAME_18,
    TEST_CLASSNAME_19, TEST_CLASSNAME_20, TEST_CLASSNAME_21,
    TEST_CLASSNAME_22, TEST_CLASSNAME_23, TEST_CLASSNAME_24,
    TEST_CLASSNAME_25, TEST_CLASSNAME_26, TEST_CLASSNAME_27,

    TEST_CLASSPROFILE_1, TEST_CLASSPROFILE_2,
    TEST_CLASSPROFILE_3, TEST_CLASSPROFILE_4
}= require('../game-data/globals');

const {
    HEAL_SMALL, HEAL_LARGE, HEAL_PP,
    SMALL_PH_ATTK_UP, SMALL_PH_ATTK_DOWN,
    SMALL_PH_DEF_UP, SMALL_PH_DEF_DOWN, 
    SMALL_SP_ATTK_UP, SMALL_SP_ATTK_DOWN,
    SMALL_SP_DEF_UP, SMALL_SP_DEF_DOWN,
    SMALL_SPEED_UP, SMALL_SPEED_DOWN,
    SMALL_LUCK_UP, SMALL_LUCK_DOWN,
    PH_ATTK_1, PH_ATTK_2,
    SP_ATTK_1, SP_ATTK_2
} = require('./battleMoveResources');
const { getMoveAnimationData } = require('./moveAnimationScripts');

const TEST_CLASSPROFILE_MODIFIERS_1 = {
    [ATT_HEALTH_POINTS]: MODI_STANDARD,
    [ATT_POWER_POINTS]: MODI_STANDARD,
    [ATT_PH_ATTACK]: MODI_VERY_HIGH,
    [ATT_PH_DEFENSE]: MODI_LOW,
    [ATT_SP_ATTACK]: MODI_VERY_HIGH,
    [ATT_SP_DEFENSE]: MODI_LOW,
    [ATT_SPEED]: MODI_LOW,
    [ATT_LUCK]: MODI_LOW 
};
const TEST_CLASSPROFILE_MOVES_1 = [
    { move : PH_ATTK_1, level: 1, animation: "PHYISCAL_ATTACK_TEST"  },
    { move : SMALL_PH_ATTK_UP, level: 5, animation: "STAT_UP" },
    { move : PH_ATTK_1, level: 10, animation: "PHYISCAL_ATTACK_TEST_2" }
];
const TEST_CLASSPROFILE_MODIFIERS_2 = {
    [ATT_HEALTH_POINTS]: MODI_LOW,
    [ATT_POWER_POINTS]: MODI_LOW,
    [ATT_PH_ATTACK]: MODI_STANDARD,
    [ATT_PH_DEFENSE]: MODI_STANDARD,
    [ATT_SP_ATTACK]: MODI_STANDARD,
    [ATT_SP_DEFENSE]: MODI_STANDARD,
    [ATT_SPEED]: MODI_VERY_HIGH,
    [ATT_LUCK]: MODI_STANDARD 
};
const TEST_CLASSPROFILE_MOVES_2 = [
    { move : PH_ATTK_1, level: 1, animation: "PHYISCAL_ATTACK_TEST" },
    { move : SP_ATTK_1, level: 5, animation: "SPECIAL_ATTACK_TEST" },
    { move : SMALL_SPEED_UP, level: 10, animation: "STAT_UP" }
];
const TEST_CLASSPROFILE_MODIFIERS_3 = {
    [ATT_HEALTH_POINTS]: MODI_STANDARD,
    [ATT_POWER_POINTS]: MODI_STANDARD,
    [ATT_PH_ATTACK]: MODI_LOW,
    [ATT_PH_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SP_ATTACK]: MODI_LOW,
    [ATT_SP_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SPEED]: MODI_VERY_LOW,
    [ATT_LUCK]: MODI_STANDARD 
}
const TEST_CLASSPROFILE_MOVES_3 = [
    { move : PH_ATTK_1, level: 1, animation: "PHYISCAL_ATTACK_TEST" },
    { move : SMALL_PH_DEF_UP, level: 5, animation: "STAT_UP" },
    { move : SMALL_SP_DEF_UP, level: 10, animation: "STAT_UP" }
];
const TEST_CLASSPROFILE_MODIFIERS_4 = {
    [ATT_HEALTH_POINTS]: MODI_VERY_LOW,
    [ATT_POWER_POINTS]: MODI_VERY_HIGH,
    [ATT_PH_ATTACK]: MODI_VERY_LOW,
    [ATT_PH_DEFENSE]: MODI_VERY_LOW,
    [ATT_SP_ATTACK]: MODI_VERY_HIGH,
    [ATT_SP_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SPEED]: MODI_VERY_LOW,
    [ATT_LUCK]: MODI_VERY_HIGH
}
const TEST_CLASSPROFILE_MOVES_4 = [
    { move : HEAL_SMALL, level: 1, animation: "HEAL_TEST" },
    { move : HEAL_PP, level: 5, animation: "HEAL_TEST" },
    { move : SP_ATTK_2, level: 10, animation: "SPECIAL_ATTACK_TEST" }
];
const getAttributeModifierByClassProfile = ( classProfile ) => {
    switch ( classProfile ) {
        case TEST_CLASSPROFILE_1:
            return TEST_CLASSPROFILE_MODIFIERS_1;
        case TEST_CLASSPROFILE_2: 
            return TEST_CLASSPROFILE_MODIFIERS_2;
        case TEST_CLASSPROFILE_3: 
            return TEST_CLASSPROFILE_MODIFIERS_3;
        case TEST_CLASSPROFILE_4: 
            return TEST_CLASSPROFILE_MODIFIERS_4;
    }
};
const getClassProfile = ( className ) => {
    switch ( className ) {
        case TEST_CLASSNAME_2:
        case TEST_CLASSNAME_5: 
        case TEST_CLASSNAME_8:
        case TEST_CLASSNAME_9:
        case TEST_CLASSNAME_10:
        case TEST_CLASSNAME_14:
            return TEST_CLASSPROFILE_1;
        case TEST_CLASSNAME_3: 
        case TEST_CLASSNAME_6: 
            return TEST_CLASSPROFILE_2;
        case TEST_CLASSNAME_1: 
        case TEST_CLASSNAME_15:
        case TEST_CLASSNAME_16:
            return TEST_CLASSPROFILE_3;
        case TEST_CLASSNAME_7:
        case TEST_CLASSNAME_4: 
            return TEST_CLASSPROFILE_4;
    }
};
const getClassSprite = ( className, getBattleSprite = false ) => {
    const spriteFolder = '/static/sprites/';
    let spriteSrc = "";

    switch ( className ) {
        case TEST_CLASSNAME_1:
            spriteSrc = 'neckbeard';
            break;
        case TEST_CLASSNAME_2: 
            spriteSrc = 'chad';
            break;
        case TEST_CLASSNAME_3: 
            spriteSrc = 'woman';
            break;
        case TEST_CLASSNAME_4: 
            spriteSrc = 'characterx3';
            break;
        case TEST_CLASSNAME_5: 
            spriteSrc = 'characterx5';
            break;
        case TEST_CLASSNAME_6: 
            spriteSrc = 'pigeon';
            break;
        case TEST_CLASSNAME_7:
            spriteSrc = 'business_man';
            break;
        case TEST_CLASSNAME_8:
            spriteSrc = 'chad_recolour01';
            break;
        case TEST_CLASSNAME_9:
            spriteSrc = 'chad_recolour02';
            break;
        case TEST_CLASSNAME_10:
            spriteSrc = 'chad_recolour03';
            break;
        case TEST_CLASSNAME_11:
            spriteSrc = 'character_x1_recolour01';
            break;
        case TEST_CLASSNAME_12:
            spriteSrc = 'character_x4';
            break;
        case TEST_CLASSNAME_13:
            spriteSrc = 'character_x5_recolour';
            break;
        case TEST_CLASSNAME_14:
            spriteSrc = 'fats';
            break;
        case TEST_CLASSNAME_15:
            spriteSrc = 'generic_balding_guy';
            break;
        case TEST_CLASSNAME_16:
            spriteSrc = 'generic_blonde_guy';
            break;
        case TEST_CLASSNAME_17:
            spriteSrc = 'fats_recolour';
            break;
        case TEST_CLASSNAME_18:
            spriteSrc = 'new_girl';
            break;
        case TEST_CLASSNAME_19:
            spriteSrc = 'new_girl_recolour';
            break;
        case TEST_CLASSNAME_20:
            spriteSrc = 'manager';
            break;
        case TEST_CLASSNAME_21:
            spriteSrc = 'monkey_ceo';
            break;
        case TEST_CLASSNAME_22:
            spriteSrc = 'pony_tail';
            break;
        case TEST_CLASSNAME_23:
            spriteSrc = 'pony_tail_recolour';
            break;
        case TEST_CLASSNAME_24:
            spriteSrc = 'robot';
            break;
        case TEST_CLASSNAME_25:
            spriteSrc = 'tumbler_girl';
            break;
        case TEST_CLASSNAME_26:
            spriteSrc = 'tumbler_girl_recolour01';
            break;
        case TEST_CLASSNAME_27:
            spriteSrc = 'tumbler_girl_recolour02';
            break;
    }

    return spriteFolder + spriteSrc + ( getBattleSprite ? "_fight" : "") + '.png'; 
};
const getMoves = ( classProfile, level ) => {
    switch ( classProfile ) {
        case TEST_CLASSPROFILE_1:
            return filterMoves( level, TEST_CLASSPROFILE_MOVES_1 );
        case TEST_CLASSPROFILE_2: 
            return filterMoves( level, TEST_CLASSPROFILE_MOVES_2 );
        case TEST_CLASSPROFILE_3: 
            return filterMoves( level, TEST_CLASSPROFILE_MOVES_3 );
        case TEST_CLASSPROFILE_4: 
            return filterMoves( level, TEST_CLASSPROFILE_MOVES_4 );
    }
}
const filterMoves = ( level, moveObjectsList ) => {
    let validMovesArray = [ ];
    moveObjectsList.forEach( ( moveObject ) => {
        if ( moveObject.level <= level ) {
            let move = moveObject.move;
            move.animation = getMoveAnimationData( moveObject.animation );
            validMovesArray.push( move );
        }
    })
    return validMovesArray;
}
module.exports = {
    getAttributeModifierByClassProfile,
    getClassProfile,
    getClassSprite,
    getMoves
}

