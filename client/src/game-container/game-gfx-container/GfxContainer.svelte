<script>
    import globals from '../../game-data/globals.js';
</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        background-color: black;
        justify-content: center;
        text-align: center;
    }

    .game-background-body {
        background-color: transparent;
        background-size: cover;
        margin: 0 auto;
        z-index: 0
    }

    .game-front-body {
        position: absolute;
        background-color: transparent;
        margin: 0 auto;
        z-index: 5
    }

    .do-not-display {
        display: none;
    }


</style>

<div class="game-gfx-container">

    <div id="intro-screen">
        <div>
            <h3>Neckbeard's nightmare</h3>
        </div>
    </div>

    <canvas id='game-background-canvas' class="game-background-body do-not-display" style="width: {globals.CANVAS_WIDTH}; height: {globals.CANVAS_HEIGHT}"></canvas>

    <canvas id='game-front-canvas' class="game-front-body do-not-display" style="width: {globals.CANVAS_WIDTH}; height: {globals.CANVAS_HEIGHT}"></canvas>


</div>