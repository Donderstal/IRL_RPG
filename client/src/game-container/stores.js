import { writable } from 'svelte/store';

export const SCREEN_WELCOME         = "WELCOME";
export const SCREEN_LOG_IN          = "LOG_IN";
export const SCREEN_SIGN_UP         = "SIGN_UP";
export const SCREEN_FORGOT_PASSWORD = "RESTORE_PASSWORD";
export const SCREEN_MAIN_MENU       = "MAIN_MENU";
export const SCREEN_NEW_GANE        = "NEW_GAME";
export const SCREEN_LOAD_GAME       = "LOAD_GAME";
export const SCREEN_OPTIONS         = "OPTIONS"
export const SCREEN_CREDITS         = "CREDITS"
export const SCREEN_ABOUT           = "ABOUT"
export const SCREEN_HELP            = "HELP"

export const loggedIn       = writable(false);
export const currentScreen  = writable();