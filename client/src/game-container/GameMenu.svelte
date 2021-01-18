<script>
    import startGame from './../game/startGame.js';
    import globals from './../game-data/globals.js';
    import utilFunctions from './../helpers/utilFunctions.js'
    import Sound from './../game/interfaces/I_Sound.js'

    import MainUiButton from './svelte-partials/MainUiButton.svelte'
    import SelectCharacter from './svelte-partials/SelectCharacter.svelte'
    import Header from './header/Header.svelte'

    export let closeMainMenu;

    let currentScreen = "LOG_IN";
    let menuScreens = {
        "LOG_IN" : [ "Log in", "Sign up" ],
        "MAIN_MENU" : [ "New game", "Load game", "Options", "Help", "Quit" ],
        "NEW_GAME" : [ "Let's go!" ],
        "OPTIONS" : [ "Audio", "Cinematics", "Difficulty", "Back" ],
        "HELP" : [ "About", "Controls", "Credits", "Back" ]
    }

    let mainMenuMusic;

    const classNames = {
        "LOREM" : "NECKBEARD", "IPSUM" : "INFLUENCER", "DOLOR" : "CHAD", "SIT AMET" : "TUMBLR_GIRL"
    };

    const startGameWithParams = ( ) => {
        mainMenuMusic.stop()
        const characterName = document.getElementById('name-input').value;
        const characterClass = classNames[document.getElementById('active-class').innerText].toLowerCase();
        let mode = 'normal';
        closeMainMenu( )
        setTimeout( ( ) => {
            startGame.startGame( characterName, characterClass, mode );
        }, 1000)
    }
    const getButtonAction = ( buttonId ) => {
        switch( buttonId ) {
            case 'Log_in_button': 
                document.getElementsByClassName("background-large")[0].style.display = "block";
                document.getElementsByClassName("background-small")[0].style.display = "none";
                mainMenuMusic = new Sound.Sound( "game-jam.mp3", false, false, true )
                mainMenuMusic.play()
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
                document.getElementsByClassName("background-small")[0].style.display = "block";
                document.getElementsByClassName("background-large")[0].style.display = "none";
                currentScreen ="LOG_IN";
                break;
            case "Let's_go!_button" :
                startGameWithParams();
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

<style>
    div {
        z-index: 2;
        color: white;
    }

    .dont-have-account {
        font-family: "Lucida Console", Courier, monospace;
        font-size: 24px;
        margin-top: 5vh;
    }

    .or-div {
        margin-top: 10vh;
        margin-bottom: 10vh;
    }
</style>

<div>
    { #if currentScreen != "NEW_GAME"}
        <Header/>
        <audio id="main-audio" src="/static/music/game-jam.mp3"></audio>
    { :else }        
        <SelectCharacter returnToPreviousScreen={ ( ) => { getButtonAction( "Back_button" )} } />
    {/if}
    { #each menuScreens[currentScreen] as buttonText }
        { #if buttonText == "Sign up"}
        <div class="or-div">
            <p>
            Or
            </p>
        </div>
        <div>
            <p class='dont-have-account'>
            Dont have an account?
            </p>
        </div>
        {/if}
        <MainUiButton 
            elementId={buttonText.replace(" ", "_") + "_button"} 
            action={ ( ) => {
                getButtonAction( buttonText.replace(" ", "_") + "_button" )
            } } 
            buttonText={buttonText} 
        />
    {/each}
</div>