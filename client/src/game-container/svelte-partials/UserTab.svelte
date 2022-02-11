<script>
    // store globals and functions
    import { currentScreen, loggedIn, activeUser, SCREEN_WELCOME } from '../stores.js';
    //partials
    import MainUiButton from './MainUiButton.svelte'

    export let logOut;
    export let logIn;
</script>
<style>
    form {
        position: absolute;
        left: 80%;
        top: 5%;
        display: inline-block;
        background-color: transparent;
    }
</style>

<form id="post-log-out">
    { #if $loggedIn } 
        <h3>Logged in as: {$activeUser}</h3>
    { :else }
        <h3>Not signed in</h3>
    {/if}
    { #if $currentScreen != SCREEN_WELCOME } 
        { #if $loggedIn } 
            <MainUiButton
                action={logOut} 
                buttonText={"Log out"} 
            />
        { :else }
            <MainUiButton
                action={logIn} 
                buttonText={"Log in"} 
            />
        {/if}
    {/if}
</form>