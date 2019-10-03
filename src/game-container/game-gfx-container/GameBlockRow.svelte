<script>
    import GfxBlock from './GfxBlock.svelte'

    export let blockDimensions
    export let rowNum
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
        <GfxBlock id="gridblock" 
            colNum={i + 1}
            rowNum={rowNum}
            blockDimensions={blockDimensions} />
    {/each}
</div>