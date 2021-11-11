const { 
    SPEAK, SPEAK_YES_NO, MOVE, MOVE_CAR, ANIM, CREATE_CAR, CREATE_SPRITE, 
    DELETE_SPRITE, FADE_OUT, FADE_IN, FADE_IN_OUT, WAIT, EMOTE
} = require('../game-data/conditionGlobals');

const getKeys = ( type ) => {
    switch( type ) {
        case SPEAK:
            return [ "text", "spriteName", "sfx" ];
        case SPEAK_YES_NO:
            return [ "text", "pathYes", "pathNo", "spriteName", "sfx" ];
        case EMOTE:
            return [ "src", "spriteName", "sfx" ];
        case MOVE :
            return [ "spriteName", "destination" ];
        case MOVE_CAR:
            return [ "col", "row", "spriteName", "direction"];
        case ANIM: 
            return [ "animName", "loop" ];
        case CREATE_CAR:
            return [ "sprite", "spriteName", "roadId" ];
        case CREATE_SPRITE:
            return [ "direction", "sprite", "col", "row"];
        case DELETE_SPRITE:
            return [ "spriteName" ];
        case FADE_OUT:
        case FADE_IN :
        case FADE_IN_OUT:
            return [ "sfx" ];
        case WAIT:
            return [ "ms" ];
        default :
            console.log( "Scene type " + type + " is not recognized")
    }
}

const getActionSceneObject = ( options ) => {
    const sceneObject = { "type": options[0] };
    const keys = getKeys( options[0] );
    keys.forEach((key, index) => { 
        let currentOption = options[index+1]
        if ( currentOption != undefined && (key == "pathYes" || key == "pathNo") ) { 
            let innerScenes = currentOption;
            sceneObject[key] = [];
            innerScenes.forEach((scene)=> { 
                sceneObject[key].push(getActionSceneObject( scene ));
            })
        }
        else {
            sceneObject[key] = currentOption == undefined ? false : currentOption;            
        }
    });
    return sceneObject;
};

const getActionObject = ( type, registryKey, sfx, scenes ) => {
    const actionObject = {
        "type": type,
        "sfx": sfx,
        "scenes": []
    };
    if ( registryKey ) {
        action["shouldBeRegistered"] = true;
        action["registryKey"] = registryKey;
    }
    scenes.forEach( ( scene )=> {
        actionObject["scenes"].push(getActionSceneObject( scene ));
    } )
    return actionObject
}

const getConditionObject = (type, value) => {
    return {
        "type": type,
        "value": value
    }
}

const getAction = ( conditionData, actionData ) => {
    return {
        "condition": getConditionObject(conditionData[0], conditionData[1]),
        "action": getActionObject(actionData[0], actionData[1], actionData[2], actionData[3])
    };
}

module.exports = {
    getAction
}