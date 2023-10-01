import { DirectionEnum } from "../enumerables/DirectionEnum";
import { getGameControlState } from "../state/state";
import { actionButtonKey, menuButtonKey, spaceEventKey, tabEventKey, enterEventKey, returnButtonKey, aEventKey, arrowLeftEventKey, wEventKey, arrowUpEventKey, dEventKey, arrowRightEventKey, sEventKey, arrowDownEventKey } from "./controlConstants";
import { getPressedKeys } from "./controlDictionary"
import { controlSettings } from "./controlSettings";

export const getActiveControls = (): any[] => {
    const activeKeys = translatePressedKeys();
    return activeKeys;
}

const translatePressedKeys = (): any[] => {
    const activeControlSetting = getActiveControlSettings();
    const pressedKeys = getPressedKeys();
    return Object.keys( pressedKeys ).filter( ( key ) => {
        return pressedKeys[key];
    } ).map( translateEventKey ).filter( ( key ) => {
        return key !== null && activeControlSetting.indexOf( key ) > -1;
    } );
}

const translateEventKey = ( key ): DirectionEnum|string => {
    switch ( key ) {
        case spaceEventKey:
            return actionButtonKey;
        case tabEventKey:
            return menuButtonKey;
        case enterEventKey:
            return returnButtonKey;
        case aEventKey:
        case arrowLeftEventKey:
            return DirectionEnum.left;
        case wEventKey:
        case arrowUpEventKey:
            return DirectionEnum.up;
        case dEventKey:
        case arrowRightEventKey:
            return DirectionEnum.right;
        case sEventKey:
        case arrowDownEventKey:
            return DirectionEnum.down;
        default:
            return null;
    }
}

const getActiveControlSettings = (): any[] => {
    const controlState = getGameControlState();
    return controlSettings[controlState];
}