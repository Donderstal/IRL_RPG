<script lang="ts">
    import { onMount } from 'svelte';

    import { MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET } from '../../game-data/globals';
    import type { SaveGame } from '../../models/SaveGameModel';
    import type { SpriteFrameModel } from '../../models/SpriteFrameModel';
    import ImageWithCaption from '../menu-partials/ImageWithCaption.svelte';
    import KeyValueGrid from '../menu-partials/KeyValueGrid.svelte';

    export let index: number;
    export let saveGame: SaveGame; 
    export let inSaveGameMenu: boolean;
    export let action;

    let coins = 0;
    let cans = 0;
    let location = null;
    let name = null;
    let date = null;
    let src = null;
    let keyValuePairs = [
        [ "Date", null ],
        [ "Location", null ],
        [ "Coins", 0 ],
        [ "Cans", 0 ]
    ];
    let selected = false;

    const profileImageFrame: SpriteFrameModel = {
        x: 0,
        y: 0,
        width: MAP_SPRITE_WIDTH_IN_SHEET,
        height: MAP_SPRITE_HEIGHT_IN_SHEET
    }

    export const markAsSelected = (): void => {
        selected = true;
    }
    export const markAsUnselected = (): void => {
        selected = false;
    }
    export const hasSaveGameSet = (): boolean => {
        return saveGame !== null && saveGame !== undefined;
    }

    export const setSaveGameToButton = (save: SaveGame): void => {
        saveGame = save;
        setData();
    }

    const handleAction = (): void =>{
        action(index);
    }

    const setData = (): void => {
        if ( saveGame !== null && saveGame !== undefined ) {
            coins = saveGame.keyLists.collectableRegistry.coins.length;
            cans = saveGame.keyLists.collectableRegistry.juiceCans.length;
            location = saveGame.activeMap.location;
            name = saveGame.playerData.name;
            date = saveGame.time;
            src = "/static/sprites/Main_Character.png";
            keyValuePairs = [
                [ "Date", saveGame.time],
                [ "Location", saveGame.activeMap.location ],
                [ "Coins", saveGame.keyLists.collectableRegistry.coins.length ],
                [ "Cans", saveGame.keyLists.collectableRegistry.juiceCans.length ]
            ]
        }
    }

    onMount(()=>{
        setData()
    });
    setData();
</script>

<style>
    .grid-outer {
        background: #00384D 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        margin: 5% 10%;
        width: 80%;
        height: 80%;
        border: none;
        z-index: 5;
        border: groove 1px #D82BBA;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;

        display: grid;
        grid-template-columns: [marginLeft] 5% [leftColumn] 30% [rightColumn] 60% [marginRight] 5% ;
        grid-template-rows: [marginTop] 5% [topRow] 45% [bottomRow] 45% [marginBottom] 5%;
    }
    .grid-outer-active:hover, .selected {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
    
    .info-grid-item {
        grid-column-start: rightColumn;
        grid-column-end: span 1;
        grid-row-start: topRow;
        grid-row-end: span 2;
    }

    .image-item {
        grid-column-start: leftColumn;
        grid-column-end: span 1;
        grid-row-start: topRow;
        grid-row-end: span 2;
    }

    .empty-header-wrapper {
        grid-column-start: leftColumn;
        grid-column-end: span 2;
        grid-row-start: topRow;
        grid-row-end: span 2;
    }

    @media only screen and (max-width: 600px) {
        .grid-outer {
            font-size: 3vh;
            margin: 5% 0;
            width: 100%;
            height: 95%;
            grid-template-columns: [leftColumn] 30% [rightColumn] 70%;
        }
    }

    @media only screen and (max-height: 600px) {
        .grid-outer {
            font-size: 5vh;
            margin: 5% 5%;
            width: 90%;
            height: 90%;
            grid-template-columns: [leftMargin] 5% [column] 90% [rightMargin] 5%;
            grid-template-rows: [marginTop] 5% [topRow] 45% [bottomRow] 45% [marginBottom] 5%;
        }        
        .image-item {
            grid-column-start: column;
            grid-column-end: span 1;
            grid-row-start: topRow;
            grid-row-end: span 1;
        }
        .info-grid-item {
            grid-column-start: column;
            grid-column-end: span 1;
            grid-row-start: bottomRow;
            grid-row-end: span 1;
            border-top: groove 1px white;
        }
        .empty-header-wrapper {
            grid-column-start: column;
            grid-column-end: span 1;
            grid-row-start: bottomRow;
            grid-row-end: span 2;
        }
    }

    span {
        margin: 1vw;
        position: absolute;
    }
</style>


<div class="grid-outer" class:grid-outer-active="{saveGame !== null || inSaveGameMenu}" class:selected="{selected}"
    on:click={handleAction} on:touchstart={handleAction}>
    {#key saveGame}
    <span>{index}</span>
    {#if saveGame !== null}
        <div class="image-item">
            <ImageWithCaption imageSrc={src} caption={name} frame={profileImageFrame}/>
        </div>
        <div class="info-grid-item">
            <KeyValueGrid keyValuePairs={keyValuePairs} />  
        </div>
    {:else}
        <div class="empty-header-wrapper"><h2>Empty</h2></div>
    {/if}
    {/key}
</div>

