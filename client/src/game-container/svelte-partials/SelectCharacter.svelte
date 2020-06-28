<script>
    import globals from '../../game-data/globals.js';
    import GoBackButton from './GoBackButton.svelte'

    export let returnToPreviousScreen;
    let introSpriteWidth = globals.MAP_SPRITE_WIDTH_IN_SHEET * 3;
    let introSpriteHeight = globals.MAP_SPRITE_HEIGHT_IN_SHEET * 3;

    const availableClasses = [ "NECKBEARD", "INFLUENCER", "CHAD", "TUMBLR_GIRL" ]
    const descriptions = { 
        "NECKBEARD": "Aren't nice guys like me known for their superior intelligence, m'lady? Discover your inner neckbeard and fight your opponents with snidy remarks and social mishaps.", 
        "INFLUENCER": "The #Influencer is always looking #Great in her online #GoodLife! Choose her and rob your opponents of their attention, money and self-esteem!", 
        "CHAD": "The Chad loves kicking ass, bruh! In fact he's kicking so much ass, that he's hardly good for anything else. Choose him if you like to overwhelm your opponents with brute force.", 
        "TUMBLR_GIRL": "The Tumblr Girl has many different feelings and they're always valid. Release your many identities upon the world and use your sense of entitlement to make your foes tremble!"
    }
    let activeClass = "NECKBEARD";
    let activeClassIndex = availableClasses.indexOf(activeClass);

    const handleArrowClick = ( direction ) => {
        if ( direction == "L" || direction == "R" ) {
            let newIndex = ( direction == "L" ) ? activeClassIndex - 1 : activeClassIndex + 1
            if ( newIndex < 0 ) {
                newIndex = ( availableClasses.length - 1 )
            }
            else if ( newIndex == availableClasses.length ) {
                newIndex = 0
            }
            activeClass = availableClasses[newIndex];
            activeClassIndex = newIndex;
        }
        else {
            console.log("Direction not found: " + direction)
            return;
        }

        getSpriteAndDrawToCanvas( )
    }

    const getSpriteAndDrawToCanvas = ( ) => {
        let currentSprite = new Image( );
        currentSprite.src = "/static/site_assets/" + activeClass.toLowerCase().replace(" ", "_") + ".v3.png";
        currentSprite.onload = ( ) => {
            let canvas = document.getElementById("select-character-canvas")
            let ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                currentSprite, 
                0, 0, 
                globals.MAP_SPRITE_WIDTH_IN_SHEET * 3, globals.MAP_SPRITE_HEIGHT_IN_SHEET * 3,
                0, 0,
                canvas.width, canvas.height
            )
        }
    }

    getSpriteAndDrawToCanvas( )
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
        color: white;
    }

    canvas {
        width: 155px;
        height: 255px;
    }

    input {
        color:#D82BBA;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 4px solid #D82BBA;
        opacity: 1;
        font-size: 2.6vh
    }

    .arrow {
        max-height: 91px;
        max-width: 60px;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
    }

    .arrow:hover {
        cursor: pointer;
        filter: brightness(0) invert(1);
    }

    h2 {
        margin-bottom: 1vh;
    }

    p {
        font-family: "Lucida Console", Courier, monospace;
        font-size: 24px;
    }
</style>

<div class="select-character">
    <GoBackButton returnToPreviousScreen={returnToPreviousScreen}/>
    <div class="select-character-inner">
        <h2>Enter your name</h2>
        <input id="name-input" type="text" placeholder="Player Name"/>
    </div>
    <div class="select-character-inner">
        <h2 id="active-class">{activeClass}</h2>
        <img id="left-arrow" class="arrow" src="/static/site_assets/arrow-left@2x.png" alt="Left arrow" on:click={() => handleArrowClick("L")}>
        <canvas id="select-character-canvas"></canvas>
        <img id="right-arrow" class="arrow" src="/static/site_assets/arrow-right@2x.png" alt="Right arrow"on:click={() => handleArrowClick("R")} >
    </div>
    <div class="select-character-inner">
        <p>{descriptions[activeClass]}</p>
    </div>
</div>
