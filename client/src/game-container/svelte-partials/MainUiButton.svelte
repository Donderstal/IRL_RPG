<script>   
    export let buttonText;
    export let action; 
</script>

<style>
    div {
        width: fit-content;
        display: inline-block;
    }
    button {
        background: #D82BBA 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 13.7vw;
        height: 8.14vh;
        margin: 0 auto;
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
    @media only screen and (max-width: 600px) {
        button {
            width: 50vw;
            font-size: 3vh;
        }
    }
</style>

<div>
    <button on:click|preventDefault={action} class="main-menu-button">  
        {buttonText} 
    </button>
</div>