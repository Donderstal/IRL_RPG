import { writable, get } from 'svelte/store';
import { loadGame } from './../game/Game.js';

export const SCREEN_WELCOME         = "WELCOME";
export const SCREEN_LOG_IN          = "LOG_IN";
export const SCREEN_VALIDATE_ACCOUNT= "VALIDATE";
export const SCREEN_SIGN_UP         = "SIGN_UP";
export const SCREEN_FORGOT_PASSWORD = "RESTORE_PASSWORD";
export const SCREEN_MAIN_MENU       = "MAIN_MENU";
export const SCREEN_NEW_GANE        = "NEW_GAME";
export const SCREEN_LOAD_GAME       = "LOAD_GAME";
export const SCREEN_OPTIONS         = "OPTIONS"
export const SCREEN_CREDITS         = "CREDITS"
export const SCREEN_ABOUT           = "ABOUT"
export const SCREEN_HELP            = "HELP"
export const SCREEN_SIGNED_UP       = "SIGNED_UP"
export const SCREEN_RESTORED_PASS   = "RESTORED_PASS"

const classNames = {
    "LOREM" : "NECKBEARD", "IPSUM" : "INFLUENCER", "DOLOR" : "CHAD", "SIT AMET" : "TUMBLR_GIRL"
};

const checkForUserSession = ( ) => {
    fetch("/check-login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
    }).then(res => {
        res.json().then(jsonData => {
            jsonData['loggedIn'] ? setUserDataToFrontEnd(jsonData['user']) : currentScreen.set(SCREEN_WELCOME)         
        });
    });
}

const setUserDataToFrontEnd = ( username ) => {
    activeUser.set(username);
    loggedIn.set(true);
    currentScreen.set(SCREEN_MAIN_MENU)
}

export const loggedIn       = writable();
export const activeUser     = writable();
export const currentScreen  = writable();
checkForUserSession();

export const userMessage    = writable(false);
export const websiteMode    = writable(true);
export const gameMode       = writable(false);

const switchScreen = ( screen ) => {
    userMessage.set(false);
    currentScreen.set(screen);
}

export const closeWebsite = ( ) => {
    websiteMode.set( false );
    gameMode.set( true );
}

export const openWebsite = () => {
    websiteMode.set( true );
    gameMode.set( false );
}

export const openWelcomeScreen          = ( ) => {switchScreen(SCREEN_WELCOME)};
export const openLogInScreen            = ( ) => {switchScreen(SCREEN_LOG_IN)};
export const openValidateAccountScreen  = ( ) => {switchScreen(SCREEN_VALIDATE_ACCOUNT)};
export const openSignUpScreen           = ( ) => {switchScreen(SCREEN_SIGN_UP)};
export const openForgotPasswordScreen   = ( ) => {switchScreen(SCREEN_FORGOT_PASSWORD)};
export const openMainMenuScreen         = ( ) => {switchScreen(SCREEN_MAIN_MENU)};
export const openNewGameScreen          = ( ) => {switchScreen(SCREEN_NEW_GANE)};
export const openLoadGameScreen         = ( ) => {switchScreen(SCREEN_LOAD_GAME)};
export const openOptionsScreen          = ( ) => {switchScreen(SCREEN_OPTIONS)};
export const openCreditsScreen          = ( ) => {switchScreen(SCREEN_CREDITS)};
export const openAboutScreen            = ( ) => {switchScreen(SCREEN_ABOUT)};
export const openHelpScreen             = ( ) => {switchScreen(SCREEN_HELP)};
export const openRestoredPassScreen     = ( ) => {switchScreen(SCREEN_RESTORED_PASS)};
export const openSignedUpScreen         = ( ) => {switchScreen(SCREEN_SIGNED_UP)};

export const returnToPreviousScreen     = ( ) => {
    switch( get(currentScreen) ) {
        case SCREEN_FORGOT_PASSWORD:
        case SCREEN_VALIDATE_ACCOUNT:
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

export const loadGameFromJSON = (saveFile) => {
    setTimeout( ( ) => {
        loadGame(saveFile);
    }, 100);  
}

export const setErrorMessage = (message) =>{
    userMessage.set(message);
}