<script>
    import globals from '../../game-data/globals.js';
    import { getAnimationFrames } from '../../resources/animationResources.js';
    import GoBackButton from '../svelte-partials/GoBackButton.svelte'
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import { startGameWithParams } from "../stores.js"
    import { onMount } from 'svelte';

    const availableClasses = [ "LOREM", "IPSUM", "DOLOR", "SIT AMET" ]
    const classNames = {
        "LOREM" : "NECKBEARD", "IPSUM" : "INFLUENCER", "DOLOR" : "CHAD", "SIT AMET" : "TUMBLR_GIRL"
    };
    let activeClass = "LOREM";
    let activeClassIndex = availableClasses.indexOf(activeClass);
    let spriteWidth  = globals.MAP_SPRITE_WIDTH_IN_SHEET * 3
    let spriteHeight = globals.MAP_SPRITE_HEIGHT_IN_SHEET * 3

    let inAnimation = false;
    let frameCount = 0;
    let sheetPosition = 0;
    let direction = 0;

    let canvas;
    let ctx;
    let animationFrames;
    let lastDateNow, newDateNow, animationDateNow;
    let currentSprite;
    let animationIndex = 0;
    let animationType;

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
        clearFrameCount( )
        currentSprite = new Image( );
        currentSprite.src = "/static/site_assets/" + classNames[activeClass].toLowerCase().replace(" ", "_") + ".v3.png";
        currentSprite.onload = ( ) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                currentSprite, 
                spriteWidth * sheetPosition, spriteHeight * direction, 
                spriteWidth, spriteHeight,
                0, 0,
                canvas.width, canvas.height
            )
        }
    }

    const animationFrameController = ( ) => {
        newDateNow = Date.now();

        if ( animationDateNow == undefined && !inAnimation ) {
            animationDateNow = newDateNow;
        }

        if ( newDateNow - animationDateNow > 2000 && !inAnimation ) {
            animationDateNow = newDateNow;
            getAnimation( )
        }

        if ( newDateNow - lastDateNow > 1000 / globals.FRAMES_PER_SECOND || lastDateNow == undefined && inAnimation ) {
            lastDateNow = newDateNow;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            frameCount++;  
    
            if ( frameCount >= globals.FRAME_LIMIT ) {
                frameCount = 0;
                doAnimation( )
            }

            ctx.drawImage(
                currentSprite, 
                spriteWidth * sheetPosition, spriteHeight * direction, 
                spriteWidth, spriteHeight,
                0, 0,
                canvas.width, canvas.height
            )
        }
        requestAnimationFrame(animationFrameController)
    }

    const doAnimation = ( ) => {
        switch ( animationType) {
            case "WALK" : 
                sheetPosition++;
                if (sheetPosition >= 4) {
                    clearAnimationVariables()
                }
                break;
            case "ANIM" : 
                if ( animationIndex >= animationFrames.length ) {
                    clearAnimationVariables()
                }
                else {
                    const frame = animationFrames[animationIndex];
                    sheetPosition = frame.column;
                    direction = frame.row;
                    animationIndex++
                }
        }
    }
    
    const getAnimation = ( ) => {
        switch ( Math.floor( Math.random( ) * 7 ) ) {
            case 0 : 
                animationFrames = getAnimationFrames("BACK_AND_FORTH");
                animationType = "ANIM"
            break;
            case 1 :
                direction = 1;
                animationType = "WALK"
            break;
            case 2 :
                animationFrames = getAnimationFrames("TURN_SINGLE_CIRCLE");
                animationType = "ANIM"
            break;
            case 3 :
                direction = 3;
                animationType = "WALK"
            break;
            case 4 :
                direction = 0;
                animationType = "WALK"
            break;
            case 5 :
                direction = 2;
                animationType = "WALK"
            break;
            case 6 : 
                animationFrames = getAnimationFrames("LEFT_AND_RIGHT");
                animationType = "ANIM"
            break;
        }
        inAnimation = true;
    }

    const clearAnimationVariables = ( ) => {
        animationIndex = 0;
        animationFrames = 0;
        sheetPosition = 0;
        direction = 0;
        inAnimation = false;
        animationType = ""
    }

    const clearFrameCount = ( ) => {
        clearAnimationVariables( )
        frameCount = 0;
        lastDateNow = undefined, 
        animationDateNow = undefined;
    }

    onMount(async () => {
        canvas = document.getElementById("select-character-canvas")
        ctx = canvas.getContext('2d')
        getSpriteAndDrawToCanvas( )
        animationFrameController()
	});

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
    @media only screen and (max-width: 600px) {
        #instance-settings {
            visibility: hidden;
            display: none;
        }
        .select-character-inner {
            max-width: 100vw;
        }
    }
</style>

<div class="select-character">
    <GoBackButton/>
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
    <div id="instance-settings" style="position:absolute; top:10%; left:5%;">
        <h4>Instance settings</h4>
        <p><label>Run game in Debug mode</label><input id="enable-debug" type="checkbox" /></p>
        <p><label>Disable story cinematics</label><input id="disable-story" type="checkbox" /></p>
        <p><label>Select starting location</label><select id="map-selection">
            <option value="lennart-neighbourhood/Newtown-appartment-3">Lennart</option>
            <option value="northside/C2">Northside</option>
            <option value="test/B4">Test intersection</option>
            <option value="test/layer-test">Lagen test</option>
        </select></p>
    </div>
    <MainUiButton action={startGameWithParams} buttonText={"Let's go!"} />
</div>