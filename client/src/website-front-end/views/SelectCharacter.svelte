<script lang="ts">
    import GoBackButton from '../svelte-partials/GoBackButton.svelte'
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import { MAP_IDS } from '../../resources/mapResources/mapIds'; 
    import { loadFilesAndStartGame } from '../../mainController';

    const startGameWithParams = ( ) => {
        const characterName = (document.getElementById('name-input') as HTMLInputElement).value;
        const startingMap = (document.getElementById('map-selection') as HTMLInputElement).value
        const runInDebugMode = (document.getElementById('enable-debug') as HTMLInputElement).checked;
        const disableStoryEvents = (document.getElementById('disable-story') as HTMLInputElement).checked;
        loadFilesAndStartGame( false, [characterName, null, startingMap, runInDebugMode, disableStoryEvents] );
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
        <p><label for="enable-debug">Run game in Debug mode</label><input id="enable-debug" name="enable-debug" type="checkbox" /></p>
        <p><label for="disable-story">Disable story cinematics</label><input id="disable-story" name="disable-story" type="checkbox" checked /></p>
        <p><label for="map-selection" >Select starting location</label><select id="map-selection" name="map-selection" >
            <option value={MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F3_APT}>Leonard Heights</option>
            <option value={MAP_IDS.MASTER_ROOMS.MASTER_ROOM_CHARACTERS}>Master rooms</option>
        </select></p>
    </div>
    <MainUiButton action={startGameWithParams} buttonText={"Let's go!"} clickable={true}/>
</div>