import { setListeningForKeysState } from "../state/stateSetter";
import { addKeyToPressed, clearPressedKeys, removeKeyFromPressed } from "./controlDictionary";

export const deactivateControls = (): void => {
    window.removeEventListener( 'keydown', addKeyToPressed )
    window.removeEventListener( 'keyup', removeKeyFromPressed )
    setListeningForKeysState( false );
};
export const activateControls = (): void => {
    window.addEventListener( 'keydown', addKeyToPressed )
    window.addEventListener( 'keyup', removeKeyFromPressed )
    window.addEventListener( 'mousedown', ( event ) => {
        if ( event.which === 3 ) {
            // clear pressed keys on right click
            clearPressedKeys();
        }
    } )
    setListeningForKeysState( true );
};