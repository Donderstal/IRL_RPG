<script lang="ts">
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import SaveGameButton from "../svelte-partials/SaveGameButton.svelte";
    import type { SaveGame } from "../../models/SaveGameModel"
    import {LH_NEWTOWN_APP_NAME} from "../../resources/mapResources/leonard_heights/leonard_heights_res";

    const loadJsonFile = (event) => {
        let reader = new FileReader();
            reader.onload = (event) =>{
                SaveFile = JSON.parse(event.target.result);
            }
            reader.readAsText(event.target.files[0]);
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
</script>
<style>
    .load-game-div {
        height: 90vh;
        width: 100vw;
        background-color: transparent;
        display: grid;
        grid-template-columns: [marginLeft] 20% [mainColumn] 60% [marginRight] 20% ;
        grid-template-rows: [header] 10% [firstRow] 30% [secondRow] 30% [thirdRow] 30%;
    }

    .column {
        grid-column-start: mainColumn;
        grid-column-end: span 1;
        grid-row-end: span 1;
    }

    .one {
        grid-row-start: header;
    }

    .one {
        grid-row-start: firstRow;
    }

    .two {
        grid-row-start: secondRow;
    }

    .three {
        grid-row-start: thirdRow;
    }
</style>

<div>
    <GoBackButton/>
    <div class="load-game-div">
        <div class="column header"><h2>LOAD GAME</h2></div>
        <div class="column one"><SaveGameButton saveGame={mockSave}/></div>
        <div class="column two"><SaveGameButton saveGame={null}/></div>
        <div class="column three"><SaveGameButton saveGame={null}/></div>
    </div>
</div>
