<script>
    import utilFunctions from '../../helpers/utilFunctions'
    import GameBlockRow from './GameBlockRow.svelte'
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
        background-color: grey
    }

    .game-gfx-body {
        max-height: 600px;
        flex: 100%;
        display: flex;
        background-size: cover;
        flex-direction: column;
    }
</style>

<div class="game-gfx-container">
        
    <div id="game-gfx-body" class="game-gfx-body">
        {#each Array(16) as heightNum, i}
            <GameBlockRow 
                rowNum={i + 1} 
                rowConfig={passRowConfig(i + 1)}
                blockDimensions={blockDimensions} />
        {/each}
    </div>
</div>