<script>
    import globals from '../../game-data/globals.js';

    let currentSprite = new Image( );
    currentSprite.src = "/static/sprites/neckbeard.png";
    currentSprite.onload = ( ) => {
        let canvas = document.getElementById("select-character-canvas")
        let ctx = canvas.getContext('2d')
        ctx.drawImage(
            currentSprite, 
            0, 0, 
            globals.MAP_SPRITE_WIDTH_IN_SHEET, globals.MAP_SPRITE_HEIGHT_IN_SHEET,
            0, 0,
            canvas.width, canvas.height
        )
    }
</script>

<style>
    .select-character {
        height: 80vh;
        background-color: transparent;
    }

    .select-character-inner {
        max-width: 33vw;
        margin: 0 auto;
        align-items: center;
    }

    canvas {
        width: 155px;
        height: 255px;
    }
</style>

<div class="select-character">
    <div class="select-character-inner">
        <h2>Enter your name</h2>
        <input type="text" placeholder="Player Name"/>
    </div>
    <div class="select-character-inner">
        <h2>Classname</h2>
        <canvas id="select-character-canvas"></canvas>
    </div>
    <div class="select-character-inner">
        <p>Blabla character bla</p>
    </div>
</div>
