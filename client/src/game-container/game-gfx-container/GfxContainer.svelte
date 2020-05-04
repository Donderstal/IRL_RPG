<script>
    import globals from '../../game-data/globals.js';
</script>

<style>
    .game-gfx-container {
        background-color: black;
        text-align: center;
        height: 100vh;
        width: 100vw;
    }

    canvas {
        position: absolute;
    }

    .game-background-body {
        background-color: transparent;
        background-size: cover;
        margin: 0 auto;
        z-index: 0
    }

    .game-front-body {
        background-color: transparent;
        margin: 0 auto;
        z-index: 5
    }

    .do-not-display {
        display: none;
    }

    .canvas-wrapper {
        margin: 0 auto;
        display: block;
    }


</style>

<div class="game-gfx-container">

    <div class="canvas-wrapper" style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px">
        <canvas id='game-background-canvas' class="game-background-body do-not-display" 
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>

        <canvas id='game-front-canvas' class="game-front-body do-not-display" 
        style="width: {globals.CANVAS_WIDTH}px; height: {globals.CANVAS_HEIGHT}px"></canvas>    
    </div>

</div>