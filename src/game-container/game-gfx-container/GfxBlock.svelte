<script>
    import utilFunctions from '../../helpers/utilFunctions'
    export let blockDimensions
    export let rowNum
    export let colNum
    
    const id=rowNum+"-"+colNum
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
        font-size: .5rem
    }
</style>

<span id={id}>
    {colNum}
</span>