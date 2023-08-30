<script lang="ts">
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import SaveGameButton from "../svelte-partials/SaveGameButton.svelte";
    import type { SaveGame } from "../../models/SaveGameModel";
    import { activeUser } from '../../stores';
    import { onMount } from 'svelte';
    import { loadFilesAndStartGame } from '../../mainController';
    import { GameType } from '../../enumerables/GameType';
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

    const loadGame = (index: number): void => {
        const game = games[index];
        loadFilesAndStartGame(GameType.loadFromSave, [game]);
    }

    onMount(()=>{
        setSaveGames();
    })
</script>
<style>
    .load-game-div {
        width: 100vw;
        background-color: transparent;
        display: grid;
        grid-template-columns: [marginLeft] 20% [mainColumn] 60% [marginRight] 20% ;
        grid-template-rows: repeat(1, 1fr);
    }
    @media only screen and (max-width: 600px) {
        .load-game-div {
            grid-template-columns: [marginLeft] 5% [mainColumn] 90% [marginRight] 5% ;
        }
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
        {#each games as game, index}
            <div class="column"><SaveGameButton saveGame={game} inSaveGameMenu={false} index={index + 1} action={()=>loadGame(index)}/></div>
        {/each}
    </div>
</div>
