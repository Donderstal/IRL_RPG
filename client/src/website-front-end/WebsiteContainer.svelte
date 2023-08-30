<script>
    import { get } from 'svelte/store';

    // store globals and functions
    import { 
        currentScreen, SCREEN_FORGOT_PASSWORD, SCREEN_LOAD_GAME, setErrorMessage,
        SCREEN_LOG_IN, SCREEN_MAIN_MENU, SCREEN_NEW_GANE, SCREEN_SIGN_UP, 
        SCREEN_WELCOME, SCREEN_RESTORED_PASS, SCREEN_SIGNED_UP, SCREEN_VALIDATE_ACCOUNT,
        openRestoredPassScreen, openSignedUpScreen, openValidateAccountScreen, openLogInScreen,
        setUserDataToFrontEnd, openMainMenuScreen, inGameMenu, activeUser, loggedIn
    } from './../stores';

    //partials
    import UserTab from './svelte-partials/UserTab.svelte';

    // views
    import Textpage from './views/Textpage.svelte'
    import LogIn from './views/LogIn.svelte'
    import SignUp from './views/SignUp.svelte'
    import Welcome from './views/Welcome.svelte'
    import ForgotPassword from './views/ForgotPassword.svelte';
    import SelectCharacter from './views/SelectCharacter.svelte'
    import LoadGame from './views/LoadGame.svelte';
    import MainMenu from './views/MainMenu.svelte';
    import { State } from '../enumerables/StateEnum';
    import { updateGameControlState } from '../state/stateSetter';
    import { SceneAnimationType } from '../enumerables/SceneAnimationTypeEnum';
    import { onMount } from 'svelte';

    export let setModal;

    const accountScreens = [ 
        SCREEN_LOG_IN, SCREEN_SIGN_UP, SCREEN_FORGOT_PASSWORD, 
        SCREEN_RESTORED_PASS, SCREEN_SIGNED_UP, SCREEN_VALIDATE_ACCOUNT
    ]

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
                if ( url == "/post-sign-up" ) {
                    openSignedUpScreen();
                }
                else if ( url == "/post-restore-password" ) {
                    openRestoredPassScreen( );
                }
                else if ( url == "/post-log-out" ){
                    window.location.replace("http://localhost:5000/");
                }
                else {
                    const inMenu = get(inGameMenu);
                    setUserDataToFrontEnd(json, inMenu)
                    if ( inMenu ) {
                        setModal(`You're now logged in as ${$activeUser.name}. You can now save your game.`, SceneAnimationType.speak)
                    }
                }
                break;
            case 202: 
                if ( json.error == 'USERNAME_TAKEN' ) {
                    setErrorMessage("The username you submitted is already in use.")  
                }
                else if ( json.error == 'EMAIL_TAKEN' ) {
                    setErrorMessage("The email address you submitted is already in use.")  
                }
                else {
                    setErrorMessage("Are you sure about that?")                    
                }
                break;
            case 500:
                setErrorMessage(json['error'])
                break;
            default:
                console.error('unexpected http status code ' + status)
        }
    }

    const submitForm = ( formId, url ) => {
        setErrorMessage(false);
        onSubmit(formId, url);
    }

    onMount(()=>{
        if( $currentScreen === SCREEN_WELCOME && get(loggedIn ) ) {
            openMainMenuScreen();
        }
        updateGameControlState(State.website);
    })
</script>

<style>
    div {
        z-index: 2;
        color: white;
    }
</style>

<div>
    { #if accountScreens.indexOf($currentScreen) == -1 }
        <UserTab logOut={( ) => {postData("/post-log-out", {})}} logIn={openLogInScreen}/>
    {/if}
    { #if $currentScreen == SCREEN_WELCOME}
        <Welcome />
    { :else if $currentScreen == SCREEN_MAIN_MENU}
        <MainMenu/>
    { :else if $currentScreen == SCREEN_LOG_IN}
        <LogIn action={( ) => {onSubmit("log-in-form", "/post-login")}} validating={false}/>
    { :else if $currentScreen == SCREEN_VALIDATE_ACCOUNT}
        <LogIn action={( ) => {onSubmit("log-in-form", "/post-validate-account")}} validating={true}/>
    { :else if $currentScreen == SCREEN_SIGN_UP}
        <SignUp action={( ) => {submitForm("sign-up-form", "/post-sign-up")}} />   
    { :else if $currentScreen == SCREEN_FORGOT_PASSWORD}
        <ForgotPassword action={( ) => {submitForm("restore-password-form", "/post-restore-password")}} />    
    { :else if $currentScreen == SCREEN_NEW_GANE}
        <SelectCharacter />
    { :else if $currentScreen == SCREEN_LOAD_GAME}
        <LoadGame />  
    { :else if $currentScreen == SCREEN_SIGNED_UP}
        <Textpage 
            title={"Thanks for signing up!"} 
            text={"Before you can log in, you need to activate your account. You've received a message with the activation code on your email address!"}
            buttonAction={openValidateAccountScreen} buttonText={"Validate"}
        />  
    { :else if $currentScreen == SCREEN_RESTORED_PASS}
        <Textpage 
            title={"Password reset"} 
            text={"We've sent you an email with your new password. Don't worry about the delivery costs, this one is on the house! Don't forget to change your password again after loggin in."}
            buttonAction={openLogInScreen} buttonText={"Log in"}
        />   
    {/if}
</div>
