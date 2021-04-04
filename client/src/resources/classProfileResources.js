const { 
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK,
    MODI_VERY_LOW, MODI_LOW, MODI_STANDARD, MODI_HIGH, MODI_VERY_HIGH,

    TEST_CLASSNAME_1, TEST_CLASSNAME_2, TEST_CLASSNAME_3,
    TEST_CLASSNAME_4, TEST_CLASSNAME_5, TEST_CLASSNAME_6,

    TEST_CLASSPROFILE_1, TEST_CLASSPROFILE_2,
    TEST_CLASSPROFILE_3, TEST_CLASSPROFILE_4
}= require('../game-data/globals');

const TEST_MODIFIERS_1 = {
    [ATT_HEALTH_POINTS]: MODI_STANDARD,
    [ATT_POWER_POINTS]: MODI_STANDARD,
    [ATT_PH_ATTACK]: MODI_VERY_HIGH,
    [ATT_PH_DEFENSE]: MODI_LOW,
    [ATT_SP_ATTACK]: MODI_VERY_HIGH,
    [ATT_SP_DEFENSE]: MODI_LOW,
    [ATT_SPEED]: MODI_LOW,
    [ATT_LUCK]: MODI_LOW 
}

const TEST_MODIFIERS_2 = {
    [ATT_HEALTH_POINTS]: MODI_LOW,
    [ATT_POWER_POINTS]: MODI_LOW,
    [ATT_PH_ATTACK]: MODI_STANDARD,
    [ATT_PH_DEFENSE]: MODI_STANDARD,
    [ATT_SP_ATTACK]: MODI_STANDARD,
    [ATT_SP_DEFENSE]: MODI_STANDARD,
    [ATT_SPEED]: MODI_VERY_HIGH,
    [ATT_LUCK]: MODI_STANDARD 
};

const TEST_MODIFIERS_3 = {
    [ATT_HEALTH_POINTS]: MODI_STANDARD,
    [ATT_POWER_POINTS]: MODI_STANDARD,
    [ATT_PH_ATTACK]: MODI_LOW,
    [ATT_PH_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SP_ATTACK]: MODI_LOW,
    [ATT_SP_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SPEED]: MODI_VERY_LOW,
    [ATT_LUCK]: MODI_STANDARD 
}

const TEST_MODIFIERS_4 = {
    [ATT_HEALTH_POINTS]: MODI_VERY_LOW,
    [ATT_POWER_POINTS]: MODI_VERY_HIGH,
    [ATT_PH_ATTACK]: MODI_VERY_LOW,
    [ATT_PH_DEFENSE]: MODI_VERY_LOW,
    [ATT_SP_ATTACK]: MODI_VERY_HIGH,
    [ATT_SP_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SPEED]: MODI_VERY_LOW,
    [ATT_LUCK]: MODI_VERY_HIGH
}

const getAttributeModifierByClassProfile = ( classProfile ) => {
    switch ( classProfile ) {
        case TEST_CLASSPROFILE_1:
            return TEST_MODIFIERS_1;
        case TEST_CLASSPROFILE_2: 
            return TEST_MODIFIERS_2;
        case TEST_CLASSPROFILE_3: 
            return TEST_MODIFIERS_3;
        case TEST_CLASSPROFILE_4: 
            return TEST_MODIFIERS_4;
    }
}

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
}

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
            return '/static/sprites/robot.png';
        case TEST_CLASSNAME_6: 
            return '/static/sprites/pigeon.png';
    }
}

module.exports = {
    getAttributeModifierByClassProfile,
    getClassProfile,
    getClassSprite
}

