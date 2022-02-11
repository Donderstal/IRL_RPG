<script>
    // store globals
    import {openWelcomeScreen} from "../stores";
    // header
    import SmallHeader  from "../header/SmallHeader.svelte";

    // partials
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import Textbox      from "../svelte-partials/Textbox.svelte";

    export let title;
    export let text;
    export let buttonAction;
    export let buttonText;
</script>

<style>
    .inner-div {
        display: inline-block;
        max-width: 33%;
        margin: 0 auto;
    }
</style>

<div>
    <SmallHeader text={title}/>
    <div class='inner-div'>
        <Textbox text={text}/>
    </div>
    <br/>
    <MainUiButton action={buttonAction} buttonText={buttonText}/>
</div>