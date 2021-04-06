const { 
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK,
    MODI_VERY_LOW, MODI_LOW, MODI_STANDARD, MODI_HIGH, MODI_VERY_HIGH,

    TEST_CLASSNAME_1, TEST_CLASSNAME_2, TEST_CLASSNAME_3,
    TEST_CLASSNAME_4, TEST_CLASSNAME_5, TEST_CLASSNAME_6,
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
    { move : PH_ATTK_1, level: 1 },
    { move : SMALL_PH_ATTK_UP, level: 5 },
    { move : PH_ATTK_1, level: 10 }
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
    { move : PH_ATTK_1, level: 1 },
    { move : SP_ATTK_1, level: 5 },
    { move : SMALL_SPEED_UP, level: 10 }
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
    { move : PH_ATTK_1, level: 1 },
    { move : SMALL_PH_DEF_UP, level: 5 },
    { move : SMALL_SP_DEF_UP, level: 10 }
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
    { move : HEAL_SMALL, level: 1 },
    { move : HEAL_PP, level: 5 },
    { move : SP_ATTK_2, level: 10 }
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
            return TEST_CLASSPROFILE_1;
        case TEST_CLASSNAME_3: 
        case TEST_CLASSNAME_6: 
            return TEST_CLASSPROFILE_2;
        case TEST_CLASSNAME_1: 
            return TEST_CLASSPROFILE_3;
        case TEST_CLASSNAME_4: 
            return TEST_CLASSPROFILE_4;
    }
};
const getClassSprite = ( className ) => {
    switch ( className ) {
        case TEST_CLASSNAME_1:
            return '/static/sprites/neckbeard.png';
        case TEST_CLASSNAME_2: 
            return '/static/sprites/chad.png';
        case TEST_CLASSNAME_3: 
            return '/static/sprites/influencer.png';
        case TEST_CLASSNAME_4: 
            return '/static/sprites/characterx3.png';
        case TEST_CLASSNAME_5: 
            return '/static/sprites/CharacterX5.png';
        case TEST_CLASSNAME_6: 
            return '/static/sprites/pigeon.png';
    }
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
            validMovesArray.push( moveObject.move );
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

