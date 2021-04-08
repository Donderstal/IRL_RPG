const moveAnimationScripts = {
    "PHYISCAL_ATTACK_TEST" : {
        moveToTarget: true,
        perfomerAnimation: "PUNCH",
        performerEffects: false,
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectsOnHit: false
    },
    "PHYISCAL_ATTACK_TEST_2" : {
        moveToTarget: true,
        perfomerAnimation: "PUNCH",
        performerEffects: false,
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectsOnHit: false
    },
    "SPECIAL_ATTACK_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "TURN_SINGLE_CIRCLE",
        performerEffects: "FIRE_CIRCLE",
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectsOnHit: false
    },
    "STAT_UP_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "TURN_SINGLE_CIRCLE",
        performerEffects: "FIRE_CIRCLE",
        targetAnimationOnHit: "TURN_SINGLE_CIRCLE",
        targetEffectsOnHit: false
    },
    "STAT_UP_CHAD" : {
        moveToTarget : false,
        perfomerAnimation: "LIFT",
        performerEffects: "FIRE_CIRCLE",
        targetAnimationOnHit: "TURN_SINGLE_CIRCLE",
        targetEffectsOnHit: false
    },
    "STAT_DOWN_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "TURN_SINGLE_CIRCLE",
        performerEffects: "FIRE_CIRCLE",
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectsOnHit: false
    },
    "HEAL_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "TURN_SINGLE_CIRCLE",
        performerEffects: "FIRE_CIRCLE",
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectsOnHit: false
    }
}
/**
 * Return the animation data located at given key in moveAnimationScripts
 * @param {String} key name of the move to go
 */
const getMoveAnimationData = ( key ) => {
    return moveAnimationScripts[key];
}

module.exports = {
    getMoveAnimationData
}