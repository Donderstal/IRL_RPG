<script>   
    import InputDiv	from "../svelte-partials/InputDiv.svelte"; 
    import MainUiButton	from "../svelte-partials/MainUiButton.svelte";
    import FormWarning	from "../svelte-partials/FormWarning.svelte";
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import SmallHeader from "../header/SmallHeader.svelte";

    export let action;
    export let restorePassword;
    export let returnToPreviousScreen;
    export let validating;

    let invalidForm = false;
    let passwordIsDirty = false;
    let userNameIsDirty = false;
    let userNameIsTooShort = true;
    let codeIsDirty = true;

    const checkIfFormIsValid = ( ) => {
        return passwordIsDirty && userNameIsDirty && !userNameIsTooShort && (!validating || codeIsDirty)
    }
    const onPasswordChange = ( ) => {
        passwordIsDirty = true;
    }
    const onUsernameChange = ( ) => {
        userNameIsTooShort = document.getElementById("username-input-login").value.length < 3;
        userNameIsDirty = true;
    }
    const onSecretCodeChange = ( ) => {
        codeIsDirty = true;
    }
</script>

<form id="log-in-form">
    {#if validating} 
        <SmallHeader text={"Validate your account"}/>
    {:else}
        <GoBackButton returnToPreviousScreen={returnToPreviousScreen}/>
        <SmallHeader text={"Log in to your account"}/>
    {/if}
    <InputDiv 
        elementId={"username-input-login"} placeholder={"Fill in your username"} type={"text"} labelText={"Username:"}
        onChange={onUsernameChange} showWarning={userNameIsTooShort && userNameIsDirty} warningText={"Your username must be at least three characters long"}
    />
    <InputDiv 
        elementId={"password-input-login"} placeholder={"Fill in your password"} type={"password"} labelText={"Password:"}
        onChange={onPasswordChange} showWarning={false} warningText={""}
    />
    {#if validating} 
        <InputDiv 
            elementId={"activation-code-input-login"} placeholder={"Fill in your code"} type={"text"} labelText={"Activation code:"}
            onChange={onSecretCodeChange} showWarning={false} warningText={""}
        />
    {/if}
    {#if invalidForm} 
        <br/>
        <FormWarning text={"One or more fields are incorrect or empty!"}/>
        <br/>
    {/if}
    <div>
        <MainUiButton elementId={"Log_in_button"} action={() => {
            if ( checkIfFormIsValid() ) {
                action( )
            }
            else {
                invalidForm = true;
                window.setTimeout(()=>{ invalidForm = false; }, 2000)
            }
        }} buttonText={validating ? "Activate!" : "Log in"} />
    </div>
    <br/>
    <div>
        <MainUiButton elementId={"Restore_password_button"} action={restorePassword} buttonText={"I forgot..."} />        
    </div>
</form>