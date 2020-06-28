<script>
export let returnToPreviousScreen
</script>

<style>
    button {
        background: #D82BBA 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 2vw;
        height: 4vh;
        margin: 0 auto;
        border: none;
        z-index: 5;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;
        position: fixed;
        padding: 0;
        top: 2.5vh;
        left: 5vw;
    }
    img {
        opacity: 1;
        color: #defff2;
        width: 1vw;
        height: 3vh;
        margin: 0 auto;
        border: none;
        z-index: 5;
        transition: transform .3s ease-out;
    }
    button:hover {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
</style>

<button on:click={returnToPreviousScreen}>
    <img id="left-arrow" class="arrow" src="/static/arrow-left@2x.png" alt="Left arrow">
</button>