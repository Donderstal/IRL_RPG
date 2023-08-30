<script>
    import MainUiButton from '../svelte-partials/MainUiButton.svelte'    
    import GoBackButton from '../svelte-partials/GoBackButton.svelte'    
    import Header from '../header/Header.svelte'    
    import { openNewGameScreen, openLoadGameScreen, openOptionsScreen, openAboutScreen, loggedIn } from "../../stores";
</script>
<div>
    {#if !$loggedIn}
        <GoBackButton/>
    {/if}
    <Header/>
    <br/>
    <div>
        <MainUiButton action={openNewGameScreen} buttonText={"New game"} clickable={true}/>
    </div>
    <br/>
    <div>
        <MainUiButton action={openLoadGameScreen} buttonText={"Load game"} clickable={$loggedIn}/>
    </div>
    <br/>
    <div>
        <MainUiButton action={openOptionsScreen} buttonText={"Options"} clickable={false}/>
    </div>
    <br/>
    <div>
        <MainUiButton action={openAboutScreen} buttonText={"About"} clickable={false}/>
    </div>
</div>