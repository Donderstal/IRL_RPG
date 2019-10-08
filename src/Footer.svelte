<script>
    export let gameState
    
    function plusOne() {
        gameState.characterState.number += 1
        console.log(gameState)
    }
</script>


<style>
    .footer {
        height: 5vh;
        border-top: 1px groove #190019
    }
</style>

<div class="footer">
    <span>IRL - RPG</span> 
    <button on:click={
        plusOne
    } >+1</button>
</div>