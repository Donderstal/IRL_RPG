<script>
    import utilFunctions from '../../../helpers/utilFunctions'

    console.log(utilFunctions)

    utilFunctions.docReady(function() {
       document.getElementById('player').style.top = "235px"
       document.getElementById('player').style.left = "473px"
    });

    document.onkeydown = function(event) {
        console.log(event.code)
        const playerElement = document.getElementById('player')
        console.log(playerElement)
        console.log(playerElement.style.top)
        console.log(playerElement.style.left)
        switch (event.code) {

            case "ArrowUp" :
                console.log('going up!')
                console.log(playerElement.x)
                console.log(playerElement.y)
                playerElement.style.top = (playerElement.y - 37) + "px"
                break;
            case "ArrowDown" :
                console.log('going down!')
                console.log(playerElement.x)
                console.log(playerElement.y)
                playerElement.style.top = (playerElement.y + 47) + "px"
                break;
            case "ArrowLeft" :
                console.log('going left!')
                console.log(playerElement.x)
                console.log(playerElement.y)
                playerElement.style.left = (playerElement.x - 37) + "px"
                break;
            case "ArrowRight" :
                console.log('going right!')                
                console.log(playerElement.x)
                console.log(playerElement.y)
                playerElement.style.left = (playerElement.x + 37) + "px"
                break;
        }
    }
</script>

<style>
    img {
        display: block;
        margin: auto;
        height: 37px;
        width: 37px;
        z-index: 5;
        position: absolute;
    }
</style>

    <img id="player"
        alt="bruh" 
        src="./images/test-sprite.png"
    >
