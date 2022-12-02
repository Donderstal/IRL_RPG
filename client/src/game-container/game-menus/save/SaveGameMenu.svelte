<script lang="ts">
    import SaveGameButton from "../../svelte-partials/SaveGameButton.svelte";
    import GoBackButton from '../../svelte-partials/GoBackButton.svelte'

    import type { SaveGame } from "../../../models/SaveGameModel";
    import { activeUser } from '../../stores';
    import { onMount } from 'svelte';
    import { mobileAgent } from '../../../helpers/screenOrientation';
    import { save } from '../../../game/mainController';

    let games = [];
    let activeIndex = null;

    let closeMenuButton = null;
    let firstSaveButton = null;
    let secondSaveButton = null;
    let thirdSaveButton = null;

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
            console.log(saveGame)
            games.push(saveGame);
        })
    }

    const setActiveIndex = ( index: number ): void => {
        deactivateActiveButton();
        activeIndex = index;
        activateButtonAtIndex();
    }

    const deactivateActiveButton = (): void => {
        switch( activeIndex ) {
            case 0:
                closeMenuButton.markAsUnselected();
                break;
            case 1:
                firstSaveButton.markAsUnselected();
                break;
            case 2:
                secondSaveButton.markAsUnselected();
                break;
            case 3:
                thirdSaveButton.markAsUnselected();
                break;
        }
    }

    const activateButtonAtIndex = (): void => {
        switch( activeIndex ) {
            case 0:
                closeMenuButton.markAsSelected();
                break;
            case 1:
                firstSaveButton.markAsSelected();
                break;
            case 2:
                secondSaveButton.markAsSelected();
                break;
            case 3:
                thirdSaveButton.markAsSelected();
                break;
        }
    }

    const handleKeyPress = (event: KeyboardEvent): void => {
        if ( !mobileAgent ) {
            if ( event.key === "w" || event.key === "ArrowUp" ) {
                const nextIndex = activeIndex === 1 ? 3 : activeIndex - 1;
                setActiveIndex(nextIndex);
            }
            else if ( event.key === "s" || event.key === "ArrowDown" ) {
                const nextIndex = activeIndex === 3 ? 1 : activeIndex + 1;
                setActiveIndex(nextIndex);
            }
            else if ( event.key === "a" || event.key === "ArrowLeft" ) {
                setActiveIndex(0);
            }
            else if ( event.key === "d" || event.key === "ArrowRight" ) {
                setActiveIndex(1);
            }
            else if ( event.key === " " ) {
                openConfirmationModel(activeIndex);
            }
        }
    }

    const openConfirmationModel = (index = activeIndex): void => {
        save(index);
    }

    onMount(()=>{
        setSaveGames();
        setTimeout(()=>{ setActiveIndex(1); }, 100);
        document.addEventListener("keypress", handleKeyPress)
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
<div>
    <GoBackButton on:mouseenter={()=>{setActiveIndex(0)}} bind:this={closeMenuButton} />
    <div class="save-game-div">
        <div on:mouseenter={()=>{setActiveIndex(1);}} class="item">
            <SaveGameButton bind:this={firstSaveButton} saveGame={games[0]} index={1} inSaveGameMenu={true} action={openConfirmationModel}/>
        </div>
        <div on:mouseenter={()=>{setActiveIndex(2);}} class="item">
            <SaveGameButton bind:this={secondSaveButton} saveGame={games[1]} index={2} inSaveGameMenu={true} action={openConfirmationModel}/>
        </div>
        <div on:mouseenter={()=>{setActiveIndex(3);}} class="item">
            <SaveGameButton bind:this={thirdSaveButton} saveGame={games[2]} index={3} inSaveGameMenu={true} action={openConfirmationModel}/>
        </div>
    </div>
</div>