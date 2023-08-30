<script lang="ts">
    import { returnToPreviousScreen } from "../../stores";

    let selected = false;

    export const markAsSelected = (): void => {
        selected = true;
    }
    export const markAsUnselected = (): void => {
        selected = false;
    }
</script>

<style>
    .button-standard {
        background: #d82bba 0% 0% no-repeat padding-box;
        opacity: 1;
        color: #defff2;
        width: 10vw;
        height: 4vh;
        margin: 0 auto;
        border: none;
        z-index: 50;
        box-shadow: .5vh .5vh .25vh #64005380;
        transition: transform .3s ease-out;
        position: fixed;
        padding: 0;
        top: 2.5vh;
        left: 5vw;
    }
    img {
        opacity: 1;
        color: #defff2;
        width: 1vw;
        height: 3vh;
        margin: 0 auto;
        border: none;
        z-index: 5;
        transition: transform .3s ease-out;
    }
    .button-standard:hover, .selected {
        cursor: pointer;
        transition: transform .3s ease-out;
        transform: translateY(-.5vh) translateX(-.5vh);
        box-shadow: 1vh 1vh .25vh #64005380;
    }
    @media only screen and (max-width: 600px) {
        .button-standard {
            top: 0vh;
            left: 0vw;
        }
    }
</style>

<button class="button-standard" class:selected="{selected}" on:click={returnToPreviousScreen}>
    <img id="left-arrow" class="arrow" src="/static/site_assets/arrow-left@2x.png" alt="Left arrow">
</button>