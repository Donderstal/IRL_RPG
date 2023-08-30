<script lang="ts">   
    export let buttonText;
    export let action; 
    export let clickable;

    const handleClick = () => {
        if ( clickable ) {
            action()
        }
    }
</script>

<style>
    div {
        width: fit-content;
        display: inline-block;
    }

    .main-ui-button {
        opacity: 1;
        color: #defff2;
        width: 13.7vw;
        height: 8.14vh;
        margin: 0 auto;
        border: none;
        z-index: 5;
    }

    .active {
        background: #D82BBA 0% 0% no-repeat padding-box;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;
    }
    .active:hover {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
    @media only screen and (max-width: 600px) {
        .main-ui-button {
            width: 50vw;
            font-size: 3vh;
        }
    }

    .inactive {
        background: darkgrey 0% 0% no-repeat padding-box;
        box-shadow: .5vh .5vh .25vh grey;
    }
</style>

<div>
    <button on:click|preventDefault={handleClick} class="main-ui-button" class:active="{clickable}" class:inactive="{!clickable}" >  
        {buttonText} 
    </button>
</div>