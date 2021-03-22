const { 
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK,
    MODI_VERY_LOW, MODI_LOW, MODI_STANDARD, MODI_HIGH, MODI_VERY_HIGH
}= require('../game-data/globals');

const TEST_1 = {
    [ATT_HEALTH_POINTS]: MODI_STANDARD,
    [ATT_POWER_POINTS]: MODI_STANDARD,
    [ATT_PH_ATTACK]: MODI_VERY_HIGH,
    [ATT_PH_DEFENSE]: MODI_LOW,
    [ATT_SP_ATTACK]: MODI_VERY_HIGH,
    [ATT_SP_DEFENSE]: MODI_LOW,
    [ATT_SPEED]: MODI_LOW,
    [ATT_LUCK]: MODI_LOW 
}

const TEST_2 = {
    [ATT_HEALTH_POINTS]: MODI_LOW,
    [ATT_POWER_POINTS]: MODI_LOW,
    [ATT_PH_ATTACK]: MODI_STANDARD,
    [ATT_PH_DEFENSE]: MODI_STANDARD,
    [ATT_SP_ATTACK]: MODI_STANDARD,
    [ATT_SP_DEFENSE]: MODI_STANDARD,
    [ATT_SPEED]: MODI_VERY_HIGH,
    [ATT_LUCK]: MODI_STANDARD 
};

const TEST_3 = {
    [ATT_HEALTH_POINTS]: MODI_STANDARD,
    [ATT_POWER_POINTS]: MODI_STANDARD,
    [ATT_PH_ATTACK]: MODI_LOW,
    [ATT_PH_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SP_ATTACK]: MODI_LOW,
    [ATT_SP_DEFENSE]: MODI_VERY_HIGH,
    [ATT_SPEED]: MODI_VERY_LOW,
    [ATT_LUCK]: MODI_STANDARD 
}

const getAttributeModifierByClass = ( className ) => {
    switch ( className ) {
        case "chad":
            return TEST_1;
        case "neckbeard": 
            return TEST_2;
        case "influencer": 
            return TEST_3;
    }
}

module.exports = {
    getAttributeModifierByClass
}