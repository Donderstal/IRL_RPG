import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { getMenuGrid } from "../canvas/canvasGetter";

 export const handleMenuKeyPress = ( event: KeyboardEvent ) => {
     const MENU = getMenuGrid();
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