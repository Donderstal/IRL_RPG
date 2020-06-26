<script>
    import globals from '../game-data/globals.js';
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

    .canvas-wrapper {
        margin: 0 auto;
        display: block;
    }


</style>

<div class="game-gfx-container">

    <div class="canvas-wrapper" style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px">
        <canvas id='game-background-canvas' class="game-background-body" 
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>

        <canvas id='game-front-canvas' class="game-front-body" 
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>    
    </div>

</div>