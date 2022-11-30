<script lang="ts">
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import SaveGameButton from "../svelte-partials/SaveGameButton.svelte";
    import type { SaveGame } from "../../models/SaveGameModel"
    import {LH_NEWTOWN_APP_NAME} from "../../resources/mapResources/leonard_heights/leonard_heights_res";
    import { activeUser } from '../stores';
    import { onMount } from 'svelte';
    let games = [];

    export const setSaveGames = () => {
        games = [];
        [ $activeUser.save_1, $activeUser.save_2, $activeUser.save_3 ].forEach((e)=>{
            let saveGame: SaveGame = null;
            if ( e !== null ) {
                saveGame = {
                    time: e["time"],
                    playerData: e["playerData"],
                    activeMap: e["activeMap"],
                    keyLists: e["keyLists"]
                }
            }

            games.push(saveGame);
        })
    }

    const mockSave: SaveGame = {
        time: new Date().toDateString(),
        playerData: { name: "Bertje" },
        activeMap: { mapName: "Test", location: LH_NEWTOWN_APP_NAME },
        keyLists: {
            storyEvents: [],
            interactionRegistry: {},
            unlockedDoors: [],
            collectableRegistry: {
                coins: [ "1", "2" ],
                juiceCans: [ "1", "2", "3" ]
            }
        }
    }

    onMount(()=>{
        setSaveGames();
    })
</script>
<style>
    .load-game-div {
        height: 90vh;
        width: 100vw;
        background-color: transparent;
        display: grid;
        grid-template-columns: [marginLeft] 20% [mainColumn] 60% [marginRight] 20% ;
        grid-template-rows: repeat(1, 1fr);
    }

    .column {
        grid-column-start: mainColumn;
        grid-column-end: span 1;
        max-height: 25vh;
    }
</style>

<div>
    <GoBackButton/>
    <div class="load-game-div">
        <div class="column"><h2>LOAD GAME</h2></div>
        {#each games as game}
            <div class="column"><SaveGameButton saveGame={game}/></div>
        {/each}
    </div>
</div>
