<script>
    export let blockDimensions
    export let rowNum
    export let colNum
    export let colConfig

    const id = rowNum+"-"+colNum

    function handleTileConfig() {
        console.log(colConfig)
    }

    handleTileConfig(colConfig)
</script>

<style>
    span {
        box-sizing: border-box;
        display: inline-block;
        border: .5px solid rgba(192,192,192, 0.3);
        height: 37.5px;
        width: 37.5px;
        z-index: 5;
        color: white;
        font-size: .5rem;
        opacity: .5
    }
</style>

<span 
    id={id}
    style="background-color:{colConfig};"
    >
    {colNum}
</span>