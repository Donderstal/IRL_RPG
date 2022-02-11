<script>
    import FormWarning from './svelte-partials/FormWarning.svelte'
    import { currentScreen, SCREEN_FORGOT_PASSWORD, SCREEN_LOAD_GAME, SCREEN_LOG_IN, SCREEN_MAIN_MENU, SCREEN_NEW_GANE, SCREEN_SIGN_UP, SCREEN_WELCOME } from './stores.js';
    
    // views
    import LogIn from './views/LogIn.svelte'
    import SignUp from './views/SignUp.svelte'
    import Welcome from './views/Welcome.svelte'
    import ForgotPassword from './views/ForgotPassword.svelte';
    import SelectCharacter from './views/SelectCharacter.svelte'
    import LoadGame from './views/LoadGame.svelte';
import MainMenu from './views/MainMenu.svelte';
    
    let validating = false;
    $ : userMessage = false;

    const onSubmit = (formId, url) => {
        const formData = new FormData(document.getElementById(formId));
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        postData( url, data )
    }

    const postData = ( url, data ) => {
        let statusCode; 
        fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => {
            statusCode = res.status; 
            res.json().then(jsonData => 
                processPostReponse( statusCode, jsonData, url )
            );
        });
    }

    const processPostReponse = ( status, json, url ) => {
        switch( status ) {
            case 200:
                if ( url == "/post-sign-up" || url == "/post-restore-password" ) {
                    window.location.replace("http://localhost:5000/login");
                }
                else {
                    window.location.replace("http://localhost:5000/");
                }
                break;
            case 202: 
                if ( json.error == 'USERNAME_TAKEN' ) {
                    userMessage = "The username you submitted is already in use."  
                }
                else if ( json.error == 'EMAIL_TAKEN' ) {
                    userMessage = "The email address you submitted is already in use."  
                }
                else {
                    userMessage = "Are you sure about that?"                    
                }
                break;
            case 500:
                userMessage = json['error']
                break;
            default:
                console.error('unexpected http status code ' + status)
        }
    }

    const submitForm = ( formId, url ) => {
        userMessage = false;
        onSubmit(formId, url);
    }
</script>

<style>
    div {
        z-index: 2;
        color: white;
    }
</style>

<div>
    { #if $currentScreen == SCREEN_WELCOME}
        <Welcome />
    { :else if $currentScreen == SCREEN_MAIN_MENU}
        <MainMenu/>
    { :else if $currentScreen == SCREEN_LOG_IN}
        <LogIn action={( ) => {onSubmit("log-in-form", validating ? "/post-validate-account" : "/post-login")}} validating={validating}/>
    { :else if $currentScreen == SCREEN_SIGN_UP}
        <SignUp 
            action={( ) => {submitForm("sign-up-form", "/post-sign-up")}}
        />   
    { :else if $currentScreen == SCREEN_FORGOT_PASSWORD}
        <ForgotPassword
            action={( ) => {submitForm("restore-password-form", "/post-restore-password")}}
        />    
    { :else if $currentScreen == SCREEN_NEW_GANE}
        <SelectCharacter />
    { :else if $currentScreen == SCREEN_LOAD_GAME}
        <LoadGame />  
    {/if}
    {#if userMessage} 
        <FormWarning text={userMessage}/>
    {/if}
</div>
