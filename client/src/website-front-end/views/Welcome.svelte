<script>
    import Header from "../header/Header.svelte";
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import Textbox from "../svelte-partials/Textbox.svelte";

    import { openLogInScreen, openSignUpScreen, openMainMenuScreen, openAboutScreen, inGameMenu } from "../../stores";
    import { get } from "svelte/store";
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
</script>

<div>
    {#if get(inGameMenu) }
        <GoBackButton/>
    {/if}
    <Header/>

    {#if !get(inGameMenu) }
        <Textbox text={"Playing is free and always will be!"}/> 
        <MainUiButton action={openMainMenuScreen} buttonText={"Play!"} clickable={true}/>
    {/if}

    <Textbox text={"Want to save or load a game?"}/> 
    <MainUiButton action={openLogInScreen} buttonText={"Log in"} clickable={true}/>
    <Textbox text={"Dont have an account?"}/>
    <MainUiButton action={openSignUpScreen} buttonText={"Sign up"} clickable={true}/>

    {#if !get(inGameMenu) }
        <Textbox text={"Who are you guys anyway?"}/>
        <MainUiButton action={openAboutScreen} buttonText={"Find out!"} clickable={false}/>
    {/if}
</div>