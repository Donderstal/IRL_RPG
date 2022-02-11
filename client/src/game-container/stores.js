import { writable, get } from 'svelte/store';
import { startGame, loadGame } from './../game/Game.js';

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

export const userMessage    = writable(false)
export const loggedIn       = writable(false);
export const currentScreen  = writable(SCREEN_WELCOME);
export const websiteMode    = writable(true);
export const gameMode       = writable(false);

const switchScreen = ( screen ) => {
    userMessage.set(false);
    currentScreen.set(screen);
}

const closeWebsite = ( ) => {
    websiteMode.set(false);
    gameMode.set(true);
}

export const openWelcomeScreen          = ( ) => {switchScreen(SCREEN_WELCOME)};
export const openLogInScreen            = ( ) => {switchScreen(SCREEN_LOG_IN)};
export const openSignUpScreen           = ( ) => {switchScreen(SCREEN_SIGN_UP)};
export const openForgotPasswordScreen   = ( ) => {switchScreen(SCREEN_FORGOT_PASSWORD)};
export const openMainMenuScreen         = ( ) => {switchScreen(SCREEN_MAIN_MENU)};
export const openNewGameScreen          = ( ) => {switchScreen(SCREEN_NEW_GANE)};
export const openLoadGameScreen         = ( ) => {switchScreen(SCREEN_LOAD_GAME)};
export const openOptionsScreen          = ( ) => {switchScreen(SCREEN_OPTIONS)};
export const openCreditsScreen          = ( ) => {switchScreen(SCREEN_CREDITS)};
export const openAboutScreen            = ( ) => {switchScreen(SCREEN_ABOUT)};
export const openHelpScreen             = ( ) => {switchScreen(SCREEN_HELP)};

export const returnToPreviousScreen     = ( ) => {
    switch( get(currentScreen) ) {
        case SCREEN_FORGOT_PASSWORD:
            switchScreen(SCREEN_LOG_IN);
            break;
        case SCREEN_LOG_IN:
        case SCREEN_SIGN_UP:
        case SCREEN_MAIN_MENU:
            switchScreen(SCREEN_WELCOME);
            break;
        case SCREEN_NEW_GANE:
        case SCREEN_LOAD_GAME:
            switchScreen(SCREEN_MAIN_MENU);
            break;
    }
};

export const startGameWithParams = ( ) => {
    const characterName = document.getElementById('name-input').value;
    const characterClass = "NECKBEARD".toLowerCase();
    const startingMap = document.getElementById('map-selection').value
    const runInDebugMode = document.getElementById('enable-debug').checked;
    const disableStoryEvents = document.getElementById('disable-story').checked;
    closeWebsite( )
    setTimeout( ( ) => {
        startGame( characterName, characterClass, startingMap, runInDebugMode, disableStoryEvents );
    }, 100)
}

export const loadGameFromJSON = (saveFile) => {
    closeWebsite( );
    setTimeout( ( ) => {
        loadGame(saveFile);
    }, 100);  
}