<script>
    import util from '../../helpers/utilFunctions'
    import initOverworld from '../../game/initOverworld'
    import createCharInstance from '../../game/createCharInstance'

    export let classList

    let gameChar = {}
    let canvCtx;

    function startGame() {
        const charName      =  util.getInputVal('name')
        const charGender    =  util.getInputVal('gender')
        const charClass     =  util.getInputVal('class')

        setTimeout( () => {
            document.getElementById('intro-screen').remove()

        }, 50 )

        setTimeout( () => {
            canvCtx = initOverworld.initCanvas()      
            
        }, 75 )

        setTimeout( () => {
            const playerCharacter = createCharInstance.getCharacter( charClass, charName, charClass )      
            console.log(playerCharacter)      

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

        console.log('x = ' + gameChar.characterPiece.x + '  y = ' + gameChar.characterPiece.y)
        console.log('width = ' + gameChar.characterPiece.width + '  width = ' + gameChar.characterPiece.height)
        console.log(canvCtx)

        var ctxTemp = canvCtx.getImageData(gameChar.characterPiece.x,gameChar.characterPiece.x,gameChar.characterPiece.x * 2 , gameChar.characterPiece.x * 2); 

        canvCtx.clearRect(gameChar.characterPiece.x,gameChar.characterPiece.x,gameChar.characterPiece.x * 2 , gameChar.characterPiece.x * 2)

        setTimeout( () => {
            canvCtx.putImageData(ctxTemp, gameChar.characterPiece.x,gameChar.characterPiece.x) 
            }, 2000 
        )
    }

</script>

<style>
    .game-gfx-container {
        display: flex;
        flex-direction: column;
        flex: 75%;
        background-color: grey;
        justify-content: center;
        text-align: center;
    }

    .game-gfx-body {
        height: 592px;
        width: 888px;
        background-color: white;
        display: flex;
        background-size: cover;
        flex-direction: column;
        vertical-align: middle;
        margin: 0 auto;
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
</div>