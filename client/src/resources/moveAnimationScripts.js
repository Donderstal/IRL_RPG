const moveAnimationScripts = {
    "PHYISCAL_ATTACK_TEST" : {
        moveToTarget: true,
        perfomerAnimation: "PUNCH",
        performerEffect: false,
        effectToTarget: false,
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectOnHit: false
    },
    "PHYISCAL_ATTACK_TEST_2" : {
        moveToTarget: true,
        perfomerAnimation: "PUNCH",
        performerEffect: false,
        effectToTarget: false,
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectOnHit: false
    },
    "SPECIAL_ATTACK_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "CAST",
        performerEffect: "FIRE_CIRCLE_FULL",
        effectToTarget: "FIRE_CIRCLE_MOVING",
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectOnHit: false
    },
    "STAT_UP_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "CAST",
        performerEffect: false,
        effectToTarget: false,
        targetAnimationOnHit: "TURN_SINGLE_CIRCLE",
        targetEffectOnHit: "FIRE_CIRCLE_FULL"
    },
    "STAT_UP_CHAD" : {
        moveToTarget : false,
        perfomerAnimation: "LIFT",
        performerEffect: "FIRE_CIRCLE_BACK",
        effectToTarget: false,
        targetAnimationOnHit: "TURN_SINGLE_CIRCLE",
        targetEffectOnHit: false
    },
    "STAT_DOWN_TEST" : {
        moveToTarget : false,
        perfomerAnimation: "CAST",
        performerEffect: "FIRE_CIRCLE_BACK",
        effectToTarget: false,
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectOnHit: "FIRE_CIRCLE_FRONT"
    },
    "HEAL_TEST" : {
        moveToTarget : false,
        moveForward : true,
        perfomerAnimation: "CAST",
        performerEffect: "FIRE_CIRCLE_BACK",
        effectToTarget: "FIRE_CIRCLE_FRONT_MOVING",
        targetAnimationOnHit: "STANDARD_HIT",
        targetEffectOnHit: false
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