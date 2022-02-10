<script>
    import Header from './header/Header.svelte'
    import MainUiButton from './svelte-partials/MainUiButton.svelte'
    import LogIn from './svelte-partials/LogIn.svelte'
    import SignUp from './svelte-partials/SignUp.svelte'
    import FormWarning from './svelte-partials/FormWarning.svelte'
    import { onMount } from 'svelte';
    import ForgotPassword from './svelte-partials/ForgotPassword.svelte';

    let url = ``;
    let validating;
    let currentScreen;
    $ : userMessage = false;

    onMount(() => {
        url = window.location.href
        validating = url.includes('validate')
        console.log(validating);
        currentScreen = validating ? "LOG_IN" : "WELCOME";
    });

    const getButtonAction = ( buttonId ) => {
        document.getElementsByClassName("background-large")[0].style.display = "block";
        document.getElementsByClassName("background-small")[0].style.display = "none";
        userMessage = false;

        switch( buttonId ) {
            case 'Log_in_screen_button': 
                currentScreen = "LOG_IN";
                break;
            case 'Sign_up_screen_button':
                currentScreen = "SIGN_UP";
                break;
            case "Restore_password_button":
                currentScreen = "RESTORE_PASSWORD"
                break;
            case 'Log_in_button':
                onSubmit("log-in-form", validating ? "/post-validate-account" : "/post-login");
                break;
            case 'Sign_up_button':
                onSubmit("sign-up-form", "/post-sign-up");
                break;
            case 'Send_restore_email_button':
                onSubmit("restore-password-form", "/post-restore-password");
                break;
            case "Back_button" : 
                if ( currentScreen == "RESTORE_PASSWORD") {
                    currentScreen = "LOG_IN";   
                }
                else {
                    currentScreen = "WELCOME";                    
                }
                break;
            default:
                console.log("Unkown button ID: " + buttonId);
                break;
        }
    }

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
                console.log(userMessage)
                break;
            case 500:
                userMessage = json['error']
                break;
            default:
                console.error('unexpected http status code ' + status)
        }
    }

</script>

<style>
    div {
        z-index: 2;
        color: white;
    }

    .dont-have-account {
        font-family: "Lucida Console", Courier, monospace;
        font-size: 24px;
        margin-top: 5vh;
    }

    .or-div {
        margin-top: 10vh;
        margin-bottom: 10vh;
    }
</style>

<div>
    { #if currentScreen == "WELCOME"}
        <Header/>
        <div>
            <p class='dont-have-account'>
                Playing is free and always will be!
            </p>
        </div>
        <MainUiButton 
            elementId={"Play!_button"} 
            action={ ( ) => {
                getButtonAction("Play!_button")
            } } 
            buttonText={"Play!"} 
        />
        <div>
            <p class='dont-have-account'>
                Want to save or load a game?
            </p>
        </div>
        <MainUiButton 
            elementId={"Log_in_screen_button"} 
            action={ ( ) => {
                getButtonAction("Log_in_screen_button")
            } } 
            buttonText={"Log in"} 
        />
        <div>
            <p class='dont-have-account'>
                Dont have an account?
            </p>
        </div>
        <MainUiButton 
            elementId={"Sign_up_screen_button"} 
            action={ ( ) => {
                getButtonAction("Sign_up_screen_button" )
            } } 
            buttonText={"Sign up"} 
        />
        <div>
            <p class='dont-have-account'>
                Who are you guys anyway?
            </p>
        </div>
        <MainUiButton 
            elementId={"Find_out_screen_button"} 
            action={ ( ) => {
                getButtonAction("Find_out_screen_button" )
            } } 
            buttonText={"Find out!"} 
        />    
    { :else if currentScreen == "LOG_IN"}
        <LogIn 
            action={ ( ) => { getButtonAction("Log_in_button" )} }
            restorePassword={ ( ) => { getButtonAction("Restore_password_button")} }
            returnToPreviousScreen={ ( ) => { getButtonAction( "Back_button" )} } 
            validating={validating}
        />
    { :else if currentScreen == "SIGN_UP"}
        <SignUp 
            action={ ( ) => { getButtonAction("Sign_up_button" )} }
            returnToPreviousScreen={ ( ) => { getButtonAction( "Back_button" )} } 
        />   
    { :else if currentScreen == "RESTORE_PASSWORD"}
        <ForgotPassword
            action={ ( ) => { getButtonAction("Send_restore_email_button" )} }
            returnToPreviousScreen={ ( ) => { getButtonAction( "Back_button" )}} 
        />      
    {/if}
    {#if userMessage} 
        <FormWarning text={userMessage}/>
    {/if}
</div>
