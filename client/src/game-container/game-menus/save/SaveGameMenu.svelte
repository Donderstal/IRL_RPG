<script lang="ts">
    import SaveGameButton from "../../svelte-partials/SaveGameButton.svelte";
    import type { SaveGame } from "../../../models/SaveGameModel";
    import { activeUser } from '../../stores';
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

    onMount(()=>{
        setSaveGames();
    })
</script>
<style>
    .save-game-div {
        display: grid;
        width: 100vw;
    }

    @media only screen and (max-height: 600px) {
        .save-game-div {
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: [marginTop] 1% [mainRow] 98% [marginBottom] 1% ;
        }
        .item {
            grid-row-start: mainRow;
            grid-row-end: span 1;
            width: 33vw;
            height: 85vh;
        }
    }

    @media only screen and (min-height: 600px) {
        .save-game-div {
            grid-template-columns: [marginLeft] 20% [mainColumn] 60% [marginRight] 20% ;
            grid-template-rows: repeat(1, 1fr);
        }
        .item {
            grid-column-start: mainColumn;
            grid-column-end: span 1;
            max-height: 25vh;
        }
    }
</style>
<div >
    <div class="save-game-div">
        {#each games as game, index}
            <div class="item"><SaveGameButton saveGame={game} index={index + 1} inSaveGameMenu={true}/></div>
        {/each}
    </div>
</div>