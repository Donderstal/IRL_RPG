<script>

    import util from '../../helpers/utilFunctions'
    import initOverworld from '../../game/initOverworld'
    import createCharInstance from '../../game/createCharInstance'
    import animation from '../../game/overworld-anim/animExperiment'

    export let classList;
    export let gameState;

    let pressedKeys = {};

    let characterXY = {};
    let characterWidth
    let characterHeight


    let frontContext;
    let backContext;

    const MOVEMENT_SPEED = 1.85

    const getGameState = () => {
        return gameState
    }

    const startGame = () => {

        const gotState = getGameState()

        const charName      =  util.getInputVal('name')
        const charGender    =  util.getInputVal('gender')
        const charClass     =  util.getInputVal('class')

        // The setTimeouts setup is not definitive and might change later
        setTimeout( () => {
            document.getElementById('intro-screen').remove()

        }, 50 )

        setTimeout( () => {
            backContext     = initOverworld.initCanvas(0)      
            frontContext    = initOverworld.initCanvas(1)     
        }, 75 )
        
        setTimeout( () => {
            const playerCharacter = createCharInstance.getCharacter( charClass, charName, charClass )           

            gameState.playerCharacter = playerCharacter

            characterXY =  gameState.playerCharacter.characterPiece.xy
            characterWidth = gameState.playerCharacter.characterPiece.width
            characterHeight = gameState.playerCharacter.characterPiece.height

            window.requestAnimationFrame(movementController)

        }, 100 )
    }

    const movementController = ( ) => {       
        
        frontContext.clearRect( characterXY.x, characterXY.y, characterWidth, characterHeight )
    
        if ( pressedKeys.d ) {
            characterXY.x  += MOVEMENT_SPEED
        }
        if ( pressedKeys.a ) {
            characterXY.x  -= MOVEMENT_SPEED
        }
        if ( pressedKeys.w ) {
            characterXY.y  -= MOVEMENT_SPEED
        }
        if ( pressedKeys.s ) {
            characterXY.y  += MOVEMENT_SPEED
        }
            
        frontContext.drawImage(gameState.playerCharacter.characterPiece.sprite,
        0, 0, 24, 24,
        characterXY.x, characterXY.y, characterWidth, characterHeight);

        window.requestAnimationFrame(movementController)

    }

    const prepareUI = () => {
        window.addEventListener('keydown', (event) => {
            pressedKeys[event.key] = true
            console.log(characterXY)
        })
        window.addEventListener('keyup', () => {
            pressedKeys[event.key] = false
        })
    }


    util.docReady(
        prepareUI()
    )   

</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        height: 592px;
        width: 888px;
        background-color: grey;
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
            <h3>Welcome to IRL-RPG</h3>
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