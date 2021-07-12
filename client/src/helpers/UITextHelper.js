const { 
    MOVE_TYPE_HEAL, MOVE_TYPE_STAT_UP, MOVE_TYPE_STAT_DOWN,
    MOVE_TYPE_STAT_EFF, MOVE_TYPE_PH_ATTACK, MOVE_TYPE_SP_ATTACK,

    MOVE_PROP_KEY_TYPE, MOVE_PROP_KEY_ATTRIBUTE, MOVE_PROP_KEY_BASE_VALUE,
    MOVE_PROP_KEY_PP_COST, MOVE_PROP_KEY_EFFECT_TYPE, MOVE_PROP_KEY_TURNS_AMOUNT, MOVE_PROP_KEY_MODIFIER
} = require('../game-data/moveGlobals')

const moveTypeTextHint  = "Move type: ";
const damageTextHint    = "Base damage: ";
const healingTextHint   = "Base healing: ";
const statTextHint      = "Base change";
const attributeTextHint = "Attribute: ";
const ppCostTextHint    = "PP cost: "

const generateActionHint = ( actionData, type ) => {
    console.log(actionData)
    const hintContents = { 
        [MOVE_PROP_KEY_TYPE]: "",
        [MOVE_PROP_KEY_ATTRIBUTE]: "",
        [MOVE_PROP_KEY_BASE_VALUE]: "",
        [MOVE_PROP_KEY_EFFECT_TYPE]: "",
        [MOVE_PROP_KEY_TURNS_AMOUNT]: "",
        [MOVE_PROP_KEY_MODIFIER]: "",
        [MOVE_PROP_KEY_PP_COST]: ""
    }
    if ( type == "ITEM" ) {
        hintContents[MOVE_PROP_KEY_TYPE]        = actionData.Item.Type;
        hintContents[MOVE_PROP_KEY_ATTRIBUTE]   = actionData.Item.Effects[0][0];
        hintContents[MOVE_PROP_KEY_BASE_VALUE]  = actionData.Item.Effects[0][1];
    }
    else if ( type == "MOVE" ) {
        Object.keys( hintContents ).forEach( ( e ) => {
            if ( actionData[e] ) {
                hintContents[e] = actionData[e];
            }     
        })
    }
    console.log(hintContents);    
    switch( hintContents[MOVE_PROP_KEY_TYPE] ) {
        case MOVE_TYPE_HEAL:
            return [ 
                moveTypeTextHint + "Heal", 
                healingTextHint + hintContents[MOVE_PROP_KEY_BASE_VALUE], 
                attributeTextHint + hintContents[MOVE_PROP_KEY_ATTRIBUTE],
                ppCostTextHint + ( hintContents[MOVE_PROP_KEY_PP_COST] ? hintContents[MOVE_PROP_KEY_PP_COST] : 0 )
            ];
        case MOVE_TYPE_PH_ATTACK:
            return [ 
                moveTypeTextHint + "Physical attack", 
                damageTextHint + hintContents[MOVE_PROP_KEY_BASE_VALUE], 
                ppCostTextHint + ( hintContents[MOVE_PROP_KEY_PP_COST] ? hintContents[MOVE_PROP_KEY_PP_COST] : 0 )
            ];
        case MOVE_TYPE_SP_ATTACK:
            return [ 
                moveTypeTextHint + "Special attack", 
                damageTextHint + hintContents[MOVE_PROP_KEY_BASE_VALUE], 
                ppCostTextHint + ( hintContents[MOVE_PROP_KEY_PP_COST] ? hintContents[MOVE_PROP_KEY_PP_COST] : 0 )
            ];
        case MOVE_TYPE_STAT_UP:
            return [ 
                moveTypeTextHint + "Stat up", 
                statTextHint + hintContents[MOVE_PROP_KEY_BASE_VALUE], 
                attributeTextHint + hintContents[MOVE_PROP_KEY_ATTRIBUTE],
                ppCostTextHint + ( hintContents[MOVE_PROP_KEY_PP_COST] ? hintContents[MOVE_PROP_KEY_PP_COST] : 0 )
            ];
        case MOVE_TYPE_STAT_DOWN: 
            return [ 
                moveTypeTextHint + "Stat down", 
                statTextHint + hintContents[MOVE_PROP_KEY_BASE_VALUE], 
                attributeTextHint + hintContents[MOVE_PROP_KEY_ATTRIBUTE],
                ppCostTextHint + ( hintContents[MOVE_PROP_KEY_PP_COST] ? hintContents[MOVE_PROP_KEY_PP_COST] : 0 )
            ];
        case MOVE_TYPE_STAT_EFF:
            return [ 
                moveTypeTextHint + "Status effect", 
                healingTextHint + hintContents[MOVE_PROP_KEY_BASE_VALUE], 
                ppCostTextHint + ( hintContents[MOVE_PROP_KEY_PP_COST] ? hintContents[MOVE_PROP_KEY_PP_COST] : 0 )
            ];
    }
}

module.exports = {
    generateActionHint
}