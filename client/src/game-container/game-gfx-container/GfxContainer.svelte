<script>
    import startGame from '../../game/startGame'    
    export let classList;

</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        height: 864px;
        width: 1296px;
        background-color: black;
        justify-content: center;
        text-align: center;
    }

    .game-background-body {
        height: 864px;
        width: 1296px;
        background-color: transparent;
        background-size: cover;
        margin: 0 auto;
        z-index: 0
    }

    .game-front-body {
        position: absolute;
        height: 864px;
        width: 1296px;
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

        <div>
            <button on:click={ startGame.startGame }  >
                New game
            </button>
            <button on:click={ startGame.startGame }  >
                Load game
            </button>
        </div>

    </div>

    <canvas id='game-background-canvas' class="game-background-body do-not-display" ></canvas>

    <canvas id='game-front-canvas' class="game-front-body do-not-display" ></canvas>


</div>