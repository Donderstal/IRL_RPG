<script>
    import Header from "../header/Header.svelte";
    import MainUiButton from "../svelte-partials/MainUiButton.svelte";
    import ButtonSubtextDiv from "../svelte-partials/ButtonSubtextDiv.svelte";

    import { openLogInScreen, openSignUpScreen, openMainMenuScreen, openAboutScreen } from "../stores.js";
</script>

<div>
    <Header/>
    <ButtonSubtextDiv text={"Playing is free and always will be!"}/> 
    <MainUiButton action={openMainMenuScreen} buttonText={"Play!"} />
    <ButtonSubtextDiv text={"Want to save or load a game?"}/> 
    <MainUiButton action={openLogInScreen} buttonText={"Log in"} />
    <ButtonSubtextDiv text={"Dont have an account?"}/>
    <MainUiButton action={openSignUpScreen} buttonText={"Sign up"} />
    <ButtonSubtextDiv text={"Who are you guys anyway?"}/>
    <MainUiButton action={openAboutScreen} buttonText={"Find out!"} />
</div>