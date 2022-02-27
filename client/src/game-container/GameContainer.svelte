<script>
    import { onMount } from 'svelte';
    import globals, { GRID_BLOCK_PX } from '../game-data/globals.js';
    import LetterBoxDiv from './in-game-elements/LetterBoxDiv.svelte'
    import { addKeyToPressed, removeKeyFromPressed } from '../game/controls';

    const logClick = ( event ) => {
        globals.GAME.FRONT.allSprites.forEach( ( e ) => {
            if ( e.x <= event.offsetX && e.x + e.width >= event.offsetX 
            && e.y <= event.offsetY && e.y + e.height >= event.offsetY  ) {
                console.log(e)
            }
        });
        globals.GAME.BACK.grid.array.forEach( ( e ) => {
            if ( e.x <= event.offsetX && e.x + e.width >= event.offsetX 
            && e.y <= event.offsetY && e.y + e.height >= event.offsetY  ) {
                console.log(e)
            }
        });
    }

    onMount(()=>{
        if ( !globals.DISPLAY_MODE_PORTRAIT ) {
            return;
        }
        const left = document.getElementById("d-pad-left");
        const up = document.getElementById("d-pad-up");
        const right = document.getElementById("d-pad-right");
        const down = document.getElementById("d-pad-down");
        const action = document.getElementById("action-button");

        left.addEventListener("touchstart", (e)=>{ e.preventDefault(); addKeyToPressed({ key: "ArrowLeft" })}, false);
        up.addEventListener("touchstart", (e)=>{ e.preventDefault(); addKeyToPressed({ key: "ArrowUp"})}, false);
        right.addEventListener("touchstart", (e)=>{ e.preventDefault(); addKeyToPressed({ key: "ArrowRight"})}, false);
        down.addEventListener("touchstart", (e)=>{ e.preventDefault(); addKeyToPressed({ key: "ArrowDown"})}, false);
        action.addEventListener("touchstart", (e)=>{ e.preventDefault(); addKeyToPressed({ key: " "})}, false);

        left.addEventListener("touchend", (e)=>{ e.preventDefault(); removeKeyFromPressed({ key: "ArrowLeft"})}, false);
        up.addEventListener("touchend", (e)=>{ e.preventDefault(); removeKeyFromPressed({ key: "ArrowUp"})}, false);
        right.addEventListener("touchend", (e)=>{ e.preventDefault(); removeKeyFromPressed({ key: "ArrowRight"})}, false);
        down.addEventListener("touchend", (e)=>{ e.preventDefault(); removeKeyFromPressed({ key: "ArrowDown"})}, false);
        action.addEventListener("touchend", (e)=>{ e.preventDefault(); removeKeyFromPressed({ key: " "})}, false);
    })
</script>

<style>
    .game-gfx-container {
        z-index: 3;
        height: 100vh;
        width: 100vw;
        background: #00384D 0% 0% no-repeat padding-box;
    }
    canvas {
        position: absolute;
        margin: 0 auto;
        display: block;        
    }
    .game-background-body {
        background-size: cover;
        z-index: 4;
    }
    .game-front-body {
        z-index: 5
    }
    .game-front-tiles-body {
        z-index: 6
    }
    .game-menu-body {
        z-index: 7
    }
    .canvas-wrapper {
        margin: 0 auto;
    }
    .sprite-image {
        position: absolute;
        user-select: none;
    }
    .arrow-button-hori {
        max-width: 60px;
        top: 60px;
    }
    .arrow-button-vert { 
        max-height: 60px;
        left: 109px;
    }
    #d-pad-left {
        left: 60px;
    }
    #d-pad-up{
        top: 10px;
    }
    #d-pad-right{
        left: 140px;
    }    
    #d-pad-down{
        top: 91px;
    }
    #action-button {
        top: 30px;
        left: 220px;
        min-height: 90px;
        min-width: 90px;
    }
    @media only screen and (max-width: 768px) {
        .canvas-wrapper {
            position: absolute;
        }

        #buttons-div {
            z-index: 10;
            position: fixed;
            background-color: #C0C0C0;
            border-top: 8px groove black;
            width: 100vw;
            height: 100vh;
        }
    }
</style>

<div class="game-gfx-container">
    <LetterBoxDiv isTop={true} height={globals.GRID_BLOCK_PX * 2}/>

    <div id="canvas-wrapper" class="canvas-wrapper" style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px">
        <canvas id='game-background-canvas' class="game-background-body" 
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>

        <canvas id='game-front-canvas' class="game-front-body"
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>    

        <canvas id='game-front-grid-canvas' class="game-front-tiles-body" on:click={logClick}
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>    

        <canvas id='game-menu-canvas' class="game-menu-body"
        style="background-color: #00384D; visibility: hidden;"></canvas>    

        {#if globals.DISPLAY_MODE_PORTRAIT}
            <canvas id='game-bubble-canvas' class="game-menu-body"
            style="width: {globals.GRID_BLOCK_PX * 8}px; height: {globals.GRID_BLOCK_PX * 8}px; position: fixed; top: 0; left: 0; background-color: transparent;"></canvas>   
        {/if}
    </div>

    <LetterBoxDiv isTop={false} height={globals.GRID_BLOCK_PX * 2}/>

    <div style="visibility:hidden; display:none;">
        <canvas id='game-utility-canvas-back'></canvas>
        <canvas id='game-utility-canvas-front'></canvas>
        <canvas id='game-utility-canvas-menu'></canvas>
    </div>

    {#if globals.DISPLAY_MODE_PORTRAIT}
        <div id="buttons-div" style="top:{(GRID_BLOCK_PX * 8)}px;">
            <img alt="D pad image" id="d-pad-left" class="arrow-button-hori sprite-image" src="/static/ui/arrow-left.png"/>
            <img alt="D pad image" id="d-pad-up" class="arrow-button-vert sprite-image" src="/static/ui/arrow-up.png"/>
            <img alt="D pad image" id="d-pad-right" class="arrow-button-hori sprite-image" src="/static/ui/arrow-right.png"/>
            <img alt="D pad image" id="d-pad-down" class="arrow-button-vert sprite-image" src="/static/ui/arrow-down.png"/>
            <img alt="action button image" id="action-button" class="sprite-image" src="/static/ui/bubble-black.png"/>
        </div>
    {/if}
</div>