<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    export let vhFromTop;
    export let buttonText;
    export let elementId;
</script>

<style>
    button {
        background: #D82BBA 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 13.7vw;
        height: 8.14vh;
        position: fixed;
        left: 43.072916666vw;
        font-family: 'Retro Gaming', Fallback, sans-serif;
        font-size: 36px;
        border: none;
        z-index: 5;
    }

    p {
        background: #64005380 0% 0% no-repeat padding-box;
        opacity: 1;
        width: 13.7vw;
        height: 8.14vh;
        position: fixed;
        left: 43.38vw;
        border: none;
        display: block;
        z-index: 4;
    }

    button:hover {
        color: #00FF9E;
        cursor: pointer;
    }
</style>

<div>
    <button style="top: {vhFromTop}" on:click={() => dispatch('buttonPress')} 
            id={elementId} class="main-menu-button" >  
        {buttonText} 
    </button>
    <p style="top: {vhFromTop}">
    
    </p>
</div>