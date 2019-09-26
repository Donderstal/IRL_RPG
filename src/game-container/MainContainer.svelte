<script>
    console.log('hi!!')
    import classList from '../../game/character-initialization/initClasses.js';
    function handleButtonHover() {
        console.log('why u hovering bro?1')
    }
</script>

<style>
    div {
        text-align: center
    }

    button, .welcome {
        display: inline-block;
        width: 33vw;
    }

    .buttonCont {
        width: 47vw;
        float: left
    }

</style>

<div>
    {#each Object.keys(classList) as player}
        <div class="buttonCont">        
            <button class="button" >
                <h3 on:mouseover={handleButtonHover}>
                    {player}           
                </h3>
            </button>
        </div>            
    {/each}
</div>