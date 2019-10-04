<script>
    import utilFunctions from '../../helpers/utilFunctions'
    /* import GameBlockRow from './GameBlockRow.svelte'
    import Player from './player/Player.svelte' */
    import overWorld from '../../helpers/overWorldInfo/overWorlds.json'

    console.log(utilFunctions)

    utilFunctions.docReady(function() {

        initCanvas()

    });

    function initCanvas() {
        const gameCanvas    = document.getElementById("game-canvas")
        const ctx       = gameCanvas.getContext('2d')
        ctx.canvas.height   = 592
        ctx.canvas.width    = 888
        const canvHeight    = ctx.canvas.height
        const canvWidth     = ctx.canvas.width

        drawGrid(ctx, canvWidth, canvHeight, overWorld)

    }

    function drawGrid(ctx, canvWidth, canvHeight, overWorld) {
        const vertiGrid = canvHeight / 16
        const horiGrid  = canvWidth / 24
        let vertAccumulator = 0
        let horiAccumulator = 0

        let currWorld = overWorld.overworld1

        for ( var i = 0; i < 16; i++ ) {
            horiAccumulator = 0
            const currWorldRow = currWorld[ i + 1 ]

            if ( i !== 0) {
                vertAccumulator += vertiGrid                
            }

            for ( var j = 0; j < 24; j++ ) {
                let imageSrc = currWorldRow[ j + 1 ]
                let bgImage = new Image()
                
                bgImage.onload = function() {
                    ctx.drawImage(bgImage, 0, 0, horiGrid, vertiGrid)                
                }

                bgImage.src = imageSrc
                ctx.beginPath()
                ctx.rect(horiAccumulator, vertAccumulator, horiGrid, vertiGrid)
                ctx.stroke()
                horiAccumulator += horiGrid
            }

        }

    }

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
        height: 592px;
        width: 888px;
        background-color: white;
        display: flex;
        background-size: cover;
        flex-direction: column;
        vertical-align: middle;
        margin: 0 auto;
    }
</style>

<div class="game-gfx-container">
    <canvas id="game-canvas" class="game-gfx-body">
    
    </canvas>
</div>


<!--     <div id="game-gfx-body" class="game-gfx-body">
    <Player />
        {#each Array(16) as heightNum, i}
            <GameBlockRow 
                rowNum={i + 1} 
                rowConfig={passRowConfig(i + 1)}
                blockDimensions={blockDimensions} />
        {/each}
    </div> -->