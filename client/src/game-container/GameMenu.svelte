<script>
    import Buttons from './buttons/Buttons.svelte'
    import Header from './header/Header.svelte'

    let currentScreen = "LOG_IN";

    let settingsAndData = {
        'playerName': "",
        'playerClass': " ",
        'showCinematics': true,
        'fullScreen': true
    }

    let menuScreens = {
        "LOG_IN" : [
            {
                "text": "Log in",
                "action": "Log in"
            },
            {
                "text": "Sign up",
                "action": "Sign up"
            }
        ],

        "MAIN_MENU" : [
            {
                "text": "New game",
                "action": "New game"
            },
            {
                "text": "Load game",
                "action": "Load game"
            },
            {
                "text": "Options",
                "action": "Options"
            },
            {
                "text": "Help",
                "action": "Help"
            },
            {
                "text": "Quit",
                "action": "Quit"
            }
        ]
    }
</script>

<div>
    <Header/>
    <Buttons/>
</div>