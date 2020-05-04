<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    export let vhFromTop;
    export let buttonText;
    export let elementId;
</script>

<style>
    button {
        background-color: #464F51;
        color: #defff2;
        border: 1px groove #D68Fd6;
        border-radius: 5px;
        width: 7vw;
        height: 12.5vh;
        position: fixed;
        left: 0;
    }

    button:hover {
        color: #D68Fd6;
        border-color:  #defff2;
        cursor: pointer;
    }
</style>

<button style="top: {vhFromTop}" on:click={() => dispatch('buttonPress')} 
        id={elementId} class="main-menu-button" >  
    {buttonText} 
</button>