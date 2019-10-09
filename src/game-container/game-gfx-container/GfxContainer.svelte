<script>
    import utilFunctions from '../../helpers/utilFunctions'
    import initOverworld from '../../game/initOverworld'
    import createCharInstance from '../../game/createCharInstance'

    export let classList

    console.log(classList)

    function startGame() {
        const charName      =  getInputVal('name')
        const charGender    =  getInputVal('gender')
        const charClass     =  getInputVal('class')

        setTimeout( () => {
            document.getElementById('intro-screen').remove()

        }, 50 )

        setTimeout( () => {
            initOverworld.initCanvas()      
                  
        }, 75 )

        setTimeout( () => {
            const playerCharacter = createCharInstance.getCharacter( charClass, charName, charClass )      
            console.log(playerCharacter)      
        }, 100 )
        
    }

    function getInputVal(id) {
        return document.getElementById(id).value
    }

    utilFunctions.docReady(function() {

        /* initOverworld.initCanvas() */

    });

    function onKeyUp() {
        
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