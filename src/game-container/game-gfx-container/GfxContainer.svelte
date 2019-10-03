<script>
    import utilFunctions from '../../helpers/utilFunctions'
    import GameBlockRow from './GameBlockRow.svelte'
    import Player from './player/Player.svelte'
    import overWorld from '../../helpers/overWorldInfo/overWorlds.json'

    console.log(utilFunctions)

    /* utilFunctions.docReady(function() {
        console.log( document.getElementById("game-gfx-body"))

        const gridWidth     = document.getElementById("game-gfx-body").offsetWidth
        const gridHeight    = document.getElementById("game-gfx-body").offsetHeight

        const gridDimension = [ 48, 32 ]
        const blockDimensions = gridWidth / 48

        console.log(gridWidth / 24)
        console.log(gridHeight / 16)
        

    }); */

    function passRowConfig(rowNum) {
        return overWorld.overworld1[rowNum]
    }

    const blockDimensions = 1
</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        background-color: grey;
        justify-content: center;
        text-align: center;
    }

    .game-gfx-body {
        max-height: 600px;
        max-width: 900px;
        display: flex;
        background-size: cover;
        flex-direction: column;
        vertical-align: middle;
    }
</style>

<div class="game-gfx-container">
        
    <div id="game-gfx-body" class="game-gfx-body">
    <Player />
        {#each Array(16) as heightNum, i}
            <GameBlockRow 
                rowNum={i + 1} 
                rowConfig={passRowConfig(i + 1)}
                blockDimensions={blockDimensions} />
        {/each}
    </div>
</div>