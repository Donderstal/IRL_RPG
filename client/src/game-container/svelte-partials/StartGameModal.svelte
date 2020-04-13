<script>
    import MainUiButton from './main-ui-button.svelte'
    import startGame from '../../game/startGame.js';

    const isCheckboxChecked = ( checkboxId ) => {
        return document.getElementById(checkboxId).checked
    }

    const startGameWithParams = ( ) => {
        if ( isCheckboxChecked( 'normal' ) ) {
            console.log( 'normal')
        }
        if ( isCheckboxChecked( 'battle' ) ) {
            console.log( 'battle')      
        }
        if ( isCheckboxChecked( 'map-debug' ) ) {
            console.log('map-debug' )
        }
        if ( isCheckboxChecked( 'battle-debug' ) ) {
            console.log( 'battle-debug')
        }
        console.log('Name: ' + document.getElementById('charName').value)
        console.log('Class: ' + document.getElementById('charClass').value)
    }
</script>

<style>
    .Modal {
        z-index: 1000;
        background-color: white;
        height: 75vh;
        width: 66vw;
        display: block;
        position: absolute;
        visibility: hidden;
        top: 12.5vh;
        left: 16.66vw;
        border: 2px solid #D68Fd6;
        border-radius: 6.75vh;
        color: #464F51;
    }

    button {
        background-color: #464F51;
        color: #defff2;
        border: 1px groove #D68Fd6;
        border-radius: 5px;
        width: 7vw;
    }

    button:hover {
        color: #D68Fd6;
        border-color:  #defff2;
        cursor: pointer;
    }
</style>

<div class="Modal">
    <div>
        <h4>Name</h4>
        <input type="text" id="charName">
    </div>
    <div>
        <h4>Class</h4>
        <select id="charClass">
            <option value="Influencer">Influencer</option>
            <option value="Neckbeard">Neckbeard</option>
            <option value="Chad">Chad</option>
            <option value="Tumblr girl">Tumblr girl</option>
        </select>
    </div>
    <div>
        <h4>Battle test or normal?</h4>
        <label>Normal mode</label>
        <input type="radio" name="modeChoice" id="normal" checked>
        <label>Battle</label>
        <input type="radio" name="modeChoice" id="battle">
    </div>
    <div>
        <h4>Battle test or normal?</h4>
        <label>Battle debug</label>
        <input type="checkbox" id="map-debug">
        <label>Map debug</label>
        <input type="checkbox" id="battle-debug">
    </div>
    <div>
        <button on:click={ startGameWithParams }>Start!!</button>
    </div>
</div>