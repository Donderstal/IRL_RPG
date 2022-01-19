<script>
    import globals from '../game-data/globals.js';
    import LetterBoxDiv from './in-game-elements/LetterBoxDiv.svelte'

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
</script>

<style>
    .game-gfx-container {
        z-index: 3;
        height: 100vh;
        width: 100vw;
        background-color: transparent;
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

    .canvas-wrapper {
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    }


</style>

<div class="game-gfx-container">
    <LetterBoxDiv isTop={true} height={globals.GRID_BLOCK_PX * 2}/>

    <div class="canvas-wrapper" style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px">
        <canvas id='game-background-canvas' class="game-background-body" 
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>

        <canvas id='game-front-canvas' class="game-front-body"
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>    

        <canvas id='game-front-grid-canvas' class="game-front-tiles-body" on:click={logClick}
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>    
    </div>

    <LetterBoxDiv isTop={false} height={globals.GRID_BLOCK_PX * 2}/>

    <div style="visibility:hidden; display:none;">
        <canvas id='game-utility-canvas-back'></canvas>
        <canvas id='game-utility-canvas-front'></canvas>
    </div>
</div>