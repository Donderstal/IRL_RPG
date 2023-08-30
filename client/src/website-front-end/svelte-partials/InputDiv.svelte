<script>   
    import MainUiInput from "./MainUIInput.svelte";
    import MainInputLabel from "./MainInputLabel.svelte";
    import FormWarning	from "./FormWarning.svelte";

    export let elementId;
    export let type;
    export let placeholder;
    export let labelText;
    export let onChange;
    export let showWarning;
    export let warningText;
</script>

<style>
    div {
        margin-bottom: 3vh;
    }
</style>

<div>
    <MainInputLabel text={labelText}/>
    <MainUiInput elementId={elementId} placeholder={placeholder} type={type} onChange={onChange}/>
    {#if showWarning}
        <br/>
        <FormWarning text={warningText} />
    {/if}
</div>