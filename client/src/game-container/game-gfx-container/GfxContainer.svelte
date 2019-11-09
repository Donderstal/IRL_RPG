<script>

    import util from '../../helpers/utilFunctions'
    import initCanvas from '../../game/initCanvas'
    import createCharInstance from '../../game/createCharInstance'
    import movement from '../../game/map-ui/movement'
    
    export let classList;

    let frontContext;
    let backContext;

    const startGame = () => {
        const charName      =  util.getInputVal('name')
        const charGender    =  util.getInputVal('gender')
        const charClass     =  util.getInputVal('class')

        // The setTimeouts setup is not definitive and might change later
        setTimeout( () => {
            document.getElementById('intro-screen').remove()

        }, 50 )

        setTimeout( () => {
            backContext     = initCanvas.initCanvas(0)      
            frontContext    = initCanvas.initCanvas(1)     
        }, 75 )
        
        setTimeout( () => {
            gameState.playerCharacter = createCharInstance.getCharacter( charClass, charName, charGender )           

        }, 100 )

        setTimeout( () => {
            movement.initPlayerMovement( gameState.playerCharacter.characterPiece )      
            movement.listenForKeyPress()
        }, 125 )

    }

</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        height: 592px;
        width: 888px;
        background-color: black;
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

            <label>Choose your gender!</label>
            <select id='gender'>
                <option value="Male" > Male </option>
                <option value="Female"> Female </option>
                <option value="None of your business"> None of your business </option>
            </select>    

            <label>Choose your class!</label>
            <select id='class'>
                {#each Object.keys(classList.initClasses) as className}
                    <option value="{className}" > {className} </option>
                {/each}
            </select>    

            <br />

            <button on:click={ startGame }  >
                Ok let's go!!!
            </button>
        </div>

    </div>

    <canvas class="game-background-body do-not-display" ></canvas>

    <canvas class="game-front-body do-not-display" ></canvas>


</div>