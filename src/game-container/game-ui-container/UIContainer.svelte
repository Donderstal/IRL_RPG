<script>
    import { createEventDispatcher } from 'svelte';
    
    export let classList
    
    const dispatch = createEventDispatcher();
    
    let className


    function handleButtonHover() {
        className = event.target.id
        console.log(className)
        dispatch('hoverOverClass', {
            chosenClass : className
        })
    }

</script>

<style>
    .game-ui-container {
        display: flex;
        flex-wrap: wrap;
        flex: 17.5%;
        background-color: #800080;
        border-top: 1px groove #190019;
    }

    .buttonCont{
        flex: 50%;
    }

    button {
        background-color: #4c004c;
        color: #ffffff;
        margin: .5rem auto;
        width: 10vw;
    }

</style>

<div class="game-ui-container">
    {#each Object.keys(classList) as player}
        <div class="buttonCont">        
            <button class="button" >
                <h3 id={player}  on:mouseover={handleButtonHover}>
                    {player}           
                </h3>
            </button>
        </div>            
    {/each}
</div>