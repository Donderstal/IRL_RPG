<script>   
    export let buttonText;
    export let elementId;
    export let action;
</script>

<style>
    div {
        width: 100vw;
        margin-bottom: 3vh;
    }
    button {
        background: #D82BBA 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 13.7vw;
        height: 8.14vh;
        font-family: 'Retro Gaming', Fallback, sans-serif;
        margin: 0 auto;
        font-size: 36px;
        border: none;
        z-index: 5;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;
    }
    button:hover {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
</style>

<div>
    <button on:click={action} id={elementId} class="main-menu-button" >  
        {buttonText} 
    </button>
</div>