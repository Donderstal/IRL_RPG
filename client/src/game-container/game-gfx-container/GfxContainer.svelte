<script>
    import startGame from '../../game/startGame'    
    export let classList;

</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        height: 592px;
        width: 888px;
        background-color: rgb(139, 4, 4);
        justify-content: center;
        text-align: center;
    }

    .game-background-body {
        height: 592px;
        width: 888px;
        background-color: transparent;
        background-size: cover;
        margin: 0 auto;
        z-index: 0
    }

    .game-front-body {
        position: absolute;
        height: 592px;
        width: 888px;
        background-color: transparent;
        margin: 0 auto;
        z-index: 5
    }

    .do-not-display {
        display: none;
    }


</style>

<div class="game-gfx-container">

    <div id="intro-screen">

        <div>
            <h3>Welcome to <br/> 
            <span>NECKBEARD 2020</span></h3>
        </div>

        <div>
            <label>Name your character!</label>
            <input id='name'>

            <label>Choose your class!</label>
            <select id='class'>
                {#each Object.keys(classList.initClasses) as className}
                    <option value="{className}" > {className} </option>
                {/each}
            </select>    

            <label>Choose your map!</label>
            <select id='map'>
                    <option value="my-neighbourhood/my-house" > House </option>
                    <option value="my-neighbourhood/my-large-house" > Large House </option>
                    <option value="my-neighbourhood/my-odd-house" > Odd House </option>
            </select>    

            <br />

            <button on:click={ startGame.startGame }  >
                Ok let's go!!!
            </button>
        </div>

    </div>

    <canvas id='game-background-canvas' class="game-background-body do-not-display" ></canvas>

    <canvas id='game-front-canvas' class="game-front-body do-not-display" ></canvas>


</div>