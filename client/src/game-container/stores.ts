import { writable, get } from 'svelte/store';
import { GameMenuState } from '../enumerables/GameMenuState';
import type { WebsiteUser } from '../models/WebsiteUserModel';

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

export const setUserDataToFrontEnd = ( json ) => {
    const user: WebsiteUser = {
        name: json[0],
        email: json[1],
        accountCreated: json[2],
        lastLogin: json[3],
        save_1: json[4] != null ? JSON.parse( json[4] ) : null,
        save_2: json[5] != null ? JSON.parse( json[5] ) : null,
        save_3: json[6] != null ? JSON.parse( json[6] ) : null
    }
    activeUser.set( user );
    loggedIn.set(true);
    currentScreen.set(SCREEN_MAIN_MENU)
}

export const loggedIn       = writable<boolean>();
export const activeUser     = writable<WebsiteUser>();
export const currentScreen  = writable<string>();
checkForUserSession();

export const userMessage = writable( false );

export const websiteMode    = writable( true );
export const gameMode = writable( false );

export const gameMenuState   = writable( GameMenuState.none )

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

export const closeGameMenu = () => { gameMenuState.set( GameMenuState.none ) };
export const openSaveMenu = () => { gameMenuState.set( GameMenuState.save ) };
export const openGameMenu = () => { gameMenuState.set( GameMenuState.menu ) };

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

export const setErrorMessage = (message) =>{
    userMessage.set(message);
}