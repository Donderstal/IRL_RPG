import { MENU_TEXTBOX_Y, MENU_GRID_COLUMNS, MENU_TEXTBOX_ROWS, MENU_TEXTBOX_ROWSTYLES } from "../../game-data/uiGlobals";
import { I_MenuElement } from "./I_MenuElement";

export class MenuTextBox extends I_MenuElement {
    constructor( ) {
        super( 0, MENU_TEXTBOX_Y, MENU_GRID_COLUMNS, MENU_TEXTBOX_ROWS, MENU_TEXTBOX_ROWSTYLES );
    }
}