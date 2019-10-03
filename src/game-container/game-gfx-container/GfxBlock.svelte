<script>
    export let blockDimensions
    export let rowNum
    export let colNum
    export let colConfig

    const id = rowNum+"-"+colNum

    /* function handleTileConfig() {
        console.log(colConfig)
    }

    handleTileConfig(colConfig) */
</script>

<style>
    span {
        box-sizing: border-box;
        display: inline-block;
        height: 37px;
        width: 37px;
        z-index: 5;
        border: .25px solid white;
        color: white;
        opacity: .5
    }
</style>

<span 
    id={id}
    style="background-color:{colConfig};"
    >
    {colNum}
</span>