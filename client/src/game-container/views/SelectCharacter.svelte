<script>
    import GoBackButton from '../svelte-partials/GoBackButton.svelte'
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import { LH_NEWTOWN_APP_3_KEY } from '../../resources/mapResources/leonard_heights/leonard_heights_res'; 
    import { startGame } from '../../game/Game.js';

    const startGameWithParams = ( ) => {
        const characterName = document.getElementById('name-input').value;
        const startingMap = document.getElementById('map-selection').value
        const runInDebugMode = document.getElementById('enable-debug').checked;
        const disableStoryEvents = document.getElementById('disable-story').checked;
        startGame( characterName, null, startingMap, runInDebugMode, disableStoryEvents );
    }
</script>

<style>
    .select-character {
        height: 80vh;
        background-color: transparent;
    }

    .select-character-inner {
        max-width: 33vw;
        margin: 0 auto;
        align-items: center;
        color: white;
    }

    input {
        color:#D82BBA;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 4px solid #D82BBA;
        opacity: 1;
        font-size: 2.6vh
    }

    h2 {
        margin-bottom: 1vh;
    }

    p {
        font-family: "Lucida Console", Courier, monospace;
        font-size: 24px;
    }
    @media only screen and (max-width: 600px) {
        #instance-settings {
            visibility: hidden;
            display: none;
        }
        .select-character-inner {
            max-width: 100vw;
        }
    }
</style>

<div class="select-character">
    <GoBackButton/>
    <div class="select-character-inner">
        <h2>Enter your name</h2>
        <input id="name-input" type="text" placeholder="Player Name"/>
    </div>

    <div id="instance-settings" style="position:absolute; top:10%; left:5%;">
        <h4>Instance settings</h4>
        <p><label>Run game in Debug mode</label><input id="enable-debug" type="checkbox" /></p>
        <p><label>Disable story cinematics</label><input id="disable-story" type="checkbox" checked /></p>
        <p><label>Select starting location</label><select id="map-selection">
            <option value={LH_NEWTOWN_APP_3_KEY}>Lennart</option>
            <option value="test-maps/A1">Test movement</option>
            <option value="test-maps/B1">Test doors</option>
        </select></p>
    </div>
    <MainUiButton action={startGameWithParams} buttonText={"Let's go!"} />
</div>