<script>
    import { startGame, loadGame } from './../game/Game.js';
    import MainUiButton from './svelte-partials/MainUiButton.svelte'
    import SelectCharacter from './views/SelectCharacter.svelte'
    import Header from './header/Header.svelte'
    import LoadGame from './views/LoadGame.svelte';
    import UserTab from './svelte-partials/UserTab.svelte'

    export let closeMainMenu;
    let SaveFile = false;
    let currentScreen = "MAIN_MENU";
    let menuScreens = {
        "MAIN_MENU" : [ "New game", "Load game", "Options", "Help", "Quit" ],
        "NEW_GAME" : [ "Let's go!" ],
        "LOAD_GAME" : [ "Let's go!" ],
        "OPTIONS" : [ "Audio", "Cinematics", "Difficulty", "Back" ],
        "HELP" : [ "About", "Controls", "Credits", "Back" ]
    }

    const classNames = {
        "LOREM" : "NECKBEARD", "IPSUM" : "INFLUENCER", "DOLOR" : "CHAD", "SIT AMET" : "TUMBLR_GIRL"
    };

    const startGameWithParams = ( ) => {
        const characterName = document.getElementById('name-input').value;
        const characterClass = classNames[document.getElementById('active-class').innerText].toLowerCase();
        const startingMap = document.getElementById('map-selection').value
        const runInDebugMode = document.getElementById('enable-debug').checked;
        const disableStoryEvents = document.getElementById('disable-story').checked;
        closeMainMenu( )
        setTimeout( ( ) => {
            startGame( characterName, characterClass, startingMap, runInDebugMode, disableStoryEvents );
        }, 1000)
    }

    const loadGameFromJSON = ( ) => {
        if ( SaveFile ) {
            closeMainMenu( );
            setTimeout( ( ) => {
                loadGame(SaveFile);
            }, 1000);           
        }
    }
    const getButtonAction = ( buttonId ) => {
        switch( buttonId ) {
            case 'New_game_button': 
                currentScreen = "NEW_GAME";
                break;
            case 'Load_game_button':
                currentScreen = "LOAD_GAME";
                break;
            case 'Options_button':
                currentScreen = "OPTIONS";
                break;
            case 'Help_button':
                currentScreen = "HELP";
                break;
            case 'Quit_button':
                document.getElementsByClassName("background-small")[0].style.display = "block";
                document.getElementsByClassName("background-large")[0].style.display = "none";
                currentScreen ="LOG_IN";
                break;
            case "Let's_go!_button" :
                if ( currentScreen == "NEW_GAME" ) {
                    startGameWithParams();
                }
                else {
                    loadGameFromJSON();
                }
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
            case "Log_out_button" :
                fetch( '/log-out', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({'logout': true})
                }).then(res => {
                    window.location.replace("http://localhost:5000/login");
                });
                break;
            default:
                console.log("Unkown button ID: " + buttonId);
                break;
        }
    }
</script>
<style>
    div {
        z-index: 2;
        color: white;
    }
</style>
<div >
    <UserTab
        buttonId={"Log_out_button"} 
        buttonAction={ ( ) => {
            getButtonAction( "Log_out_button" )
        } } 
        buttonText={"Log out"} 
    />
    { #if currentScreen == "NEW_GAME"}
        <SelectCharacter returnToPreviousScreen={ ( ) => { getButtonAction( "Back_button" )} } />
    { :else if currentScreen == "LOAD_GAME"}
        <LoadGame  bind:SaveFile={SaveFile} returnToPreviousScreen={ ( ) => { getButtonAction( "Back_button" )} } />
    { :else }  
        <Header/>     
    {/if}
    { #each menuScreens[currentScreen] as buttonText }
        <div>
            <MainUiButton 
                elementId={buttonText.replace(" ", "_") + "_button"} 
                action={ ( ) => {
                    getButtonAction( buttonText.replace(" ", "_") + "_button" )
                } } 
                buttonText={buttonText} 
            />            
        </div>
    {/each}
</div>