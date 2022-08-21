import { mobileAgent } from '../helpers/screenOrientation';
import globals from './globals';
import { GRID_BLOCK_PX } from './globals';
import { BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_BOTTOM } from './textboxGlobals';

export const COLOR_BLACK = '#000000';
export const COLOR_WHITE = '#ffffff';
export const COLOR_PRIMARY = '#9c1e86';
export const COLOR_SECONDARY = '#D82BBA';
export const COLOR_TERTIARY = '#00384D';
export const COLOR_BACKGROUND = '#00384D';

export const MENU_TYPE_EQUIP = "EQUIP";
export const MENU_TYPE_STATUS = "STATUS";
export const MENU_TYPE_BUY = "BUY";
export const MENU_TYPE_MAP = "MAP";
export const MENU_TYPE_SELL = "SELL";
export const MENU_TYPE_GAME = "GAME";
export const MENU_TYPE_INVENTORY = "INVENTORY";
export const MENU_TYPE_MEMBERS = "MEMBERS";

export const MENU_BUTTON_USE = "USE";
export const MENU_BUTTON_MOVE = "MOVE";
export const MENU_BUTTON_EQUIP = "EQUIP";
export const MENU_BUTTON_UNEQUIP = "UNEQUIP";
export const MENU_BUTTON_RETURN = "RETURN";
export const MENU_BUTTON_DISCARD = "DISCARD";
export const MENU_BUTTON_SHOW_STATUS = "SHOW STATUS";
export const MENU_BUTTON_SHOW_ON_MAP = "SHOW ON MAP";
export const MENU_BUTTON_REMOVE_FROM = "REMOVE FROM LIST";
export const MENU_BUTTON_CONFIRM_TRANS = "CONFIRM TRANSACTION";

export const MENU_ACTION_NEXT = "NEXT";
export const MENU_ACTION_PREVIOUS = "PREVIOUS";

export const MENU_TAB_PARTY = "MTP";
export const MENU_TAB_INVENTORY = "MTI";
export const MENU_TAB_MAP = "MTM";
export const MENU_TAB_GAME = "MTG";

export const MENU_GRID_COLUMNS = mobileAgent ? 8 : 24;
export const MENU_GRID_ROWS = mobileAgent ? 8 : 16;

export const MENU_WIDTH = mobileAgent ? 8 : 24;
export const MENU_HEIGHT = mobileAgent ? 8 : 16;

export const MENU_HEADER_HEIGHT = mobileAgent ? GRID_BLOCK_PX : GRID_BLOCK_PX * 2;

export const MENU_HEADER_ACTIVE_COLUMNS = mobileAgent ? 8 : 12;
export const MENU_HEADER_ACTIVE_ROWS = mobileAgent ? 1 : 2;
export const MENU_HEADER_ACTIVE_ROWSTYLES = mobileAgent ? [ BUBBLE_TOP ] : [ BUBBLE_TOP, BUBBLE_MIDDLE ];

export const MENU_HEADER_INACTIVE_COLUMNS = mobileAgent ? 0 : 4;
export const MENU_HEADER_INACTIVE_ROWS = mobileAgent ? 0 : 1;
export const MENU_HEADER_INACTIVE_Y = mobileAgent? 0 : GRID_BLOCK_PX;
export const MENU_HEADER_INACTIVE_ROWSTYLES = [ BUBBLE_TOP ];

export const MENU_MARGIN_SIDES = mobileAgent ? 0.5 : 1;
export const MENU_MARGIN_TOP_DOWN = mobileAgent ? 0.25 : 0.5;

export const MENU_BUTTON_STANDARD_WIDTH = mobileAgent ? 7 : 10;
export const MENU_BUTTON_STANDARD_HEIGHT = mobileAgent ? 1 : 1.5; 
export const MENU_BUTTON_ROWSTYLES = [ BUBBLE_TOP, BUBBLE_BOTTOM ];

export const MENU_TEXTBOX_ROWS = mobileAgent? GRID_BLOCK_PX * 2 : GRID_BLOCK_PX * 3;
export const MENU_TEXTBOX_Y = mobileAgent ? 6 * GRID_BLOCK_PX : 13 * GRID_BLOCK_PX;
export const MENU_TEXTBOX_ROWSTYLES = mobileAgent ? [ BUBBLE_TOP, BUBBLE_MIDDLE ] : [ BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_MIDDLE ];

export const MENU_BUTTON_PARTY_WIDTH = mobileAgent ? 6 : 7;
export const MENU_BUTTON_PARTY_HEIGHT = mobileAgent ? 5 : 11; 
export const MENU_BUTTON_PARTY_ROWSTYLES = mobileAgent 
    ? [BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE]
    : [BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE, BUBBLE_MIDDLE];