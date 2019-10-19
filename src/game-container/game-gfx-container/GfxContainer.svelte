<script>

    import util from '../../helpers/utilFunctions'
    import initOverworld from '../../game/initOverworld'
    import createCharInstance from '../../game/createCharInstance'
    import animation from '../../game/overworld-anim/animExperiment'

    export let classList;
    export let gameState;

    let pressedKeys = {};

    let playerCharacter;

    let frontContext;
    let backContext;
    let frameCount = 0;

    const MOVEMENT_SPEED = 1.85;
    
    const FACING_DOWN    = 0;
    const FACING_UP      = 3;
    const FACING_LEFT    = 1;
    const FACING_RIGHT   = 2;

    const FRAME_LIMIT = 12;


    const getGameState = () => {
        return gameState
    }

    const startGame = () => {
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
            gameState.playerCharacter = createCharInstance.getCharacter( charClass, charName, charClass )           

            playerCharacter = gameState.playerCharacter.characterPiece

            window.requestAnimationFrame(movementController)

        }, 100 )
    }

    const movementController = ( ) => {       
        
        frontContext.clearRect( playerCharacter.xy.x, playerCharacter.xy.y, playerCharacter.width, playerCharacter.height )

        let hasMoved = false;
    
        if ( pressedKeys.d ) {
            playerCharacter.xy.x += MOVEMENT_SPEED
            playerCharacter.direction = FACING_RIGHT
            hasMoved = true;
        }
        if ( pressedKeys.a ) {
            playerCharacter.xy.x  -= MOVEMENT_SPEED
            playerCharacter.direction = FACING_LEFT
            hasMoved = true;
        }
        if ( pressedKeys.w ) {
            playerCharacter.xy.y  -= MOVEMENT_SPEED
            playerCharacter.direction = FACING_UP
            hasMoved = true;
        }
        if ( pressedKeys.s ) {
            playerCharacter.xy.y  += MOVEMENT_SPEED
            playerCharacter.direction = FACING_DOWN
            hasMoved = true;
        }

        if (hasMoved) {
            frameCount++;
        
            if (frameCount >= FRAME_LIMIT) {
                frameCount = 0;
                playerCharacter.animIterator++;

                if (playerCharacter.animIterator >= playerCharacter.animLoop.length) {
                    playerCharacter.animIterator = 0;
                }
            }
        }
            
        frontContext.drawImage(
            playerCharacter.sprite,
            playerCharacter.animLoop[playerCharacter.animIterator] * 48, ( playerCharacter.direction * 64 ), 48, 64,
            playerCharacter.xy.x, playerCharacter.xy.y, playerCharacter.width, playerCharacter.height
        );

        window.requestAnimationFrame(movementController)
    }

    const prepareUI = () => {
        window.addEventListener('keydown', (event) => {
            pressedKeys[event.key] = true
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