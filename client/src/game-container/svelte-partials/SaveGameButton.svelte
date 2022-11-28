<script lang="ts">
    import { onMount } from 'svelte';

    import { MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET } from '../../game-data/globals';
    import type { SaveGame } from '../../models/SaveGameModel';
    import type { SpriteFrameModel } from '../../models/SpriteFrameModel';
    import ImageWithCaption from '../menu-partials/ImageWithCaption.svelte';
    import KeyValueGrid from '../menu-partials/KeyValueGrid.svelte';
    export let saveGame: SaveGame; 

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

    if ( saveGame !== null ) {
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

    const profileImageFrame: SpriteFrameModel = {
        x: 0,
        y: 0,
        width: MAP_SPRITE_WIDTH_IN_SHEET,
        height: MAP_SPRITE_HEIGHT_IN_SHEET
    }
</script>

<style>
    .grid-outer {
        background: #00384D 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        margin:5% 10%;
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
    .grid-outer-active:hover {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
    @media only screen and (max-width: 600px) {
        .grid-outer {
            width: 50vw;
            font-size: 3vh;
        }
    }

    .item-right-common {
        grid-column-start: rightColumn;
        grid-column-end: span 1;
        grid-row-start: topRow;
        grid-row-end: span 2;
        border-left: groove 1px white;
    }

    .image-item {
        grid-column-start: leftColumn;
        grid-column-end: span 1;
        grid-row-start: topRow;
        grid-row-end: span 2;
    }
</style>

<div class="grid-outer" class:grid-outer-active="{saveGame !== null}">
    <div class="image-item">
        <ImageWithCaption imageSrc={src} caption={name} frame={profileImageFrame}/>
    </div>
    <div class="item-right-common">
        <KeyValueGrid keyValuePairs={keyValuePairs} />  
    </div>
</div>