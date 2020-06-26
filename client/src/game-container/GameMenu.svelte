<script>
    import stateLogger from './../game-data/saveState.js';
    import startGame from './../game/startGame.js';
    import globals from './../game-data/globals.js';
    import utilFunctions from './../helpers/utilFunctions.js'

    import MainUiButton from './svelte-partials/main-ui-button.svelte'
    import Header from './header/Header.svelte'

    let currentScreen = "LOG_IN";

    let settingsAndData = {
        'playerName': "",
        'playerClass': " ",
        'showCinematics': true,
        'fullScreen': true
    }

    let menuScreens = {
        "LOG_IN" : [ "Log in", "Sign up" ],
        "MAIN_MENU" : [ "New game", "Load game", "Options", "Help", "Quit" ],
        "NEW_GAME" : [ "Let's go!" ],
        "OPTIONS" : [ "Audio", "Cinematics", "Difficulty", "Back" ],
        "HELP" : [ "About", "Controls", "Credits", "Back" ]
    }

    const getButtonAction = ( buttonId ) => {
        switch( buttonId ) {
            case 'Log_in_button': 
                currentScreen = "MAIN_MENU";
                break;
            case 'Sign_up_button':
                console.log('Sign up and give me money');
                break;
            case 'New_game_button': 
                currentScreen = "NEW_GAME";
                break;
            case 'Load_game_button':
                console.log('Loading game...');
                break;
            case 'Options_button':
                currentScreen = "OPTIONS";
                break;
            case 'Help_button':
                currentScreen = "HELP";
                break;
            case 'Quit_button':
                currentScreen ="LOG_IN";
                break;
            case "Let's_go!_button" :
                console.log("Let's go!");
                break;
            case "Audio_button" :
                console.log("Audio");
                break;
            case "Cinematics_button" : 
                console.log("Cinematics");
                break;
            case "Difficulty_button" :
                console.log('Difficulty');
                break;
            case "Back_button" : 
                currentScreen = "MAIN_MENU";
                break;
            case "About_button" :
                console.log("About");
                break;
            case "Controls_button" : 
                console.log('Controls');
                break;
            case "Credits_button" :
                console.log("Credits");
                break;
            default:
                console.log("Unkown button ID: " + buttonId);
                break;
        }
    }
</script>

<div>
    <Header/>
    { #each menuScreens[currentScreen] as buttonText }
        <MainUiButton 
            elementId={buttonText.replace(" ", "_") + "_button"} 
            action={ ( ) => {
                getButtonAction( buttonText.replace(" ", "_") + "_button" )
            } } 
            buttonText={buttonText} 
        />
    {/each}
</div>