<script>
    import MainUiButton from './MainUiButton.svelte'

    export let buttonAction;
    export let buttonText;
    export let buttonId;

    const cookiesAsStrings = document.cookie.split(';');
    const cookieDictionary = {};
    cookiesAsStrings.forEach((stringPair) => {
        let cookieTuple =  stringPair.split('=')
        let key = cookieTuple[0].trim();
        let value = cookieTuple[1].trim();
        cookieDictionary[key] = value;
    })
</script>
<style>
    div {
        position: absolute;
        left: 66%;
        top: 33%;
        display: inline-block;
        background-color: transparent;
    }
</style>

<div>
    <h3>Logged in as: {cookieDictionary['Username']}</h3>
    <MainUiButton
        elementId={buttonId} 
        action={buttonAction} 
        buttonText={buttonText} 
    />
</div>