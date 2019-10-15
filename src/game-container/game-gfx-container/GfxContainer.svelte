<script>
    import util from '../../helpers/utilFunctions'
    import initOverworld from '../../game/initOverworld'
    import createCharInstance from '../../game/createCharInstance'
    import animation from '../../game/overworld-anim/animExperiment'

    export let classList

    let gameChar = {}
    let frontCtx;
    let backCtx;

    function startGame() {
        const charName      =  util.getInputVal('name')
        const charGender    =  util.getInputVal('gender')
        const charClass     =  util.getInputVal('class')

        // The setTimeouts setup is not definitive and might change later
        setTimeout( () => {
            document.getElementById('intro-screen').remove()

        }, 50 )

        setTimeout( () => {
            backCtx     = initOverworld.initCanvas(0)      
            frontCtx    = initOverworld.initCanvas(1)     
        }, 75 )

        setTimeout( () => {
            const playerCharacter = createCharInstance.getCharacter( charClass, charName, charClass )           

            gameChar = playerCharacter

            console.log(animation)

            animation.init(frontCtx, gameChar)

        }, 100 )
        
    }
	
    function handleInput ( event ) {
        switch (event.key) {
            // fallthrough for movement
            // this switch statement and associated functionalities
            // are still in an experimental phase
            case 's' :
            case 'a' :
            case 'w' : 
            case 'd' :
            case 'ArrowRight' :
            case 'ArrowUp' :
            case 'ArrowLeft' :
            case 'ArrowDown' :
                handleMovement(event.key)
            case 'Tab' :
            case 'i' :
            case 'o' :
                /* openMenu(event.key) */
            case ' ' :
                /* handleActionButton() */
        }
    }

    util.docReady(
        window.addEventListener('keydown', handleInput)
    )

    function handleMovement(key) {

        console.log(gameChar.characterPiece.sprite)

        for ( var i = 0; i < 6;  i++ ) {
            console.log(gameChar.characterPiece.y)
            moveSprite( gameChar.characterPiece, i + 1 )  

        }
        
    }

    function moveSprite(character, index, direction = null) {
        console.log(character)
        const sheetPos = ( 24 * index ) 
        console.log(sheetPos)
        character.ctx.clearRect( character.x, character.y, character.width, character.height )

        character.ctx.drawImage(  
            character.sprite, 
            sheetPos, 0, 
            24, 24, 
            character.x, character.y, 
            character.width, character.height
        )  
    }


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
        background-size: cover;
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