<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    export let vwFromLeft;
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
        position: fixed;
        top: 1vw;
    }

    button:hover {
        color: #D68Fd6;
        border-color:  #defff2;
        cursor: pointer;
    }
</style>

<button style="left: {vwFromLeft}" on:click={() => dispatch('buttonPress')} id={elementId} >  {buttonText} </button>