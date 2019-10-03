<script>
    import GfxBlock from './GfxBlock.svelte'

    export let blockDimensions
    export let rowNum
    export let rowConfig

    function passColConfig(colNum) {
        return rowConfig[colNum]
    }

</script>

<style>
    .game-block-row {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 37.5px;
    }
</style>

<div class="game-block-row">
    {#each Array(24) as widthNum, i}
        <GfxBlock 
            colNum={i + 1}
            rowNum={rowNum}
            colConfig={passColConfig(i + 1)}
            blockDimensions={blockDimensions} />
    {/each}
</div>