<script>
    // store globals and functions
    import { currentScreen, loggedIn, activeUser, SCREEN_WELCOME } from '../../stores';
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
    @media only screen and (max-width: 600px) {
        form {
            visibility: hidden;
            display: none;
        }
    }
</style>

<form id="post-log-out">
    { #if $loggedIn } 
        <h3>Logged in as: {$activeUser.name}</h3>
    { :else }
        <h3>Not signed in</h3>
    {/if}
    { #if $currentScreen != SCREEN_WELCOME } 
        { #if $loggedIn } 
            <MainUiButton
                action={logOut} 
                buttonText={"Log out"} 
                clickable={true}
            />
        { :else }
            <MainUiButton
                action={logIn} 
                buttonText={"Log in"} 
                clickable={true}
            />
        {/if}
    {/if}
</form>