<script>   
    import InputDiv	from "../svelte-partials/InputDiv.svelte"; 
    import MainUiButton	from "../svelte-partials/MainUiButton.svelte";
    import FormWarning	from "../svelte-partials/FormWarning.svelte";
    import GoBackButton from "../svelte-partials/GoBackButton.svelte";
    import SmallHeader from "../header/SmallHeader.svelte";

    export let action;
    export let returnToPreviousScreen;

    let invalidForm = false;
    let userNameIsDirty = false;
    let userNameIsTooShort = true;
    let emailIsValid = false;
    let emailIsDirty = false;

    const checkIfFormIsValid = ( ) => {
        return emailIsValid && emailIsDirty && userNameIsDirty && !userNameIsTooShort
    }
    const onUsernameChange = ( ) => {
        userNameIsTooShort = document.getElementById("username-input-restore-password").value.length < 3;
        userNameIsDirty = true;
    }
    const onEmailAddressChange = ( ) => {
        const emailRegex = /\S+@\S+\.\S+/;
        emailIsValid = emailRegex.test(document.getElementById("email-input-restore-password").value);
        emailIsDirty = true;
    }
</script>

<form id="restore-password-form">
    <GoBackButton returnToPreviousScreen={returnToPreviousScreen}/>
    <SmallHeader text={"Reset password"}/>
    <InputDiv 
        elementId={"username-input-restore-password"} placeholder={"Fill in your username"} type={"text"} labelText={"Username:"}
        onChange={onUsernameChange} showWarning={userNameIsTooShort && userNameIsDirty} warningText={"Your username must be at least three characters long"}
    />
    <InputDiv 
        elementId={"email-input-restore-password"} placeholder={"Fill in your email address."} type={"email"} labelText={"Email:"}
        onChange={onEmailAddressChange} showWarning={!emailIsValid && emailIsDirty} warningText={"This is not a valid email address"}
    />
    {#if invalidForm} 
        <br/>
        <FormWarning text={"One or more fields are incorrect or empty!"}/>
        <br/>
    {/if}
    <MainUiButton elementId={"Log_in_button"} action={() => {
        if ( checkIfFormIsValid() ) {
            action( )
        }
        else {
            invalidForm = true;
            window.setTimeout(()=>{ invalidForm = false; }, 2000)
        }
    }} buttonText={"Send email"} />
</form>