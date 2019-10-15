<script>
    import util from '../../helpers/utilFunctions'
    import initOverworld from '../../game/initOverworld'
    import createCharInstance from '../../game/createCharInstance'

    export let classList

    let gameChar = {}
    let frontCtx;
    let backCtx;

    function startGame() {
        const charName      =  util.getInputVal('name')
        const charGender    =  util.getInputVal('gender')
        const charClass     =  util.getInputVal('class')

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

        }, 100 )
        
    }
	
    function handleInput ( event ) {
        switch (event.key) {
            // fallthrough for movement
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

        var charX = gameChar.characterPiece.x
        var charY = gameChar.characterPiece.y

        var charW = gameChar.characterPiece.width
        var charH = gameChar.characterPiece.height

        var ctxTemp = frontCtx.getImageData( charX, charY, charW, charH ); 

        frontCtx.clearRect( charX, charY, charW, charH )

        frontCtx.putImageData(ctxTemp, charX, charY) 

        
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