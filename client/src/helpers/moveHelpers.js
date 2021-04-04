const { 
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK
} = require('../game-data/globals')

const { 
    MOVE_PROP_KEY_TYPE, MOVE_TYPE_HEAL, MOVE_TYPE_STAT_UP, MOVE_TYPE_STAT_DOW ,
    MOVE_TYPE_STAT_EFF, MOVE_TYPE_PH_ATTACK, MOVE_TYPE_SP_ATTACK,

    MOVE_PROP_KEY_MODIFIER, MOVE_PROP_KEY_BASE_VALUE, MOVE_PROP_KEY_PP_COST,
    MOVE_PROP_KEY_ATTRIBUTE, MOVE_PROP_KEY_TURNS_AMOUNT
} = require("../game-data/moveGlobals")

const handleMoveExecution = ( move, moveTarget, performer ) => {
    switch( move[MOVE_PROP_KEY_TYPE] ) {
        case MOVE_TYPE_HEAL:
            doHealingMove( move, moveTarget, performer )
            break;
        case MOVE_TYPE_STAT_UP:
            doStatUp( move, moveTarget, performer );
            break;
        case MOVE_TYPE_STAT_DOW:
            doStatDown( move, moveTarget, performer )
            break;
        case MOVE_TYPE_STAT_EFF:
            break;
        case MOVE_TYPE_PH_ATTACK:
            doPhysicalDamage( move, moveTarget, performer )
            break;
        case MOVE_TYPE_SP_ATTACK:
            doSpecialDamage( move, moveTarget, performer )
            break
    }
}
const doHealingMove = ( move, target, performer ) => {
    const amount = Math.round (move[MOVE_PROP_KEY_BASE_VALUE] *  getSemiRandomModifier( move[MOVE_PROP_KEY_MODIFIER] ) );
    performer.spendPP( move[MOVE_PROP_KEY_PP_COST] );
    if ( MOVE_PROP_KEY_ATTRIBUTE == ATT_HEALTH_POINTS ) {
        target.heal( amount )
    }
    else if ( MOVE_PROP_KEY_ATTRIBUTE == ATT_POWER_POINTS ) {
        target.healPP( amount )
    }
}
const doStatUp = ( move, target, performer ) => {
    performer.spendPP( move[MOVE_PROP_KEY_PP_COST] );
    target.addStatusEffect( move[MOVE_PROP_KEY_ATTRIBUTE], "BUFF", move[MOVE_PROP_KEY_BASE_VALUE], move[MOVE_PROP_KEY_TURNS_AMOUNT] )
}
const doStatDown = ( move, target, performer ) => {
    performer.spendPP( move[MOVE_PROP_KEY_PP_COST] );
    target.addStatusEffect( move[MOVE_PROP_KEY_ATTRIBUTE], "DEBUFF", move[MOVE_PROP_KEY_BASE_VALUE], move[MOVE_PROP_KEY_TURNS_AMOUNT] )
}
const doPhysicalDamage = ( move, defender, performer ) => {
    const baseDamage = move[MOVE_PROP_KEY_BASE_VALUE] * ( performer.Attributes[ATT_PH_ATTACK] / defender.Attributes[ATT_PH_DEFENSE] );
    const damage = Math.round(baseDamage *  getSemiRandomModifier( move[MOVE_PROP_KEY_MODIFIER] ) );
    performer.spendPP( move[MOVE_PROP_KEY_PP_COST] );
    defender.takeDamage( damage );
}
const doSpecialDamage = ( move, defender, performer ) => {
    const baseDamage = move[MOVE_PROP_KEY_BASE_VALUE] * ( performer.Attributes[ATT_SP_ATTACK] / defender.Attributes[ATT_SP_DEFENSE] );
    const damage = Math.round(baseDamage *  getSemiRandomModifier( move[MOVE_PROP_KEY_MODIFIER] ) );
    performer.spendPP( move[MOVE_PROP_KEY_PP_COST] );
    defender.takeDamage( damage );
}
const getSemiRandomModifier = ( modifier ) => {
    const unroundedModifier = Math.random() > .5 ? Math.random( ) * modifier : -(Math.random( ) * modifier);
    const roundedModifier = parseFloat( unroundedModifier.toFixed( 2 ) );
    return 1 + roundedModifier
}

module.exports = { 
    handleMoveExecution
}