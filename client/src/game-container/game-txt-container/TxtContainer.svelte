<script>
    import startGame from '../../game/startGame'    
</script>

<style>
    .game-txt-container {
        display: flex;
        flex-wrap: wrap;
        flex: 7.5%;
        border-top: 1px groove #190019;
        background-color: #800080;
        padding: .5rem 1rem
    }

    button {
        margin: 0 auto;
        display: none
    }
</style>

<div class="game-txt-container">
    <button id="stopGameButton" on:click={ startGame.stopGame }  >
        I'm done with this bullshit!
    </button>
</div>