<script>
    import { onMount } from 'svelte';
    import globals, { GRID_BLOCK_PX } from '../game-data/globals';
    import { addKeyToPressed, removeKeyFromPressed } from '../game/controls';
    import { closeGameCanvas } from '../helpers/DOMEventHelpers';
    import { mobileAgent } from '../helpers/screenOrientation'
    import { getAllActiveSprites } from '../game/modules/sprites/spriteGetter';

    const logClick = ( event ) => {
        getAllActiveSprites().forEach( ( e ) => {
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
        if ( !mobileAgent ) {
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

    const buttonsDivsMaxWidth = ((screen.width < screen.height ? screen.height : screen.width) - (GRID_BLOCK_PX * 8)) / 2;
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
        background: #00384D 0% 0% no-repeat padding-box;
    }
    .canvas-wrapper {
        margin: 0 auto;
        position: absolute;
    }
    .sprite-image {
        position: absolute;
        user-select: none;
    }
    .sprite-image-inner {
        max-width: 2rem;
        position: relative;
        user-select: none;
    }
    .arrow-button-hori {
        max-width: 4rem;
        top: 45%;
    }
    .arrow-button-vert { 
        max-height: 4rem;
        left: 37%;
    }
    #d-pad-left {
        left: 5%;
    }
    #d-pad-up{
        top: 32%;
    }
    #d-pad-right{
        left: 57%;
    }    
    #d-pad-down{
        top: 53%;
    }
    #action-button {
        top: 40%;
        right: 6vw;
        min-height: 5rem;
        min-width: 5rem;
    }
    @media only screen and (max-width: 914px) {
        #buttons-div {
            z-index: 4;
            position: fixed;
            background-color: transparent;
            left: 0px;
            width: 100vw;
            height: 100vh;
        }

        .right-buttons {
            right: 0px;
            position: absolute;
            height: 100%;
            width: 160px;
        }

        .left-buttons {
            height: 100%;
            width: 160px;
            left: 0px;
            position: absolute;
        }

        p {
            margin-top: 0;
        }

        span {
            margin-top: 30vh;
            display: block;
        }
        h3 {
            margin-top: 33vh;
            padding: 2vw;
        }
    }
    button {
        color:white;
        max-width: 15vw;
        max-height: 10vh;
        position: fixed;
        z-index: 5;
        right: 1vw;
        top: 1vh;
        background-color: rgba(0, 56, 77, 0.1);
    }
</style>

<div class="game-gfx-container">
    <div id="canvas-wrapper" class="canvas-wrapper" style="width: {document.documentElement.width}px; height: {document.documentElement.height}px">
        <canvas id='game-canvas' class="game-background-body" on:click={logClick}
        style="width: {document.documentElement.width}px; height: {document.documentElement.height}px"></canvas>
        <button on:click={closeGameCanvas} type="button">Close</button>
    </div>

    {#if mobileAgent}
        <div id="buttons-div" >
            <p id="buttons-div-left" class="left-buttons" style="max-width:{buttonsDivsMaxWidth}px">
                <img alt="D pad image" id="d-pad-left" class="arrow-button-hori sprite-image" src="/static/ui/arrow-left.png"/>
                <img alt="D pad image" id="d-pad-up" class="arrow-button-vert sprite-image" src="/static/ui/arrow-up.png"/>
                <img alt="D pad image" id="d-pad-right" class="arrow-button-hori sprite-image" src="/static/ui/arrow-right.png"/>
                <img alt="D pad image" id="d-pad-down" class="arrow-button-vert sprite-image" src="/static/ui/arrow-down.png"/>
            </p>
            <p id="buttons-div-right" class="right-buttons" style="max-width:{buttonsDivsMaxWidth}px">
                <span>
                    <img alt="D pad image" class="sprite-image-inner" src="/static/ui/arrow-right.png"/>
                    <img alt="D pad image" class="sprite-image-inner" src="/static/ui/arrow-left.png"/>
                </span>
                <img alt="action button image" id="action-button" class="sprite-image" src="/static/ui/bubble-black.png"/>
            </p>
        </div>
    {/if}
</div>