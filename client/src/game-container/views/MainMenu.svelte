<script>
    import MainUiButton from '../svelte-partials/MainUiButton.svelte'    
    import Header from '../header/Header.svelte'    
    import { openNewGameScreen, openLoadGameScreen, openOptionsScreen, openAboutScreen, returnToPreviousScreen } from "../stores.js";
</script>
<div>
    <Header/>
    <br/>
    <div>
        <MainUiButton action={openNewGameScreen} buttonText={"New game"} />
    </div>
    <br/>
    <div>
        <MainUiButton action={openLoadGameScreen} buttonText={"Load game"} />
    </div>
    <br/>
    <div>
        <MainUiButton action={openOptionsScreen} buttonText={"Options"} />
    </div>
    <br/>
    <div>
        <MainUiButton action={openAboutScreen} buttonText={"About"} />
    </div>
    <br/>
    <div>
        <MainUiButton action={returnToPreviousScreen} buttonText={"Quit"} />
    </div>
</div>