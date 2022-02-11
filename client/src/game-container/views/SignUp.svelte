<script>   
    import InputDiv	from "../svelte-partials/InputDiv.svelte"; 
    import MainUiButton	from "../svelte-partials/MainUiButton.svelte";
    import FormWarning	from "../svelte-partials/FormWarning.svelte";
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import SmallHeader from "../header/SmallHeader.svelte";

    import { userMessage } from "../stores.js"
    export let action;
    let errorMessage = false;
    userMessage.subscribe( value => {
        errorMessage = value;
    })

    let invalidForm = false;
    let passwordIsDirty = false;
    let passwordIsTooShort = false;

    let emailIsValid = false;
    let emailIsDirty = false;

    let userNameIsDirty = false;
    let userNameIsTooShort = true;

    $: password = "";
    $: passwordConfirm = "";
    $: passwordsMatch = password == passwordConfirm;
    
    const checkIfFormIsValid = ( ) => {
        return passwordIsDirty && !passwordIsTooShort && passwordsMatch && emailIsValid && emailIsDirty && userNameIsDirty && !userNameIsTooShort
    }

    const onPasswordChange = ( ) => {
		password = document.getElementById("password-input-sign-up").value;
        passwordIsTooShort = document.getElementById("password-input-sign-up").value.length < 8;
        passwordIsDirty = true;
    }

    const onPasswordConfirmChange = ( ) => {
        passwordConfirm = document.getElementById("password-confirmation-sign-up").value;
    }

    const onEmailAddressChange = ( ) => {
        const emailRegex = /\S+@\S+\.\S+/;
        emailIsValid = emailRegex.test(document.getElementById("email-input-sign-up").value);
        emailIsDirty = true;
    }

    const onUsernameChange = ( ) => {
        userNameIsTooShort = document.getElementById("username-input-sign-up").value.length < 3;
        userNameIsDirty = true;
    }
</script>

<form id="sign-up-form">
    <GoBackButton/>
    <SmallHeader text={"Sign up and play the game!"}/>
    <InputDiv 
        elementId={"username-input-sign-up"} placeholder={"Get a cheeky username."} type={"text"} labelText={"Username:"}
        onChange={onUsernameChange} showWarning={userNameIsTooShort && userNameIsDirty} warningText={"Your username must be at least 3 characters long"}
    />
    <InputDiv 
        elementId={"email-input-sign-up"} placeholder={"Fill in your email address."} type={"email"} labelText={"Email:"}
        onChange={onEmailAddressChange} showWarning={!emailIsValid && emailIsDirty} warningText={"This is not a valid email address"}
    />
    <InputDiv 
        elementId={"password-input-sign-up"} placeholder={"Think of a good password."} type={"password"} labelText={"Password:"} 
        onChange={onPasswordChange} showWarning={passwordIsTooShort} warningText={"Your password must be at least 8 characters long."}
    />
    <InputDiv 
        elementId={"password-confirmation-sign-up"} placeholder={"Repeat your password."} type={"password"} labelText={"Repeat password:"} 
        onChange={onPasswordConfirmChange} showWarning={!passwordsMatch} warningText={"The passwords you inputted do not match."}
    />
    {#if invalidForm} 
        <br/>
        <FormWarning text={"One or more fields are incorrect or empty!"}/>
    {/if}
    {#if errorMessage} 
        <FormWarning text={errorMessage}/>
        <br/>
    {/if}
    <MainUiButton elementId={"Sign_up_button"} action={() => {
        if ( checkIfFormIsValid() ) {
            action( )
        }
        else {
            invalidForm = true;
            window.setTimeout(()=>{ invalidForm = false; }, 2000)
        }
    }} buttonText={"Sign up"}/>
</form>