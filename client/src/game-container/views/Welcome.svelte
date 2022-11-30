<script>
    import Header from "../header/Header.svelte";
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import Textbox from "../svelte-partials/Textbox.svelte";

    import { openLogInScreen, openSignUpScreen, openMainMenuScreen, openAboutScreen } from "../stores";
</script>

<div>
    <Header/>
    <Textbox text={"Playing is free and always will be!"}/> 
    <MainUiButton action={openMainMenuScreen} buttonText={"Play!"} clickable={true}/>
    <Textbox text={"Want to save or load a game?"}/> 
    <MainUiButton action={openLogInScreen} buttonText={"Log in"} clickable={true}/>
    <Textbox text={"Dont have an account?"}/>
    <MainUiButton action={openSignUpScreen} buttonText={"Sign up"} clickable={true}/>
    <Textbox text={"Who are you guys anyway?"}/>
    <MainUiButton action={openAboutScreen} buttonText={"Find out!"} clickable={false}/>
</div>