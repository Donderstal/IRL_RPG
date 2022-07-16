import { DirectionEnum } from "../../enumerables/DirectionEnum";
import globals from "../../game-data/globals";

 export const handleMenuKeyPress = ( event: KeyboardEvent ) => {
    const MENU = globals.GAME.MENU;
    switch ( event.key ) {
        case "q" : 
            MENU.switchTab( DirectionEnum.left )
            break;
        case "e" :
            MENU.switchTab( DirectionEnum.right )
            break;
        case "a":
        case "ArrowLeft":
            break;
        case "w":
        case "ArrowUp":
            break;
        case "d":
        case "ArrowRight":
            break;
        case "s":
        case "ArrowDown":
            break;
    }
}