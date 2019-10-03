<script>
    import utilFunctions from '../../helpers/utilFunctions'
    import GameBlockRow from './GameBlockRow.svelte'

    console.log(utilFunctions)

    utilFunctions.docReady(function() {

        const gridWidth     = document.getElementById("game-gfx-body").offsetWidth
        const gridHeight    = document.getElementById("game-gfx-body").offsetHeight
        const gridDimension = [ 48, 32 ]
        const blockDimensions = gridWidth / 48

        console.log(gridWidth / 24)
        console.log(gridHeight / 16)
        

    });

    const flex_wrap = 100 / 32

    const blockDimensions = 2
</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        background-color: #800080
    }

    .game-gfx-header {
        flex: 5%;
        padding: 1rem;
    }

    .game-gfx-body {
        max-height: 600px;
        flex: 95%;
                display: flex;
        flex-direction: column;
    }

    p {
        text-align: center;
    }

    h3 {
        text-align: center;
        display: block;
        margin: 0 auto;
		color: white;
    }
</style>

<div class="game-gfx-container">
    <div class="game-gfx-header">        
        <h3>Choose your class!</h3>
    </div>            
    <div 
        
        id="game-gfx-body" class="game-gfx-body">
        {#each Array(16) as heightNum, i}
            <GameBlockRow rowNum={i + 1} blockDimensions={blockDimensions} />
        {/each}
    </div>
</div>